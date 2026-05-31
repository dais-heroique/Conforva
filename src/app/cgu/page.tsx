import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
          <Link href="/"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Accueil</Button></Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conditions Générales d'Utilisation</h1>
          <p className="text-gray-500 mt-2">Dernière mise à jour : 31 mai 2026</p>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <p>
            <strong>Avertissement important :</strong> Conforva est un outil d'aide à la conformité réglementaire.
            Les documents générés par notre service ne constituent pas un avis juridique et ne garantissent pas
            la conformité de vos produits au regard du Règlement GPSR (UE 2023/988) ou de toute autre réglementation.
            La responsabilité de la mise en conformité effective incombe au fabricant/importateur.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6 text-sm text-gray-700 leading-relaxed">
          {[
            {
              title: "1. Objet du service",
              content: `Conforva (ci-après « le Service ») est une application SaaS fournie par Conforva SAS, qui permet aux e-commerçants et vendeurs de produits physiques de générer des documents d'aide à la conformité au Règlement UE 2023/988 sur la sécurité générale des produits (GPSR).

Le Service génère notamment :
- Des analyses de risque produit (aide à l'évaluation)
- Des dossiers techniques (aide à la constitution)
- Des étiquetages multilingues de sécurité (aide à la rédaction)

Ces documents sont générés par intelligence artificielle et sont fournis à titre informatif uniquement.`
            },
            {
              title: "2. Limitation de responsabilité — DISCLAIMER JURIDIQUE",
              content: `AVERTISSEMENT ESSENTIEL : Les documents générés par Conforva sont des AIDES à la conformité. Ils ne constituent en aucun cas :
- Un avis juridique ou réglementaire
- Une garantie de conformité de vos produits
- Un certificat de conformité
- Une substitution à l'avis d'un expert ou organisme notifié

L'utilisateur reconnaît que :
a) La conformité GPSR requiert une évaluation complète par un expert qualifié
b) Les analyses générées par IA peuvent contenir des erreurs ou omissions
c) L'étape de validation humaine marquée comme obligatoire dans l'application doit impérativement être complétée
d) Conforva SAS ne saurait être tenu responsable des conséquences d'une non-conformité basée sur les documents générés`
            },
            {
              title: "3. Validation humaine obligatoire",
              content: `L'utilisation du Service implique obligatoirement une étape de validation humaine pour chaque dossier généré. Cette validation :
- Est tracée avec horodatage dans le journal d'audit
- Implique la confirmation explicite par l'utilisateur qu'il a lu et examiné le document
- Ne remplace pas la validation par un expert ou organisme notifié compétent

Les documents non validés comportent obligatoirement un watermark "PROJET — non validé".`
            },
            {
              title: "4. Conservation des données",
              content: `Conformément aux exigences du GPSR imposant une conservation de 10 ans pour les dossiers techniques, Conforva stocke les documents générés pendant une durée minimale de 10 ans. L'utilisateur peut demander la suppression de son compte, auquel cas les documents légalement requis peuvent être conservés selon les obligations légales applicables.`
            },
            {
              title: "5. Propriété intellectuelle",
              content: `Les documents générés appartiennent à l'utilisateur. Conforva conserve la propriété de son infrastructure, de ses algorithmes et de son interface. L'utilisateur accorde à Conforva le droit d'utiliser les données anonymisées pour améliorer le Service.`
            },
            {
              title: "6. Tarification et remboursement",
              content: `Les abonnements sont facturés mensuellement ou annuellement. Les remboursements sont traités au cas par cas dans les 14 jours suivant la souscription. Au-delà, aucun remboursement prorata n'est accordé sauf en cas de défaut majeur du Service.`
            },
          ].map(section => (
            <div key={section.title}>
              <h2 className="text-base font-bold text-gray-900 mb-2">{section.title}</h2>
              <p className="whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
