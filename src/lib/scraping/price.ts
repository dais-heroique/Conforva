import * as cheerio from "cheerio"

export interface ScrapedPrice {
  price: number | null
  currency: string
  inStock: boolean | null
  name: string | null
}

export interface ScrapeDebugInfo {
  strategy: string | null
  httpStatus: number | null
  htmlLength: number | null
  error: string | null
}

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
const FETCH_TIMEOUT_MS = 12_000

async function fetchWithTimeout(url: string): Promise<Response | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,application/json,*/*;q=0.8",
        "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
      },
      redirect: "follow",
      signal: controller.signal,
    })
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

function toNumber(raw: string | undefined | null): number | null {
  if (!raw) return null
  // Normalize "1 299,90 €" / "1,299.90" / "€19.99" -> 1299.90 / 19.99
  let s = raw.replace(/[^\d.,]/g, "").trim()
  if (!s) return null

  const lastComma = s.lastIndexOf(",")
  const lastDot = s.lastIndexOf(".")
  if (lastComma > lastDot) {
    // comma is decimal separator, dot(s) are thousands
    s = s.replace(/\./g, "").replace(",", ".")
  } else if (lastDot > lastComma) {
    // dot is decimal separator, comma(s) are thousands
    s = s.replace(/,/g, "")
  }
  const n = parseFloat(s)
  return Number.isFinite(n) && n > 0 ? n : null
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
function parseJsonLd($: cheerio.CheerioAPI): ScrapedPrice | null {
  try {
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
  if (!item || typeof item !== "object" || depth > 4) return null
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
    let offer = Array.isArray(offers) ? offers[0] : offers
    if (offer && (offer as Record<string, unknown>).offers) {
      offer = (offer as Record<string, unknown>).offers as Record<string, unknown>
    }
    if (offer) {
      const price = offer.price ?? offer.lowPrice ?? offer.highPrice
      const availability = String(offer.availability ?? "")
      const priceNum = price != null ? toNumber(String(price)) : null
      if (priceNum != null) {
        return {
          price: priceNum,
          currency: (offer.priceCurrency as string) ?? "EUR",
          inStock: availability ? availability.toLowerCase().includes("instock") : null,
          name: (obj.name as string) ?? null,
        }
      }
    }
  }

  // Recurse into nested objects/arrays one level (handles ItemList > Product wrappers)
  for (const key of Object.keys(obj)) {
    const val = obj[key]
    if (Array.isArray(val)) {
      for (const v of val) {
        const found = findProductNode(v, depth + 1)
        if (found) return found
      }
    } else if (val && typeof val === "object" && depth < 2) {
      const found = findProductNode(val, depth + 1)
      if (found) return found
    }
  }

  return null
}

// Strategy 3: microdata / RDFa — itemprop="price" on any element (meta, span, div…)
function parseMicrodata($: cheerio.CheerioAPI): ScrapedPrice | null {
  const el = $('[itemprop="price"]').first()
  if (!el.length) return null

  const raw = el.attr("content") ?? el.text()
  const price = toNumber(raw)
  if (price == null) return null

  const currency = $('[itemprop="priceCurrency"]').first().attr("content") ?? "EUR"
  const availabilityAttr = $('[itemprop="availability"]').first().attr("href") ?? $('[itemprop="availability"]').first().attr("content") ?? ""
  const name = $('[itemprop="name"]').first().attr("content") ?? $('[itemprop="name"]').first().text() ?? null

  return {
    price,
    currency,
    inStock: availabilityAttr ? availabilityAttr.toLowerCase().includes("instock") : null,
    name: name?.trim() || null,
  }
}

// Strategy 4: OpenGraph / product meta price tags
function parseMetaTags($: cheerio.CheerioAPI): ScrapedPrice | null {
  const priceRaw =
    $('meta[property="og:price:amount"]').attr("content") ??
    $('meta[property="product:price:amount"]').attr("content") ??
    $('meta[name="twitter:data1"]').attr("content")

  const price = toNumber(priceRaw)
  if (price == null) return null

  const currency =
    $('meta[property="og:price:currency"]').attr("content") ??
    $('meta[property="product:price:currency"]').attr("content") ??
    "EUR"

  const availability = $('meta[property="product:availability"]').attr("content")
  const name = $('meta[property="og:title"]').attr("content") ?? $("title").text() ?? null

  return {
    price,
    currency,
    inStock: availability ? availability.toLowerCase().includes("in stock") : null,
    name: name?.trim() || null,
  }
}

// Strategy 5: common e-commerce platform CSS selectors (WooCommerce, PrestaShop, Magento, generic)
const PRICE_SELECTORS = [
  ".woocommerce-Price-amount bdi",
  ".woocommerce-Price-amount",
  "p.price ins .amount",
  "p.price .amount",
  "#our_price_display",
  ".current-price span[itemprop='price']",
  ".current-price",
  ".price-box .price",
  ".product-price .price",
  "[data-price-amount]",
  ".price__current",
  ".price-item--sale",
  ".price-item--regular",
  ".product__price",
  ".product-single__price",
  "#priceblock_ourprice",
  "#priceblock_dealprice",
  ".a-price .a-offscreen",
  ".pdp-price",
  ".ProductPrice",
]

function parseCssSelectors($: cheerio.CheerioAPI): ScrapedPrice | null {
  for (const selector of PRICE_SELECTORS) {
    const el = $(selector).first()
    if (!el.length) continue
    const raw = el.attr("data-price-amount") ?? el.text()
    const price = toNumber(raw)
    if (price != null) {
      const name = $("title").text()?.trim() || null
      return { price, currency: "EUR", inStock: null, name }
    }
  }
  return null
}

// Strategy 6: embedded JS state blobs some frameworks server-render into the HTML
// (Next.js __NEXT_DATA__, Nuxt __NUXT__, generic window.__INITIAL_STATE__)
function parseEmbeddedJson($: cheerio.CheerioAPI, html: string): ScrapedPrice | null {
  const nextData = $("#__NEXT_DATA__").text()
  if (nextData) {
    const found = searchJsonForPrice(nextData)
    if (found != null) return { price: found, currency: "EUR", inStock: null, name: null }
  }

  // Generic regex: "price":123.45 or "price":"123.45" anywhere in inline scripts
  const match = html.match(/"price"\s*:\s*"?(\d+(?:[.,]\d{1,2})?)"?/i)
  if (match) {
    const price = toNumber(match[1])
    if (price != null) return { price, currency: "EUR", inStock: null, name: null }
  }

  return null
}

function searchJsonForPrice(rawJson: string): number | null {
  try {
    const parsed = JSON.parse(rawJson)
    const stack: unknown[] = [parsed]
    let depth = 0
    while (stack.length && depth < 5000) {
      depth++
      const node = stack.pop()
      if (!node || typeof node !== "object") continue
      const obj = node as Record<string, unknown>
      if (typeof obj.price === "number" || typeof obj.price === "string") {
        const n = toNumber(String(obj.price))
        if (n != null) return n
      }
      for (const key of Object.keys(obj)) {
        const val = obj[key]
        if (val && typeof val === "object") stack.push(val)
      }
    }
  } catch {
    // ignore
  }
  return null
}

// Strategy 7: last-resort regex scan of the raw HTML for a currency-formatted number
// near a "price"-ish context. Deliberately last — least precise.
function parseRegexFallback(html: string): ScrapedPrice | null {
  const patterns = [
    /(?:€|EUR)\s*([\d]{1,4}[.,]\d{2})/,
    /([\d]{1,4}[.,]\d{2})\s*(?:€|EUR)/,
    /(?:\$|USD)\s*([\d]{1,4}[.,]\d{2})/,
  ]
  for (const re of patterns) {
    const match = html.match(re)
    if (match) {
      const price = toNumber(match[1])
      if (price != null) return { price, currency: "EUR", inStock: null, name: null }
    }
  }
  return null
}

export async function scrapeProductPrice(
  url: string,
  debug?: ScrapeDebugInfo
): Promise<ScrapedPrice | null> {
  try {
    const shopify = await tryShopifyJson(url)
    if (shopify && shopify.price != null) {
      if (debug) debug.strategy = "shopify_json"
      return shopify
    }

    const res = await fetchWithTimeout(url)
    if (debug) debug.httpStatus = res?.status ?? null

    if (!res || !res.ok) {
      if (debug) debug.error = res ? `HTTP ${res.status}` : "fetch failed or timed out"
      return null
    }

    const html = await res.text()
    if (debug) debug.htmlLength = html.length

    const $ = cheerio.load(html)

    const jsonLd = parseJsonLd($)
    if (jsonLd && jsonLd.price != null) {
      if (debug) debug.strategy = "json_ld"
      return jsonLd
    }

    const microdata = parseMicrodata($)
    if (microdata && microdata.price != null) {
      if (debug) debug.strategy = "microdata"
      return microdata
    }

    const meta = parseMetaTags($)
    if (meta && meta.price != null) {
      if (debug) debug.strategy = "meta_tags"
      return meta
    }

    const css = parseCssSelectors($)
    if (css && css.price != null) {
      if (debug) debug.strategy = "css_selectors"
      return css
    }

    const embedded = parseEmbeddedJson($, html)
    if (embedded && embedded.price != null) {
      if (debug) debug.strategy = "embedded_json"
      return embedded
    }

    const regex = parseRegexFallback(html)
    if (regex && regex.price != null) {
      if (debug) debug.strategy = "regex_fallback"
      return regex
    }

    if (debug) debug.error = "no price found by any strategy"
    return null
  } catch (err) {
    if (debug) debug.error = String(err)
    return null
  }
}
