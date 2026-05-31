import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"
import type { Plan } from "@/types/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" })

const PRICE_TO_PLAN: Record<string, Plan> = {
  [process.env.STRIPE_PRICE_STARTER ?? ""]: "starter",
  [process.env.STRIPE_PRICE_GROWTH ?? ""]: "growth",
  [process.env.STRIPE_PRICE_PRO ?? ""]: "pro",
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = await createClient()

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.user_id
    const subscriptionId = session.subscription as string

    if (userId && subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const priceId = subscription.items.data[0].price.id
      const plan = PRICE_TO_PLAN[priceId] ?? "starter"

      await supabase.from("users").update({
        plan,
        stripe_subscription_id: subscriptionId,
        subscription_status: "active",
      }).eq("id", userId)
    }
  }

  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string
    const priceId = sub.items.data[0].price.id
    const plan = PRICE_TO_PLAN[priceId] ?? "free"

    const { data: userData } = await supabase
      .from("users")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single()

    if (userData) {
      await supabase.from("users").update({
        plan: sub.status === "active" ? plan : "free",
        subscription_status: sub.status,
      }).eq("id", userData.id)
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string

    const { data: userData } = await supabase
      .from("users")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single()

    if (userData) {
      await supabase.from("users").update({
        plan: "free",
        subscription_status: "cancelled",
        stripe_subscription_id: null,
      }).eq("id", userData.id)
    }
  }

  return NextResponse.json({ received: true })
}
