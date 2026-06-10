import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const { code } = await req.json()
  if (!code) return NextResponse.json({ ok: false })

  const supabase = createServiceClient()
  const { data: affiliate } = await supabase
    .from("affiliates")
    .select("id")
    .eq("code", code)
    .eq("status", "active")
    .single()

  if (!affiliate) return NextResponse.json({ ok: false })

  await supabase.from("affiliate_clicks").insert({ affiliate_id: affiliate.id })
  return NextResponse.json({ ok: true })
}
