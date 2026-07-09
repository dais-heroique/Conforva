import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Conforva — éditeur, hébergement, propriété intellectuelle et informations légales obligatoires.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://conforva.com/mentions-legales" },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-bold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-gray-400 leading-relaxed">{children}</div>
    </div>
  )
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[#08090C]">
      <PublicNav />
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-white">Mentions légales</h1>
          <p className="text-gray-500 mt-2 text-sm">Dernière mise à jour : 9 juillet 2026</p>
          <p className="text-gray-500 mt-1 text-sm">Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-8">

          <Section title="1. Éditeur du site">
            <p>Le site conforva.com est édité par :</p>
            <p className="font-medium text-gray-300">Conforva SAS<br />
            Forme juridique : Société par actions simplifiée (SAS)<br />
            Statut : en cours d'immatriculation au Registre du Commerce et des Sociétés<br />
            Siège social : France<br />
            Email : contact.conforva@gmail.com</p>
          </Section>

          <Section title="2. Directeur de la publication">
            <p>Le directeur de la publication du site conforva.com est le représentant légal de Conforva SAS.</p>
            <p>Contact : <a href="mailto:contact.conforva@gmail.com" className="text-[#8B5CF6] hover:underline">contact.conforva@gmail.com</a></p>
          </Section>

          <Section title="3. Hébergement du site">
            <p>Le site conforva.com est hébergé par :</p>
            <p className="font-medium text-gray-300">Vercel Inc.<br />
            340 Pine Street, Suite 701<br />
            San Francisco, CA 94104<br />
            États-Unis d'Amérique<br />
            Site web : www.vercel.com</p>
            <p>Vercel exploite un réseau de distribution mondial (Edge Network). Les transferts de données vers Vercel sont encadrés par les clauses contractuelles types UE-USA (SCCs).</p>
          </Section>

          <Section title="4. Base de données">
            <p>La base de données du Service est hébergée par :</p>
            <p className="font-medium text-gray-300">Turso Inc.<br />
            États-Unis d'Amérique<br />
            Site web : turso.tech</p>
            <p>Turso agit en qualité de sous-traitant au sens du RGPD. Les transferts de données sont encadrés par les clauses contractuelles types UE-USA (SCCs).</p>
          </Section>

          <Section title="5. Propriété intellectuelle">
            <p><strong className="text-gray-300">5.1 Marque et dénomination</strong><br />
            La dénomination « Conforva » et le logo associé sont la propriété exclusive de Conforva SAS. Toute reproduction ou utilisation non autorisée de ces éléments est strictement interdite.</p>
            <p><strong className="text-gray-300">5.2 Code source et application</strong><br />
            Le code source de l'application Conforva, son interface, son architecture, ses algorithmes et ses bases de données sont protégés par le droit d'auteur (Code de la propriété intellectuelle français). Toute reproduction sans autorisation préalable et écrite de Conforva SAS est strictement interdite et constitue une contrefaçon sanctionnée par les articles L. 335-2 et suivants du Code de la propriété intellectuelle.</p>
            <p><strong className="text-gray-300">5.3 Données exportées</strong><br />
            Les données exportées par l'utilisateur via le Service lui appartiennent, conformément aux{" "}
            <Link href="/cgu" className="text-[#8B5CF6] hover:underline">Conditions Générales d'Utilisation</Link>.</p>
          </Section>

          <Section title="6. Données personnelles">
            <p>Le traitement des données personnelles des utilisateurs est régi par la{" "}
            <Link href="/privacy" className="text-[#8B5CF6] hover:underline">Politique de confidentialité</Link>{" "}
            de Conforva SAS, accessible à l'adresse conforva.com/privacy.</p>
            <p>Conformément au RGPD et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, tout utilisateur dispose d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition.</p>
            <p>Pour exercer ces droits : <a href="mailto:contact.conforva@gmail.com" className="text-[#8B5CF6] hover:underline">contact.conforva@gmail.com</a><br />
            Autorité de contrôle : CNIL — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] hover:underline">www.cnil.fr</a></p>
          </Section>

          <Section title="7. Cookies">
            <p>Le site conforva.com utilise uniquement des cookies de session strictement nécessaires au fonctionnement du service d'authentification (NextAuth.js). Aucun cookie publicitaire ou traceur tiers n'est déposé.</p>
            <p>Pour plus d'informations, consultez notre <Link href="/privacy" className="text-[#8B5CF6] hover:underline">Politique de confidentialité</Link>.</p>
          </Section>

          <Section title="8. Liens hypertextes">
            <p>Le site conforva.com peut contenir des liens hypertextes vers des sites tiers. Conforva SAS n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur politique de confidentialité.</p>
          </Section>

          <Section title="9. Limitation de responsabilité">
            <p>Les informations disponibles sur le site conforva.com sont fournies à titre informatif. Conforva SAS s'efforce d'assurer l'exactitude des informations publiées mais ne garantit pas leur exhaustivité ou actualité.</p>
            <p>Pour les limitations de responsabilité relatives au Service, consulter les <Link href="/cgu" className="text-[#8B5CF6] hover:underline">CGU</Link>.</p>
          </Section>

          <Section title="10. Loi applicable et juridiction">
            <p>Le présent site et ses mentions légales sont régis par le droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français compétents dans le ressort de la Cour d'appel de Paris seront seuls compétents.</p>
          </Section>

          <Section title="11. Crédits">
            <p>Conception, développement et exploitation : Conforva SAS</p>
            <p>Technologies utilisées : Next.js (Vercel), Turso (base de données), Stripe, Google Gemini, Tailwind CSS.</p>
          </Section>

          <div className="border-t border-white/10 pt-6">
            <p className="text-xs text-gray-600 text-center">
              Pour toute question : <a href="mailto:contact.conforva@gmail.com" className="underline hover:text-gray-400 transition-colors">contact.conforva@gmail.com</a>
              {" · "}
              <Link href="/cgu" className="underline hover:text-gray-400 transition-colors">CGU</Link>
              {" · "}
              <Link href="/privacy" className="underline hover:text-gray-400 transition-colors">Politique de confidentialité</Link>
            </p>
          </div>

        </div>
      </div>
      <PublicFooter />
    </div>
  )
}
