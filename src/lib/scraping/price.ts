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
  candidatesFound: number | null
  error: string | null
}

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
const FETCH_TIMEOUT_MS = 14_000

async function fetchOnce(url: string): Promise<Response | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,application/json,*/*;q=0.8",
        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.7,en;q=0.6",
        "Cache-Control": "no-cache",
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

// Retries once on network failure / 403 / 429 / 5xx — many sites are just flaky or rate-limiting.
async function fetchWithRetry(url: string): Promise<Response | null> {
  const first = await fetchOnce(url)
  if (first && first.ok) return first
  if (first && ![403, 429, 500, 502, 503, 504].includes(first.status)) return first

  await new Promise((r) => setTimeout(r, 600))
  const second = await fetchOnce(url)
  return second ?? first
}

function detectCurrency(raw: string): string {
  if (raw.includes("£")) return "GBP"
  if (raw.includes("$")) return "USD"
  if (/chf/i.test(raw)) return "CHF"
  return "EUR"
}

function toNumber(raw: string | undefined | null): number | null {
  if (!raw) return null
  let s = raw.replace(/[^\d.,]/g, "").trim()
  if (!s) return null

  const lastComma = s.lastIndexOf(",")
  const lastDot = s.lastIndexOf(".")
  if (lastComma > lastDot) {
    // comma is decimal separator, dot(s) are thousands
    s = s.replace(/\./g, "").replace(",", ".")
  } else if (lastDot > lastComma) {
    // dot is decimal separator, comma(s) are thousands (only if 3+ digits after last comma segment)
    s = s.replace(/,/g, "")
  }
  const n = parseFloat(s)
  return Number.isFinite(n) && n > 0 && n < 10_000_000 ? n : null
}

// ── Strategy 1: Shopify's public product .json endpoint ────────────────────
async function tryShopifyJson(url: string): Promise<ScrapedPrice | null> {
  try {
    const clean = url.split("?")[0].replace(/\/$/, "")
    if (!clean.includes("/products/")) return null

    const res = await fetchWithRetry(`${clean}.json`)
    if (!res || !res.ok) return null

    const data = await res.json()
    const product = data.product
    if (!product) return null

    const variants = product.variants ?? []
    const available = variants.find((v: { available?: boolean }) => v.available) ?? variants[0]
    if (!available) return null

    return {
      price: available.price != null ? parseFloat(available.price) : null,
      currency: "EUR",
      inStock: available.available ?? null,
      name: product.title ?? null,
    }
  } catch {
    return null
  }
}

// ── Strategy 2: WooCommerce Store API (public REST endpoint many stores expose) ─
async function tryWooCommerceStoreApi(pageUrl: string, $: cheerio.CheerioAPI): Promise<ScrapedPrice | null> {
  try {
    const origin = new URL(pageUrl).origin
    const bodyClass = $("body").attr("class") ?? ""
    const postIdMatch = bodyClass.match(/postid-(\d+)/) ?? $("[data-product_id]").attr("data-product_id")?.match(/\d+/)
    const productId = Array.isArray(postIdMatch) ? postIdMatch[1] ?? postIdMatch[0] : postIdMatch

    if (!productId) return null

    const res = await fetchWithRetry(`${origin}/wp-json/wc/store/v1/products/${productId}`)
    if (!res || !res.ok) return null

    const data = await res.json()
    const priceRaw = data?.prices?.price
    if (priceRaw == null) return null

    // Store API returns prices in minor units (cents) scaled by currency_minor_unit
    const minorUnit = data?.prices?.currency_minor_unit ?? 2
    const price = Number(priceRaw) / Math.pow(10, minorUnit)

    return {
      price: Number.isFinite(price) && price > 0 ? price : null,
      currency: data?.prices?.currency_code ?? "EUR",
      inStock: data?.is_in_stock ?? null,
      name: data?.name ?? null,
    }
  } catch {
    return null
  }
}

// ── Strategy 3: JSON-LD Product/Offer schema ────────────────────────────────
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
  if (!item || typeof item !== "object" || depth > 5) return null
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

  for (const key of Object.keys(obj)) {
    const val = obj[key]
    if (Array.isArray(val)) {
      for (const v of val) {
        const found = findProductNode(v, depth + 1)
        if (found) return found
      }
    } else if (val && typeof val === "object" && depth < 3) {
      const found = findProductNode(val, depth + 1)
      if (found) return found
    }
  }

  return null
}

// ── Strategy 4: microdata / RDFa — itemprop="price" on any element ─────────
function parseMicrodata($: cheerio.CheerioAPI): ScrapedPrice | null {
  const el = $('[itemprop="price"]').first()
  if (!el.length) return null

  const raw = el.attr("content") ?? el.text()
  const price = toNumber(raw)
  if (price == null) return null

  const currency = $('[itemprop="priceCurrency"]').first().attr("content") ?? detectCurrency(raw)
  const availabilityAttr =
    $('[itemprop="availability"]').first().attr("href") ?? $('[itemprop="availability"]').first().attr("content") ?? ""
  const name = $('[itemprop="name"]').first().attr("content") ?? $('[itemprop="name"]').first().text() ?? null

  return {
    price,
    currency,
    inStock: availabilityAttr ? availabilityAttr.toLowerCase().includes("instock") : null,
    name: name?.trim() || null,
  }
}

// ── Strategy 5: OpenGraph / product meta price tags ─────────────────────────
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

// ── Strategy 6: known e-commerce platform / theme CSS selectors ────────────
const PRICE_SELECTORS = [
  // WooCommerce
  ".woocommerce-Price-amount bdi",
  ".woocommerce-Price-amount",
  "p.price ins .amount",
  "p.price .amount",
  "span.price ins .amount",
  "span.price .amount",
  // PrestaShop
  "#our_price_display",
  ".current-price-value",
  "span.current-price-value",
  ".current-price span[itemprop='price']",
  ".current-price",
  ".product-price .price",
  // Magento
  ".price-box .price-final_price .price",
  ".price-final_price .price",
  ".price-box .price",
  // Shopify themes (Dawn, Debut, Turbo, Impulse…)
  ".price-item--sale",
  ".price-item--regular",
  ".price__current",
  ".price__regular .price-item",
  ".product__price",
  ".product-single__price",
  ".product-price__price",
  // BigCommerce
  ".price--withoutTax",
  ".productView-price .price",
  // Amazon
  "#corePrice_feature_div .a-offscreen",
  "#corePriceDisplay_desktop_feature_div .a-offscreen",
  ".a-price .a-offscreen",
  "#priceblock_ourprice",
  "#priceblock_dealprice",
  // Cdiscount / Fnac / Darty (FR marketplaces)
  ".fpPrice",
  ".f-priceBox__price",
  ".product-price__actual",
  // eBay
  ".x-price-primary",
  // Generic fallbacks
  "[data-price-amount]",
  "[data-product-price]",
  ".ProductPrice",
  ".pdp-price",
  ".product-price",
]

function parseCssSelectors($: cheerio.CheerioAPI): ScrapedPrice | null {
  for (const selector of PRICE_SELECTORS) {
    const el = $(selector).first()
    if (!el.length) continue
    const raw = el.attr("data-price-amount") ?? el.attr("content") ?? el.text()
    const price = toNumber(raw)
    if (price != null) {
      const name = $("title").text()?.trim() || null
      return { price, currency: detectCurrency(raw), inStock: null, name }
    }
  }
  return null
}

// ── Strategy 7: generic DOM scan scored by "price-ish" context ─────────────
// Catches themes/sites not covered by the fixed selector list above.
const NEGATIVE_HINTS = /old|was|compare|strike|shipping|delivery|installment|per-month|subtotal|total-shipping|saving/i

function parseGenericDomScan($: cheerio.CheerioAPI, debug?: ScrapeDebugInfo): ScrapedPrice | null {
  const candidates: { price: number; currency: string; score: number }[] = []

  $('[class*="price" i], [id*="price" i], [class*="prix" i]').each((_, el) => {
    const node = $(el)
    const cls = (node.attr("class") ?? "") + " " + (node.attr("id") ?? "")
    if (NEGATIVE_HINTS.test(cls)) return
    // Skip container elements with many nested price-ish children — we want leaf-ish text nodes
    if (node.children().length > 3) return

    const text = node.clone().children("del, s, strike").remove().end().text()
    if (!text || text.length > 40) return
    if (!/[\d]/.test(text)) return
    if (!/[€$£]|EUR|USD|GBP|CHF/i.test(text) && !/^\s*[\d\s.,]+\s*$/.test(text)) return

    const price = toNumber(text)
    if (price == null) return

    let score = 1
    if (/price|prix/i.test(cls)) score += 2
    if (/current|final|sale|now/i.test(cls)) score += 2
    if (/€|EUR/i.test(text)) score += 1

    candidates.push({ price, currency: detectCurrency(text), score })
  })

  if (debug) debug.candidatesFound = candidates.length
  if (candidates.length === 0) return null

  candidates.sort((a, b) => b.score - a.score)
  const best = candidates[0]
  return { price: best.price, currency: best.currency, inStock: null, name: $("title").text()?.trim() || null }
}

// ── Strategy 8: embedded JS state blobs server-rendered into the HTML ──────
function parseEmbeddedJson($: cheerio.CheerioAPI, html: string): ScrapedPrice | null {
  const nextData = $("#__NEXT_DATA__").text()
  if (nextData) {
    const found = searchJsonForPrice(nextData)
    if (found != null) return { price: found, currency: "EUR", inStock: null, name: null }
  }

  // Shopify themes often embed product JSON even when the .json endpoint is blocked
  const shopifyMatch = html.match(/var\s+meta\s*=\s*(\{[\s\S]*?\});/) ?? html.match(/"product"\s*:\s*(\{[\s\S]*?"variants"[\s\S]*?\]\s*\})/)
  if (shopifyMatch) {
    const found = searchJsonForPrice(shopifyMatch[1])
    if (found != null) return { price: found, currency: "EUR", inStock: null, name: null }
  }

  // AliExpress / Alibaba-style SPAs embed a big state blob (window.runParams,
  // window._d_c_.DCData, __INITIAL_STATE__…) with deeply nested, inconsistently
  // named price fields (formatedPrice, actSkuCalPrice, salePrice…).
  const runParamsMatch =
    html.match(/window\.runParams\s*=\s*(\{[\s\S]*?\});?\s*(?:<\/script>|window\.)/) ??
    html.match(/__INITIAL_STATE__\s*=\s*(\{[\s\S]*?\});?\s*<\/script>/) ??
    html.match(/window\._d_c_\.DCData\s*=\s*(\{[\s\S]*?\});/)
  if (runParamsMatch) {
    const found = searchJsonForPrice(runParamsMatch[1])
    if (found != null) return { price: found, currency: "EUR", inStock: null, name: null }
  }

  // Generic: "price"-like key anywhere in inline scripts, as plain text (no JSON.parse needed)
  const genericKeyMatch = html.match(
    /"(?:price|salePrice|formatedPrice|finalPrice|currentPrice|displayPrice)"\s*:\s*"?[\€\$£]?\s?(\d+(?:[.,]\d{1,2})?)"?/i
  )
  if (genericKeyMatch) {
    const price = toNumber(genericKeyMatch[1])
    if (price != null) return { price, currency: "EUR", inStock: null, name: null }
  }

  return null
}

const PRICE_KEY_PATTERN = /^(price|salePrice|formatedPrice|finalPrice|currentPrice|displayPrice|actSkuCalPrice|skuPrice|minPrice|minActivityAmount)$/i

function searchJsonForPrice(rawJson: string): number | null {
  try {
    const parsed = JSON.parse(rawJson)
    const stack: unknown[] = [parsed]
    let iterations = 0
    while (stack.length && iterations < 8000) {
      iterations++
      const node = stack.pop()
      if (!node || typeof node !== "object") continue
      const obj = node as Record<string, unknown>

      for (const key of Object.keys(obj)) {
        const val = obj[key]
        if (PRICE_KEY_PATTERN.test(key)) {
          if (typeof val === "number" || typeof val === "string") {
            const n = toNumber(String(val))
            if (n != null) return n
          } else if (val && typeof val === "object") {
            // Some sites wrap the price in { value: 15.23 } or { amount: "15.23" }
            const nested = val as Record<string, unknown>
            const inner = nested.value ?? nested.amount ?? nested.formatedAmount
            if (inner != null) {
              const n = toNumber(String(inner))
              if (n != null) return n
            }
          }
        }
        if (val && typeof val === "object") stack.push(val)
      }
    }
  } catch {
    // ignore
  }
  return null
}

// ── Strategy 9: last-resort regex scan of the raw HTML ──────────────────────
function parseRegexFallback(html: string): ScrapedPrice | null {
  const patterns: [RegExp, string][] = [
    [/(?:€|EUR)\s?([\d]{1,3}(?:[.\s]\d{3})*[.,]\d{2})/, "EUR"],
    [/([\d]{1,3}(?:[.\s]\d{3})*[.,]\d{2})\s?(?:€|EUR)/, "EUR"],
    [/(?:£|GBP)\s?([\d]{1,3}(?:,\d{3})*\.\d{2})/, "GBP"],
    [/(?:\$|USD)\s?([\d]{1,3}(?:,\d{3})*\.\d{2})/, "USD"],
  ]
  for (const [re, currency] of patterns) {
    const match = html.match(re)
    if (match) {
      const price = toNumber(match[1])
      if (price != null) return { price, currency, inStock: null, name: null }
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

    const res = await fetchWithRetry(url)
    if (debug) debug.httpStatus = res?.status ?? null

    if (!res || !res.ok) {
      if (debug) debug.error = res ? `HTTP ${res.status}` : "fetch failed or timed out"
      return null
    }

    const html = await res.text()
    if (debug) debug.htmlLength = html.length

    const $ = cheerio.load(html)

    const woo = await tryWooCommerceStoreApi(url, $)
    if (woo && woo.price != null) {
      if (debug) debug.strategy = "woocommerce_store_api"
      return woo
    }

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

    const genericScan = parseGenericDomScan($, debug)
    if (genericScan && genericScan.price != null) {
      if (debug) debug.strategy = "generic_dom_scan"
      return genericScan
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
