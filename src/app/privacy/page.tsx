import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Accueil</Button></Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Politique de confidentialité</h1>
          <p className="text-gray-500 mt-2">Dernière mise à jour : 31 mai 2026</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6 text-sm text-gray-700 leading-relaxed">
          {[
            { title: "1. Responsable du traitement", content: "Conforva SAS, joignable à privacy@conforva.com." },
            { title: "2. Données collectées", content: "Adresse email, informations d'organisation, données produits saisies, journaux d'activité." },
            { title: "3. Finalités", content: "Fourniture du service, génération de documents, facturation, amélioration du service." },
            { title: "4. Conservation", content: "Données de compte : durée de la relation contractuelle + 3 ans. Documents GPSR : 10 ans (obligation légale). Logs : 1 an." },
            { title: "5. Destinataires", content: "Supabase (hébergement BDD), Stripe (paiement), Anthropic (génération IA), Resend (emails). Aucune vente à des tiers." },
            { title: "6. Transferts hors UE", content: "Les données peuvent être transférées vers des serveurs aux États-Unis (Anthropic, Stripe) avec garanties contractuelles adéquates (SCCs)." },
            { title: "7. Vos droits", content: "Accès, rectification, effacement, portabilité, opposition. Contactez-nous à privacy@conforva.com ou adressez une réclamation à la CNIL." },
            { title: "8. Cookies", content: "Cookies de session Supabase (authentification) uniquement. Aucun cookie publicitaire ou tracker tiers." },
          ].map(s => (
            <div key={s.title}>
              <h2 className="text-base font-bold text-gray-900 mb-2">{s.title}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
