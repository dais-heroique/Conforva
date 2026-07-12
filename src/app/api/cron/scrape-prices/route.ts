import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { trackedProducts, trackedCompetitors } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { scrapeAndApply } from "@/lib/scraping/apply"

export const maxDuration = 300

// Vercel Cron sends a GET request with the Authorization header set automatically.
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
  let failed = 0
  const touchedCompetitors = new Set<string>()

  // Sequential in small batches to stay within the function's time budget and be polite to target sites.
  const BATCH_SIZE = 5
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE)
    await Promise.all(
      batch.map(async (product) => {
        try {
          const result = await scrapeAndApply({ id: product.id, url: product.url, currentPrice: product.currentPrice })
          if (result.scraped) scraped++
          else failed++
          touchedCompetitors.add(product.competitorId)
        } catch (err) {
          failed++
          console.error(`[cron/scrape-prices] failed for product ${product.id}:`, err)
        }
      })
    )
  }

  const now = new Date()
  for (const competitorId of touchedCompetitors) {
    await db.update(trackedCompetitors).set({ lastScrapedAt: now }).where(eq(trackedCompetitors.id, competitorId))
  }

  return NextResponse.json({ total: products.length, scraped, failed })
}
