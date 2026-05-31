import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ComplianceRing } from "@/components/ui/compliance-ring"
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner"
import {
  Package, Plus, CheckCircle2, Clock, AlertCircle,
  TrendingUp, FileText, Shield, Zap, Globe,
  ArrowRight, Activity, Star,
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
    .from("organizations").select("*").eq("owner_id", user.id).single()
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
      .select("action, created_at, entity_type, details")
      .eq("org_id", org.id)
      .order("created_at", { ascending: false })
      .limit(8),
  ])

  const complianceMap = Object.fromEntries((complianceList ?? []).map(c => [c.product_id, c]))

  const totalProducts = products?.length ?? 0
  const compliantCount = products?.filter(p => complianceMap[p.id]?.status === "compliant").length ?? 0
  const inProgressCount = products?.filter(p => complianceMap[p.id]?.status === "in_progress").length ?? 0
  const incompleteCount = totalProducts - compliantCount - inProgressCount
  const avgScore = totalProducts > 0
    ? Math.round((products ?? []).reduce((sum, p) => sum + (complianceMap[p.id]?.score ?? 0), 0) / totalProducts)
    : 0

  const urgentProducts = (products ?? []).filter(p => (complianceMap[p.id]?.score ?? 0) < 30).length

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, <span className="text-blue-600">{org.name}</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="gap-2 shadow-md shadow-blue-200">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nouveau produit</span>
          </Button>
        </Link>
      </div>

      <DisclaimerBanner />

      {/* Urgent alert */}
      {urgentProducts > 0 && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-red-900 text-sm">
              {urgentProducts} produit{urgentProducts > 1 ? "s" : ""} nécessite{urgentProducts > 1 ? "nt" : ""} une attention urgente
            </p>
            <p className="text-xs text-red-700">Score de conformité inférieur à 30% — lancez l'analyse dès maintenant.</p>
          </div>
          <Link href="/dashboard/products">
            <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100 shrink-0">
              Voir <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      )}

      {/* Hero: compliance ring + stats */}
      {totalProducts > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          {/* Ring */}
          <Card className="md:col-span-1 flex flex-col items-center justify-center py-6">
            <p className="text-sm font-medium text-gray-500 mb-4">Score global de conformité</p>
            <ComplianceRing score={avgScore} size={130} strokeWidth={12} />
            <p className="text-xs text-gray-400 mt-4 text-center px-4">
              Moyenne pondérée de {totalProducts} produit{totalProducts > 1 ? "s" : ""}
            </p>
          </Card>

          {/* Status breakdown */}
          <Card className="md:col-span-2">
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm font-medium text-gray-700">Répartition par statut</p>

              {totalProducts > 0 && (
                <div className="space-y-3">
                  {[
                    { label: "Conformes", count: compliantCount, color: "bg-green-500", light: "bg-green-50 text-green-700", icon: CheckCircle2 },
                    { label: "En cours", count: inProgressCount, color: "bg-amber-500", light: "bg-amber-50 text-amber-700", icon: Clock },
                    { label: "Incomplets", count: incompleteCount, color: "bg-red-400", light: "bg-red-50 text-red-700", icon: AlertCircle },
                  ].map(({ label, count, color, light, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${light} w-28 shrink-0`}>
                        <Icon className="h-3 w-3" />
                        {label}
                      </div>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${color}`}
                          style={{ width: totalProducts > 0 ? `${Math.round((count / totalProducts) * 100)}%` : "0%" }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-700 w-8 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 pt-2 border-t">
                {[
                  { label: "Produits total", value: totalProducts, icon: Package, color: "text-blue-600 bg-blue-50" },
                  { label: "Marchés couverts", value: [...new Set((products ?? []).flatMap(p => (p as any).target_markets ?? []))].length, icon: Globe, color: "text-violet-600 bg-violet-50" },
                  { label: "Score moyen", value: `${avgScore}%`, icon: Star, color: "text-amber-600 bg-amber-50" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="text-center space-y-1">
                    <div className={`h-8 w-8 rounded-lg ${color} flex items-center justify-center mx-auto`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-lg font-bold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: "/dashboard/products/new", icon: Plus, label: "Nouveau produit", sub: "Créer ou importer", bg: "bg-blue-600", hover: "hover:bg-blue-700" },
          { href: "/dashboard/documents", icon: FileText, label: "Documents", sub: "Dossiers techniques", bg: "bg-violet-600", hover: "hover:bg-violet-700" },
          { href: "/dashboard/responsible-person", icon: Shield, label: "Personne Responsable", sub: "Coordonnées EU", bg: "bg-green-600", hover: "hover:bg-green-700" },
          { href: "/dashboard/labels", icon: Zap, label: "Étiquettes", sub: "Labels multilingues", bg: "bg-amber-500", hover: "hover:bg-amber-600" },
        ].map(({ href, icon: Icon, label, sub, bg, hover }) => (
          <Link key={href} href={href}>
            <div className={`group rounded-xl p-4 text-white cursor-pointer transition-all ${bg} ${hover} shadow-sm hover:shadow-md hover:-translate-y-0.5`}>
              <Icon className="h-5 w-5 mb-2 opacity-80" />
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-xs opacity-70 mt-0.5">{sub}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Products list */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Package className="h-4 w-4 text-blue-600" />
                Mes produits
              </CardTitle>
              <Link href="/dashboard/products">
                <Button variant="ghost" size="sm" className="text-xs">
                  Voir tout <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-0">
              {!products || products.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
                    <Package className="h-8 w-8 text-blue-400" />
                  </div>
                  <p className="font-medium text-gray-700">Aucun produit pour l'instant</p>
                  <p className="text-sm text-gray-400">Créez votre premier produit pour lancer l'analyse de conformité.</p>
                  <Link href="/dashboard/products/new">
                    <Button size="sm" className="mt-2">Créer mon premier produit</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {products.slice(0, 8).map((product) => {
                    const cs = complianceMap[product.id]
                    const score = cs?.score ?? 0
                    const status = cs?.status ?? "incomplete"
                    const cat = product.product_categories as any
                    const colorClass = score >= 80 ? "bg-green-500" : score >= 50 ? "bg-amber-500" : "bg-red-400"
                    return (
                      <Link key={product.id} href={`/dashboard/products/${product.id}`}>
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/30 transition-all cursor-pointer group">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                            <Package className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
                            <p className="text-xs text-gray-400 truncate">
                              {cat?.name_fr ?? "—"}{product.reference && ` · ${product.reference}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="hidden md:flex items-center gap-1.5">
                              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${score}%` }} />
                              </div>
                              <span className="text-xs text-gray-500 w-8">{score}%</span>
                            </div>
                            <Badge variant="secondary" className={`text-xs ${getComplianceBg(score)}`}>
                              {status === "compliant" ? "Conforme" : status === "in_progress" ? "En cours" : "Incomplet"}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity feed */}
        <div>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-blue-600" />
                Activité récente
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {!recentActivity || recentActivity.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">Aucune activité pour l'instant.</p>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((event, i) => {
                    const label = ACTION_LABELS[event.action] ?? event.action
                    const isValidate = event.action === "validate_risk_assessment"
                    const isGenerate = event.action === "generate_risk_assessment"
                    return (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className={`mt-0.5 h-6 w-6 shrink-0 rounded-full flex items-center justify-center ${
                          isValidate ? "bg-green-100" : isGenerate ? "bg-blue-100" : "bg-gray-100"
                        }`}>
                          {isValidate ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                          ) : isGenerate ? (
                            <Zap className="h-3.5 w-3.5 text-blue-600" />
                          ) : (
                            <Activity className="h-3.5 w-3.5 text-gray-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-700">{label}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(event.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upsell */}
      {userData?.plan === "free" && (
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Plan gratuit — 1 référence incluse</p>
                <p className="text-sm text-blue-100">Passez à Starter : 5 références, sans watermark, exports illimités.</p>
              </div>
            </div>
            <Link href="/dashboard/billing" className="shrink-0">
              <Button variant="secondary" size="sm" className="bg-white text-blue-700 hover:bg-blue-50">
                Passer à Starter
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
