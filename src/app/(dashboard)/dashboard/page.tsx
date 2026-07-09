import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, trackedCompetitors, trackedProducts, alerts } from "@/lib/db/schema"
import { eq, desc, and, gte, count } from "drizzle-orm"
import { BarChart3, Bell, TrendingDown, TrendingUp, Eye, Plus, Zap, ArrowRight, AlertTriangle } from "lucide-react"

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

  const [competitors, products, alertList, recentChanges] = await Promise.all([
    db.select().from(trackedCompetitors).where(and(eq(trackedCompetitors.organizationId, org.id), eq(trackedCompetitors.isActive, true))),
    db.select({ count: count() }).from(trackedProducts).where(and(eq(trackedProducts.organizationId, org.id), eq(trackedProducts.isActive, true))),
    db.select().from(alerts).where(and(eq(alerts.organizationId, org.id), eq(alerts.isActive, true))).limit(5),
    db
      .select({ product: trackedProducts })
      .from(trackedProducts)
      .where(and(eq(trackedProducts.organizationId, org.id), gte(trackedProducts.lastPriceChangedAt, since24h)))
      .orderBy(desc(trackedProducts.lastPriceChangedAt))
      .limit(10),
  ])

  const productCount = products[0]?.count ?? 0

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Vue d'ensemble</h1>
          <p className="text-sm text-gray-500 mt-0.5">Intelligence concurrentielle en temps réel</p>
        </div>
        <Link
          href="/dashboard/competitors/new"
          className="flex items-center gap-2 bg-[#00E676] hover:bg-[#00c964] text-[#060D09] font-bold text-sm px-4 py-2 rounded-xl transition-colors"
        >
          <Plus className="h-4 w-4" />
          Ajouter un concurrent
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Concurrents actifs", value: competitors.length, icon: Eye, color: "text-[#00E676]", limit: org.competitorLimit },
          { label: "Produits suivis", value: productCount, icon: BarChart3, color: "text-blue-400", limit: org.productLimit },
          { label: "Alertes actives", value: alertList.length, icon: Bell, color: "text-orange-400", limit: org.alertLimit },
          { label: "Changements 24h", value: recentChanges.length, icon: TrendingDown, color: "text-purple-400" },
        ].map(({ label, value, icon: Icon, color, limit }) => (
          <div key={label} className="bg-white/5 border border-white/8 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500">{label}</p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className="text-3xl font-black text-white">{value}</p>
            {limit !== undefined && (
              <p className="text-xs text-gray-600 mt-1">/ {limit} inclus</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 border border-white/8 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white text-sm">Changements de prix (24h)</h2>
            <Link href="/dashboard/products" className="text-xs text-[#00E676] hover:underline flex items-center gap-1">
              Tout voir <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {recentChanges.length === 0 ? (
            <div className="text-center py-10">
              {competitors.length === 0 ? (
                <>
                  <Eye className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 mb-4">Ajoutez votre premier concurrent pour démarrer la surveillance</p>
                  <Link href="/dashboard/competitors/new" className="inline-flex items-center gap-2 bg-[#00E676] text-[#060D09] font-bold text-sm px-4 py-2 rounded-xl">
                    <Plus className="h-4 w-4" /> Ajouter un concurrent
                  </Link>
                </>
              ) : (
                <>
                  <BarChart3 className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Aucun changement de prix dans les dernières 24h</p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {recentChanges.map(({ product }) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-white/4 rounded-xl">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{product.name || product.url}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {product.previousPrice && <span className="line-through mr-2">{product.previousPrice}€</span>}
                      {product.currentPrice && <span className="font-semibold text-white">{product.currentPrice}€</span>}
                    </p>
                  </div>
                  {product.priceChangePercent !== null && product.priceChangePercent !== undefined && (
                    <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg ${
                      product.priceChangePercent < 0 ? "bg-[#00E676]/15 text-[#00E676]" : "bg-red-500/15 text-red-400"
                    }`}>
                      {product.priceChangePercent < 0 ? <TrendingDown className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
                      {Math.abs(product.priceChangePercent).toFixed(1)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white text-sm">Concurrents</h2>
              <Link href="/dashboard/competitors" className="text-xs text-[#00E676] hover:underline">Gérer</Link>
            </div>
            {competitors.length === 0 ? (
              <p className="text-xs text-gray-500">Aucun concurrent suivi.</p>
            ) : (
              <div className="space-y-2">
                {competitors.slice(0, 5).map((c) => (
                  <Link
                    key={c.id}
                    href={`/dashboard/competitors/${c.id}`}
                    className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{c.name}</p>
                      <p className="text-xs text-gray-500 truncate">{c.domain}</p>
                    </div>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      c.platform === "shopify" ? "bg-green-500/15 text-green-400" :
                      c.platform === "amazon" ? "bg-orange-500/15 text-orange-400" :
                      "bg-blue-500/15 text-blue-400"
                    }`}>
                      {c.platform}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#00E676]/8 border border-[#00E676]/20 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-[#00E676] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#00E676] mb-1.5">Analyse IA</p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {recentChanges.length > 0
                    ? `${recentChanges.length} changement${recentChanges.length > 1 ? "s" : ""} détecté${recentChanges.length > 1 ? "s" : ""}. Consultez les rapports IA pour des recommandations.`
                    : "Votre premier rapport IA sera généré dans les 24h suivant l'ajout de vos concurrents."}
                </p>
                <Link href="/dashboard/reports" className="inline-flex items-center gap-1 text-xs text-[#00E676] mt-2 hover:underline">
                  Voir les rapports <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {org.plan === "free" && (
            <div className="bg-white/4 border border-white/10 rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white mb-1">Plan gratuit</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-2">
                    Passez à Starter pour suivre 20 produits et recevoir des alertes automatiques.
                  </p>
                  <Link href="/dashboard/billing" className="text-xs text-[#00E676] hover:underline">
                    Passer à Starter →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
