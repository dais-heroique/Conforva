import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
          <Link href="/"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Accueil</Button></Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mentions légales</h1>
          <p className="text-gray-500 mt-2">Dernière mise à jour : 31 mai 2026</p>
          <p className="text-gray-500 mt-1 text-sm">Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-8 text-sm text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">1. Éditeur du site</h2>
            <p className="whitespace-pre-line">{`Le site conforva.com (également accessible à l'adresse daisconforva.vercel.app) est édité par :

Conforva SAS
Forme juridique : Société par actions simplifiée (SAS)
Statut : en cours d'immatriculation au Registre du Commerce et des Sociétés
Siège social : France
Email : legal@conforva.com

Conforva SAS est une société de droit français soumise au droit commercial français.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">2. Directeur de la publication</h2>
            <p className="whitespace-pre-line">{`Le directeur de la publication du site conforva.com est le représentant légal de Conforva SAS.

[Nom du fondateur — à compléter lors de l'immatriculation]

Contact : legal@conforva.com`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">3. Hébergement du site</h2>
            <p className="whitespace-pre-line">{`Le site conforva.com est hébergé par :

Vercel Inc.
340 Pine Street, Suite 701
San Francisco, CA 94104
États-Unis d'Amérique
Site web : www.vercel.com

Vercel exploite un réseau de distribution mondial (Edge Network). Les données des utilisateurs résidant dans l'Union Européenne sont traitées conformément aux garanties contractuelles décrites dans la Politique de confidentialité de Conforva SAS.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">4. Base de données</h2>
            <p className="whitespace-pre-line">{`La base de données du Service est hébergée par :

Supabase Inc.
970 Toa Payoh North #07-04
Singapore 318992
Site web : www.supabase.com

Région de stockage des données : EU West (Union Européenne).

Supabase agit en qualité de sous-traitant au sens du RGPD, conformément à un accord de traitement des données (DPA) conclu avec Conforva SAS.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">5. Propriété intellectuelle</h2>
            <p className="whitespace-pre-line">{`5.1 Marque et dénomination
La dénomination « Conforva » et le logo associé sont la propriété exclusive de Conforva SAS. Toute reproduction ou utilisation non autorisée de ces éléments est strictement interdite.

5.2 Code source et application
Le code source de l'application Conforva, son architecture, son interface graphique, ses bases de données et ses algorithmes sont protégés par le droit d'auteur (Code de la propriété intellectuelle français). Conforva SAS détient l'intégralité des droits de propriété intellectuelle sur ces éléments.

Toute reproduction, représentation, modification, adaptation, traduction ou exploitation, totale ou partielle, par quelque moyen ou procédé que ce soit, des éléments protégés figurant sur le site, sans autorisation préalable et écrite de Conforva SAS, est strictement interdite et constituerait une contrefaçon sanctionnée par les articles L. 335-2 et suivants du Code de la propriété intellectuelle.

5.3 Contenus générés par l'utilisateur
Les documents produits par l'utilisateur via le Service appartiennent à l'utilisateur, conformément aux Conditions Générales d'Utilisation accessibles à l'adresse conforva.com/cgu.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">6. Données personnelles</h2>
            <p className="whitespace-pre-line">{`Le traitement des données personnelles des utilisateurs du site est régi par la Politique de confidentialité de Conforva SAS, accessible à l'adresse : conforva.com/privacy.

Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi n° 78-17 du 6 janvier 1978 modifiée (Loi Informatique et Libertés), tout utilisateur dispose d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition concernant les données le concernant.

Pour exercer ces droits : privacy@conforva.com
Autorité de contrôle : Commission Nationale de l'Informatique et des Libertés (CNIL) — www.cnil.fr`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">7. Cookies</h2>
            <p className="whitespace-pre-line">{`Le site conforva.com utilise uniquement des cookies de session strictement nécessaires au fonctionnement du service d'authentification (Supabase Auth). Aucun cookie publicitaire, cookie de suivi ou traceur tiers n'est déposé sur l'ordinateur de l'utilisateur.

Pour plus d'informations, consultez la section « Cookies » de notre Politique de confidentialité.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">8. Liens hypertextes</h2>
            <p className="whitespace-pre-line">{`Le site conforva.com peut contenir des liens hypertextes vers des sites tiers. Conforva SAS n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leur disponibilité ou leur politique de confidentialité.

La création de liens hypertextes vers le site conforva.com est autorisée sans accord préalable, sous réserve de ne pas porter atteinte à l'image de Conforva SAS et de ne pas utiliser des techniques de présentation susceptibles d'induire l'utilisateur en erreur quant à l'origine du site.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">9. Limitation de responsabilité</h2>
            <p className="whitespace-pre-line">{`Les informations disponibles sur le site conforva.com sont fournies à titre informatif. Conforva SAS s'efforce d'assurer l'exactitude et la mise à jour des informations publiées, mais ne peut garantir l'exactitude, l'exhaustivité et l'actualité des informations diffusées.

En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa propre responsabilité. Conforva SAS décline toute responsabilité pour les dommages directs ou indirects résultant de l'accès au site ou de l'utilisation des informations qu'il contient.

Pour les limitations de responsabilité relatives au Service Conforva, consulter les Conditions Générales d'Utilisation : conforva.com/cgu.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">10. Loi applicable et juridiction</h2>
            <p className="whitespace-pre-line">{`Le présent site et ses mentions légales sont régis par le droit français. En cas de litige relatif à l'utilisation du site ou à l'interprétation des présentes mentions légales, et à défaut de résolution amiable, les tribunaux français compétents dans le ressort de la Cour d'appel de Paris seront seuls compétents.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">11. Crédits</h2>
            <p className="whitespace-pre-line">{`Conception, développement et exploitation : Conforva SAS

Technologies utilisées : Next.js (Vercel), Supabase, Stripe, Groq, Resend, Tailwind CSS.`}</p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-400 text-center">
              Pour toute question : <a href="mailto:legal@conforva.com" className="underline hover:text-gray-600 transition-colors">legal@conforva.com</a>
              {" · "}
              <Link href="/cgu" className="underline hover:text-gray-600 transition-colors">CGU</Link>
              {" · "}
              <Link href="/privacy" className="underline hover:text-gray-600 transition-colors">Politique de confidentialité</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
