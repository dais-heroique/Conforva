import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, FileText, Shield, AlertTriangle,
  ChevronRight, Clock, Globe, Users, Package,
} from "lucide-react"

export const metadata: Metadata = {
  title: "GPSR Shopify : obligations, risques et conformité pour votre boutique en ligne",
  description: "Tout ce que les marchands Shopify doivent savoir sur le GPSR : dossier technique, Personne Responsable EU, étiquetage, risques juridiques. Conformité automatisée avec Conforva.",
  keywords: [
    "GPSR Shopify", "conformité GPSR boutique en ligne", "Shopify GPSR obligation",
    "GPSR e-commerce Shopify", "conformité produit boutique en ligne",
    "GPSR vendeur Shopify", "règlement GPSR boutique Shopify",
    "GPSR 2024 Shopify", "conformité GPSR e-commerce", "GPSR vente en ligne",
  ],
  openGraph: {
    title: "GPSR pour votre boutique Shopify : obligations et solutions",
    description: "Ce que Shopify impose depuis le GPSR, les risques pour les marchands, et comment intégrer la conformité sans freiner vos ventes.",
    url: "https://conforva.com/gpsr-shopify",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPSR Shopify : obligations pour les marchands",
    description: "Dossier technique, Personne Responsable EU, étiquetage — ce que le GPSR impose à votre boutique Shopify.",
  },
  alternates: { canonical: "https://conforva.com/gpsr-shopify" },
}

const JSON_LD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Le GPSR s'applique-t-il à ma boutique Shopify ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Le GPSR (règlement UE 2023/988) s'applique à tous les produits non alimentaires vendus à des consommateurs européens, quel que soit le canal de vente. Si votre boutique Shopify vend à des clients dans l'UE, vous êtes soumis au GPSR — qu'il s'agisse d'une boutique .fr, d'une boutique internationale, ou d'une boutique en dropshipping.",
      },
    },
    {
      "@type": "Question",
      "name": "Shopify impose-t-il lui-même des obligations GPSR à ses marchands ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shopify a mis à jour ses conditions d'utilisation pour refléter les nouvelles obligations GPSR. La plateforme peut retirer des boutiques les produits signalés comme non conformes par les autorités. Surtout, les marchands Shopify restent directement responsables vis-à-vis des autorités nationales (DGCCRF, BSI, etc.) — Shopify ne les protège pas en cas de contrôle.",
      },
    },
    {
      "@type": "Question",
      "name": "Quels documents GPSR dois-je avoir pour ma boutique Shopify ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour chaque produit vendu à des consommateurs EU, vous devez disposer de : (1) un dossier technique (Art. 22) avec évaluation des risques, (2) une déclaration UE de conformité (Art. 24), (3) une Personne Responsable EU désignée si le fabricant est hors UE (Art. 16), et (4) un étiquetage dans la langue du pays de vente avec les avertissements de sécurité (Art. 9).",
      },
    },
    {
      "@type": "Question",
      "name": "Je vends des produits de marques tierces sur Shopify. Suis-je concerné ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. En tant que distributeur, vous devez vous assurer que les produits que vous vendez disposent de la documentation GPSR complète. Si le fabricant n'est pas joignable ou si la documentation est absente, la responsabilité peut vous revenir. En cas d'accident produit, l'absence de documentation aggrave significativement votre responsabilité civile.",
      },
    },
    {
      "@type": "Question",
      "name": "Le GPSR peut-il freiner mes ventes sur Shopify ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, si vous êtes bien organisé. La conformité GPSR est une contrainte documentaire, pas un obstacle commercial. Avec un outil comme Conforva, vous générez le dossier technique et la déclaration de conformité en moins de 10 minutes par produit. La conformité peut même devenir un avantage concurrentiel : les acheteurs B2B et les plateformes partenaires privilégient de plus en plus les fournisseurs conformes.",
      },
    },
  ],
}

const STEPS = [
  {
    n: "01",
    title: "Évaluation des risques de chaque produit",
    desc: "Identifiez les dangers potentiels — mécanique, chimique, thermique, électrique. Évaluez leur probabilité et gravité pour chaque produit de votre catalogue Shopify. Documentez les mesures de réduction selon ISO 12100:2010.",
    art: "Art. 22",
    icon: AlertTriangle,
    color: "bg-rose-500",
  },
  {
    n: "02",
    title: "Dossier technique par produit",
    desc: "15 sections obligatoires : description produit, dessins techniques, normes harmonisées, résultats de tests, instructions d'utilisation. Un dossier par référence produit dans votre boutique Shopify. Conservation 10 ans.",
    art: "Art. 22",
    icon: FileText,
    color: "bg-blue-600",
  },
  {
    n: "03",
    title: "Déclaration UE de conformité",
    desc: "Document officiel signé attestant que chaque produit de votre boutique respecte le GPSR. Doit être disponible à la demande des autorités ou de Shopify en cas de signalement.",
    art: "Art. 24",
    icon: Shield,
    color: "bg-indigo-600",
  },
  {
    n: "04",
    title: "Personne Responsable EU",
    desc: "Si votre fournisseur est hors UE, un représentant légal dans l'Union Européenne doit être désigné et ses coordonnées doivent figurer sur vos fiches produit et vos étiquettes.",
    art: "Art. 16",
    icon: Users,
    color: "bg-violet-600",
  },
  {
    n: "05",
    title: "Étiquetage sécurité multilingue",
    desc: "Avertissements de sécurité dans la langue de chaque pays où vous vendez via votre boutique Shopify. Pour une boutique internationale : une traduction par langue de destination obligatoire.",
    art: "Art. 9",
    icon: Globe,
    color: "bg-emerald-600",
  },
  {
    n: "06",
    title: "Identification du fabricant",
    desc: "Nom, adresse et email du fabricant (ou de son représentant EU) doivent figurer sur le produit ou l'emballage. Une référence permettant d'identifier le produit doit être clairement visible.",
    art: "Art. 9",
    icon: Package,
    color: "bg-amber-500",
  },
]

const RISKS = [
  { label: "Retrait administratif des produits", sub: "Sur injonction de la DGCCRF, du BSI ou d'une autorité nationale", color: "border-red-200 bg-red-50 text-red-700" },
  { label: "Blocage de la boutique", sub: "Shopify peut suspendre une boutique signalée aux autorités", color: "border-orange-200 bg-orange-50 text-orange-700" },
  { label: "Responsabilité civile et pénale", sub: "Aggravée en cas d'absence de documentation lors d'un accident", color: "border-amber-200 bg-amber-50 text-amber-700" },
  { label: "Amendes administratives", sub: "Selon la législation de chaque État membre UE", color: "border-rose-200 bg-rose-50 text-rose-700" },
  { label: "Blocage douanier", sub: "Pour les commandes importées sans documentation GPSR", color: "border-red-200 bg-red-50 text-red-700" },
]

const FAQ = [
  {
    q: "Mon produit est certifié CE. Est-ce suffisant pour Shopify et le GPSR ?",
    a: "Le marquage CE couvre certaines directives sectorielles (jouets, équipements électriques, etc.) mais n'est pas équivalent à la conformité GPSR. Le GPSR exige en plus un dossier technique spécifique (Art. 22), une déclaration de conformité (Art. 24) et une Personne Responsable EU si le fabricant est hors UE. Un marquage CE peut simplifier certaines sections du dossier technique, mais ne le remplace pas.",
  },
  {
    q: "J'utilise un fournisseur AliExpress ou Alibaba. Que dois-je faire ?",
    a: "Vous devez obtenir auprès de votre fournisseur les documents de test existants (rapports de laboratoire, certifications) et constituer vous-même le dossier technique GPSR. Si le fournisseur est en Chine, vous devez impérativement désigner une Personne Responsable EU. Conforva vous guide dans cette démarche et génère automatiquement l'ensemble des documents.",
  },
  {
    q: "Combien de produits Shopify dois-je mettre en conformité GPSR ?",
    a: "Tous les produits non alimentaires vendus à des consommateurs dans l'UE. Si votre boutique Shopify vend à la fois en France et hors UE, les obligations GPSR s'appliquent uniquement aux produits achetés par des clients européens. Vous pouvez néanmoins avoir intérêt à conformer l'ensemble du catalogue pour simplifier la gestion.",
  },
  {
    q: "Le GPSR s'applique-t-il aux produits numériques ou aux services ?",
    a: "Non. Le GPSR s'applique exclusivement aux produits physiques de consommation non alimentaires. Les produits numériques (ebooks, logiciels, formations en ligne) et les services sont exclus du champ d'application du GPSR.",
  },
  {
    q: "Que se passe-t-il si un client EU signale un produit de ma boutique Shopify ?",
    a: "Un signalement client peut déclencher une enquête de l'autorité nationale de surveillance du marché (DGCCRF en France, BSI en Allemagne). Si votre documentation GPSR est à jour, vous pouvez répondre rapidement et éviter des sanctions. Sans documentation, vous vous exposez à un retrait forcé du produit et à des amendes. Avec Conforva, tous vos dossiers sont centralisés et accessibles en 1 clic.",
  },
]

export default function GPSRShopifyPage() {
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
            GPSR pour votre boutique Shopify :<br />
            <em className="italic font-light text-blue-700">obligations et solutions</em>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mb-8">
            Le GPSR s&apos;applique à toutes les boutiques en ligne vendant en Europe — y compris Shopify.
            Voici ce que la réglementation impose, les risques pour votre boutique, et comment rester conforme sans freiner vos ventes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2">
                Mettre ma boutique en conformité <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#etapes">
              <Button size="lg" variant="ghost" className="text-gray-600">
                Voir les obligations →
              </Button>
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 max-w-sm gap-0 border border-gray-200 rounded-xl overflow-hidden bg-white">
            {[
              { n: "10 min", label: "par produit" },
              { n: "6", label: "obligations clés" },
              { n: "29 €", label: "par mois" },
            ].map((s, i) => (
              <div key={s.n} className={`px-4 py-3 text-center ${i > 0 ? "border-l border-gray-200" : ""}`}>
                <p className="font-bold text-gray-900 text-sm tabular-nums">{s.n}</p>
                <p className="text-[10px] text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── POURQUOI SHOPIFY EST CONCERNÉ ── */}
        <section className="px-5 py-12 sm:py-16 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Pourquoi votre boutique Shopify est concernée par le GPSR</h2>
            <div className="prose prose-gray max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-gray-600">
              <p>
                Le <strong className="text-gray-900">règlement (UE) 2023/988 (GPSR)</strong> ne distingue pas les canaux de vente.
                Que vous vendiez sur Amazon, en boutique physique ou via une boutique Shopify —
                si un consommateur dans l&apos;Union Européenne peut acheter votre produit, vous êtes soumis au GPSR.
              </p>
              <p>
                Shopify est utilisé par des centaines de milliers de marchands qui vendent en Europe. Depuis décembre 2024,
                les autorités nationales de surveillance du marché (DGCCRF en France, BSI en Allemagne, AFSCA en Belgique)
                ont des pouvoirs renforcés pour <strong className="text-gray-900">enquêter, bloquer et sanctionner</strong> les vendeurs
                en ligne non conformes, qu&apos;ils passent par une marketplace ou par leur propre boutique.
              </p>
              <p>
                La différence avec Amazon ou d&apos;autres marketplaces : Shopify ne contrôle pas activement la conformité de vos produits.
                C&apos;est à vous, en tant que marchand, de vous assurer que vos produits disposent de la documentation obligatoire.
                <strong className="text-gray-900"> En cas de problème, vous êtes directement en première ligne.</strong>
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                {
                  role: "Boutique Shopify B2C",
                  desc: "Vous vendez directement à des consommateurs européens. Vous êtes importateur ou distributeur et devez disposer de la documentation GPSR complète pour chaque produit.",
                },
                {
                  role: "Boutique Shopify internationale",
                  desc: "Si vous vendez dans plusieurs pays EU (FR, DE, IT...), les obligations GPSR s'appliquent dans chaque pays. L'étiquetage multilingue est obligatoire.",
                },
                {
                  role: "Boutique Shopify dropshipping",
                  desc: "Vous êtes considéré comme distributeur ou importateur selon l'origine de vos produits. La responsabilité GPSR vous incombe même si vous ne gérez pas le stock.",
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

        {/* ── 6 OBLIGATIONS ── */}
        <section id="etapes" className="px-5 py-12 sm:py-20 bg-[#F9F8F5]">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Obligations</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Ce que le GPSR impose à votre boutique Shopify
            </h2>
            <p className="text-sm text-gray-500 mb-10 max-w-xl">
              6 obligations documentaires, chacune liée à un article précis du règlement. Conforva automatise les 4 premières.
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
                <p className="text-sm font-semibold text-blue-900">Conforva automatise les obligations 1 à 4</p>
                <p className="text-xs text-blue-700 mt-0.5">Évaluation des risques, dossier technique, déclaration de conformité et aide à la désignation de la Personne Responsable EU — en moins de 10 minutes par produit.</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Risques pour les marchands Shopify non conformes au GPSR</h2>
            <p className="text-sm text-gray-400 mb-8 max-w-xl">
              Les autorités de surveillance du marché ont des pouvoirs renforcés depuis décembre 2024 et ciblent aussi les boutiques en ligne.
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
              Contrairement aux marketplaces qui peuvent retirer un produit silencieusement, une action des autorités
              sur votre boutique Shopify peut toucher l&apos;ensemble de votre activité en ligne. La conformité GPSR protège
              votre boutique, votre réputation et votre responsabilité personnelle.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-5 py-12 sm:py-20 bg-[#F9F8F5]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10">Questions fréquentes — GPSR Shopify</h2>
            <div className="space-y-4">
              {FAQ.map((item) => (
                <div key={item.q} className="border border-gray-200 rounded-xl bg-white px-5 py-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-2">Vous avez une autre question sur le GPSR pour votre boutique ?</p>
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
              Votre boutique Shopify conforme au GPSR<br />
              <em className="italic font-light text-blue-700">sans freiner vos ventes</em>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
              Dossier technique, évaluation des risques, déclaration de conformité et étiquetage multilingue —
              tout ce que le GPSR impose à votre boutique Shopify, généré automatiquement en moins de 10 minutes.
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
