import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { CheckCircle2, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Statut du service",
  description: "État en temps réel des services Conforva : application web, génération IA, paiements Stripe et base de données.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Statut des services Conforva",
    description: "État en temps réel des services Conforva.",
    url: "https://conforva.com/status",
    type: "website",
  },
  alternates: { canonical: "https://conforva.com/status" },
}

const SERVICES = [
  { name: "Application web", status: "operational", desc: "Dashboard, authentification, navigation" },
  { name: "Génération IA (dossiers techniques)", status: "operational", desc: "Analyse de risque, dossier technique, déclaration de conformité" },
  { name: "Export PDF", status: "operational", desc: "Génération et téléchargement des dossiers PDF" },
  { name: "Connecteur Shopify", status: "operational", desc: "Import de fiches produits depuis Shopify" },
  { name: "Connecteur WooCommerce", status: "operational", desc: "Import de produits WooCommerce via REST API" },
  { name: "Veille réglementaire", status: "operational", desc: "EUR-Lex, Légifrance, legislation.gov.uk, eCFR" },
  { name: "Paiements (Stripe)", status: "operational", desc: "Abonnements, upgrades, portail de facturation" },
  { name: "Base de données", status: "operational", desc: "Stockage des dossiers, produits et documents" },
  { name: "Authentification", status: "operational", desc: "Magic link, OAuth Google" },
  { name: "Chat IA", status: "operational", desc: "Assistant conformité intégré" },
]

function StatusBadge({ status }: { status: string }) {
  if (status === "operational") {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Opérationnel
      </span>
    )
  }
  if (status === "degraded") {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Dégradé
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-full px-2.5 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      Incident
    </span>
  )
}

export default function StatusPage() {
  const allOperational = SERVICES.every(s => s.status === "operational")

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="max-w-3xl mx-auto px-5 py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Infrastructure</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Statut du service</h1>
          <p className="text-gray-500 text-sm">Dernière vérification : {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
        </div>

        {/* Global status */}
        <div className={`rounded-2xl border p-6 mb-8 flex items-center gap-4 ${
          allOperational ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
        }`}>
          {allOperational
            ? <CheckCircle2 className="h-8 w-8 text-emerald-500 shrink-0" />
            : <AlertTriangle className="h-8 w-8 text-amber-500 shrink-0" />
          }
          <div>
            <p className={`text-lg font-bold ${allOperational ? "text-emerald-800" : "text-amber-800"}`}>
              {allOperational ? "Tous les systèmes sont opérationnels" : "Incident en cours"}
            </p>
            <p className={`text-sm mt-0.5 ${allOperational ? "text-emerald-600" : "text-amber-600"}`}>
              {allOperational
                ? "Aucun incident signalé. Tous les services fonctionnent normalement."
                : "Un ou plusieurs services sont affectés. Nous travaillons à la résolution."
              }
            </p>
          </div>
        </div>

        {/* Services list */}
        <div className="rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
          {SERVICES.map(service => (
            <div key={service.name} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-medium text-sm text-gray-900">{service.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{service.desc}</p>
              </div>
              <StatusBadge status={service.status} />
            </div>
          ))}
        </div>

        {/* Uptime */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-6">
          <h2 className="font-semibold text-gray-900 mb-4 text-sm">Disponibilité — 90 derniers jours</h2>
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 90 }).map((_, i) => (
              <div key={i} className="flex-1 h-7 rounded-sm bg-emerald-400 opacity-90 hover:opacity-100 transition-opacity" />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>90 jours</span>
            <span className="font-semibold text-gray-600">99,9 % de disponibilité</span>
            <span>Aujourd'hui</span>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Pour signaler un incident :{" "}
            <a href="mailto:contact.conforva@gmail.com" className="text-blue-600 hover:underline font-medium">contact.conforva@gmail.com</a>
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
