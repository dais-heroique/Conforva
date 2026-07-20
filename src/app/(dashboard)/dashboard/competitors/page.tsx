import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, trackedCompetitors, trackedProducts } from "@/lib/db/schema"
import { eq, and, count } from "drizzle-orm"
import { Eye, Plus, ExternalLink } from "lucide-react"
import { getLocale } from "@/lib/i18n/locale"
import { withUnlimitedAccess } from "@/lib/admin"

const PLATFORM_COLORS: Record<string, string> = {
  shopify: "bg-green-500/15 text-green-400",
  amazon: "bg-orange-500/15 text-orange-400",
  woocommerce: "bg-blue-500/15 text-blue-400",
  prestashop: "bg-purple-500/15 text-purple-400",
  custom: "bg-gray-500/15 text-gray-400",
}

const DICT = {
  fr: {
    title: "Concurrents",
    included: (n: number, limit: number) => `${n} / ${limit} inclus dans votre plan`,
    add: "Ajouter",
    noCompetitor: "Aucun concurrent suivi",
    addFirstDesc: "Ajoutez l'URL d'un concurrent pour démarrer la surveillance automatique de ses prix et stocks.",
    addFirst: "Ajouter mon premier concurrent",
    limitReached: (limit: number) => `Vous avez atteint la limite de ${limit} concurrent(s) sur votre plan actuel.`,
    upgrade: "Passer au plan supérieur →",
  },
  en: {
    title: "Competitors",
    included: (n: number, limit: number) => `${n} / ${limit} included in your plan`,
    add: "Add",
    noCompetitor: "No competitor tracked",
    addFirstDesc: "Add a competitor's URL to start automatically monitoring their prices and stock.",
    addFirst: "Add my first competitor",
    limitReached: (limit: number) => `You've reached the limit of ${limit} competitor(s) on your current plan.`,
    upgrade: "Upgrade plan →",
  },
}

export default async function CompetitorsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/login")

  const locale = await getLocale()
  const t = DICT[locale]

  const db = getDb()

  const [membership] = await db
    .select({ org: organizations })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(organizationMembers.userId, session.user.id))
    .limit(1)

  if (!membership) redirect("/onboarding")
  const org = withUnlimitedAccess(membership.org, session.user.email)

  const competitors = await db
    .select()
    .from(trackedCompetitors)
    .where(eq(trackedCompetitors.organizationId, org.id))
    .orderBy(trackedCompetitors.createdAt)

  return (
    <div className="p-6 space-y-6 bg-[#08090C] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t.title}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{t.included(competitors.length, org.competitorLimit)}</p>
        </div>
        {competitors.length < org.competitorLimit && (
          <Link
            href="/dashboard/competitors/new"
            className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-violet-900/20"
          >
            <Plus className="h-4 w-4" />
            {t.add}
          </Link>
        )}
      </div>

      {competitors.length === 0 ? (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-14 text-center">
          <div className="h-16 w-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-5">
            <Eye className="h-7 w-7 text-[#A78BFA]" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">{t.noCompetitor}</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            {t.addFirstDesc}
          </p>
          <Link
            href="/dashboard/competitors/new"
            className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="h-4 w-4" />
            {t.addFirst}
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {competitors.map((c) => (
            <Link
              key={c.id}
              href={`/dashboard/competitors/${c.id}`}
              className="bg-white/4 border border-white/8 hover:border-[#8B5CF6]/30 hover:bg-white/6 rounded-2xl p-5 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-11 w-11 rounded-xl bg-[#8B5CF6]/12 border border-[#8B5CF6]/20 flex items-center justify-center text-[#A78BFA] font-bold text-sm flex-shrink-0">
                  {c.name[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white group-hover:text-[#A78BFA] transition-colors">{c.name}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                    <ExternalLink className="h-3 w-3" />
                    {c.domain}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PLATFORM_COLORS[c.platform] ?? PLATFORM_COLORS.custom}`}>
                  {c.platform}
                </span>
                <span className={`h-2 w-2 rounded-full ${c.isActive ? "bg-[#8B5CF6]" : "bg-gray-600"}`} />
              </div>
            </Link>
          ))}
        </div>
      )}

      {competitors.length >= org.competitorLimit && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 text-sm text-orange-300">
          {t.limitReached(org.competitorLimit)}{" "}
          <Link href="/dashboard/billing" className="underline">{t.upgrade}</Link>
        </div>
      )}
    </div>
  )
}
