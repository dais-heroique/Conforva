import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
          <Link href="/"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Accueil</Button></Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Politique de confidentialité</h1>
          <p className="text-gray-500 mt-2">Dernière mise à jour : 31 mai 2026</p>
          <p className="text-gray-500 mt-1 text-sm">Conforme au RGPD (UE 2016/679), CCPA (Californie), PIPEDA (Canada) et PIPL (Chine).</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-8 text-sm text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">1. Responsable du traitement</h2>
            <p className="whitespace-pre-line">{`Le responsable du traitement de vos données personnelles est :

Conforva SAS
Société par actions simplifiée en cours d'immatriculation au Registre du Commerce et des Sociétés
Siège social : France
Email : privacy@conforva.com

Pour toute question relative à vos données personnelles ou pour exercer vos droits, vous pouvez nous contacter à l'adresse électronique ci-dessus.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">2. Données collectées et sources</h2>
            <p className="whitespace-pre-line">{`Nous collectons les catégories de données suivantes :

Données d'identification et de contact
— Adresse électronique (fournie lors de l'inscription ou via un fournisseur d'identité tiers tel que Google)
— Nom et prénom (facultatif, saisi dans les paramètres du compte)
— Nom de l'organisation ou de l'entreprise

Données produits et conformité
— Informations relatives aux produits saisis par l'utilisateur (catégorie, description, matériaux, marchés cibles, etc.)
— Documents générés et leur historique de versions
— Journal d'audit des validations humaines (horodatage, identifiant utilisateur)

Données de paiement
— Informations de transaction (montant, date, statut), gérées par Stripe
— Conforva SAS ne conserve aucun numéro de carte bancaire ; ceux-ci sont traités directement par Stripe

Données de navigation et journaux techniques
— Adresse IP, type de navigateur, système d'exploitation
— Pages visitées, actions effectuées dans l'application, durée des sessions
— Journaux d'erreurs et d'incidents techniques

Sources des données : toutes les données sont collectées directement auprès de l'utilisateur, soit lors de l'inscription, soit lors de l'utilisation du Service.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">3. Finalités du traitement et bases légales (RGPD art. 6)</h2>
            <p className="whitespace-pre-line">{`Nous traitons vos données pour les finalités suivantes :

Exécution du contrat (art. 6.1.b RGPD)
— Création et gestion de votre compte utilisateur
— Fourniture des fonctionnalités du Service (génération de documents, export, historique)
— Facturation et gestion de l'abonnement

Intérêt légitime de Conforva SAS (art. 6.1.f RGPD)
— Amélioration et optimisation du Service (analyse des usages anonymisés)
— Prévention de la fraude et sécurité du Service
— Gestion des incidents techniques et du support utilisateur
— Conservation des journaux d'audit pour des raisons légales et de traçabilité

Obligation légale (art. 6.1.c RGPD)
— Conservation des documents GPSR pendant 10 ans (obligation issue du Règlement UE 2023/988)
— Conservation des données de facturation conformément aux obligations comptables et fiscales
— Réponse aux réquisitions judiciaires et administratives

Consentement (art. 6.1.a RGPD)
— Envoi de communications marketing et newsletters (uniquement si vous y avez expressément consenti)
— Vous pouvez retirer votre consentement à tout moment en nous contactant à privacy@conforva.com`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">4. Durée de conservation</h2>
            <p className="whitespace-pre-line">{`Nous conservons vos données pour les durées suivantes :

— Données de compte : pendant toute la durée de la relation contractuelle, puis 3 ans à compter de la clôture du compte (pour la gestion des litiges éventuels)
— Documents GPSR et dossiers techniques : 10 ans minimum à compter de leur génération (obligation légale issue du Règlement GPSR UE 2023/988 et des réglementations similaires)
— Journaux d'accès et logs techniques : 12 mois
— Données de paiement et factures : 5 ans à compter de la date de transaction (obligation comptable et fiscale)
— Cookies de session : durée de la session, puis suppression automatique

Au terme de ces durées, les données sont supprimées de manière sécurisée ou anonymisées de façon irréversible.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">5. Destinataires et sous-traitants</h2>
            <p className="whitespace-pre-line">{`Vos données peuvent être transmises aux sous-traitants suivants, dans le strict cadre de la fourniture du Service :

Supabase Inc. (base de données et authentification)
— Rôle : hébergement de la base de données et gestion de l'authentification
— Localisation : Union Européenne (région EU West)
— Garanties : accord de traitement des données (DPA) conforme RGPD

Stripe, Inc. (traitement des paiements)
— Rôle : gestion de la facturation et des transactions par carte bancaire
— Localisation : États-Unis
— Garanties : clauses contractuelles types UE-USA (SCCs), certification PCI-DSS

Groq, Inc. (génération par intelligence artificielle)
— Rôle : inférence des modèles d'IA générative utilisés pour produire les documents
— Localisation : États-Unis
— Garanties : clauses contractuelles types UE-USA (SCCs), accord de traitement des données

Resend, Inc. (envoi d'emails transactionnels)
— Rôle : envoi des emails de confirmation, notifications et alertes du Service
— Localisation : États-Unis
— Garanties : clauses contractuelles types UE-USA (SCCs)

Vercel, Inc. (hébergement de l'application)
— Rôle : hébergement et déploiement de l'application web conforva.com
— Localisation : États-Unis (Edge Network mondial)
— Garanties : clauses contractuelles types UE-USA (SCCs), DPA RGPD

Aucune donnée n'est vendue, louée ou cédée à des tiers à des fins commerciales ou publicitaires.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">6. Transferts internationaux de données</h2>
            <p className="whitespace-pre-line">{`Certains de nos sous-traitants (Stripe, Groq, Resend, Vercel) sont établis aux États-Unis. Les transferts de données personnelles vers ces entités sont encadrés par les clauses contractuelles types (CCT/SCCs) adoptées par la Commission européenne conformément à l'article 46 du RGPD, assurant un niveau de protection adéquat.

Vous pouvez obtenir une copie des garanties mises en place pour ces transferts en nous contactant à privacy@conforva.com.

S'agissant des utilisateurs établis hors de l'Union Européenne, les données peuvent également être soumises aux législations locales applicables dans leur pays de résidence. Conforva SAS s'engage à respecter les obligations spécifiques de chaque réglementation nationale applicable (voir sections 8 à 9 ci-après pour les droits spécifiques selon les pays).`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">7. Vos droits au titre du RGPD (résidents de l'Union Européenne)</h2>
            <p className="whitespace-pre-line">{`Si vous résidez dans l'Union Européenne, vous disposez des droits suivants sur vos données personnelles :

Droit d'accès (art. 15 RGPD) : obtenir la confirmation que des données vous concernant sont traitées et en recevoir une copie.

Droit de rectification (art. 16 RGPD) : demander la correction de données inexactes ou incomplètes.

Droit à l'effacement (art. 17 RGPD) : demander la suppression de vos données, sous réserve des obligations légales de conservation.

Droit à la portabilité (art. 20 RGPD) : recevoir vos données dans un format structuré, couramment utilisé et lisible par machine, et les transmettre à un autre responsable du traitement.

Droit d'opposition (art. 21 RGPD) : vous opposer au traitement de vos données fondé sur l'intérêt légitime, notamment à des fins de prospection commerciale.

Droit à la limitation du traitement (art. 18 RGPD) : demander la restriction du traitement de vos données dans certains cas prévus par le RGPD.

Droit au retrait du consentement : retirer à tout moment votre consentement pour les traitements qui en sont fondés, sans que cela n'affecte la licéité des traitements effectués avant ce retrait.

Pour exercer vos droits, contactez-nous à : privacy@conforva.com. Nous répondrons à votre demande dans un délai maximum d'un (1) mois.

Droit d'introduire une réclamation : vous disposez du droit de déposer une plainte auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL), autorité de contrôle française, à l'adresse : www.cnil.fr. Vous pouvez également vous adresser à l'autorité de contrôle de votre État membre de résidence.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">8. Droits spécifiques — Résidents de Californie (CCPA/CPRA)</h2>
            <p className="whitespace-pre-line">{`Si vous résidez en Californie (États-Unis), vous bénéficiez des droits suivants au titre du California Consumer Privacy Act (CCPA) tel que modifié par le California Privacy Rights Act (CPRA) :

Droit de savoir : vous avez le droit de demander quelles catégories de données personnelles nous collectons, les finalités de collecte, les catégories de tiers avec lesquels nous partageons vos données, et d'obtenir une copie de vos données.

Droit d'effacement : vous avez le droit de demander la suppression des données personnelles que nous avons collectées, sous réserve de certaines exceptions légales.

Droit à la correction : vous avez le droit de demander la correction des données inexactes vous concernant.

Droit de non-vente et de non-partage : Conforva SAS ne vend pas et ne partage pas vos données personnelles à des fins de publicité comportementale croisée. Vous avez le droit de vous opposer à toute forme future de vente ou de partage.

Droit à la limitation de l'utilisation des données sensibles : dans la mesure où nous traiterions des données personnelles sensibles au sens du CPRA, vous disposez du droit d'en limiter l'utilisation.

Droit à la non-discrimination : l'exercice de vos droits CCPA/CPRA ne donnera lieu à aucun traitement discriminatoire de notre part.

Pour exercer vos droits CCPA/CPRA, contactez-nous à : privacy@conforva.com. Nous répondrons dans les 45 jours suivant réception de votre demande vérifiable.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">9. Droits spécifiques — Résidents du Canada (PIPEDA/Loi 25)</h2>
            <p className="whitespace-pre-line">{`Si vous résidez au Canada, vos données personnelles sont traitées dans le respect de la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE/PIPEDA) et, pour les résidents québécois, de la Loi 25 (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels).

Vous disposez des droits suivants :
— Droit d'accès à vos renseignements personnels détenus par Conforva SAS
— Droit de correction des renseignements inexacts
— Droit au retrait du consentement, sous réserve de contraintes légales ou contractuelles

Pour exercer ces droits, contactez : privacy@conforva.com.

Note pour les résidents de Chine continentale (PIPL) : Si vous résidez en République Populaire de Chine, vos données sont traitées dans le respect de la Loi sur la protection des informations personnelles (PIPL) entrée en vigueur en novembre 2021. Vous disposez notamment du droit d'accès, de correction, de suppression et de portabilité de vos données. Contactez privacy@conforva.com pour exercer ces droits.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">10. Sécurité des données</h2>
            <p className="whitespace-pre-line">{`Conforva SAS met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, toute perte, altération ou divulgation, conformément à l'article 32 du RGPD.

Ces mesures comprennent notamment :
— Chiffrement des données en transit (TLS 1.2/1.3) et au repos
— Authentification gérée via Supabase Auth avec hachage sécurisé des mots de passe (bcrypt)
— Contrôle d'accès strict aux données (Row Level Security activé sur la base de données Supabase)
— Journalisation des accès et détection des anomalies
— Accès aux données de production limité aux membres de l'équipe ayant strictement besoin d'y accéder

En cas de violation de données susceptible d'engendrer un risque pour vos droits et libertés, nous nous engageons à notifier les autorités compétentes dans les 72 heures conformément à l'article 33 du RGPD, et à vous informer dans les meilleurs délais si le risque est élevé.

Malgré ces mesures, aucun système de sécurité n'est infaillible. Si vous suspectez une compromission de votre compte, contactez-nous immédiatement à privacy@conforva.com.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">11. Cookies et traceurs</h2>
            <p className="whitespace-pre-line">{`Conforva utilise un nombre minimal de cookies, strictement nécessaires au fonctionnement du Service :

Cookie de session Supabase (sb-*-auth-token)
— Finalité : authentification et maintien de la session utilisateur
— Type : cookie technique strictement nécessaire
— Durée : durée de la session, ou jusqu'à déconnexion
— Consentement requis : non (exempté — strictement nécessaire)

Aucun cookie publicitaire, aucun tracker tiers (Google Analytics, Meta Pixel, etc.) n'est installé sur le Service. Conforva SAS ne pratique aucun ciblage publicitaire comportemental.

Vous pouvez configurer votre navigateur pour bloquer ou supprimer les cookies, mais cela pourrait altérer le fonctionnement du Service (notamment votre connexion).`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">12. Modifications de la politique de confidentialité</h2>
            <p className="whitespace-pre-line">{`Conforva SAS se réserve le droit de modifier la présente politique de confidentialité à tout moment pour refléter des évolutions légales, réglementaires ou liées au Service. Toute modification substantielle sera notifiée aux utilisateurs par email ou par une notification visible dans l'application, avec un préavis minimum de 30 jours avant l'entrée en vigueur des changements.

La date de dernière mise à jour est indiquée en haut de la présente page. Nous vous encourageons à consulter régulièrement cette politique.`}</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">13. Contact</h2>
            <p className="whitespace-pre-line">{`Pour toute question, demande d'exercice de droits ou réclamation relative à la protection de vos données personnelles :

Email : privacy@conforva.com
Autorité de contrôle compétente (UE) : Commission Nationale de l'Informatique et des Libertés (CNIL) — www.cnil.fr
Autorité de contrôle compétente (autres pays) : l'autorité nationale de protection des données de votre pays de résidence.`}</p>
          </div>

        </div>
      </div>
    </div>
  )
}
