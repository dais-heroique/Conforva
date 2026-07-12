import { getDb } from "@/lib/db"
import { trackedProducts, priceHistory } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { scrapeProductPrice, type ScrapedPrice } from "./price"

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
