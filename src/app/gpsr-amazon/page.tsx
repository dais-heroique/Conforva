import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, FileText, Shield, AlertTriangle,
  ChevronRight, Clock, Globe, Users, Package,
} from "lucide-react"

export const metadata: Metadata = {
  title: "GPSR Amazon : obligations, risques et mise en conformité pour les vendeurs",
  description: "Tout ce que les vendeurs Amazon doivent savoir sur le GPSR : dossier technique, Personne Responsable EU, étiquetage, risques de suspension de compte. Mise en conformité automatisée avec Conforva.",
  keywords: [
    "GPSR Amazon", "Amazon GPSR obligation", "GPSR vendeur Amazon", "Amazon GPSR suspension",
    "personne responsable EU Amazon", "dossier technique Amazon GPSR", "Amazon GPSR 2024",
    "conformité GPSR Amazon FBA", "GPSR Amazon seller", "GPSR Amazon Europe",
    "Amazon GPSR règlement", "GPSR marketplace Amazon",
  ],
  openGraph: {
    title: "GPSR et Amazon : ce que tout vendeur doit savoir en 2024",
    description: "Risques de suspension, exigences Amazon, dossier technique, Personne Responsable EU — tout ce qu'impose le GPSR aux vendeurs Amazon, expliqué et automatisé.",
    url: "https://conforva.com/gpsr-amazon",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPSR Amazon : obligations et risques pour les vendeurs",
    description: "Suspension de compte, dossier technique, Personne Responsable EU — comment rester conforme sur Amazon.",
  },
  alternates: { canonical: "https://conforva.com/gpsr-amazon" },
}

const JSON_LD_HOWTO = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment être conforme au GPSR sur Amazon en 4 étapes",
  "description": "Guide pratique pour les vendeurs Amazon afin de respecter le règlement (UE) 2023/988 (GPSR) et éviter la suspension de compte",
  "totalTime": "PT10M",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "EUR", "value": "0" },
  "step": [
    { "@type": "HowToStep", "name": "Désigner une Personne Responsable EU (Art. 16)", "text": "Nommez un représentant légal établi dans l'UE pour chaque ASIN — c'est l'exigence numéro 1 d'Amazon depuis décembre 2024." },
    { "@type": "HowToStep", "name": "Constituer le dossier technique (Art. 22)", "text": "Rassemblez les 15 sections obligatoires : description produit, évaluation des risques, normes appliquées, résultats de tests, instructions d'utilisation." },
    { "@type": "HowToStep", "name": "Rédiger la déclaration de conformité (Art. 24)", "text": "Signez la déclaration UE attestant que chaque ASIN respecte le GPSR et les normes harmonisées applicables." },
    { "@type": "HowToStep", "name": "Mettre à jour l'étiquetage (Art. 9)", "text": "Ajoutez les coordonnées de la Personne Responsable EU et les avertissements de sécurité dans la langue de chaque pays de vente Amazon." },
  ],
}

const JSON_LD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce qu'Amazon exige exactement pour le GPSR ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Amazon EU exige pour chaque ASIN : (1) la désignation d'une Personne Responsable EU avec nom, adresse et email visibles sur le listing et le produit, (2) un dossier technique conforme à l'Art. 22 du GPSR disponible sur demande, (3) une déclaration UE de conformité (Art. 24), et (4) un étiquetage incluant les coordonnées du responsable EU et les avertissements de sécurité dans la langue du pays de vente.",
      },
    },
    {
      "@type": "Question",
      "name": "Mon compte Amazon peut-il être suspendu à cause du GPSR ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Amazon suspend les ASINs non conformes au GPSR sans préavis. Les raisons les plus fréquentes : absence de Personne Responsable EU sur le listing, absence de documentation technique, ou étiquetage non conforme. La suspension peut être partielle (ASIN par ASIN) ou totale selon la gravité.",
      },
    },
    {
      "@type": "Question",
      "name": "Je vends en FBA depuis la Chine. Suis-je concerné par le GPSR ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, et c'est un cas particulièrement sensible. En tant que vendeur FBA hors UE, vous êtes considéré comme importateur sur le marché européen. Vous devez obligatoirement désigner une Personne Responsable EU (Art. 16) dont les coordonnées doivent figurer sur chaque ASIN et sur le produit physique. Sans cela, Amazon peut suspendre vos annonces.",
      },
    },
    {
      "@type": "Question",
      "name": "Combien coûte la mise en conformité GPSR pour Amazon ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Via un cabinet conseil : 500 à 2 000 € par référence. Avec Conforva : à partir de 29 €/mois pour jusqu'à 5 produits, dossier technique complet et déclaration de conformité générés en moins de 10 minutes. Le coût d'une suspension Amazon sur un produit à 4 000 €/mois de CA dépasse largement ce montant.",
      },
    },
    {
      "@type": "Question",
      "name": "La Personne Responsable EU doit-elle être dans mon pays ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. La Personne Responsable EU doit simplement être établie dans l'un des 27 États membres de l'Union Européenne. Il peut s'agir d'un prestataire spécialisé, d'un importateur EU, ou de toute personne morale ou physique résidant dans l'UE, à condition qu'elle puisse être contactée par les autorités et qu'elle ait accès aux dossiers techniques.",
      },
    },
  ],
}

const AMAZON_REQUIREMENTS = [
  {
    n: "01",
    title: "Personne Responsable EU sur chaque ASIN",
    desc: "Amazon impose d'afficher nom, adresse postale et email d'une Personne Responsable EU sur chaque fiche produit (listing) et sur le produit physique. Sans cela, l'ASIN peut être supprimé sans préavis.",
    art: "Art. 16",
    icon: Users,
    color: "bg-violet-600",
  },
  {
    n: "02",
    title: "Dossier technique complet",
    desc: "15 sections obligatoires : description générale, dessins, normes harmonisées appliquées, évaluation complète des risques (ISO 12100), résultats de tests, instructions d'utilisation. À conserver 10 ans et à fournir aux autorités sur demande.",
    art: "Art. 22",
    icon: FileText,
    color: "bg-blue-600",
  },
  {
    n: "03",
    title: "Déclaration UE de conformité",
    desc: "Document officiel signé attestant que votre produit respecte le GPSR et les normes harmonisées applicables. Amazon peut vous demander de le soumettre via Seller Central lors d'un contrôle de conformité.",
    art: "Art. 24",
    icon: Shield,
    color: "bg-indigo-600",
  },
  {
    n: "04",
    title: "Étiquetage et informations produit",
    desc: "Coordonnées de la Personne Responsable EU, avertissements de sécurité dans la langue de chaque marketplace Amazon (DE → allemand, FR → français, IT → italien, ES → espagnol, etc.).",
    art: "Art. 9",
    icon: Globe,
    color: "bg-emerald-600",
  },
]

const SUSPENSION_RISKS = [
  { label: "Suspension d'ASIN", sub: "Sans préavis, dès qu'Amazon détecte une non-conformité", color: "border-red-200 bg-red-50 text-red-700" },
  { label: "Blocage de compte vendeur", sub: "En cas de non-conformité répétée ou grave", color: "border-orange-200 bg-orange-50 text-orange-700" },
  { label: "Rétention des fonds", sub: "Amazon peut bloquer les paiements pendant l'enquête", color: "border-amber-200 bg-amber-50 text-amber-700" },
  { label: "Retrait des stocks FBA", sub: "Vous devez rapatrier les produits non conformes à vos frais", color: "border-rose-200 bg-rose-50 text-rose-700" },
  { label: "Amendes et responsabilité civile", sub: "En cas de signalement aux autorités par Amazon ou un client", color: "border-red-200 bg-red-50 text-red-700" },
]

const FAQ = [
  {
    q: "Amazon vérifie-t-il vraiment la conformité GPSR ?",
    a: "Oui. Depuis décembre 2024, Amazon EU vérifie activement la conformité GPSR de ses vendeurs tiers. Les contrôles peuvent être déclenchés par les algorithmes d'Amazon, par un signalement d'un concurrent ou d'un consommateur, ou par les autorités de surveillance du marché (DGCCRF, BSI, etc.) qui font remonter des cas à Amazon.",
  },
  {
    q: "J'ai reçu un e-mail d'Amazon me demandant mes documents GPSR. Que faire ?",
    a: "Ne tardez pas : Amazon donne généralement 7 à 14 jours pour répondre. Vous devez fournir la déclaration de conformité, le dossier technique, et les informations relatives à la Personne Responsable EU pour l'ASIN concerné. Conforva peut générer ces documents en moins de 10 minutes.",
  },
  {
    q: "Mon fournisseur chinois m'a fourni un CE. Est-ce suffisant pour Amazon ?",
    a: "Non. Le marquage CE (si pertinent) est distinct du GPSR. Amazon exige spécifiquement les documents GPSR : dossier technique Art. 22, déclaration de conformité Art. 24, et Personne Responsable EU Art. 16. Un simple marquage CE ne suffit pas à satisfaire aux exigences GPSR d'Amazon.",
  },
  {
    q: "Dois-je un dossier GPSR par ASIN ou par marque ?",
    a: "Par ASIN (référence produit). Chaque produit distinct nécessite son propre dossier technique. Vous pouvez mutualiser certains éléments pour une gamme similaire, mais chaque ASIN doit avoir sa propre déclaration de conformité et son dossier identifiable.",
  },
  {
    q: "Quel est le délai pour récupérer un ASIN suspendu pour non-conformité GPSR ?",
    a: "Amazon indique généralement 3 à 10 jours ouvrés après soumission des documents conformes. En pratique, avec des documents complets et corrects, la plupart des vendeurs voient leur ASIN réactivé sous 5 jours. Chaque jour de suspension représente un manque à gagner direct.",
  },
]

export default function GPSRAmazonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_HOWTO) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }} />
      <PublicNav />

      <main className="bg-[#F9F8F5] min-h-screen">

        {/* ── HERO ── */}
        <section className="px-5 pt-28 pb-14 sm:pt-36 sm:pb-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-full animate-pulse shrink-0" />
            <span className="text-[11px] font-semibold text-red-700 tracking-widest uppercase">GPSR (UE) 2023/988 — Obligatoire depuis décembre 2024</span>
          </div>
          <h1 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[0.97] tracking-tight text-gray-950 mb-6">
            GPSR et Amazon :<br />
            <em className="italic font-light text-blue-700">ce que tout vendeur doit savoir en 2024</em>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mb-8">
            Amazon EU suspend les ASINs non conformes au GPSR sans préavis. Voici exactement ce qu&apos;Amazon exige,
            pourquoi votre compte est en danger, et comment vous mettre en conformité en 10 minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2">
                Générer mon dossier GPSR <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#exigences">
              <Button size="lg" variant="ghost" className="text-gray-600">
                Voir les exigences Amazon →
              </Button>
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 max-w-sm gap-0 border border-gray-200 rounded-xl overflow-hidden bg-white">
            {[
              { n: "10 min", label: "par dossier" },
              { n: "4", label: "docs obligatoires" },
              { n: "27", label: "pays de l'UE couverts" },
            ].map((s, i) => (
              <div key={s.n} className={`px-4 py-3 text-center ${i > 0 ? "border-l border-gray-200" : ""}`}>
                <p className="font-bold text-gray-900 text-sm tabular-nums">{s.n}</p>
                <p className="text-[10px] text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── QU'EST-CE QUE LE GPSR POUR AMAZON ── */}
        <section className="px-5 py-12 sm:py-16 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">GPSR et Amazon : qui est concerné ?</h2>
            <div className="prose prose-gray max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-gray-600">
              <p>
                Le <strong className="text-gray-900">règlement (UE) 2023/988 sur la sécurité générale des produits (GPSR)</strong> est
                entré en vigueur le 13 décembre 2024. Il s&apos;applique à <strong className="text-gray-900">tous les vendeurs qui mettent
                des produits physiques à disposition de consommateurs européens</strong> — y compris via Amazon.fr, Amazon.de,
                Amazon.it, Amazon.es, Amazon.nl, etc.
              </p>
              <p>
                Amazon a rapidement intégré ces exigences dans sa politique de conformité des produits : depuis fin 2024,
                les listings sans <strong className="text-gray-900">Personne Responsable EU</strong> peuvent être supprimés,
                et les vendeurs peuvent être invités à soumettre leurs dossiers techniques via Seller Central.
              </p>
              <p>
                Que vous soyez vendeur Amazon FBA depuis la Chine, importateur européen, ou marque propre —
                vous êtes soumis au GPSR dès qu&apos;un consommateur dans l&apos;UE peut acheter votre produit.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                {
                  role: "Vendeur FBA hors UE",
                  desc: "C'est le cas le plus exposé. Sans Personne Responsable EU désignée et affichée sur le listing, Amazon peut supprimer l'ASIN immédiatement.",
                  applies: true,
                },
                {
                  role: "Marque propre (Private Label)",
                  desc: "Vous êtes considéré comme fabricant ou importateur. Vous êtes responsable de l'intégralité de la documentation GPSR pour chaque ASIN.",
                  applies: true,
                },
                {
                  role: "Revendeur / arbitragiste",
                  desc: "Même si vous ne fabriquez pas le produit, vous devez vous assurer que la documentation GPSR existe. En l'absence de fabricant joignable, la responsabilité vous revient.",
                  applies: true,
                },
              ].map(p => (
                <div key={p.role} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <p className="font-bold text-sm text-gray-900">{p.role}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CE QU'AMAZON EXIGE ── */}
        <section id="exigences" className="px-5 py-12 sm:py-20 bg-[#F9F8F5]">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Exigences Amazon</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Ce qu&apos;Amazon exige exactement pour chaque ASIN
            </h2>
            <p className="text-sm text-gray-500 mb-10 max-w-xl">
              Ces 4 éléments correspondent aux articles du GPSR que Amazon contrôle en priorité. Conforva automatise les 4.
            </p>

            <div className="space-y-0 divide-y divide-gray-200 border-y border-gray-200">
              {AMAZON_REQUIREMENTS.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.n} className="flex gap-4 sm:gap-10 py-7 sm:py-8 bg-white px-4 sm:px-6">
                    <span className="font-display text-4xl sm:text-6xl font-bold text-gray-100 leading-none select-none shrink-0 w-10 sm:w-16 -mt-1">{s.n}</span>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                        <div className={`h-6 w-6 rounded ${s.color} flex items-center justify-center shrink-0`}>
                          <Icon className="h-3.5 w-3.5 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900">{s.title}</h3>
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{s.art}</span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 shrink-0 mt-3 hidden sm:block" />
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex items-center gap-4 p-5 rounded-xl bg-blue-50 border border-blue-200">
              <Clock className="h-5 w-5 text-blue-600 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-900">Conforva génère les 4 documents requis par Amazon</p>
                <p className="text-xs text-blue-700 mt-0.5">Dossier technique, déclaration de conformité, évaluation des risques, étiquetage — en moins de 10 minutes par ASIN.</p>
              </div>
              <Link href="/auth/login">
                <Button size="sm" className="shrink-0">Essayer gratuitement</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── RISKS ── */}
        <section className="px-5 py-12 sm:py-16 bg-[#111110] text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Risques de suspension Amazon en cas de non-conformité GPSR</h2>
            <p className="text-sm text-gray-400 mb-8 max-w-xl">
              Amazon applique sa politique GPSR de manière proactive depuis décembre 2024. Les conséquences peuvent être immédiates.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {SUSPENSION_RISKS.map(r => (
                <div key={r.label} className={`rounded-xl border px-4 py-3.5 ${r.color}`}>
                  <p className="font-semibold text-sm">{r.label}</p>
                  <p className="text-xs mt-0.5 opacity-80">{r.sub}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-500 leading-relaxed max-w-2xl">
              Un ASIN suspendu sur Amazon pendant 7 jours pour un produit à 5 000 €/mois de CA représente 1 150 € de pertes directes —
              sans compter la perte de classement organique (BSR) qui peut prendre des semaines à récupérer.
              Le coût de la conformité est toujours inférieur au coût de la non-conformité.
            </p>
          </div>
        </section>

        {/* ── COMMENT CONFORVA AUTOMATISE ── */}
        <section className="px-5 py-12 sm:py-20 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Comment Conforva automatise la conformité GPSR pour Amazon</h2>
            <p className="text-sm text-gray-500 mb-10 max-w-xl">Tout ce qu&apos;Amazon exige, généré automatiquement pour chaque ASIN de votre catalogue.</p>

            <div className="space-y-4">
              {[
                {
                  art: "Art. 22",
                  title: "Dossier technique automatisé",
                  must: "Généré en moins de 5 minutes",
                  content: [
                    "15 sections structurées conformes à l'Art. 22 du GPSR",
                    "Évaluation des risques complète selon ISO 12100:2010",
                    "Identification des normes harmonisées applicables à votre catégorie",
                    "Intégration des résultats de tests et certificats existants",
                    "Export PDF prêt à soumettre à Amazon ou aux autorités",
                    "Conservation automatique — accès illimité pendant 10 ans",
                  ],
                },
                {
                  art: "Art. 24",
                  title: "Déclaration UE de conformité",
                  must: "Signée électroniquement et archivée",
                  content: [
                    "Document officiel pré-rempli avec les informations de votre ASIN",
                    "Référencement des normes harmonisées utilisées",
                    "Signature électronique du représentant légal",
                    "Format conforme aux exigences des autorités européennes",
                    "Disponible immédiatement en cas de contrôle Amazon",
                  ],
                },
                {
                  art: "Art. 16",
                  title: "Personne Responsable EU",
                  must: "Pour les vendeurs établis hors de l'UE",
                  content: [
                    "Aide à la désignation d'une Personne Responsable EU conforme",
                    "Texte prêt à copier pour votre listing Amazon Seller Central",
                    "Format des coordonnées conforme aux exigences Amazon",
                    "Mise à jour automatique sur tous vos ASINs concernés",
                  ],
                },
                {
                  art: "Art. 9",
                  title: "Étiquetage multilingue",
                  must: "Dans la langue de chaque marketplace Amazon",
                  content: [
                    "Avertissements de sécurité générés dans la langue de chaque pays (FR, DE, IT, ES, NL...)",
                    "Coordonnées de la Personne Responsable EU prêtes à imprimer",
                    "Format adapté à l'étiquette produit et à l'emballage",
                    "Mise à jour automatique si vous ouvrez une nouvelle marketplace",
                  ],
                },
              ].map(doc => (
                <div key={doc.art} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
                    <span className="text-xs font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded">{doc.art}</span>
                    <h3 className="font-bold text-gray-900">{doc.title}</h3>
                    <span className="ml-auto text-xs text-gray-500 italic hidden sm:block">{doc.must}</span>
                  </div>
                  <ul className="px-5 py-4 space-y-2">
                    {doc.content.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-5 py-12 sm:py-20 bg-[#F9F8F5]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10">Questions fréquentes — GPSR Amazon</h2>
            <div className="space-y-4">
              {FAQ.map((item) => (
                <div key={item.q} className="border border-gray-200 rounded-xl bg-white px-5 py-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-2">Vous avez une autre question sur le GPSR Amazon ?</p>
              <Link href="/faq" className="text-sm font-semibold text-blue-600 hover:underline">
                Voir toutes les FAQ GPSR →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-5 py-12 sm:py-20 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Conforva</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Protégez vos ASINs Amazon<br />
              <em className="italic font-light text-blue-700">en moins de 10 minutes</em>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
              Dossier technique, déclaration de conformité, Personne Responsable EU et étiquetage multilingue —
              tout ce qu&apos;Amazon exige pour chaque ASIN, généré automatiquement avec Conforva.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/auth/login">
                <Button size="lg" className="gap-2">
                  Commencer gratuitement <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/conformite-gpsr">
                <Button size="lg" variant="ghost" className="text-gray-600">
                  Guide complet GPSR →
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-gray-400">Gratuit pour 1 référence · Aucune carte bancaire requise · Plans à partir de 29 €/mois</p>
          </div>
        </section>

      </main>

      <PublicFooter />
    </>
  )
}
