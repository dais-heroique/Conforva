import { AlertTriangle } from "lucide-react"
import type { Metadata } from "next"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions Générales d'Utilisation (CGU) de Conforva — règles d'utilisation du service, limites de responsabilité, propriété intellectuelle, résiliation et droit applicable.",
  openGraph: {
    title: "CGU — Conditions Générales d'Utilisation de Conforva",
    description: "Conditions Générales d'Utilisation de Conforva : règles d'utilisation, limites de responsabilité et droit applicable.",
    url: "https://conforva.com/cgu",
    type: "website",
  },
  alternates: { canonical: "https://conforva.com/cgu" },
}

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conditions Générales d'Utilisation</h1>
          <p className="text-gray-500 mt-2">Dernière mise à jour : 31 mai 2026</p>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <p>
            <strong>Avertissement important :</strong> Conforva est un outil d'aide à la conformité réglementaire.
            Les documents générés par notre service ne constituent pas un avis juridique et ne garantissent pas
            la conformité de vos produits au regard du Règlement GPSR (UE 2023/988) ou de toute autre réglementation applicable.
            La responsabilité de la mise en conformité effective incombe exclusivement au fabricant, importateur ou distributeur.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-8 text-sm text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 1 — Objet et acceptation des CGU</h2>
            <p className="whitespace-pre-line">{`Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'accès et l'utilisation de la plateforme Conforva (ci-après « le Service »), éditée par Conforva SAS, société par actions simplifiée en cours d'immatriculation au Registre du Commerce et des Sociétés, dont le siège social est situé en France (ci-après « Conforva SAS » ou « l'Éditeur »).

L'accès au Service, qu'il soit à titre gratuit ou payant, vaut acceptation pleine et entière des présentes CGU. Si l'utilisateur n'accepte pas les présentes CGU, il doit cesser immédiatement toute utilisation du Service.

Les CGU peuvent être modifiées à tout moment par l'Éditeur. Les modifications prennent effet dès leur publication sur le Service. L'utilisateur est invité à consulter régulièrement les CGU. La poursuite de l'utilisation du Service après modification vaut acceptation des nouvelles conditions.

L'utilisateur déclare avoir la capacité juridique de contracter, agir en son nom propre ou au nom d'une personne morale qu'il représente légalement.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 2 — Description du service Conforva</h2>
            <p className="whitespace-pre-line">{`Conforva est une application SaaS (Software as a Service) d'aide à la conformité réglementaire pour les produits physiques. Le Service permet notamment aux fabricants, importateurs, distributeurs, vendeurs en ligne et marques de :

— Générer des analyses de risque structurées par catégorie de produit, fondées sur les normes européennes et internationales applicables (dont le Règlement (UE) 2023/988 relatif à la sécurité générale des produits, dit « GPSR ») ;
— Constituer des dossiers techniques d'aide à la conformité comprenant la description du produit, l'identification des dangers, les mesures correctives envisagées, les normes applicables référencées ;
— Produire des étiquetages multilingues de sécurité (français, anglais, allemand, italien, espagnol et autres langues) incluant pictogrammes et mentions réglementaires ;
— Gérer un historique versionné des documents générés avec journal d'audit horodaté ;
— Exporter les documents au format PDF.

Le Service s'appuie sur des modèles d'intelligence artificielle générative (ci-après « IA ») pour produire les documents. Les documents sont générés automatiquement sur la base des informations saisies par l'utilisateur.

Conforva SAS se réserve le droit de faire évoluer les fonctionnalités du Service à tout moment, d'en modifier les modalités d'accès et d'en adapter le contenu sans préavis, dans le respect des engagements contractuels souscrits.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 3 — Inscription, compte utilisateur et responsabilités</h2>
            <p className="whitespace-pre-line">{`3.1 Création du compte
L'accès au Service nécessite la création d'un compte utilisateur en fournissant une adresse électronique valide et un mot de passe, ou en s'authentifiant via un fournisseur d'identité tiers (ex. : Google). L'utilisateur s'engage à fournir des informations exactes, complètes et à jour.

3.2 Sécurité des identifiants
L'utilisateur est seul responsable de la confidentialité de ses identifiants d'accès. Il s'engage à notifier immédiatement Conforva SAS de tout accès non autorisé à son compte à l'adresse contact.conforva@gmail.com. Conforva SAS ne saurait être tenu responsable des conséquences d'un accès frauduleux résultant d'une négligence de l'utilisateur.

3.3 Compte d'organisation
L'utilisateur peut créer ou rejoindre un compte d'organisation. L'administrateur de l'organisation est responsable des accès accordés aux membres de son équipe et de l'utilisation du Service par ces derniers.

3.4 Suspension du compte
Conforva SAS se réserve le droit de suspendre ou de supprimer tout compte en cas de violation des présentes CGU, sans préavis et sans indemnité, notamment en cas d'utilisation frauduleuse, de tentative de contournement des protections techniques du Service, ou de comportement portant atteinte aux droits de tiers.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 4 — Obligations et garanties de l'utilisateur</h2>
            <p className="whitespace-pre-line">{`L'utilisateur s'engage à :

— Utiliser le Service conformément aux lois et réglementations applicables dans son pays ainsi que dans tout pays où ses produits sont commercialisés ;
— Ne saisir dans le Service que des informations exactes et sincères concernant ses produits, afin d'obtenir des documents pertinents ;
— Ne pas utiliser le Service à des fins illicites, frauduleuses ou contraires à l'ordre public ;
— Ne pas tenter d'accéder aux données d'autres utilisateurs, ni de compromettre la sécurité de l'infrastructure du Service ;
— Ne pas reproduire, revendre, sous-licencier ou exploiter commercialement les fonctionnalités du Service sans autorisation écrite préalable de Conforva SAS ;
— Effectuer obligatoirement l'étape de validation humaine prévue dans l'application avant tout usage officiel d'un document généré ;
— Conserver les documents techniques pendant les durées légales applicables (notamment 10 ans pour les dossiers techniques au titre du GPSR).

L'utilisateur garantit que les données produits qu'il saisit ne violent aucun droit de propriété intellectuelle de tiers et n'enfreignent aucune réglementation applicable.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 5 — Disclaimer juridique complet — Nature et limites des documents générés</h2>
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 mb-3">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-700" />
              <p className="text-amber-800 font-medium text-xs">Cet article constitue un avertissement essentiel. L'utilisateur doit en prendre pleine connaissance avant tout usage du Service.</p>
            </div>
            <p className="whitespace-pre-line">{`5.1 Nature des documents — aide, non certification
Les documents générés par le Service constituent exclusivement des AIDES à la préparation de la conformité réglementaire. Ils ne constituent en aucun cas :
— Un avis juridique ou réglementaire certifié ;
— Une garantie de conformité des produits de l'utilisateur à quelque réglementation que ce soit ;
— Un certificat de conformité, une déclaration UE de conformité opposable, ou tout document ayant force probante en soi ;
— Un rapport d'évaluation de la conformité au sens des directives ou règlements européens applicables ;
— Un substitut à l'intervention d'un expert qualifié (ingénieur en sécurité des produits, conseil réglementaire) ou d'un organisme notifié accrédité.

5.2 Limitation inhérente à l'intelligence artificielle
Les documents sont produits par des modèles d'intelligence artificielle générative. Par nature, ces modèles peuvent :
— Commettre des erreurs d'analyse, d'interprétation ou d'application des textes réglementaires ;
— Omettre des normes, exigences ou obligations applicables à un produit ou marché spécifique ;
— Se fonder sur des informations réglementaires devenues obsolètes après leur date de formation ;
— Générer des contenus imprécis ou incomplets selon la qualité et l'exhaustivité des informations saisies par l'utilisateur.

L'utilisateur reconnaît et accepte expressément ces limitations inhérentes à la technologie mise en œuvre.

5.3 Obligation de validation humaine
Le Service intègre obligatoirement une étape de validation humaine pour chaque dossier généré. Cette validation est tracée avec horodatage dans le journal d'audit interne. La réalisation de cette étape de validation est une condition nécessaire — mais non suffisante — à l'usage officiel du document. Elle implique que l'utilisateur ait personnellement lu, examiné et jugé le contenu du document pertinent au regard de la situation réelle de son produit.

Les documents non validés comportent obligatoirement un filigrane « PROJET — Document non validé » et ne doivent en aucun cas être utilisés à des fins officielles ou présentés à une autorité de surveillance du marché.

5.4 Responsabilité du fabricant, importateur ou distributeur
Au titre du Règlement (UE) 2023/988 (GPSR) et de toute autre réglementation de sécurité des produits applicable, la responsabilité de la conformité incombe exclusivement et intégralement au fabricant, à l'importateur ou au distributeur, selon le rôle de chacun dans la chaîne de mise sur le marché.

Conforva SAS n'est en aucun cas le fabricant, l'importateur ni le distributeur des produits décrits dans le Service par l'utilisateur. Conforva SAS n'assume aucune responsabilité au titre de la conformité effective ou de la sécurité desdits produits.

5.5 Applicabilité multi-marchés
Le Service peut être utilisé pour préparer des dossiers destinés à divers marchés réglementaires, notamment :
— Marché européen (GPSR — Règlement UE 2023/988, directives Basse Tension, Jouets, CEM, etc.) ;
— Marché américain (réglementations CPSC — Consumer Product Safety Commission) ;
— Marché chinois (certification CCC — China Compulsory Certification) ;
— Marché britannique (marquage UKCA post-Brexit) ;
— Autres marchés nationaux ou régionaux.

Pour chacun de ces marchés, les documents générés constituent une base de travail à compléter et vérifier par un expert local maîtrisant les exigences réglementaires spécifiques au marché concerné. Conforva SAS ne garantit pas la conformité des documents générés aux exigences propres à chacune de ces juridictions.

5.6 Non-substitution à un conseil professionnel
L'utilisateur qui commercialise des produits soumis à une certification obligatoire (ex. : marquage CE pour certaines catégories de produits) ou qui fait appel à un organisme notifié doit impérativement soumettre ses dossiers techniques à un professionnel qualifié avant toute démarche officielle. Les documents Conforva peuvent servir de base de discussion avec cet expert mais ne remplacent en aucun cas son intervention.

5.7 Reconnaissance et acceptation par l'utilisateur
En utilisant le Service, l'utilisateur reconnaît expressément avoir lu et compris les limitations décrites au présent article, et accepter que Conforva SAS ne puisse être tenu pour responsable d'une non-conformité réglementaire, d'un retrait de produit, d'une amende, d'une sanction administrative ou pénale, ou de tout dommage résultant de l'utilisation des documents générés par le Service.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 6 — Limitation de responsabilité</h2>
            <p className="whitespace-pre-line">{`6.1 Exclusion des dommages indirects
Dans toute la mesure permise par le droit applicable, Conforva SAS ne saurait être tenu responsable de dommages indirects, consécutifs, accessoires, spéciaux ou punitifs, incluant sans limitation : manque à gagner, perte d'exploitation, perte de données, atteinte à la réputation, amendes réglementaires ou coûts de mise en conformité, découlant de l'utilisation ou de l'impossibilité d'utiliser le Service.

6.2 Plafond de responsabilité
En tout état de cause, la responsabilité totale de Conforva SAS envers un utilisateur, au titre de l'ensemble des réclamations relatives à un même fait générateur, ne pourra excéder le montant total des sommes effectivement versées par cet utilisateur au titre de l'abonnement au Service au cours des douze (12) mois précédant le fait générateur, ou la somme de cent (100) euros si l'utilisateur bénéficiait d'un accès gratuit.

6.3 Force majeure
Conforva SAS ne saurait être tenu responsable de tout manquement à ses obligations contractuelles résultant d'un événement de force majeure au sens de l'article 1218 du Code civil français, incluant notamment : catastrophe naturelle, pandémie, acte terroriste, défaillance des infrastructures de réseau ou d'hébergement, décision gouvernementale ou réglementaire.

6.4 Disponibilité du Service
Conforva SAS s'efforce d'assurer la disponibilité du Service 24h/24 et 7j/7 mais ne garantit pas une disponibilité ininterrompue. Des interruptions pour maintenance, mises à jour ou incidents techniques peuvent survenir. Conforva SAS s'engage à informer les utilisateurs des maintenances planifiées dans la mesure du possible.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 7 — Propriété intellectuelle</h2>
            <p className="whitespace-pre-line">{`7.1 Propriété des documents générés
Les documents générés par le Service à partir des données saisies par l'utilisateur sont la propriété exclusive de l'utilisateur. Conforva SAS ne revendique aucun droit de propriété sur ces documents.

7.2 Propriété du Service
L'application Conforva, son interface, son architecture, ses algorithmes, son code source, ses bases de données, sa charte graphique, ses marques et dénominations sociales sont la propriété exclusive de Conforva SAS et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification, adaptation ou extraction, totale ou partielle, de ces éléments, par quelque moyen que ce soit, est interdite sans autorisation préalable et écrite de Conforva SAS.

7.3 Licence d'utilisation du Service
Conforva SAS accorde à l'utilisateur une licence personnelle, non exclusive, non transférable et révocable d'accès et d'utilisation du Service, pour la durée de l'abonnement et dans les limites définies par les présentes CGU.

7.4 Données anonymisées
L'utilisateur autorise Conforva SAS à utiliser, à des fins d'amélioration du Service et de recherche interne, des données anonymisées et agrégées dérivées de l'usage du Service, ne permettant en aucun cas d'identifier l'utilisateur ou ses produits spécifiques.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 8 — Tarifs et facturation</h2>
            <p className="whitespace-pre-line">{`8.1 Offres et prix
Le Service est proposé selon plusieurs formules d'abonnement (Gratuit, Starter, Growth, Pro) dont les tarifs sont affichés sur la page tarifaire du site conforva.com. Les prix sont exprimés en euros TTC. Conforva SAS se réserve le droit de modifier ses tarifs à tout moment, avec notification préalable de 30 jours aux utilisateurs disposant d'un abonnement payant en cours.

8.2 Modalités de facturation
Les abonnements payants sont facturés de manière mensuelle ou annuelle selon l'option choisie par l'utilisateur au moment de la souscription. La facturation est gérée via le prestataire de paiement Stripe (Stripe, Inc., États-Unis). Conforva SAS ne conserve pas les données de carte bancaire de l'utilisateur ; celles-ci sont traitées directement par Stripe conformément à sa propre politique de sécurité et à la norme PCI-DSS.

8.3 Renouvellement automatique
Les abonnements se renouvellent automatiquement à l'échéance de chaque période de facturation, sauf résiliation effectuée avant la date d'échéance dans les paramètres du compte. L'utilisateur sera informé du renouvellement par email.

8.4 Droit de rétractation et remboursements
Conformément à l'article L. 221-18 du Code de la consommation, l'utilisateur consommateur bénéficie d'un droit de rétractation de 14 jours à compter de la souscription d'un abonnement payant, sauf s'il a expressément demandé l'exécution immédiate du Service. La demande de remboursement doit être adressée à contact.conforva@gmail.com.

Au-delà du délai de 14 jours, aucun remboursement prorata temporis ne sera accordé, sauf en cas de défaut majeur et documenté du Service imputable à Conforva SAS.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 9 — Durée, suspension et résiliation</h2>
            <p className="whitespace-pre-line">{`9.1 Durée
Les présentes CGU sont conclues pour une durée indéterminée à compter de la création du compte utilisateur.

9.2 Résiliation par l'utilisateur
L'utilisateur peut résilier son abonnement à tout moment depuis les paramètres de son compte. La résiliation prend effet à l'issue de la période de facturation en cours. Les données de l'utilisateur sont conservées pendant une période de 30 jours après la résiliation, après quoi elles sont supprimées, sous réserve des obligations légales de conservation décrites à l'article 10.

9.3 Suspension ou résiliation par Conforva SAS
Conforva SAS peut suspendre ou résilier l'accès au Service de tout utilisateur, sans préavis ni indemnité, en cas de :
— Violation des présentes CGU ;
— Non-paiement des sommes dues après mise en demeure restée sans effet ;
— Usage abusif ou frauduleux du Service ;
— Mise en danger de la sécurité ou de l'intégrité du Service ou des données d'autres utilisateurs.

9.4 Effets de la résiliation
La résiliation du compte entraîne la perte d'accès aux fonctionnalités du Service. L'utilisateur est responsable d'exporter ses documents avant la résiliation. Les documents légalement requis pourront être conservés par Conforva SAS conformément aux obligations légales applicables (cf. article 10).`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 10 — Données personnelles</h2>
            <p className="whitespace-pre-line">{`Le traitement des données personnelles des utilisateurs est régi par la Politique de confidentialité de Conforva SAS, accessible à l'adresse conforva.com/privacy. Cette politique est incorporée par référence aux présentes CGU et en fait partie intégrante.

Conforva SAS traite les données personnelles des utilisateurs en qualité de responsable du traitement, dans le respect du Règlement (UE) 2016/679 relatif à la protection des données personnelles (RGPD) et des lois nationales applicables.

Pour toute question relative au traitement de vos données personnelles ou pour exercer vos droits, contactez : contact.conforva@gmail.com.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 11 — Loi applicable et juridiction compétente</h2>
            <p className="whitespace-pre-line">{`11.1 Droit applicable
Les présentes CGU sont régies et interprétées conformément au droit français. En cas de litige portant sur la validité, l'interprétation ou l'exécution des présentes CGU, les parties s'engagent à rechercher une solution amiable dans un délai de trente (30) jours à compter de la notification du différend.

11.2 Juridiction compétente
À défaut de résolution amiable, tout litige relatif aux présentes CGU sera soumis à la compétence exclusive des tribunaux compétents dans le ressort de la Cour d'appel de Paris, sauf disposition d'ordre public contraire applicable à l'utilisateur consommateur dans son pays de résidence.

11.3 Conformité aux lois locales
Il appartient à chaque utilisateur de vérifier que son utilisation du Service est conforme aux lois et réglementations applicables dans son pays de résidence ou d'activité, ainsi qu'aux lois des pays où ses produits sont commercialisés. Conforva SAS ne garantit pas que le Service et les documents qu'il génère sont conformes aux exigences légales de tous les pays du monde. Les utilisateurs établis hors de l'Union Européenne sont particulièrement invités à consulter un conseil local compétent.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">Article 12 — Dispositions diverses</h2>
            <p className="whitespace-pre-line">{`12.1 Nullité partielle
Si l'une quelconque des dispositions des présentes CGU était déclarée nulle ou inapplicable par une juridiction compétente, les autres dispositions resteraient pleinement en vigueur et de plein effet. La disposition nulle serait remplacée par une disposition valide se rapprochant le plus possible de l'intention initiale des parties.

12.2 Intégralité de l'accord
Les présentes CGU, ainsi que la Politique de confidentialité et, le cas échéant, les conditions particulières applicables à l'abonnement souscrit, constituent l'intégralité de l'accord entre l'utilisateur et Conforva SAS concernant l'utilisation du Service et remplacent tout accord antérieur portant sur le même objet.

12.3 Cession
Conforva SAS se réserve le droit de céder tout ou partie de ses droits et obligations au titre des présentes CGU à un tiers, notamment dans le cadre d'une fusion, acquisition ou cession d'actifs, sous réserve d'en informer l'utilisateur. L'utilisateur ne peut céder ses droits et obligations au titre des présentes CGU sans accord écrit préalable de Conforva SAS.

12.4 Non-renonciation
Le fait pour Conforva SAS de ne pas se prévaloir à un moment donné de l'une quelconque des dispositions des présentes CGU ne peut être interprété comme une renonciation à s'en prévaloir ultérieurement.

12.5 Contact
Pour toute question relative aux présentes CGU : contact.conforva@gmail.com`}</p>
          </div>

        </div>
      </div>
      <PublicFooter />
    </div>
  )
}
