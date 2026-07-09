import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions Générales de Vente (CGV) de Conforva — abonnements, tarifs, modalités de paiement, droit de rétractation 14 jours et résiliation.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://conforva.com/cgv" },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-bold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-gray-400 leading-relaxed">{children}</div>
    </div>
  )
}

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-[#08090C]">
      <PublicNav />
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-white">Conditions Générales de Vente</h1>
          <p className="text-gray-500 mt-2 text-sm">Dernière mise à jour : 9 juillet 2026 · Applicables à compter du 9 juillet 2026</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-8">

          <Section title="1. Objet et champ d'application">
            <p>Les présentes Conditions Générales de Vente (« CGV ») régissent la vente des abonnements au service Conforva, accessible à l'adresse conforva.com, édité par Conforva SAS (ci-après « le Vendeur »).</p>
            <p>Elles s'appliquent à tout achat d'abonnement réalisé par toute personne physique ou morale (« le Client ») sur le site. Tout achat implique l'acceptation pleine et entière des présentes CGV.</p>
          </Section>

          <Section title="2. Description du service">
            <p>Conforva est un logiciel en ligne (SaaS) de veille concurrentielle automatisée pour e-commerçants. Le service permet notamment de :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Surveiller en continu les prix et stocks de concurrents (Shopify, Amazon, WooCommerce, URLs publiques)</li>
              <li>Recevoir des alertes en temps réel lors de changements de prix ou ruptures de stock</li>
              <li>Accéder à des rapports hebdomadaires d'intelligence concurrentielle générés par IA</li>
              <li>Consulter l'historique des prix sur une période glissante</li>
              <li>Exporter les données au format CSV ou PDF</li>
            </ul>
          </Section>

          <Section title="3. Plans tarifaires et prix">
            <p>Les abonnements disponibles sont les suivants (prix TTC, en euros) :</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-white/10 rounded-xl overflow-hidden">
                <thead className="bg-white/5">
                  <tr>
                    {["Plan", "Prix mensuel TTC", "Concurrents surveillés", "Caractéristiques"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                  {[
                    ["Starter", "29 € / mois", "5 concurrents", "Alertes email, historique 30 jours"],
                    ["Growth", "79 € / mois", "25 concurrents", "Rapports IA, historique 90 jours, export CSV"],
                    ["Pro", "199 € / mois", "100 concurrents", "Rapports avancés, historique 12 mois, API"],
                  ].map(([plan, price, refs, features]) => (
                    <tr key={plan} className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-medium text-white">{plan}</td>
                      <td className="px-4 py-2.5 text-gray-300">{price}</td>
                      <td className="px-4 py-2.5 text-gray-300">{refs}</td>
                      <td className="px-4 py-2.5 text-gray-400">{features}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>Le Vendeur se réserve le droit de modifier ses tarifs à tout moment, avec notification préalable de 30 jours. Le Client peut résilier son abonnement avant l'entrée en vigueur du nouveau tarif.</p>
          </Section>

          <Section title="4. Modalités de commande et de paiement">
            <p>L'abonnement est souscrit directement sur le site via la page de facturation du tableau de bord. Le paiement est effectué par carte bancaire via Stripe (Stripe, Inc. — prestataire de paiement certifié PCI-DSS). Conforva ne stocke aucune donnée de carte bancaire.</p>
            <p>L'abonnement est à renouvellement automatique mensuel. La facturation est prélevée à date d'anniversaire de la souscription initiale. Une facture est automatiquement émise par Stripe et accessible dans le portail de facturation du tableau de bord.</p>
          </Section>

          <Section title="5. Droit de rétractation">
            <p>Conformément aux articles L. 221-18 et suivants du Code de la consommation, le Client consommateur (personne physique agissant à titre non professionnel) dispose d'un délai de <strong className="text-gray-200">14 jours</strong> à compter de la souscription pour exercer son droit de rétractation, sans avoir à motiver sa décision.</p>
            <p>Pour exercer ce droit, le Client doit notifier sa décision avant l'expiration du délai à l'adresse : <a href="mailto:contact.conforva@gmail.com" className="text-[#8B5CF6] hover:underline">contact.conforva@gmail.com</a>.</p>
            <p><strong className="text-gray-300">Exception :</strong> conformément à l'article L. 221-28 12° du Code de la consommation, le droit de rétractation ne peut être exercé pour les contenus numériques dont l'exécution a commencé avec l'accord exprès du consommateur.</p>
          </Section>

          <Section title="6. Résiliation">
            <p>Le Client peut résilier son abonnement à tout moment depuis le portail de facturation accessible via son tableau de bord (Paramètres → Facturation → Gérer mon abonnement). La résiliation prend effet à la fin de la période de facturation en cours. Aucun remboursement au prorata n'est accordé pour les périodes entamées, sauf défaut majeur du service imputable au Vendeur.</p>
            <p>En cas de résiliation, le Client conserve l'accès à ses données pendant 30 jours, après quoi elles sont supprimées conformément à la politique de confidentialité.</p>
          </Section>

          <Section title="7. Obligations et responsabilité du Vendeur">
            <p>Le Vendeur s'engage à mettre en œuvre les moyens raisonnables pour assurer la disponibilité du service et la qualité des données collectées. Le Vendeur est soumis à une obligation de moyens et non de résultat.</p>
            <p>La responsabilité du Vendeur ne pourra être engagée en cas de : (i) indisponibilité temporaire des sites surveillés, (ii) modification des sites concurrents rendant la collecte impossible, (iii) force majeure, (iv) inexactitude des informations saisies par le Client.</p>
            <p>En tout état de cause, la responsabilité du Vendeur est limitée aux sommes effectivement perçues du Client au cours des 12 derniers mois précédant la survenance du dommage.</p>
          </Section>

          <Section title="8. Propriété intellectuelle">
            <p>Le Vendeur demeure propriétaire de la plateforme Conforva, de son code source, de ses algorithmes et de l'ensemble des éléments qui la composent. Le Client dispose d'un droit d'usage non exclusif et non transférable sur le service, limité à la durée de son abonnement.</p>
            <p>Les données exportées par le Client depuis le service (CSV, PDF) lui appartiennent.</p>
          </Section>

          <Section title="9. Données personnelles">
            <p>Le traitement des données personnelles dans le cadre de la vente est décrit dans la{" "}
            <Link href="/privacy" className="text-[#8B5CF6] hover:underline">Politique de Confidentialité</Link>{" "}
            de Conforva, qui fait partie intégrante des présentes CGV.</p>
          </Section>

          <Section title="10. Médiation de la consommation">
            <p>Conformément aux articles L. 616-1 et R. 616-1 du Code de la consommation, le Client consommateur peut recourir gratuitement au service de médiation en cas de litige non résolu avec le Vendeur. Le Client peut saisir le médiateur via la plateforme européenne de règlement en ligne des litiges :{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] hover:underline">ec.europa.eu/consumers/odr</a>.</p>
            <p>Avant toute médiation, le Client doit avoir préalablement contacté Conforva à l'adresse <a href="mailto:contact.conforva@gmail.com" className="text-[#8B5CF6] hover:underline">contact.conforva@gmail.com</a> et ne pas avoir obtenu de réponse satisfaisante dans un délai de 60 jours.</p>
          </Section>

          <Section title="11. Droit applicable et juridiction">
            <p>Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, les tribunaux français seront seuls compétents. Pour les Clients professionnels, le tribunal compétent sera celui du siège social du Vendeur.</p>
          </Section>

        </div>
      </div>
      <PublicFooter />
    </div>
  )
}
