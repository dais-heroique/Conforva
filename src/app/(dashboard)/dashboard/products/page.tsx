import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Package, Upload, CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react"
import { formatDate } from "@/lib/utils"

function StatusPill({ score, status }: { score: number; status: string }) {
  if (status === "compliant" || score >= 80) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 whitespace-nowrap">
        <CheckCircle2 className="h-3 w-3 shrink-0" />
        <span className="hidden sm:inline">Conforme</span>
      </span>
    )
  }
  if (status === "in_progress" || score >= 40) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-semibold text-amber-700 whitespace-nowrap">
        <Clock className="h-3 w-3 shrink-0" />
        <span className="hidden sm:inline">En cours</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200 px-2.5 py-1 text-[11px] font-semibold text-red-600 whitespace-nowrap">
      <AlertCircle className="h-3 w-3 shrink-0" />
      <span className="hidden sm:inline">Incomplet</span>
    </span>
  )
}

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: org } = await supabase.from("organizations").select("id").eq("owner_id", user.id).single()
  if (!org) redirect("/onboarding")

  const { data: products } = await supabase
    .from("products")
    .select("id, name, reference, created_at, product_categories(name_fr, icon)")
    .eq("org_id", org.id)
    .order("created_at", { ascending: false })

  const productIds = products?.map(p => p.id) ?? []
  const { data: complianceList } = productIds.length > 0
    ? await supabase.from("compliance_status").select("product_id, status, score").in("product_id", productIds)
    : { data: [] }
  const complianceMap = Object.fromEntries((complianceList ?? []).map(c => [c.product_id, c]))

  const count = products?.length ?? 0

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Mes produits</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {count} produit{count !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href="/dashboard/products/import">
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Importer</span>
              </Button>
            </Link>
            <Link href="/dashboard/products/new">
              <Button size="sm" className="gap-2 shadow-sm">
                <Plus className="h-3.5 w-3.5" />
                Nouveau
              </Button>
            </Link>
          </div>
        </div>

        {count === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
              <Package className="h-7 w-7 text-blue-400" />
            </div>
            <p className="text-base font-semibold text-gray-900 mb-2">Aucun produit</p>
            <p className="text-sm text-gray-500 mb-6 max-w-xs leading-relaxed">
              Ajoutez votre premier produit pour commencer votre dossier de conformité GPSR.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard/products/import">
                <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                  <Upload className="h-3.5 w-3.5" />Importer CSV
                </Button>
              </Link>
              <Link href="/dashboard/products/new">
                <Button size="sm" className="gap-2 w-full sm:w-auto">
                  <Plus className="h-3.5 w-3.5" />Créer manuellement
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-2.5 border-b border-gray-100 bg-gray-50/70">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Produit</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 w-24 text-center">Score</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 w-24 text-right">Statut</span>
            </div>

            <div className="divide-y divide-gray-50">
              {products!.map((product) => {
                const cs = complianceMap[product.id]
                const score = cs?.score ?? 0
                const status = cs?.status ?? "incomplete"
                const cat = (product as any).product_categories
                const barColor = score >= 80 ? "bg-emerald-400" : score >= 40 ? "bg-amber-400" : "bg-red-400"

                return (
                  <Link key={product.id} href={`/dashboard/products/${product.id}`}>
                    <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 hover:bg-gray-50/70 transition-colors group cursor-pointer">

                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                          <Package className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 break-words group-hover:text-blue-700 transition-colors leading-snug">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                            {cat?.name_fr ?? "Non catégorisé"}
                            {product.reference && <span className="font-mono"> · {product.reference}</span>}
                            <span className="hidden md:inline"> · {formatDate(product.created_at)}</span>
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-col items-center gap-1 w-24">
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${barColor}`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-gray-500 tabular-nums">{score}%</span>
                      </div>

                      <div className="flex items-center justify-end w-auto sm:w-24">
                        <StatusPill score={score} status={status} />
                      </div>

                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50 bg-gray-50/50">
              <span className="text-xs text-gray-400">{count} produit{count !== 1 ? "s" : ""} au total</span>
              <Link href="/dashboard/products/new">
                <button className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline">
                  <Plus className="h-3.5 w-3.5" />Ajouter un produit
                </button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
