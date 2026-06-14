"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, ArrowLeft, Shield } from "lucide-react"

const STEPS = [
  {
    id: "category",
    question: "Quel type de produits vendez-vous ?",
    subtitle: "Sélectionnez votre catégorie principale",
    type: "single",
    options: [
      { value: "electronics", label: "Électronique / High-tech" },
      { value: "toys", label: "Jouets / Enfants" },
      { value: "clothing", label: "Vêtements / Mode" },
      { value: "home", label: "Maison / Décoration" },
      { value: "sports", label: "Sport / Loisirs" },
      { value: "beauty", label: "Beauté / Cosmétiques" },
      { value: "other", label: "Autre produit physique" },
    ],
  },
  {
    id: "markets",
    question: "Sur quels marchés vendez-vous en Europe ?",
    subtitle: "Sélectionnez tous vos marchés actifs",
    type: "multi",
    options: [
      { value: "fr", label: "🇫🇷 France" },
      { value: "de", label: "🇩🇪 Allemagne" },
      { value: "es", label: "🇪🇸 Espagne" },
      { value: "it", label: "🇮🇹 Italie" },
      { value: "uk", label: "🇬🇧 Royaume-Uni" },
      { value: "other_eu", label: "🇪🇺 Autres pays UE" },
    ],
  },
  {
    id: "platform",
    question: "Sur quelle(s) plateforme(s) vendez-vous ?",
    subtitle: "Plusieurs réponses possibles",
    type: "multi",
    options: [
      { value: "amazon", label: "Amazon" },
      { value: "shopify", label: "Shopify / boutique propre" },
      { value: "etsy", label: "Etsy" },
      { value: "ebay", label: "eBay" },
      { value: "tiktok", label: "TikTok Shop" },
      { value: "other", label: "Autre marketplace" },
    ],
  },
  {
    id: "docs",
    question: "Quels documents possédez-vous déjà ?",
    subtitle: "Cochez uniquement ce que vous avez réellement",
    type: "multi",
    options: [
      { value: "technical", label: "Dossier technique par produit" },
      { value: "risk", label: "Analyse de risques formalisée" },
      { value: "declaration", label: "Déclaration de conformité UE" },
      { value: "labels", label: "Étiquettes conformes GPSR" },
      { value: "responsible", label: "Personne responsable EU désignée" },
      { value: "none", label: "Aucun de ces documents" },
    ],
  },
]

const RISK_LABELS: Record<string, string> = {
  electronics: "Électronique — risque élevé (marquage CE requis)",
  toys: "Jouets — risque très élevé (directive jouets EN 71)",
  clothing: "Vêtements — risque modéré",
  home: "Maison — risque modéré à élevé selon les produits",
  sports: "Sport — risque modéré à élevé",
  beauty: "Beauté — risque élevé (règlement cosmétiques EU)",
  other: "Produit physique — risque à évaluer",
}

function computeScore(answers: Record<string, string[]>): { score: number; missing: string[] } {
  const docs = answers.docs ?? []
  const hasNone = docs.includes("none")
  const missing: string[] = []
  if (hasNone || !docs.includes("technical")) missing.push("Dossier technique produit")
  if (hasNone || !docs.includes("risk")) missing.push("Analyse de risques")
  if (hasNone || !docs.includes("declaration")) missing.push("Déclaration de conformité UE")
  if (hasNone || !docs.includes("labels")) missing.push("Étiquettes conformes")
  if (hasNone || !docs.includes("responsible")) missing.push("Personne responsable EU")
  const score = Math.max(0, 100 - missing.length * 20)
  return { score, missing }
}

export default function AuditGratuitPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [email, setEmail] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const current = STEPS[step]
  const selected = answers[current?.id] ?? []

  function toggle(value: string) {
    const id = current.id
    if (current.type === "single") {
      setAnswers(a => ({ ...a, [id]: [value] }))
    } else {
      if (value === "none") {
        setAnswers(a => ({ ...a, [id]: ["none"] }))
        return
      }
      setAnswers(a => {
        const prev = (a[id] ?? []).filter(v => v !== "none")
        return { ...a, [id]: prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value] }
      })
    }
  }

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else setStep(STEPS.length)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 600))
    setShowResult(true)
    setSubmitting(false)
  }

  const { score, missing } = showResult ? computeScore(answers) : { score: 0, missing: [] }

  const scoreColor = score >= 80 ? "text-emerald-600" : score >= 40 ? "text-amber-500" : "text-red-600"
  const scoreBg = score >= 80 ? "bg-emerald-50 border-emerald-200" : score >= 40 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#F9F8F5]">
        <header className="border-b border-gray-100 bg-white/95">
          <div className="max-w-3xl mx-auto px-5 h-14 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
              <span className="font-bold text-gray-900 text-sm">Conforva</span>
            </Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-5 py-12 space-y-6">
          <div className={`rounded-2xl border-2 p-8 text-center ${scoreBg}`}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Votre score de conformité GPSR</p>
            <p className={`text-7xl font-black tabular-nums ${scoreColor}`}>{score}<span className="text-3xl">/100</span></p>
            <p className={`text-sm font-semibold mt-2 ${scoreColor}`}>
              {score >= 80 ? "Bonne conformité" : score >= 40 ? "Conformité partielle — risques réels" : "Non conforme — risque élevé"}
            </p>
          </div>

          {missing.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Documents manquants ({missing.length})
              </p>
              <div className="space-y-3">
                {missing.map(m => (
                  <div key={m} className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                    <p className="text-sm text-gray-800">{m}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {answers.category?.[0] && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-amber-700">⚠️ {RISK_LABELS[answers.category[0]]}</p>
            </div>
          )}

          <div className="bg-blue-600 rounded-2xl p-6 text-white text-center">
            <Shield className="h-8 w-8 mx-auto mb-3 text-blue-200" />
            <p className="font-bold text-lg mb-1">
              {missing.length === 0 ? "Gardez votre conformité à jour automatiquement" : `Conforva génère vos ${missing.length} document${missing.length > 1 ? "s" : ""} manquant${missing.length > 1 ? "s" : ""} en quelques minutes`}
            </p>
            <p className="text-blue-200 text-sm mb-4">Dossier technique · Analyse de risques · Étiquettes · Personne responsable EU</p>
            <Link href="/auth/login">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold gap-2">
                Mettre mon entreprise en conformité <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-blue-300 text-xs mt-3">Essai gratuit · Starter dès 29€/mois · Sans engagement</p>
          </div>

          <button onClick={() => { setStep(0); setAnswers({}); setShowResult(false); setEmail("") }} className="w-full text-xs text-gray-400 hover:text-gray-600 text-center">
            Recommencer l'audit
          </button>
        </main>
      </div>
    )
  }

  if (step === STEPS.length) {
    return (
      <div className="min-h-screen bg-[#F9F8F5]">
        <header className="border-b border-gray-100 bg-white/95">
          <div className="max-w-3xl mx-auto px-5 h-14 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
              <span className="font-bold text-gray-900 text-sm">Conforva</span>
            </Link>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-5 py-16">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center space-y-5">
            <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
              <Shield className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Votre audit est prêt</h2>
              <p className="text-sm text-gray-500 mt-1">Entrez votre email pour voir votre score de conformité GPSR</p>
            </div>
            <form onSubmit={submit} className="space-y-3 text-left">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" className="w-full gap-2" disabled={submitting}>
                {submitting ? "Analyse en cours..." : "Voir mon score GPSR"}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
            <p className="text-xs text-gray-400">Audit 100% gratuit · Résultats immédiats · Pas de spam</p>
          </div>
        </main>
      </div>
    )
  }

  const canNext = selected.length > 0

  return (
    <div className="min-h-screen bg-[#F9F8F5]">
      <header className="border-b border-gray-100 bg-white/95">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
            <span className="font-bold text-gray-900 text-sm">Conforva</span>
          </Link>
          <span className="text-xs text-gray-400">{step + 1} / {STEPS.length}</span>
        </div>
        <div className="h-1 bg-gray-100">
          <div className="h-1 bg-blue-600 transition-all duration-300" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-12">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Audit GPSR gratuit</p>
            <h1 className="text-xl font-bold text-gray-900">{current.question}</h1>
            <p className="text-sm text-gray-500 mt-1">{current.subtitle}</p>
          </div>

          <div className="space-y-2">
            {current.options.map(opt => {
              const isSelected = selected.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggle(opt.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-colors ${
                    isSelected ? "border-blue-500 bg-blue-50 text-blue-900" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className={`h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}>
                    {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </span>
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              )
            })}
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(s => s - 1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Retour
              </Button>
            )}
            <Button onClick={next} disabled={!canNext} className="flex-1 gap-2">
              {step === STEPS.length - 1 ? "Voir mon score" : "Suivant"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
