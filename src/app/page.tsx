"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ConforvaLogo } from "@/components/logo"
import { ArrowRight, Bell, TrendingDown, TrendingUp, BarChart3, Zap, ShieldCheck, Check, X, AlertTriangle, Package, Eye, Activity } from "lucide-react"

// ─── Color tokens ─────────────────────────────────────────────────────────────
// Primary: #7C3AED (violet-600) / #8B5CF6 (violet-500)
// BG: #08090C / Cards: #0F1016

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      if (y < 80) setVisible(true)
      else if (y > lastY.current + 4) setVisible(false)
      else if (y < lastY.current - 4) setVisible(true)
      lastY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#08090C]/90 backdrop-blur-md transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <ConforvaLogo size={28} />
          <span className="font-black text-white tracking-tight" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <Link href="/#comment" className="hover:text-white transition-colors">Comment ça marche</Link>
          <Link href="/#tarifs" className="hover:text-white transition-colors">Tarifs</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5">
            Connexion
          </Link>
          <Link href="/auth/register" className="flex items-center gap-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors">
            Essai gratuit <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  )
}

// ─── Live ticker ──────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  { name: "Nike Air Max 270", old: "129.99", new: "109.99", dir: "down", who: "Zalando" },
  { name: "Sony WH-1000XM5", old: "349.00", new: "279.00", dir: "down", who: "Fnac" },
  { name: "Dyson V15", old: "699.00", new: "749.00", dir: "up", who: "Darty" },
  { name: "Apple AirPods Pro", old: "249.00", new: "199.00", dir: "down", who: "Amazon" },
  { name: "Samsung 65\" QLED", old: "1199.00", new: "899.00", dir: "down", who: "Boulanger" },
  { name: "Lego Technic", old: "89.99", new: "74.99", dir: "down", who: "JouéClub" },
  { name: "Adidas Ultraboost", old: "189.00", new: "219.00", dir: "up", who: "Sport 2000" },
]

function LiveTicker() {
  return (
    <div className="relative overflow-hidden border-y border-white/6 bg-white/2 py-2.5">
      <div className="flex gap-8 whitespace-nowrap" style={{ animation: "ticker 28s linear infinite", width: "max-content" }}>
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <div key={i} className="inline-flex items-center gap-2 text-xs">
            <span className={`h-1.5 w-1.5 rounded-full ${item.dir === "down" ? "bg-emerald-400" : "bg-red-400"}`} />
            <span className="text-gray-500 font-medium">{item.who}</span>
            <span className="text-gray-300">{item.name}</span>
            <span className="line-through text-gray-600">{item.old}€</span>
            <span className={`font-bold ${item.dir === "down" ? "text-emerald-400" : "text-red-400"}`}>
              {item.dir === "down" ? "↓" : "↑"} {item.new}€
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Floating alert ───────────────────────────────────────────────────────────

function FloatingAlert() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 1200) }, [])

  return (
    <div className={`absolute -right-4 top-1/4 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"} hidden lg:block`}>
      <div className="bg-[#0F1016] border border-white/15 rounded-2xl p-4 shadow-2xl w-52">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-7 w-7 rounded-full bg-red-500/20 flex items-center justify-center">
            <TrendingDown className="h-3.5 w-3.5 text-red-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Alerte prix</p>
            <p className="text-[10px] text-gray-500">il y a 2 min</p>
          </div>
          <div className="ml-auto h-2 w-2 rounded-full bg-red-400 animate-pulse" />
        </div>
        <p className="text-xs text-gray-300 leading-relaxed"><span className="text-white font-semibold">Zalando</span> a baissé les Nike Air Max 270 de <span className="text-red-400 font-bold">-20€</span></p>
        <div className="mt-3 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/20 px-3 py-1.5">
          <p className="text-[10px] text-[#A78BFA]">→ Passer à 105€ (+28% marge)</p>
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard mock ───────────────────────────────────────────────────────────

const SPARKLINE = "M0,30 L8,22 L16,25 L24,18 L32,20 L40,12 L48,15 L56,8 L64,10 L72,4 L80,6"

function DashboardMock() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="absolute inset-0 bg-[#8B5CF6]/8 blur-3xl rounded-3xl" />
      <FloatingAlert />
      <div className="relative bg-[#0C0D14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-[#0A0B11]">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
          <div className="mx-auto flex items-center gap-1.5 bg-white/5 rounded-md px-3 py-1">
            <ShieldCheck className="h-2.5 w-2.5 text-gray-600" />
            <span className="text-[10px] text-gray-600">app.conforva.com/dashboard</span>
          </div>
        </div>
        <div className="flex">
          {/* Sidebar */}
          <div className="w-12 border-r border-white/6 flex flex-col items-center py-5 gap-5 bg-[#09090F]">
            <BarChart3 className="h-4 w-4 text-[#8B5CF6]" />
            <Eye className="h-4 w-4 text-gray-700" />
            <Bell className="h-4 w-4 text-gray-700" />
            <Package className="h-4 w-4 text-gray-700" />
          </div>
          {/* Content */}
          <div className="flex-1 p-4 space-y-3">
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Concurrents", value: "7", badge: "+2", color: "text-[#8B5CF6]" },
                { label: "Produits suivis", value: "284", badge: "+18", color: "text-[#8B5CF6]" },
                { label: "Alertes 24h", value: "12", badge: "3 urgentes", color: "text-orange-400" },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white/4 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">{kpi.label}</p>
                  <p className="text-xl font-black text-white mt-1">{kpi.value}</p>
                  <p className={`text-[10px] mt-0.5 font-medium ${kpi.color}`}>{kpi.badge}</p>
                </div>
              ))}
            </div>

            {/* Chart + list side by side */}
            <div className="grid grid-cols-5 gap-3">
              {/* Mini chart */}
              <div className="col-span-2 bg-white/4 rounded-xl p-3 border border-white/5">
                <p className="text-[10px] text-gray-500 mb-2">Nike Air Max 270 — Prix marché</p>
                <svg viewBox="0 0 80 36" className="w-full h-12" fill="none">
                  <defs>
                    <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${SPARKLINE} L80,36 L0,36 Z`} fill="url(#spark)" />
                  <path d={SPARKLINE} stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="80" cy="6" r="2.5" fill="#8B5CF6" />
                </svg>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-gray-600">130€</span>
                  <span className="text-[10px] text-[#A78BFA] font-bold">105€ ↓</span>
                </div>
              </div>

              {/* Price changes */}
              <div className="col-span-3 bg-white/4 rounded-xl p-3 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-semibold text-gray-300">Changements récents</p>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-0.5"><Activity className="h-2.5 w-2.5" /> Live</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { name: "Nike Air Max 270", who: "Zalando", pct: "-15%", dir: "down" },
                    { name: "Sony WH-1000XM5", who: "Fnac", pct: "-20%", dir: "down" },
                    { name: "Dyson V15", who: "Darty", pct: "+7%", dir: "up" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-[10px]">
                      <div>
                        <p className="text-gray-200 font-medium">{item.name}</p>
                        <p className="text-gray-600">{item.who}</p>
                      </div>
                      <span className={`font-black text-xs ${item.dir === "down" ? "text-emerald-400" : "text-red-400"}`}>{item.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI recommendation */}
            <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/25 rounded-xl p-3 flex items-start gap-2.5">
              <Zap className="h-3.5 w-3.5 text-[#A78BFA] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-[#A78BFA] mb-0.5">Recommandation — Cette semaine</p>
                <p className="text-[10px] text-gray-300 leading-relaxed">Zalando a baissé les Nike Air Max 270 de 15%. Descendre à 105€ vous positionne 4€ en dessous tout en maintenant 28% de marge.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: "Starter",
    price: 29,
    desc: "Pour démarrer",
    features: ["5 concurrents", "50 produits", "Alertes email", "Rapport hebdo", "Historique 30j"],
    missing: ["Scan 6h", "Export CSV", "API"],
    highlight: false,
  },
  {
    name: "Growth",
    price: 79,
    desc: "Le plus populaire",
    features: ["20 concurrents", "500 produits", "Scan toutes les 6h", "Alertes illimitées", "Rapport quotidien", "Historique 90j", "Export CSV"],
    missing: ["API", "Manager dédié"],
    highlight: true,
  },
  {
    name: "Pro",
    price: 199,
    desc: "Pour les équipes",
    features: ["Illimité", "5 000 produits", "Scan horaire", "Tout en temps réel", "Historique illimité", "API complète", "Multi-utilisateurs"],
    missing: [],
    highlight: false,
  },
]

function PricingCard({ plan }: { plan: typeof PLANS[0] }) {
  return (
    <div className={`relative rounded-2xl p-6 flex flex-col ${plan.highlight ? "bg-[#8B5CF6] text-white ring-2 ring-[#8B5CF6]/50" : "bg-white/4 border border-white/10 text-white"}`}>
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#7C3AED] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
          Recommandé
        </div>
      )}
      <div className="mb-1">
        <span className={`text-xs font-bold uppercase tracking-widest ${plan.highlight ? "text-violet-200" : "text-[#A78BFA]"}`}>{plan.name}</span>
      </div>
      <p className={`text-xs mb-5 ${plan.highlight ? "text-violet-200" : "text-gray-500"}`}>{plan.desc}</p>
      <div className="mb-6">
        <span className="text-5xl font-black">{plan.price}€</span>
        <span className={`text-sm ml-1 ${plan.highlight ? "text-violet-200" : "text-gray-500"}`}>/mois</span>
      </div>
      <ul className="space-y-2.5 flex-1 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm">
            <Check className={`h-4 w-4 flex-shrink-0 ${plan.highlight ? "text-white" : "text-[#8B5CF6]"}`} />
            <span className={plan.highlight ? "text-violet-100" : "text-gray-300"}>{f}</span>
          </li>
        ))}
        {plan.missing.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm opacity-30">
            <X className="h-4 w-4 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/auth/register"
        className={`w-full text-center py-3 rounded-xl font-bold text-sm transition-colors ${plan.highlight ? "bg-white text-[#7C3AED] hover:bg-violet-50" : "bg-[#8B5CF6] text-white hover:bg-[#7C3AED]"}`}
      >
        Démarrer gratuitement
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#08090C] text-white">
      <Nav />
      <div className="h-16" />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-8 px-5 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#8B5CF6]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            Surveillance active — 47 changements de prix détectés aujourd'hui
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Vos concurrents<br />
            <span className="text-[#8B5CF6]">bougent leurs prix.</span><br />
            <span className="text-gray-400">Vous en êtes le premier informé.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Conforva surveille vos concurrents 24h/24 et vous envoie chaque semaine les actions concrètes à prendre sur vos prix.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register" className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-[#8B5CF6]/25">
              Essai gratuit 14 jours <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#comment" className="text-gray-400 hover:text-white text-sm transition-colors">
              Voir comment ça marche →
            </Link>
          </div>
          <p className="text-xs text-gray-600 mt-4">Aucune CB · Sans engagement · Résiliable en 1 clic</p>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────────────────────── */}
      <LiveTicker />

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-px bg-white/6 rounded-2xl overflow-hidden">
          {[
            { value: "47×", label: "changements détectés par concurrent / jour" },
            { value: "< 1h", label: "délai de détection d'une baisse de prix" },
            { value: "+23%", label: "de marge récupérée en moyenne en 3 mois" },
          ].map((s, i) => (
            <div key={i} className="bg-[#08090C] px-6 py-8 text-center">
              <p className="text-4xl md:text-5xl font-black text-[#8B5CF6]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-[140px] mx-auto">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DASHBOARD VISUAL ─────────────────────────────────────────────────── */}
      <section className="py-8 px-5">
        <div className="max-w-5xl mx-auto">
          <DashboardMock />
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section id="comment" className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A78BFA] mb-3">Fonctionnement</p>
            <h2 className="text-4xl font-black tracking-tight">Opérationnel en 5 minutes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-px bg-gradient-to-r from-[#8B5CF6]/30 via-[#8B5CF6]/60 to-[#8B5CF6]/30" />
            {[
              {
                step: "1",
                icon: <Eye className="h-6 w-6" />,
                title: "Ajoutez vos concurrents",
                desc: "URL d'une boutique Shopify, Amazon, WooCommerce ou n'importe quel site. On détecte tout automatiquement.",
                visual: (
                  <div className="rounded-xl bg-white/4 border border-white/8 p-3 mt-4 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-5 w-5 rounded bg-[#8B5CF6]/20 flex items-center justify-center"><Package className="h-2.5 w-2.5 text-[#A78BFA]" /></div>
                      <span className="text-[10px] text-gray-400">Ajout d'un concurrent</span>
                    </div>
                    <div className="bg-white/5 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
                      <span className="text-[10px] text-gray-600">https://</span>
                      <span className="text-[10px] text-gray-300">zalando.fr/chaussures</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-[#8B5CF6]" />
                      <span className="text-[10px] text-[#A78BFA]">Shopify détecté · 142 produits trouvés</span>
                    </div>
                  </div>
                ),
              },
              {
                step: "2",
                icon: <Activity className="h-6 w-6" />,
                title: "On surveille en continu",
                desc: "Prix, stocks, nouvelles références — chaque changement capturé et horodaté, toutes les heures.",
                visual: (
                  <div className="rounded-xl bg-white/4 border border-white/8 p-3 mt-4">
                    <div className="space-y-1.5">
                      {[
                        { t: "08:14", txt: "Nike Air Max → 109.99€", type: "down" },
                        { t: "09:02", txt: "Sony WH → 279.00€", type: "down" },
                        { t: "11:30", txt: "Dyson V15 → 749.00€", type: "up" },
                      ].map((e) => (
                        <div key={e.t} className="flex items-center gap-2 text-[10px]">
                          <span className="text-gray-600">{e.t}</span>
                          <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${e.type === "down" ? "bg-emerald-400" : "bg-red-400"}`} />
                          <span className="text-gray-300">{e.txt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                step: "3",
                icon: <Zap className="h-6 w-6" />,
                title: "On vous dit quoi faire",
                desc: "Chaque semaine : un rapport clair avec les actions prioritaires sur vos prix. Pas des données — des décisions.",
                visual: (
                  <div className="rounded-xl bg-[#8B5CF6]/12 border border-[#8B5CF6]/25 p-3 mt-4">
                    <p className="text-[10px] font-bold text-[#A78BFA] mb-1.5">Cette semaine — Actions prioritaires</p>
                    <div className="space-y-1.5">
                      {[
                        "→ Baisser Nike Air Max à 105€",
                        "→ Profiter rupture Fnac sur Sony",
                        "→ Surveiller Darty sur Dyson",
                      ].map((a) => (
                        <p key={a} className="text-[10px] text-gray-300">{a}</p>
                      ))}
                    </div>
                  </div>
                ),
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
                    {step.icon}
                  </div>
                  <span className="text-5xl font-black text-white/5">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                {step.visual}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER VISUAL ────────────────────────────────────────────── */}
      <section className="py-16 px-5 border-t border-white/6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight">Avant vs Après Conforva</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">Sans Conforva</p>
              <div className="space-y-4">
                {[
                  { icon: "⏳", text: "2h par jour à surveiller manuellement" },
                  { icon: "😱", text: "Vous découvrez les baisses trop tard" },
                  { icon: "❓", text: "Vous ne savez pas quel prix fixer" },
                  { icon: "💸", text: "Vous perdez des ventes pendant les ruptures concurrentes" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/8 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#A78BFA] mb-5">Avec Conforva</p>
              <div className="space-y-4">
                {[
                  { icon: <Check className="h-4 w-4 text-[#8B5CF6]" />, text: "Surveillance automatique 24h/24, 7j/7" },
                  { icon: <Check className="h-4 w-4 text-[#8B5CF6]" />, text: "Alertes en moins d'1h après chaque baisse" },
                  { icon: <Check className="h-4 w-4 text-[#8B5CF6]" />, text: "Rapport hebdo avec les prix recommandés" },
                  { icon: <Check className="h-4 w-4 text-[#8B5CF6]" />, text: "Opportunités de rupture captées automatiquement" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                    <p className="text-sm text-gray-200 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="py-16 px-5 border-t border-white/6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black tracking-tight">Tout ce dont vous avez besoin</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Bell className="h-5 w-5" />, title: "Alertes instantanées", desc: "Email dès qu'un concurrent baisse son prix ou est en rupture. Seuils configurables." },
              { icon: <BarChart3 className="h-5 w-5" />, title: "Historique de prix", desc: "Courbes de prix sur 90 jours. Identifiez les cycles saisonniers et les stratégies concurrentes." },
              { icon: <Zap className="h-5 w-5" />, title: "Rapport hebdo actionnable", desc: "Chaque lundi : tendances de la semaine + actions prioritaires. Directement applicable." },
              { icon: <Package className="h-5 w-5" />, title: "Nouveaux produits détectés", desc: "Sachez avant tout le monde quand un concurrent lance une nouvelle référence." },
              { icon: <Eye className="h-5 w-5" />, title: "Positionnement temps réel", desc: "Où vous situez-vous par rapport à chaque concurrent sur votre catalogue complet." },
              { icon: <ShieldCheck className="h-5 w-5" />, title: "Multi-plateforme", desc: "Shopify, Amazon, WooCommerce, PrestaShop — on s'adapte à votre marché." },
            ].map((f) => (
              <div key={f.title} className="group bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/5 transition-all cursor-default">
                <div className="h-9 w-9 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center text-[#8B5CF6] mb-3 group-hover:bg-[#8B5CF6]/25 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-bold text-white mb-1.5 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ───────────────────────────────────────────────────────── */}
      <section className="py-16 px-5 border-t border-white/6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight">Conforva vs les alternatives</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left p-4 text-gray-500 font-medium">Fonctionnalité</th>
                  <th className="text-center p-4 text-[#A78BFA] font-bold">Conforva</th>
                  <th className="text-center p-4 text-gray-600 font-medium">Prisync</th>
                  <th className="text-center p-4 text-gray-600 font-medium">Minderest</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Suivi prix en temps réel", true, true, true],
                  ["Alertes automatiques", true, true, true],
                  ["Rapport d'analyse hebdo", true, false, false],
                  ["Recommandations de prix", true, false, false],
                  ["Détection nouveaux produits", true, false, true],
                  ["Shopify + Amazon + WooCommerce", true, true, false],
                  ["Prix accessible (< 100€/mois)", true, false, false],
                ].map(([feat, us, p, m], i) => (
                  <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/1" : ""}`}>
                    <td className="p-4 text-gray-300 text-sm">{feat as string}</td>
                    <td className="p-4 text-center">{us ? <Check className="h-4 w-4 text-[#8B5CF6] mx-auto" /> : <X className="h-4 w-4 text-gray-700 mx-auto" />}</td>
                    <td className="p-4 text-center">{p ? <Check className="h-4 w-4 text-gray-500 mx-auto" /> : <X className="h-4 w-4 text-gray-700 mx-auto" />}</td>
                    <td className="p-4 text-center">{m ? <Check className="h-4 w-4 text-gray-500 mx-auto" /> : <X className="h-4 w-4 text-gray-700 mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────────── */}
      <section id="tarifs" className="py-24 px-5 border-t border-white/6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A78BFA] mb-3">Tarifs</p>
            <h2 className="text-4xl font-black tracking-tight">Simple et transparent</h2>
            <p className="text-gray-400 mt-3 text-sm">14 jours d'essai gratuit sur tous les plans. Aucune CB requise.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => <PricingCard key={plan.name} plan={plan} />)}
          </div>
          <p className="text-center mt-8 text-sm text-gray-500">
            Volume ou besoins spécifiques ?{" "}
            <Link href="/enterprise" className="text-[#A78BFA] hover:underline">Contactez-nous pour Enterprise →</Link>
          </p>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-5 border-t border-white/6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-orange-400 text-xs font-semibold mb-6 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
            <AlertTriangle className="h-3.5 w-3.5" />
            Pendant que vous lisez ça, vos concurrents ont peut-être déjà changé leurs prix
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Commencez à surveiller<br />
            <span className="text-[#8B5CF6]">vos concurrents maintenant</span>
          </h2>
          <p className="text-gray-400 mb-8 text-sm">Configuration en 5 minutes. Premier rapport dans 24h.</p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold px-10 py-4 rounded-xl text-base transition-all shadow-xl shadow-[#8B5CF6]/20">
            Démarrer gratuitement <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-xs text-gray-600 mt-4">Aucune CB · 14 jours gratuits · Résiliable à tout moment</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/6 bg-[#05060A] py-12 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-3">
                <ConforvaLogo size={24} />
                <span className="font-black text-white tracking-tight" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Veille concurrentielle automatisée pour les e-commerçants qui veulent gagner la guerre des prix.
              </p>
              <p className="mt-3 text-xs text-gray-600">contact.conforva@gmail.com</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-3">Produit</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/#comment" className="hover:text-white transition-colors">Comment ça marche</Link></li>
                <li><Link href="/#tarifs" className="hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-3">Entreprise</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-3">Légal</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/cgu" className="hover:text-white transition-colors">CGU</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-700">© 2026 Conforva. Tous droits réservés.</p>
            <p className="text-xs text-gray-700">Analyse propulsée par intelligence artificielle</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  )
}
