import { notFound } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Clock, DollarSign, TrendingUp, MousePointer, Copy } from "lucide-react"

async function getStats(token: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://conforva.com"
  const res = await fetch(`${base}/api/affiliates/stats/${token}`, { cache: "no-store" })
  if (!res.ok) return null
  return res.json()
}

export default async function PartnerStatsPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const data = await getStats(token)

  if (!data) notFound()

  const { affiliate, stats, conversions } = data
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://conforva.com"
  const referralUrl = `${baseUrl}?ref=${affiliate.code}`

  const planColor = (plan: string) =>
    plan === "growth" ? "bg-blue-50 text-blue-700" :
    plan === "pro" ? "bg-violet-50 text-violet-700" :
    plan === "enterprise" ? "bg-amber-50 text-amber-700" :
    "bg-gray-100 text-gray-600"

  return (
    <div className="min-h-screen bg-[#F9F8F5]">
      <header className="border-b border-gray-100 bg-white/95">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
            <span className="font-bold text-gray-900 text-sm">Conforva</span>
          </Link>
          <span className="text-xs text-gray-400">Tableau de bord partenaire</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-10 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, {affiliate.name} 👋
          </h1>
          {affiliate.company && (
            <p className="text-sm text-gray-500 mt-0.5">{affiliate.company}</p>
          )}
          <div className={`inline-flex items-center gap-1.5 mt-2 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${affiliate.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${affiliate.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
            {affiliate.status === "active" ? "Partenaire actif" : "Suspendu"}
          </div>
        </div>

        {/* Referral link */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Votre lien de parrainage</p>
          <div className="flex items-center gap-3 flex-wrap">
            <code className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono text-blue-700 break-all min-w-0">
              {referralUrl}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(referralUrl)}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors shrink-0"
            >
              <Copy className="h-3.5 w-3.5" /> Copier
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Cookie de 30 jours · Commission de {Math.round(affiliate.commission_rate * 100)}% pendant 12 mois
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: MousePointer, label: "Clics", value: stats.clicks, color: "text-gray-900", bg: "bg-gray-50" },
            { icon: TrendingUp, label: "Conversions", value: stats.conversions, color: "text-blue-600", bg: "bg-blue-50" },
            { icon: DollarSign, label: "À recevoir", value: `${stats.pending_earnings.toFixed(2)} €`, color: "text-amber-600", bg: "bg-amber-50" },
            { icon: CheckCircle2, label: "Reçu", value: `${stats.paid_earnings.toFixed(2)} €`, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className={`h-8 w-8 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <p className={`text-xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            )
          })}
        </div>

        {/* Total earnings highlight */}
        {stats.total_earnings > 0 && (
          <div className="bg-blue-600 rounded-2xl p-5 text-white flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-medium text-blue-200">Gains totaux générés</p>
              <p className="text-3xl font-bold tabular-nums">{stats.total_earnings.toFixed(2)} €</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-200">En attente de paiement</p>
              <p className="text-xl font-bold">{stats.pending_earnings.toFixed(2)} €</p>
            </div>
          </div>
        )}

        {/* Conversions table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="font-semibold text-gray-900">Historique des conversions</p>
          </div>
          {conversions.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-sm text-gray-400">Aucune conversion pour l'instant.</p>
              <p className="text-xs text-gray-400 mt-1">Partagez votre lien pour commencer à gagner.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {conversions.map((c: any, i: number) => (
                <div key={i} className="flex items-center gap-3 px-5 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${planColor(c.plan)}`}>
                        {c.plan}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(c.created_at).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">MRR : {c.mrr} €/mois</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-900">{Number(c.commission).toFixed(2)} €</p>
                    <div className={`flex items-center gap-1 text-[10px] font-semibold justify-end ${c.status === "paid" ? "text-emerald-600" : "text-amber-600"}`}>
                      {c.status === "paid" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {c.status === "paid" ? "Payé" : "En attente"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          Les paiements sont effectués par virement le 1er de chaque mois.
          Questions ? <a href="mailto:contact@conforva.com" className="underline">contact@conforva.com</a>
        </p>
      </main>
    </div>
  )
}
