import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const db = getDb()
  const [membership] = await db
    .select({ orgId: organizations.id, orgName: organizations.name })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(organizationMembers.userId, session.user.id))
    .limit(1)

  return NextResponse.json({
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    orgId: membership?.orgId ?? null,
    orgName: membership?.orgName ?? null,
  })
}
