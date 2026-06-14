import { NextRequest, NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { shop_domain } = await req.json()
  if (!shop_domain) return NextResponse.json({ error: "shop_domain required" }, { status: 400 })

  const svc = await createServiceClient()

  // Get access token
  const { data: install } = await svc
    .from("shopify_installations")
    .select("access_token")
    .eq("shop_domain", shop_domain)
    .is("uninstalled_at", null)
    .single()

  if (!install) return NextResponse.json({ error: "Shop not connected" }, { status: 404 })

  // Fetch products from Shopify
  const res = await fetch(`https://${shop_domain}/admin/api/2024-01/products.json?limit=250&fields=id,title,body_html,vendor,product_type,tags,variants,images`, {
    headers: { "X-Shopify-Access-Token": install.access_token },
  })

  if (!res.ok) return NextResponse.json({ error: "Shopify API error" }, { status: 502 })

  const { products } = await res.json()

  // Get user's org
  const { data: org } = await supabase
    .from("organizations")
    .select("id")
    .eq("owner_id", user.id)
    .single()

  if (!org) return NextResponse.json({ error: "No organization found" }, { status: 400 })

  // Link shop to user
  await svc.from("shopify_installations")
    .update({ user_id: user.id })
    .eq("shop_domain", shop_domain)

  // Import products
  let imported = 0
  for (const p of products) {
    const name = p.title ?? ""
    const reference = p.variants?.[0]?.sku ?? String(p.id)
    const sourceId = String(p.id)

    // Check if already imported
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("org_id", org.id)
      .eq("source", "shopify")
      .eq("source_id", sourceId)
      .single()

    if (!existing) {
      await supabase.from("products").insert({
        org_id: org.id,
        name,
        reference: reference || null,
        source: "shopify",
        source_id: sourceId,
        product_url: `https://${shop_domain}/products/${p.handle}`,
        intended_use: p.body_html?.replace(/<[^>]+>/g, " ").trim().slice(0, 500) || null,
      })
      imported++
    }
  }

  return NextResponse.json({ total: products.length, imported })
}
