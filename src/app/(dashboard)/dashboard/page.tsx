import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Package, Plus, CheckCircle2, Clock, AlertCircle,
  TrendingUp, FileText, Shield, Tag, Zap, Activity, BarChart3,
} from "lucide-react"
import { getComplianceBg, formatDate } from "@/lib/utils"

const ACTION_LABELS: Record<string, string> = {
  generate_risk_assessment: "Analyse de risque générée",
  validate_risk_assessment: "Dossier validé",
  create_product: "Produit créé",
  update_product: "Produit mis à jour",
  export_pdf: "PDF exporté",
}

function ScoreDot({ score }: { score: number }) {
  const c = score >= 80 ? "bg-emerald-400" : score >= 50 ? "bg-amber-400" : "bg-red-400"
  return <span className={`inline-block h-2 w-2 rounded-full ${c} shrink-0`} />
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: org } = await supabase
    .from("organizations").select("id, name").eq("owner_id", user.id).single()
  if (!org) redirect("/onboarding")

  const { data: userData } = await supabase
    .from("users").select("plan").eq("id", user.id).single()

  const { data: products } = await supabase
    .from("products")
    .select("id, name, reference, created_at, product_categories(name_fr, icon)")
    .eq("org_id", org.id)
    .order("created_at", { ascending: false })
    .limit(20)

  const productIds = products?.map(p => p.id) ?? []

  const [{ data: complianceList }, { data: recentActivity }] = await Promise.all([
    productIds.length > 0
      ? supabase.from("compliance_status").select("product_id, status, score").in("product_id", productIds)
      : Promise.resolve({ data: [] }),
    supabase.from("audit_log")
      .select("action, created_at, details")
      .eq("org_id", org.id)
      .order("created_at", { ascending: false })
      .limit(8),
  ])

  const complianceMap = Object.fromEntries((complianceList ?? []).map(c => [c.product_id, c]))

  const total = products?.length ?? 0
  const compliant = (products ?? []).filter(p => complianceMap[p.id]?.status === "compliant").length
  const inProgress = (products ?? []).filter(p => complianceMap[p.id]?.status === "in_progress").length
  const avgScore = total > 0
    ? Math.round((products ?? []).reduce((s, p) => s + (complianceMap[p.id]?.score ?? 0), 0) / total)
    : 0
  const urgent = (products ?? []).filter(p => (complianceMap[p.id]?.score ?? 0) < 30 && complianceMap[p.id]).length

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir"

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {greeting} 👋
            </h1>
            <p className="text-sm text-gray-400 mt-0.5 capitalize">
              {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
              {userData?.plan && userData.plan !== "free" && (
                <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                  {userData.plan}
                </span>
              )}
            </p>
          </div>
          <Link href="/dashboard/products/new">
            <Button size="sm" className="gap-2 shadow-sm shrink-0">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nouveau produit</span>
              <span className="sm:hidden">Nouveau</span>
            </Button>
          </Link>
        </div>

        {/* Urgent alert */}
        {urgent > 0 && (
          <div className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
            <p className="text-sm text-red-700 flex-1">
              <strong>{urgent} produit{urgent > 1 ? "s" : ""}</strong> avec un score critique — analyse requise.
            </p>
            <Link href="/dashboard/products">
              <span className="text-xs text-red-600 font-semibold hover:underline shrink-0">Voir →</span>
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Produits", value: total, icon: Package, accent: "blue" },
            { label: "Conformes", value: compliant, icon: CheckCircle2, accent: "emerald" },
            { label: "En cours", value: inProgress, icon: Clock, accent: "amber" },
            { label: "Score moyen", value: `${avgScore}%`, icon: BarChart3, accent: "violet" },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-400 font-medium">{label}</span>
                <div className={`h-8 w-8 rounded-xl bg-${accent}-50 flex items-center justify-center`}>
                  <Icon className={`h-4 w-4 text-${accent}-500`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 tabular-nums">{value}</p>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-4">

          {/* Products — 3 col */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-semibold text-gray-900">Produits récents</h2>
              <Link href="/dashboard/products" className="text-xs font-medium text-blue-600 hover:underline">
                Voir tout →
              </Link>
            </div>

            {!products || products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-blue-400" />
                </div>
                <p className="font-semibold text-gray-700 mb-1">Aucun produit</p>
                <p className="text-sm text-gray-400 mb-5 max-w-xs">Créez votre premier produit pour lancer l'analyse GPSR.</p>
                <Link href="/dashboard/products/new">
                  <Button size="sm" className="gap-2">
                    <Plus className="h-3.5 w-3.5" />Premier produit
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {products.slice(0, 7).map((product) => {
                  const cs = complianceMap[product.id]
                  const score = cs?.score ?? 0
                  const status = cs?.status ?? "incomplete"
                  const cat = (product as any).product_categories
                  return (
                    <Link key={product.id} href={`/dashboard/products/${product.id}`}>
                      <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/70 transition-colors group cursor-pointer">
                        <div className="h-9 w-9 shrink-0 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-base">
                          {cat?.icon ?? "📦"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">
                            {cat?.name_fr ?? "—"}
                            {product.reference && <span className="font-mono"> · {product.reference}</span>}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <ScoreDot score={score} />
                          <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 whitespace-nowrap ${getComplianceBg(score)}`}>
                            {status === "compliant" ? "Conforme" : status === "in_progress" ? "En cours" : "Incomplet"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
                {products.length > 7 && (
                  <Link href="/dashboard/products">
                    <div className="px-5 py-3 text-center text-xs text-blue-600 font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                      + {products.length - 7} autres produits →
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right column — 2 col */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Quick links — desktop only (mobile has hamburger) */}
            <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Accès rapide</p>
              <div className="space-y-1">
                {[
                  { href: "/dashboard/documents", icon: FileText, label: "Documents" },
                  { href: "/dashboard/responsible-person", icon: Shield, label: "Personne Responsable EU" },
                  { href: "/dashboard/labels", icon: Tag, label: "Étiquettes" },
                  { href: "/dashboard/settings", icon: TrendingUp, label: "Paramètres & Facturation" },
                ].map(({ href, icon: Icon, label }) => (
                  <Link key={href} href={href}>
                    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <Icon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
                      <span className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors">{label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
              <div className="px-5 py-4 border-b border-gray-50">
                <h2 className="text-sm font-semibold text-gray-900">Activité</h2>
              </div>
              <div className="p-4">
                {!recentActivity || recentActivity.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">Aucune activité récente.</p>
                ) : (
                  <div className="space-y-3">
                    {recentActivity.map((event, i) => {
                      const label = ACTION_LABELS[event.action] ?? event.action
                      const isValidate = event.action === "validate_risk_assessment"
                      const isGenerate = event.action === "generate_risk_assessment"
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`mt-0.5 h-6 w-6 shrink-0 rounded-full flex items-center justify-center ${
                            isValidate ? "bg-emerald-100" : isGenerate ? "bg-blue-100" : "bg-gray-100"
                          }`}>
                            {isValidate
                              ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              : isGenerate
                              ? <Zap className="h-3.5 w-3.5 text-blue-600" />
                              : <Activity className="h-3.5 w-3.5 text-gray-400" />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-700 leading-snug">{label}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">
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
        </div>

        {/* Upsell */}
        {userData?.plan === "free" && (
          <div className="bg-white rounded-2xl border border-blue-100 px-5 py-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">Plan Gratuit — 1 référence incluse</p>
                  <p className="text-xs text-gray-500 truncate">Starter : 5 références · PDF sans watermark · 5 langues à 29€/mois</p>
                </div>
              </div>
              <Link href="/dashboard/settings" className="shrink-0">
                <Button size="sm" variant="outline" className="text-blue-700 border-blue-200 hover:bg-blue-50 whitespace-nowrap">
                  Voir les plans
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
