import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import {
  organizations, organizationMembers, trackedCompetitors,
  trackedProducts, alerts, priceHistory,
} from "@/lib/db/schema"
import { eq, desc, and, gte, count, avg, sql } from "drizzle-orm"
import {
  BarChart3, Bell, TrendingDown, TrendingUp, Eye, Plus, Zap,
  ArrowRight, AlertTriangle, Package, Activity, ShoppingBag,
  Flame, Target, ChevronRight, Sparkles, DollarSign, Percent,
} from "lucide-react"
import { getLocale } from "@/lib/i18n/locale"
import { withUnlimitedAccess } from "@/lib/admin"

const RANGE_OPTIONS = [
  { key: "1h", labelFr: "1 h", labelEn: "1h", hours: 1 },
  { key: "5h", labelFr: "5 h", labelEn: "5h", hours: 5 },
  { key: "24h", labelFr: "24 h", labelEn: "24h", hours: 24 },
  { key: "7j", labelFr: "7 j", labelEn: "7d", hours: 24 * 7 },
] as const

const DICT = {
  fr: {
    greetingMorning: "Bonjour",
    greetingEvening: "Bonsoir",
    you: "vous",
    title: "Vue d'ensemble",
    subtitle: "Intelligence concurrentielle en temps réel",
    addCompetitor: "Ajouter un concurrent",
    kpi: {
      activeCompetitors: "Concurrents actifs",
      trackedProducts: "Produits suivis",
      activeAlerts: "Alertes actives",
      changes: (range: string) => `Changements ${range}`,
    },
    seeDetails: "Voir détails",
    drops7d: (n: number) => `baisse${n > 1 ? "s" : ""} de prix (7j)`,
    rises7d: (n: number) => `hausse${n > 1 ? "s" : ""} de prix (7j)`,
    avgCompetitivePrice: "prix moyen concurrentiel",
    priceChanges: (range: string) => `Changements de prix (${range})`,
    seeAll: "Tout voir",
    noCompetitorTracked: "Aucun concurrent suivi",
    addFirstCompetitor: "Ajoutez votre premier concurrent pour démarrer la surveillance des prix",
    allStable: "Tout est stable",
    noChangeInRange: (range: string) => `Aucun changement de prix sur les dernières ${range}`,
    avgCompetitorPrices: "Moyenne des prix concurrentiels",
    details: "Détails →",
    productsTracked: (n: number) => `${n} produit${n !== 1 ? "s" : ""} suivi${n !== 1 ? "s" : ""}`,
    avgSuffix: "% moy.",
    noData: "Aucune donnée",
    globalAverage: "Moyenne globale",
    competitors: "Concurrents",
    manage: "Gérer →",
    noCompetitorAdded: "Aucun concurrent ajouté",
    add: "+ Ajouter",
    products: "produits",
    aiReport: "Rapport IA hebdomadaire",
    movementsDetected: (n: number) => `${n} mouvement${n > 1 ? "s" : ""} détecté${n > 1 ? "s" : ""} aujourd'hui. Votre rapport IA analyse les tendances et formule des recommandations.`,
    addCompetitorsForReport: "Ajoutez vos concurrents pour recevoir votre premier rapport d'intelligence concurrentielle chaque lundi.",
    nextReport: "Votre prochain rapport hebdomadaire sera généré lundi matin avec les analyses de la semaine.",
    seeReports: "Voir les rapports",
    freePlan: "Plan gratuit",
    upgradeText: "Passez à Starter pour suivre jusqu'à 100 produits et recevoir des alertes email automatiques.",
    upgradeToStarter: "Passer à Starter",
    quickActions: "Actions rapides",
    quick: {
      addCompetitor: "Ajouter un concurrent",
      createAlert: "Créer une alerte prix",
      seeReports: "Voir les rapports IA",
      manageBilling: "Gérer l'abonnement",
    },
  },
  en: {
    greetingMorning: "Good morning",
    greetingEvening: "Good evening",
    you: "there",
    title: "Overview",
    subtitle: "Real-time competitive intelligence",
    addCompetitor: "Add a competitor",
    kpi: {
      activeCompetitors: "Active competitors",
      trackedProducts: "Tracked products",
      activeAlerts: "Active alerts",
      changes: (range: string) => `Changes ${range}`,
    },
    seeDetails: "See details",
    drops7d: (n: number) => `price drop${n > 1 ? "s" : ""} (7d)`,
    rises7d: (n: number) => `price rise${n > 1 ? "s" : ""} (7d)`,
    avgCompetitivePrice: "avg. competitor price",
    priceChanges: (range: string) => `Price changes (${range})`,
    seeAll: "See all",
    noCompetitorTracked: "No competitor tracked",
    addFirstCompetitor: "Add your first competitor to start monitoring prices",
    allStable: "Everything is stable",
    noChangeInRange: (range: string) => `No price changes in the last ${range}`,
    avgCompetitorPrices: "Average competitor prices",
    details: "Details →",
    productsTracked: (n: number) => `${n} product${n !== 1 ? "s" : ""} tracked`,
    avgSuffix: "% avg.",
    noData: "No data",
    globalAverage: "Global average",
    competitors: "Competitors",
    manage: "Manage →",
    noCompetitorAdded: "No competitor added",
    add: "+ Add",
    products: "products",
    aiReport: "Weekly AI report",
    movementsDetected: (n: number) => `${n} movement${n > 1 ? "s" : ""} detected today. Your AI report analyzes trends and gives recommendations.`,
    addCompetitorsForReport: "Add your competitors to receive your first competitive intelligence report every Monday.",
    nextReport: "Your next weekly report will be generated Monday morning with this week's analysis.",
    seeReports: "See reports",
    freePlan: "Free plan",
    upgradeText: "Upgrade to Starter to track up to 100 products and get automatic email alerts.",
    upgradeToStarter: "Upgrade to Starter",
    quickActions: "Quick actions",
    quick: {
      addCompetitor: "Add a competitor",
      createAlert: "Create a price alert",
      seeReports: "See AI reports",
      manageBilling: "Manage subscription",
    },
  },
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/login")

  const locale = await getLocale()
  const t = DICT[locale]

  const { range } = await searchParams
  const selectedRange = RANGE_OPTIONS.find((r) => r.key === range) ?? RANGE_OPTIONS[2]
  const rangeLabel = locale === "en" ? selectedRange.labelEn : selectedRange.labelFr

  const db = getDb()

  const [membership] = await db
    .select({ org: organizations })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(organizationMembers.userId, session.user.id))
    .limit(1)

  if (!membership) redirect("/onboarding")
  const org = withUnlimitedAccess(membership.org, session.user.email)

  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const sinceSelectedRange = new Date(Date.now() - selectedRange.hours * 60 * 60 * 1000)

  const [
    competitors,
    products,
    alertList,
    recentChanges,
    drops,
    rises,
    competitorAvgs,
  ] = await Promise.all([
    db.select().from(trackedCompetitors)
      .where(and(eq(trackedCompetitors.organizationId, org.id), eq(trackedCompetitors.isActive, true)))
      .orderBy(desc(trackedCompetitors.createdAt)),

    db.select({ count: count() }).from(trackedProducts)
      .where(and(eq(trackedProducts.organizationId, org.id), eq(trackedProducts.isActive, true))),

    db.select().from(alerts)
      .where(and(eq(alerts.organizationId, org.id), eq(alerts.isActive, true)))
      .limit(5),

    db.select({ product: trackedProducts })
      .from(trackedProducts)
      .where(and(eq(trackedProducts.organizationId, org.id), gte(trackedProducts.lastPriceChangedAt, sinceSelectedRange)))
      .orderBy(desc(trackedProducts.lastPriceChangedAt))
      .limit(10),

    db.select({ count: count() }).from(trackedProducts)
      .where(and(
        eq(trackedProducts.organizationId, org.id),
        gte(trackedProducts.lastPriceChangedAt, since7d),
        sql`${trackedProducts.priceChangePercent} < 0`,
      )),

    db.select({ count: count() }).from(trackedProducts)
      .where(and(
        eq(trackedProducts.organizationId, org.id),
        gte(trackedProducts.lastPriceChangedAt, since7d),
        sql`${trackedProducts.priceChangePercent} > 0`,
      )),

    // Average current price per competitor
    db.select({
      competitorId: trackedProducts.competitorId,
      avgPrice: avg(trackedProducts.currentPrice),
      productCount: count(),
      avgChange: avg(trackedProducts.priceChangePercent),
    })
      .from(trackedProducts)
      .where(and(
        eq(trackedProducts.organizationId, org.id),
        eq(trackedProducts.isActive, true),
      ))
      .groupBy(trackedProducts.competitorId),
  ])

  const productCount = products[0]?.count ?? 0
  const dropCount = drops[0]?.count ?? 0
  const riseCount = rises[0]?.count ?? 0

  // Merge competitor avg data
  const competitorMap = new Map(competitorAvgs.map((a) => [a.competitorId, a]))

  const hour = new Date().getHours()
  const greeting = hour < 18 ? t.greetingMorning : t.greetingEvening
  const firstName = session.user.name?.split(" ")[0] || session.user.email?.split("@")[0] || t.you

  // Global avg price across all competitors
  const globalAvgPrice = competitorAvgs.length > 0
    ? competitorAvgs.reduce((sum, c) => sum + (Number(c.avgPrice) || 0), 0) / competitorAvgs.filter((c) => c.avgPrice).length
    : null

  return (
    <div className="p-6 space-y-6 min-h-full bg-[#08090C]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[#A78BFA] mb-1">{greeting}, {firstName} 👋</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t.title}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{t.subtitle}</p>
        </div>
        <Link
          href="/dashboard/competitors/new"
          className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-violet-900/20"
        >
          <Plus className="h-4 w-4" />
          {t.addCompetitor}
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: t.kpi.activeCompetitors,
            value: competitors.length,
            limit: org.competitorLimit,
            icon: Eye,
            accent: "text-[#A78BFA]",
            bg: "bg-[#8B5CF6]/8",
            border: "border-[#8B5CF6]/20",
            bar: "bg-[#8B5CF6]",
            href: "/dashboard/competitors",
          },
          {
            label: t.kpi.trackedProducts,
            value: productCount,
            limit: org.productLimit,
            icon: Package,
            accent: "text-blue-400",
            bg: "bg-blue-500/8",
            border: "border-blue-500/20",
            bar: "bg-blue-500",
            href: "/dashboard/products",
          },
          {
            label: t.kpi.activeAlerts,
            value: alertList.length,
            limit: org.alertLimit,
            icon: Bell,
            accent: "text-amber-400",
            bg: "bg-amber-500/8",
            border: "border-amber-500/20",
            bar: "bg-amber-500",
            href: "/dashboard/alerts",
          },
          {
            label: t.kpi.changes(rangeLabel),
            value: recentChanges.length,
            icon: Activity,
            accent: "text-emerald-400",
            bg: "bg-emerald-500/8",
            border: "border-emerald-500/20",
            href: "/dashboard/products",
          },
        ].map(({ label, value, icon: Icon, accent, bg, border, href, limit, bar }) => (
          <Link key={label} href={href} className={`group ${bg} border ${border} rounded-2xl p-4 hover:brightness-110 transition-all`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <Icon className={`h-4 w-4 ${accent}`} />
            </div>
            <p className="text-3xl font-black text-white">{value}</p>
            {limit !== undefined && bar ? (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{value} / {limit}</span>
                  <span>{Math.round((value / limit) * 100)}%</span>
                </div>
                <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${bar}`} style={{ width: `${Math.min(100, (value / limit) * 100)}%` }} />
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                {t.seeDetails}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* 7-day price movement summary */}
      {(dropCount > 0 || riseCount > 0 || globalAvgPrice) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {dropCount > 0 && (
            <div className="flex items-center gap-3 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-4 py-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                <TrendingDown className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xl font-black text-emerald-400">{dropCount}</p>
                <p className="text-xs text-gray-500">{t.drops7d(dropCount)}</p>
              </div>
            </div>
          )}
          {riseCount > 0 && (
            <div className="flex items-center gap-3 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3">
              <div className="h-9 w-9 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0">
                <TrendingUp className="h-4 w-4 text-red-400" />
              </div>
              <div>
                <p className="text-xl font-black text-red-400">{riseCount}</p>
                <p className="text-xs text-gray-500">{t.rises7d(riseCount)}</p>
              </div>
            </div>
          )}
          {globalAvgPrice && (
            <div className="flex items-center gap-3 bg-[#8B5CF6]/8 border border-[#8B5CF6]/20 rounded-xl px-4 py-3">
              <div className="h-9 w-9 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center shrink-0">
                <DollarSign className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <div>
                <p className="text-xl font-black text-[#A78BFA]">{globalAvgPrice.toFixed(2)}€</p>
                <p className="text-xs text-gray-500">{t.avgCompetitivePrice}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Price changes */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#A78BFA]" />
                <h2 className="font-semibold text-white text-sm">{t.priceChanges(rangeLabel)}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-lg p-0.5">
                  {RANGE_OPTIONS.map((opt) => (
                    <Link
                      key={opt.key}
                      href={opt.key === "24h" ? "/dashboard" : `/dashboard?range=${opt.key}`}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        opt.key === selectedRange.key
                          ? "bg-[#8B5CF6] text-white"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {locale === "en" ? opt.labelEn : opt.labelFr}
                    </Link>
                  ))}
                </div>
                <Link href="/dashboard/products" className="text-xs text-[#A78BFA] hover:text-[#8B5CF6] flex items-center gap-1 transition-colors shrink-0">
                  {t.seeAll} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="p-5">
              {recentChanges.length === 0 ? (
                <div className="text-center py-10">
                  {competitors.length === 0 ? (
                    <>
                      <div className="h-14 w-14 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-4">
                        <Eye className="h-6 w-6 text-[#A78BFA]" />
                      </div>
                      <p className="text-sm font-medium text-white mb-1">{t.noCompetitorTracked}</p>
                      <p className="text-xs text-gray-500 mb-4">{t.addFirstCompetitor}</p>
                      <Link
                        href="/dashboard/competitors/new"
                        className="inline-flex items-center gap-2 bg-[#8B5CF6] text-white font-semibold text-sm px-4 py-2 rounded-xl hover:bg-[#7C3AED] transition-colors"
                      >
                        <Plus className="h-4 w-4" /> {t.addCompetitor}
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="h-6 w-6 text-gray-500" />
                      </div>
                      <p className="text-sm font-medium text-white mb-1">{t.allStable}</p>
                      <p className="text-xs text-gray-500">{t.noChangeInRange(rangeLabel)}</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {recentChanges.map(({ product }) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 bg-white/3 hover:bg-white/6 rounded-xl transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
                        <ShoppingBag className="h-3.5 w-3.5 text-gray-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{product.name || product.url}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {product.previousPrice && <span className="line-through mr-1.5 text-gray-600">{product.previousPrice}€</span>}
                          {product.currentPrice && <span className="font-semibold text-white">{product.currentPrice}€</span>}
                        </p>
                      </div>
                      {product.priceChangePercent !== null && product.priceChangePercent !== undefined && (
                        <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                          product.priceChangePercent < 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
                        }`}>
                          {product.priceChangePercent < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                          {Math.abs(product.priceChangePercent).toFixed(1)}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Competitive price average table */}
          {competitors.length > 0 && (
            <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-[#A78BFA]" />
                  <h2 className="font-semibold text-white text-sm">{t.avgCompetitorPrices}</h2>
                </div>
                <Link href="/dashboard/products" className="text-xs text-[#A78BFA] hover:text-[#8B5CF6] transition-colors">
                  {t.details}
                </Link>
              </div>
              <div className="divide-y divide-white/6">
                {competitors.map((c) => {
                  const data = competitorMap.get(c.id)
                  const avgPrice = data?.avgPrice ? Number(data.avgPrice) : null
                  const avgChange = data?.avgChange ? Number(data.avgChange) : null
                  const pCount = data?.productCount ?? 0

                  return (
                    <div key={c.id} className="flex items-center gap-4 px-5 py-3.5">
                      <div className="h-8 w-8 rounded-lg bg-[#8B5CF6]/12 border border-[#8B5CF6]/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-[#A78BFA]">{c.name[0]}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{c.name}</p>
                        <p className="text-xs text-gray-500">{t.productsTracked(pCount)}</p>
                      </div>
                      <div className="text-right shrink-0">
                        {avgPrice !== null ? (
                          <>
                            <p className="text-sm font-bold text-white">{avgPrice.toFixed(2)}€</p>
                            {avgChange !== null && (
                              <p className={`text-xs font-medium ${avgChange < 0 ? "text-emerald-400" : avgChange > 0 ? "text-red-400" : "text-gray-500"}`}>
                                {avgChange > 0 ? "+" : ""}{avgChange.toFixed(1)}{t.avgSuffix}
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="text-xs text-gray-600">{t.noData}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              {competitors.length > 0 && globalAvgPrice && (
                <div className="px-5 py-3 border-t border-white/8 bg-[#8B5CF6]/5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-400">{t.globalAverage}</p>
                    <p className="text-sm font-black text-[#A78BFA]">{globalAvgPrice.toFixed(2)}€</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Competitors */}
          <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-[#A78BFA]" />
                <h2 className="font-semibold text-white text-sm">{t.competitors}</h2>
              </div>
              <Link href="/dashboard/competitors" className="text-xs text-[#A78BFA] hover:text-[#8B5CF6] transition-colors">
                {t.manage}
              </Link>
            </div>
            <div className="p-3">
              {competitors.length === 0 ? (
                <div className="px-2 py-3 text-center">
                  <p className="text-xs text-gray-500">{t.noCompetitorAdded}</p>
                  <Link href="/dashboard/competitors/new" className="text-xs text-[#A78BFA] mt-1 inline-block hover:underline">
                    {t.add}
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  {competitors.slice(0, 5).map((c) => {
                    const data = competitorMap.get(c.id)
                    return (
                      <Link
                        key={c.id}
                        href={`/dashboard/competitors/${c.id}`}
                        className="flex items-center gap-3 px-2 py-2 hover:bg-white/5 rounded-xl transition-colors group"
                      >
                        <div className="h-7 w-7 rounded-lg bg-[#8B5CF6]/12 border border-[#8B5CF6]/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-[#A78BFA]">{c.name[0]}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white truncate group-hover:text-[#A78BFA] transition-colors">{c.name}</p>
                          <p className="text-xs text-gray-600 truncate">{data?.productCount ?? 0} {t.products}</p>
                        </div>
                        <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                          c.platform === "shopify" ? "bg-green-500/12 text-green-400" :
                          c.platform === "amazon" ? "bg-orange-500/12 text-orange-400" :
                          c.platform === "woocommerce" ? "bg-blue-500/12 text-blue-400" :
                          "bg-white/8 text-gray-400"
                        }`}>
                          {c.platform}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* AI insight */}
          <div className="bg-gradient-to-br from-[#8B5CF6]/12 to-[#7C3AED]/6 border border-[#8B5CF6]/25 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" />
              </div>
              <p className="text-xs font-semibold text-[#A78BFA]">{t.aiReport}</p>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed mb-3">
              {recentChanges.length > 0
                ? t.movementsDetected(recentChanges.length)
                : competitors.length === 0
                  ? t.addCompetitorsForReport
                  : t.nextReport}
            </p>
            <Link
              href="/dashboard/reports"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A78BFA] hover:text-white transition-colors"
            >
              {t.seeReports} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Upgrade for free plan */}
          {org.plan === "free" && (
            <div className="bg-white/4 border border-white/10 rounded-2xl p-4">
              <div className="flex items-start gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                  <Flame className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white mb-1">{t.freePlan}</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-2.5">
                    {t.upgradeText}
                  </p>
                  <Link
                    href="/dashboard/billing"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#A78BFA] hover:text-white transition-colors"
                  >
                    {t.upgradeToStarter} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-white/8">
              <h2 className="font-semibold text-white text-sm">{t.quickActions}</h2>
            </div>
            <div className="p-2">
              {[
                { label: t.quick.addCompetitor, href: "/dashboard/competitors/new", icon: Eye },
                { label: t.quick.createAlert, href: "/dashboard/alerts", icon: Bell },
                { label: t.quick.seeReports, href: "/dashboard/reports", icon: Zap },
                { label: t.quick.manageBilling, href: "/dashboard/billing", icon: BarChart3 },
              ].map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#A78BFA]" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
