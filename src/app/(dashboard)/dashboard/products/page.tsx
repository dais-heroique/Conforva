import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, trackedProducts, trackedCompetitors } from "@/lib/db/schema"
import { eq, and, desc } from "drizzle-orm"
import { Package, TrendingDown, TrendingUp, ExternalLink, Search } from "lucide-react"

export default async function ProductsPage() {
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

  const productsWithCompetitor = await db
    .select({ product: trackedProducts, competitor: trackedCompetitors })
    .from(trackedProducts)
    .innerJoin(trackedCompetitors, eq(trackedProducts.competitorId, trackedCompetitors.id))
    .where(and(eq(trackedProducts.organizationId, org.id), eq(trackedProducts.isActive, true)))
    .orderBy(desc(trackedProducts.lastPriceChangedAt))
    .limit(200)

  const priceDrops = productsWithCompetitor.filter(({ product }) => (product.priceChangePercent ?? 0) < 0)
  const outOfStock = productsWithCompetitor.filter(({ product }) => product.isInStock === false)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Produits suivis</h1>
          <p className="text-sm text-gray-500 mt-0.5">{productsWithCompetitor.length} produits sur {org.productLimit} max</p>
        </div>
      </div>

      {/* Quick stats */}
      {productsWithCompetitor.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total produits", value: productsWithCompetitor.length, color: "text-white" },
            { label: "Baisses de prix", value: priceDrops.length, color: "text-[#00E676]" },
            { label: "En rupture", value: outOfStock.length, color: "text-orange-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white/5 border border-white/8 rounded-xl p-4 text-center">
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      {productsWithCompetitor.length === 0 ? (
        <div className="bg-white/5 border border-white/8 rounded-2xl p-12 text-center">
          <Package className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">Aucun produit suivi</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            Les produits de vos concurrents apparaîtront ici après le premier scan (dans les 24h suivant l'ajout d'un concurrent).
          </p>
          <Link href="/dashboard/competitors/new" className="inline-flex items-center gap-2 bg-[#00E676] text-[#060D09] font-bold text-sm px-6 py-2.5 rounded-xl">
            Ajouter un concurrent
          </Link>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 text-xs text-gray-500">
                  <th className="text-left px-5 py-3 font-medium">Produit</th>
                  <th className="text-left px-4 py-3 font-medium">Concurrent</th>
                  <th className="text-right px-4 py-3 font-medium">Prix</th>
                  <th className="text-right px-4 py-3 font-medium">Variation</th>
                  <th className="text-center px-4 py-3 font-medium">Stock</th>
                </tr>
              </thead>
              <tbody>
                {productsWithCompetitor.map(({ product, competitor }) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3 max-w-xs">
                      <a href={product.url} target="_blank" rel="noopener" className="text-white hover:text-[#00E676] transition-colors flex items-center gap-1.5 truncate">
                        {product.name || product.url}
                        <ExternalLink className="h-3 w-3 flex-shrink-0 text-gray-500" />
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/competitors/${competitor.id}`} className="text-gray-400 hover:text-white transition-colors text-xs">
                        {competitor.name}
                      </Link>
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
                          product.priceChangePercent < 0 ? "bg-[#00E676]/15 text-[#00E676]" : "bg-red-500/15 text-red-400"
                        }`}>
                          {product.priceChangePercent < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                          {Math.abs(product.priceChangePercent).toFixed(1)}%
                        </span>
                      ) : <span className="text-gray-600 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {product.isInStock === null ? (
                        <span className="text-gray-600 text-xs">—</span>
                      ) : product.isInStock ? (
                        <span className="text-xs text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full">En stock</span>
                      ) : (
                        <span className="text-xs text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full">Rupture</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
