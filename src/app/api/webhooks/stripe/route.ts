import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getDb } from "@/lib/db"
import { organizations } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

const PLAN_BY_PRICE: Record<string, { plan: string; competitorLimit: number; productLimit: number; alertLimit: number }> = {
  [process.env.STRIPE_PRICE_STARTER!]: { plan: "starter", competitorLimit: 2, productLimit: 20, alertLimit: 5 },
  [process.env.STRIPE_PRICE_GROWTH!]: { plan: "growth", competitorLimit: 10, productLimit: 150, alertLimit: 999 },
  [process.env.STRIPE_PRICE_PRO!]: { plan: "pro", competitorLimit: 999, productLimit: 9999, alertLimit: 9999 },
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" })
  const sig = req.headers.get("stripe-signature")
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 })

  const body = await req.text()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const db = getDb()

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const orgId = session.metadata?.orgId
        if (!orgId || !session.subscription) break

        const sub = await stripe.subscriptions.retrieve(session.subscription as string)
        const priceId = sub.items.data[0]?.price.id
        const planInfo = PLAN_BY_PRICE[priceId] ?? { plan: "starter", competitorLimit: 2, productLimit: 20, alertLimit: 5 }

        await db.update(organizations).set({
          stripeSubscriptionId: sub.id,
          stripeCustomerId: session.customer as string,
          subscriptionStatus: sub.status,
          plan: planInfo.plan as any,
          competitorLimit: planInfo.competitorLimit,
          productLimit: planInfo.productLimit,
          alertLimit: planInfo.alertLimit,
        }).where(eq(organizations.id, orgId))
        break
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription
        const orgId = sub.metadata?.orgId
        if (!orgId) break

        const priceId = sub.items.data[0]?.price.id
        const planInfo = PLAN_BY_PRICE[priceId]

        await db.update(organizations).set({
          subscriptionStatus: sub.status,
          ...(planInfo ? {
            plan: planInfo.plan as any,
            competitorLimit: planInfo.competitorLimit,
            productLimit: planInfo.productLimit,
            alertLimit: planInfo.alertLimit,
          } : {}),
        }).where(eq(organizations.id, orgId))
        break
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription
        const orgId = sub.metadata?.orgId
        if (!orgId) break

        await db.update(organizations).set({
          subscriptionStatus: "canceled",
          plan: "free",
          competitorLimit: 2,
          productLimit: 20,
          alertLimit: 5,
        }).where(eq(organizations.id, orgId))
        break
      }
    }
  } catch (err) {
    console.error("[stripe/webhook]", err)
    return NextResponse.json({ error: "Handler error" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
