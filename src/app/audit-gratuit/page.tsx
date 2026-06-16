"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, XCircle, AlertTriangle, ArrowRight, ArrowLeft,
  Shield, Loader2, Link2, Package, ChevronDown,
} from "lucide-react"

const CATEGORIES = [
  { value: "candle", label: "Bougies / Parfums d'intérieur" },
  { value: "toy", label: "Jouets / Jeux / Enfants" },
  { value: "electronics", label: "Électronique / High-tech" },
  { value: "cosmetic", label: "Beauté / Cosmétiques / Soins" },
  { value: "textile", label: "Vêtements / Textiles / Mode" },
  { value: "puericulture", label: "Puériculture / Bébé" },
  { value: "decoration", label: "Maison / Décoration" },
  { value: "food_contact", label: "Articles au contact alimentaire" },
  { value: "furniture", label: "Mobilier / Meuble" },
  { value: "sport", label: "Sport / Loisirs / Outdoor" },
  { value: "other", label: "Autre produit physique" },
]

const CATEGORY_QUESTIONS: Record<string, Array<{
  key: string; label: string; type: "boolean" | "select" | "text"
  options?: string[]; help?: string
}>> = {
  candle: [
    { key: "lab_test_done", label: "Des tests de sécurité ont été réalisés en laboratoire accrédité (EN 15493)", type: "boolean" },
    { key: "has_clp", label: "Les allergènes et mentions CLP figurent sur l'emballage", type: "boolean" },
    { key: "has_sds", label: "Une fiche de données de sécurité (FDS) est disponible", type: "boolean" },
    { key: "ifra_compliant", label: "La fragrance est certifiée conforme IFRA", type: "boolean" },
  ],
  toy: [
    { key: "age_min_months", label: "Âge minimum recommandé", type: "select", options: ["< 18 mois", "18-36 mois", "3-6 ans", "6-12 ans", "12 ans et +"] },
    { key: "has_small_parts", label: "Contient des petites pièces (risque étouffement)", type: "boolean" },
    { key: "has_battery", label: "Nécessite des piles ou batterie", type: "boolean" },
    { key: "lab_test_done", label: "Tests EN 71 réalisés en laboratoire accrédité", type: "boolean" },
  ],
  electronics: [
    { key: "voltage_nominal", label: "Tension nominale", type: "select", options: ["5V (USB)", "12V", "24V", "230V (secteur)", "Pile / batterie autonome"] },
    { key: "has_wireless", label: "Contient une communication sans fil (WiFi / Bluetooth / Zigbee)", type: "boolean" },
    { key: "lab_test_done", label: "Tests CEM / LVD réalisés en laboratoire accrédité", type: "boolean" },
    { key: "doc_available", label: "Une déclaration de conformité UE (DoC) est disponible", type: "boolean" },
  ],
  cosmetic: [
    { key: "for_children", label: "Destiné aux enfants de moins de 3 ans", type: "boolean" },
    { key: "has_cpsr", label: "Un rapport de sécurité cosmétique (CPSR) est disponible", type: "boolean" },
    { key: "cpnp_notified", label: "La notification CPNP a été effectuée", type: "boolean" },
    { key: "has_inci", label: "La liste INCI figure sur l'emballage", type: "boolean" },
  ],
  textile: [
    { key: "target_age", label: "Public cible", type: "select", options: ["Nourrissons (< 3 ans)", "Enfants 3-14 ans", "Adultes", "Tous publics"] },
    { key: "has_drawstrings", label: "Présence de cordes de serrage (capuche, cou, bas)", type: "boolean" },
    { key: "azo_dyes_free", label: "Absence de colorants azoïques cancérigènes confirmée", type: "boolean" },
    { key: "composition_label", label: "Étiquette composition fibres présente (EU 1007/2011)", type: "boolean" },
  ],
  puericulture: [
    { key: "age_range", label: "Tranche d'âge", type: "select", options: ["0-6 mois", "6-12 mois", "0-18 mois", "0-3 ans", "1-3 ans"] },
    { key: "stability_test", label: "Test de stabilité réalisé en laboratoire accrédité", type: "boolean" },
    { key: "entrapment_risk", label: "Risque de piégeage (tête / cou / doigts) évalué", type: "boolean" },
    { key: "ce_marking", label: "Marquage CE présent sur le produit", type: "boolean" },
  ],
  decoration: [
    { key: "for_children_room", label: "Destiné à une chambre d'enfant (< 14 ans)", type: "boolean" },
    { key: "has_sharp_edges", label: "Présence de bords tranchants potentiels", type: "boolean" },
    { key: "reach_svhc", label: "Absence de substances SVHC REACH > 0.1% confirmée", type: "boolean" },
    { key: "batch_traceability", label: "N° de lot présent sur le produit ou emballage", type: "boolean" },
  ],
  food_contact: [
    { key: "material_main", label: "Matériau principal", type: "select", options: ["Plastique", "Inox", "Verre", "Céramique", "Bois / bambou", "Silicone", "Autre"] },
    { key: "migration_test_done", label: "Test de migration réalisé (EU 1935/2004)", type: "boolean" },
    { key: "bpa_free", label: "Sans bisphénol A (BPA) — si plastique ou résine", type: "boolean" },
    { key: "symbol_present", label: "Symbole verre-et-fourchette présent sur le produit", type: "boolean" },
  ],
  furniture: [
    { key: "for_children", label: "Meuble destiné aux enfants (< 14 ans)", type: "boolean" },
    { key: "stability_test", label: "Test de stabilité réalisé", type: "boolean" },
    { key: "formaldehyde_class", label: "Classe d'émission formaldéhyde (panneaux bois)", type: "select", options: ["E0 (≤ 0.030 ppm)", "E1 (≤ 0.100 ppm)", "Non mesuré", "Sans panneau bois"] },
    { key: "assembly_instructions", label: "Notice de montage incluse", type: "boolean" },
  ],
  sport: [
    { key: "is_ppe", label: "L'article est un Équipement de Protection Individuelle (EPI)", type: "boolean" },
    { key: "lab_test_done", label: "Tests en laboratoire accrédité réalisés", type: "boolean" },
    { key: "ce_marking", label: "Marquage CE présent", type: "boolean" },
    { key: "has_user_manual", label: "Notice d'utilisation incluse", type: "boolean" },
  ],
  other: [
    { key: "for_children", label: "Le produit peut être utilisé par des enfants", type: "boolean" },
    { key: "lab_test_done", label: "Des tests de sécurité ont été réalisés", type: "boolean" },
    { key: "has_declaration", label: "Une déclaration de conformité UE est disponible", type: "boolean" },
    { key: "batch_traceability", label: "N° de lot / traçabilité présent sur le produit", type: "boolean" },
  ],
}

const DOCS_OPTIONS = [
  { value: "technical", label: "Dossier technique produit" },
  { value: "risk", label: "Analyse de risques formalisée" },
  { value: "declaration", label: "Déclaration de conformité UE" },
  { value: "ce", label: "Marquage CE (si requis)" },
  { value: "tests", label: "Rapport de tests laboratoire" },
  { value: "instructions", label: "Notice / instructions d'utilisation" },
  { value: "labels", label: "Étiquettes réglementaires conformes" },
  { value: "responsible", label: "Personne responsable EU désignée" },
]

type Phase = "import" | "product" | "safety" | "docs" | "email" | "result" | "already_used"

export default function AuditGratuitPage() {
  const [phase, setPhase] = useState<Phase>("import")

  // Import state
  const [importUrl, setImportUrl] = useState("")
  const [importing, setImporting] = useState(false)
  const [importError, setImportError] = useState("")

  // Product
  const [productName, setProductName] = useState("")
  const [productUrl, setProductUrl] = useState("")
  const [category, setCategory] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [country, setCountry] = useState("")

  // Safety answers (boolean or string)
  const [safetyAnswers, setSafetyAnswers] = useState<Record<string, boolean | string>>({})

  // Docs
  const [existingDocs, setExistingDocs] = useState<string[]>([])

  // Email / result
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ score: number; missing: string[]; category: string } | null>(null)
  const [previousAudit, setPreviousAudit] = useState<{ product_name: string; score: number; created_at: string } | null>(null)

  async function handleImport(e: React.FormEvent) {
    e.preventDefault()
    if (!importUrl.trim()) { setPhase("product"); return }
    setImporting(true)
    setImportError("")
    try {
      const res = await fetch("/api/audit/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: importUrl }),
      })
      const data = await res.json()
      if (!res.ok) { setImportError(data.error ?? "Erreur d'import"); setImporting(false); return }
      if (data.name) setProductName(data.name)
      setProductUrl(importUrl)
    } catch {
      setImportError("Impossible d'accéder à cette URL")
    }
    setImporting(false)
    setPhase("product")
  }

  function toggleDoc(val: string) {
    setExistingDocs(prev => prev.includes(val) ? prev.filter(d => d !== val) : [...prev, val])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const res = await fetch("/api/audit/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        product_name: productName,
        product_url: productUrl || null,
        category,
        answers: { ...safetyAnswers, existing_docs: existingDocs, manufacturer, country },
      }),
    })
    const data = await res.json()
    setSubmitting(false)
    if (data.already_used) {
      setPreviousAudit(data.previous)
      setPhase("already_used")
    } else {
      setResult(data)
      setPhase("result")
    }
  }

  const scoreColor = (s: number) => s >= 75 ? "text-emerald-600" : s >= 45 ? "text-amber-500" : "text-red-600"
  const scoreBg = (s: number) => s >= 75 ? "bg-emerald-50 border-emerald-200" : s >= 45 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"
  const scoreLabel = (s: number) => s >= 75 ? "Bonne conformité" : s >= 45 ? "Conformité partielle — risques réels" : "Non conforme — risque élevé"

  const catQuestions = CATEGORY_QUESTIONS[category] ?? CATEGORY_QUESTIONS.other

  // ── HEADER ──
  function Header({ step, total }: { step: number; total: number }) {
    return (
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
            <span className="font-bold text-gray-900 text-sm">Conforva</span>
          </Link>
          <span className="text-xs text-gray-400">Étape {step} / {total}</span>
        </div>
        <div className="h-0.5 bg-gray-100">
          <div className="h-0.5 bg-blue-600 transition-all duration-300" style={{ width: `${(step / total) * 100}%` }} />
        </div>
      </header>
    )
  }

  // ── PHASE: IMPORT ──
  if (phase === "import") return (
    <div className="min-h-screen bg-[#F9F8F5]">
      <Header step={1} total={4} />
      <main className="max-w-lg mx-auto px-5 py-12 space-y-6">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Audit GPSR gratuit — 1 produit complet</p>
          <h1 className="text-2xl font-bold text-gray-900">Analysons votre produit</h1>
          <p className="text-sm text-gray-500 mt-1">Collez l'URL de votre produit pour pré-remplir automatiquement, ou renseignez manuellement.</p>
        </div>

        <form onSubmit={handleImport} className="space-y-3">
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="url"
              value={importUrl}
              onChange={e => setImportUrl(e.target.value)}
              placeholder="https://votre-boutique.com/produit ou Amazon / Shopify..."
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {importError && <p className="text-xs text-red-500">{importError}</p>}
          <Button type="submit" disabled={importing} className="w-full gap-2">
            {importing ? <><Loader2 className="h-4 w-4 animate-spin" /> Import en cours...</> : <>Importer depuis l'URL <ArrowRight className="h-4 w-4" /></>}
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">ou</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <Button variant="outline" onClick={() => setPhase("product")} className="w-full gap-2">
          <Package className="h-4 w-4" /> Renseigner manuellement
        </Button>

        <p className="text-xs text-gray-400 text-center">Gratuit · Sans inscription · Limité à 1 produit par email</p>
      </main>
    </div>
  )

  // ── PHASE: PRODUCT ──
  if (phase === "product") {
    const canNext = productName.trim().length > 1 && category
    return (
      <div className="min-h-screen bg-[#F9F8F5]">
        <Header step={2} total={4} />
        <main className="max-w-lg mx-auto px-5 py-10 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Votre produit</h1>
            <p className="text-sm text-gray-500 mt-1">Informations de base sur le produit à analyser</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Nom du produit <span className="text-red-500">*</span></label>
              <input
                value={productName}
                onChange={e => setProductName(e.target.value)}
                placeholder="ex: Bougie soja vanille 200g"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Catégorie de produit <span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full appearance-none px-4 py-3 pr-9 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">— Choisir une catégorie —</option>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Fabricant</label>
                <input
                  value={manufacturer}
                  onChange={e => setManufacturer(e.target.value)}
                  placeholder="Nom du fabricant"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Pays de fabrication</label>
                <input
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder="ex: Chine, France..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setPhase("import")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button onClick={() => setPhase("safety")} disabled={!canNext} className="flex-1 gap-2">
              Continuer <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // ── PHASE: SAFETY ──
  if (phase === "safety") return (
    <div className="min-h-screen bg-[#F9F8F5]">
      <Header step={3} total={4} />
      <main className="max-w-lg mx-auto px-5 py-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profil de sécurité</h1>
          <p className="text-sm text-gray-500 mt-1">Questions spécifiques à votre catégorie — {CATEGORIES.find(c => c.value === category)?.label}</p>
        </div>

        <div className="space-y-4">
          {catQuestions.map(q => (
            <div key={q.key} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              <p className="text-sm font-medium text-gray-800">{q.label}</p>

              {q.type === "boolean" && (
                <div className="flex gap-3">
                  {[
                    { val: true, label: "Oui" },
                    { val: false, label: "Non" },
                  ].map(({ val, label }) => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() => setSafetyAnswers(a => ({ ...a, [q.key]: val }))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                        safetyAnswers[q.key] === val
                          ? val ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-red-400 bg-red-50 text-red-700"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              {q.type === "select" && q.options && (
                <div className="relative">
                  <select
                    value={(safetyAnswers[q.key] as string) ?? ""}
                    onChange={e => setSafetyAnswers(a => ({ ...a, [q.key]: e.target.value }))}
                    className="w-full appearance-none px-3 py-2 pr-8 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">— Sélectionner —</option>
                    {q.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setPhase("product")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button onClick={() => setPhase("docs")} className="flex-1 gap-2">
            Continuer <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )

  // ── PHASE: DOCS ──
  if (phase === "docs") return (
    <div className="min-h-screen bg-[#F9F8F5]">
      <Header step={4} total={4} />
      <main className="max-w-lg mx-auto px-5 py-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents existants</h1>
          <p className="text-sm text-gray-500 mt-1">Cochez uniquement ce que vous possédez réellement pour ce produit</p>
        </div>

        <div className="space-y-2">
          {DOCS_OPTIONS.map(opt => {
            const checked = existingDocs.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleDoc(opt.value)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-colors ${
                  checked ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  checked ? "border-blue-500 bg-blue-500" : "border-gray-300"
                }`}>
                  {checked && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                </div>
                <span className={`text-sm font-medium ${checked ? "text-blue-900" : "text-gray-700"}`}>{opt.label}</span>
              </button>
            )
          })}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-700">Aucun document à cocher ? C'est normal pour les nouveaux vendeurs — Conforva les génère en quelques minutes.</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setPhase("safety")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button onClick={() => setPhase("email")} className="flex-1 gap-2">
            Voir mon analyse <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )

  // ── PHASE: EMAIL GATE ──
  if (phase === "email") return (
    <div className="min-h-screen bg-[#F9F8F5] flex items-center justify-center px-5">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-sm w-full text-center space-y-5">
        <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
          <Shield className="h-7 w-7 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Votre analyse est prête</h2>
          <p className="text-sm text-gray-500 mt-1">Entrez votre email pour accéder au rapport de conformité de <strong>{productName}</strong></p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" className="w-full gap-2" disabled={submitting}>
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyse en cours...</> : <>Voir mon rapport GPSR <ArrowRight className="h-4 w-4" /></>}
          </Button>
        </form>
        <p className="text-xs text-gray-400">1 analyse gratuite par email · Pas de spam · Résultats immédiats</p>
      </div>
    </div>
  )

  // ── PHASE: ALREADY USED ──
  if (phase === "already_used" && previousAudit) return (
    <div className="min-h-screen bg-[#F9F8F5]">
      <header className="border-b border-gray-100 bg-white/95">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
            <span className="font-bold text-gray-900 text-sm">Conforva</span>
          </Link>
        </div>
      </header>
      <main className="max-w-lg mx-auto px-5 py-16 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Audit déjà utilisé</h2>
            <p className="text-sm text-gray-500 mt-1">
              Vous avez déjà réalisé un audit gratuit pour <strong>{previousAudit.product_name}</strong> avec un score de <strong>{previousAudit.score}/100</strong>.
            </p>
          </div>
          <div className={`rounded-xl border-2 py-3 px-6 inline-block ${scoreBg(previousAudit.score)}`}>
            <span className={`text-3xl font-black ${scoreColor(previousAudit.score)}`}>{previousAudit.score}/100</span>
          </div>
          <p className="text-sm text-gray-600">Pour analyser d'autres produits et générer vos dossiers GPSR complets, créez un compte Conforva.</p>
        </div>
        <div className="bg-blue-600 rounded-2xl p-6 text-white text-center space-y-4">
          <p className="font-bold text-lg">Passez au plan complet</p>
          <p className="text-blue-200 text-sm">Produits illimités · Dossiers complets · Déclarations de conformité · Étiquettes</p>
          <Link href="/auth/login">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold gap-2 w-full">
              Créer mon compte Conforva <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="text-blue-300 text-xs">Starter dès 29€/mois · Sans engagement · 1 produit gratuit inclus</p>
        </div>
      </main>
    </div>
  )

  // ── PHASE: RESULT ──
  if (phase === "result" && result) {
    const { score, missing } = result
    return (
      <div className="min-h-screen bg-[#F9F8F5]">
        <header className="border-b border-gray-100 bg-white/95">
          <div className="max-w-2xl mx-auto px-5 h-14 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
              <span className="font-bold text-gray-900 text-sm">Conforva</span>
            </Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-5 py-10 space-y-5">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-0.5">{productName}</p>
            <h1 className="text-2xl font-bold text-gray-900">Votre rapport de conformité GPSR</h1>
          </div>

          {/* Score */}
          <div className={`rounded-2xl border-2 p-8 text-center ${scoreBg(score)}`}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Score de conformité GPSR</p>
            <p className={`text-7xl font-black tabular-nums ${scoreColor(score)}`}>{score}<span className="text-3xl">/100</span></p>
            <p className={`text-sm font-semibold mt-2 ${scoreColor(score)}`}>{scoreLabel(score)}</p>
          </div>

          {/* Missing docs */}
          {missing.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                {missing.length} document{missing.length > 1 ? "s" : ""} manquant{missing.length > 1 ? "s" : ""}
              </p>
              <div className="space-y-2">
                {missing.map(m => (
                  <div key={m} className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-800">{m}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What Conforva generates */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="font-semibold text-gray-900 mb-4">Ce que Conforva génère automatiquement</p>
            <div className="space-y-2">
              {[
                "Dossier technique complet (structuré selon GPSR 2023/988)",
                "Analyse de risques ISO 12100 personnalisée",
                "Déclaration de conformité UE prête à signer",
                "Étiquettes réglementaires aux formats EU / US / UK",
                "Désignation de la personne responsable EU",
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white text-center space-y-4">
            <Shield className="h-8 w-8 mx-auto text-blue-200" />
            <div>
              <p className="font-bold text-lg">
                {missing.length === 0
                  ? "Gardez votre conformité à jour automatiquement"
                  : `Générez vos ${missing.length} document${missing.length > 1 ? "s" : ""} manquant${missing.length > 1 ? "s" : ""} en quelques minutes`}
              </p>
              <p className="text-blue-200 text-sm mt-1">Dossier technique · Analyse de risques · Étiquettes · Personne responsable EU</p>
            </div>
            <Link href="/auth/login">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold gap-2 w-full">
                Mettre mon entreprise en conformité <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-blue-300 text-xs">1 produit gratuit à l'inscription · Starter dès 29€/mois · Sans engagement</p>
          </div>

          <button
            onClick={() => { setPhase("import"); setProductName(""); setCategory(""); setSafetyAnswers({}); setExistingDocs([]); setEmail(""); setResult(null); setImportUrl("") }}
            className="w-full text-xs text-gray-400 hover:text-gray-600 text-center py-2"
          >
            Analyser un autre produit →
          </button>
        </main>
      </div>
    )
  }

  return null
}
