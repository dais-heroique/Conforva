import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Package, Upload, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { getComplianceBg, formatDate } from "@/lib/utils"

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: org } = await supabase.from("organizations").select("id").eq("owner_id", user.id).single()
  if (!org) redirect("/onboarding")

  const { data: products } = await supabase
    .from("products")
    .select("*, product_categories(name_fr, icon)")
    .eq("org_id", org.id)
    .order("created_at", { ascending: false })

  const productIds = products?.map(p => p.id) ?? []
  const { data: complianceList } = productIds.length > 0
    ? await supabase.from("compliance_status").select("*").in("product_id", productIds)
    : { data: [] }
  const complianceMap = Object.fromEntries((complianceList ?? []).map(c => [c.product_id, c]))

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Mes produits</h1>
            <p className="text-sm text-gray-400 mt-0.5">{products?.length ?? 0} produit{(products?.length ?? 0) !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/products/import">
              <Button variant="outline" size="sm" className="gap-2"><Upload className="h-3.5 w-3.5" /><span className="hidden sm:inline">Importer</span></Button>
            </Link>
            <Link href="/dashboard/products/new">
              <Button size="sm" className="gap-2 shadow-sm"><Plus className="h-3.5 w-3.5" />Nouveau</Button>
            </Link>
          </div>
        </div>

        {/* Empty state */}
        {!products || products.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
              <Package className="h-7 w-7 text-blue-400" />
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-2">Aucun produit</p>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">Ajoutez votre premier produit pour commencer votre dossier de conformité GPSR.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard/products/import">
                <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto"><Upload className="h-3.5 w-3.5" />Importer CSV</Button>
              </Link>
              <Link href="/dashboard/products/new">
                <Button size="sm" className="gap-2 w-full sm:w-auto"><Plus className="h-3.5 w-3.5" />Créer manuellement</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
            {products.map((product) => {
              const cs = complianceMap[product.id]
              const score = cs?.score ?? 0
              const status = cs?.status ?? "incomplete"
              const cat = product.product_categories as any
              const dot = score >= 80 ? "bg-emerald-400" : score >= 50 ? "bg-amber-400" : "bg-red-400"
              const StatusIcon = score >= 80 ? CheckCircle2 : score >= 50 ? Clock : AlertCircle
              const iconColor = score >= 80 ? "text-emerald-500" : score >= 50 ? "text-amber-500" : "text-red-400"
              return (
                <Link key={product.id} href={`/dashboard/products/${product.id}`}>
                  <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/70 transition-colors cursor-pointer group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl border border-gray-100">
                      {cat?.icon ?? "📦"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate group-hover:text-blue-700 transition-colors">{product.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {cat?.name_fr ?? "Non catégorisé"}
                        {product.reference && <span className="font-mono"> · {product.reference}</span>}
                        <span className="hidden sm:inline"> · {formatDate(product.created_at)}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden md:flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${dot}`} style={{ width: `${score}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 font-medium w-8 text-right">{score}%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <StatusIcon className={`h-3.5 w-3.5 shrink-0 ${iconColor}`} />
                        <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 hidden sm:inline ${getComplianceBg(score)}`}>
                          {status === "compliant" ? "Conforme" : status === "in_progress" ? "En cours" : "Incomplet"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
