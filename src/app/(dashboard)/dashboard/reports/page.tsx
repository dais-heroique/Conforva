import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, weeklyReports } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { Zap, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import { getLocale } from "@/lib/i18n/locale"
import type { Locale } from "@/lib/i18n/locale"

const DICT = {
  fr: {
    title: "Rapports IA", subtitle: "Une synthèse claire des mouvements qui ont compté cette semaine.",
    firstReportSoon: "Votre première synthèse arrive bientôt", firstReportDesc: "Ajoutez quelques produits et Conforva pourra résumer les évolutions importantes de votre veille.",
    addProducts: "Surveiller des produits", reportOf: (date: string) => `Semaine du ${date}`, executiveSummary: "Résumé", keyInsights: "Ce qu'il faut retenir", recommendations: "Actions suggérées",
  },
  en: {
    title: "AI reports", subtitle: "A clear summary of the movements that mattered this week.",
    firstReportSoon: "Your first summary is coming", firstReportDesc: "Track a few products and Conforva can summarize the important movements in your watchlist.",
    addProducts: "Track products", reportOf: (date: string) => `Week of ${date}`, executiveSummary: "Summary", keyInsights: "What matters", recommendations: "Suggested actions",
  },
}

function formatDate(ts: Date | number | null, locale: Locale): string {
  if (!ts) return ""
  const d = typeof ts === "number" ? new Date(ts) : ts
  return d.toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", { day: "numeric", month: "long", year: "numeric" })
}

export default async function ReportsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/login")
  const locale = await getLocale(); const t = DICT[locale]; const db = getDb()
  const [membership] = await db.select({ org: organizations }).from(organizationMembers).innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id)).where(eq(organizationMembers.userId, session.user.id)).limit(1)
  if (!membership) redirect("/onboarding")
  const reports = await db.select().from(weeklyReports).where(eq(weeklyReports.organizationId, membership.org.id)).orderBy(desc(weeklyReports.generatedAt)).limit(10)

  return <div className="p-5 md:p-7 space-y-7 bg-[#08090C] min-h-full">
    <header><p className="text-xs uppercase tracking-[0.16em] text-[#A78BFA] font-bold">Conforva Intelligence</p><h1 className="text-3xl font-black text-white tracking-tight mt-2">{t.title}</h1><p className="text-sm text-gray-500 mt-1">{t.subtitle}</p></header>
    {reports.length === 0 ? <div className="rounded-3xl border border-white/8 bg-white/[0.025] p-12 text-center max-w-2xl"><div className="h-14 w-14 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-5"><Zap className="h-6 w-6 text-[#A78BFA]" /></div><h2 className="text-xl font-bold text-white">{t.firstReportSoon}</h2><p className="text-sm text-gray-500 mt-3 max-w-md mx-auto leading-6">{t.firstReportDesc}</p><Link href="/dashboard/products" className="inline-flex mt-6 items-center gap-2 rounded-xl bg-white text-black px-5 py-3 text-sm font-bold hover:bg-gray-200">{t.addProducts}</Link></div> : <div className="space-y-5">{reports.map(report => <article key={report.id} className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden"><div className="px-5 py-4 border-b border-white/7 flex items-center justify-between"><div className="flex items-center gap-2"><Zap className="h-4 w-4 text-[#A78BFA]"/><span className="text-sm font-bold text-white">{t.reportOf(formatDate(report.weekStart, locale))}</span></div><span className="text-xs text-gray-600 flex items-center gap-1"><Calendar className="h-3.5 w-3.5"/>{formatDate(report.weekStart, locale)} – {formatDate(report.weekEnd, locale)}</span></div><div className="p-5 space-y-5">{report.summary && <section><p className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-2">{t.executiveSummary}</p><p className="text-sm text-gray-300 leading-6">{report.summary}</p></section>}{report.keyInsights && <section><p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2"><FileText className="h-3.5 w-3.5"/>{t.keyInsights}</p><p className="text-sm text-gray-300 leading-6 whitespace-pre-line">{report.keyInsights}</p></section>}{report.recommendations && <section className="rounded-xl border border-[#8B5CF6]/15 bg-[#8B5CF6]/[0.045] p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#C4B5FD] mb-2">{t.recommendations}</p><p className="text-sm text-gray-300 leading-6 whitespace-pre-line">{report.recommendations}</p></section>}</div></article>)}</div>}
  </div>
}
