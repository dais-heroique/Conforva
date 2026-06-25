"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, ChevronRight, X,
  FileText, Shield, Zap, AlertTriangle,
  Package, Tag, Settings, LayoutDashboard,
} from "lucide-react"

function FadeIn({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={className}>
      {children}
    </motion.div>
  )
}

// ── DASHBOARD MOCK ──────────────────────────────────────────────────────────
function DashboardMock() {
  const [activeNav, setActiveNav] = useState<"dashboard" | "products" | "documents" | "labels" | "rp">("products")

  const navItems = [
    { id: "dashboard" as const, icon: LayoutDashboard, label: "Tableau de bord" },
    { id: "products" as const, icon: Package, label: "Produits" },
    { id: "documents" as const, icon: FileText, label: "Documents" },
    { id: "labels" as const, icon: Tag, label: "Étiquettes" },
    { id: "rp" as const, icon: Shield, label: "Pers. Responsable" },
    { id: null as any, icon: Settings, label: "Paramètres" },
  ]

  const products = [
    { name: "Bougie soja vanille 200g", ref: "BG-SOY-200", score: 94, status: "conforme" as const, updated: "Il y a 2j" },
    { name: "Diffuseur huile essentielle", ref: "DIF-HE-100", score: 87, status: "conforme" as const, updated: "Il y a 5j" },
    { name: "Savon surgras karité", ref: "SAV-KRT-80", score: 81, status: "conforme" as const, updated: "Il y a 1 sem." },
    { name: "Baume lèvres naturel", ref: "BLV-NAT-15", score: 52, status: "en cours" as const, updated: "Aujourd'hui" },
    { name: "Huile végétale argan", ref: "HVA-ARG-30", score: 0, status: "non démarré" as const, updated: "—" },
  ]

  const documents = [
    { name: "Bougie soja vanille 200g", type: "Dossier technique", date: "03/06/2025", status: "signé" as const },
    { name: "Bougie soja vanille 200g", type: "Décl. conformité", date: "03/06/2025", status: "signé" as const },
    { name: "Diffuseur huile essentielle", type: "Dossier technique", date: "28/05/2025", status: "signé" as const },
    { name: "Savon surgras karité", type: "Dossier technique", date: "21/05/2025", status: "signé" as const },
    { name: "Baume lèvres naturel", type: "Dossier technique", date: "07/06/2025", status: "brouillon" as const },
  ]

  const statusColor = (s: string) =>
    s === "conforme" ? "text-emerald-700 bg-emerald-50" :
    s === "en cours" ? "text-amber-700 bg-amber-50" :
    "text-gray-400 bg-gray-100"

  const scoreColor = (n: number) =>
    n >= 80 ? "bg-emerald-500" : n >= 40 ? "bg-amber-400" : "bg-gray-200"

  return (
    <div className="rounded-2xl border border-gray-200 shadow-2xl overflow-hidden bg-white select-none">
      <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1.5 bg-white rounded-md px-3 py-1 text-[11px] text-gray-400 border border-gray-200 w-52 justify-center">
            <span className="text-gray-300">🔒</span> conforva.com/dashboard
          </div>
        </div>
      </div>
      <div className="sm:hidden flex items-center justify-between px-3 py-2.5 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="Conforva" className="h-6 w-6 rounded-md object-contain" />
          <span className="font-bold text-gray-900 text-sm">Conforva</span>
        </div>
      </div>
      <div className="sm:hidden flex border-b border-gray-100 bg-white overflow-x-auto">
        {navItems.filter(i => i.id).map(item => (
          <button key={item.label} onClick={() => item.id && setActiveNav(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2 px-3 text-[10px] font-medium transition-colors whitespace-nowrap min-w-fit ${
              activeNav === item.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"
            }`}>
            <item.icon className="h-4 w-4" />
            {item.label.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="flex min-h-[340px]">
        <aside className="hidden sm:flex flex-col w-44 border-r border-gray-100 py-4 gap-0.5 shrink-0">
          {navItems.map(item => (
            <button key={item.label} onClick={() => item.id && setActiveNav(item.id)}
              className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors mx-2 rounded-lg ${
                activeNav === item.id
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}>
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </aside>

        <div className="flex-1 overflow-hidden">
          {activeNav === "products" && (
            <div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Mes produits</p>
                <button className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 rounded-lg px-2.5 py-1.5">
                  + Ajouter
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {products.map(p => (
                  <div key={p.ref} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50/60 transition-colors cursor-pointer">
                    <div className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <Package className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">{p.name}</p>
                      <p className="text-[10px] text-gray-400">{p.ref}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 w-16 shrink-0">
                      <div className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden">
                        <div className={`h-full rounded-full ${scoreColor(p.score)}`} style={{ width: `${p.score}%` }} />
                      </div>
                      <span className="text-[10px] font-semibold text-gray-500 w-6 text-right">{p.score || "—"}</span>
                    </div>
                    <span className={`hidden sm:inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusColor(p.status)}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeNav === "documents" && (
            <div>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Documents générés</p>
              </div>
              <div className="divide-y divide-gray-50">
                {documents.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50/60">
                    <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">{d.name}</p>
                      <p className="text-[10px] text-gray-400">{d.type} · {d.date}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${d.status === "signé" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{d.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(activeNav === "dashboard" || activeNav === "labels" || activeNav === "rp") && (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <p className="text-xs text-gray-300">Sélectionnez un onglet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── PLANS ───────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Gratuit", price: "0", sub: "1 produit",
    features: ["1 dossier technique", "Analyse de risques", "Déclaration UE", "2 langues"],
    cta: "Commencer", href: "/auth/login", highlight: false,
  },
  {
    name: "Starter", price: "29", sub: "jusqu'à 5 produits / mois",
    features: ["5 dossiers techniques", "Analyse de risques ISO 12100", "Déclaration UE", "3 langues", "Alertes normes"],
    cta: "Choisir Starter", href: "/auth/login", highlight: false,
  },
  {
    name: "Growth", price: "79", sub: "jusqu'à 30 produits / mois",
    features: ["30 dossiers techniques", "5 langues", "Import Shopify", "Personne Responsable EU", "Support prioritaire"],
    cta: "Choisir Growth", href: "/auth/login", highlight: true,
  },
  {
    name: "Pro", price: "199", sub: "jusqu'à 150 produits / mois",
    features: ["150 dossiers techniques", "7 langues", "Import Shopify + CSV", "Alertes normes", "Support dédié"],
    cta: "Choisir Pro", href: "/auth/login", highlight: false,
  },
]

// ── PAGE ────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [navVisible, setNavVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    function onScroll() {
      const current = window.scrollY
      if (current < 80) setNavVisible(true)
      else if (current > lastScrollY.current + 4) setNavVisible(false)
      else if (current < lastScrollY.current - 4) setNavVisible(true)
      lastScrollY.current = current
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-gray-900 overflow-x-hidden">

      {/* ── NAV ── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm transition-transform duration-300 ${
          navVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/favicon.png" alt="Conforva" className="h-8 w-8 object-contain" />
            <span className="font-bold text-gray-900">Conforva</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-500">
            <Link href="/audit-gratuit" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Audit gratuit</Link>
            <a href="#comment" className="hover:text-gray-900 transition-colors">Comment ça marche</a>
            <a href="#tarifs" className="hover:text-gray-900 transition-colors">Tarifs</a>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              Connexion
            </Link>
            <Link href="/auth/login">
              <Button size="sm" className="gap-1.5">Créer un compte <ChevronRight className="h-3.5 w-3.5" /></Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ── HERO ── */}
      <section className="px-5 pt-28 sm:pt-40 pb-16 sm:pb-24 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-6 bg-red-50 border border-red-100 rounded-full px-4 py-1.5">
            <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse shrink-0" />
            <span className="text-[11px] font-semibold text-red-700 tracking-wide uppercase">Obligatoire depuis déc. 2024 — GPSR (UE) 2023/988</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display text-[clamp(2.2rem,8vw,6rem)] leading-[0.93] tracking-tight text-gray-950 mb-6"
          >
            Conformité GPSR.<br />
            <em className="italic font-light text-blue-600">En 10 minutes.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto mb-8"
          >
            Dossier technique · Analyse de risques · Déclaration UE<br className="hidden sm:block" />
            Générés par IA pour chaque produit que vous vendez.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.28 }}
            className="flex flex-wrap gap-3 justify-center mb-4"
          >
            <Link href="/audit-gratuit">
              <Button size="lg" className="gap-2 text-base h-12 px-6">
                Tester gratuitement <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="gap-2 text-base h-12 px-6 text-gray-700">
                Créer un compte
              </Button>
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-xs text-gray-400">
            Sans inscription · Sans carte bancaire · Résultat en 30 secondes
          </motion.p>
        </div>
      </section>

      {/* ── CHIFFRES CHOC ── */}
      <section className="bg-gray-950 text-white py-10 px-5">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 sm:gap-8 text-center">
          {[
            { n: "50 000€", label: "Amende maximale", color: "text-red-400" },
            { n: "13 déc. 2024", label: "Date d'entrée en vigueur", color: "text-amber-400" },
            { n: "10 min", label: "Pour être conforme avec Conforva", color: "text-emerald-400" },
          ].map(({ n, label, color }) => (
            <div key={n}>
              <p className={`text-2xl sm:text-4xl font-black tabular-nums ${color}`}>{n}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUIT VISUEL ── */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-10">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">La plateforme</p>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-950">Tout vos produits. Un seul endroit.</h2>
          </FadeIn>
          <FadeIn>
            <DashboardMock />
          </FadeIn>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: Zap, title: "IA intégrée", desc: "Génère le contenu réglementaire automatiquement" },
              { icon: FileText, title: "PDF prêt à signer", desc: "Export en 1 clic, structuré selon l'Art. 22 GPSR" },
              { icon: Shield, title: "Toujours à jour", desc: "Alertes automatiques si une norme change" },
            ].map(({ icon: Icon, title, desc }) => (
              <FadeIn key={title}>
                <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500 mt-1">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section id="comment" className="py-16 sm:py-24 px-5 bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">Simple</p>
            <h2 className="text-2xl sm:text-4xl font-bold">3 étapes. C'est tout.</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { n: "01", icon: Package, title: "Décrivez votre produit", desc: "URL, nom, catégorie — ou importez depuis Shopify directement." },
              { n: "02", icon: Zap, title: "L'IA génère tout", desc: "Dossier technique, analyse de risques ISO 12100, déclaration de conformité UE." },
              { n: "03", icon: FileText, title: "Exportez en PDF", desc: "Prêt à soumettre à Amazon, Etsy ou aux autorités douanières." },
            ].map(({ n, icon: Icon, title, desc }) => (
              <FadeIn key={n}>
                <div className="relative">
                  <p className="text-5xl font-black text-white/10 mb-3">{n}</p>
                  <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-base font-bold mb-2">{title}</p>
                  <p className="text-sm text-gray-400">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIT GRATUIT BANNER ── */}
      <FadeIn>
        <section className="py-12 px-5 bg-blue-600 text-white text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-3">Outil gratuit</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Testez votre produit maintenant</h2>
          <p className="text-blue-200 text-sm mb-6">L'IA génère un vrai dossier de conformité complet. Gratuit. Sans inscription.</p>
          <Link href="/audit-gratuit">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 gap-2 font-semibold">
              Lancer l'audit gratuit <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      </FadeIn>

      {/* ── COMPARAISON RAPIDE ── */}
      <FadeIn>
        <section className="py-16 sm:py-24 px-5 bg-[#F9F8F5]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold">Conforva vs les alternatives</h2>
            </div>
            <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-sm">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 w-36"></th>
                    <th className="px-5 py-4 text-center text-xs font-bold text-blue-700 bg-blue-50/50">Conforva</th>
                    <th className="px-5 py-4 text-center text-xs font-semibold text-gray-400">Template Word</th>
                    <th className="px-5 py-4 text-center text-xs font-semibold text-gray-400">Expert juridique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["Temps", "< 10 min", "2-5 jours", "1-4 semaines"],
                    ["Coût", "dès 29€/mois", "Gratuit", "500-2 000€"],
                    ["Dossier Art. 22", true, "Partiel", true],
                    ["Analyse risques ISO 12100", true, false, true],
                    ["Mise à jour automatique", true, false, false],
                    ["Export PDF prêt", true, false, true],
                  ].map(([label, ...vals]) => (
                    <tr key={String(label)} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3 text-xs font-medium text-gray-600">{label as string}</td>
                      {vals.map((v, i) => (
                        <td key={i} className={`px-5 py-3 text-center text-xs ${i === 0 ? "bg-blue-50/30 font-semibold text-blue-800" : "text-gray-500"}`}>
                          {v === true ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                            : v === false ? <X className="h-4 w-4 text-gray-200 mx-auto" />
                            : v as string}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── TARIFS ── */}
      <section id="tarifs" className="py-16 sm:py-24 px-5 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-10">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">Tarifs</p>
            <h2 className="text-2xl sm:text-4xl font-bold">Simple et transparent</h2>
            <p className="text-sm text-gray-500 mt-2">Sans engagement · Résiliable à tout moment</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {PLANS.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 0.06}>
                <div className={`relative flex flex-col rounded-2xl border p-6 gap-5 ${
                  plan.highlight
                    ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-200"
                    : "border-gray-200 bg-white"
                }`}>
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900 px-3 py-0.5 text-[11px] font-bold text-white border-2 border-white">
                      Le plus populaire
                    </span>
                  )}
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>{plan.name}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black">{plan.price}€</span>
                      <span className={`text-sm ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>/mois</span>
                    </div>
                    <p className={`text-xs mt-1 font-medium ${plan.highlight ? "text-blue-200" : "text-blue-600"}`}>{plan.sub}</p>
                  </div>
                  <ul className="flex-1 space-y-2">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-blue-100" : "text-gray-600"}`}>
                        <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${plan.highlight ? "text-blue-300" : "text-emerald-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button className="w-full" variant={plan.highlight ? "secondary" : "outline"}>{plan.cta}</Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-5 rounded-2xl border-2 border-gray-900 bg-gray-950 text-white p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-1">
                <p className="font-bold text-base">Enterprise — volume et besoins spécifiques</p>
                <p className="text-sm text-gray-400 mt-1">Intégration API · Volume illimité · Accompagnement dédié</p>
              </div>
              <Link href="/enterprise" className="shrink-0">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                  Nous contacter <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <FadeIn>
        <section className="py-16 sm:py-24 px-5 bg-gray-950 text-white text-center">
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black leading-tight">
              1 produit gratuit.<br />
              <span className="text-blue-400">Dès maintenant.</span>
            </h2>
            <p className="text-gray-400 text-sm">Aucune carte bancaire · Compte créé en 30 secondes</p>
            <Link href="/auth/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 gap-2 text-base h-12 px-8">
                Créer mon compte gratuit <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-800 bg-gray-950 py-10 px-5 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
                <span className="font-bold text-white">Conforva</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">Conformité GPSR simplifiée pour les e-commerçants EU.</p>
              <p className="mt-3 text-xs">contact.conforva@gmail.com</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Produit</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/audit-gratuit" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Audit GPSR gratuit</Link></li>
                <li><a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
                <li><Link href="/partenaires" className="hover:text-white transition-colors">Affiliés</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Ressources</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog GPSR</Link></li>
                <li><Link href="/conformite-gpsr" className="hover:text-white transition-colors">Guide GPSR</Link></li>
                <li><Link href="/gpsr-amazon" className="hover:text-white transition-colors">GPSR Amazon</Link></li>
                <li><Link href="/gpsr-shopify" className="hover:text-white transition-colors">GPSR Shopify</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Légal</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/cgu" className="hover:text-white transition-colors">CGU</Link></li>
                <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <p>© 2026 Conforva. Tous droits réservés.</p>
            <p>Conforme RGPD · Hébergé en Europe</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
