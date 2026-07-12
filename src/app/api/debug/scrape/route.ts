import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { scrapeProductPrice } from "@/lib/scraping/price"
import type { ScrapeDebugInfo } from "@/lib/scraping/price"

export const runtime = "nodejs"

// Test the scraper against any URL. Requires a logged-in session so it can't be abused publicly.
export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url")
  if (!url) return NextResponse.json({ error: "Pass ?url=https://..." }, { status: 400 })

  const debug: ScrapeDebugInfo = { strategy: null, httpStatus: null, htmlLength: null, candidatesFound: null, error: null }
  const result = await scrapeProductPrice(url, debug)

  return NextResponse.json({ url, result, debug })
}
