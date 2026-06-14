import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { createServiceClient } from "@/lib/supabase/server"

function verifyWebhook(body: string, hmacHeader: string, secret: string): boolean {
  const digest = crypto.createHmac("sha256", secret).update(body, "utf8").digest("base64")
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader))
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const hmac = req.headers.get("x-shopify-hmac-sha256") ?? ""
  const topic = req.headers.get("x-shopify-topic") ?? ""
  const shop = req.headers.get("x-shopify-shop-domain") ?? ""

  if (!verifyWebhook(body, hmac, process.env.SHOPIFY_API_SECRET!)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  if (topic === "app/uninstalled") {
    const supabase = await createServiceClient()
    await supabase.from("shopify_installations")
      .update({ uninstalled_at: new Date().toISOString(), access_token: "" })
      .eq("shop_domain", shop)
  }

  return NextResponse.json({ ok: true })
}
