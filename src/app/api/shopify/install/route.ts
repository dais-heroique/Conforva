import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get("shop")
  if (!shop || !shop.match(/^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$/)) {
    return NextResponse.json({ error: "Invalid shop parameter" }, { status: 400 })
  }

  const apiKey = process.env.SHOPIFY_API_KEY!
  const scopes = "read_products,write_products"
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/shopify/callback`
  const state = crypto.randomBytes(16).toString("hex")

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`

  const response = NextResponse.redirect(installUrl)
  // Store state in cookie for CSRF validation
  response.cookies.set("shopify_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  })
  return response
}
