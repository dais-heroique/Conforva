import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Package, Plus, CheckCircle2, Clock, AlertCircle,
  TrendingUp, FileText, Shield, Tag, Zap, Activity,
  ArrowRight, TriangleAlert, CircleCheck,
} from "lucide-react"
import { getComplianceBg, formatDate } from "@/lib/utils"
import { getLocale, getDictionary } from "@/lib/i18n"

const ACTION_LABELS: Record<string, string> = {
  generate_risk_assessment: "Analyse de risque générée",
  validate_risk_assessment: "Dossier validé",
  create_product: "Produit créé",
  update_product: "Produit mis à jour",
  export_pdf: "PDF exporté",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user: authUser } } = await supabase.auth.getUser()
  if (!authUser) redirect("/auth/login")

  const rawName: string = authUser.user_metadata?.full_name ?? authUser.user_metadata?.name ?? ""
  const firstName = rawName.trim().split(/\s+/)[0] ?? ""

  const { data: org } = await supabase
    .from("organizations").select("id, name").eq("owner_id", authUser.id).single()
  if (!org) redirect("/onboarding")

  const { data: userData } = await supabase
    .from("users").select("plan").eq("id", authUser.id).single()

  const [
    { data: products },
    { data: responsiblePersons },
    { data: recentActivity },
  ] = await Promise.all([
    supabase
      .from("products")
      .select("id, name, reference, created_at, product_categories(name_fr, icon)")
      .eq("org_id", org.id)
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("responsible_persons")
      .select("id, company_name")
      .eq("org_id", org.id)
      .limit(1),
    supabase
      .from("audit_log")
      .select("action, created_at, details")
      .eq("org_id", org.id)
      .order("created_at", { ascending: false })
      .limit(8),
  ])

  const productIds = products?.map(p => p.id) ?? []
  const { data: complianceList } = productIds.length > 0
    ? await supabase.from("compliance_status").select("product_id, status, score").in("product_id", productIds)
    : { data: [] }

  const complianceMap = Object.fromEntries((complianceList ?? []).map(c => [c.product_id, c]))

  const total = products?.length ?? 0
  const compliant = (products ?? []).filter(p => (complianceMap[p.id]?.score ?? 0) >= 80).length
  const inProgress = (products ?? []).filter(p => {
    const s = complianceMap[p.id]?.score ?? 0
    return s >= 40 && s < 80
  }).length
  const urgent = (products ?? []).filter(p => (complianceMap[p.id]?.score ?? 0) < 40 && complianceMap[p.id]).length
  const untouched = (products ?? []).filter(p => !complianceMap[p.id]).length
  const avgScore = total > 0
    ? Math.round((products ?? []).reduce((s, p) => s + (complianceMap[p.id]?.score ?? 0), 0) / total)
    : 0

  const hasResponsiblePerson = (responsiblePersons?.length ?? 0) > 0

  const requiredActions: { label: string; href: string; critical: boolean }[] = []
  if (!hasResponsiblePerson) {
    requiredActions.push({
      label: "Désigner une Personne Responsable EU (Art. 16 — obligatoire)",
      href: "/dashboard/responsible-person",
      critical: true,
    })
  }
  if (untouched > 0) {
    requiredActions.push({
      label: `${untouched} produit${untouched > 1 ? "s" : ""} sans analyse de risque`,
      href: "/dashboard/products",
      critical: true,
    })
  }
  if (urgent > 0) {
    requiredActions.push({
      label: `${urgent} produit${urgent > 1 ? "s" : ""} avec score critique (< 40%)`,
      href: "/dashboard/products",
      critical: true,
    })
  }
  if (inProgress > 0) {
    requiredActions.push({
      label: `${inProgress} produit${inProgress > 1 ? "s" : ""} à finaliser pour obtenir la conformité`,
      href: "/dashboard/products",
      critical: false,
    })
  }

  const sortedProducts = [...(products ?? [])].sort((a, b) => {
    const sa = complianceMap[a.id]?.score ?? -1
    const sb = complianceMap[b.id]?.score ?? -1
    return sa - sb
  })

  const hour = new Date().getHours()
  const timeGreeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir"
  const greeting = firstName ? `${timeGreeting}, ${firstName}` : timeGreeting

  const allProductsCompliant = total > 0 && compliant === total
  const allCompliant = allProductsCompliant && hasResponsiblePerson

  const locale = await getLocale()
  const dict = await getDictionary(locale)
  const t = dict.dashboard.home

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{greeting}</h1>
            <p className="text-sm text-gray-400 mt-0.5 capitalize">
              {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
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

        <div className={`rounded-2xl border p-5 ${allProductsCompliant ? "border-emerald-200 bg-emerald-50" : "border-blue-100 bg-white shadow-sm"}`}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {allProductsCompliant
                  ? <CircleCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  : <TriangleAlert className="h-4 w-4 text-amber-500 shrink-0" />
                }
                <p className="text-sm font-semibold text-gray-900">
                  {allProductsCompliant
                    ? "Tous vos produits sont conformes"
                    : `${compliant} / ${total} produit${total !== 1 ? "s" : ""} conformes (score ≥ 80%)`
                  }
                </p>
              </div>
              {total > 0 && (
                <>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full transition-all ${allProductsCompliant ? "bg-emerald-500" : "bg-blue-500"}`}
                      style={{ width: `${total > 0 ? Math.round((compliant / total) * 100) : 0}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                    {compliant > 0 && <span className="text-emerald-600 font-medium">{compliant} conforme{compliant > 1 ? "s" : ""}</span>}
                    {inProgress > 0 && <span className="text-amber-600 font-medium">{inProgress} en cours</span>}
                    {urgent > 0 && <span className="text-red-600 font-medium">{urgent} critique{urgent > 1 ? "s" : ""}</span>}
                    {untouched > 0 && <span className="text-gray-400">{untouched} non démarré{untouched > 1 ? "s" : ""}</span>}
                  </div>
                </>
              )}
            </div>
            <div className="text-center shrink-0">
              <p className="text-3xl font-black tabular-nums text-gray-900">{avgScore}<span className="text-lg font-bold text-gray-400">%</span></p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider">score moyen</p>
            </div>
          </div>
        </div>

        {requiredActions.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-50">
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
              <h2 className="text-sm font-semibold text-gray-900">
                {requiredActions.filter(a => a.critical).length > 0 ? "Actions requises pour la conformité GPSR" : "Points à finaliser"}
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {requiredActions.map((action, i) => (
                <Link key={i} href={action.href}>
                  <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/70 transition-colors cursor-pointer group">
                    <div className={`h-2 w-2 rounded-full shrink-0 ${action.critical ? "bg-red-400" : "bg-amber-400"}`} />
                    <p className="text-sm text-gray-700 flex-1 group-hover:text-blue-700 transition-colors">{action.label}</p>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {!allCompliant && total > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-50">
              <h2 className="text-sm font-semibold text-gray-900">Checklist GPSR — Ce que le règlement exige</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { art: "Art. 22", label: "Dossier technique complet (description, tests, normes, traçabilité)", done: allProductsCompliant, href: "/dashboard/products" },
                { art: "Art. 24", label: "Déclaration UE de conformité signée pour chaque produit", done: allProductsCompliant, href: "/dashboard/documents" },
                { art: "Art. 9", label: "Étiquetage sécurité multilingue (avertissements, fabricant, contact)", done: allProductsCompliant, href: "/dashboard/labels" },
                { art: "Art. 16", label: "Personne Responsable EU désignée (obligatoire pour fabricants hors UE)", done: hasResponsiblePerson, href: "/dashboard/responsible-person" },
              ].map(item => (
                <Link key={item.art} href={item.href}>
                  <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/60 transition-colors cursor-pointer group">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-emerald-100" : "bg-gray-100"}`}>
                      {item.done
                        ? <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        : <div className="h-2 w-2 rounded-full bg-gray-300" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-blue-600 mr-2">{item.art}</span>
                      <span className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors">{item.label}</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-200 group-hover:text-blue-400 transition-colors shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-4">

          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-semibold text-gray-900">Produits</h2>
              <Link href="/dashboard/products" className="text-xs font-medium text-blue-600 hover:underline">
                Voir tout →
              </Link>
            </div>

            {total === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-blue-400" />
                </div>
                <p className="font-semibold text-gray-700 mb-1">Aucun produit</p>
                <p className="text-sm text-gray-400 mb-5 max-w-xs">
                  Commencez par ajouter un produit pour générer votre premier dossier GPSR.
                </p>
                <Link href="/dashboard/products/new">
                  <Button size="sm" className="gap-2">
                    <Plus className="h-3.5 w-3.5" />Premier produit
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {sortedProducts.slice(0, 7).map((product) => {
                  const cs = complianceMap[product.id]
                  const score = cs?.score ?? 0
                  const status = cs?.status ?? "incomplete"
                  const barColor = score >= 80 ? "bg-emerald-400" : score >= 40 ? "bg-amber-400" : "bg-red-400"
                  const notStarted = !cs
                  return (
                    <Link key={product.id} href={`/dashboard/products/${product.id}`}>
                      <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/70 transition-colors group cursor-pointer">
                        <div className="h-9 w-9 shrink-0 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                          <Package className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {notStarted ? (
                              <span className="text-[10px] text-gray-400 italic">Non démarré — générer l&apos;analyse</span>
                            ) : (
                              <>
                                <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden shrink-0">
                                  <div className={`h-full rounded-full ${barColor}`} style={{ width: `${score}%` }} />
                                </div>
                                <span className="text-[11px] text-gray-400 tabular-nums shrink-0">{score}%</span>
                              </>
                            )}
                          </div>
                        </div>
                        <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 shrink-0 whitespace-nowrap ${
                          notStarted ? "bg-gray-100 text-gray-500"
                          : score >= 80 ? "bg-emerald-50 text-emerald-700"
                          : score >= 40 ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-600"
                        }`}>
                          {notStarted ? "Démarrer" : status === "compliant" ? "Conforme" : status === "in_progress" ? "En cours" : "Incomplet"}
                        </span>
                      </div>
                    </Link>
                  )
                })}
                {total > 7 && (
                  <Link href="/dashboard/products">
                    <div className="px-5 py-3 text-center text-xs text-blue-600 font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                      + {total - 7} autres produits →
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">

            <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Accès rapide</p>
              <div className="space-y-0.5">
                {[
                  { href: "/dashboard/documents", icon: FileText, label: "Documents" },
                  { href: "/dashboard/responsible-person", icon: Shield, label: "Personne Responsable EU", alert: !hasResponsiblePerson },
                  { href: "/dashboard/labels", icon: Tag, label: "Étiquettes multilingues" },
                  { href: "/dashboard/settings", icon: TrendingUp, label: "Paramètres & Facturation" },
                ].map(({ href, icon: Icon, label, alert }) => (
                  <Link key={href} href={href}>
                    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <Icon className={`h-4 w-4 shrink-0 transition-colors ${alert ? "text-amber-500" : "text-gray-400 group-hover:text-blue-600"}`} />
                      <span className={`text-sm flex-1 transition-colors ${alert ? "text-amber-700 font-medium" : "text-gray-700 group-hover:text-blue-700"}`}>{label}</span>
                      {alert && <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
              <div className="px-5 py-4 border-b border-gray-50">
                <h2 className="text-sm font-semibold text-gray-900">Activité récente</h2>
              </div>
              <div className="p-4">
                {!recentActivity || recentActivity.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">Aucune activité.</p>
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

        {userData?.plan === "free" && (
          <div className="bg-white rounded-2xl border border-blue-100 px-5 py-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{t.upsell.title}</p>
                  <p className="text-xs text-gray-500 truncate">{t.upsell.desc}</p>
                </div>
              </div>
              <Link href="/dashboard/billing" className="shrink-0">
                <Button size="sm" variant="outline" className="text-blue-700 border-blue-200 hover:bg-blue-50 whitespace-nowrap">
                  {t.upsell.upgrade}
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
