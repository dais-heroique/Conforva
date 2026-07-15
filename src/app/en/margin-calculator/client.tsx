"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { PublicNavEn, PublicFooterEn } from "@/components/layout/public-nav-en"
import { Sparkles, ArrowRight, Info } from "lucide-react"

const PLATFORM_PRESETS = [
  { label: "Custom", fee: 0 },
  { label: "Shopify Payments (~2.4%)", fee: 2.4 },
  { label: "Amazon FBA (~15%)", fee: 15 },
  { label: "WooCommerce + Stripe (~1.9%)", fee: 1.9 },
  { label: "PrestaShop + Stripe (~1.9%)", fee: 1.9 },
]

export default function MarginCalculatorClient() {
  const [cost, setCost] = useState("15")
  const [shipping, setShipping] = useState("3")
  const [feePercent, setFeePercent] = useState("2.4")
  const [mode, setMode] = useState<"fromPrice" | "fromMargin">("fromPrice")
  const [sellPrice, setSellPrice] = useState("39.90")
  const [targetMarginPercent, setTargetMarginPercent] = useState("30")

  const result = useMemo(() => {
    const c = parseFloat(cost.replace(",", ".")) || 0
    const s = parseFloat(shipping.replace(",", ".")) || 0
    const fee = parseFloat(feePercent.replace(",", ".")) || 0
    const totalCost = c + s

    if (mode === "fromPrice") {
      const price = parseFloat(sellPrice.replace(",", ".")) || 0
      const feeAmount = (price * fee) / 100
      const netRevenue = price - feeAmount
      const marginEur = netRevenue - totalCost
      const marginPercentOnCost = totalCost > 0 ? (marginEur / totalCost) * 100 : 0
      const markupPercentOnPrice = price > 0 ? (marginEur / price) * 100 : 0
      return { price, feeAmount, netRevenue, marginEur, marginPercentOnCost, markupPercentOnPrice, totalCost }
    } else {
      const targetMargin = parseFloat(targetMarginPercent.replace(",", ".")) || 0
      const requiredNet = totalCost * (1 + targetMargin / 100)
      const price = fee < 100 ? requiredNet / (1 - fee / 100) : 0
      const feeAmount = (price * fee) / 100
      const netRevenue = price - feeAmount
      const marginEur = netRevenue - totalCost
      const markupPercentOnPrice = price > 0 ? (marginEur / price) * 100 : 0
      return { price, feeAmount, netRevenue, marginEur, marginPercentOnCost: targetMargin, markupPercentOnPrice, totalCost }
    }
  }, [cost, shipping, feePercent, mode, sellPrice, targetMarginPercent])

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
            E-commerce margin calculator
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-lg mx-auto">
            Calculate your real margin, markup, and ideal sell price — accounting for your platform's fees.
          </p>
        </div>

        <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Cost of goods ($)</label>
              <input
                type="text" inputMode="decimal" value={cost} onChange={(e) => setCost(e.target.value)}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Shipping cost ($)</label>
              <input
                type="text" inputMode="decimal" value={shipping} onChange={(e) => setShipping(e.target.value)}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Selling platform</label>
            <select
              onChange={(e) => setFeePercent(String(PLATFORM_PRESETS.find(p => p.label === e.target.value)?.fee ?? 0))}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50 mb-2"
            >
              {PLATFORM_PRESETS.map(p => <option key={p.label} value={p.label} className="bg-[#0F0F17]">{p.label}</option>)}
            </select>
            <div className="relative">
              <input
                type="text" inputMode="decimal" value={feePercent} onChange={(e) => setFeePercent(e.target.value)}
                className="w-full px-3 py-2.5 pr-10 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
            </div>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
            <button
              onClick={() => setMode("fromPrice")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${mode === "fromPrice" ? "bg-[#8B5CF6] text-white" : "text-gray-400"}`}
            >
              I have a sell price
            </button>
            <button
              onClick={() => setMode("fromMargin")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${mode === "fromMargin" ? "bg-[#8B5CF6] text-white" : "text-gray-400"}`}
            >
              I want a target margin
            </button>
          </div>

          {mode === "fromPrice" ? (
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Sell price ($)</label>
              <input
                type="text" inputMode="decimal" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Target margin (% of total cost)</label>
              <input
                type="text" inputMode="decimal" value={targetMarginPercent} onChange={(e) => setTargetMarginPercent(e.target.value)}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#8B5CF6]/50"
              />
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-[#8B5CF6]/8 border border-[#8B5CF6]/20 rounded-2xl p-5 text-center">
            <p className="text-xs text-gray-500 mb-2">{mode === "fromMargin" ? "Recommended sell price" : "Net margin"}</p>
            <p className="text-2xl font-black text-white">
              ${mode === "fromMargin" ? result.price.toFixed(2) : result.marginEur.toFixed(2)}
            </p>
          </div>
          <div className="bg-white/4 border border-white/8 rounded-2xl p-5 text-center">
            <p className="text-xs text-gray-500 mb-2">Margin rate</p>
            <p className="text-2xl font-black text-white">{result.marginPercentOnCost.toFixed(1)}%</p>
          </div>
          <div className="bg-white/4 border border-white/8 rounded-2xl p-5 text-center">
            <p className="text-xs text-gray-500 mb-2">Markup rate</p>
            <p className="text-2xl font-black text-white">{result.markupPercentOnPrice.toFixed(1)}%</p>
          </div>
          <div className="bg-white/4 border border-white/8 rounded-2xl p-5 text-center">
            <p className="text-xs text-gray-500 mb-2">Platform fees</p>
            <p className="text-2xl font-black text-white">${result.feeAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6 bg-white/4 border border-white/8 rounded-2xl p-5 flex items-start gap-3">
          <Info className="h-4 w-4 text-[#A78BFA] mt-0.5 shrink-0" />
          <div className="text-xs text-gray-400 leading-relaxed">
            <p className="mb-2"><strong className="text-gray-300">Margin rate</strong> = margin / total cost. It's the return on your product investment.</p>
            <p><strong className="text-gray-300">Markup rate</strong> = margin / sell price. It's the share of the sell price you actually keep after all costs. The two are often confused but tell different stories.</p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-br from-[#8B5CF6]/12 to-[#7C3AED]/6 border border-[#8B5CF6]/25 rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-white mb-1.5">Your margin also depends on your competitors</p>
          <p className="text-xs text-gray-400 mb-4 max-w-sm mx-auto leading-relaxed">
            Conforva monitors your competitors' prices 24/7 so you always know if your margin is defensible — or if you need to adjust.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors"
          >
            Free 14-day trial <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <PublicFooterEn />
    </div>
  )
}
