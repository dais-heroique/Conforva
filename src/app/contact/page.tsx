import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Mail, Clock, MessageSquare, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Contacter Conforva — Support & Questions",
  description: "Une question sur la veille concurrentielle, votre abonnement Conforva ou le support technique ? Contactez notre équipe — réponse sous 24h ouvrées.",
  keywords: ["contact Conforva", "support veille concurrentielle", "aide repricing", "question suivi prix", "support technique Conforva"],
  openGraph: {
    title: "Contacter Conforva — Support",
    description: "Question sur la veille concurrentielle, votre abonnement ou le support technique ? Contactez Conforva — réponse sous 24h ouvrées.",
    url: "https://conforva.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contacter Conforva",
    description: "Une question sur la veille concurrentielle, la facturation ou le support ? Réponse sous 24h.",
  },
  alternates: { canonical: "https://conforva.com/contact" },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#060D09]">
      <PublicNav />

      <main className="max-w-3xl mx-auto px-5 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00E676] mb-2">Support</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-gray-400 text-base">Je lis chaque message et réponds dès que possible.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl bg-[#00E676]/15 flex items-center justify-center">
                <Mail className="h-4 w-4 text-[#00E676]" />
              </div>
              <p className="font-semibold text-white">Email support</p>
            </div>
            <p className="text-sm text-gray-400 mb-2">Pour toute question, problème ou demande :</p>
            <a href="mailto:contact.conforva@gmail.com" className="text-sm font-medium text-[#00E676] hover:underline break-all">
              contact.conforva@gmail.com
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <Clock className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="font-semibold text-white">Délai de réponse</p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Je fais de mon mieux pour répondre rapidement.<br />
              Les jours ouvrés en priorité.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-purple-400" />
              </div>
              <p className="font-semibold text-white">Chat intégré</p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Depuis votre tableau de bord Conforva, notre support est disponible directement pour toutes vos questions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <HelpCircle className="h-4 w-4 text-amber-400" />
              </div>
              <p className="font-semibold text-white">FAQ</p>
            </div>
            <p className="text-sm text-gray-400 mb-3">Avant d'écrire, consultez nos réponses aux questions fréquentes.</p>
            <Link href="/faq" className="text-sm font-medium text-[#00E676] hover:underline">
              Voir la FAQ →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-[#00E676]/20 bg-[#00E676]/5 p-6 text-center">
          <p className="text-sm text-gray-300 leading-relaxed">
            Pour les questions sur la veille concurrentielle ou la stratégie tarifaire,<br />
            nous vous orientons vers les ressources adaptées à votre secteur.<br />
            Je réponds en <strong className="text-white">français</strong> et en <strong className="text-white">anglais</strong>.
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
