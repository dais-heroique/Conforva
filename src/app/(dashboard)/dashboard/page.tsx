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

const RANGE_OPTIONS = [
  { key: "1h", label: "1 h", hours: 1 },
  { key: "5h", label: "5 h", hours: 5 },
  { key: "24h", label: "24 h", hours: 24 },
  { key: "7j", label: "7 j", hours: 24 * 7 },
] as const

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/login")

  const { range } = await searchParams
  const selectedRange = RANGE_OPTIONS.find((r) => r.key === range) ?? RANGE_OPTIONS[2]

  const db = getDb()

  const [membership] = await db
    .select({ org: organizations })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
    .where(eq(organizationMembers.userId, session.user.id))
    .limit(1)

  if (!membership) redirect("/onboarding")
  const org = membership.org

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
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bonjour" : "Bonsoir"
  const firstName = session.user.name?.split(" ")[0] || session.user.email?.split("@")[0] || "vous"

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
          <h1 className="text-2xl font-bold text-white tracking-tight">Vue d'ensemble</h1>
          <p className="text-sm text-gray-500 mt-0.5">Intelligence concurrentielle en temps réel</p>
        </div>
        <Link
          href="/dashboard/competitors/new"
          className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-violet-900/20"
        >
          <Plus className="h-4 w-4" />
          Ajouter un concurrent
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Concurrents actifs",
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
            label: "Produits suivis",
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
            label: "Alertes actives",
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
            label: `Changements ${selectedRange.label}`,
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
                Voir détails
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
                <p className="text-xs text-gray-500">baisse{dropCount > 1 ? "s" : ""} de prix (7j)</p>
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
                <p className="text-xs text-gray-500">hausse{riseCount > 1 ? "s" : ""} de prix (7j)</p>
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
                <p className="text-xs text-gray-500">prix moyen concurrentiel</p>
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
                <h2 className="font-semibold text-white text-sm">Changements de prix ({selectedRange.label})</h2>
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
                      {opt.label}
                    </Link>
                  ))}
                </div>
                <Link href="/dashboard/products" className="text-xs text-[#A78BFA] hover:text-[#8B5CF6] flex items-center gap-1 transition-colors shrink-0">
                  Tout voir <ArrowRight className="h-3 w-3" />
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
                      <p className="text-sm font-medium text-white mb-1">Aucun concurrent suivi</p>
                      <p className="text-xs text-gray-500 mb-4">Ajoutez votre premier concurrent pour démarrer la surveillance des prix</p>
                      <Link
                        href="/dashboard/competitors/new"
                        className="inline-flex items-center gap-2 bg-[#8B5CF6] text-white font-semibold text-sm px-4 py-2 rounded-xl hover:bg-[#7C3AED] transition-colors"
                      >
                        <Plus className="h-4 w-4" /> Ajouter un concurrent
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="h-6 w-6 text-gray-500" />
                      </div>
                      <p className="text-sm font-medium text-white mb-1">Tout est stable</p>
                      <p className="text-xs text-gray-500">Aucun changement de prix sur les dernières {selectedRange.label}</p>
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
                  <h2 className="font-semibold text-white text-sm">Moyenne des prix concurrentiels</h2>
                </div>
                <Link href="/dashboard/products" className="text-xs text-[#A78BFA] hover:text-[#8B5CF6] transition-colors">
                  Détails →
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
                        <p className="text-xs text-gray-500">{pCount} produit{pCount !== 1 ? "s" : ""} suivi{pCount !== 1 ? "s" : ""}</p>
                      </div>
                      <div className="text-right shrink-0">
                        {avgPrice !== null ? (
                          <>
                            <p className="text-sm font-bold text-white">{avgPrice.toFixed(2)}€</p>
                            {avgChange !== null && (
                              <p className={`text-xs font-medium ${avgChange < 0 ? "text-emerald-400" : avgChange > 0 ? "text-red-400" : "text-gray-500"}`}>
                                {avgChange > 0 ? "+" : ""}{avgChange.toFixed(1)}% moy.
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="text-xs text-gray-600">Aucune donnée</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              {competitors.length > 0 && globalAvgPrice && (
                <div className="px-5 py-3 border-t border-white/8 bg-[#8B5CF6]/5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-400">Moyenne globale</p>
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
                <h2 className="font-semibold text-white text-sm">Concurrents</h2>
              </div>
              <Link href="/dashboard/competitors" className="text-xs text-[#A78BFA] hover:text-[#8B5CF6] transition-colors">
                Gérer →
              </Link>
            </div>
            <div className="p-3">
              {competitors.length === 0 ? (
                <div className="px-2 py-3 text-center">
                  <p className="text-xs text-gray-500">Aucun concurrent ajouté</p>
                  <Link href="/dashboard/competitors/new" className="text-xs text-[#A78BFA] mt-1 inline-block hover:underline">
                    + Ajouter
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
                          <p className="text-xs text-gray-600 truncate">{data?.productCount ?? 0} produits</p>
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
              <p className="text-xs font-semibold text-[#A78BFA]">Rapport IA hebdomadaire</p>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed mb-3">
              {recentChanges.length > 0
                ? `${recentChanges.length} mouvement${recentChanges.length > 1 ? "s" : ""} détecté${recentChanges.length > 1 ? "s" : ""} aujourd'hui. Votre rapport IA analyse les tendances et formule des recommandations.`
                : competitors.length === 0
                  ? "Ajoutez vos concurrents pour recevoir votre premier rapport d'intelligence concurrentielle chaque lundi."
                  : "Votre prochain rapport hebdomadaire sera généré lundi matin avec les analyses de la semaine."}
            </p>
            <Link
              href="/dashboard/reports"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A78BFA] hover:text-white transition-colors"
            >
              Voir les rapports <ArrowRight className="h-3 w-3" />
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
                  <p className="text-xs font-semibold text-white mb-1">Plan gratuit</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-2.5">
                    Passez à Starter pour suivre jusqu'à 100 produits et recevoir des alertes email automatiques.
                  </p>
                  <Link
                    href="/dashboard/billing"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#A78BFA] hover:text-white transition-colors"
                  >
                    Passer à Starter <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-white/8">
              <h2 className="font-semibold text-white text-sm">Actions rapides</h2>
            </div>
            <div className="p-2">
              {[
                { label: "Ajouter un concurrent", href: "/dashboard/competitors/new", icon: Eye },
                { label: "Créer une alerte prix", href: "/dashboard/alerts", icon: Bell },
                { label: "Voir les rapports IA", href: "/dashboard/reports", icon: Zap },
                { label: "Gérer l'abonnement", href: "/dashboard/billing", icon: BarChart3 },
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
