import Link from "next/link"
import type { Metadata } from "next"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { ChevronDown } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes",
  description: "Toutes les réponses sur la conformité GPSR : dossier technique obligatoire, analyse de risque, déclaration de conformité, étiquetage, personne responsable EU et utilisation de Conforva.",
  keywords: [
    "FAQ GPSR", "questions conformité GPSR", "dossier technique obligatoire",
    "analyse de risque produit", "déclaration conformité UE", "personne responsable EU",
  ],
  openGraph: {
    title: "FAQ — Questions fréquentes sur la conformité GPSR",
    description: "Toutes les réponses sur le GPSR : dossier technique, analyse de risque, déclaration de conformité, étiquetage et personne responsable EU.",
    url: "https://conforva.com/faq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ GPSR — Questions fréquentes",
    description: "Toutes les réponses sur le GPSR : dossier technique, analyse de risque, déclaration de conformité.",
  },
  alternates: { canonical: "https://conforva.com/faq" },
}

const SECTIONS = [
  {
    title: "Réglementation GPSR",
    questions: [
      {
        q: "Qu'est-ce que le règlement GPSR (UE) 2023/988 ?",
        a: "Le General Product Safety Regulation (GPSR) est le règlement européen sur la sécurité générale des produits, entré en vigueur le 13 décembre 2024. Il remplace la directive 2001/95/CE et s'applique à tous les produits de consommation vendus dans l'Union Européenne, y compris les ventes en ligne. Il impose notamment la constitution d'un dossier technique, une analyse de risque, une déclaration de conformité et la désignation d'une Personne Responsable pour les fabricants hors UE.",
      },
      {
        q: "Qui est concerné par le règlement GPSR ?",
        a: "Tout acteur qui met un produit de consommation sur le marché européen : fabricants, importateurs, distributeurs, places de marché en ligne (marketplaces), et opérateurs d'exécution. Si vous vendez des produits sur Amazon EU, Shopify, votre propre boutique ou tout autre canal à destination de consommateurs européens, vous êtes concerné — même si vous êtes basé hors de l'UE.",
      },
      {
        q: "Quels produits sont couverts par le GPSR ?",
        a: "Tous les produits de consommation non alimentaires qui ne sont pas couverts par une réglementation sectorielle spécifique (jouets, dispositifs médicaux, machines, etc.). Cela inclut notamment : bougies, textiles, cosmétiques, électronique, décoration, mobilier, articles de sport, puériculture, ustensiles de cuisine, éclairage, outillage et bien d'autres catégories.",
      },
      {
        q: "Qu'est-ce qu'un dossier technique GPSR ?",
        a: "Le dossier technique (Article 22 du GPSR) est l'ensemble de la documentation qui prouve que votre produit est sûr. Il comprend : la description complète du produit, l'analyse de risque, les normes appliquées, les résultats de tests, les instructions d'utilisation, l'étiquetage, et les informations sur le fabricant. Il doit être conservé pendant 10 ans à compter de la mise sur le marché.",
      },
      {
        q: "Qu'est-ce qu'une Personne Responsable EU (Article 16) ?",
        a: "La Personne Responsable est un opérateur économique établi dans l'Union Européenne qui est désigné par le fabricant non-UE pour assumer la responsabilité de la conformité des produits. Elle sert de point de contact pour les autorités de surveillance du marché européennes. Cette désignation est obligatoire pour tout fabricant établi hors de l'UE.",
      },
      {
        q: "Quelle est la différence entre dossier technique, analyse de risque et déclaration de conformité ?",
        a: "Le dossier technique est le document-cadre qui réunit toutes les preuves de conformité. L'analyse de risque est une section du dossier qui identifie et évalue tous les dangers potentiels du produit selon la méthodologie ISO 12100. La déclaration UE de conformité (DoC, Article 24) est le document officiel signé par le fabricant qui atteste formellement que le produit répond aux exigences applicables.",
      },
    ],
  },
  {
    title: "Conforva — Fonctionnement",
    questions: [
      {
        q: "Comment fonctionne la génération de documents par l'IA ?",
        a: "Vous renseignez les informations de votre produit (nom, catégorie, matériaux, usage prévu, marchés cibles). L'IA analyse ces données avec le Règlement GPSR, les normes harmonisées applicables à votre catégorie, et génère une analyse de risque structurée selon ISO 12100:2010, puis les 15 sections requises du dossier technique. Le tout est produit en quelques minutes et présenté pour relecture.",
      },
      {
        q: "Les documents générés par Conforva sont-ils légalement valides ?",
        a: "Conforva génère une base documentaire structurée, complète et conforme au format requis par le règlement GPSR. Cependant, les documents générés automatiquement ne constituent pas un avis juridique. Vous devez les relire, les valider, les compléter avec vos données réelles (résultats de tests, certificats), et les signer avant de les considérer comme définitifs. Pour des produits à risque élevé, la validation par un expert en conformité reste recommandée.",
      },
      {
        q: "Puis-je importer mes produits depuis Shopify ou WooCommerce ?",
        a: "Oui, les plans Growth et Pro incluent les connecteurs Shopify et WooCommerce. Pour Shopify, collez simplement l'URL de votre fiche produit — Conforva récupère automatiquement le nom, la description, le SKU et les matériaux. Pour WooCommerce, une connexion via clés API REST vous permet de sélectionner vos produits depuis Conforva.",
      },
      {
        q: "Dans quelles langues puis-je générer mes étiquettes ?",
        a: "Le plan Gratuit inclut le français et l'anglais. Le plan Starter ajoute l'allemand, l'italien et l'espagnol. Les plans Growth et Pro donnent accès aux 7 langues : FR, EN, DE, IT, ES, ZH (chinois simplifié) et JA (japonais). Les langues sont sélectionnées au moment de la génération de chaque dossier.",
      },
      {
        q: "Est-ce que le watermark disparaît sur les plans payants ?",
        a: "Oui. Sur le plan Gratuit, tous les exports PDF portent un watermark 'PROJET — non validé'. Sur les plans payants, le watermark disparaît dès que vous avez validé le dossier manuellement dans l'onglet Analyse de risque.",
      },
    ],
  },
  {
    title: "Compte et facturation",
    questions: [
      {
        q: "Est-ce que l'essai gratuit nécessite une carte bancaire ?",
        a: "Non. Vous pouvez créer un compte gratuitement avec votre email ou votre compte Google, et générer un premier dossier sans renseigner aucune information de paiement.",
      },
      {
        q: "Puis-je changer de plan à tout moment ?",
        a: "Oui. Vous pouvez upgrader ou downgrader votre plan depuis la section Facturation de votre tableau de bord. Les changements prennent effet immédiatement, avec un calcul au prorata pour la période en cours.",
      },
      {
        q: "Que se passe-t-il si j'atteins la limite de références de mon plan ?",
        a: "Vous pouvez créer des produits supplémentaires en upgradeant votre plan depuis votre tableau de bord. Vos données existantes sont toujours conservées.",
      },
      {
        q: "Puis-je obtenir un remboursement ?",
        a: "Conformément à l'article L. 221-18 du Code de la consommation, un droit de rétractation de 14 jours s'applique à partir de la souscription. Au-delà, aucun remboursement au prorata n'est accordé sauf défaut majeur du service. Contactez support@conforva.com avec votre numéro de commande.",
      },
    ],
  },
  {
    title: "Données et sécurité",
    questions: [
      {
        q: "Où sont stockées mes données ?",
        a: "Vos données sont stockées sur l'infrastructure Supabase en région EU-West (Union Européenne). Les paiements transitent exclusivement par Stripe. L'inférence IA est réalisée via l'API Groq, sans stockage permanent de vos données produits côté Groq.",
      },
      {
        q: "Mes données sont-elles utilisées pour entraîner l'IA ?",
        a: "Non. Les données de vos produits et de vos dossiers ne sont jamais utilisées pour entraîner ou améliorer des modèles d'IA tiers. Vos informations restent strictement confidentielles et ne sont accessibles qu'à vous.",
      },
      {
        q: "Conforva est-il conforme au RGPD ?",
        a: "Oui. Conforva est conforme au Règlement Général sur la Protection des Données (RGPD / GDPR). Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à support@conforva.com.",
      },
    ],
  },
]

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": SECTIONS.flatMap(s => s.questions).map(q => ({
    "@type": "Question",
    "name": q.q,
    "acceptedAnswer": { "@type": "Answer", "text": q.a },
  })),
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <PublicNav />

      <main className="max-w-3xl mx-auto px-5 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Support</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Vous ne trouvez pas ce que vous cherchez ?{" "}
            <Link href="/contact" className="text-blue-600 underline underline-offset-2 hover:text-blue-700">
              Contactez-moi directement
            </Link>.
          </p>
        </div>

        <div className="space-y-12">
          {SECTIONS.map(section => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.questions.map(item => (
                  <details key={item.q} className="group rounded-xl border border-gray-100 bg-white overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-sm text-gray-900">{item.q}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-blue-50 border border-blue-100 p-8 text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Vous avez une autre question ?</h2>
          <p className="text-sm text-gray-500 mb-5">Envoyez un message à support@conforva.com.</p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
              Envoyer un message
            </button>
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
