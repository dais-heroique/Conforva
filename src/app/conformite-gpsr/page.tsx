import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, FileText, Shield, AlertTriangle,
  ChevronRight, Clock, Globe, Users, Package,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Conformité GPSR 2025 : guide complet, documents obligatoires et outil",
  description: "Tout sur la conformité GPSR (règlement UE 2023/988) : qui est concerné, quels documents obligatoires (dossier technique, évaluation des risques, déclaration de conformité), sanctions. Outil de mise en conformité en 10 minutes.",
  keywords: [
    "conformité GPSR", "GPSR conformité produit", "conformité règlement UE 2023/988",
    "dossier technique GPSR", "évaluation des risques GPSR", "documentation technique GPSR",
    "déclaration conformité UE", "personne responsable EU GPSR", "mise en conformité GPSR",
    "GPSR obligations vendeur", "GPSR sanctions", "GPSR guide complet",
  ],
  openGraph: {
    title: "Conformité GPSR 2025 : guide complet et outil de mise en conformité",
    description: "Dossier technique, évaluation des risques, déclaration de conformité, personne responsable EU — tout ce qu'impose le règlement GPSR, expliqué et automatisé.",
    url: "https://conforva.com/conformite-gpsr",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conformité GPSR 2025 : guide complet",
    description: "Obligations, documents, sanctions — et comment se mettre en conformité en 10 minutes.",
  },
  alternates: { canonical: "https://conforva.com/conformite-gpsr" },
}

const JSON_LD_HOWTO = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment atteindre la conformité GPSR en 6 étapes",
  "description": "Guide pratique pour mettre vos produits en conformité avec le règlement (UE) 2023/988 (GPSR)",
  "totalTime": "PT10M",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "EUR", "value": "0" },
  "step": [
    { "@type": "HowToStep", "name": "Identifier les normes applicables", "text": "Déterminez quelles normes harmonisées s'appliquent à votre catégorie produit." },
    { "@type": "HowToStep", "name": "Réaliser l'évaluation des risques", "text": "Identifiez les dangers potentiels et évaluez leur probabilité et gravité selon ISO 12100." },
    { "@type": "HowToStep", "name": "Constituer le dossier technique (Art. 22)", "text": "Rassemblez les 15 sections obligatoires du dossier technique GPSR." },
    { "@type": "HowToStep", "name": "Rédiger la déclaration de conformité (Art. 24)", "text": "Signez la déclaration attestant que votre produit respecte le GPSR." },
    { "@type": "HowToStep", "name": "Désigner une personne responsable EU (Art. 16)", "text": "Si vous êtes hors UE, désignez un représentant légal établi dans l'Union Européenne." },
    { "@type": "HowToStep", "name": "Mettre à jour l'étiquetage (Art. 9)", "text": "Ajoutez les avertissements de sécurité dans les langues des pays de vente." },
  ],
}

const JSON_LD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que la conformité GPSR ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La conformité GPSR désigne le respect du règlement (UE) 2023/988 sur la sécurité générale des produits, en vigueur depuis le 13 décembre 2024. Elle impose à tout opérateur économique (fabricant, importateur, distributeur) qui met un produit sur le marché européen de constituer un dossier technique, une déclaration de conformité, et d'assurer un étiquetage adéquat.",
      },
    },
    {
      "@type": "Question",
      "name": "Quels documents sont obligatoires pour la conformité GPSR ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La conformité GPSR exige : (1) un dossier technique avec évaluation des risques (Art. 22), (2) une déclaration UE de conformité (Art. 24), (3) un étiquetage sécurité multilingue (Art. 9), et (4) la désignation d'une personne responsable EU si le fabricant est hors UE (Art. 16).",
      },
    },
    {
      "@type": "Question",
      "name": "Quelles sont les sanctions en cas de non-conformité GPSR ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En cas de non-conformité GPSR : retrait ou rappel du produit du marché, blocage douanier à l'importation, suspension des annonces sur Amazon EU et autres marketplaces, amendes administratives selon la législation nationale, et responsabilité civile et pénale aggravée en cas d'accident.",
      },
    },
    {
      "@type": "Question",
      "name": "La conformité GPSR s'applique-t-elle aux vendeurs Shopify et hors Amazon ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. La conformité GPSR s'applique à tous les produits mis sur le marché européen, quel que soit le canal de vente. Shopify, boutique en ligne, dropshipping, vente directe — si un consommateur établi dans l'UE peut acheter votre produit, vous êtes soumis au GPSR.",
      },
    },
    {
      "@type": "Question",
      "name": "Combien de temps prend la mise en conformité GPSR ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Avec un outil spécialisé comme Conforva, la conformité GPSR d'un produit (dossier technique complet, évaluation des risques, déclaration de conformité) prend moins de 10 minutes. Sans outil, comptez 2 à 5 jours de travail par référence, ou 500 à 2 000 € par référence via un cabinet conseil.",
      },
    },
  ],
}

const STEPS = [
  {
    n: "01",
    title: "Évaluation des risques (ISO 12100)",
    desc: "Identifiez chaque danger potentiel de votre produit — mécanique, thermique, chimique, électrique. Évaluez la probabilité et la gravité. Documentez les mesures de réduction selon la méthodologie ISO 12100:2010.",
    art: "Art. 22",
    icon: AlertTriangle,
    color: "bg-rose-500",
  },
  {
    n: "02",
    title: "Dossier technique complet",
    desc: "15 sections obligatoires : description produit, dessins, normes applicables, résultats de tests, instructions d'utilisation, traçabilité et historique des révisions. Conservation obligatoire 10 ans.",
    art: "Art. 22",
    icon: FileText,
    color: "bg-blue-600",
  },
  {
    n: "03",
    title: "Déclaration UE de conformité",
    desc: "Document officiel signé par le fabricant ou son représentant légal, attestant que le produit satisfait à toutes les exigences GPSR et aux normes harmonisées retenues.",
    art: "Art. 24",
    icon: Shield,
    color: "bg-indigo-600",
  },
  {
    n: "04",
    title: "Personne Responsable EU",
    desc: "Obligatoire si le fabricant est établi hors UE. Un représentant légal dans l'Union Européenne, joignable par les autorités, mentionné sur le produit et dans le dossier.",
    art: "Art. 16",
    icon: Users,
    color: "bg-violet-600",
  },
  {
    n: "05",
    title: "Étiquetage sécurité multilingue",
    desc: "Avertissements de sécurité dans la langue de chaque pays de vente. Pour vendre en France, Allemagne et Italie : 3 langues obligatoires sur l'étiquette ou l'emballage.",
    art: "Art. 9",
    icon: Globe,
    color: "bg-emerald-600",
  },
  {
    n: "06",
    title: "Identification du produit",
    desc: "Nom du fabricant (ou de son représentant EU), adresse, email de contact, et une référence permettant d'identifier le produit doivent figurer sur le produit ou son emballage.",
    art: "Art. 9",
    icon: Package,
    color: "bg-amber-500",
  },
]

const RISKS = [
  { label: "Retrait ou rappel du marché", sub: "Sur injonction des autorités de surveillance", color: "border-red-200 bg-red-50 text-red-700" },
  { label: "Blocage douanier", sub: "À l'importation, si la documentation est absente", color: "border-orange-200 bg-orange-50 text-orange-700" },
  { label: "Suspension marketplace", sub: "Amazon, Etsy, OTTO — annonces retirées sans préavis", color: "border-amber-200 bg-amber-50 text-amber-700" },
  { label: "Amendes administratives", sub: "Selon la législation de chaque État membre", color: "border-rose-200 bg-rose-50 text-rose-700" },
  { label: "Responsabilité aggravée", sub: "Civile et pénale en cas d'accident produit", color: "border-red-200 bg-red-50 text-red-700" },
]

const FAQ = [
  {
    q: "Le GPSR s'applique-t-il à ma boutique Shopify ?",
    a: "Oui. Le GPSR s'applique à tous les produits vendus à des consommateurs européens, quel que soit le canal de vente — Shopify, WooCommerce, boutique en propre, marketplace. Si votre client est dans l'UE, vous êtes soumis au GPSR.",
  },
  {
    q: "Je vends sur Amazon FBA depuis la Chine. Suis-je concerné ?",
    a: "Oui, et doublement. D'abord parce que le GPSR s'applique dès que le consommateur final est en UE. Ensuite parce qu'Amazon EU impose lui-même la désignation d'une Personne Responsable EU (Art. 16) pour chaque ASIN — sans quoi votre annonce peut être suspendue.",
  },
  {
    q: "Dois-je constituer un dossier par produit ou par gamme ?",
    a: "Par produit (référence). Chaque ASIN, chaque référence unique nécessite son propre dossier technique. Vous pouvez factoriser certains éléments pour une gamme (même famille de risques, mêmes normes), mais le dossier doit identifier précisément chaque produit.",
  },
  {
    q: "Que se passe-t-il si mon fournisseur m'a fourni un dossier ?",
    a: "Vous pouvez vous appuyer sur les documents fournis par votre fabricant, mais la responsabilité finale reste la vôtre en tant qu'importateur ou distributeur. Vérifiez que le dossier couvre bien les normes applicables à votre marché et que la personne responsable EU est correctement désignée.",
  },
  {
    q: "Combien coûte la conformité GPSR ?",
    a: "Via un cabinet conseil : 500 à 2 000 € par référence. Via un outil comme Conforva : à partir de 0 € (gratuit pour 1 référence), puis 29 €/mois pour 5 références. Le coût de la non-conformité — suspension Amazon, rappel de produits, amendes — dépasse largement ces montants.",
  },
]

export default function ConformiteGPSRPage() {
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
            <span className="text-[11px] font-semibold text-red-700 tracking-widest uppercase">GPSR (UE) 2023/988 — En vigueur depuis décembre 2024</span>
          </div>
          <h1 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[0.97] tracking-tight text-gray-950 mb-6">
            Conformité GPSR :<br />
            <em className="italic font-light text-blue-700">guide complet 2025</em>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mb-8">
            Le règlement (UE) 2023/988 impose des obligations précises à tout vendeur de produits physiques sur le marché européen.
            Voici exactement ce que vous devez faire — et comment le faire en 10 minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2">
                Générer mon dossier GPSR <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#etapes">
              <Button size="lg" variant="ghost" className="text-gray-600">
                Voir les 6 étapes →
              </Button>
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 max-w-sm gap-0 border border-gray-200 rounded-xl overflow-hidden bg-white">
            {[
              { n: "10 min", label: "par dossier" },
              { n: "15", label: "sections Art. 22" },
              { n: "10 ans", label: "conservation légale" },
            ].map((s, i) => (
              <div key={s.n} className={`px-4 py-3 text-center ${i > 0 ? "border-l border-gray-200" : ""}`}>
                <p className="font-bold text-gray-900 text-sm tabular-nums">{s.n}</p>
                <p className="text-[10px] text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── QU'EST-CE QUE LA CONFORMITÉ GPSR ── */}
        <section className="px-5 py-12 sm:py-16 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Qu'est-ce que la conformité GPSR ?</h2>
            <div className="prose prose-gray max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-gray-600">
              <p>
                La <strong className="text-gray-900">conformité GPSR</strong> désigne le respect du règlement (UE) 2023/988 sur la sécurité générale des produits —
                entré en vigueur le 13 décembre 2024. Ce règlement remplace la directive de 2001 et renforce considérablement
                les obligations des opérateurs économiques.
              </p>
              <p>
                Il s'applique à <strong className="text-gray-900">tous les produits de consommation non alimentaires</strong> vendus
                sur le marché européen, sans dérogation : jouets, cosmétiques, vêtements, électronique, mobilier, bougies,
                articles de cuisine — et peu importe votre pays d'origine ou votre canal de vente (Amazon, Shopify, dropshipping,
                boutique en propre).
              </p>
              <p>
                La conformité GPSR repose sur <strong className="text-gray-900">quatre piliers documentaires</strong> :
                le dossier technique (Art. 22), la déclaration UE de conformité (Art. 24),
                l'étiquetage sécurité multilingue (Art. 9), et la désignation d'une personne responsable EU (Art. 16)
                pour les fabricants établis hors de l'Union Européenne.
              </p>
            </div>

            {/* Who is concerned */}
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                {
                  role: "Fabricant",
                  desc: "Conçoit ou fait fabriquer le produit. Responsable de l'intégralité du dossier technique et de la déclaration de conformité.",
                  applies: true,
                },
                {
                  role: "Importateur EU",
                  desc: "Met sur le marché EU un produit fabriqué hors UE. Doit vérifier la conformité et désigner une personne responsable EU.",
                  applies: true,
                },
                {
                  role: "Distributeur / Revendeur",
                  desc: "Vend un produit sans le fabriquer. Doit s'assurer que le fabricant ou l'importateur a rempli ses obligations — et peut être tenu responsable.",
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

        {/* ── 6 ÉTAPES ── */}
        <section id="etapes" className="px-5 py-12 sm:py-20 bg-[#F9F8F5]">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Processus</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Conformité GPSR : les 6 étapes obligatoires
            </h2>
            <p className="text-sm text-gray-500 mb-10 max-w-xl">
              Chaque étape correspond à un article précis du règlement (UE) 2023/988. Conforva automatise les étapes 1 à 4.
            </p>

            <div className="space-y-0 divide-y divide-gray-200 border-y border-gray-200">
              {STEPS.map((s, i) => {
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
                <p className="text-sm font-semibold text-blue-900">Conforva automatise les étapes 1 à 4</p>
                <p className="text-xs text-blue-700 mt-0.5">Évaluation des risques, dossier technique 15 sections, déclaration de conformité — générés en moins de 10 minutes.</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Sanctions en cas de non-conformité GPSR</h2>
            <p className="text-sm text-gray-400 mb-8 max-w-xl">
              Les autorités de surveillance du marché (DGCCRF en France, BSI en Allemagne) ont des pouvoirs renforcés depuis décembre 2024.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {RISKS.map(r => (
                <div key={r.label} className={`rounded-xl border px-4 py-3.5 ${r.color}`}>
                  <p className="font-semibold text-sm">{r.label}</p>
                  <p className="text-xs mt-0.5 opacity-80">{r.sub}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-500 leading-relaxed max-w-2xl">
              Le coût de la non-conformité dépasse systématiquement le coût de la mise en conformité.
              Une suspension Amazon sur un produit à 50 000 €/an de CA représente 1 000 €/semaine de pertes.
              Un rappel de produit peut coûter plusieurs dizaines de milliers d'euros.
            </p>
          </div>
        </section>

        {/* ── DOCUMENTS DÉTAIL ── */}
        <section className="px-5 py-12 sm:py-20 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Les documents obligatoires pour la conformité GPSR</h2>
            <p className="text-sm text-gray-500 mb-10 max-w-xl">Détail de chaque document, ce qu'il doit contenir, et qui doit le signer.</p>

            <div className="space-y-4">
              {[
                {
                  art: "Art. 22",
                  title: "Dossier technique",
                  badge: "badge-blue",
                  must: "Obligatoire pour le fabricant ou l'importateur",
                  content: [
                    "Description générale du produit et de son usage prévu",
                    "Dessins techniques et schémas",
                    "Liste des normes harmonisées appliquées",
                    "Évaluation complète des risques (ISO 12100)",
                    "Résultats des tests effectués",
                    "Instructions d'utilisation et avertissements",
                    "Informations sur la Personne Responsable EU",
                    "15 sections structurées au total — à conserver 10 ans",
                  ],
                },
                {
                  art: "Art. 24",
                  title: "Déclaration UE de conformité",
                  must: "Signée par le fabricant ou son représentant légal",
                  content: [
                    "Identification précise du produit (nom, modèle, référence)",
                    "Coordonnées du fabricant ou représentant EU",
                    "Réglementation applicable (GPSR + directives sectorielles éventuelles)",
                    "Normes harmonisées utilisées",
                    "Date et signature du représentant légal",
                    "Disponible à la demande des autorités à tout moment",
                  ],
                },
                {
                  art: "Art. 16",
                  title: "Personne Responsable EU",
                  must: "Obligatoire si le fabricant est établi hors de l'UE",
                  content: [
                    "Personne physique ou morale établie dans l'Union Européenne",
                    "Joignable par les autorités de surveillance du marché",
                    "Coordonnées complètes sur le produit ou son emballage",
                    "Accès aux dossiers techniques en cas de contrôle",
                    "Peut être un prestataire spécialisé ou un importateur EU",
                  ],
                },
                {
                  art: "Art. 9",
                  title: "Étiquetage et informations produit",
                  must: "Sur le produit, l'emballage, ou une notice jointe",
                  content: [
                    "Nom ou marque du fabricant et adresse de contact",
                    "Référence permettant l'identification du produit",
                    "Avertissements de sécurité dans la langue du pays de vente",
                    "Instructions d'utilisation si nécessaire à la sécurité",
                    "Pour les produits vendus en plusieurs pays : autant de langues que de pays",
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-10">Questions fréquentes sur la conformité GPSR</h2>
            <div className="space-y-4">
              {FAQ.map((item) => (
                <div key={item.q} className="border border-gray-200 rounded-xl bg-white px-5 py-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-2">Vous avez une autre question ?</p>
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
              Conformité GPSR complète<br />
              <em className="italic font-light text-blue-700">en moins de 10 minutes</em>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
              Dossier technique 15 sections, évaluation des risques ISO 12100, déclaration de conformité et étiquettes multilingues —
              générés automatiquement pour chaque référence de votre catalogue.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/auth/login">
                <Button size="lg" className="gap-2">
                  Commencer gratuitement <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="ghost" className="text-gray-600">
                  Lire nos guides GPSR →
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-gray-400">Gratuit pour 1 référence · Aucune carte bancaire requise</p>
          </div>
        </section>

      </main>

      <PublicFooter />
    </>
  )
}
