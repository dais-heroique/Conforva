"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ConforvaLogo } from "@/components/logo"
import { Globe, Loader2, Check, Zap } from "lucide-react"

const PLATFORMS = [
  { value: "shopify", label: "Shopify", emoji: "🛍️" },
  { value: "amazon", label: "Amazon", emoji: "📦" },
  { value: "woocommerce", label: "WooCommerce", emoji: "🛒" },
  { value: "prestashop", label: "PrestaShop", emoji: "🏪" },
  { value: "custom", label: "Autre", emoji: "🌐" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [orgName, setOrgName] = useState("")
  const [competitorName, setCompetitorName] = useState("")
  const [competitorDomain, setCompetitorDomain] = useState("")
  const [platform, setPlatform] = useState("shopify")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFinish() {
    setLoading(true)
    setError(null)

    try {
      if (orgName) {
        await fetch("/api/org/update-name", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: orgName }),
        })
      }

      if (competitorDomain) {
        await fetch("/api/competitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: competitorName || competitorDomain,
            domain: competitorDomain,
            platform,
            scrapeFrequency: "daily",
          }),
        })
      }

      router.push("/dashboard")
    } catch {
      setError("Une erreur est survenue")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#060D09] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <ConforvaLogo size={32} />
            <span className="font-black text-white text-xl tracking-tight" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
          </div>
          <h1 className="text-2xl font-black text-white">Configuration initiale</h1>
          <p className="text-gray-400 text-sm mt-2">En 2 minutes, votre veille est active</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex-1">
              <div className={`h-1 rounded-full transition-colors ${s <= step ? "bg-[#00E676]" : "bg-white/10"}`} />
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
              <h2 className="font-bold text-white mb-1">Votre boutique</h2>
              <p className="text-xs text-gray-500 mb-4">Comment s'appelle votre boutique ?</p>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Ma Super Boutique"
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00E676]/50 transition-colors"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-[#00E676] hover:bg-[#00c964] text-[#060D09] font-bold text-sm rounded-xl transition-colors"
            >
              Continuer →
            </button>
            <button
              onClick={() => setStep(2)}
              className="w-full text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Passer cette étape
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="bg-white/5 border border-white/8 rounded-2xl p-5 space-y-4">
              <div>
                <h2 className="font-bold text-white mb-1">Premier concurrent à surveiller</h2>
                <p className="text-xs text-gray-500 mb-4">Vous pourrez en ajouter d'autres depuis le tableau de bord.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">URL du site concurrent</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={competitorDomain}
                    onChange={(e) => setCompetitorDomain(e.target.value)}
                    placeholder="concurrent.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00E676]/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Nom</label>
                <input
                  type="text"
                  value={competitorName}
                  onChange={(e) => setCompetitorName(e.target.value)}
                  placeholder="Zalando, Amazon, Fnac…"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00E676]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Plateforme</label>
                <div className="grid grid-cols-3 gap-2">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPlatform(p.value)}
                      className={`py-2 px-2 rounded-xl text-xs font-medium transition-colors text-center ${
                        platform === p.value
                          ? "bg-[#00E676]/20 border border-[#00E676]/40 text-[#00E676]"
                          : "bg-white/5 border border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      {p.emoji} {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-[#00E676]/8 border border-[#00E676]/20 rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-[#00E676] mt-0.5 flex-shrink-0" />
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-[#00E676]">Ce qui va se passer</p>
                  {[
                    "Premier scan dans les 24h",
                    "Rapport IA le lendemain matin",
                    "Alertes email dès qu'un prix bouge",
                  ].map((item) => (
                    <p key={item} className="text-xs text-gray-300 flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-[#00E676] flex-shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-sm rounded-xl transition-colors"
              >
                ← Retour
              </button>
              <button
                onClick={handleFinish}
                disabled={loading}
                className="flex-1 py-3 bg-[#00E676] hover:bg-[#00c964] text-[#060D09] font-bold text-sm rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {loading ? "Finalisation…" : "Lancer la veille"}
              </button>
            </div>

            <button
              onClick={handleFinish}
              disabled={loading}
              className="w-full text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Passer — configurer plus tard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
