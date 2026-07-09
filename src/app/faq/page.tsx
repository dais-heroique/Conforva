import Link from "next/link"
import type { Metadata } from "next"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { ChevronDown } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ — Questions sur la veille concurrentielle Conforva",
  description: "Toutes les réponses sur Conforva : suivi des prix concurrents, repricing, alertes, intégrations Shopify/Amazon/WooCommerce, plans et facturation.",
  keywords: [
    "FAQ Conforva", "questions veille concurrentielle", "comment surveiller prix concurrents",
    "repricing automatique Shopify", "suivi prix Amazon", "alerte prix concurrent",
    "intelligence concurrentielle e-commerce",
  ],
  openGraph: {
    title: "FAQ Conforva — Vos questions sur la veille concurrentielle",
    description: "Comment fonctionne la surveillance des prix ? Quelles intégrations ? Quel plan choisir ? Toutes les réponses ici.",
    url: "https://conforva.com/faq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ Conforva — Veille concurrentielle e-commerce",
    description: "Comment surveiller les prix de vos concurrents ? Shopify, Amazon, WooCommerce — toutes les réponses.",
  },
  alternates: { canonical: "https://conforva.com/faq" },
}

const SECTIONS = [
  {
    title: "Fonctionnement de Conforva",
    questions: [
      {
        q: "Comment Conforva surveille-t-il les prix de mes concurrents ?",
        a: "Conforva utilise des scrapers web qui visitent régulièrement les pages de vos concurrents et capturent le prix affiché, la disponibilité (en stock / rupture) et les nouvelles références apparues. La fréquence varie selon votre plan : toutes les heures sur Pro, toutes les 6h sur Growth, toutes les 24h sur Starter. Chaque changement est horodaté et conservé dans votre historique de prix.",
      },
      {
        q: "Qu'est-ce qu'un 'concurrent' dans Conforva ?",
        a: "Un concurrent est un site e-commerce que vous souhaitez surveiller — une URL de domaine ou de boutique. Conforva surveille les produits de ce concurrent qui correspondent aux vôtres. Vous pouvez ajouter des boutiques Shopify, des vendeurs Amazon, des sites WooCommerce, ou n'importe quel site e-commerce avec des fiches produits accessibles publiquement.",
      },
      {
        q: "Que sont les rapports IA hebdomadaires ?",
        a: "Chaque lundi matin, Conforva génère un rapport d'intelligence concurrentielle pour votre boutique, alimenté par l'API Gemini AI. Ce rapport analyse les mouvements de prix de la semaine écoulée, identifie les tendances importantes (baisse coordonnée, promotion flash, nouveau concurrent agressif) et vous propose des recommandations actionnables : quels prix ajuster, quels produits pousser, quels concurrents surveiller de près.",
      },
      {
        q: "Comment fonctionnent les alertes de prix ?",
        a: "Vous créez des alertes sur des critères précis : « m'alerter si un concurrent baisse son prix de plus de 5% », « m'alerter si un produit passe en rupture de stock chez X ». Dès que la condition est remplie, vous recevez une notification par email avec le détail du changement. Les alertes sont vérifiées à chaque scan des concurrents.",
      },
    ],
  },
  {
    title: "Intégrations & compatibilité",
    questions: [
      {
        q: "Conforva fonctionne-t-il avec Shopify ?",
        a: "Oui. Vous pouvez ajouter n'importe quelle boutique Shopify comme concurrent — Conforva surveille automatiquement ses produits et prix. Côté import de votre propre catalogue, la connexion Shopify (via OAuth ou clé API) est disponible sur les plans Growth et Pro et vous permet d'importer vos références en un clic.",
      },
      {
        q: "Puis-je surveiller des vendeurs Amazon ?",
        a: "Oui. Entrez l'URL du profil vendeur ou d'une page produit Amazon et Conforva intègre ce concurrent dans votre tableau de bord. La surveillance Amazon inclut le prix, le statut Buy Box, la disponibilité et les prix des vendeurs tiers sur la même fiche.",
      },
      {
        q: "WooCommerce est-il supporté ?",
        a: "Oui, pour la surveillance de sites concurrents WooCommerce (accès public). Pour importer votre propre catalogue WooCommerce, une connexion via les clés API REST WooCommerce est disponible sur les plans Growth et Pro.",
      },
      {
        q: "Puis-je surveiller n'importe quel site e-commerce ?",
        a: "Dans la plupart des cas, oui. Conforva peut surveiller tout site dont les fiches produits sont accessibles publiquement. Les sites avec protection anti-bot agressive (Cloudflare, etc.) peuvent présenter des limitations. Si un concurrent spécifique pose problème, contactez notre support.",
      },
    ],
  },
  {
    title: "Plans & facturation",
    questions: [
      {
        q: "Quelle est la différence entre les plans ?",
        a: "Starter (29€/mois) : 5 concurrents, 50 produits, alertes email, rapports hebdomadaires IA. Growth (79€/mois) : 20 concurrents, 500 produits, alertes avancées, intégrations Shopify/WooCommerce, fréquence de scan toutes les 6h. Pro (199€/mois) : concurrents illimités, 5 000 produits, scan toutes les heures, alertes temps réel, API accès. Enterprise : sur mesure.",
      },
      {
        q: "Y a-t-il un essai gratuit ?",
        a: "Oui. Chaque plan inclut 14 jours d'essai gratuit — aucune carte bancaire requise pour démarrer. À la fin des 14 jours, vous choisissez un plan ou votre compte passe en lecture seule (données conservées 30 jours).",
      },
      {
        q: "Puis-je changer de plan à tout moment ?",
        a: "Oui. Upgrade ou downgrade depuis la section Facturation de votre tableau de bord. Les changements prennent effet immédiatement avec un calcul au prorata pour la période en cours.",
      },
      {
        q: "Puis-je obtenir un remboursement ?",
        a: "Un droit de rétractation de 14 jours s'applique à compter de la souscription. Au-delà, contactez contact.conforva@gmail.com avec votre numéro de commande — nous étudions chaque situation au cas par cas.",
      },
    ],
  },
  {
    title: "Données et sécurité",
    questions: [
      {
        q: "Où sont stockées mes données ?",
        a: "Vos données sont stockées dans une base Turso (libSQL) hébergée en Union Européenne. Les paiements transitent exclusivement par Stripe. L'inférence IA est réalisée via l'API Gemini (Google), sans stockage permanent de vos données côté Google.",
      },
      {
        q: "Mes données sont-elles utilisées pour entraîner l'IA ?",
        a: "Non. Les données de votre catalogue et de vos concurrents ne sont jamais utilisées pour entraîner des modèles d'IA tiers. Vos informations concurrentielles restent strictement confidentielles.",
      },
      {
        q: "Conforva est-il conforme au RGPD ?",
        a: "Oui. Conforva est conforme au RGPD. Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez contact.conforva@gmail.com.",
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
    <div className="min-h-screen bg-[#060D09]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <PublicNav />

      <main className="max-w-3xl mx-auto px-5 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00E676] mb-2">Support</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Questions fréquentes</h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Vous ne trouvez pas ce que vous cherchez ?{" "}
            <Link href="/contact" className="text-[#00E676] underline underline-offset-2 hover:text-[#00E676]/80">
              Contactez-moi directement
            </Link>.
          </p>
        </div>

        <div className="space-y-12">
          {SECTIONS.map(section => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-white mb-5 pb-3 border-b border-white/10">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.questions.map(item => (
                  <details key={item.q} className="group rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none hover:bg-white/8 transition-colors">
                      <span className="font-medium text-sm text-white">{item.q}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-400 leading-relaxed border-t border-white/5">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-[#00E676]/10 border border-[#00E676]/20 p-8 text-center">
          <h2 className="text-lg font-bold text-white mb-2">Vous avez une autre question ?</h2>
          <p className="text-sm text-gray-400 mb-5">Envoyez un message à contact.conforva@gmail.com.</p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#00E676] px-5 py-2.5 text-sm font-semibold text-[#060D09] hover:bg-[#00E676]/90 transition-colors">
              Envoyer un message
            </button>
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
