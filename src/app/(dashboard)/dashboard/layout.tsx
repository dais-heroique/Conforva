import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"
import { getLocale } from "@/lib/i18n/locale"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/login")

  const userId = session.user.id
  const db = getDb()

  let [membership] = await db
    .select({ org: organizations })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(organizationMembers.userId, userId))
    .limit(1)

  // Fallback: user owns an org but the membership row is missing — auto-repair
  if (!membership) {
    const [ownedOrg] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.ownerId, userId))
      .limit(1)

    if (ownedOrg) {
      await db.insert(organizationMembers).values({
        id: crypto.randomUUID(),
        organizationId: ownedOrg.id,
        userId,
        role: "owner",
      }).onConflictDoNothing()
      membership = { org: ownedOrg }
    } else {
      redirect("/onboarding")
    }
  }

  const org = membership.org
  const locale = await getLocale()

  return (
    <div className="flex h-dvh overflow-hidden bg-[#08090C]">
      <DashboardSidebar
        user={{ id: userId, email: session.user.email!, name: session.user.name, image: session.user.image }}
        org={{ id: org.id, name: org.name, plan: org.plan }}
        locale={locale}
      />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
