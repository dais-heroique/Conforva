import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Shield, Lock, Server, CreditCard, Eye, Database, Bell } from "lucide-react"

export const metadata: Metadata = {
  title: "Sécurité & Confidentialité | Conforva",
  description: "Comment Conforva protège vos données : chiffrement, hébergement EU, conformité RGPD, gestion des accès et traitement des incidents.",
}

const SECTIONS = [
  {
    icon: Server,
    color: "bg-blue-100 text-blue-700",
    title: "Hébergement & Infrastructure",
    items: [
      { label: "Hébergement applicatif", val: "Vercel (réseau CDN global, edge sécurisé)" },
      { label: "Base de données", val: "Supabase — région EU-West (Union Européenne)" },
      { label: "Chiffrement des données au repos", val: "AES-256 (standard bancaire)" },
      { label: "Chiffrement des données en transit", val: "TLS 1.3 sur toutes les connexions" },
      { label: "Disponibilité SLA", val: "99,9 % (infrastructure Vercel + Supabase)" },
    ],
  },
  {
    icon: Lock,
    color: "bg-indigo-100 text-indigo-700",
    title: "Authentification & Accès",
    items: [
      { label: "Authentification", val: "Magic link par email + OAuth Google (Supabase Auth)" },
      { label: "Sessions", val: "JWT à durée limitée, rotation automatique des tokens" },
      { label: "Row Level Security (RLS)", val: "Chaque utilisateur n'accède qu'à ses propres données" },
      { label: "Mots de passe", val: "Aucun mot de passe stocké — authentification sans mot de passe uniquement" },
      { label: "Accès employés", val: "Accès aux données de production restreint et journalisé" },
    ],
  },
  {
    icon: CreditCard,
    color: "bg-emerald-100 text-emerald-700",
    title: "Paiements",
    items: [
      { label: "Processeur de paiement", val: "Stripe — certifié PCI DSS Level 1" },
      { label: "Données de carte", val: "Jamais stockées chez Conforva — gérées exclusivement par Stripe" },
      { label: "Abonnements", val: "Gérés via Stripe Subscriptions & Billing Portal" },
    ],
  },
  {
    icon: Eye,
    color: "bg-violet-100 text-violet-700",
    title: "Traitement des données IA",
    items: [
      { label: "Inférence IA", val: "API Groq (modèle Llama 3.3 70B) — requêtes sans stockage persistant" },
      { label: "Entraînement", val: "Vos données ne sont jamais utilisées pour entraîner des modèles" },
      { label: "Logs d'inférence", val: "Non conservés par Groq au-delà du traitement de la requête" },
      { label: "Données produits", val: "Stockées uniquement dans votre espace Supabase EU" },
    ],
  },
  {
    icon: Database,
    color: "bg-amber-100 text-amber-700",
    title: "Conservation des données",
    items: [
      { label: "Données de compte", val: "Conservées pendant la durée de votre abonnement + 3 ans" },
      { label: "Dossiers techniques GPSR", val: "10 ans (obligation réglementaire GPSR Art. 22)" },
      { label: "Données de facturation", val: "5 ans (obligation comptable française)" },
      { label: "Suppression de compte", val: "Suppression complète sur demande (sauf données à conservation obligatoire)" },
    ],
  },
  {
    icon: Bell,
    color: "bg-rose-100 text-rose-700",
    title: "Incidents & Notification",
    items: [
      { label: "Détection d'incidents", val: "Monitoring en temps réel via Vercel et Supabase" },
      { label: "Délai de notification RGPD", val: "72h maximum après détection d'une violation" },
      { label: "Communication", val: "Notification par email aux utilisateurs affectés" },
      { label: "Contact sécurité", val: "security@conforva.com" },
    ],
  },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 mb-5">
            <Shield className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Sécurité des données</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Sécurité & Confidentialité</h1>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
            La sécurité de vos données est une priorité non négociable. Voici exactement comment nous protégeons
            vos informations, où elles sont stockées, et qui y a accès.
          </p>
        </div>

        {/* Summary badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {[
            { label: "Hébergement", val: "Union Européenne" },
            { label: "Chiffrement", val: "AES-256 + TLS 1.3" },
            { label: "Paiements", val: "PCI DSS L1 (Stripe)" },
            { label: "Conformité", val: "RGPD / GDPR" },
          ].map(b => (
            <div key={b.label} className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">{b.label}</p>
              <p className="text-sm font-semibold text-gray-800">{b.val}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {SECTIONS.map(s => {
            const Icon = s.icon
            return (
              <div key={s.title} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                  <div className={`h-8 w-8 rounded-lg ${s.color} flex items-center justify-center shrink-0`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="font-semibold text-gray-900">{s.title}</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {s.items.map(item => (
                    <div key={item.label} className="flex items-start gap-4 px-6 py-3.5">
                      <span className="text-xs text-gray-400 w-52 shrink-0 pt-0.5">{item.label}</span>
                      <span className="text-sm text-gray-700">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sub-processors */}
        <div className="mt-8 rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Sous-traitants (sous-processeurs)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left font-medium text-gray-500 pb-3 pr-6">Service</th>
                  <th className="text-left font-medium text-gray-500 pb-3 pr-6">Rôle</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Localisation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { s: "Supabase Inc.", role: "Base de données, authentification", loc: "EU-West (Dublin)" },
                  { s: "Vercel Inc.", role: "Hébergement applicatif", loc: "Global CDN (données EU)" },
                  { s: "Stripe Inc.", role: "Paiements & abonnements", loc: "États-Unis (SCCs UE-US)" },
                  { s: "Groq Inc.", role: "Inférence IA (sans stockage)", loc: "États-Unis (SCCs UE-US)" },
                  { s: "Resend Inc.", role: "Emails transactionnels", loc: "États-Unis (SCCs UE-US)" },
                ].map(r => (
                  <tr key={r.s}>
                    <td className="py-3 pr-6 font-medium text-gray-800">{r.s}</td>
                    <td className="py-3 pr-6 text-gray-600">{r.role}</td>
                    <td className="py-3 text-gray-600">{r.loc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-400">SCCs = Standard Contractual Clauses (mécanisme de transfert RGPD approuvé par la Commission européenne).</p>
        </div>

        {/* RGPD rights */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="font-semibold text-gray-900 mb-3">Vos droits RGPD</h2>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
            accès, rectification, effacement, limitation, portabilité et opposition au traitement.
          </p>
          <p className="text-sm text-gray-600">
            Pour exercer vos droits ou signaler un incident de sécurité :{" "}
            <a href="mailto:privacy@conforva.com" className="text-blue-600 hover:underline font-medium">
              privacy@conforva.com
            </a>
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Dernière mise à jour : juin 2026 ·{" "}
            <Link href="/privacy" className="underline hover:text-gray-600">Politique de confidentialité complète</Link>
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
