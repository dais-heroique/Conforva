"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Globe, Loader2 } from "lucide-react"

const PLATFORMS = [
  { value: "shopify", label: "Shopify" },
  { value: "amazon", label: "Amazon" },
  { value: "woocommerce", label: "WooCommerce" },
  { value: "prestashop", label: "PrestaShop" },
  { value: "custom", label: "Autre" },
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
    <div className="p-6 max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/competitors" className="text-gray-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-xl font-bold text-white">Ajouter un concurrent</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white/5 border border-white/8 rounded-2xl p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">URL ou domaine *</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onBlur={handleDomainBlur}
                required
                placeholder="concurrent.com ou https://concurrent.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00E676]/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Nom du concurrent *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Zalando, Fnac, Amazon…"
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00E676]/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Plateforme</label>
            <div className="grid grid-cols-3 gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPlatform(p.value)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium transition-colors ${
                    platform === p.value
                      ? "bg-[#00E676]/20 border border-[#00E676]/40 text-[#00E676]"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:border-white/20"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Fréquence de mise à jour</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#00E676]/50 transition-colors"
            >
              <option value="daily" className="bg-[#0D1611]">1 fois par jour</option>
              <option value="twice_daily" className="bg-[#0D1611]">2 fois par jour</option>
              <option value="hourly" className="bg-[#0D1611]">Toutes les heures (Pro)</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#00E676] hover:bg-[#00c964] text-[#060D09] font-bold text-sm rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Ajout en cours…</> : "Ajouter le concurrent"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Le premier scan sera lancé dans les 24h suivant l'ajout.
        </p>
      </form>
    </div>
  )
}
