import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Shield, Lock, Server, CreditCard, Eye, Database, Bell } from "lucide-react"

export const metadata: Metadata = {
  title: "Sécurité & Protection des données — Conforva",
  description: "Comment Conforva protège vos données : chiffrement TLS 1.3, base de données Turso, authentification sécurisée, conformité RGPD et gestion des incidents sous 72h.",
  keywords: [
    "sécurité Conforva", "protection données RGPD", "chiffrement TLS", "conformité RGPD SaaS",
    "sécurité veille concurrentielle", "données e-commerce sécurisées",
  ],
  openGraph: {
    title: "Sécurité & Protection des données — Conforva",
    description: "Chiffrement TLS 1.3, authentification sécurisée et conformité RGPD. Vos données de veille concurrentielle sont protégées et accessibles uniquement par vous.",
    url: "https://conforva.com/security",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sécurité des données — Conforva",
    description: "Chiffrement TLS, RGPD. Comment Conforva protège vos données de veille concurrentielle.",
  },
  alternates: { canonical: "https://conforva.com/security" },
}

const SECTIONS = [
  {
    icon: Server,
    title: "Hébergement & Infrastructure",
    items: [
      { label: "Hébergement applicatif", val: "Vercel (réseau CDN global, edge sécurisé)" },
      { label: "Base de données", val: "Turso Inc. (SQLite distribué, compatible libSQL)" },
      { label: "Chiffrement des données en transit", val: "TLS 1.3 sur toutes les connexions" },
      { label: "Chiffrement des données au repos", val: "Chiffrement au niveau du stockage Turso" },
      { label: "Disponibilité SLA", val: "99,9 % (infrastructure Vercel + Turso)" },
    ],
  },
  {
    icon: Lock,
    title: "Authentification & Accès",
    items: [
      { label: "Authentification", val: "Email + mot de passe sécurisé (NextAuth.js v5)" },
      { label: "Sessions", val: "JWT à durée limitée, stockés en cookie HttpOnly" },
      { label: "Mots de passe", val: "Hachés avec bcrypt (coût 12), jamais stockés en clair" },
      { label: "Isolation des données", val: "Chaque utilisateur n'accède qu'à ses propres données (filtrage applicatif)" },
      { label: "Accès employés", val: "Accès aux données de production restreint et journalisé" },
    ],
  },
  {
    icon: CreditCard,
    title: "Paiements",
    items: [
      { label: "Processeur de paiement", val: "Stripe — certifié PCI DSS Level 1" },
      { label: "Données de carte", val: "Jamais stockées chez Conforva — gérées exclusivement par Stripe" },
      { label: "Abonnements", val: "Gérés via Stripe Subscriptions & Billing Portal" },
    ],
  },
  {
    icon: Eye,
    title: "Traitement des données IA",
    items: [
      { label: "Inférence IA", val: "API Google Gemini — requêtes sans stockage persistant" },
      { label: "Entraînement", val: "Vos données ne sont jamais utilisées pour entraîner des modèles" },
      { label: "Données surveillées", val: "Uniquement des données publiques issues de sites concurrents" },
      { label: "Isolation", val: "Les données de veille de chaque utilisateur restent dans son espace" },
    ],
  },
  {
    icon: Database,
    title: "Conservation des données",
    items: [
      { label: "Données de compte", val: "Pendant la durée de l'abonnement + 3 ans" },
      { label: "Historiques de prix", val: "Durée de l'abonnement, puis 30 jours après résiliation" },
      { label: "Données de facturation", val: "5 ans (obligation comptable française)" },
      { label: "Suppression de compte", val: "Suppression complète sur demande (sauf obligations légales)" },
    ],
  },
  {
    icon: Bell,
    title: "Incidents & Notification",
    items: [
      { label: "Détection d'incidents", val: "Monitoring en temps réel via Vercel et Turso" },
      { label: "Délai de notification RGPD", val: "72h maximum après détection d'une violation" },
      { label: "Communication", val: "Notification par email aux utilisateurs affectés" },
      { label: "Contact sécurité", val: "contact.conforva@gmail.com" },
    ],
  },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#08090C]">
      <PublicNav />

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-4 py-2 mb-5">
            <Shield className="h-4 w-4 text-[#8B5CF6]" />
            <span className="text-sm font-medium text-[#A78BFA]">Sécurité des données</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Sécurité & Confidentialité</h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
            La sécurité de vos données est une priorité non négociable. Voici exactement comment nous protégeons
            vos informations, où elles sont stockées, et qui y a accès.
          </p>
        </div>

        {/* Summary badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {[
            { label: "Hébergement", val: "Global (Vercel)" },
            { label: "Chiffrement", val: "TLS 1.3" },
            { label: "Paiements", val: "PCI DSS L1 (Stripe)" },
            { label: "Conformité", val: "RGPD / GDPR" },
          ].map(b => (
            <div key={b.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">{b.label}</p>
              <p className="text-sm font-semibold text-white">{b.val}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {SECTIONS.map(s => {
            const Icon = s.icon
            return (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/8">
                  <div className="h-8 w-8 rounded-lg bg-[#8B5CF6]/15 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-[#A78BFA]" />
                  </div>
                  <h2 className="font-semibold text-white">{s.title}</h2>
                </div>
                <div className="divide-y divide-white/6">
                  {s.items.map(item => (
                    <div key={item.label} className="flex items-start gap-4 px-6 py-3.5">
                      <span className="text-xs text-gray-500 w-52 shrink-0 pt-0.5">{item.label}</span>
                      <span className="text-sm text-gray-300">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sub-processors */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-semibold text-white mb-4">Sous-traitants (sous-processeurs)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left font-medium text-gray-500 pb-3 pr-6">Service</th>
                  <th className="text-left font-medium text-gray-500 pb-3 pr-6">Rôle</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Localisation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {[
                  { s: "Turso Inc.", role: "Base de données", loc: "États-Unis (SCCs UE-US)" },
                  { s: "Vercel Inc.", role: "Hébergement applicatif", loc: "Global CDN" },
                  { s: "Stripe Inc.", role: "Paiements & abonnements", loc: "États-Unis (SCCs UE-US)" },
                  { s: "Google LLC", role: "Inférence IA (Gemini)", loc: "États-Unis (SCCs UE-US)" },
                ].map(r => (
                  <tr key={r.s}>
                    <td className="py-3 pr-6 font-medium text-gray-300">{r.s}</td>
                    <td className="py-3 pr-6 text-gray-400">{r.role}</td>
                    <td className="py-3 text-gray-400">{r.loc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-600">SCCs = Standard Contractual Clauses (mécanisme de transfert RGPD approuvé par la Commission européenne).</p>
        </div>

        {/* RGPD rights */}
        <div className="mt-6 rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 p-6">
          <h2 className="font-semibold text-white mb-3">Vos droits RGPD</h2>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
            accès, rectification, effacement, limitation, portabilité et opposition au traitement.
          </p>
          <p className="text-sm text-gray-400">
            Pour exercer vos droits ou signaler un incident de sécurité :{" "}
            <a href="mailto:contact.conforva@gmail.com" className="text-[#8B5CF6] hover:underline font-medium">
              contact.conforva@gmail.com
            </a>
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600">
            Dernière mise à jour : juillet 2026 ·{" "}
            <Link href="/privacy" className="underline hover:text-gray-400 transition-colors">Politique de confidentialité complète</Link>
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
