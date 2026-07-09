import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" })
  const session = await auth()
  if (!session?.user?.id) return NextResponse.redirect(new URL("/auth/login", req.url))

  const db = getDb()
  const [membership] = await db
    .select({ org: organizations })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(organizationMembers.userId, session.user.id))
    .limit(1)

  if (!membership?.org.stripeCustomerId) return NextResponse.redirect(new URL("/dashboard/billing", req.url))

  const portal = await stripe.billingPortal.sessions.create({
    customer: membership.org.stripeCustomerId,
    return_url: `${req.nextUrl.origin}/dashboard/billing`,
  })

  return NextResponse.redirect(portal.url, { status: 303 })
}
