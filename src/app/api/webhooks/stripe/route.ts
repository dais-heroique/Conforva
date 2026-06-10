import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import type { Plan } from "@/types/supabase"

const PLAN_MRR: Record<string, number> = {
  starter: 29,
  growth: 79,
  pro: 199,
  enterprise: 490,
}

// Statuses where the user keeps their paid plan (Stripe is still processing/retrying)
const ACTIVE_STATUSES = ["active", "trialing", "past_due"]

function periodEndISO(sub: Stripe.Subscription): string | null {
  const ts = sub.billing_schedules?.[0]?.bill_until?.computed_timestamp ?? sub.cancel_at ?? null
  return ts ? new Date(ts * 1000).toISOString() : null
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" })
  const PRICE_TO_PLAN: Record<string, Plan> = {
    [process.env.STRIPE_PRICE_STARTER ?? ""]: "starter",
    [process.env.STRIPE_PRICE_GROWTH ?? ""]: "growth",
    [process.env.STRIPE_PRICE_PRO ?? ""]: "pro",
  }
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
        subscription_period_end: periodEndISO(subscription),
      }).eq("id", userId)

      // Affiliate conversion tracking
      const affiliateRef = session.metadata?.affiliate_ref
      if (affiliateRef) {
        const svc = createServiceClient()
        const { data: affiliate } = await svc
          .from("affiliates")
          .select("id, commission_rate")
          .eq("code", affiliateRef)
          .eq("status", "active")
          .single()

        if (affiliate) {
          const mrr = PLAN_MRR[plan] ?? 29
          const commission = mrr * Number(affiliate.commission_rate)
          await svc.from("affiliate_conversions").insert({
            affiliate_id: affiliate.id,
            user_id: userId,
            plan,
            mrr,
            commission,
            stripe_subscription_id: subscriptionId,
          })
        }
      }
    }
  }

  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string
    const priceId = sub.items.data[0].price.id
    const plan = PRICE_TO_PLAN[priceId] ?? "free"
    const isActive = ACTIVE_STATUSES.includes(sub.status)

    const { data: userData } = await supabase
      .from("users")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single()

    if (userData) {
      await supabase.from("users").update({
        plan: isActive ? plan : "free",
        subscription_status: sub.status,
        subscription_period_end: periodEndISO(sub),
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
        subscription_period_end: null,
      }).eq("id", userData.id)
    }
  }

  return NextResponse.json({ received: true })
}
