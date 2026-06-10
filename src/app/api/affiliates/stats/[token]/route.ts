import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const supabase = await createServiceClient()

  const { data: affiliate, error } = await supabase
    .from("affiliates")
    .select("id, name, company, code, commission_rate, status, created_at")
    .eq("token", token)
    .single()

  if (error || !affiliate) {
    return NextResponse.json({ error: "not_found" }, { status: 404 })
  }

  const [{ count: clicks }, { data: conversions }] = await Promise.all([
    supabase
      .from("affiliate_clicks")
      .select("*", { count: "exact", head: true })
      .eq("affiliate_id", affiliate.id),
    supabase
      .from("affiliate_conversions")
      .select("plan, mrr, commission, status, created_at, paid_at")
      .eq("affiliate_id", affiliate.id)
      .order("created_at", { ascending: false }),
  ])

  const totalEarnings = (conversions ?? []).reduce((s, c) => s + Number(c.commission), 0)
  const paidEarnings = (conversions ?? []).filter(c => c.status === "paid").reduce((s, c) => s + Number(c.commission), 0)
  const pendingEarnings = totalEarnings - paidEarnings

  return NextResponse.json({
    affiliate,
    stats: {
      clicks: clicks ?? 0,
      conversions: conversions?.length ?? 0,
      total_earnings: totalEarnings,
      paid_earnings: paidEarnings,
      pending_earnings: pendingEarnings,
    },
    conversions: conversions ?? [],
  })
}
