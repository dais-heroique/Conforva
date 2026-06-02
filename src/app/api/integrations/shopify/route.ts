import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/** Strip HTML tags and normalise whitespace */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s{2,}/g, " ")
    .trim()
}

/**
 * Parse a Shopify product URL and return { domain, handle }.
 * Accepted forms:
 *   https://store.myshopify.com/products/some-handle
 *   https://custom-domain.com/products/some-handle
 *   store.myshopify.com/products/some-handle   (no protocol)
 */
function parseShopifyUrl(shopifyUrl: string): { domain: string; handle: string } | null {
  try {
    const normalized = shopifyUrl.startsWith("http") ? shopifyUrl : `https://${shopifyUrl}`
    const url = new URL(normalized)
    const parts = url.pathname.split("/").filter(Boolean)
    const productsIdx = parts.indexOf("products")
    if (productsIdx === -1 || !parts[productsIdx + 1]) return null
    return {
      domain: url.hostname,
      handle: parts[productsIdx + 1],
    }
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  // Auth check
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  let body: { shopifyUrl?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { shopifyUrl } = body
  if (!shopifyUrl) {
    return NextResponse.json({ error: "shopifyUrl is required" }, { status: 400 })
  }

  const parsed = parseShopifyUrl(shopifyUrl)
  if (!parsed) {
    return NextResponse.json(
      { error: "URL invalide. Fournissez une URL de la forme https://store.myshopify.com/products/handle" },
      { status: 400 }
    )
  }

  const { domain, handle } = parsed
  const apiUrl = `https://${domain}/products/${handle}.json`

  let shopifyData: any
  try {
    const res = await fetch(apiUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Conforva/1.0)" },
      signal: AbortSignal.timeout(10000),
    })

    if (res.status === 401 || res.status === 403) {
      return NextResponse.json(
        {
          error:
            "Cette boutique est protégée par un mot de passe ou le produit n'est pas accessible publiquement. Vérifiez que la boutique est bien ouverte au public.",
        },
        { status: 422 }
      )
    }

    if (res.status === 404) {
      return NextResponse.json(
        { error: `Produit introuvable : "${handle}" n'existe pas sur ${domain}.` },
        { status: 404 }
      )
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: `La boutique Shopify a répondu avec le code ${res.status}. Vérifiez l'URL.` },
        { status: 422 }
      )
    }

    shopifyData = await res.json()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    if (message.includes("timeout") || message.includes("aborted")) {
      return NextResponse.json(
        { error: "La boutique n'a pas répondu dans les délais. Vérifiez l'URL ou réessayez." },
        { status: 504 }
      )
    }
    return NextResponse.json(
      { error: "Impossible de contacter la boutique Shopify. Vérifiez l'URL." },
      { status: 502 }
    )
  }

  const product = shopifyData?.product
  if (!product) {
    return NextResponse.json(
      { error: "Réponse Shopify inattendue : aucun objet produit trouvé." },
      { status: 422 }
    )
  }

  const name = product.title ?? ""
  const description = product.body_html ? stripHtml(product.body_html) : ""
  const reference = product.variants?.[0]?.sku ?? ""
  const price = product.variants?.[0]?.price ?? null
  const imageUrl = product.images?.[0]?.src ?? null
  const category_hint = product.product_type ?? null
  const vendor = product.vendor ?? null
  const tags: string[] = product.tags
    ? typeof product.tags === "string"
      ? product.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : product.tags
    : []

  // Derive a loose materials hint from tags (words that look material-like)
  const materialKeywords = ["coton", "cotton", "linen", "lin", "wool", "laine", "silk", "soie",
    "polyester", "nylon", "acier", "steel", "aluminium", "bois", "wood", "verre", "glass",
    "cuir", "leather", "caoutchouc", "rubber", "plastique", "plastic", "ceramic", "céramique"]
  const materials_hint = tags
    .filter(t => materialKeywords.some(k => t.toLowerCase().includes(k)))
    .join(", ") || null

  return NextResponse.json({
    name,
    description,
    reference,
    price,
    imageUrl,
    category_hint,
    vendor,
    tags,
    materials_hint,
    source: { domain, handle },
  })
}
