import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const ECFR_BASE = "https://www.ecfr.gov/api/versioner/v1"
const CPSC_RECALLS_BASE = "https://www.saferproducts.gov/RestWebServices/Recall"

const KEY_TITLES = [
  { title: 16, chapter: "II", name: "Consumer Product Safety Commission (CPSC)", part: "1500", description: "Hazardous substances and articles" },
  { title: 16, chapter: "II", name: "CPSC — FHSA regulations", part: "1501", description: "Method for identifying toys and other articles intended for use by children under 3" },
  { title: 16, chapter: "II", name: "CPSC — Certification", part: "1110", description: "Certificates of compliance" },
  { title: 16, chapter: "II", name: "CPSC — Tracking labels", part: "1130", description: "Tracking label requirements for children's products" },
]

async function fetchECFRTitle(titleNum: number, part: string) {
  try {
    const today = new Date().toISOString().slice(0, 10)
    const res = await fetch(
      `${ECFR_BASE}/full/${today}/title-${titleNum}.json?section=${part}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      }
    )
    if (!res.ok) return null
    const json = await res.json()
    return {
      updated: json?.meta?.date ?? today,
      section_count: json?.children?.length ?? 0,
    }
  } catch {
    return null
  }
}

async function fetchRecentRecalls(productType?: string) {
  try {
    const url = productType
      ? `${CPSC_RECALLS_BASE}?RecallDateStart=2024-01-01&ProductType=${encodeURIComponent(productType)}&format=json&limit=5`
      : `${CPSC_RECALLS_BASE}?RecallDateStart=2024-06-01&format=json&limit=5`
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return []
    const json = await res.json()
    return (json ?? []).slice(0, 5).map((r: any) => ({
      id: r.RecallID ?? "",
      date: r.RecallDate ?? "",
      title: r.Title ?? r.ProductName ?? "",
      hazard: r.Hazards?.[0]?.Name ?? "",
      url: r.URL ?? `https://www.cpsc.gov/Recalls`,
      manufacturer: r.Manufacturers?.[0]?.Name ?? "",
    }))
  } catch {
    return []
  }
}

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const productType = searchParams.get("productType") ?? undefined

  const [regulationsData, recalls] = await Promise.all([
    Promise.all(
      KEY_TITLES.map(async (item) => {
        const meta = await fetchECFRTitle(item.title, item.part)
        return {
          ...item,
          ecfr_url: `https://www.ecfr.gov/current/title-${item.title}/chapter-${item.chapter}/part-${item.part}`,
          updated: meta?.updated ?? null,
          cpsc_url: `https://www.cpsc.gov/Regulations-Laws--Standards/Rulemaking/Final-and-Proposed-Rules`,
        }
      })
    ),
    fetchRecentRecalls(productType),
  ])

  return NextResponse.json({
    source: "eCFR / CPSC",
    regulations: regulationsData,
    recent_recalls: recalls,
    cpsc_recalls_url: "https://www.cpsc.gov/Recalls",
    fetched_at: new Date().toISOString(),
  })
}
