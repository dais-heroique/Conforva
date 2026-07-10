import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { users, organizations } from "@/lib/db/schema"
import { count } from "drizzle-orm"

export const runtime = "nodejs"

export async function GET() {
  const url = process.env.TURSO_DATABASE_URL ?? "NOT SET"
  const masked = url.length > 20 ? url.slice(0, 30) + "..." : url

  try {
    const db = getDb()
    const [u] = await db.select({ total: count() }).from(users)
    const [o] = await db.select({ total: count() }).from(organizations)

    return NextResponse.json({
      db_url: masked,
      users: u?.total ?? 0,
      orgs: o?.total ?? 0,
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
