import { NextResponse } from "next/server"
import { z } from "zod"
import { scrapeProductPrice, type ScrapeDebugInfo } from "@/lib/scraping/price"
import { getDb } from "@/lib/db"
import { publicToolUsage } from "@/lib/db/schema"
import { and, eq, count } from "drizzle-orm"

const schema = z.object({
  yourUrl: z.string().url(),
  competitorUrl: z.string().url(),
})

const TOOL_NAME = "compare-prices"
const FREE_USES_PER_IP = 2

// Small in-memory burst limiter — resets on cold start, catches rapid-fire abuse
// within the same instance while the persistent per-IP cap (below) settles.
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function isBurstLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  timestamps.push(now)
  hits.set(ip, timestamps)
  return timestamps.length > MAX_PER_WINDOW
}

function getIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req)
    if (isBurstLimited(ip)) {
      return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 })
    }

    const db = getDb()

    // Persistent per-IP cap — the free tool is a lead magnet, not a substitute
    // for the actual product. Two lifetime comparisons per IP, then sign up.
    const [{ used }] = await db
      .select({ used: count() })
      .from(publicToolUsage)
      .where(and(eq(publicToolUsage.ip, ip), eq(publicToolUsage.tool, TOOL_NAME)))

    if (used >= FREE_USES_PER_IP) {
      return NextResponse.json({ error: "FREE_LIMIT_REACHED", limit: FREE_USES_PER_IP }, { status: 403 })
    }

    const body = await req.json()
    const { yourUrl, competitorUrl } = schema.parse(body)

    // Record the attempt before scraping — an attempt still costs compute even
    // if no price is found, and this closes the "retry with garbage URLs" loophole.
    await db.insert(publicToolUsage).values({ ip, tool: TOOL_NAME })

    const yoursDebug: ScrapeDebugInfo = { strategy: null, httpStatus: null, htmlLength: null, candidatesFound: null, error: null }
    const competitorDebug: ScrapeDebugInfo = { strategy: null, httpStatus: null, htmlLength: null, candidatesFound: null, error: null }

    const [yours, competitor] = await Promise.all([
      scrapeProductPrice(yourUrl, yoursDebug),
      scrapeProductPrice(competitorUrl, competitorDebug),
    ])

    console.log("[public/compare-prices] yours:", yourUrl, JSON.stringify(yoursDebug), "price:", yours?.price ?? null)
    console.log("[public/compare-prices] competitor:", competitorUrl, JSON.stringify(competitorDebug), "price:", competitor?.price ?? null)

    if (!yours?.price && !competitor?.price) {
      return NextResponse.json({ error: "NO_PRICE_FOUND" }, { status: 422 })
    }

    let gapPercent: number | null = null
    if (yours?.price && competitor?.price) {
      gapPercent = ((yours.price - competitor.price) / competitor.price) * 100
    }

    return NextResponse.json({
      yours: yours ? { price: yours.price, currency: yours.currency, name: yours.name } : null,
      competitor: competitor ? { price: competitor.price, currency: competitor.currency, name: competitor.name } : null,
      gapPercent,
      usesRemaining: Math.max(0, FREE_USES_PER_IP - used - 1),
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 })
    }
    console.error("[public/compare-prices]", err)
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}
