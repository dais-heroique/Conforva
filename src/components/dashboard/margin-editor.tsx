"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Loader2, Check, X, TrendingUp, TrendingDown } from "lucide-react"
import type { Locale } from "@/lib/i18n/locale"

const DICT = {
  fr: { cost: "Coût", myPrice: "Mon prix", addMargin: "Ajouter ma marge", margin: "marge", costLabel: (c: number | null) => `Coût: ${c}€`, ifMatched: "Si aligné:" },
  en: { cost: "Cost", myPrice: "My price", addMargin: "Add my margin", margin: "margin", costLabel: (c: number | null) => `Cost: ${c}€`, ifMatched: "If matched:" },
}

interface Props {
  productId: string
  costPrice: number | null
  yourPrice: number | null
  competitorPrice: number | null
  locale?: Locale
}

export function MarginEditor({ productId, costPrice, yourPrice, competitorPrice, locale = "fr" }: Props) {
  const t = DICT[locale]
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [cost, setCost] = useState(costPrice != null ? String(costPrice) : "")
  const [mine, setMine] = useState(yourPrice != null ? String(yourPrice) : "")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          costPrice: cost.trim() ? parseFloat(cost.replace(",", ".")) : null,
          yourPrice: mine.trim() ? parseFloat(mine.replace(",", ".")) : null,
        }),
      })
      setEditing(false)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  if (editing) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-1 flex-wrap">
        <input
          type="text" inputMode="decimal" autoFocus value={cost} onChange={(e) => setCost(e.target.value)}
          placeholder={t.cost}
          className="w-16 px-1.5 py-1 bg-white/8 border border-[#8B5CF6]/40 rounded-lg text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
        />
        <input
          type="text" inputMode="decimal" value={mine} onChange={(e) => setMine(e.target.value)}
          placeholder={t.myPrice}
          className="w-16 px-1.5 py-1 bg-white/8 border border-[#8B5CF6]/40 rounded-lg text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
        />
        <button type="submit" disabled={loading} className="text-emerald-400 hover:text-emerald-300">
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
        </button>
        <button type="button" onClick={() => setEditing(false)} className="text-gray-500 hover:text-gray-300">
          <X className="h-3.5 w-3.5" />
        </button>
      </form>
    )
  }

  if (costPrice == null && yourPrice == null) {
    return (
      <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1 text-xs text-[#A78BFA] hover:text-white transition-colors">
        <Pencil className="h-3 w-3" /> {t.addMargin}
      </button>
    )
  }

  const myMargin = costPrice != null && yourPrice != null && costPrice > 0
    ? ((yourPrice - costPrice) / costPrice) * 100
    : null

  const marginIfMatchCompetitor = costPrice != null && competitorPrice != null && costPrice > 0
    ? ((competitorPrice - costPrice) / costPrice) * 100
    : null

  return (
    <button onClick={() => setEditing(true)} className="text-left group">
      {myMargin != null ? (
        <span className={`inline-flex items-center gap-1 text-xs font-bold ${myMargin >= 20 ? "text-emerald-400" : myMargin >= 0 ? "text-amber-400" : "text-red-400"}`}>
          {myMargin >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {myMargin.toFixed(0)}% {t.margin}
        </span>
      ) : (
        <span className="text-xs text-gray-500 group-hover:text-[#A78BFA]">{t.costLabel(costPrice)}</span>
      )}
      {marginIfMatchCompetitor != null && (
        <p className="text-xs text-gray-600 mt-0.5">
          {t.ifMatched} {marginIfMatchCompetitor >= 0 ? "+" : ""}{marginIfMatchCompetitor.toFixed(0)}%
        </p>
      )}
    </button>
  )
}
