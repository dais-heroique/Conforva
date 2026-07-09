import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })

    const { name } = z.object({ name: z.string().min(1).max(100) }).parse(await req.json())
    const db = getDb()

    const [membership] = await db
      .select({ org: organizations })
      .from(organizationMembers)
      .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
      .where(eq(organizationMembers.userId, session.user.id))
      .limit(1)

    if (!membership) return NextResponse.json({ error: "NO_ORG" }, { status: 404 })

    await db.update(organizations).set({ name }).where(eq(organizations.id, membership.org.id))
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: "INVALID" }, { status: 400 })
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}
