import type { Metadata } from "next"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions Générales de Vente (CGV) de Conforva — abonnements, tarifs, modalités de paiement, droit de rétractation 14 jours et résiliation.",
  openGraph: {
    title: "CGV — Conditions Générales de Vente de Conforva",
    description: "CGV de Conforva : abonnements, tarifs, droit de rétractation et résiliation.",
    url: "https://conforva.com/cgv",
    type: "website",
  },
  alternates: { canonical: "https://conforva.com/cgv" },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  )
}

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conditions Générales de Vente</h1>
          <p className="text-gray-500 mt-2 text-sm">Dernière mise à jour : 3 juin 2026 · Applicables à compter du 3 juin 2026</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-8">

          <Section title="1. Objet et champ d'application">
            <p>
              Les présentes Conditions Générales de Vente (« CGV ») régissent la vente des abonnements au service Conforva,
              accessible à l'adresse conforva.com, édité par Conforva (ci-après « le Vendeur »).
            </p>
            <p>
              Elles s'appliquent à tout achat d'abonnement réalisé par toute personne physique ou morale
              (ci-après « le Client ») sur le site. Tout achat implique l'acceptation pleine et entière des présentes CGV.
            </p>
          </Section>

          <Section title="2. Description du service">
            <p>
              Conforva est un logiciel en ligne (SaaS) d'aide à la conformité au règlement (UE) 2023/988 relatif à la
              sécurité générale des produits (GPSR). Le service permet notamment de :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Générer des analyses de risque structurées (ISO 12100:2010)</li>
              <li>Créer des dossiers techniques (Art. 22 GPSR) en format PDF</li>
              <li>Produire des déclarations UE de conformité (Art. 24 GPSR)</li>
              <li>Générer des étiquettes de sécurité multilingues (Art. 9 GPSR)</li>
              <li>Documenter les informations relatives à la Personne Responsable EU (Art. 16 GPSR)</li>
            </ul>
            <p className="text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <strong>Important :</strong> Les documents générés par Conforva constituent une aide structurée à la conformité.
              Ils ne constituent pas un avis juridique et ne garantissent pas la conformité effective des produits
              au regard du règlement GPSR ou de toute autre réglementation applicable. La responsabilité de la conformité
              incombe exclusivement au fabricant, importateur ou distributeur.
            </p>
          </Section>

          <Section title="3. Plans tarifaires et prix">
            <p>Les abonnements disponibles sont les suivants (prix TTC, en euros) :</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    {["Plan", "Prix mensuel TTC", "Références produits", "Caractéristiques"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Gratuit", "0 €", "1", "Dossier watermarké, FR + EN"],
                    ["Starter", "29 € / mois", "5", "Sans watermark, 5 langues, export PDF"],
                    ["Growth", "79 € / mois", "30", "Import CSV, Shopify, alertes normes"],
                    ["Pro", "199 € / mois", "150", "WooCommerce, rapports personnalisés"],
                  ].map(([plan, price, refs, features]) => (
                    <tr key={plan} className="hover:bg-gray-50/50">
                      <td className="px-4 py-2.5 font-medium text-gray-900">{plan}</td>
                      <td className="px-4 py-2.5">{price}</td>
                      <td className="px-4 py-2.5">{refs}</td>
                      <td className="px-4 py-2.5 text-gray-600">{features}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Le Vendeur se réserve le droit de modifier ses tarifs à tout moment. Les modifications de prix seront
              notifiées au Client par email au moins 30 jours avant leur entrée en vigueur. Le Client peut alors
              résilier son abonnement avant l'entrée en vigueur du nouveau tarif.
            </p>
          </Section>

          <Section title="4. Modalités de commande et de paiement">
            <p>
              L'abonnement est souscrit directement sur le site via la page de facturation du tableau de bord.
              Le paiement est effectué par carte bancaire via Stripe (Stripe, Inc. — prestataire de paiement certifié PCI-DSS).
              Conforva ne stocke aucune donnée de carte bancaire.
            </p>
            <p>
              L'abonnement est à renouvellement automatique mensuel. La facturation est prélevée à date d'anniversaire
              de la souscription initiale. Une facture est automatiquement émise par Stripe et accessible dans le
              portail de facturation du tableau de bord.
            </p>
          </Section>

          <Section title="5. Droit de rétractation">
            <p>
              Conformément aux articles L. 221-18 et suivants du Code de la consommation, le Client consommateur
              (personne physique agissant à titre non professionnel) dispose d'un délai de <strong>14 jours</strong> à
              compter de la souscription de l'abonnement pour exercer son droit de rétractation, sans avoir à motiver
              sa décision.
            </p>
            <p>
              Pour exercer ce droit, le Client doit notifier sa décision avant l'expiration du délai de 14 jours
              à l'adresse : <a href="mailto:contact.conforva@gmail.com" className="text-blue-600 hover:underline">contact.conforva@gmail.com</a>.
            </p>
            <p>
              <strong>Exception :</strong> conformément à l'article L. 221-28 12° du Code de la consommation, le droit
              de rétractation ne peut être exercé pour les contenus numériques fournis sur un support immatériel
              dont l'exécution a commencé avec l'accord préalable exprès du consommateur. Si le Client a généré
              des documents via le service dans ce délai de 14 jours, il reconnaît renoncer expressément à son droit
              de rétractation pour la période concernée.
            </p>
          </Section>

          <Section title="6. Résiliation">
            <p>
              Le Client peut résilier son abonnement à tout moment depuis le portail de facturation accessible via
              son tableau de bord (section Paramètres → Facturation → Gérer mon abonnement). La résiliation prend
              effet à la fin de la période de facturation en cours. Aucun remboursement au prorata n'est accordé
              pour les périodes entamées, sauf défaut majeur du service imputable au Vendeur.
            </p>
            <p>
              En cas de résiliation, le Client conserve l'accès à ses données pendant 30 jours, après quoi elles
              sont supprimées conformément à la politique de confidentialité.
            </p>
          </Section>

          <Section title="7. Obligations et responsabilité du Vendeur">
            <p>
              Le Vendeur s'engage à mettre en œuvre les moyens raisonnables pour assurer la disponibilité du service
              et la qualité des documents générés. Le Vendeur est soumis à une obligation de moyens et non de résultat.
            </p>
            <p>
              La responsabilité du Vendeur ne pourra être engagée en cas de : (i) non-conformité réglementaire des
              produits du Client, (ii) utilisation incorrecte du service, (iii) force majeure, (iv) indisponibilité
              temporaire pour maintenance, (v) inexactitude des informations saisies par le Client.
            </p>
            <p>
              En tout état de cause, la responsabilité du Vendeur est limitée aux sommes effectivement perçues
              du Client au cours des 12 derniers mois précédant la survenance du dommage.
            </p>
          </Section>

          <Section title="8. Propriété intellectuelle">
            <p>
              Le Vendeur demeure propriétaire de la plateforme Conforva, de son code source, de ses algorithmes
              et de l'ensemble des éléments qui la composent. Le Client dispose d'un droit d'usage non exclusif
              et non transférable sur le service, limité à la durée de son abonnement.
            </p>
            <p>
              Les documents générés par le service à partir des données du Client appartiennent au Client.
              Le Vendeur ne revendique aucun droit sur ces documents.
            </p>
          </Section>

          <Section title="9. Données personnelles">
            <p>
              Le traitement des données personnelles dans le cadre de la vente est décrit dans la{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">Politique de Confidentialité</a> de Conforva,
              qui fait partie intégrante des présentes CGV.
            </p>
          </Section>

          <Section title="10. Médiation de la consommation">
            <p>
              Conformément aux articles L. 616-1 et R. 616-1 du Code de la consommation, le Client consommateur
              peut recourir gratuitement au service de médiation en cas de litige non résolu avec le Vendeur.
              Le médiateur compétent est :
            </p>
            <div className="bg-gray-50 rounded-lg px-4 py-3 text-xs text-gray-600">
              <p className="font-medium text-gray-800 mb-1">Médiateur de la consommation désigné</p>
              <p>À défaut de désignation d'un médiateur sectoriel spécifique, le Client peut saisir le</p>
              <p>médiateur de la consommation via la plateforme européenne de règlement en ligne des litiges :</p>
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"
                className="text-blue-600 hover:underline">https://ec.europa.eu/consumers/odr</a>
            </div>
            <p>
              Avant toute médiation, le Client doit avoir préalablement contacté le service client de Conforva
              à l'adresse <a href="mailto:contact.conforva@gmail.com" className="text-blue-600 hover:underline">contact.conforva@gmail.com</a> et
              ne pas avoir obtenu de réponse satisfaisante dans un délai de 60 jours.
            </p>
          </Section>

          <Section title="11. Droit applicable et juridiction">
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'efforceront
              de trouver une solution amiable. À défaut, les tribunaux français seront seuls compétents.
              Pour les Clients professionnels, le tribunal compétent sera celui du siège social du Vendeur.
            </p>
          </Section>

        </div>
      </div>
      <PublicFooter />
    </div>
  )
}
