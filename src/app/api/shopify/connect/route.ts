import { NextRequest, NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { shop_domain, access_token } = await req.json()
  if (!shop_domain || !access_token) {
    return NextResponse.json({ error: "shop_domain et access_token requis" }, { status: 400 })
  }

  const domain = shop_domain.trim().replace(/^https?:\/\//, "").replace(/\/$/, "")

  // Validate the token by calling Shopify API
  const test = await fetch(`https://${domain}/admin/api/2024-01/shop.json`, {
    headers: { "X-Shopify-Access-Token": access_token },
  })

  if (!test.ok) {
    return NextResponse.json({ error: "Token invalide ou domaine incorrect. Vérifiez vos informations." }, { status: 422 })
  }

  const svc = await createServiceClient()

  // Store the connection
  await svc.from("shopify_installations").upsert({
    shop_domain: domain,
    access_token,
    scope: "custom",
    user_id: user.id,
    uninstalled_at: null,
  }, { onConflict: "shop_domain" })

  return NextResponse.json({ ok: true, shop_domain: domain })
}
