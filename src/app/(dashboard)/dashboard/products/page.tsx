import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, trackedProducts, trackedCompetitors, priceHistory } from "@/lib/db/schema"
import { eq, and, desc, inArray, asc } from "drizzle-orm"
import { Package, TrendingDown, TrendingUp, ExternalLink, Plus, Wallet } from "lucide-react"
import { AddProductModal } from "@/components/dashboard/add-product-modal"
import { DeleteProductButton } from "@/components/dashboard/delete-product-button"
import { SetPriceButton } from "@/components/dashboard/set-price-button"
import { MarginEditor } from "@/components/dashboard/margin-editor"
import { PriceSparkline } from "@/components/dashboard/price-sparkline"
import { getLocale } from "@/lib/i18n/locale"

const DICT = {
  fr: {
    title: "Produits suivis",
    count: (n: number, limit: number) => `${n} / ${limit} produits`,
    total: "Total",
    pricesFound: "Prix récupérés",
    priceDrops: "Baisses de prix",
    outOfStock: "En rupture",
    avgMargin: "Marge moyenne",
    noProduct: "Aucun produit suivi",
    noProductDescWithCompetitors: "Ajoutez les URLs des produits de vos concurrents pour surveiller leurs prix en temps réel.",
    noProductDescNoCompetitors: "Commencez par ajouter un concurrent, puis ajoutez les URLs des produits à surveiller.",
    addCompetitorFirst: "Ajouter un concurrent d'abord",
    allProducts: (n: number) => `Tous les produits (${n})`,
    priceUpdateNote: "Prix mis à jour toutes les 24h",
    product: "Produit",
    competitor: "Concurrent",
    currentPrice: "Prix actuel",
    history: "Historique",
    variation: "Variation",
    myMargin: "Ma marge",
    stock: "Stock",
    inStock: "En stock",
    outOfStockShort: "Rupture",
    sku: "SKU",
  },
  en: {
    title: "Tracked products",
    count: (n: number, limit: number) => `${n} / ${limit} products`,
    total: "Total",
    pricesFound: "Prices found",
    priceDrops: "Price drops",
    outOfStock: "Out of stock",
    avgMargin: "Average margin",
    noProduct: "No product tracked",
    noProductDescWithCompetitors: "Add your competitors' product URLs to monitor their prices in real time.",
    noProductDescNoCompetitors: "Start by adding a competitor, then add the product URLs to track.",
    addCompetitorFirst: "Add a competitor first",
    allProducts: (n: number) => `All products (${n})`,
    priceUpdateNote: "Prices updated every 24h",
    product: "Product",
    competitor: "Competitor",
    currentPrice: "Current price",
    history: "History",
    variation: "Change",
    myMargin: "My margin",
    stock: "Stock",
    inStock: "In stock",
    outOfStockShort: "Out of stock",
    sku: "SKU",
  },
}

export default async function ProductsPage() {
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
  const org = membership.org

  const [competitors, productsWithCompetitor] = await Promise.all([
    db.select().from(trackedCompetitors)
      .where(and(eq(trackedCompetitors.organizationId, org.id), eq(trackedCompetitors.isActive, true)))
      .orderBy(desc(trackedCompetitors.createdAt)),
    db.select({ product: trackedProducts, competitor: trackedCompetitors })
      .from(trackedProducts)
      .innerJoin(trackedCompetitors, eq(trackedProducts.competitorId, trackedCompetitors.id))
      .where(and(eq(trackedProducts.organizationId, org.id), eq(trackedProducts.isActive, true)))
      .orderBy(desc(trackedProducts.createdAt))
      .limit(200),
  ])

  const productIds = productsWithCompetitor.map(({ product }) => product.id)
  const historyRows = productIds.length > 0
    ? await db.select()
        .from(priceHistory)
        .where(inArray(priceHistory.productId, productIds))
        .orderBy(asc(priceHistory.scrapedAt))
    : []

  const historyByProduct = new Map<string, number[]>()
  for (const row of historyRows) {
    if (row.price == null) continue
    const arr = historyByProduct.get(row.productId) ?? []
    arr.push(row.price)
    historyByProduct.set(row.productId, arr)
  }

  const priceDrops = productsWithCompetitor.filter(({ product }) => (product.priceChangePercent ?? 0) < 0)
  const outOfStock = productsWithCompetitor.filter(({ product }) => product.isInStock === false)
  const withPrice = productsWithCompetitor.filter(({ product }) => product.currentPrice != null)
  const withMargin = productsWithCompetitor.filter(({ product }) => product.costPrice != null && product.yourPrice != null)
  const avgMargin = withMargin.length > 0
    ? withMargin.reduce((sum, { product }) => {
        const m = product.costPrice! > 0 ? ((product.yourPrice! - product.costPrice!) / product.costPrice!) * 100 : 0
        return sum + m
      }, 0) / withMargin.length
    : null

  return (
    <div className="p-6 space-y-6 bg-[#08090C] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t.title}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{t.count(productsWithCompetitor.length, org.productLimit)}</p>
        </div>
        <AddProductModal
          competitors={competitors}
          productLimit={org.productLimit}
          currentCount={productsWithCompetitor.length}
          locale={locale}
        />
      </div>

      {/* Quick stats */}
      {productsWithCompetitor.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: t.total, value: productsWithCompetitor.length, color: "text-white", bg: "bg-white/5", border: "border-white/8" },
            { label: t.pricesFound, value: withPrice.length, color: "text-[#A78BFA]", bg: "bg-[#8B5CF6]/8", border: "border-[#8B5CF6]/20" },
            { label: t.priceDrops, value: priceDrops.length, color: "text-emerald-400", bg: "bg-emerald-500/8", border: "border-emerald-500/20" },
            { label: t.outOfStock, value: outOfStock.length, color: "text-orange-400", bg: "bg-orange-500/8", border: "border-orange-500/20" },
            {
              label: t.avgMargin,
              value: avgMargin != null ? `${avgMargin.toFixed(0)}%` : "—",
              color: avgMargin == null ? "text-gray-600" : avgMargin >= 20 ? "text-emerald-400" : avgMargin >= 0 ? "text-amber-400" : "text-red-400",
              bg: "bg-white/5", border: "border-white/8",
            },
          ].map(({ label, value, color, bg, border }) => (
            <div key={label} className={`${bg} border ${border} rounded-xl p-4 text-center`}>
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      {productsWithCompetitor.length === 0 ? (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-14 text-center">
          <div className="h-16 w-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-5">
            <Package className="h-7 w-7 text-[#A78BFA]" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">{t.noProduct}</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            {competitors.length === 0
              ? t.noProductDescNoCompetitors
              : t.noProductDescWithCompetitors}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {competitors.length === 0 && (
              <Link
                href="/dashboard/competitors/new"
                className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-white/12 transition-colors"
              >
                {t.addCompetitorFirst}
              </Link>
            )}
            <AddProductModal
              competitors={competitors}
              productLimit={org.productLimit}
              currentCount={0}
              locale={locale}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <h2 className="font-semibold text-white text-sm">{t.allProducts(productsWithCompetitor.length)}</h2>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
              {t.priceUpdateNote}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 text-xs text-gray-500">
                  <th className="text-left px-5 py-3 font-medium">{t.product}</th>
                  <th className="text-left px-4 py-3 font-medium">{t.competitor}</th>
                  <th className="text-right px-4 py-3 font-medium">{t.currentPrice}</th>
                  <th className="text-center px-4 py-3 font-medium">{t.history}</th>
                  <th className="text-right px-4 py-3 font-medium">{t.variation}</th>
                  <th className="text-left px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1"><Wallet className="h-3 w-3" /> {t.myMargin}</span>
                  </th>
                  <th className="text-center px-4 py-3 font-medium">{t.stock}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {productsWithCompetitor.map(({ product, competitor }) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/3 transition-colors group">
                    <td className="px-5 py-3.5 max-w-xs">
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener"
                        className="text-white hover:text-[#A78BFA] transition-colors flex items-center gap-1.5 truncate font-medium"
                      >
                        {product.name || new URL(product.url).pathname.split("/").filter(Boolean).pop() || product.url}
                        <ExternalLink className="h-3 w-3 flex-shrink-0 text-gray-600 group-hover:text-[#A78BFA]" />
                      </a>
                      {product.sku && <p className="text-xs text-gray-600 mt-0.5">{t.sku}: {product.sku}</p>}
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/dashboard/competitors/${competitor.id}`}
                        className="text-gray-400 hover:text-white transition-colors text-xs font-medium"
                      >
                        {competitor.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {product.currentPrice != null ? (
                        <>
                          <p className="font-bold text-white">{product.currentPrice.toFixed(2)} {product.currency ?? "€"}</p>
                          {product.previousPrice != null && (
                            <p className="text-xs text-gray-500 line-through">{product.previousPrice.toFixed(2)} {product.currency ?? "€"}</p>
                          )}
                        </>
                      ) : (
                        <SetPriceButton productId={product.id} locale={locale} />
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <PriceSparkline points={historyByProduct.get(product.id) ?? []} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {product.priceChangePercent != null ? (
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg ${
                          product.priceChangePercent < 0
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-red-500/15 text-red-400"
                        }`}>
                          {product.priceChangePercent < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                          {Math.abs(product.priceChangePercent).toFixed(1)}%
                        </span>
                      ) : <span className="text-gray-600 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3.5">
                      <MarginEditor
                        productId={product.id}
                        costPrice={product.costPrice}
                        yourPrice={product.yourPrice}
                        competitorPrice={product.currentPrice}
                        locale={locale}
                      />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {product.isInStock === null ? (
                        <span className="text-gray-600 text-xs">—</span>
                      ) : product.isInStock ? (
                        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{t.inStock}</span>
                      ) : (
                        <span className="text-xs text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full">{t.outOfStockShort}</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <DeleteProductButton productId={product.id} locale={locale} />
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
