import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 })

  try {
    const cleanUrl = url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`

    // Try Shopify product JSON first
    const shopifyJsonUrl = cleanUrl.replace(/\?.*$/, "") + ".json"
    const shopifyRes = await fetch(shopifyJsonUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(5000),
    }).catch(() => null)

    if (shopifyRes?.ok) {
      const data = await shopifyRes.json().catch(() => null)
      if (data?.product) {
        const p = data.product
        const bodyText = p.body_html?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 600) ?? ""
        return NextResponse.json({
          name: p.title ?? "",
          description: bodyText,
          vendor: p.vendor ?? "",
          tags: Array.isArray(p.tags) ? p.tags : (p.tags ?? "").split(",").map((t: string) => t.trim()).filter(Boolean),
          image: p.images?.[0]?.src ?? null,
          source: "shopify",
        })
      }
    }

    // Fallback: fetch HTML and extract meta tags
    const htmlRes = await fetch(cleanUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" },
      signal: AbortSignal.timeout(8000),
    })

    if (!htmlRes.ok) return NextResponse.json({ error: "Impossible de charger la page" }, { status: 422 })

    const html = await htmlRes.text()

    function getMeta(property: string): string {
      const match = html.match(new RegExp(`<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']+)["']`, "i"))
        ?? html.match(new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["']${property}["']`, "i"))
      return match?.[1]?.trim() ?? ""
    }

    const title = getMeta("og:title") || getMeta("twitter:title")
      || html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || ""
    const description = getMeta("og:description") || getMeta("twitter:description") || getMeta("description") || ""
    const image = getMeta("og:image") || getMeta("twitter:image") || ""

    return NextResponse.json({
      name: title.slice(0, 200),
      description: description.slice(0, 600),
      vendor: "",
      tags: [],
      image: image || null,
      source: "html",
    })
  } catch {
    return NextResponse.json({ error: "Erreur lors de l'import" }, { status: 500 })
  }
}
