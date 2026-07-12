import * as cheerio from "cheerio"

export interface ScrapedPrice {
  price: number | null
  currency: string
  inStock: boolean | null
  name: string | null
}

const USER_AGENT = "Mozilla/5.0 (compatible; ConforvaBot/1.0; +https://conforva.com)"
const FETCH_TIMEOUT_MS = 10_000

async function fetchWithTimeout(url: string): Promise<Response | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, {
      headers: { "User-Agent": USER_AGENT, "Accept": "text/html,application/json,*/*" },
      signal: controller.signal,
    })
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

// Strategy 1: Shopify's public product .json endpoint
async function tryShopifyJson(url: string): Promise<ScrapedPrice | null> {
  try {
    const clean = url.split("?")[0].replace(/\/$/, "")
    if (!clean.includes("/products/")) return null

    const res = await fetchWithTimeout(`${clean}.json`)
    if (!res || !res.ok) return null

    const data = await res.json()
    const product = data.product
    if (!product) return null

    const variant = product.variants?.[0]
    if (!variant) return null

    return {
      price: variant.price != null ? parseFloat(variant.price) : null,
      currency: "EUR",
      inStock: variant.available ?? null,
      name: product.title ?? null,
    }
  } catch {
    return null
  }
}

// Strategy 2: JSON-LD Product/Offer schema in the page HTML
function parseJsonLd(html: string): ScrapedPrice | null {
  try {
    const $ = cheerio.load(html)
    const scripts = $('script[type="application/ld+json"]')

    for (const el of scripts.toArray()) {
      const raw = $(el).contents().text()
      if (!raw) continue

      let json: unknown
      try {
        json = JSON.parse(raw)
      } catch {
        continue
      }

      const candidates = Array.isArray(json) ? json : [json]
      for (const item of candidates) {
        const node = findProductNode(item)
        if (node) return node
      }
    }
  } catch {
    // ignore parse errors
  }
  return null
}

function findProductNode(item: unknown, depth = 0): ScrapedPrice | null {
  if (!item || typeof item !== "object" || depth > 3) return null
  const obj = item as Record<string, unknown>

  if (obj["@graph"] && Array.isArray(obj["@graph"])) {
    for (const g of obj["@graph"]) {
      const found = findProductNode(g, depth + 1)
      if (found) return found
    }
  }

  const type = obj["@type"]
  const isProduct = type === "Product" || (Array.isArray(type) && type.includes("Product"))
  if (isProduct) {
    const offers = obj.offers as Record<string, unknown> | Record<string, unknown>[] | undefined
    const offer = Array.isArray(offers) ? offers[0] : offers
    if (offer) {
      const price = offer.price ?? offer.lowPrice
      const availability = String(offer.availability ?? "")
      return {
        price: price != null ? parseFloat(String(price)) : null,
        currency: (offer.priceCurrency as string) ?? "EUR",
        inStock: availability ? availability.toLowerCase().includes("instock") : null,
        name: (obj.name as string) ?? null,
      }
    }
  }

  return null
}

// Strategy 3: OpenGraph / meta price tags fallback
function parseMetaTags(html: string): ScrapedPrice | null {
  try {
    const $ = cheerio.load(html)
    const priceRaw =
      $('meta[property="og:price:amount"]').attr("content") ??
      $('meta[property="product:price:amount"]').attr("content") ??
      $('meta[itemprop="price"]').attr("content")

    if (!priceRaw) return null

    const currency =
      $('meta[property="og:price:currency"]').attr("content") ??
      $('meta[property="product:price:currency"]').attr("content") ??
      "EUR"

    const availability = $('meta[property="product:availability"]').attr("content")
    const name = $('meta[property="og:title"]').attr("content") ?? $("title").text() ?? null

    return {
      price: parseFloat(priceRaw),
      currency,
      inStock: availability ? availability.toLowerCase().includes("in stock") : null,
      name,
    }
  } catch {
    return null
  }
}

export async function scrapeProductPrice(url: string): Promise<ScrapedPrice | null> {
  const shopify = await tryShopifyJson(url)
  if (shopify && shopify.price != null) return shopify

  const res = await fetchWithTimeout(url)
  if (!res || !res.ok) return null

  const html = await res.text()

  const jsonLd = parseJsonLd(html)
  if (jsonLd && jsonLd.price != null) return jsonLd

  const meta = parseMetaTags(html)
  if (meta && meta.price != null) return meta

  return null
}
