import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Stripe from "stripe"

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" })
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL("/auth/login", req.url))

  const formData = await req.formData()
  const priceId = formData.get("priceId") as string

  const { data: userData } = await supabase.from("users").select("stripe_customer_id, email").eq("id", user.id).single()

  let customerId = userData?.stripe_customer_id
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: userData?.email ?? user.email!,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id
    await supabase.from("users").update({ stripe_customer_id: customerId }).eq("id", user.id)
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_APP_URL
    : `https://${req.headers.get("host")}`

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard/billing?success=true`,
    cancel_url: `${baseUrl}/dashboard/billing?cancelled=true`,
    metadata: { user_id: user.id },
  })

  return NextResponse.redirect(session.url!, 303)
}
