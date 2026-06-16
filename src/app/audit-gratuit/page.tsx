"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, ArrowLeft, Shield, Loader2, Link2, Package,
  FileText, AlertTriangle, CheckCircle2, Download, X, ChevronDown,
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

type Phase = "input" | "email" | "generating" | "result" | "already_used"

interface AiResult {
  product_info: {
    name: string; category: string; intended_use: string; target_users: string
    manufacturer: string; country_of_origin: string; model_reference: string
  }
  score: number
  technical_file: { sections: Array<{ title: string; content: string }> }
  risk_assessment: {
    methodology: string
    hazards: Array<{
      id: string; category: string; description: string
      probability: string; severity: string; risk_level: string; mitigation: string
    }>
    conclusion: string
  }
  declaration: {
    product_name: string; model: string; directives: string[]; standards: string[]
    statement: string; place: string; responsible_person: string
  }
  missing_actions: string[]
}

function scoreColor(s: number) { return s >= 75 ? "text-emerald-600" : s >= 45 ? "text-amber-500" : "text-red-600" }
function scoreBg(s: number) { return s >= 75 ? "bg-emerald-50 border-emerald-200" : s >= 45 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200" }
function scoreLabel(s: number) { return s >= 75 ? "Bonne conformité estimée" : s >= 45 ? "Conformité partielle — actions requises" : "Non conforme — risque réglementaire élevé" }
function riskBadge(level: string) {
  if (level === "Inacceptable") return "bg-red-100 text-red-700 border border-red-200"
  if (level === "Tolérable") return "bg-amber-100 text-amber-700 border border-amber-200"
  return "bg-emerald-100 text-emerald-700 border border-emerald-200"
}

function Header({ step, total }: { step: number; total: number }) {
  return (
    <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
          <span className="font-bold text-gray-900 text-sm">Conforva</span>
        </Link>
        {total > 0 && <span className="text-xs text-gray-400">Étape {step} / {total}</span>}
      </div>
      {total > 0 && (
        <div className="h-0.5 bg-gray-100">
          <div className="h-0.5 bg-blue-600 transition-all duration-500" style={{ width: `${(step / total) * 100}%` }} />
        </div>
      )}
    </header>
  )
}

export default function AuditGratuitPage() {
  const [phase, setPhase] = useState<Phase>("input")

  // Input
  const [url, setUrl] = useState("")
  const [scraped, setScraped] = useState(false)
  const [scraping, setScraping] = useState(false)
  const [scrapeError, setScrapeError] = useState("")
  const [productName, setProductName] = useState("")
  const [supplierName, setSupplierName] = useState("")
  const [category, setCategory] = useState("")

  // Email
  const [email, setEmail] = useState("")

  // Result
  const [aiResult, setAiResult] = useState<AiResult | null>(null)
  const [score, setScore] = useState(0)
  const [previousAudit, setPreviousAudit] = useState<{
    product_name: string; score: number; created_at: string; docs: AiResult | null
  } | null>(null)

  // UI
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [activeSection, setActiveSection] = useState<number | null>(0)

  async function handleScrape() {
    if (!url.trim()) return
    setScraping(true)
    setScrapeError("")
    try {
      const res = await fetch("/api/audit/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setScrapeError(data.error ?? "Erreur d'import"); return }
      if (data.name) setProductName(data.name)
      setScraped(true)
    } catch {
      setScrapeError("Impossible d'accéder à cette URL")
    } finally {
      setScraping(false)
    }
  }

  const hasUrl = url.trim().length > 4
  const canSubmit = hasUrl
    ? (scraped || productName.trim().length > 1) && supplierName.trim().length > 0
    : productName.trim().length > 1 && category.length > 0

  async function handleGenerate() {
    setPhase("generating")
    const res = await fetch("/api/audit/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        product_url: hasUrl ? url.trim() : null,
        product_name: productName || undefined,
        supplier_name: supplierName || undefined,
        category: category || undefined,
      }),
    })
    const data = await res.json()
    if (data.already_used) {
      setPreviousAudit(data.previous)
      setPhase("already_used")
    } else if (data.ok) {
      setAiResult(data.result)
      setScore(data.score)
      setPhase("result")
    } else {
      // fallback: go back to email with error
      setPhase("email")
    }
  }

  function reset() {
    setPhase("input")
    setUrl(""); setScraped(false); setScrapeError("")
    setProductName(""); setSupplierName(""); setCategory("")
    setEmail(""); setAiResult(null); setPreviousAudit(null)
  }

  // ── PHASE: INPUT ──
  if (phase === "input") return (
    <div className="min-h-screen bg-[#F9F8F5]">
      <Header step={1} total={2} />
      <main className="max-w-lg mx-auto px-5 py-12 space-y-7">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Audit GPSR gratuit · IA · 1 produit</p>
          <h1 className="text-2xl font-bold text-gray-900">Analysez votre conformité GPSR</h1>
          <p className="text-sm text-gray-500 mt-1">L'IA génère votre dossier technique, analyse de risques et déclaration de conformité UE.</p>
        </div>

        {/* URL import */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <Link2 className="h-4 w-4 text-blue-500" />
            Importer depuis une URL
            <span className="text-xs font-normal text-gray-400 ml-1">optionnel</span>
          </p>
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={e => { setUrl(e.target.value); setScraped(false); setScrapeError("") }}
              placeholder="https://votre-boutique.com/produit..."
              className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={e => e.key === "Enter" && handleScrape()}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleScrape}
              disabled={!hasUrl || scraping}
              className="shrink-0"
            >
              {scraping ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Importer"}
            </Button>
          </div>
          {scrapeError && <p className="text-xs text-red-500">{scrapeError}</p>}
          {scraped && productName && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <p className="text-xs text-emerald-800 font-medium truncate">{productName}</p>
            </div>
          )}
        </div>

        {/* Manual / supplementary fields */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-500" />
            {hasUrl && scraped ? "Compléter les informations" : "Informations produit"}
          </p>

          {/* Product name — always show if no URL or if URL didn't scrape a name */}
          {(!hasUrl || !scraped || !productName) && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Nom du produit <span className="text-red-500">*</span></label>
              <input
                value={productName}
                onChange={e => setProductName(e.target.value)}
                placeholder="ex: Bougie soja vanille 200g"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Category — only if no URL */}
          {!hasUrl && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Catégorie <span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">— Choisir une catégorie —</option>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Supplier name — always */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Nom du fournisseur / fabricant <span className="text-red-500">*</span></label>
            <input
              value={supplierName}
              onChange={e => setSupplierName(e.target.value)}
              placeholder="ex: Shenzhen TechCo Ltd, Alibaba ref…"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <Button
          onClick={() => setPhase("email")}
          disabled={!canSubmit}
          className="w-full gap-2 h-12 text-base"
        >
          Générer mon analyse IA <ArrowRight className="h-5 w-5" />
        </Button>

        <p className="text-xs text-gray-400 text-center">Gratuit · Sans carte bancaire · 1 analyse par email</p>
      </main>
    </div>
  )

  // ── PHASE: EMAIL GATE ──
  if (phase === "email") return (
    <div className="min-h-screen bg-[#F9F8F5] flex items-center justify-center px-5">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-sm w-full space-y-5">
        <div className="text-center space-y-1">
          <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
            <Shield className="h-7 w-7 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Presque prêt !</h2>
          <p className="text-sm text-gray-500">Entrez votre email pour recevoir votre rapport GPSR complet généré par l'IA</p>
        </div>

        <div className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={e => e.key === "Enter" && email.includes("@") && handleGenerate()}
          />
          <Button
            onClick={handleGenerate}
            className="w-full gap-2 h-11"
            disabled={!email.includes("@") || !email.includes(".")}
          >
            Lancer l'analyse IA <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <button
          onClick={() => setPhase("input")}
          className="w-full text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" /> Retour
        </button>

        <p className="text-xs text-gray-400 text-center">1 analyse gratuite par email · Pas de spam</p>
      </div>
    </div>
  )

  // ── PHASE: GENERATING ──
  if (phase === "generating") return (
    <div className="min-h-screen bg-[#F9F8F5] flex items-center justify-center px-5">
      <div className="text-center space-y-6 max-w-sm">
        <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto animate-pulse">
          <Shield className="h-10 w-10 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Génération en cours…</h2>
          <p className="text-sm text-gray-500">L'IA analyse votre produit et rédige votre dossier de conformité GPSR complet.</p>
        </div>
        <div className="space-y-2 text-left bg-white rounded-2xl border border-gray-200 p-5">
          {[
            "Analyse réglementaire GPSR 2023/988",
            "Rédaction du dossier technique (8 sections)",
            "Évaluation des risques ISO 12100",
            "Déclaration de conformité UE",
          ].map((item, i) => (
            <div key={item} className="flex items-center gap-2.5">
              <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin shrink-0" style={{ animationDelay: `${i * 0.2}s` }} />
              <p className="text-xs text-gray-600">{item}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400">Environ 15–30 secondes…</p>
      </div>
    </div>
  )

  // ── PHASE: ALREADY USED ──
  if (phase === "already_used" && previousAudit) {
    const prevDocs = previousAudit.docs
    const prevScore = previousAudit.score
    return (
      <div className="min-h-screen bg-[#F9F8F5]">
        <Header step={0} total={0} />
        <main className="max-w-2xl mx-auto px-5 py-10 space-y-5">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Analyse déjà générée</p>
              <p className="text-sm text-amber-700">Votre audit gratuit a déjà été utilisé pour <strong>{previousAudit.product_name}</strong>. Voici votre rapport précédent.</p>
            </div>
          </div>

          {prevDocs ? (
            <ResultDocs result={prevDocs} score={prevScore} activeSection={activeSection} setActiveSection={setActiveSection} onDownload={() => setShowPdfModal(true)} />
          ) : (
            <div className={`rounded-2xl border-2 p-8 text-center ${scoreBg(prevScore)}`}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Score de conformité</p>
              <p className={`text-7xl font-black tabular-nums ${scoreColor(prevScore)}`}>{prevScore}<span className="text-3xl">/100</span></p>
            </div>
          )}

          <UpgradeBanner />
        </main>
        {showPdfModal && <PdfModal onClose={() => setShowPdfModal(false)} />}
      </div>
    )
  }

  // ── PHASE: RESULT ──
  if (phase === "result" && aiResult) return (
    <div className="min-h-screen bg-[#F9F8F5]">
      <Header step={0} total={0} />
      <main className="max-w-2xl mx-auto px-5 py-10 space-y-5">
        <div>
          <p className="text-xs font-semibold text-gray-400 mb-0.5">{aiResult.product_info?.name || productName}</p>
          <h1 className="text-2xl font-bold text-gray-900">Votre dossier de conformité GPSR</h1>
          <p className="text-sm text-gray-500 mt-1">Généré par IA · Règlement UE 2023/988</p>
        </div>

        <ResultDocs result={aiResult} score={score} activeSection={activeSection} setActiveSection={setActiveSection} onDownload={() => setShowPdfModal(true)} />

        <UpgradeBanner />

        <button onClick={reset} className="w-full text-xs text-gray-400 hover:text-gray-600 text-center py-2">
          Analyser un autre produit →
        </button>
      </main>
      {showPdfModal && <PdfModal onClose={() => setShowPdfModal(false)} />}
    </div>
  )

  return null
}

// ── RESULT DOCUMENTS COMPONENT ──
function ResultDocs({
  result, score, activeSection, setActiveSection, onDownload
}: {
  result: AiResult; score: number
  activeSection: number | null; setActiveSection: (i: number | null) => void
  onDownload: () => void
}) {
  const info = result.product_info
  const hazards = result.risk_assessment?.hazards ?? []
  const sections = result.technical_file?.sections ?? []
  const declaration = result.declaration
  const missing = result.missing_actions ?? []

  return (
    <div className="space-y-4">
      {/* Score card */}
      <div className={`rounded-2xl border-2 p-6 flex items-center gap-6 ${scoreBg(score)}`}>
        <div className="text-center shrink-0">
          <p className={`text-6xl font-black tabular-nums ${scoreColor(score)}`}>{score}<span className="text-2xl">/100</span></p>
        </div>
        <div>
          <p className={`font-bold text-base ${scoreColor(score)}`}>{scoreLabel(score)}</p>
          <p className="text-xs text-gray-500 mt-1">Catégorie : {info?.category}</p>
          <p className="text-xs text-gray-500">Fabricant : {info?.manufacturer} · {info?.country_of_origin}</p>
        </div>
      </div>

      {/* Product info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <p className="font-semibold text-gray-900 text-sm">Identification du produit</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
          {[
            ["Nom", info?.name],
            ["Référence / modèle", info?.model_reference],
            ["Utilisateurs cibles", info?.target_users],
            ["Usage prévu", info?.intended_use],
          ].map(([k, v]) => v ? (
            <div key={k} className="space-y-0.5">
              <p className="text-gray-400 uppercase tracking-wide text-[10px]">{k}</p>
              <p className="text-gray-800">{v}</p>
            </div>
          ) : null)}
        </div>
      </div>

      {/* Technical file */}
      {sections.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="font-semibold text-gray-900 text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              Dossier technique — {sections.length} sections
            </p>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Règlement GPSR 2023/988</span>
          </div>
          <div className="divide-y divide-gray-100">
            {sections.map((sec, i) => (
              <div key={i}>
                <button
                  onClick={() => setActiveSection(activeSection === i ? null : i)}
                  className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-800">{sec.title}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${activeSection === i ? "rotate-180" : ""}`} />
                </button>
                {activeSection === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{sec.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risk assessment */}
      {hazards.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="font-semibold text-gray-900 text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Analyse de risques · {result.risk_assessment.methodology}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-2.5 text-left">Danger</th>
                  <th className="px-4 py-2.5 text-left">Description</th>
                  <th className="px-4 py-2.5 text-left">Probabilité</th>
                  <th className="px-4 py-2.5 text-left">Gravité</th>
                  <th className="px-4 py-2.5 text-left">Niveau</th>
                  <th className="px-4 py-2.5 text-left">Mesure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hazards.map(h => (
                  <tr key={h.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">{h.id} — {h.category}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-[180px]">{h.description}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{h.probability}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{h.severity}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${riskBadge(h.risk_level)}`}>{h.risk_level}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-[200px]">{h.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {result.risk_assessment.conclusion && (
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-600"><span className="font-medium">Conclusion :</span> {result.risk_assessment.conclusion}</p>
            </div>
          )}
        </div>
      )}

      {/* EU Declaration of Conformity */}
      {declaration && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <p className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Déclaration de conformité UE (extrait)
          </p>
          <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50 text-xs text-gray-700 leading-relaxed">
            <p><strong>Produit :</strong> {declaration.product_name} {declaration.model && `— Modèle ${declaration.model}`}</p>
            <p className="italic text-gray-600">{declaration.statement}</p>
            {declaration.directives?.length > 0 && (
              <div>
                <p className="font-medium mb-1">Directives applicables :</p>
                <ul className="list-disc list-inside space-y-0.5 text-gray-600">
                  {declaration.directives.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>
            )}
            {declaration.standards?.length > 0 && (
              <div>
                <p className="font-medium mb-1">Normes harmonisées :</p>
                <ul className="list-disc list-inside space-y-0.5 text-gray-600">
                  {declaration.standards.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
            )}
            <div className="pt-2 border-t border-gray-200 flex justify-between text-[10px] text-gray-400">
              <span>{declaration.place}</span>
              <span>{declaration.responsible_person}</span>
            </div>
          </div>
        </div>
      )}

      {/* Missing actions */}
      {missing.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <p className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            {missing.length} actions prioritaires identifiées
          </p>
          <ol className="space-y-2">
            {missing.map((action, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-gray-700">{action}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Download button */}
      <button
        onClick={onDownload}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium"
      >
        <Download className="h-4 w-4" />
        Télécharger le dossier complet en PDF
      </button>
    </div>
  )
}

// ── UPGRADE BANNER ──
function UpgradeBanner() {
  return (
    <div className="bg-blue-600 rounded-2xl p-6 text-white text-center space-y-4">
      <Shield className="h-8 w-8 mx-auto text-blue-200" />
      <div>
        <p className="font-bold text-lg">Mettre ce produit en conformité complète</p>
        <p className="text-blue-200 text-sm mt-1">Modifiez les documents · Ajoutez vos infos · Signez électroniquement · Gérez tous vos produits</p>
      </div>
      <Link href="/auth/login">
        <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold gap-2 w-full">
          Créer mon compte Conforva <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
      <p className="text-blue-300 text-xs">1 produit gratuit à l'inscription · Starter dès 29€/mois · Sans engagement</p>
    </div>
  )
}

// ── PDF MODAL ──
function PdfModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm space-y-5 p-6">
        <div className="flex items-start justify-between">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Download className="h-6 w-6 text-blue-600" />
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-900">Téléchargez le PDF complet</h3>
          <p className="text-sm text-gray-500">
            Créez un compte gratuit pour télécharger votre dossier en PDF, modifier les documents et gérer tous vos produits.
          </p>
        </div>
        <div className="space-y-2 text-xs text-gray-600">
          {[
            "PDF sans filigrane prêt à soumettre",
            "Modification complète des documents",
            "Déclaration de conformité signée",
            "1 produit gratuit inclus à l'inscription",
          ].map(item => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <Link href="/auth/login" className="block">
          <Button className="w-full gap-2">
            Créer mon compte gratuit <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <p className="text-xs text-gray-400 text-center">Sans carte bancaire · Starter dès 29€/mois si besoin</p>
      </div>
    </div>
  )
}
