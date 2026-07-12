import { NextResponse } from "next/server"
import { z } from "zod"
import { scrapeProductPrice } from "@/lib/scraping/price"

const schema = z.object({
  yourUrl: z.string().url(),
  competitorUrl: z.string().url(),
})

// Very small in-memory rate limiter — resets on cold start, best-effort only.
// Good enough to deter casual abuse of a free public tool without adding infra.
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  timestamps.push(now)
  hits.set(ip, timestamps)
  return timestamps.length > MAX_PER_WINDOW
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 })
    }

    const body = await req.json()
    const { yourUrl, competitorUrl } = schema.parse(body)

    const [yours, competitor] = await Promise.all([
      scrapeProductPrice(yourUrl),
      scrapeProductPrice(competitorUrl),
    ])

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
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 })
    }
    console.error("[public/compare-prices]", err)
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}
