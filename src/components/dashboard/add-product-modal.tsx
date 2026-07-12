"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Link2, Tag, Hash, Loader2, Plus, ShoppingBag } from "lucide-react"

interface Competitor {
  id: string
  name: string
  domain: string
  platform: string
}

interface Props {
  competitors: Competitor[]
  defaultCompetitorId?: string
  productLimit: number
  currentCount: number
}

export function AddProductModal({ competitors, defaultCompetitorId, productLimit, currentCount }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [url, setUrl] = useState("")
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [competitorId, setCompetitorId] = useState(defaultCompetitorId || competitors[0]?.id || "")

  const atLimit = currentCount >= productLimit

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ competitorId, url: url.trim(), name: name.trim() || undefined, sku: sku.trim() || undefined }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.error === "LIMIT_REACHED") setError(`Limite de ${productLimit} produits atteinte. Passez à un plan supérieur.`)
        else if (data.error === "DUPLICATE_URL") setError("Ce produit est déjà suivi pour ce concurrent.")
        else if (data.error === "INVALID_INPUT") setError(data.details?.[0]?.message || "URL invalide.")
        else setError("Une erreur est survenue.")
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setUrl("")
        setName("")
        setSku("")
        router.refresh()
      }, 800)
    } catch {
      setError("Erreur réseau.")
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => { if (!atLimit) setOpen(true) }}
        disabled={atLimit || competitors.length === 0}
        className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-violet-900/20"
        title={atLimit ? `Limite de ${productLimit} produits atteinte` : competitors.length === 0 ? "Ajoutez d'abord un concurrent" : undefined}
      >
        <Plus className="h-4 w-4" />
        Ajouter un produit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative bg-[#0F0F17] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-[#8B5CF6]/15 flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-[#A78BFA]" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-sm">Ajouter un produit</h2>
                  <p className="text-xs text-gray-500">{currentCount} / {productLimit} produits utilisés</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Competitor */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Concurrent *</label>
                <select
                  value={competitorId}
                  onChange={(e) => setCompetitorId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50 transition-colors appearance-none"
                >
                  {competitors.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0F0F17]">
                      {c.name} — {c.domain}
                    </option>
                  ))}
                </select>
              </div>

              {/* URL */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">URL du produit *</label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://concurrent.com/produit/nom-du-produit"
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">L'URL exacte de la page produit chez le concurrent</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Nom du produit <span className="text-gray-600">(optionnel)</span></label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex : Nike Air Max 90 Blanc"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                  />
                </div>
              </div>

              {/* SKU */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">SKU / Référence <span className="text-gray-600">(optionnel)</span></label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="REF-12345"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                  />
                </div>
              </div>

              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading || success}
                  className="flex-1 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {success ? "✓ Ajouté !" : loading ? "Ajout…" : "Ajouter le produit"}
                </button>
              </div>

              <p className="text-xs text-gray-600 text-center">
                Le prix est récupéré immédiatement, puis mis à jour chaque jour
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
