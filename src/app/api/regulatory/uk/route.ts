import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const UK_API_BASE = "https://www.legislation.gov.uk"

const KEY_UK_LEGISLATION = [
  { title: "Product Safety and Metrology etc. (Amendment) Regulations 2024", year: 2024, number: "1130", type: "uksi" },
  { title: "General Product Safety Regulations 2005", year: 2005, number: "1803", type: "uksi" },
  { title: "Consumer Protection Act 1987", year: 1987, number: "43", type: "ukpga" },
  { title: "Electrical Equipment (Safety) Regulations 2016", year: 2016, number: "1101", type: "uksi" },
  { title: "Radio Equipment Regulations 2017", year: 2017, number: "1206", type: "uksi" },
]

async function fetchUKLegislationMeta(item: typeof KEY_UK_LEGISLATION[0]) {
  try {
    const url = `${UK_API_BASE}/${item.type}/${item.year}/${item.number}/made/data.json`
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return null
    const json = await res.json()
    return {
      title: json?.title ?? item.title,
      date: json?.date?.value ?? String(item.year),
      description: json?.description ?? "",
      url: `${UK_API_BASE}/${item.type}/${item.year}/${item.number}/contents`,
    }
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get("q")

  if (search) {
    try {
      const res = await fetch(
        `${UK_API_BASE}/search.json?text=${encodeURIComponent(search)}&type=uksi&limit=5`,
        { signal: AbortSignal.timeout(8000) }
      )
      if (res.ok) {
        const json = await res.json()
        const items = (json?.results ?? []).slice(0, 5).map((r: any) => ({
          title: r.title ?? "",
          date: r.year ?? "",
          url: `${UK_API_BASE}${r.link ?? ""}`,
          description: r.description ?? "",
        }))
        return NextResponse.json({ source: "legislation.gov.uk", live: true, query: search, items, fetched_at: new Date().toISOString() })
      }
    } catch {}
  }

  const results = await Promise.all(
    KEY_UK_LEGISLATION.map(async (item) => {
      const meta = await fetchUKLegislationMeta(item)
      return meta ?? {
        title: item.title,
        date: String(item.year),
        description: "",
        url: `${UK_API_BASE}/${item.type}/${item.year}/${item.number}/contents`,
      }
    })
  )

  return NextResponse.json({
    source: "legislation.gov.uk",
    live: true,
    items: results,
    fetched_at: new Date().toISOString(),
  })
}
