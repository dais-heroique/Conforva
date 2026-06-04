import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Mail, Clock, MessageSquare, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Conforva pour toute question sur la conformité GPSR, la facturation ou le support technique. Réponse sous 24h.",
  keywords: ["contact Conforva", "support GPSR", "aide conformité"],
  openGraph: {
    title: "Contacter Conforva",
    description: "Une question sur la conformité GPSR, la facturation ou le support ? Contactez-nous — réponse sous 24h.",
    url: "https://conforva.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contacter Conforva",
    description: "Une question sur la conformité GPSR, la facturation ou le support ? Réponse sous 24h.",
  },
  alternates: { canonical: "https://conforva.com/contact" },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="max-w-3xl mx-auto px-5 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Support</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-gray-500 text-base">Je lis chaque message et réponds dès que possible.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl bg-blue-100 flex items-center justify-center">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900">Email support</p>
            </div>
            <p className="text-sm text-gray-500 mb-2">Pour toute question, problème ou demande :</p>
            <a href="mailto:support@conforva.com" className="text-sm font-medium text-blue-600 hover:underline break-all">
              support@conforva.com
            </a>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="font-semibold text-gray-900">Délai de réponse</p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Je fais de mon mieux pour répondre rapidement.<br />
              Les jours ouvrés en priorité.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl bg-violet-100 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-violet-600" />
              </div>
              <p className="font-semibold text-gray-900">Chat intégré</p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Depuis votre compte Conforva, le chat en bas à droite répond instantanément aux questions de conformité GPSR.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl bg-amber-100 flex items-center justify-center">
                <HelpCircle className="h-4 w-4 text-amber-600" />
              </div>
              <p className="font-semibold text-gray-900">FAQ</p>
            </div>
            <p className="text-sm text-gray-500 mb-3">Avant d'écrire, consultez nos réponses aux questions fréquentes.</p>
            <Link href="/faq" className="text-sm font-medium text-blue-600 hover:underline">
              Voir la FAQ →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-blue-50/50 p-6 text-center">
          <p className="text-sm text-gray-600 leading-relaxed">
            Pour les questions réglementaires complexes, je vous oriente vers des ressources officielles ou des experts qualifiés.<br />
            Je réponds en <strong>français</strong> et en <strong>anglais</strong>.
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
