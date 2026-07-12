import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { trackedProducts, trackedCompetitors } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { scrapeAndApply, applyPriceResult } from "@/lib/scraping/apply"
import { scrapeUrlsWithGemini } from "@/lib/scraping/gemini-fallback"

export const maxDuration = 300

// Runs once a day for every customer (see vercel.json — scheduled close to
// 00:00 Paris time). Two passes:
//  1. Static scrape (Shopify JSON, JSON-LD, microdata, CSS selectors, etc.)
//  2. Whatever still has no price goes to Gemini, which visits the page itself
//     via its URL context tool and reports back {url, price}.
export async function GET(req: Request) {
  return handleScrape(req)
}

// Kept for manual/admin triggering via POST.
export async function POST(req: Request) {
  return handleScrape(req)
}

async function handleScrape(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })
  }

  const db = getDb()
  const products = await db.select().from(trackedProducts).where(eq(trackedProducts.isActive, true))

  let scraped = 0
  const stillMissing: typeof products = []
  const touchedCompetitors = new Set<string>()

  // Pass 1 — static scrape, in small concurrent batches to stay polite to target sites.
  const BATCH_SIZE = 5
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE)
    await Promise.all(
      batch.map(async (product) => {
        try {
          const result = await scrapeAndApply({ id: product.id, url: product.url, currentPrice: product.currentPrice })
          touchedCompetitors.add(product.competitorId)
          if (result.scraped) scraped++
          else stillMissing.push(product)
        } catch (err) {
          stillMissing.push(product)
          console.error(`[cron/scrape-prices] static scrape failed for product ${product.id}:`, err)
        }
      })
    )
  }

  // Pass 2 — anything the static scraper couldn't read goes to Gemini as a last resort.
  let geminiRecovered = 0
  if (stillMissing.length > 0) {
    const urlToProduct = new Map(stillMissing.map((p) => [p.url, p]))
    const geminiResults = await scrapeUrlsWithGemini(stillMissing.map((p) => p.url))

    for (const [url, result] of geminiResults) {
      const product = urlToProduct.get(url)
      if (!product) continue
      try {
        const applied = await applyPriceResult({ id: product.id, currentPrice: product.currentPrice }, result)
        if (applied.scraped) {
          geminiRecovered++
          touchedCompetitors.add(product.competitorId)
        }
      } catch (err) {
        console.error(`[cron/scrape-prices] failed applying Gemini result for product ${product.id}:`, err)
      }
    }
  }

  const now = new Date()
  for (const competitorId of touchedCompetitors) {
    await db.update(trackedCompetitors).set({ lastScrapedAt: now }).where(eq(trackedCompetitors.id, competitorId))
  }

  return NextResponse.json({
    total: products.length,
    scrapedDirectly: scraped,
    sentToGemini: stillMissing.length,
    recoveredByGemini: geminiRecovered,
    unresolved: stillMissing.length - geminiRecovered,
  })
}
