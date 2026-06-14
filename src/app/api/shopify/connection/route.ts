import { NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const svc = await createServiceClient()
  const { data } = await svc
    .from("shopify_installations")
    .select("shop_domain")
    .eq("user_id", user.id)
    .is("uninstalled_at", null)
    .order("installed_at", { ascending: false })
    .limit(1)
    .single()

  if (!data) return NextResponse.json({ shop_domain: null })
  return NextResponse.json({ shop_domain: data.shop_domain })
}
