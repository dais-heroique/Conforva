import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Stripe from "stripe"

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" })
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL("/auth/login", req.url))

  const { data: userData } = await supabase.from("users").select("stripe_customer_id").eq("id", user.id).single()
  if (!userData?.stripe_customer_id) {
    return NextResponse.redirect(new URL("/dashboard/billing", req.url))
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_APP_URL
    : `https://${req.headers.get("host")}`

  const session = await stripe.billingPortal.sessions.create({
    customer: userData.stripe_customer_id,
    return_url: `${baseUrl}/dashboard/billing`,
  })

  return NextResponse.redirect(session.url, 303)
}
