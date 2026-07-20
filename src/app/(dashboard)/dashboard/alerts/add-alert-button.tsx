"use client"

import { useState, useMemo } from "react"
import { Plus, Bell, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Locale } from "@/lib/i18n/locale"

interface Competitor {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  competitorId: string
}

interface Props {
  orgId: string
  competitors: Competitor[]
  products: Product[]
  canAdd: boolean
  locale: Locale
}

const DICT = {
  fr: {
    alertTypes: [
      { value: "price_drop", label: "Baisse de prix" },
      { value: "price_increase", label: "Hausse de prix" },
      { value: "out_of_stock", label: "Rupture de stock" },
      { value: "back_in_stock", label: "Retour en stock" },
      { value: "new_product", label: "Nouveau produit" },
    ],
    limitReached: "Limite atteinte — Upgrader",
    newAlert: "Nouvelle alerte",
    createAlert: "Créer une alerte",
    alertName: "Nom de l'alerte",
    alertNamePlaceholder: "Prix Nike sous -10%",
    alertType: "Type d'alerte",
    scope: "Portée de l'alerte",
    scopeProduct: "Un produit",
    scopeCompetitor: "Un concurrent",
    scopeAll: "Tout",
    productToWatch: "Produit à surveiller",
    competitorToWatch: "Concurrent à surveiller",
    threshold: "Seuil (%)",
    cancel: "Annuler",
    create: "Créer",
  },
  en: {
    alertTypes: [
      { value: "price_drop", label: "Price drop" },
      { value: "price_increase", label: "Price increase" },
      { value: "out_of_stock", label: "Out of stock" },
      { value: "back_in_stock", label: "Back in stock" },
      { value: "new_product", label: "New product" },
    ],
    limitReached: "Limit reached — Upgrade",
    newAlert: "New alert",
    createAlert: "Create an alert",
    alertName: "Alert name",
    alertNamePlaceholder: "Nike price under -10%",
    alertType: "Alert type",
    scope: "Alert scope",
    scopeProduct: "A product",
    scopeCompetitor: "A competitor",
    scopeAll: "Everything",
    productToWatch: "Product to watch",
    competitorToWatch: "Competitor to watch",
    threshold: "Threshold (%)",
    cancel: "Cancel",
    create: "Create",
  },
}

type Scope = "all" | "competitor" | "product"

export function AddAlertButton({ competitors, products, canAdd, locale }: Props) {
  const t = DICT[locale]
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [type, setType] = useState("price_drop")
  const [scope, setScope] = useState<Scope>(products.length > 0 ? "product" : "all")
  const [competitorId, setCompetitorId] = useState(competitors[0]?.id ?? "")
  const [productId, setProductId] = useState(products[0]?.id ?? "")
  const [threshold, setThreshold] = useState("5")
  const [loading, setLoading] = useState(false)

  const productsForSelectedCompetitor = useMemo(
    () => (scope === "product" ? products : []),
    [scope, products]
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          type,
          competitorId: scope === "competitor" ? (competitorId || null) : null,
          productId: scope === "product" ? (productId || null) : null,
          threshold: parseFloat(threshold) || null,
        }),
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
        <Bell className="h-4 w-4" /> {t.limitReached}
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
        {t.newAlert}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setOpen(false)}>
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-bold text-white mb-4">{t.createAlert}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.alertName}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder={t.alertNamePlaceholder}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50 placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.alertType}</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50"
                >
                  {t.alertTypes.map(at => <option key={at.value} value={at.value} className="bg-[#0D0D14]">{at.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.scope}</label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setScope("product")}
                    disabled={products.length === 0}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                      scope === "product" ? "bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#A78BFA]" : "bg-white/5 border border-white/10 text-gray-400"
                    }`}
                  >
                    {t.scopeProduct}
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope("competitor")}
                    disabled={competitors.length === 0}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                      scope === "competitor" ? "bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#A78BFA]" : "bg-white/5 border border-white/10 text-gray-400"
                    }`}
                  >
                    {t.scopeCompetitor}
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope("all")}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                      scope === "all" ? "bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#A78BFA]" : "bg-white/5 border border-white/10 text-gray-400"
                    }`}
                  >
                    {t.scopeAll}
                  </button>
                </div>
              </div>

              {scope === "product" && (
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.productToWatch}</label>
                  <select
                    value={productId}
                    onChange={e => setProductId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50"
                  >
                    {productsForSelectedCompetitor.map(p => (
                      <option key={p.id} value={p.id} className="bg-[#0D0D14]">{p.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {scope === "competitor" && (
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.competitorToWatch}</label>
                  <select
                    value={competitorId}
                    onChange={e => setCompetitorId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50"
                  >
                    {competitors.map(c => <option key={c.id} value={c.id} className="bg-[#0D0D14]">{c.name}</option>)}
                  </select>
                </div>
              )}

              {(type === "price_drop" || type === "price_increase") && (
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.threshold}</label>
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
                  {t.cancel}
                </button>
                <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {t.create}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
