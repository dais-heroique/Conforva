import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, trackedCompetitors, trackedProducts, alerts, priceHistory } from "@/lib/db/schema"
import { eq, desc, and, gte, count, sql } from "drizzle-orm"
import {
  BarChart3, Bell, TrendingDown, TrendingUp, Eye, Plus, Zap,
  ArrowRight, AlertTriangle, Package, Activity, Clock, ShoppingBag,
  Flame, Target, ChevronRight, Sparkles,
} from "lucide-react"

export default async function DashboardPage() {
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

  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const [competitors, products, alertList, recentChanges, drops, rises] = await Promise.all([
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
      .where(and(eq(trackedProducts.organizationId, org.id), gte(trackedProducts.lastPriceChangedAt, since24h)))
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
  ])

  const productCount = products[0]?.count ?? 0
  const dropCount = drops[0]?.count ?? 0
  const riseCount = rises[0]?.count ?? 0

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bonjour" : "Bonsoir"
  const firstName = session.user.name?.split(" ")[0] || session.user.email?.split("@")[0] || "vous"

  const PLAN_COLOR: Record<string, string> = {
    free: "text-gray-400 bg-white/8",
    starter: "text-violet-400 bg-violet-500/10",
    growth: "text-blue-400 bg-blue-500/10",
    pro: "text-amber-400 bg-amber-500/10",
  }

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
            href: "/dashboard/alerts",
          },
          {
            label: "Changements 24h",
            value: recentChanges.length,
            icon: Activity,
            accent: "text-emerald-400",
            bg: "bg-emerald-500/8",
            border: "border-emerald-500/20",
            href: "/dashboard/products",
          },
        ].map(({ label, value, icon: Icon, accent, bg, border, href, limit }) => (
          <Link key={label} href={href} className={`group ${bg} border ${border} rounded-2xl p-4 hover:brightness-110 transition-all`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <Icon className={`h-4 w-4 ${accent}`} />
            </div>
            <p className="text-3xl font-black text-white">{value}</p>
            {limit !== undefined ? (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{value} / {limit}</span>
                  <span>{Math.round((value / limit) * 100)}%</span>
                </div>
                <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${accent.replace("text-", "bg-")}`}
                    style={{ width: `${Math.min(100, (value / limit) * 100)}%` }}
                  />
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

      {/* 7-day summary row */}
      {(dropCount > 0 || riseCount > 0) && (
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-4 py-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <TrendingDown className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-black text-emerald-400">{dropCount}</p>
              <p className="text-xs text-gray-500">baisses de prix (7j)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3">
            <div className="h-8 w-8 rounded-lg bg-red-500/15 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-red-400" />
            </div>
            <div>
              <p className="text-lg font-black text-red-400">{riseCount}</p>
              <p className="text-xs text-gray-500">hausses de prix (7j)</p>
            </div>
          </div>
        </div>
      )}

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Price changes */}
        <div className="lg:col-span-2 bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#A78BFA]" />
              <h2 className="font-semibold text-white text-sm">Changements de prix (24h)</h2>
            </div>
            <Link href="/dashboard/products" className="text-xs text-[#A78BFA] hover:text-[#8B5CF6] flex items-center gap-1 transition-colors">
              Tout voir <ArrowRight className="h-3 w-3" />
            </Link>
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
                    <p className="text-xs text-gray-500">Aucun changement de prix dans les dernières 24h</p>
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
                        {product.previousPrice && (
                          <span className="line-through mr-1.5 text-gray-600">{product.previousPrice}€</span>
                        )}
                        {product.currentPrice && (
                          <span className="font-semibold text-white">{product.currentPrice}€</span>
                        )}
                      </p>
                    </div>
                    {product.priceChangePercent !== null && product.priceChangePercent !== undefined && (
                      <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                        product.priceChangePercent < 0
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-red-500/15 text-red-400"
                      }`}>
                        {product.priceChangePercent < 0
                          ? <TrendingDown className="h-3 w-3" />
                          : <TrendingUp className="h-3 w-3" />
                        }
                        {Math.abs(product.priceChangePercent).toFixed(1)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
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
                  {competitors.slice(0, 5).map((c) => (
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
                        <p className="text-xs text-gray-600 truncate">{c.domain}</p>
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
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI insight */}
          <div className="bg-gradient-to-br from-[#8B5CF6]/12 to-[#7C3AED]/8 border border-[#8B5CF6]/25 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" />
              </div>
              <p className="text-xs font-semibold text-[#A78BFA]">Rapport IA</p>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed mb-3">
              {recentChanges.length > 0
                ? `${recentChanges.length} mouvement${recentChanges.length > 1 ? "s" : ""} de prix détecté${recentChanges.length > 1 ? "s" : ""} aujourd'hui. Consultez votre rapport pour des recommandations personnalisées.`
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

          {/* Upgrade banner for free plan */}
          {org.plan === "free" && (
            <div className="bg-white/4 border border-white/10 rounded-2xl p-4">
              <div className="flex items-start gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                  <Flame className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white mb-1">Plan gratuit</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-2.5">
                    Passez à Starter pour suivre {org.productLimit * 5}+ produits et des alertes automatiques en temps réel.
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
                { label: "Créer une alerte", href: "/dashboard/alerts", icon: Bell },
                { label: "Voir les rapports IA", href: "/dashboard/reports", icon: Zap },
                { label: "Paramètres du compte", href: "/dashboard/settings", icon: BarChart3 },
              ].map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
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
