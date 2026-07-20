"use client"

import { useState } from "react"
import Link from "next/link"
import { PublicNavEn, PublicFooterEn } from "@/components/layout/public-nav-en"
import { Link2, Loader2, TrendingDown, TrendingUp, Minus, ArrowRight, Sparkles, Search } from "lucide-react"

interface CompareResult {
  yours: { price: number | null; currency: string; name: string | null } | null
  competitor: { price: number | null; currency: string; name: string | null } | null
  gapPercent: number | null
  usesRemaining?: number
}

export default function PriceComparisonClient() {
  const [yourUrl, setYourUrl] = useState("")
  const [competitorUrl, setCompetitorUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [limitReached, setLimitReached] = useState(false)
  const [result, setResult] = useState<CompareResult | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch("/api/public/compare-prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yourUrl: yourUrl.trim(), competitorUrl: competitorUrl.trim() }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.error === "FREE_LIMIT_REACHED") {
          setLimitReached(true)
          setError(`You've used your ${data.limit ?? 5} free comparisons. Create a free account for unlimited use and automatic tracking.`)
        } else if (data.error === "RATE_LIMITED") setError("Too many comparisons in a short time — try again in a minute.")
        else if (data.error === "NO_PRICE_FOUND") setError("Couldn't find a price on either page. Make sure both are product pages.")
        else setError("Couldn't compare these two pages right now.")
        setLoading(false)
        return
      }

      setResult(data)
    } catch {
      setError("Network error — please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#08090C]">
      <PublicNavEn />

      <main className="max-w-2xl mx-auto px-5 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-4 py-1.5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" />
            <span className="text-xs font-medium text-[#A78BFA]">Free tool — no signup</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Compare your price to a competitor's
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-lg mx-auto">
            Paste your product's URL and a competitor's. We fetch both prices in real time and calculate the gap.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Your product</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="url"
                value={yourUrl}
                onChange={(e) => setYourUrl(e.target.value)}
                placeholder="https://yourstore.com/products/your-product"
                required
                className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Competitor's product</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="url"
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
                placeholder="https://competitor.com/products/similar-product"
                required
                className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
              />
            </div>
          </div>

          {error && !limitReached && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
              {error}
            </div>
          )}

          {limitReached ? (
            <div className="rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/25 p-4 space-y-3">
              <p className="text-sm text-white font-semibold">Free limit reached</p>
              <p className="text-xs text-gray-400 leading-relaxed">{error}</p>
              <Link
                href="/auth/register"
                className="flex items-center justify-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm py-2.5 rounded-xl transition-colors"
              >
                Create a free account <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              {loading ? "Comparing…" : "Compare prices"}
            </button>
          )}
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/4 border border-white/8 rounded-2xl p-5 text-center">
                <p className="text-xs text-gray-500 mb-2">Your price</p>
                {result.yours?.price != null ? (
                  <p className="text-2xl font-black text-white">{result.yours.price.toFixed(2)} {result.yours.currency}</p>
                ) : (
                  <p className="text-sm text-gray-600">Price not found</p>
                )}
              </div>
              <div className="bg-white/4 border border-white/8 rounded-2xl p-5 text-center">
                <p className="text-xs text-gray-500 mb-2">Competitor's price</p>
                {result.competitor?.price != null ? (
                  <p className="text-2xl font-black text-white">{result.competitor.price.toFixed(2)} {result.competitor.currency}</p>
                ) : (
                  <p className="text-sm text-gray-600">Price not found</p>
                )}
              </div>
            </div>

            {result.gapPercent != null && (
              <div className={`rounded-2xl p-5 flex items-center gap-4 border ${
                result.gapPercent < 0 ? "bg-emerald-500/8 border-emerald-500/20" :
                result.gapPercent > 0 ? "bg-red-500/8 border-red-500/20" :
                "bg-white/4 border-white/8"
              }`}>
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${
                  result.gapPercent < 0 ? "bg-emerald-500/15" : result.gapPercent > 0 ? "bg-red-500/15" : "bg-white/8"
                }`}>
                  {result.gapPercent < 0 ? <TrendingDown className="h-5 w-5 text-emerald-400" /> :
                   result.gapPercent > 0 ? <TrendingUp className="h-5 w-5 text-red-400" /> :
                   <Minus className="h-5 w-5 text-gray-400" />}
                </div>
                <div>
                  <p className={`text-lg font-black ${
                    result.gapPercent < 0 ? "text-emerald-400" : result.gapPercent > 0 ? "text-red-400" : "text-white"
                  }`}>
                    {result.gapPercent > 0 ? "+" : ""}{result.gapPercent.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-400">
                    {result.gapPercent < 0
                      ? "You're cheaper than this competitor"
                      : result.gapPercent > 0
                        ? "You're more expensive than this competitor"
                        : "Same price as this competitor"}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-[#8B5CF6]/12 to-[#7C3AED]/6 border border-[#8B5CF6]/25 rounded-2xl p-6 text-center">
              <p className="text-sm font-semibold text-white mb-1.5">Want to track this gap automatically?</p>
              <p className="text-xs text-gray-400 mb-4 max-w-sm mx-auto leading-relaxed">
                Conforva monitors this price (and as many products/competitors as you need) 24/7, and alerts you the moment it moves.
              </p>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors"
              >
                Free 14-day trial <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {result.usesRemaining != null && (
              <p className="text-xs text-gray-600 text-center">
                {result.usesRemaining > 0
                  ? `${result.usesRemaining} free comparison${result.usesRemaining > 1 ? "s" : ""} remaining`
                  : "That was your last free comparison"}
              </p>
            )}
          </div>
        )}

        <p className="text-xs text-gray-600 text-center mt-8">
          Works with most Shopify, WooCommerce, PrestaShop and Amazon stores.
          Some highly dynamic pages may not be detected.
        </p>
      </main>

      <PublicFooterEn />
    </div>
  )
}
