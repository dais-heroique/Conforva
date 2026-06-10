"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, DollarSign, Users, Link as LinkIcon, BarChart3 } from "lucide-react"

export default function PartenairesPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", iban: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<{ code: string; referral_url: string; stats_url: string } | null>(null)
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/affiliates/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, company: form.company, iban: form.iban }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.error === "email_already_registered") {
          setErrorMsg("Cet email est déjà enregistré dans notre programme.")
        } else {
          setErrorMsg("Une erreur est survenue. Réessayez.")
        }
        setStatus("error")
        return
      }
      setResult(data)
      setStatus("success")
    } catch {
      setErrorMsg("Une erreur est survenue. Réessayez.")
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F8F5]">
      {/* Nav */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/favicon.png" alt="Conforva" className="h-8 w-8 object-contain" />
            <span className="font-bold text-gray-900">Conforva</span>
          </Link>
          <Link href="/auth/login">
            <Button size="sm" variant="ghost">Connexion</Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="px-5 pt-16 pb-12 sm:pt-24 sm:pb-20 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
            <span className="text-xs font-semibold text-emerald-700">Programme partenaire — 30% de commission récurrente</span>
          </div>
          <h1 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[0.97] tracking-tight text-gray-950 mb-5">
            Gagnez jusqu'à <em className="italic font-light text-blue-700">237 €/mois</em><br />
            par client envoyé
          </h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Recommandez Conforva à vos clients qui vendent en Europe.
            Vous recevez 30% de leurs abonnements pendant 12 mois — sans contrat, sans effort.
          </p>
        </section>

        {/* How it works */}
        <section className="px-5 py-10 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-4 gap-6">
              {[
                { icon: LinkIcon, n: "01", title: "Inscrivez-vous", desc: "Recevez votre lien unique en 30 secondes." },
                { icon: Users, n: "02", title: "Partagez le lien", desc: "Envoyez-le à vos clients, dans vos emails, sur vos réseaux." },
                { icon: BarChart3, n: "03", title: "Suivez vos stats", desc: "Dashboard en temps réel : clics, inscriptions, revenus." },
                { icon: DollarSign, n: "04", title: "Soyez payé", desc: "Virement mensuel automatique. 30% pendant 12 mois." },
              ].map(s => {
                const Icon = s.icon
                return (
                  <div key={s.n} className="text-center">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{s.n}</p>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{s.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Commission calculator */}
        <section className="px-5 py-12 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Combien pouvez-vous gagner ?</h2>
          <p className="text-sm text-gray-500 text-center mb-8">30% de chaque abonnement, versés chaque mois pendant 12 mois</p>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-100 px-5 py-3">
              {["Plan", "Prix", "Votre commission", "× 10 clients"].map(h => (
                <p key={h} className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{h}</p>
              ))}
            </div>
            {[
              { plan: "Starter", mrr: 29, color: "text-gray-700" },
              { plan: "Growth", mrr: 79, color: "text-blue-700" },
              { plan: "Pro", mrr: 199, color: "text-violet-700" },
            ].map((s, i, arr) => {
              const commission = s.mrr * 0.30
              return (
                <div key={s.plan} className={`grid grid-cols-4 px-5 py-4 items-center ${i < arr.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <p className={`text-sm font-bold ${s.color}`}>{s.plan}</p>
                  <p className="text-sm text-gray-600 tabular-nums">{s.mrr} €<span className="text-xs text-gray-400">/mois</span></p>
                  <div>
                    <p className="text-sm font-semibold text-emerald-600 tabular-nums">{commission.toFixed(2)} €<span className="text-xs text-gray-400">/client</span></p>
                    <p className="text-[10px] text-gray-400">{s.mrr} × 30%</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 tabular-nums">{(commission * 10).toFixed(0)} €<span className="text-xs font-normal text-gray-400">/mois</span></p>
                </div>
              )
            })}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">Commission versée pendant 12 mois par client actif · Aucun plafond</p>
        </section>

        {/* Benefits */}
        <section className="px-5 py-10 bg-white border-y border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Ce que vous obtenez</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "30% de commission récurrente pendant 12 mois",
                "Lien de parrainage unique et traçable",
                "Dashboard temps réel : clics, conversions, revenus",
                "Paiement mensuel par virement",
                "Aucun contrat, aucune intégration technique",
                "Matériel de présentation fourni sur demande",
                "Support dédié aux partenaires",
                "Aucun plafond de gains",
              ].map(b => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Registration form */}
        <section className="px-5 py-16 max-w-lg mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            {status === "success" && result ? (
              <div className="text-center space-y-5">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Bienvenue dans le programme !</h3>
                  <p className="text-sm text-gray-500 mt-1">Voici vos informations partenaire. Sauvegardez-les.</p>
                </div>
                <div className="space-y-3 text-left">
                  <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Votre lien de parrainage</p>
                    <p className="text-sm font-mono text-blue-700 break-all">{result.referral_url}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Votre tableau de bord stats</p>
                    <a href={result.stats_url} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-mono text-blue-700 break-all hover:underline">{result.stats_url}</a>
                  </div>
                </div>
                <a href={result.stats_url} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full gap-2">
                    Voir mon tableau de bord <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <p className="text-xs text-gray-400">Bookmarkez le lien de votre dashboard — il n'est pas envoyé par email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Rejoindre le programme</h2>
                  <p className="text-sm text-gray-500">Inscription gratuite, lien actif immédiatement.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Prénom et nom *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Marie Dupont"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email professionnel *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="marie@entreprise.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Entreprise</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Bigblue, Shopify Agency…"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">IBAN pour recevoir vos commissions *</label>
                  <input
                    type="text"
                    required
                    value={form.iban}
                    onChange={e => setForm(f => ({ ...f, iban: e.target.value.toUpperCase().replace(/\s/g, "") }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="FR76300060000112345678901"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Utilisé uniquement pour vous virer vos commissions chaque mois.</p>
                </div>

                {errorMsg && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errorMsg}</p>
                )}

                <Button type="submit" className="w-full gap-2" disabled={status === "loading"}>
                  {status === "loading" ? "Inscription..." : "Obtenir mon lien partenaire"}
                  {status !== "loading" && <ArrowRight className="h-4 w-4" />}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  En vous inscrivant, vous acceptez nos{" "}
                  <Link href="/cgu" className="underline">CGU</Link>.
                  Aucune carte requise.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Conforva · <Link href="/privacy" className="hover:text-gray-600">Confidentialité</Link>
      </footer>
    </div>
  )
}
