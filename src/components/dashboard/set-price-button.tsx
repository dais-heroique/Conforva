"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Loader2, Check, X } from "lucide-react"
import type { Locale } from "@/lib/i18n/locale"

const DICT = {
  fr: { invalidPrice: "Prix invalide", error: "Erreur", networkError: "Erreur réseau", enterPrice: "Entrer le prix" },
  en: { invalidPrice: "Invalid price", error: "Error", networkError: "Network error", enterPrice: "Enter price" },
}

export function SetPriceButton({ productId, compact = false, locale = "fr" }: { productId: string; compact?: boolean; locale?: Locale }) {
  const t = DICT[locale]
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = parseFloat(price.replace(",", "."))
    if (!Number.isFinite(value) || value <= 0) {
      setError(t.invalidPrice)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, price: value }),
      })
      if (!res.ok) {
        setError(t.error)
        setLoading(false)
        return
      }
      setEditing(false)
      setPrice("")
      router.refresh()
    } catch {
      setError(t.networkError)
    } finally {
      setLoading(false)
    }
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className={`inline-flex items-center gap-1 text-xs text-[#A78BFA] hover:text-white transition-colors ${compact ? "" : "font-medium"}`}
      >
        <Pencil className="h-3 w-3" />
        {compact ? "" : t.enterPrice}
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
      <input
        type="text"
        inputMode="decimal"
        autoFocus
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="19.99"
        className="w-20 px-2 py-1 bg-white/8 border border-[#8B5CF6]/40 rounded-lg text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
      />
      <button type="submit" disabled={loading} className="text-emerald-400 hover:text-emerald-300 disabled:opacity-50">
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
      </button>
      <button type="button" onClick={() => { setEditing(false); setError(null) }} className="text-gray-500 hover:text-gray-300">
        <X className="h-3.5 w-3.5" />
      </button>
      {error && <span className="text-xs text-red-400 ml-1">{error}</span>}
    </form>
  )
}
