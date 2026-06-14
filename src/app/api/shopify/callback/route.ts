import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { createServiceClient } from "@/lib/supabase/server"

function verifyHmac(query: URLSearchParams, secret: string): boolean {
  const hmac = query.get("hmac")
  if (!hmac) return false

  const params = new URLSearchParams()
  query.forEach((value, key) => {
    if (key !== "hmac") params.append(key, value)
  })

  // Sort params
  const sortedParams = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&")

  const digest = crypto.createHmac("sha256", secret).update(sortedParams).digest("hex")
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmac))
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const shop = params.get("shop")
  const code = params.get("code")
  const state = params.get("state")

  if (!shop || !code || !state) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  // Verify state (CSRF protection)
  const cookieState = req.cookies.get("shopify_oauth_state")?.value
  if (!cookieState || cookieState !== state) {
    return NextResponse.json({ error: "Invalid state" }, { status: 403 })
  }

  // Verify HMAC
  const secret = process.env.SHOPIFY_API_SECRET!
  if (!verifyHmac(params, secret)) {
    return NextResponse.json({ error: "Invalid HMAC" }, { status: 403 })
  }

  // Exchange code for access token
  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    }),
  })

  if (!tokenRes.ok) {
    return NextResponse.json({ error: "Token exchange failed" }, { status: 500 })
  }

  const { access_token, scope } = await tokenRes.json()

  // Store in DB
  const supabase = await createServiceClient()
  await supabase.from("shopify_installations").upsert({
    shop_domain: shop,
    access_token,
    scope,
    uninstalled_at: null,
  }, { onConflict: "shop_domain" })

  // Register mandatory webhooks
  await fetch(`https://${shop}/admin/api/2024-01/webhooks.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": access_token,
    },
    body: JSON.stringify({
      webhook: {
        topic: "app/uninstalled",
        address: `${process.env.NEXT_PUBLIC_APP_URL}/api/shopify/webhooks`,
        format: "json",
      },
    }),
  })

  // Clear state cookie and redirect to app
  const appUrl = `${process.env.NEXT_PUBLIC_APP_URL}/shopify-app?shop=${shop}`
  const response = NextResponse.redirect(appUrl)
  response.cookies.delete("shopify_oauth_state")
  return response
}
