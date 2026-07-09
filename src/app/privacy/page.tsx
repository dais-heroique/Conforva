import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Conforva — traitement des données personnelles, droits RGPD, sous-traitants, conservation et sécurité. Conforme RGPD, CCPA, PIPEDA.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://conforva.com/privacy" },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-bold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-gray-400 leading-relaxed">{children}</div>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#08090C]">
      <PublicNav />
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-white">Politique de confidentialité</h1>
          <p className="text-gray-500 mt-2 text-sm">Dernière mise à jour : 9 juillet 2026</p>
          <p className="text-gray-500 mt-1 text-sm">Conforme au RGPD (UE 2016/679), CCPA (Californie), PIPEDA (Canada).</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-8">

          <Section title="1. Responsable du traitement">
            <p>Le responsable du traitement de vos données personnelles est :</p>
            <p className="font-medium text-gray-300">Conforva SAS<br />
            Société par actions simplifiée en cours d'immatriculation<br />
            Siège social : France<br />
            Email : contact.conforva@gmail.com</p>
          </Section>

          <Section title="2. Données collectées et sources">
            <p><strong className="text-gray-300">Données d'identification et de contact</strong><br />
            — Adresse électronique (fournie lors de l'inscription)<br />
            — Nom et prénom (facultatif, saisi dans les paramètres du compte)</p>
            <p><strong className="text-gray-300">Données de surveillance concurrentielle</strong><br />
            — URLs et noms de concurrents saisis par l'utilisateur<br />
            — Historique des prix collectés<br />
            — Alertes configurées et déclenchées</p>
            <p><strong className="text-gray-300">Données de paiement</strong><br />
            — Informations de transaction (montant, date, statut), gérées par Stripe<br />
            — Conforva SAS ne conserve aucun numéro de carte bancaire</p>
            <p><strong className="text-gray-300">Données de navigation et journaux techniques</strong><br />
            — Adresse IP, type de navigateur, système d'exploitation<br />
            — Pages visitées, actions effectuées dans l'application<br />
            — Journaux d'erreurs et d'incidents techniques</p>
          </Section>

          <Section title="3. Finalités du traitement et bases légales (RGPD art. 6)">
            <p><strong className="text-gray-300">Exécution du contrat (art. 6.1.b RGPD)</strong><br />
            — Création et gestion de votre compte utilisateur<br />
            — Fourniture des fonctionnalités du Service (surveillance, alertes, rapports, export)<br />
            — Facturation et gestion de l'abonnement</p>
            <p><strong className="text-gray-300">Intérêt légitime de Conforva SAS (art. 6.1.f RGPD)</strong><br />
            — Amélioration et optimisation du Service<br />
            — Prévention de la fraude et sécurité du Service<br />
            — Gestion des incidents techniques et du support utilisateur</p>
            <p><strong className="text-gray-300">Consentement (art. 6.1.a RGPD)</strong><br />
            — Envoi de communications marketing et newsletters (uniquement si vous y avez expressément consenti)<br />
            — Vous pouvez retirer votre consentement à tout moment</p>
          </Section>

          <Section title="4. Durée de conservation">
            <p>— Données de compte : pendant toute la durée de la relation contractuelle, puis 3 ans à compter de la clôture du compte<br />
            — Données de surveillance et historiques de prix : durée de l'abonnement, puis 30 jours après résiliation<br />
            — Journaux d'accès et logs techniques : 12 mois<br />
            — Données de paiement et factures : 5 ans à compter de la date de transaction (obligation comptable)<br />
            — Cookies de session : durée de la session, puis suppression automatique</p>
          </Section>

          <Section title="5. Destinataires et sous-traitants">
            <p>Vos données peuvent être transmises aux sous-traitants suivants, dans le strict cadre de la fourniture du Service :</p>
            <p><strong className="text-gray-300">Turso Inc.</strong> (base de données)<br />
            — Rôle : hébergement de la base de données applicative<br />
            — Localisation : États-Unis<br />
            — Garanties : clauses contractuelles types UE-USA (SCCs)</p>
            <p><strong className="text-gray-300">Stripe, Inc.</strong> (traitement des paiements)<br />
            — Rôle : gestion de la facturation et des transactions<br />
            — Localisation : États-Unis<br />
            — Garanties : clauses contractuelles types UE-USA (SCCs), certification PCI-DSS</p>
            <p><strong className="text-gray-300">Google LLC</strong> (intelligence artificielle)<br />
            — Rôle : inférence des modèles d'IA (Gemini) utilisés pour les rapports d'analyse<br />
            — Localisation : États-Unis<br />
            — Garanties : clauses contractuelles types UE-USA (SCCs), accord de traitement des données</p>
            <p><strong className="text-gray-300">Vercel, Inc.</strong> (hébergement de l'application)<br />
            — Rôle : hébergement et déploiement de l'application web conforva.com<br />
            — Localisation : États-Unis (Edge Network mondial)<br />
            — Garanties : clauses contractuelles types UE-USA (SCCs), DPA RGPD</p>
            <p>Aucune donnée n'est vendue, louée ou cédée à des tiers à des fins commerciales ou publicitaires.</p>
          </Section>

          <Section title="6. Transferts internationaux de données">
            <p>Certains de nos sous-traitants (Turso, Stripe, Google, Vercel) sont établis aux États-Unis. Les transferts de données personnelles vers ces entités sont encadrés par les clauses contractuelles types (SCCs) adoptées par la Commission européenne conformément à l'article 46 du RGPD.</p>
            <p>Vous pouvez obtenir une copie des garanties mises en place en nous contactant à contact.conforva@gmail.com.</p>
          </Section>

          <Section title="7. Vos droits au titre du RGPD">
            <p>Si vous résidez dans l'Union Européenne, vous disposez des droits suivants :</p>
            <p>— <strong className="text-gray-300">Droit d'accès</strong> (art. 15) : obtenir une copie de vos données<br />
            — <strong className="text-gray-300">Droit de rectification</strong> (art. 16) : corriger des données inexactes<br />
            — <strong className="text-gray-300">Droit à l'effacement</strong> (art. 17) : demander la suppression de vos données<br />
            — <strong className="text-gray-300">Droit à la portabilité</strong> (art. 20) : recevoir vos données dans un format structuré<br />
            — <strong className="text-gray-300">Droit d'opposition</strong> (art. 21) : s'opposer au traitement fondé sur l'intérêt légitime<br />
            — <strong className="text-gray-300">Droit à la limitation</strong> (art. 18) : restreindre le traitement dans certains cas</p>
            <p>Pour exercer vos droits : <a href="mailto:contact.conforva@gmail.com" className="text-[#8B5CF6] hover:underline">contact.conforva@gmail.com</a>. Délai de réponse : 1 mois maximum.</p>
            <p>Droit de réclamation : vous pouvez déposer une plainte auprès de la CNIL — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] hover:underline">www.cnil.fr</a></p>
          </Section>

          <Section title="8. Droits spécifiques — Résidents de Californie (CCPA/CPRA)">
            <p>Si vous résidez en Californie, vous bénéficiez notamment des droits suivants : droit de savoir, droit d'effacement, droit à la correction et droit de non-vente. Conforva SAS ne vend pas et ne partage pas vos données personnelles à des fins publicitaires.</p>
            <p>Pour exercer vos droits CCPA/CPRA : <a href="mailto:contact.conforva@gmail.com" className="text-[#8B5CF6] hover:underline">contact.conforva@gmail.com</a>. Délai de réponse : 45 jours.</p>
          </Section>

          <Section title="9. Sécurité des données">
            <p>Conforva SAS met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
            <p>— Chiffrement des données en transit (TLS 1.3)<br />
            — Authentification sécurisée avec hachage des mots de passe (bcrypt via NextAuth)<br />
            — Accès aux données de production limité aux membres de l'équipe strictement nécessaires<br />
            — Journalisation des accès et détection des anomalies</p>
            <p>En cas de violation de données susceptible d'engendrer un risque, nous nous engageons à notifier les autorités compétentes dans les 72 heures (art. 33 RGPD).</p>
          </Section>

          <Section title="10. Cookies et traceurs">
            <p>Conforva utilise un nombre minimal de cookies, strictement nécessaires au fonctionnement du Service :</p>
            <p>— <strong className="text-gray-300">next-auth.session-token</strong> : cookie de session d'authentification. Permet de maintenir votre connexion. Durée : session ou 30 jours (« Se souvenir de moi »).<br />
            — <strong className="text-gray-300">__stripe_mid / __stripe_sid</strong> : cookies Stripe pour la sécurisation des paiements. Déposés uniquement lors du passage en caisse.</p>
            <p>Aucun cookie publicitaire, aucun tracker tiers (Google Analytics, Meta Pixel, etc.) n'est installé sur le Service.</p>
          </Section>

          <Section title="11. Modifications de la politique">
            <p>Conforva SAS se réserve le droit de modifier la présente politique à tout moment. Toute modification substantielle sera notifiée par email avec un préavis minimum de 30 jours avant l'entrée en vigueur des changements.</p>
          </Section>

          <Section title="12. Contact">
            <p>Email : <a href="mailto:contact.conforva@gmail.com" className="text-[#8B5CF6] hover:underline">contact.conforva@gmail.com</a><br />
            Autorité de contrôle (UE) : CNIL — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] hover:underline">www.cnil.fr</a></p>
          </Section>

        </div>
      </div>
      <PublicFooter />
    </div>
  )
}
