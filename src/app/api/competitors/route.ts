import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, trackedCompetitors } from "@/lib/db/schema"
import { eq, and, count } from "drizzle-orm"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1).max(100),
  domain: z.string().min(1).max(500),
  platform: z.enum(["shopify", "amazon", "woocommerce", "prestashop", "custom"]),
  scrapeFrequency: z.enum(["hourly", "daily", "twice_daily"]).default("daily"),
})

function normalizeDomain(input: string): string {
  try {
    const url = input.startsWith("http") ? input : `https://${input}`
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return input
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })

    const db = getDb()

    const [membership] = await db
      .select({ org: organizations })
      .from(organizationMembers)
      .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
      .where(eq(organizationMembers.userId, session.user.id))
      .limit(1)

    if (!membership) return NextResponse.json({ error: "NO_ORG" }, { status: 404 })
    const org = membership.org

    const body = await req.json()
    const { name, domain, platform, scrapeFrequency } = schema.parse(body)

    const [existing] = await db
      .select({ c: count() })
      .from(trackedCompetitors)
      .where(and(eq(trackedCompetitors.organizationId, org.id), eq(trackedCompetitors.isActive, true)))

    if ((existing?.c ?? 0) >= org.competitorLimit) {
      return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 403 })
    }

    const [competitor] = await db
      .insert(trackedCompetitors)
      .values({
        organizationId: org.id,
        name,
        domain: normalizeDomain(domain),
        platform,
        scrapeFrequency,
        isActive: true,
      })
      .returning()

    return NextResponse.json({ success: true, competitor })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 })
    console.error("[competitors/POST]", err)
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })

    const db = getDb()

    const [membership] = await db
      .select({ org: organizations })
      .from(organizationMembers)
      .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
      .where(eq(organizationMembers.userId, session.user.id))
      .limit(1)

    if (!membership) return NextResponse.json({ error: "NO_ORG" }, { status: 404 })

    const competitors = await db
      .select()
      .from(trackedCompetitors)
      .where(eq(trackedCompetitors.organizationId, membership.org.id))

    return NextResponse.json({ competitors })
  } catch (err) {
    console.error("[competitors/GET]", err)
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}
