import { getDb } from "@/lib/db"
import { trackedProducts, priceHistory } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { scrapeProductPrice, type ScrapedPrice } from "./price"

// Low-confidence strategies (generic DOM scan, regex, embedded-JSON guesses, Gemini)
// can occasionally pick up a related/recommended product's price instead of the
// actual one. A sudden, implausibly large swing from a low-confidence read is far
// more likely to be a wrong product than a real flash sale — reject it and keep
// the last known-good price rather than corrupting the history with it.
const MAX_PLAUSIBLE_SWING_PERCENT = 55

// Writes a resolved price (from scraping, Gemini, or manual entry) to the DB.
export async function applyPriceResult(
  product: { id: string; currentPrice: number | null },
  result: ScrapedPrice
) {
  const db = getDb()
  const now = new Date()

  if (result.price == null) {
    await db.update(trackedProducts).set({ lastScrapedAt: now }).where(eq(trackedProducts.id, product.id))
    return { scraped: false as const }
  }

  const previousPrice = product.currentPrice

  if (result.confidence === "low" && previousPrice != null && previousPrice > 0) {
    const swing = Math.abs((result.price - previousPrice) / previousPrice) * 100
    if (swing > MAX_PLAUSIBLE_SWING_PERCENT) {
      console.warn(
        `[apply] rejected implausible low-confidence price for product ${product.id}: ` +
        `${previousPrice} -> ${result.price} (${swing.toFixed(0)}% swing)`
      )
      await db.update(trackedProducts).set({ lastScrapedAt: now }).where(eq(trackedProducts.id, product.id))
      return { scraped: false as const }
    }
  }
  const priceChanged = previousPrice != null && previousPrice !== result.price
  const priceChangePercent = previousPrice != null && previousPrice !== 0
    ? ((result.price - previousPrice) / previousPrice) * 100
    : null

  await db.update(trackedProducts).set({
    name: result.name ?? undefined,
    currentPrice: result.price,
    previousPrice: previousPrice ?? undefined,
    currency: result.currency,
    isInStock: result.inStock,
    priceChangePercent,
    lastScrapedAt: now,
    ...(priceChanged || previousPrice == null ? { lastPriceChangedAt: now } : {}),
  }).where(eq(trackedProducts.id, product.id))

  await db.insert(priceHistory).values({
    id: crypto.randomUUID(),
    productId: product.id,
    price: result.price,
    currency: result.currency,
    isInStock: result.inStock,
    scrapedAt: now,
  })

  return { scraped: true as const, price: result.price, priceChangePercent }
}

// Scrapes a product's live price (static HTML strategies) and writes the result to the DB.
// Used both for the immediate scrape-on-add and the daily cron refresh.
export async function scrapeAndApply(product: { id: string; url: string; currentPrice: number | null }) {
  const result = await scrapeProductPrice(product.url)
  if (!result) {
    const db = getDb()
    await db.update(trackedProducts).set({ lastScrapedAt: new Date() }).where(eq(trackedProducts.id, product.id))
    return { scraped: false as const }
  }
  return applyPriceResult(product, result)
}
