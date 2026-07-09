"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ConforvaLogo } from "@/components/logo"
import { ArrowRight, Bell, RefreshCw, BarChart3, Zap, ShieldCheck, ChevronRight, Check, X, AlertTriangle, Package, Eye } from "lucide-react"

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#060D09]/90 backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <ConforvaLogo size={28} />
          <span className="font-black text-white tracking-tight" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <Link href="/#fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</Link>
          <Link href="/#tarifs" className="hover:text-white transition-colors">Tarifs</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5">
            Connexion
          </Link>
          <Link
            href="/auth/register"
            className="flex items-center gap-1.5 bg-[#00E676] hover:bg-[#00c964] text-[#060D09] font-bold text-sm px-4 py-2 rounded-xl transition-colors"
          >
            Essai gratuit <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  )
}

// ─── Live price ticker ────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  { name: "Nike Air Max 270", old: "129.99", new: "109.99", dir: "down", competitor: "Zalando" },
  { name: "Sony WH-1000XM5", old: "349.00", new: "279.00", dir: "down", competitor: "Fnac" },
  { name: "Dyson V15 Detect", old: "699.00", new: "749.00", dir: "up", competitor: "Darty" },
  { name: "Apple AirPods Pro", old: "249.00", new: "199.00", dir: "down", competitor: "Amazon" },
  { name: "Samsung 65\" QLED", old: "1199.00", new: "899.00", dir: "down", competitor: "Boulanger" },
  { name: "Lego Technic 42183", old: "89.99", new: "74.99", dir: "down", competitor: "JouéClub" },
  { name: "Adidas Ultraboost 23", old: "189.00", new: "219.00", dir: "up", competitor: "Sport 2000" },
]

function LiveTicker() {
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-white/3 py-3">
      <div className="flex gap-8 whitespace-nowrap" style={{ animation: "ticker 25s linear infinite", width: "max-content" }}>
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <div key={i} className="inline-flex items-center gap-2.5 text-sm">
            <span className="text-gray-500">{item.competitor}</span>
            <span className="text-gray-300">{item.name}</span>
            <span className="text-gray-500 line-through">{item.old}€</span>
            <span className={item.dir === "down" ? "text-[#00E676] font-semibold" : "text-red-400 font-semibold"}>
              {item.dir === "down" ? "↓" : "↑"} {item.new}€
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Dashboard mockup ─────────────────────────────────────────────────────────

function DashboardMock() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="absolute inset-0 bg-[#00E676]/10 blur-3xl rounded-3xl" />
      <div className="relative bg-[#0D1611] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
          <span className="text-xs text-gray-600 ml-2">conforva.com/dashboard</span>
        </div>
        <div className="flex">
          <div className="w-14 border-r border-white/8 flex flex-col items-center py-4 gap-4">
            <BarChart3 className="h-4 w-4 text-[#00E676]" />
            <Eye className="h-4 w-4 text-gray-600" />
            <Bell className="h-4 w-4 text-gray-600" />
            <Package className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1 p-4 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Concurrents", value: "7", sub: "+2 ce mois", green: true },
                { label: "Produits suivis", value: "284", sub: "+18 ce mois", green: true },
                { label: "Alertes 24h", value: "12", sub: "3 urgentes", green: false },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white/5 rounded-xl p-3">
                  <p className="text-xs text-gray-500">{kpi.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
                  <p className={`text-xs mt-0.5 ${kpi.green ? "text-[#00E676]" : "text-orange-400"}`}>{kpi.sub}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-300">Changements de prix récents</p>
                <span className="text-xs text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full">Live</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Nike Air Max 270", competitor: "Zalando", change: "-15%", amount: "-20€", type: "down" },
                  { name: "Sony WH-1000XM5", competitor: "Fnac", change: "-20%", amount: "-70€", type: "down" },
                  { name: "Dyson V15 Detect", competitor: "Darty", change: "+7%", amount: "+50€", type: "up" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div>
                      <p className="text-gray-200 font-medium">{item.name}</p>
                      <p className="text-gray-500">{item.competitor}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${item.type === "down" ? "text-[#00E676]" : "text-red-400"}`}>{item.change}</p>
                      <p className="text-gray-500">{item.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#00E676]/8 border border-[#00E676]/20 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <Zap className="h-3.5 w-3.5 text-[#00E676] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#00E676] mb-1">Analyse IA — Action recommandée</p>
                  <p className="text-xs text-gray-300 leading-relaxed">Zalando a baissé les Nike Air Max 270 de 15%. Descendre à 105€ vous positionne 4€ en dessous tout en maintenant votre marge à 28%.</p>
                </div>
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
    description: "Pour démarrer l'intelligence tarifaire",
    features: ["2 concurrents suivis", "20 produits suivis", "Mises à jour journalières", "5 alertes prix", "Rapport hebdo IA", "Historique 30j"],
    missing: ["Scraping multi-plateforme", "Rapport quotidien", "API"],
    highlight: false,
  },
  {
    name: "Growth",
    price: 79,
    description: "Pour les e-commerçants ambitieux",
    features: ["10 concurrents suivis", "150 produits suivis", "Mises à jour 2x/jour", "Alertes illimitées", "Rapport IA quotidien", "Historique 90j", "Scraping multi-plateforme", "Export CSV"],
    missing: ["API accès", "Manager dédié"],
    highlight: true,
  },
  {
    name: "Pro",
    price: 199,
    description: "Pour les équipes e-com avancées",
    features: ["Concurrents illimités", "Produits illimités", "Mises à jour horaires", "Alertes illimitées", "Rapport IA temps réel", "Historique illimité", "API complète", "Multi-utilisateurs", "Manager dédié"],
    missing: [],
    highlight: false,
  },
]

function PricingCard({ plan }: { plan: typeof PLANS[0] }) {
  return (
    <div className={`relative rounded-2xl p-6 flex flex-col ${plan.highlight ? "bg-[#00E676] text-[#060D09]" : "bg-white/5 border border-white/10 text-white"}`}>
      {plan.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#060D09] text-[#00E676] text-xs font-bold px-3 py-1 rounded-full border border-[#00E676]/30 whitespace-nowrap">
          Le plus populaire
        </span>
      )}
      <p className={`font-bold text-lg ${plan.highlight ? "text-[#060D09]" : "text-white"}`}>{plan.name}</p>
      <p className={`text-xs mt-0.5 mb-4 ${plan.highlight ? "text-[#060D09]/70" : "text-gray-400"}`}>{plan.description}</p>
      <div className="mb-6">
        <span className={`text-4xl font-black ${plan.highlight ? "text-[#060D09]" : "text-white"}`}>{plan.price}€</span>
        <span className={`text-sm ml-1 ${plan.highlight ? "text-[#060D09]/70" : "text-gray-400"}`}>/mois</span>
      </div>
      <ul className="space-y-2.5 flex-1 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-[#060D09]" : "text-[#00E676]"}`} />
            <span className={plan.highlight ? "text-[#060D09]/90" : "text-gray-300"}>{f}</span>
          </li>
        ))}
        {plan.missing.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm opacity-40">
            <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/auth/register"
        className={`w-full text-center py-2.5 rounded-xl font-bold text-sm transition-colors ${plan.highlight ? "bg-[#060D09] text-[#00E676] hover:bg-[#0a1a0f]" : "bg-[#00E676] text-[#060D09] hover:bg-[#00c964]"}`}
      >
        Démarrer
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#060D09] text-white">
      <Nav />
      <div className="h-16" />

      {/* Hero */}
      <section className="relative pt-20 pb-10 px-5 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00E676]/8 blur-3xl rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Zap className="h-3 w-3" />
            Agent IA de veille concurrentielle — Bêta ouverte
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Vos concurrents<br />
            <span className="text-[#00E676]">baissent leurs prix.</span><br />
            <span className="text-gray-300">Vous le saurez en premier.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Conforva surveille les prix, stocks et nouveaux produits de vos concurrents 24h/24.
            Notre IA analyse chaque mouvement et vous dit exactement quoi faire.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register" className="flex items-center gap-2 bg-[#00E676] hover:bg-[#00c964] text-[#060D09] font-bold px-8 py-3.5 rounded-xl text-base transition-colors">
              Démarrer gratuitement <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#fonctionnalites" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1.5">
              Voir comment ça marche <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-gray-600 mt-4">Aucune CB · 14 jours d'essai · Résiliable à tout moment</p>
        </div>
      </section>

      <LiveTicker />

      {/* Stats */}
      <section className="py-12 px-5">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: "47×", label: "changements de prix/jour par concurrent en moyenne" },
            { value: "< 1h", label: "délai moyen de détection d'une baisse de prix" },
            { value: "+23%", label: "de marge récupérée par nos clients en 3 mois" },
          ].map((s) => (
            <div key={s.value}>
              <p className="text-4xl md:text-5xl font-black text-[#00E676]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard visual */}
      <section className="py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <DashboardMock />
        </div>
      </section>

      {/* How it works */}
      <section id="fonctionnalites" className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black tracking-tight">Comment ça marche</h2>
            <p className="text-gray-400 mt-3">Trois étapes. Configuré en 5 minutes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: <Eye className="h-6 w-6" />, title: "Ajoutez vos concurrents", desc: "Entrez l'URL d'une boutique. On détecte automatiquement la plateforme (Shopify, Amazon, WooCommerce) et surveille tous ses produits." },
              { step: "02", icon: <RefreshCw className="h-6 w-6" />, title: "On scrape en continu", desc: "Prix, stocks et nouveaux produits surveillés toutes les heures. Chaque changement est horodaté et archivé pour votre analyse." },
              { step: "03", icon: <Zap className="h-6 w-6" />, title: "L'IA vous dit quoi faire", desc: "Gemini AI analyse chaque mouvement et génère des recommandations concrètes : quel prix fixer, quand attaquer, quand défendre." },
            ].map((step) => (
              <div key={step.step}>
                <div className="text-6xl font-black text-white/5 mb-4">{step.step}</div>
                <div className="text-[#00E676] mb-3">{step.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 px-5 border-t border-white/8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black tracking-tight">Pas juste des chiffres. Des décisions.</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">La différence entre Conforva et un simple comparateur de prix, c'est notre couche d'analyse IA.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Bell className="h-5 w-5" />, title: "Alertes instantanées", desc: "Email dès qu'un concurrent bouge un prix ou rompt un stock. Seuils configurables par produit." },
              { icon: <BarChart3 className="h-5 w-5" />, title: "Historique de prix", desc: "Graphiques interactifs sur 90 jours pour chaque produit concurrent. Identifiez les patterns saisonniers." },
              { icon: <Zap className="h-5 w-5" />, title: "Analyse IA hebdomadaire", desc: "Rapport Gemini AI tous les lundis : tendances, opportunités, menaces. Actionnable, pas descriptif." },
              { icon: <Package className="h-5 w-5" />, title: "Détection nouveaux produits", desc: "Sachez avant tout le monde quand un concurrent lance un nouveau produit sur votre marché." },
              { icon: <Eye className="h-5 w-5" />, title: "Positionnement temps réel", desc: "Voyez où vous vous situez par rapport à chaque concurrent sur l'ensemble de votre catalogue." },
              { icon: <ShieldCheck className="h-5 w-5" />, title: "Multi-plateforme", desc: "Shopify, Amazon, WooCommerce, PrestaShop, et tout site custom. On s'adapte à votre marché." },
            ].map((f) => (
              <div key={f.title} className="bg-white/4 border border-white/8 rounded-2xl p-5 hover:border-[#00E676]/30 transition-colors">
                <div className="text-[#00E676] mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-5 border-t border-white/8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight">Conforva vs les alternatives</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-gray-400 font-medium w-1/3">Fonctionnalité</th>
                  <th className="text-center p-4 text-[#00E676] font-bold">Conforva</th>
                  <th className="text-center p-4 text-gray-500 font-medium">Prisync</th>
                  <th className="text-center p-4 text-gray-500 font-medium">Minderest</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Suivi de prix en temps réel", true, true, true],
                  ["Alertes automatiques", true, true, true],
                  ["Analyse IA des tendances", true, false, false],
                  ["Recommandations de repricing", true, false, false],
                  ["Rapport hebdo IA", true, false, false],
                  ["Détection nouveaux produits", true, false, true],
                  ["Shopify + Amazon + WooCommerce", true, true, false],
                  ["Prix accessible PME (< 100€)", true, false, false],
                ].map(([feat, us, p, m], i) => (
                  <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/2" : ""}`}>
                    <td className="p-4 text-gray-300">{feat as string}</td>
                    <td className="p-4 text-center">{us ? <Check className="h-4 w-4 text-[#00E676] mx-auto" /> : <X className="h-4 w-4 text-gray-600 mx-auto" />}</td>
                    <td className="p-4 text-center">{p ? <Check className="h-4 w-4 text-gray-400 mx-auto" /> : <X className="h-4 w-4 text-gray-600 mx-auto" />}</td>
                    <td className="p-4 text-center">{m ? <Check className="h-4 w-4 text-gray-400 mx-auto" /> : <X className="h-4 w-4 text-gray-600 mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-20 px-5 border-t border-white/8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black tracking-tight">Tarifs transparents</h2>
            <p className="text-gray-400 mt-3">14 jours d'essai gratuit sur tous les plans. Aucune CB requise.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => <PricingCard key={plan.name} plan={plan} />)}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Besoin de plus ?{" "}
              <Link href="/enterprise" className="text-[#00E676] hover:underline">Contactez-nous pour Enterprise →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 px-5 border-t border-white/8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-[#00E676] text-sm mb-6">
            <AlertTriangle className="h-4 w-4" />
            Pendant que vous lisez ça, vos concurrents ont peut-être déjà changé leurs prix.
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Commencez à surveiller<br />vos concurrents maintenant
          </h2>
          <p className="text-gray-400 mb-8">Configuration en 5 minutes. Premier rapport IA dans 24h.</p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 bg-[#00E676] hover:bg-[#00c964] text-[#060D09] font-bold px-10 py-4 rounded-xl text-base transition-colors">
            Essai gratuit 14 jours <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 bg-[#030806] py-12 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-3">
                <ConforvaLogo size={24} />
                <span className="font-black text-white tracking-tight" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Agent IA de veille concurrentielle pour les e-commerçants qui veulent gagner la guerre des prix.
              </p>
              <p className="mt-3 text-xs text-gray-600">contact.conforva@gmail.com</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-3">Produit</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/#fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link href="/#tarifs" className="hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-3">Entreprise</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-3">Légal</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/cgu" className="hover:text-white transition-colors">CGU</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">© {new Date().getFullYear()} Conforva. Tous droits réservés.</p>
            <p className="text-xs text-gray-600">Intelligence artificielle propulsée par Gemini AI</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  )
}
