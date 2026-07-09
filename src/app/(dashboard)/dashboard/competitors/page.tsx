import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, trackedCompetitors, trackedProducts } from "@/lib/db/schema"
import { eq, and, count } from "drizzle-orm"
import { Eye, Plus, ExternalLink } from "lucide-react"

const PLATFORM_COLORS: Record<string, string> = {
  shopify: "bg-green-500/15 text-green-400",
  amazon: "bg-orange-500/15 text-orange-400",
  woocommerce: "bg-blue-500/15 text-blue-400",
  prestashop: "bg-purple-500/15 text-purple-400",
  custom: "bg-gray-500/15 text-gray-400",
}

export default async function CompetitorsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/login")

  const db = getDb()

  const [membership] = await db
    .select({ org: organizations })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(organizationMembers.userId, session.user.id))
    .limit(1)

  if (!membership) redirect("/onboarding")
  const org = membership.org

  const competitors = await db
    .select()
    .from(trackedCompetitors)
    .where(eq(trackedCompetitors.organizationId, org.id))
    .orderBy(trackedCompetitors.createdAt)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Concurrents</h1>
          <p className="text-sm text-gray-500 mt-0.5">{competitors.length} / {org.competitorLimit} inclus dans votre plan</p>
        </div>
        {competitors.length < org.competitorLimit && (
          <Link
            href="/dashboard/competitors/new"
            className="flex items-center gap-2 bg-[#00E676] hover:bg-[#00c964] text-[#060D09] font-bold text-sm px-4 py-2 rounded-xl transition-colors"
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </Link>
        )}
      </div>

      {competitors.length === 0 ? (
        <div className="bg-white/5 border border-white/8 rounded-2xl p-12 text-center">
          <Eye className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">Aucun concurrent suivi</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            Ajoutez l'URL d'un concurrent pour démarrer la surveillance automatique de ses prix et stocks.
          </p>
          <Link
            href="/dashboard/competitors/new"
            className="inline-flex items-center gap-2 bg-[#00E676] text-[#060D09] font-bold text-sm px-6 py-2.5 rounded-xl"
          >
            <Plus className="h-4 w-4" />
            Ajouter mon premier concurrent
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {competitors.map((c) => (
            <Link
              key={c.id}
              href={`/dashboard/competitors/${c.id}`}
              className="bg-white/5 border border-white/8 hover:border-[#00E676]/30 rounded-2xl p-5 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-white/8 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {c.name[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white">{c.name}</p>
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
                <span className={`h-2 w-2 rounded-full ${c.isActive ? "bg-[#00E676]" : "bg-gray-600"}`} />
              </div>
            </Link>
          ))}
        </div>
      )}

      {competitors.length >= org.competitorLimit && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 text-sm text-orange-300">
          Vous avez atteint la limite de {org.competitorLimit} concurrent(s) sur votre plan actuel.{" "}
          <Link href="/dashboard/billing" className="underline">Passer au plan supérieur →</Link>
        </div>
      )}
    </div>
  )
}
