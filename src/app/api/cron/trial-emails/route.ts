import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { users, organizations, organizationMembers, trackedCompetitors, sentEmails } from "@/lib/db/schema"
import { eq, and, count } from "drizzle-orm"
import { sendEmail } from "@/lib/email/send"
import { day3NudgeEmail, day7TipsEmail, day13UpgradeNudgeEmail } from "@/lib/email/templates"

export const maxDuration = 120

// Vercel Cron sends a GET request with the Authorization header set automatically.
export async function GET(req: Request) {
  return handleTrialEmails(req)
}

// Kept for manual/admin triggering via POST.
export async function POST(req: Request) {
  return handleTrialEmails(req)
}

function ageInDays(createdAt: Date): number {
  return Math.floor((Date.now() - createdAt.getTime()) / (24 * 60 * 60 * 1000))
}

async function handleTrialEmails(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })
  }

  const db = getDb()

  // Only free-plan users — paid customers don't need onboarding nudges.
  const rows = await db
    .select({ user: users, org: organizations })
    .from(organizationMembers)
    .innerJoin(users, eq(organizationMembers.userId, users.id))
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(organizations.plan, "free"))

  let sent = 0

  for (const { user, org } of rows) {
    const age = ageInDays(user.createdAt)
    const firstName = user.name?.split(" ")[0] || user.email.split("@")[0]

    try {
      if (age === 3) {
        const [{ competitorCount }] = await db
          .select({ competitorCount: count() })
          .from(trackedCompetitors)
          .where(and(eq(trackedCompetitors.organizationId, org.id), eq(trackedCompetitors.isActive, true)))

        if (competitorCount === 0) {
          const wasSent = await trySend(db, user.id, "day3_nudge", () => day3NudgeEmail(firstName), user.email)
          if (wasSent) sent++
        }
      } else if (age === 7) {
        const wasSent = await trySend(db, user.id, "day7_tips", () => day7TipsEmail(firstName), user.email)
        if (wasSent) sent++
      } else if (age === 13) {
        const wasSent = await trySend(db, user.id, "day13_upgrade", () => day13UpgradeNudgeEmail(firstName), user.email)
        if (wasSent) sent++
      }
    } catch (err) {
      console.error(`[cron/trial-emails] failed for user ${user.id}:`, err)
    }
  }

  return NextResponse.json({ checked: rows.length, sent })
}

async function trySend(
  db: ReturnType<typeof getDb>,
  userId: string,
  emailType: string,
  build: () => { subject: string; html: string; text: string },
  to: string
): Promise<boolean> {
  const [already] = await db
    .select({ id: sentEmails.id })
    .from(sentEmails)
    .where(and(eq(sentEmails.userId, userId), eq(sentEmails.emailType, emailType)))
    .limit(1)

  if (already) return false

  const { subject, html, text } = build()
  await sendEmail({ to, subject, html, text })
  await db.insert(sentEmails).values({ userId, emailType }).onConflictDoNothing()
  return true
}
