import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" })
  const session = await auth()
  if (!session?.user?.id) return NextResponse.redirect(new URL("/auth/login", req.url))

  const db = getDb()
  const formData = await req.formData()
  const priceId = formData.get("priceId") as string
  if (!priceId) return NextResponse.json({ error: "MISSING_PRICE_ID" }, { status: 400 })

  const [membership] = await db
    .select({ org: organizations })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(organizationMembers.userId, session.user.id))
    .limit(1)

  if (!membership) return NextResponse.redirect(new URL("/onboarding", req.url))
  const org = membership.org
  const baseUrl = req.nextUrl.origin

  let customerId = org.stripeCustomerId ?? undefined
  if (!customerId) {
    const [user] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1)
    const customer = await stripe.customers.create({
      email: user?.email ?? session.user.email!,
      name: user?.name ?? session.user.name ?? undefined,
      metadata: { orgId: org.id, userId: session.user.id },
    })
    customerId = customer.id
    await db.update(organizations).set({ stripeCustomerId: customerId }).where(eq(organizations.id, org.id))
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${baseUrl}/dashboard/billing?success=1`,
    cancel_url: `${baseUrl}/dashboard/billing`,
    metadata: { orgId: org.id },
    subscription_data: { trial_period_days: 14, metadata: { orgId: org.id } },
  })

  return NextResponse.redirect(checkoutSession.url!, { status: 303 })
}
