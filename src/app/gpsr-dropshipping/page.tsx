import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, FileText, Shield, AlertTriangle,
  ChevronRight, Clock, Globe, Users, Package,
} from "lucide-react"

export const metadata: Metadata = {
  title: "GPSR Dropshipping : êtes-vous en règle ? Obligations et risques",
  description: "Le dropshipping est particulièrement exposé au GPSR. En tant que vendeur, vous êtes responsable même si le fabricant est en Chine. Dossier technique, Personne Responsable EU, solution Conforva.",
  keywords: [
    "GPSR dropshipping", "dropshipping conforme GPSR", "GPSR dropshipping obligation",
    "dropshipping Europe GPSR", "GPSR vendeur dropshipping", "conformité GPSR dropshipping",
    "dropshipping responsabilité GPSR", "GPSR dropshipping 2024",
    "dropshipping règlement UE 2023/988", "dropshipping conforme Europe",
  ],
  openGraph: {
    title: "Dropshipping et GPSR : êtes-vous en règle ?",
    description: "Pourquoi le dropshipping est particulièrement exposé au GPSR, les risques, et comment se mettre en conformité sans changer de modèle.",
    url: "https://conforva.com/gpsr-dropshipping",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPSR Dropshipping : êtes-vous en règle ?",
    description: "En dropshipping, vous êtes responsable du GPSR même si votre fournisseur est en Chine. Voici ce que ça change.",
  },
  alternates: { canonical: "https://conforva.com/gpsr-dropshipping" },
}

const JSON_LD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Le GPSR s'applique-t-il au dropshipping ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, et le dropshipping est l'un des modèles les plus exposés. En dropshipping, le vendeur (vous) est considéré comme importateur ou distributeur sur le marché européen. Vous êtes juridiquement responsable du respect du GPSR pour chaque produit que vous vendez à des consommateurs dans l'UE — même si le produit est fabriqué et expédié directement depuis la Chine.",
      },
    },
    {
      "@type": "Question",
      "name": "Mon fournisseur dropshipping est responsable du GPSR, pas moi ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C'est une idée reçue dangereuse. Le GPSR (Art. 4) précise que si le fabricant est établi hors de l'UE et n'a pas de représentant EU, la responsabilité incombe à l'importateur — c'est-à-dire la première personne qui introduit le produit sur le marché EU. En dropshipping, cette personne, c'est vous. Votre fournisseur chinois n'a aucune obligation juridique vis-à-vis des autorités européennes.",
      },
    },
    {
      "@type": "Question",
      "name": "Quels documents GPSR dois-je avoir pour mon activité de dropshipping ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour chaque produit vendu en dropshipping à des consommateurs EU, vous devez disposer de : (1) un dossier technique (Art. 22) avec évaluation des risques, (2) une déclaration UE de conformité (Art. 24), (3) la désignation d'une Personne Responsable EU (Art. 16) si votre fournisseur est hors UE, et (4) un étiquetage en français (et dans les autres langues des pays de vente) avec les avertissements de sécurité.",
      },
    },
    {
      "@type": "Question",
      "name": "Comment obtenir un dossier technique GPSR pour un produit dropshipping ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deux options : demander les documents à votre fournisseur (qu'il est peu probable qu'il ait en conformité GPSR) ou les constituer vous-même. Conforva vous permet de générer le dossier technique complet, l'évaluation des risques et la déclaration de conformité en moins de 10 minutes par produit, à partir des informations disponibles sur votre fiche produit.",
      },
    },
    {
      "@type": "Question",
      "name": "Mon fournisseur AliExpress m'a donné un certificat CE. Est-ce suffisant pour le GPSR ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Un certificat CE (souvent de qualité douteuse sur AliExpress) ne remplace pas la documentation GPSR. Le GPSR exige spécifiquement : un dossier technique Art. 22, une déclaration de conformité Art. 24, et une Personne Responsable EU Art. 16. Un certificat CE peut fournir des éléments utiles au dossier technique, mais il ne couvre pas l'ensemble des exigences GPSR.",
      },
    },
  ],
}

const STEPS = [
  {
    n: "01",
    title: "Identifier votre rôle légal (importateur ou distributeur)",
    desc: "En dropshipping depuis un fournisseur hors UE, vous êtes considéré comme importateur sur le marché européen. Ce statut déclenche toutes les obligations GPSR — dossier technique, déclaration de conformité, Personne Responsable EU.",
    art: "Art. 4",
    icon: AlertTriangle,
    color: "bg-rose-500",
  },
  {
    n: "02",
    title: "Constituer le dossier technique par produit",
    desc: "Pour chaque référence en dropshipping : description produit, évaluation des risques (dangers mécaniques, chimiques, thermiques), normes applicables, résultats de tests existants. 15 sections obligatoires selon l'Art. 22.",
    art: "Art. 22",
    icon: FileText,
    color: "bg-blue-600",
  },
  {
    n: "03",
    title: "Signer la déclaration UE de conformité",
    desc: "En tant qu'importateur, vous pouvez signer la déclaration de conformité au nom du produit. Elle atteste que le produit respecte le GPSR. Elle doit être disponible sur demande des autorités à tout moment.",
    art: "Art. 24",
    icon: Shield,
    color: "bg-indigo-600",
  },
  {
    n: "04",
    title: "Désigner une Personne Responsable EU",
    desc: "Si vous êtes établi hors de l'UE, désignez un représentant légal dans l'Union Européenne. Ses coordonnées doivent figurer sur votre site, votre étiquetage et vos fiches produit.",
    art: "Art. 16",
    icon: Users,
    color: "bg-violet-600",
  },
  {
    n: "05",
    title: "Mettre à jour l'étiquetage et les fiches produit",
    desc: "Avertissements de sécurité dans la langue de chaque pays de vente. Coordonnées de la Personne Responsable EU visibles sur la fiche produit et sur l'emballage expédié par votre fournisseur.",
    art: "Art. 9",
    icon: Globe,
    color: "bg-emerald-600",
  },
  {
    n: "06",
    title: "Surveiller et mettre à jour la documentation",
    desc: "Le GPSR impose une obligation de suivi des produits mis sur le marché. Si un incident survient, vous devez pouvoir retirer le produit, notifier les autorités et communiquer aux consommateurs concernés.",
    art: "Art. 35",
    icon: Package,
    color: "bg-amber-500",
  },
]

const RISKS = [
  { label: "Vous êtes responsable en tant qu'importateur", sub: "Même si le produit vient de Chine et que vous ne le touchez pas", color: "border-red-200 bg-red-50 text-red-700" },
  { label: "Retrait forcé du marché", sub: "Produit non conforme = arrêt de vente sur injonction administrative", color: "border-orange-200 bg-orange-50 text-orange-700" },
  { label: "Suspension de marketplace", sub: "Amazon, Etsy, Cdiscount — sans préavis si GPSR non respecté", color: "border-amber-200 bg-amber-50 text-amber-700" },
  { label: "Responsabilité civile aggravée", sub: "En cas d'accident produit, l'absence de dossier aggrave les poursuites", color: "border-rose-200 bg-rose-50 text-rose-700" },
  { label: "Blocage douanier à l'importation", sub: "Les douanes peuvent bloquer les colis sans documentation GPSR", color: "border-red-200 bg-red-50 text-red-700" },
]

const FAQ = [
  {
    q: "Je fais du dropshipping avec Printful ou Printify. Suis-je concerné ?",
    a: "Oui. Printful et Printify produisent sur commande, mais vous êtes l'opérateur économique qui met le produit final sur le marché EU. Certains produits (vêtements, accessoires) sont concernés par le GPSR. Les produits purement numériques (imprimables) ne le sont pas. Consultez les informations produit disponibles auprès de votre prestataire et constituez votre dossier technique pour les catégories concernées.",
  },
  {
    q: "Mon fournisseur Alibaba peut-il se charger du GPSR à ma place ?",
    a: "Non. Votre fournisseur Alibaba est un fabricant ou exportateur hors UE. Il n'a aucune obligation légale vis-à-vis des autorités européennes. Il peut vous fournir des documents utiles (rapports de tests, fiches techniques), mais c'est à vous de constituer et de signer la documentation GPSR. La responsabilité ne peut pas être transférée à un fournisseur hors UE.",
  },
  {
    q: "Que se passe-t-il si mon fournisseur dropshipping change un produit sans me prévenir ?",
    a: "C'est un risque réel en dropshipping. Si le fournisseur modifie le produit (matériaux, composants, design), votre documentation GPSR devient caduque. Le GPSR impose une obligation de suivi des produits (Art. 35). Vous devez avoir un processus pour détecter les changements et mettre à jour vos dossiers. Conforva facilite la mise à jour rapide de la documentation en cas de changement.",
  },
  {
    q: "Les dropshippers sont-ils vraiment contrôlés par les autorités ?",
    a: "De plus en plus. Depuis l'entrée en vigueur du GPSR en décembre 2024, les autorités nationales (DGCCRF, BSI, etc.) ont des pouvoirs renforcés pour surveiller les ventes en ligne, y compris les boutiques de dropshipping. Le règlement (UE) sur la sécurité des produits impose aux plateformes (Shopify, Amazon, etc.) de coopérer avec les autorités pour identifier les opérateurs non conformes.",
  },
  {
    q: "Combien coûte la mise en conformité GPSR pour un catalogue de dropshipping ?",
    a: "Avec Conforva : à partir de 29 €/mois pour 5 produits, ou 79 €/mois pour 25 produits (plan Growth). Un dossier technique est généré en moins de 10 minutes. Pour un catalogue de 50 références, comptez quelques heures de travail. Sans outil : 500 à 2 000 € par référence via un cabinet conseil.",
  },
]

export default function GPSRDropshippingPage() {
  return (
    <>
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
            Dropshipping et GPSR :<br />
            <em className="italic font-light text-blue-700">êtes-vous en règle ?</em>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mb-8">
            En dropshipping, vous êtes juridiquement responsable de la conformité des produits que vous vendez —
            même si le fabricant est en Chine. Voici pourquoi le dropshipping est particulièrement exposé au GPSR,
            et comment vous protéger en 10 minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2">
                Vérifier ma conformité GPSR <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#obligations">
              <Button size="lg" variant="ghost" className="text-gray-600">
                Comprendre mes obligations →
              </Button>
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 max-w-sm gap-0 border border-gray-200 rounded-xl overflow-hidden bg-white">
            {[
              { n: "Vous", label: "êtes responsable" },
              { n: "10 min", label: "par produit" },
              { n: "29 €", label: "par mois" },
            ].map((s, i) => (
              <div key={s.n} className={`px-4 py-3 text-center ${i > 0 ? "border-l border-gray-200" : ""}`}>
                <p className="font-bold text-gray-900 text-sm tabular-nums">{s.n}</p>
                <p className="text-[10px] text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── POURQUOI LE DROPSHIPPING EST EXPOSÉ ── */}
        <section className="px-5 py-12 sm:py-16 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Pourquoi le dropshipping est particulièrement exposé au GPSR</h2>
            <div className="prose prose-gray max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-gray-600">
              <p>
                Le dropshipping repose sur un principe simple : vous vendez, votre fournisseur expédie.
                Mais sur le plan juridique, le GPSR ne reconnaît pas ce partage des rôles.
                Dès qu&apos;un produit est mis à disposition d&apos;un consommateur européen,
                <strong className="text-gray-900"> quelqu&apos;un dans la chaîne doit être responsable de sa conformité</strong>.
              </p>
              <p>
                En dropshipping depuis des fournisseurs chinois ou hors UE, ce &quot;quelqu&apos;un&quot;, c&apos;est vous.
                L&apos;article 4 du GPSR précise que si le fabricant n&apos;est pas établi dans l&apos;UE
                et n&apos;a pas désigné de représentant légal, la responsabilité incombe à
                <strong className="text-gray-900"> l&apos;importateur — la première personne qui introduit le produit sur le marché EU</strong>.
                C&apos;est vous qui acceptez la commande du client européen, et c&apos;est vous qui êtes l&apos;importateur légal.
              </p>
              <p>
                Résultat : sans dossier technique, sans déclaration de conformité, sans Personne Responsable EU —
                vous exposez votre activité à des sanctions immédiates, même si votre fournisseur est basé en Chine
                et que vous n&apos;avez jamais touché le produit physiquement.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                {
                  role: "Dropshipping depuis AliExpress / Alibaba",
                  desc: "Cas le plus courant et le plus risqué. Vous êtes importateur légal sur le marché EU. La documentation GPSR n'existe généralement pas côté fournisseur. Vous devez la constituer.",
                },
                {
                  role: "Dropshipping via Shopify + fournisseur EU",
                  desc: "Si votre fournisseur est établi dans l'UE et dispose d'une documentation GPSR complète, vous pouvez vous appuyer sur elle. Vérifiez qu'elle couvre bien votre marché et votre usage.",
                },
                {
                  role: "POD / Print On Demand",
                  desc: "Les produits physiques (t-shirts, mugs, accessoires) peuvent être soumis au GPSR selon leur catégorie. Les matériaux, les colorants et les composants entrent dans le champ de l'évaluation des risques.",
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

        {/* ── OBLIGATIONS ── */}
        <section id="obligations" className="px-5 py-12 sm:py-20 bg-[#F9F8F5]">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Obligations</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Ce que le GPSR impose aux dropshippers
            </h2>
            <p className="text-sm text-gray-500 mb-10 max-w-xl">
              6 étapes pour sécuriser votre activité de dropshipping. Conforva automatise les étapes 2, 3 et 4.
            </p>

            <div className="space-y-0 divide-y divide-gray-200 border-y border-gray-200">
              {STEPS.map((s) => {
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
                <p className="text-sm font-semibold text-blue-900">Conforva génère les documents GPSR pour chaque produit dropshipping</p>
                <p className="text-xs text-blue-700 mt-0.5">Dossier technique, évaluation des risques, déclaration de conformité — en moins de 10 minutes, sans avoir besoin des documents de votre fournisseur.</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Risques pour les dropshippers non conformes au GPSR</h2>
            <p className="text-sm text-gray-400 mb-8 max-w-xl">
              Le GPSR renforce les pouvoirs des autorités de surveillance et la responsabilité des opérateurs économiques —
              y compris les dropshippers.
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
              En dropshipping, la marge est souvent étroite. Une suspension de compte Amazon ou un blocage de boutique Shopify
              peut représenter des semaines de revenus perdus. Un accident produit sans dossier technique peut engager
              votre responsabilité personnelle. La conformité GPSR n&apos;est pas optionnelle — c&apos;est une protection.
            </p>
          </div>
        </section>

        {/* ── SOLUTION CONFORVA ── */}
        <section className="px-5 py-12 sm:py-20 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Comment Conforva protège votre activité de dropshipping</h2>
            <p className="text-sm text-gray-500 mb-10 max-w-xl">
              Conçu pour les e-commerçants, pas pour les avocats. Obtenez votre documentation GPSR complète en quelques minutes.
            </p>

            <div className="space-y-4">
              {[
                {
                  art: "Art. 22",
                  title: "Dossier technique sans votre fournisseur",
                  must: "Généré à partir de votre fiche produit",
                  content: [
                    "15 sections obligatoires pré-structurées selon le GPSR",
                    "Évaluation des risques guidée par catégorie de produit",
                    "Identification automatique des normes harmonisées applicables",
                    "Intégration des certificats et tests que votre fournisseur peut vous fournir",
                    "Export PDF immédiat, disponible en cas de contrôle ou de demande Amazon",
                    "Conservation sécurisée pendant 10 ans minimum",
                  ],
                },
                {
                  art: "Art. 24",
                  title: "Déclaration de conformité en tant qu'importateur",
                  must: "Signée en votre nom en tant qu'importateur EU",
                  content: [
                    "Document officiel pré-rempli avec vos informations d'importateur",
                    "Format conforme aux exigences des autorités européennes",
                    "Signature électronique intégrée",
                    "Valide pour chaque produit de votre catalogue dropshipping",
                  ],
                },
                {
                  art: "Art. 16",
                  title: "Personne Responsable EU pour les fournisseurs hors UE",
                  must: "Obligatoire si votre fournisseur est hors UE",
                  content: [
                    "Aide à la désignation d'une Personne Responsable EU",
                    "Texte prêt à intégrer dans vos fiches produit et vos listings",
                    "Coordonnées complètes au format requis par le GPSR",
                    "Applicable à toute votre boutique ou par produit selon votre besoin",
                  ],
                },
                {
                  art: "Art. 9",
                  title: "Étiquetage adapté au dropshipping",
                  must: "Dans la langue du pays de livraison",
                  content: [
                    "Avertissements de sécurité dans la langue de chaque pays de vente",
                    "Coordonnées de l'importateur (vous) à afficher sur le produit ou l'emballage",
                    "Format prêt à communiquer à votre fournisseur pour l'impression",
                    "Mise à jour automatique si vous ouvrez de nouveaux marchés",
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-10">Questions fréquentes — GPSR Dropshipping</h2>
            <div className="space-y-4">
              {FAQ.map((item) => (
                <div key={item.q} className="border border-gray-200 rounded-xl bg-white px-5 py-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-2">Vous avez une autre question sur le GPSR en dropshipping ?</p>
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
              Votre dropshipping conforme au GPSR<br />
              <em className="italic font-light text-blue-700">sans changer de modèle</em>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
              Dossier technique, évaluation des risques, déclaration de conformité et étiquetage —
              tout ce que le GPSR impose aux dropshippers, généré automatiquement en moins de 10 minutes par produit.
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
