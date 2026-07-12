import { getDb } from "@/lib/db"
import { users, organizations, organizationMembers, sentEmails } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/lib/email/send"
import { welcomeEmail } from "@/lib/email/templates"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

async function uniqueSlug(base: string): Promise<string> {
  const db = getDb()
  let slug = slugify(base)
  let attempt = 0
  while (true) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt}`
    const [existing] = await db.select().from(organizations).where(eq(organizations.slug, candidate)).limit(1)
    if (!existing) return candidate
    attempt++
  }
}

export async function registerUser({
  name,
  email,
  password,
  orgName,
}: {
  name: string
  email: string
  password: string
  orgName?: string
}) {
  const db = getDb()

  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (existing) throw new Error("EMAIL_EXISTS")

  const passwordHash = await bcrypt.hash(password, 12)
  const userId = crypto.randomUUID()

  await db.insert(users).values({
    id: userId,
    name,
    email,
    passwordHash,
  })

  const orgNameFinal = orgName || `${name}'s Store`
  const slug = await uniqueSlug(orgNameFinal)
  const orgId = crypto.randomUUID()

  await db.insert(organizations).values({
    id: orgId,
    name: orgNameFinal,
    slug,
    ownerId: userId,
    plan: "free",
    competitorLimit: 2,
    productLimit: 20,
    alertLimit: 5,
  })

  await db.insert(organizationMembers).values({
    id: crypto.randomUUID(),
    organizationId: orgId,
    userId,
    role: "owner",
  })

  // Best-effort — never block registration on the welcome email.
  try {
    const { subject, html, text } = welcomeEmail(name.split(" ")[0] || name)
    await sendEmail({ to: email, subject, html, text })
    await db.insert(sentEmails).values({ userId, emailType: "welcome" }).onConflictDoNothing()
  } catch (err) {
    console.error("[register] welcome email failed:", err)
  }

  return { userId, orgId }
}
