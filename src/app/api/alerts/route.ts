import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, alerts } from "@/lib/db/schema"
import { eq, and, count } from "drizzle-orm"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(["price_drop", "price_increase", "out_of_stock", "back_in_stock", "new_product"]),
  competitorId: z.string().nullable().optional(),
  productId: z.string().nullable().optional(),
  threshold: z.number().nullable().optional(),
})

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

    const [existing] = await db.select({ c: count() }).from(alerts).where(and(eq(alerts.organizationId, org.id), eq(alerts.isActive, true)))
    if ((existing?.c ?? 0) >= org.alertLimit) {
      return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 403 })
    }

    const body = schema.parse(await req.json())
    const [alert] = await db.insert(alerts).values({
      organizationId: org.id,
      name: body.name,
      type: body.type,
      competitorId: body.competitorId ?? null,
      productId: body.productId ?? null,
      threshold: body.threshold ?? null,
      isActive: true,
      emailNotification: true,
    }).returning()

    return NextResponse.json({ success: true, alert })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 })
    console.error("[alerts/POST]", err)
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}
