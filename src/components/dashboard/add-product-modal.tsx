"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Link2, Tag, Hash, Loader2, Plus, ShoppingBag, Euro } from "lucide-react"
import type { Locale } from "@/lib/i18n/locale"

const DICT = {
  fr: {
    addProduct: "Ajouter un produit",
    limitReachedTitle: (limit: number) => `Limite de ${limit} produits atteinte`,
    addCompetitorFirst: "Ajoutez d'abord un concurrent",
    modalTitle: "Ajouter un produit",
    used: (n: number, limit: number) => `${n} / ${limit} produits utilisés`,
    limitReached: (limit: number) => `Limite de ${limit} produits atteinte. Passez à un plan supérieur.`,
    duplicateUrl: "Ce produit est déjà suivi pour ce concurrent.",
    invalidUrl: "URL invalide.",
    genericError: "Une erreur est survenue.",
    networkError: "Erreur réseau.",
    added: (price: string) => `✓ Ajouté — prix : ${price}`,
    addedNoPrice: "✓ Ajouté — prix non trouvé automatiquement, vous pourrez le saisir dans la liste",
    competitor: "Concurrent *",
    productUrl: "URL du produit *",
    productUrlPlaceholder: "https://concurrent.com/produit/nom-du-produit",
    productUrlHint: "L'URL exacte de la page produit chez le concurrent",
    productName: "Nom du produit",
    optional: "(optionnel)",
    productNamePlaceholder: "Ex : Nike Air Max 90 Blanc",
    sku: "SKU",
    price: "Prix",
    ifKnown: "(si connu)",
    priceHint: "Laissez vide pour une récupération automatique — sinon confirmez le prix vous-même.",
    cancel: "Annuler",
    adding: "Ajout…",
    submit: "Ajouter le produit",
    footerHint: "Prix récupéré immédiatement si possible, sinon actualisé chaque nuit à minuit (Paris)",
  },
  en: {
    addProduct: "Add a product",
    limitReachedTitle: (limit: number) => `Limit of ${limit} products reached`,
    addCompetitorFirst: "Add a competitor first",
    modalTitle: "Add a product",
    used: (n: number, limit: number) => `${n} / ${limit} products used`,
    limitReached: (limit: number) => `Limit of ${limit} products reached. Upgrade your plan.`,
    duplicateUrl: "This product is already tracked for this competitor.",
    invalidUrl: "Invalid URL.",
    genericError: "Something went wrong.",
    networkError: "Network error.",
    added: (price: string) => `✓ Added — price: ${price}`,
    addedNoPrice: "✓ Added — price not found automatically, you can enter it in the list",
    competitor: "Competitor *",
    productUrl: "Product URL *",
    productUrlPlaceholder: "https://competitor.com/product/product-name",
    productUrlHint: "The exact URL of the product page on the competitor's site",
    productName: "Product name",
    optional: "(optional)",
    productNamePlaceholder: "E.g.: Nike Air Max 90 White",
    sku: "SKU",
    price: "Price",
    ifKnown: "(if known)",
    priceHint: "Leave empty for automatic retrieval — otherwise confirm the price yourself.",
    cancel: "Cancel",
    adding: "Adding…",
    submit: "Add product",
    footerHint: "Price fetched immediately when possible, otherwise refreshed every night at midnight (Paris)",
  },
}

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
  locale: Locale
}

export function AddProductModal({ competitors, defaultCompetitorId, productLimit, currentCount, locale }: Props) {
  const t = DICT[locale]
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const [url, setUrl] = useState("")
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [price, setPrice] = useState("")
  const [competitorId, setCompetitorId] = useState(defaultCompetitorId || competitors[0]?.id || "")

  const atLimit = currentCount >= productLimit

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    setError(null)

    const manualPrice = price.trim() ? parseFloat(price.trim().replace(",", ".")) : undefined

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          competitorId,
          url: url.trim(),
          name: name.trim() || undefined,
          sku: sku.trim() || undefined,
          price: manualPrice != null && Number.isFinite(manualPrice) ? manualPrice : undefined,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.error === "LIMIT_REACHED") setError(t.limitReached(productLimit))
        else if (data.error === "DUPLICATE_URL") setError(t.duplicateUrl)
        else if (data.error === "INVALID_INPUT") setError(data.details?.[0]?.message || t.invalidUrl)
        else setError(t.genericError)
        setLoading(false)
        return
      }

      setSuccessMsg(
        data.product?.currentPrice != null
          ? t.added(`${data.product.currentPrice} ${data.product.currency ?? "€"}`)
          : t.addedNoPrice
      )
      setTimeout(() => {
        setOpen(false)
        setSuccessMsg(null)
        setUrl("")
        setName("")
        setSku("")
        setPrice("")
        router.refresh()
      }, 1400)
    } catch {
      setError(t.networkError)
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => { if (!atLimit) setOpen(true) }}
        disabled={atLimit || competitors.length === 0}
        className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-violet-900/20"
        title={atLimit ? t.limitReachedTitle(productLimit) : competitors.length === 0 ? t.addCompetitorFirst : undefined}
      >
        <Plus className="h-4 w-4" />
        {t.addProduct}
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
                  <h2 className="font-bold text-white text-sm">{t.modalTitle}</h2>
                  <p className="text-xs text-gray-500">{t.used(currentCount, productLimit)}</p>
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
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">{t.competitor}</label>
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
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">{t.productUrl}</label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t.productUrlPlaceholder}
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">{t.productUrlHint}</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">{t.productName} <span className="text-gray-600">{t.optional}</span></label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.productNamePlaceholder}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* SKU */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">{t.sku} <span className="text-gray-600">{t.optional}</span></label>
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

                {/* Manual price */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">{t.price} <span className="text-gray-600">{t.ifKnown}</span></label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      inputMode="decimal"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="19.99"
                      className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 -mt-2">
                {t.priceHint}
              </p>

              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400">
                  {successMsg}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm rounded-xl transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={loading || !!successMsg}
                  className="flex-1 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? t.adding : t.submit}
                </button>
              </div>

              <p className="text-xs text-gray-600 text-center">
                {t.footerHint}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
