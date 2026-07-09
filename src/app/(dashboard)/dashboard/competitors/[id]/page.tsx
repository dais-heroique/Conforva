import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, trackedCompetitors, trackedProducts, priceHistory } from "@/lib/db/schema"
import { eq, and, desc } from "drizzle-orm"
import { ArrowLeft, ExternalLink, TrendingDown, TrendingUp, Package, RefreshCw } from "lucide-react"

export default async function CompetitorDetailPage({ params }: { params: { id: string } }) {
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

  const [competitor] = await db
    .select()
    .from(trackedCompetitors)
    .where(and(
      eq(trackedCompetitors.id, params.id),
      eq(trackedCompetitors.organizationId, membership.org.id)
    ))
    .limit(1)

  if (!competitor) notFound()

  const products = await db
    .select()
    .from(trackedProducts)
    .where(and(
      eq(trackedProducts.competitorId, competitor.id),
      eq(trackedProducts.isActive, true)
    ))
    .orderBy(desc(trackedProducts.lastPriceChangedAt))
    .limit(50)

  const priceChanges = products.filter(p => p.priceChangePercent !== null && p.priceChangePercent !== undefined)
  const drops = priceChanges.filter(p => (p.priceChangePercent ?? 0) < 0).length
  const rises = priceChanges.filter(p => (p.priceChangePercent ?? 0) > 0).length
  const outOfStock = products.filter(p => p.isInStock === false).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/competitors" className="text-gray-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white">{competitor.name}</h1>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              competitor.platform === "shopify" ? "bg-green-500/15 text-green-400" :
              competitor.platform === "amazon" ? "bg-orange-500/15 text-orange-400" :
              "bg-blue-500/15 text-blue-400"
            }`}>{competitor.platform}</span>
          </div>
          <a href={`https://${competitor.domain}`} target="_blank" rel="noopener" className="text-sm text-gray-500 hover:text-gray-300 flex items-center gap-1 mt-0.5 w-fit">
            <ExternalLink className="h-3 w-3" />{competitor.domain}
          </a>
        </div>
        <div className={`flex items-center gap-1.5 text-xs ${competitor.isActive ? "text-[#8B5CF6]" : "text-gray-500"}`}>
          <div className={`h-2 w-2 rounded-full ${competitor.isActive ? "bg-[#8B5CF6]" : "bg-gray-500"}`} />
          {competitor.isActive ? "Actif" : "Inactif"}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Produits suivis", value: products.length, icon: Package, color: "text-blue-400" },
          { label: "Baisses de prix", value: drops, icon: TrendingDown, color: "text-[#8B5CF6]" },
          { label: "Hausses de prix", value: rises, icon: TrendingUp, color: "text-red-400" },
          { label: "En rupture", value: outOfStock, icon: Package, color: "text-orange-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white/5 border border-white/8 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">{label}</p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className="text-2xl font-black text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Products table */}
      <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <h2 className="font-semibold text-white text-sm">Produits ({products.length})</h2>
          {competitor.lastScrapedAt && (
            <span className="text-xs text-gray-500 flex items-center gap-1.5">
              <RefreshCw className="h-3 w-3" />
              Dernier scan {new Date(competitor.lastScrapedAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
            </span>
          )}
        </div>

        {products.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="h-10 w-10 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400">Aucun produit scanné encore. Le premier scan sera effectué dans les 24h.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 text-xs text-gray-500">
                  <th className="text-left px-5 py-3 font-medium">Produit</th>
                  <th className="text-right px-4 py-3 font-medium">Prix actuel</th>
                  <th className="text-right px-4 py-3 font-medium">Variation</th>
                  <th className="text-center px-4 py-3 font-medium">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3">
                      <a href={product.url} target="_blank" rel="noopener" className="text-white hover:text-[#8B5CF6] transition-colors truncate max-w-xs block">
                        {product.name || product.url}
                      </a>
                      {product.sku && <p className="text-xs text-gray-500">SKU: {product.sku}</p>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p className="font-semibold text-white">
                        {product.currentPrice != null ? `${product.currentPrice} ${product.currency ?? "€"}` : "—"}
                      </p>
                      {product.previousPrice != null && (
                        <p className="text-xs text-gray-500 line-through">{product.previousPrice} {product.currency ?? "€"}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {product.priceChangePercent != null ? (
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg ${
                          product.priceChangePercent < 0 ? "bg-[#8B5CF6]/15 text-[#8B5CF6]" : "bg-red-500/15 text-red-400"
                        }`}>
                          {product.priceChangePercent < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                          {Math.abs(product.priceChangePercent).toFixed(1)}%
                        </span>
                      ) : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {product.isInStock === null ? (
                        <span className="text-gray-600 text-xs">—</span>
                      ) : product.isInStock ? (
                        <span className="text-xs text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full">En stock</span>
                      ) : (
                        <span className="text-xs text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full">Rupture</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
