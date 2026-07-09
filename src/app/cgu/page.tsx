import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions Générales d'Utilisation (CGU) de Conforva — règles d'utilisation du service de veille concurrentielle, limites de responsabilité, propriété intellectuelle et droit applicable.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://conforva.com/cgu" },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-bold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-gray-400 leading-relaxed">{children}</div>
    </div>
  )
}

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-[#08090C]">
      <PublicNav />
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-white">Conditions Générales d'Utilisation</h1>
          <p className="text-gray-500 mt-2 text-sm">Dernière mise à jour : 9 juillet 2026</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-8">

          <Section title="Article 1 — Objet et acceptation des CGU">
            <p>Les présentes Conditions Générales d'Utilisation (« CGU ») régissent l'accès et l'utilisation de la plateforme Conforva (« le Service »), éditée par Conforva SAS, société par actions simplifiée en cours d'immatriculation au Registre du Commerce et des Sociétés, dont le siège social est situé en France (« l'Éditeur »).</p>
            <p>L'accès au Service, qu'il soit à titre gratuit ou payant, vaut acceptation pleine et entière des présentes CGU. Si l'utilisateur n'accepte pas les présentes CGU, il doit cesser immédiatement toute utilisation du Service.</p>
            <p>Les CGU peuvent être modifiées à tout moment par l'Éditeur. Les modifications prennent effet dès leur publication. La poursuite de l'utilisation du Service après modification vaut acceptation des nouvelles conditions.</p>
          </Section>

          <Section title="Article 2 — Description du service Conforva">
            <p>Conforva est une application SaaS (Software as a Service) de veille concurrentielle automatisée pour les e-commerçants. Le Service permet notamment de :</p>
            <p>— Surveiller en continu les prix, stocks et catalogues de concurrents sur Shopify, Amazon, WooCommerce et toute URL publique ;</p>
            <p>— Recevoir des alertes en temps réel lors de changements de prix ou de ruptures de stock ;</p>
            <p>— Accéder à des rapports hebdomadaires d'intelligence concurrentielle générés par intelligence artificielle ;</p>
            <p>— Consulter l'historique des prix et tendances sur une période glissante ;</p>
            <p>— Exporter les données au format CSV ou PDF.</p>
            <p>Le Service s'appuie sur des modèles d'intelligence artificielle générative pour produire les rapports d'analyse. Ces rapports sont générés automatiquement sur la base des données collectées par les scrapers de Conforva et des informations saisies par l'utilisateur.</p>
            <p>Conforva SAS se réserve le droit de faire évoluer les fonctionnalités du Service à tout moment sans préavis, dans le respect des engagements contractuels souscrits.</p>
          </Section>

          <Section title="Article 3 — Inscription, compte utilisateur et responsabilités">
            <p><strong className="text-gray-300">3.1 Création du compte</strong><br />
            L'accès au Service nécessite la création d'un compte utilisateur en fournissant une adresse électronique valide et un mot de passe sécurisé. L'utilisateur s'engage à fournir des informations exactes, complètes et à jour.</p>
            <p><strong className="text-gray-300">3.2 Sécurité des identifiants</strong><br />
            L'utilisateur est seul responsable de la confidentialité de ses identifiants. Il s'engage à notifier immédiatement Conforva SAS de tout accès non autorisé à l'adresse contact.conforva@gmail.com.</p>
            <p><strong className="text-gray-300">3.3 Suspension du compte</strong><br />
            Conforva SAS se réserve le droit de suspendre ou de supprimer tout compte en cas de violation des présentes CGU, sans préavis ni indemnité.</p>
          </Section>

          <Section title="Article 4 — Obligations de l'utilisateur">
            <p>L'utilisateur s'engage à :</p>
            <p>— Utiliser le Service conformément aux lois et réglementations applicables ;</p>
            <p>— Ne surveiller que des URLs et informations publiquement accessibles ;</p>
            <p>— Ne pas tenter d'accéder aux données d'autres utilisateurs ni de compromettre la sécurité du Service ;</p>
            <p>— Ne pas reproduire, revendre ou sous-licencier les fonctionnalités du Service sans autorisation écrite préalable ;</p>
            <p>— Ne pas utiliser le Service à des fins illicites, frauduleuses ou contraires à l'ordre public.</p>
          </Section>

          <Section title="Article 5 — Nature et limites des analyses générées">
            <p>Les rapports et analyses générés par le Service constituent des aides à la prise de décision commerciale. Ils ne constituent en aucun cas :</p>
            <p>— Un conseil juridique, financier ou commercial certifié ;</p>
            <p>— Une garantie de résultats commerciaux ou de rentabilité ;</p>
            <p>— Une source d'information exhaustive sur l'ensemble des concurrents du marché.</p>
            <p>Les données collectées par les scrapers peuvent être incomplètes, retardées ou indisponibles en cas de modification des sites surveillés. L'utilisateur reconnaît et accepte ces limitations inhérentes à la technologie mise en œuvre.</p>
          </Section>

          <Section title="Article 6 — Limitation de responsabilité">
            <p><strong className="text-gray-300">6.1 Exclusion des dommages indirects</strong><br />
            Dans toute la mesure permise par le droit applicable, Conforva SAS ne saurait être tenu responsable de dommages indirects, incluant sans limitation : manque à gagner, perte d'exploitation, perte de données ou perte de clients découlant de l'utilisation du Service.</p>
            <p><strong className="text-gray-300">6.2 Plafond de responsabilité</strong><br />
            La responsabilité totale de Conforva SAS ne pourra excéder le montant total des sommes versées par l'utilisateur au cours des douze (12) mois précédant le fait générateur, ou la somme de cent (100) euros si l'utilisateur bénéficiait d'un accès gratuit.</p>
            <p><strong className="text-gray-300">6.3 Disponibilité du Service</strong><br />
            Conforva SAS s'efforce d'assurer la disponibilité du Service 24h/24 et 7j/7 mais ne garantit pas une disponibilité ininterrompue. Des interruptions pour maintenance, mises à jour ou incidents techniques peuvent survenir.</p>
          </Section>

          <Section title="Article 7 — Propriété intellectuelle">
            <p><strong className="text-gray-300">7.1 Propriété des données exportées</strong><br />
            Les données exportées par l'utilisateur depuis le Service lui appartiennent. Conforva SAS ne revendique aucun droit de propriété sur ces exports.</p>
            <p><strong className="text-gray-300">7.2 Propriété du Service</strong><br />
            L'application Conforva, son interface, son architecture, ses algorithmes et son code source sont la propriété exclusive de Conforva SAS et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.</p>
            <p><strong className="text-gray-300">7.3 Données anonymisées</strong><br />
            L'utilisateur autorise Conforva SAS à utiliser, à des fins d'amélioration du Service, des données anonymisées et agrégées dérivées de l'usage du Service, ne permettant en aucun cas d'identifier l'utilisateur.</p>
          </Section>

          <Section title="Article 8 — Tarifs et facturation">
            <p><strong className="text-gray-300">8.1 Offres et prix</strong><br />
            Le Service est proposé selon plusieurs formules d'abonnement (Starter, Growth, Pro) dont les tarifs sont affichés sur la page tarifaire du site conforva.com. Les prix sont exprimés en euros TTC. Conforva SAS se réserve le droit de modifier ses tarifs avec notification préalable de 30 jours.</p>
            <p><strong className="text-gray-300">8.2 Modalités de facturation</strong><br />
            Les abonnements payants sont facturés mensuellement. La facturation est gérée via Stripe (Stripe, Inc.). Conforva SAS ne conserve pas les données de carte bancaire de l'utilisateur.</p>
            <p><strong className="text-gray-300">8.3 Droit de rétractation</strong><br />
            Conformément à l'article L. 221-18 du Code de la consommation, l'utilisateur consommateur bénéficie d'un droit de rétractation de 14 jours à compter de la souscription. La demande doit être adressée à contact.conforva@gmail.com.</p>
          </Section>

          <Section title="Article 9 — Durée, suspension et résiliation">
            <p>L'utilisateur peut résilier son abonnement à tout moment depuis les paramètres de son compte. La résiliation prend effet à l'issue de la période de facturation en cours. Les données sont conservées pendant 30 jours après la résiliation, puis supprimées conformément à la politique de confidentialité.</p>
          </Section>

          <Section title="Article 10 — Données personnelles">
            <p>Le traitement des données personnelles des utilisateurs est régi par la{" "}
            <Link href="/privacy" className="text-[#8B5CF6] hover:underline">Politique de confidentialité</Link>{" "}
            de Conforva SAS, accessible à l'adresse conforva.com/privacy, incorporée par référence aux présentes CGU.</p>
          </Section>

          <Section title="Article 11 — Loi applicable et juridiction">
            <p>Les présentes CGU sont régies par le droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable dans un délai de trente (30) jours. À défaut, tout litige sera soumis à la compétence exclusive des tribunaux compétents dans le ressort de la Cour d'appel de Paris.</p>
          </Section>

          <Section title="Article 12 — Contact">
            <p>Pour toute question relative aux présentes CGU : <a href="mailto:contact.conforva@gmail.com" className="text-[#8B5CF6] hover:underline">contact.conforva@gmail.com</a></p>
          </Section>

          <div className="border-t border-white/10 pt-6">
            <p className="text-xs text-gray-600 text-center">
              <Link href="/privacy" className="underline hover:text-gray-400 transition-colors">Politique de confidentialité</Link>
              {" · "}
              <Link href="/mentions-legales" className="underline hover:text-gray-400 transition-colors">Mentions légales</Link>
            </p>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  )
}
