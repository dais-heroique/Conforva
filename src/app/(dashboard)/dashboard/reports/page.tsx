import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, weeklyReports } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { Zap, FileText, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

function formatDate(ts: Date | number | null): string {
  if (!ts) return ""
  const d = typeof ts === "number" ? new Date(ts) : ts
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
}

export default async function ReportsPage() {
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

  const reports = await db
    .select()
    .from(weeklyReports)
    .where(eq(weeklyReports.organizationId, membership.org.id))
    .orderBy(desc(weeklyReports.generatedAt))
    .limit(10)

  return (
    <div className="p-6 space-y-6 bg-[#08090C] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Rapports IA</h1>
          <p className="text-sm text-gray-500 mt-0.5">Analyses hebdomadaires de vos concurrents</p>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-14 text-center">
          <div className="h-16 w-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-5">
            <Zap className="h-7 w-7 text-[#A78BFA]" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Votre premier rapport arrive bientôt</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            Le premier rapport IA sera généré dans les 24h suivant le premier scan de vos concurrents.
          </p>
          <Link href="/dashboard/competitors" className="inline-flex items-center gap-2 text-[#A78BFA] text-sm hover:underline">
            Configurer mes concurrents <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#8B5CF6]" />
                  <span className="font-semibold text-white text-sm">Rapport du {formatDate(report.weekStart)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(report.weekStart)} – {formatDate(report.weekEnd)}
                </div>
              </div>
              {report.summary && (
                <div className="bg-[#8B5CF6]/8 border border-[#8B5CF6]/15 rounded-xl p-4 mb-4">
                  <p className="text-xs font-semibold text-[#8B5CF6] mb-1.5">Résumé exécutif</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{report.summary}</p>
                </div>
              )}
              {report.keyInsights && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> Insights clés
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{report.keyInsights}</p>
                </div>
              )}
              {report.recommendations && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 mb-2">Recommandations</p>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{report.recommendations}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
