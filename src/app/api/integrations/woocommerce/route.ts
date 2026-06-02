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

/** Normalise a WooCommerce product object into the shared format */
function normalizeProduct(p: any) {
  return {
    name: p.name ?? "",
    description: p.description ? stripHtml(p.description) : (p.short_description ? stripHtml(p.short_description) : ""),
    reference: p.sku ?? "",
    price: p.price ?? p.regular_price ?? null,
    imageUrl: p.images?.[0]?.src ?? null,
    category_hint: p.categories?.[0]?.name ?? null,
    materials_hint: null,
    vendor: null,
    tags: (p.tags ?? []).map((t: any) => t.name ?? "").filter(Boolean),
    woocommerce_id: p.id,
  }
}

export async function POST(req: NextRequest) {
  // Auth check
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  let body: {
    siteUrl?: string
    consumerKey?: string
    consumerSecret?: string
    productId?: number
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { siteUrl, consumerKey, consumerSecret, productId } = body

  if (!siteUrl) return NextResponse.json({ error: "siteUrl is required" }, { status: 400 })
  if (!consumerKey) return NextResponse.json({ error: "consumerKey is required" }, { status: 400 })
  if (!consumerSecret) return NextResponse.json({ error: "consumerSecret is required" }, { status: 400 })

  // Build Basic Auth header
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")
  const authHeader = `Basic ${credentials}`

  // Normalise the site URL (strip trailing slash)
  const base = siteUrl.replace(/\/+$/, "")

  const endpoint =
    productId != null
      ? `${base}/wp-json/wc/v3/products/${productId}`
      : `${base}/wp-json/wc/v3/products?per_page=20`

  let wooData: any
  try {
    const res = await fetch(endpoint, {
      headers: {
        Authorization: authHeader,
        "User-Agent": "Mozilla/5.0 (compatible; Conforva/1.0)",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(12000),
    })

    if (res.status === 401 || res.status === 403) {
      return NextResponse.json(
        {
          error:
            "Authentification refusée. Vérifiez vos Consumer Key et Consumer Secret WooCommerce (Réglages → Avancé → REST API).",
        },
        { status: 401 }
      )
    }

    if (res.status === 404) {
      return NextResponse.json(
        {
          error: productId
            ? `Produit WooCommerce #${productId} introuvable sur ${base}.`
            : `L'endpoint WooCommerce REST API n'existe pas sur ${base}. Vérifiez que WooCommerce est installé et que les permalinks sont activés.`,
        },
        { status: 404 }
      )
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return NextResponse.json(
        { error: `WooCommerce a répondu avec le code ${res.status}. ${text.slice(0, 200)}` },
        { status: 422 }
      )
    }

    wooData = await res.json()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    if (message.includes("timeout") || message.includes("aborted")) {
      return NextResponse.json(
        { error: "Le site WooCommerce n'a pas répondu dans les délais. Vérifiez l'URL ou réessayez." },
        { status: 504 }
      )
    }
    return NextResponse.json(
      { error: "Impossible de contacter le site WooCommerce. Vérifiez l'URL." },
      { status: 502 }
    )
  }

  if (!wooData) {
    return NextResponse.json({ error: "Réponse WooCommerce vide." }, { status: 422 })
  }

  if (productId != null) {
    // Single product
    if (typeof wooData !== "object" || Array.isArray(wooData)) {
      return NextResponse.json({ error: "Format de réponse WooCommerce inattendu." }, { status: 422 })
    }
    return NextResponse.json({ product: normalizeProduct(wooData) })
  } else {
    // Product list
    if (!Array.isArray(wooData)) {
      return NextResponse.json({ error: "Format de réponse WooCommerce inattendu (liste attendue)." }, { status: 422 })
    }
    return NextResponse.json({
      products: wooData.map(normalizeProduct),
      total: wooData.length,
    })
  }
}
