"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Globe, Loader2, Eye, Tag, Clock } from "lucide-react"

const PLATFORMS = [
  { value: "shopify", label: "Shopify", emoji: "🛍️" },
  { value: "amazon", label: "Amazon", emoji: "📦" },
  { value: "woocommerce", label: "WooCommerce", emoji: "🛒" },
  { value: "prestashop", label: "PrestaShop", emoji: "🏪" },
  { value: "custom", label: "Autre", emoji: "🌐" },
]

const FREQUENCIES = [
  { value: "daily", label: "1 fois par jour" },
  { value: "twice_daily", label: "2 fois par jour" },
  { value: "hourly", label: "Toutes les heures", badge: "Pro" },
]

export default function NewCompetitorPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [domain, setDomain] = useState("")
  const [platform, setPlatform] = useState("shopify")
  const [frequency, setFrequency] = useState("daily")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, domain, platform, scrapeFrequency: frequency }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue")
        return
      }

      router.push("/dashboard/competitors")
      router.refresh()
    } catch {
      setError("Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  function handleDomainBlur() {
    if (domain && !name) {
      try {
        const url = domain.startsWith("http") ? domain : `https://${domain}`
        const host = new URL(url).hostname.replace(/^www\./, "")
        const parts = host.split(".")
        setName(parts[0].charAt(0).toUpperCase() + parts[0].slice(1))
      } catch { /* ignore */ }
    }
  }

  return (
    <div className="min-h-full bg-[#08090C] px-6 py-10">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/dashboard/competitors"
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Ajouter un concurrent</h1>
            <p className="text-sm text-gray-500 mt-0.5">Configurez la surveillance de son site en 30 secondes</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-5">
            {/* URL */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-2">
                <Globe className="h-3.5 w-3.5 text-[#A78BFA]" /> URL ou domaine *
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  onBlur={handleDomainBlur}
                  required
                  placeholder="concurrent.com ou https://concurrent.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/50 focus:bg-white/8 transition-colors"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-2">
                <Tag className="h-3.5 w-3.5 text-[#A78BFA]" /> Nom du concurrent *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Zalando, Fnac, Amazon…"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/50 focus:bg-white/8 transition-colors"
              />
            </div>

            {/* Platform */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-2">
                <Eye className="h-3.5 w-3.5 text-[#A78BFA]" /> Plateforme
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPlatform(p.value)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-medium transition-colors text-center ${
                      platform === p.value
                        ? "bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 text-[#A78BFA]"
                        : "bg-white/5 border border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300"
                    }`}
                  >
                    <span className="block mb-0.5">{p.emoji}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-2">
                <Clock className="h-3.5 w-3.5 text-[#A78BFA]" /> Fréquence de mise à jour
              </label>
              <div className="space-y-2">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setFrequency(f.value)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors ${
                      frequency === f.value
                        ? "bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 text-white"
                        : "bg-white/5 border border-white/10 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {f.label}
                      {f.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400">{f.badge}</span>
                      )}
                    </span>
                    <span className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      frequency === f.value ? "border-[#8B5CF6]" : "border-white/20"
                    }`}>
                      {frequency === f.value && <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" />}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/20"
          >
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Ajout en cours…</> : "Ajouter le concurrent"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Le premier scan sera lancé dans les 24h suivant l'ajout.
          </p>
        </form>
      </div>
    </div>
  )
}
