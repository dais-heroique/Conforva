import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Package, Plus, CheckCircle2, Clock, AlertCircle,
  TrendingUp, FileText, Shield, Tag, ArrowRight,
  Activity, Zap, Globe, BarChart3,
} from "lucide-react"
import { getComplianceBg, formatDate } from "@/lib/utils"

const ACTION_LABELS: Record<string, string> = {
  generate_risk_assessment: "Analyse générée",
  validate_risk_assessment: "Dossier validé",
  create_product: "Produit créé",
  update_product: "Produit modifié",
  export_pdf: "PDF exporté",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: org } = await supabase
    .from("organizations").select("id, name, owner_id").eq("owner_id", user.id).single()
  if (!org) redirect("/onboarding")

  const { data: userData } = await supabase
    .from("users").select("plan").eq("id", user.id).single()

  const { data: products } = await supabase
    .from("products")
    .select("*, product_categories(name_fr, icon)")
    .eq("org_id", org.id)
    .order("created_at", { ascending: false })
    .limit(20)

  const productIds = products?.map(p => p.id) ?? []

  const [{ data: complianceList }, { data: recentActivity }] = await Promise.all([
    productIds.length > 0
      ? supabase.from("compliance_status").select("*").in("product_id", productIds)
      : Promise.resolve({ data: [] }),
    supabase.from("audit_log")
      .select("action, created_at, details")
      .eq("org_id", org.id)
      .order("created_at", { ascending: false })
      .limit(6),
  ])

  const complianceMap = Object.fromEntries((complianceList ?? []).map(c => [c.product_id, c]))

  const totalProducts = products?.length ?? 0
  const compliantCount = (products ?? []).filter(p => complianceMap[p.id]?.status === "compliant").length
  const inProgressCount = (products ?? []).filter(p => complianceMap[p.id]?.status === "in_progress").length
  const avgScore = totalProducts > 0
    ? Math.round((products ?? []).reduce((sum, p) => sum + (complianceMap[p.id]?.score ?? 0), 0) / totalProducts)
    : 0
  const urgentProducts = (products ?? []).filter(p => (complianceMap[p.id]?.score ?? 0) < 30).length

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir"

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{greeting}, <span className="text-blue-600">{org.name}</span></h1>
            <p className="text-sm text-gray-400 mt-0.5 capitalize">
              {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </div>
          <Link href="/dashboard/products/new">
            <Button size="sm" className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nouveau produit</span>
              <span className="sm:hidden">Nouveau</span>
            </Button>
          </Link>
        </div>

        {/* ── Alert urgente ── */}
        {urgentProducts > 0 && (
          <div className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
            <p className="text-sm text-red-700 flex-1">
              <strong>{urgentProducts} produit{urgentProducts > 1 ? "s" : ""}</strong> avec un score sous 30% — analyse requise.
            </p>
            <Link href="/dashboard/products">
              <button className="text-xs text-red-600 font-medium hover:underline shrink-0">Voir →</button>
            </Link>
          </div>
        )}

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Produits", value: totalProducts, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Conformes", value: compliantCount, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "En cours", value: inProgressCount, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Score moyen", value: `${avgScore}%`, icon: BarChart3, color: "text-violet-600", bg: "bg-violet-50" },
          ].map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium">{s.label}</span>
                  <div className={`h-7 w-7 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <Icon className={`h-3.5 w-3.5 ${s.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
            )
          })}
        </div>

        {/* ── Raccourcis ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { href: "/dashboard/products/new", icon: Plus, label: "Nouveau produit" },
            { href: "/dashboard/documents", icon: FileText, label: "Documents" },
            { href: "/dashboard/responsible-person", icon: Shield, label: "Pers. Responsable" },
            { href: "/dashboard/labels", icon: Tag, label: "Étiquettes" },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}>
              <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer">
                <Icon className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="text-sm font-medium text-gray-700 truncate">{label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Produits + Activité ── */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* Products */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-semibold text-gray-900">Mes produits</h2>
              <Link href="/dashboard/products" className="text-xs text-blue-600 hover:underline">
                Voir tout →
              </Link>
            </div>

            {!products || products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-blue-400" />
                </div>
                <p className="font-medium text-gray-700 mb-1">Aucun produit</p>
                <p className="text-sm text-gray-400 mb-5">Créez votre premier produit pour lancer l'analyse GPSR.</p>
                <Link href="/dashboard/products/new">
                  <Button size="sm" className="gap-2"><Plus className="h-3.5 w-3.5" />Créer mon premier produit</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {products.slice(0, 8).map((product) => {
                  const cs = complianceMap[product.id]
                  const score = cs?.score ?? 0
                  const status = cs?.status ?? "incomplete"
                  const cat = product.product_categories as any
                  const dot = score >= 80 ? "bg-emerald-400" : score >= 50 ? "bg-amber-400" : "bg-red-400"
                  return (
                    <Link key={product.id} href={`/dashboard/products/${product.id}`}>
                      <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/70 transition-colors cursor-pointer">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm">
                          {cat?.icon ?? "📦"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-gray-400 truncate">
                            {cat?.name_fr ?? "—"}{product.reference && ` · ${product.reference}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0">
                          <div className="hidden sm:flex items-center gap-1.5">
                            <div className="w-14 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${dot}`} style={{ width: `${score}%` }} />
                            </div>
                            <span className="text-xs text-gray-400 w-7 text-right">{score}%</span>
                          </div>
                          <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${getComplianceBg(score)}`}>
                            {status === "compliant" ? "Conforme" : status === "in_progress" ? "En cours" : "Incomplet"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Activity */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-semibold text-gray-900">Activité récente</h2>
            </div>
            <div className="p-5">
              {!recentActivity || recentActivity.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Aucune activité.</p>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((event, i) => {
                    const label = ACTION_LABELS[event.action] ?? event.action
                    const isValidate = event.action === "validate_risk_assessment"
                    const isGenerate = event.action === "generate_risk_assessment"
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center ${
                          isValidate ? "bg-emerald-100" : isGenerate ? "bg-blue-100" : "bg-gray-100"
                        }`}>
                          {isValidate
                            ? <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            : isGenerate
                            ? <Zap className="h-3 w-3 text-blue-600" />
                            : <Activity className="h-3 w-3 text-gray-400" />
                          }
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">{label}</p>
                          <p className="text-[11px] text-gray-400">
                            {new Date(event.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Upsell ── */}
        {userData?.plan === "free" && (
          <div className="bg-white rounded-xl border border-blue-100 px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Plan Gratuit — 1 référence incluse</p>
                  <p className="text-xs text-gray-500">Passez à Starter : 5 références, PDF sans watermark, 5 langues.</p>
                </div>
              </div>
              <Link href="/dashboard/billing" className="shrink-0">
                <Button size="sm" variant="outline" className="text-blue-700 border-blue-200 hover:bg-blue-50">
                  Passer à Starter
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
