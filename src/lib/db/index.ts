import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import * as schema from "./schema"

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

export function getDb() {
  if (!_db) {
    const url = process.env.TURSO_DATABASE_URL
    if (!url) throw new Error("TURSO_DATABASE_URL is not set")
    _db = drizzle(
      createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN }),
      { schema }
    )
  }
  return _db
}
export type DB = ReturnType<typeof getDb>
