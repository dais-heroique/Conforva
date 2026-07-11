"use client"

import { useState } from "react"
import { Plus, Bell, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
  orgId: string
  competitors: { id: string; name: string }[]
  canAdd: boolean
}

const ALERT_TYPES = [
  { value: "price_drop", label: "Baisse de prix" },
  { value: "price_increase", label: "Hausse de prix" },
  { value: "out_of_stock", label: "Rupture de stock" },
  { value: "back_in_stock", label: "Retour en stock" },
  { value: "new_product", label: "Nouveau produit" },
]

export function AddAlertButton({ competitors, canAdd }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [type, setType] = useState("price_drop")
  const [competitorId, setCompetitorId] = useState(competitors[0]?.id ?? "")
  const [threshold, setThreshold] = useState("5")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, competitorId: competitorId || null, threshold: parseFloat(threshold) || null }),
      })
      setOpen(false)
      setName("")
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  if (!canAdd) {
    return (
      <a href="/dashboard/billing" className="flex items-center gap-2 text-sm text-orange-400 border border-orange-400/30 px-4 py-2 rounded-xl hover:bg-orange-400/10 transition-colors">
        <Bell className="h-4 w-4" /> Limite atteinte — Upgrader
      </a>
    )
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors"
      >
        <Plus className="h-4 w-4" />
        Nouvelle alerte
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setOpen(false)}>
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-bold text-white mb-4">Créer une alerte</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Nom de l'alerte</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Prix Nike sous -10%"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50 placeholder-gray-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Type d'alerte</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50"
                >
                  {ALERT_TYPES.map(t => <option key={t.value} value={t.value} className="bg-[#0D0D14]">{t.label}</option>)}
                </select>
              </div>
              {competitors.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Concurrent (optionnel)</label>
                  <select
                    value={competitorId}
                    onChange={e => setCompetitorId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50"
                  >
                    <option value="" className="bg-[#0D0D14]">Tous les concurrents</option>
                    {competitors.map(c => <option key={c.id} value={c.id} className="bg-[#0D0D14]">{c.name}</option>)}
                  </select>
                </div>
              )}
              {(type === "price_drop" || type === "price_increase") && (
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Seuil (%)</label>
                  <input
                    type="number"
                    value={threshold}
                    onChange={e => setThreshold(e.target.value)}
                    min="1" max="100" step="0.5"
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50"
                  />
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm rounded-xl transition-colors">
                  Annuler
                </button>
                <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
