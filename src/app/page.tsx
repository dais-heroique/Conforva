"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ConforvaLogo } from "@/components/logo"
import {
  CheckCircle2, ArrowRight, ChevronRight, X,
  FileText, Shield, Zap, Package, Tag, Settings, LayoutDashboard,
} from "lucide-react"

function FadeIn({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}>
      {children}
    </motion.div>
  )
}

// ── DASHBOARD MOCK ──────────────────────────────────────────────────────────
function DashboardMock() {
  const [active, setActive] = useState<"products" | "documents">("products")

  const products = [
    { name: "Bougie soja vanille 200g", ref: "BG-SOY-200", score: 94, status: "conforme" as const },
    { name: "Diffuseur huile essentielle", ref: "DIF-HE-100", score: 87, status: "conforme" as const },
    { name: "Savon surgras karité", ref: "SAV-KRT-80", score: 81, status: "conforme" as const },
    { name: "Baume lèvres naturel", ref: "BLV-NAT-15", score: 52, status: "en cours" as const },
    { name: "Huile végétale argan", ref: "HVA-ARG-30", score: 0, status: "non démarré" as const },
  ]

  const documents = [
    { name: "Bougie soja vanille 200g", type: "Dossier technique", status: "signé" as const },
    { name: "Bougie soja vanille 200g", type: "Décl. conformité", status: "signé" as const },
    { name: "Diffuseur huile essentielle", type: "Dossier technique", status: "signé" as const },
    { name: "Savon surgras karité", type: "Dossier technique", status: "signé" as const },
    { name: "Baume lèvres naturel", type: "Dossier technique", status: "brouillon" as const },
  ]

  const scoreBar = (n: number) => n >= 80 ? "bg-[#00E676]" : n >= 40 ? "bg-amber-400" : "bg-white/10"
  const statusPill = (s: string) =>
    s === "conforme" ? "text-[#00E676] bg-[#00E676]/10" :
    s === "en cours" ? "text-amber-400 bg-amber-400/10" :
    "text-white/30 bg-white/5"

  return (
    <div className="rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-[#0D160F] select-none">
      {/* Browser bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#0A100C] border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#00E676]/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1.5 bg-white/5 rounded-md px-3 py-1 text-[11px] text-white/30 border border-white/10 w-52 justify-center">
            🔒 conforva.com/dashboard
          </div>
        </div>
      </div>

      <div className="flex min-h-[340px]">
        {/* Sidebar */}
        <aside className="hidden sm:flex flex-col w-44 border-r border-white/10 py-4 gap-0.5 shrink-0 bg-[#0A100C]">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
            { id: "products", icon: Package, label: "Produits" },
            { id: "documents", icon: FileText, label: "Documents" },
            { id: "labels", icon: Tag, label: "Étiquettes" },
            { id: "rp", icon: Shield, label: "Pers. Responsable" },
            { id: "settings", icon: Settings, label: "Paramètres" },
          ].map(item => (
            <button key={item.id}
              onClick={() => (item.id === "products" || item.id === "documents") && setActive(item.id as any)}
              className={`flex items-center gap-2.5 px-3 py-2 text-xs mx-2 rounded-lg transition-colors ${
                active === item.id
                  ? "bg-[#00E676]/15 text-[#00E676] font-semibold"
                  : "text-white/30 hover:text-white/60 hover:bg-white/5"
              }`}>
              <item.icon className="h-3.5 w-3.5 shrink-0" />
              {item.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {active === "products" && (
            <div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <p className="text-sm font-semibold text-white">Mes produits</p>
                <button className="flex items-center gap-1 text-[11px] font-bold text-[#060D09] bg-[#00E676] rounded-lg px-2.5 py-1.5 hover:bg-[#00FF84] transition-colors">
                  + Ajouter
                </button>
              </div>
              <div className="divide-y divide-white/5">
                {products.map(p => (
                  <div key={p.ref} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/3 transition-colors cursor-pointer group">
                    <div className="h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <Package className="h-3.5 w-3.5 text-white/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/80 truncate">{p.name}</p>
                      <p className="text-[10px] text-white/30">{p.ref}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 w-16 shrink-0">
                      <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${scoreBar(p.score)}`} style={{ width: `${p.score}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-white/40 w-5 text-right">{p.score || "—"}</span>
                    </div>
                    <span className={`hidden sm:inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${statusPill(p.status)}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {active === "documents" && (
            <div>
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-sm font-semibold text-white">Documents générés</p>
              </div>
              <div className="divide-y divide-white/5">
                {documents.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/3">
                    <FileText className="h-4 w-4 text-[#00E676]/60 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/80 truncate">{d.name}</p>
                      <p className="text-[10px] text-white/30">{d.type}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${d.status === "signé" ? "text-[#00E676] bg-[#00E676]/10" : "text-amber-400 bg-amber-400/10"}`}>
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
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
    name: "Starter", price: "29", sub: "5 produits / mois",
    features: ["5 dossiers", "Analyse ISO 12100", "Déclaration UE", "3 langues", "Alertes normes"],
    cta: "Choisir Starter", href: "/auth/login", highlight: false,
  },
  {
    name: "Growth", price: "79", sub: "30 produits / mois",
    features: ["30 dossiers", "5 langues", "Import Shopify", "Personne Resp. EU", "Support prioritaire"],
    cta: "Choisir Growth", href: "/auth/login", highlight: true,
  },
  {
    name: "Pro", price: "199", sub: "150 produits / mois",
    features: ["150 dossiers", "7 langues", "Import Shopify + CSV", "Alertes normes", "Support dédié"],
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
    <div className="min-h-screen bg-[#060D09] text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#060D09]/95 backdrop-blur-sm transition-transform duration-300 ${
          navVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <ConforvaLogo size={28} />
            <span className="font-black text-white tracking-tight">CONFORVA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/50">
            <Link href="/audit-gratuit" className="text-[#00E676] font-bold hover:text-[#00FF84] transition-colors">Audit gratuit</Link>
            <Link href="/conformite-gpsr" className="hover:text-white transition-colors">Guide GPSR</Link>
            <a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden md:block text-sm text-white/40 hover:text-white px-3 py-1.5 transition-colors">
              Connexion
            </Link>
            <Link href="/auth/login">
              <Button size="sm" className="bg-[#00E676] text-[#060D09] hover:bg-[#00FF84] font-bold gap-1.5">
                Essai gratuit <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ── HERO ── */}
      <section className="relative px-5 pt-32 sm:pt-48 pb-20 sm:pb-32 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00E676]/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-8 bg-[#00E676]/10 border border-[#00E676]/30 rounded-full px-4 py-1.5">
            <span className="h-1.5 w-1.5 bg-[#00E676] rounded-full animate-pulse" />
            <span className="text-[11px] font-bold text-[#00E676] tracking-widest uppercase">
              GPSR (UE) 2023/988 — Obligatoire depuis déc. 2024
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="font-display text-[clamp(2.5rem,9vw,7rem)] leading-[0.9] tracking-tight text-white mb-6"
          >
            Conformité GPSR.<br />
            <span className="text-[#00E676]">En 10 minutes.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-xl text-white/50 max-w-lg mx-auto mb-10"
          >
            Dossier technique · Analyse de risques · Déclaration UE<br className="hidden sm:block" />
            Générés par IA pour chaque produit que vous vendez en Europe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28 }}
            className="flex flex-wrap gap-3 justify-center mb-5"
          >
            <Link href="/audit-gratuit">
              <Button size="lg" className="bg-[#00E676] text-[#060D09] hover:bg-[#00FF84] font-bold gap-2 h-13 px-7 text-base">
                Tester gratuitement <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="border-white/20 text-white/70 hover:bg-white/5 hover:text-white gap-2 h-13 px-7 text-base">
                Créer un compte
              </Button>
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-xs text-white/30">
            Sans inscription · Sans carte bancaire · Résultat en 30 secondes
          </motion.p>
        </div>
      </section>

      {/* ── 3 CHIFFRES CLÉS ── */}
      <section className="border-y border-white/10 py-8 px-5 bg-[#0A100C]">
        <div className="max-w-3xl mx-auto grid grid-cols-3 text-center gap-4">
          {[
            { n: "50 000€", sub: "Amende maximale GPSR", color: "text-red-400" },
            { n: "13 déc. 2024", sub: "Date d'entrée en vigueur", color: "text-amber-400" },
            { n: "< 10 min", sub: "Pour être conforme avec Conforva", color: "text-[#00E676]" },
          ].map(({ n, sub, color }) => (
            <div key={n}>
              <p className={`text-xl sm:text-4xl font-black tabular-nums ${color}`}>{n}</p>
              <p className="text-[11px] sm:text-sm text-white/30 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUIT VISUEL ── */}
      <section className="py-20 sm:py-28 px-5">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="text-xs font-bold text-[#00E676] uppercase tracking-widest mb-3">La plateforme</p>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Tous vos produits.<br />Un seul endroit.
            </h2>
          </FadeIn>
          <FadeIn>
            <DashboardMock />
          </FadeIn>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { icon: Zap, title: "IA intégrée", desc: "Contenu réglementaire généré automatiquement" },
              { icon: FileText, title: "PDF en 1 clic", desc: "Structuré selon l'Article 22 GPSR" },
              { icon: Shield, title: "Toujours à jour", desc: "Alertes si une norme applicable change" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.07}>
                <div className="bg-[#0D160F] rounded-2xl border border-white/10 p-4 text-center hover:border-[#00E676]/30 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-5 w-5 text-[#00E676]" />
                  </div>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="text-xs text-white/40 mt-1">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="py-20 sm:py-28 px-5 bg-[#0A100C] border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-bold text-[#00E676] uppercase tracking-widest mb-3">Simple</p>
            <h2 className="text-3xl sm:text-5xl font-black text-white">3 étapes. C'est tout.</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { n: "01", icon: Package, title: "Importez votre produit", desc: "URL, nom ou import Shopify direct." },
              { n: "02", icon: Zap, title: "L'IA génère tout", desc: "Dossier technique, analyse ISO 12100, déclaration UE." },
              { n: "03", icon: FileText, title: "Exportez en PDF", desc: "Prêt pour Amazon, Etsy ou les douanes." },
            ].map(({ n, icon: Icon, title, desc }, i) => (
              <FadeIn key={n} delay={i * 0.08}>
                <div className="relative">
                  <p className="text-8xl font-black text-white/5 leading-none mb-2">{n}</p>
                  <div className="h-12 w-12 rounded-2xl bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-[#00E676]" />
                  </div>
                  <p className="text-lg font-bold text-white mb-2">{title}</p>
                  <p className="text-sm text-white/40">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIT GRATUIT BANNER ── */}
      <FadeIn>
        <section className="py-14 px-5 bg-[#00E676] text-[#060D09] text-center">
          <p className="text-xs font-black uppercase tracking-widest mb-3 opacity-60">Outil gratuit — sans inscription</p>
          <h2 className="text-2xl sm:text-4xl font-black mb-3">Testez votre produit maintenant</h2>
          <p className="text-[#060D09]/70 text-sm mb-7">L'IA génère un vrai dossier de conformité complet en 30 secondes.</p>
          <Link href="/audit-gratuit">
            <Button size="lg" className="bg-[#060D09] text-[#00E676] hover:bg-black gap-2 font-black text-base h-13 px-8">
              Lancer l'audit gratuit <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </section>
      </FadeIn>

      {/* ── COMPARAISON ── */}
      <FadeIn>
        <section className="py-20 sm:py-28 px-5 bg-[#060D09]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-4xl font-black text-white">Conforva vs les alternatives</h2>
            </div>
            <div className="overflow-x-auto border border-white/10 rounded-2xl bg-[#0D160F]">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 text-left text-xs font-bold text-white/20 w-36"></th>
                    <th className="px-5 py-4 text-center text-xs font-black text-[#00E676]">Conforva</th>
                    <th className="px-5 py-4 text-center text-xs font-semibold text-white/30">Template Word</th>
                    <th className="px-5 py-4 text-center text-xs font-semibold text-white/30">Expert juridique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ["Temps", "< 10 min", "2-5 jours", "1-4 semaines"],
                    ["Coût", "dès 29€/mois", "Gratuit", "500-2 000€"],
                    ["Dossier Art. 22", true, "Partiel", true],
                    ["Analyse ISO 12100", true, false, true],
                    ["Mise à jour auto", true, false, false],
                    ["PDF prêt à signer", true, false, true],
                  ].map(([label, ...vals]) => (
                    <tr key={String(label)} className="hover:bg-white/3">
                      <td className="px-5 py-3 text-xs font-semibold text-white/50">{label as string}</td>
                      {vals.map((v, i) => (
                        <td key={i} className="px-5 py-3 text-center text-xs">
                          {v === true
                            ? <CheckCircle2 className={`h-4 w-4 mx-auto ${i === 0 ? "text-[#00E676]" : "text-white/30"}`} />
                            : v === false
                            ? <X className="h-4 w-4 text-white/10 mx-auto" />
                            : <span className={i === 0 ? "text-[#00E676] font-bold" : "text-white/30"}>{v as string}</span>
                          }
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
      <section id="tarifs" className="py-20 sm:py-28 px-5 bg-[#0A100C] border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="text-xs font-bold text-[#00E676] uppercase tracking-widest mb-3">Tarifs</p>
            <h2 className="text-3xl sm:text-5xl font-black text-white">Simple et transparent</h2>
            <p className="text-sm text-white/40 mt-3">Sans engagement · Résiliable à tout moment</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {PLANS.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 0.06}>
                <div className={`relative flex flex-col rounded-2xl border p-6 gap-5 ${
                  plan.highlight
                    ? "border-[#00E676]/50 bg-[#00E676]/5 shadow-xl shadow-[#00E676]/10"
                    : "border-white/10 bg-[#0D160F]"
                }`}>
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#00E676] text-[#060D09] px-3 py-0.5 text-[11px] font-black">
                      Le plus populaire
                    </span>
                  )}
                  <div>
                    <p className={`text-[11px] font-black uppercase tracking-widest mb-2 ${plan.highlight ? "text-[#00E676]" : "text-white/30"}`}>{plan.name}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">{plan.price}€</span>
                      <span className="text-sm text-white/30">/mois</span>
                    </div>
                    <p className={`text-xs mt-1 font-semibold ${plan.highlight ? "text-[#00E676]" : "text-white/30"}`}>{plan.sub}</p>
                  </div>
                  <ul className="flex-1 space-y-2">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                        <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${plan.highlight ? "text-[#00E676]" : "text-white/20"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button className={`w-full font-bold ${plan.highlight ? "bg-[#00E676] text-[#060D09] hover:bg-[#00FF84]" : "bg-white/10 text-white hover:bg-white/20 border-0"}`}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-5 rounded-2xl border border-white/10 bg-[#0D160F] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-1">
                <p className="font-black text-white text-base">Enterprise — volume et besoins spécifiques</p>
                <p className="text-sm text-white/40 mt-1">Intégration API · Volume illimité · Accompagnement dédié</p>
              </div>
              <Link href="/enterprise" className="shrink-0">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
                  Nous contacter <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 sm:py-36 px-5 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#00E676]/6 rounded-full blur-[100px]" />
        </div>
        <FadeIn className="relative max-w-2xl mx-auto space-y-7">
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            1 produit gratuit.<br />
            <span className="text-[#00E676]">Dès maintenant.</span>
          </h2>
          <p className="text-white/40 text-base">Aucune carte bancaire · Compte créé en 30 secondes</p>
          <Link href="/auth/login">
            <Button size="lg" className="bg-[#00E676] text-[#060D09] hover:bg-[#00FF84] font-black gap-2 h-14 px-10 text-lg">
              Créer mon compte gratuit <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 bg-[#060D09] py-12 px-5 text-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <ConforvaLogo size={26} />
                <span className="font-black text-white tracking-tight">CONFORVA</span>
              </Link>
              <p className="text-sm leading-relaxed max-w-xs">Conformité GPSR par IA pour les e-commerçants EU.</p>
              <p className="mt-3 text-xs text-[#00E676]">contact.conforva@gmail.com</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white/20 mb-3">Produit</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/audit-gratuit" className="text-[#00E676] font-semibold hover:text-[#00FF84] transition-colors">Audit gratuit</Link></li>
                <li><a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
                <li><Link href="/partenaires" className="hover:text-white transition-colors">Affiliés</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white/20 mb-3">Ressources</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog GPSR</Link></li>
                <li><Link href="/conformite-gpsr" className="hover:text-white transition-colors">Guide GPSR</Link></li>
                <li><Link href="/gpsr-amazon" className="hover:text-white transition-colors">GPSR Amazon</Link></li>
                <li><Link href="/gpsr-shopify" className="hover:text-white transition-colors">GPSR Shopify</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white/20 mb-3">Légal</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/cgu" className="hover:text-white transition-colors">CGU</Link></li>
                <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/20">
            <p>© 2026 Conforva. Tous droits réservés.</p>
            <p>Les documents générés constituent une aide structurée, non un avis juridique.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
