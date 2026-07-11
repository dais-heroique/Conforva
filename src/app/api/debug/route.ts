import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { users, organizations, organizationMembers } from "@/lib/db/schema"
import { count } from "drizzle-orm"

export const runtime = "nodejs"

export async function GET() {
  const url = process.env.TURSO_DATABASE_URL ?? "NOT SET"
  const masked = url.length > 20 ? url.slice(0, 30) + "..." : url

  try {
    const db = getDb()
    const [u] = await db.select({ total: count() }).from(users)
    const [o] = await db.select({ total: count() }).from(organizations)
    const [m] = await db.select({ total: count() }).from(organizationMembers)

    const allUsers = await db.select({ email: users.email, name: users.name, hasPassword: users.passwordHash }).from(users)
    const maskedUsers = allUsers.map(u => ({
      email: u.email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + "*".repeat(b.length) + c),
      name: u.name,
      hasPassword: !!u.hasPassword,
    }))

    return NextResponse.json({
      db_url: masked,
      users: u?.total ?? 0,
      orgs: o?.total ?? 0,
      memberships: m?.total ?? 0,
      accounts: maskedUsers,
      ok: true,
    })
  } catch (err) {
    return NextResponse.json({
      db_url: masked,
      error: String(err),
      ok: false,
    }, { status: 500 })
  }
}
