import { redirect } from "next/navigation"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { CheckCircle2, Clock, TrendingUp, DollarSign, MousePointer, ExternalLink } from "lucide-react"

const ADMIN_EMAIL = "veltris.buisness@gmail.com"

async function markPaid(id: string) {
  "use server"
  const supabase = await createServiceClient()
  await supabase.from("affiliate_conversions")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .eq("id", id)
}

export default async function AffiliatesAdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: userData } = await supabase.from("users").select("email").eq("id", user.id).single() as any
  if (userData?.email !== ADMIN_EMAIL) redirect("/dashboard")

  const svc = await createServiceClient()

  const { data: affiliates } = await svc
    .from("affiliates")
    .select("id, name, email, company, code, token, status, commission_rate, created_at")
    .order("created_at", { ascending: false })

  const { data: conversions } = await svc
    .from("affiliate_conversions")
    .select("id, affiliate_id, plan, mrr, commission, status, created_at, paid_at, stripe_subscription_id")
    .order("created_at", { ascending: false })

  const { data: clicks } = await svc
    .from("affiliate_clicks")
    .select("affiliate_id")

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://conforva.com"

  // Aggregate per affiliate
  const statsMap = new Map<string, { clicks: number; conversions: number; totalCommission: number; pendingCommission: number }>()
  for (const a of affiliates ?? []) {
    statsMap.set(a.id, { clicks: 0, conversions: 0, totalCommission: 0, pendingCommission: 0 })
  }
  for (const c of clicks ?? []) {
    const s = statsMap.get(c.affiliate_id)
    if (s) s.clicks++
  }
  for (const c of conversions ?? []) {
    const s = statsMap.get(c.affiliate_id)
    if (s) {
      s.conversions++
      s.totalCommission += Number(c.commission)
      if (c.status === "pending") s.pendingCommission += Number(c.commission)
    }
  }

  const totalPending = (conversions ?? []).filter(c => c.status === "pending").reduce((s, c) => s + Number(c.commission), 0)
  const totalPaid = (conversions ?? []).filter(c => c.status === "paid").reduce((s, c) => s + Number(c.commission), 0)

  const planColor = (plan: string) =>
    plan === "growth" ? "bg-blue-50 text-blue-700" :
    plan === "pro" ? "bg-violet-50 text-violet-700" :
    plan === "enterprise" ? "bg-amber-50 text-amber-700" :
    "bg-gray-100 text-gray-600"

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Programme Affiliés</h1>
        <p className="text-sm text-gray-500 mt-0.5">{affiliates?.length ?? 0} partenaires enregistrés</p>
      </div>

      {/* Global stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: TrendingUp, label: "Partenaires", value: affiliates?.length ?? 0, color: "text-gray-900" },
          { icon: MousePointer, label: "Clics total", value: (clicks ?? []).length, color: "text-blue-600" },
          { icon: Clock, label: "Commissions dues", value: `${totalPending.toFixed(2)} €`, color: "text-amber-600" },
          { icon: DollarSign, label: "Total versé", value: `${totalPaid.toFixed(2)} €`, color: "text-emerald-600" },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1"><Icon className="h-3 w-3" />{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Affiliates table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="font-semibold text-gray-900">Partenaires</p>
        </div>
        {(affiliates ?? []).length === 0 ? (
          <p className="px-5 py-8 text-sm text-gray-400 text-center">Aucun partenaire enregistré.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Partenaire", "Code", "Clics", "Conv.", "Total €", "Dû €", "Stats", "Statut"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(affiliates ?? []).map(a => {
                  const s = statsMap.get(a.id)!
                  return (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 text-xs">{a.name}</p>
                        <p className="text-[10px] text-gray-400">{a.email}</p>
                        {a.company && <p className="text-[10px] text-gray-400">{a.company}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{a.code}</code>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-700 tabular-nums">{s.clicks}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-blue-600 tabular-nums">{s.conversions}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-900 tabular-nums">{s.totalCommission.toFixed(2)} €</td>
                      <td className="px-4 py-3 text-xs font-semibold text-amber-600 tabular-nums">{s.pendingCommission.toFixed(2)} €</td>
                      <td className="px-4 py-3">
                        <a
                          href={`${baseUrl}/partenaires/${a.token}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" /> Voir
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${a.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Conversions table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <p className="font-semibold text-gray-900">Toutes les conversions</p>
          <span className="text-xs text-amber-600 font-semibold">{totalPending.toFixed(2)} € à payer</span>
        </div>
        {(conversions ?? []).length === 0 ? (
          <p className="px-5 py-8 text-sm text-gray-400 text-center">Aucune conversion.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Date", "Partenaire", "Plan", "MRR", "Commission", "Statut", "Action"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(conversions ?? []).map((c: any) => {
                  const aff = (affiliates ?? []).find(a => a.id === c.affiliate_id)
                  return (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-[10px] text-gray-500 whitespace-nowrap">
                        {new Date(c.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700">{aff?.name ?? "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${planColor(c.plan)}`}>{c.plan}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700 tabular-nums">{c.mrr} €</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-900 tabular-nums">{Number(c.commission).toFixed(2)} €</td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1 text-[10px] font-semibold w-fit ${c.status === "paid" ? "text-emerald-600" : "text-amber-600"}`}>
                          {c.status === "paid" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          {c.status === "paid" ? "Payé" : "En attente"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {c.status === "pending" && (
                          <form action={markPaid.bind(null, c.id)}>
                            <button type="submit" className="text-[10px] font-semibold text-blue-600 hover:underline">
                              Marquer payé
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
