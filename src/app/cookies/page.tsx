import type { Metadata } from "next"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Politique de cookies de Conforva — uniquement des cookies techniques essentiels. Aucun tracker publicitaire, aucun cookie Google Analytics ou Meta Pixel. Conforme RGPD.",
  openGraph: {
    title: "Politique de cookies — Conforva",
    description: "Conforva n'utilise que des cookies essentiels. Aucun tracker publicitaire. Conforme RGPD.",
    url: "https://conforva.com/cookies",
    type: "website",
  },
  alternates: { canonical: "https://conforva.com/cookies" },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  )
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Politique de cookies</h1>
          <p className="text-gray-500 mt-2 text-sm">Dernière mise à jour : 3 juin 2026</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-8">

          <Section title="1. Qu'est-ce qu'un cookie ?">
            <p>
              Un cookie est un petit fichier texte déposé sur votre navigateur lors de la visite d'un site web.
              Il permet au site de mémoriser des informations sur votre visite (préférences de langue, session de connexion, etc.)
              afin d'améliorer votre expérience et de sécuriser l'accès à votre compte.
            </p>
          </Section>

          <Section title="2. Cookies utilisés sur Conforva">
            <p>Conforva utilise uniquement des cookies strictement nécessaires au fonctionnement du service. Aucun cookie publicitaire ou de suivi tiers n'est déposé.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    {["Nom", "Émetteur", "Finalité", "Durée"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      name: "sb-*-auth-token",
                      issuer: "Supabase",
                      purpose: "Cookie de session d'authentification. Permet de maintenir votre connexion à votre compte Conforva.",
                      duration: "Session / 1 semaine",
                    },
                    {
                      name: "__stripe_mid",
                      issuer: "Stripe",
                      purpose: "Identifiant de machine utilisé par Stripe pour la prévention de la fraude lors des paiements. Déposé uniquement lors du passage en caisse.",
                      duration: "1 an",
                    },
                    {
                      name: "__stripe_sid",
                      issuer: "Stripe",
                      purpose: "Identifiant de session Stripe pour la sécurisation des transactions de paiement.",
                      duration: "Session",
                    },
                    {
                      name: "next-auth.csrf-token",
                      issuer: "Conforva",
                      purpose: "Jeton CSRF pour la protection contre les attaques de type Cross-Site Request Forgery.",
                      duration: "Session",
                    },
                  ].map(c => (
                    <tr key={c.name} className="hover:bg-gray-50/50">
                      <td className="px-4 py-2.5 font-mono text-gray-700 align-top">{c.name}</td>
                      <td className="px-4 py-2.5 font-medium align-top">{c.issuer}</td>
                      <td className="px-4 py-2.5 text-gray-600 align-top">{c.purpose}</td>
                      <td className="px-4 py-2.5 text-gray-500 align-top whitespace-nowrap">{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="3. Cookies strictement nécessaires — pas de consentement requis">
            <p>
              Conformément à l'article 82 de la loi Informatique et Libertés et aux lignes directrices de la CNIL,
              les cookies strictement nécessaires au fonctionnement du service (authentification, sécurité des paiements)
              <strong> ne nécessitent pas votre consentement préalable</strong>, car ils sont indispensables à la fourniture
              du service que vous avez demandé.
            </p>
            <p>
              Conforva n'utilise pas de cookies analytiques, publicitaires ou de suivi de comportement.
              Aucun cookie tiers de type Google Analytics, Facebook Pixel ou équivalent n'est déposé.
            </p>
          </Section>

          <Section title="4. Comment gérer les cookies ?">
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies ou être informé de leur dépôt.
              Cependant, la désactivation des cookies strictement nécessaires empêchera le bon fonctionnement
              du service (impossibilité de se connecter, paiements non sécurisés).
            </p>
            <div className="bg-gray-50 rounded-lg px-4 py-3 space-y-1.5 text-xs text-gray-600">
              <p className="font-semibold text-gray-800">Guides par navigateur :</p>
              {[
                ["Chrome", "Paramètres → Confidentialité et sécurité → Cookies"],
                ["Firefox", "Paramètres → Vie privée et sécurité → Cookies"],
                ["Safari", "Préférences → Confidentialité → Cookies"],
                ["Edge", "Paramètres → Cookies et autorisations de site"],
              ].map(([browser, path]) => (
                <p key={browser}><strong>{browser} :</strong> {path}</p>
              ))}
            </div>
          </Section>

          <Section title="5. Base légale du traitement">
            <p>
              Le dépôt de cookies strictement nécessaires repose sur la base légale de l'<strong>intérêt légitime</strong> du
              responsable de traitement (sécurisation du service, authentification) et de l'<strong>exécution du contrat</strong> (permettre
              la connexion et les paiements).
            </p>
            <p>
              Conformément au RGPD (Règlement UE 2016/679) et à la directive ePrivacy (2002/58/CE), aucun autre
              cookie ne nécessitant un consentement explicite n'est utilisé sur ce site.
            </p>
          </Section>

          <Section title="6. Contact">
            <p>
              Pour toute question relative aux cookies ou à la protection de vos données personnelles, contactez-nous à :{" "}
              <a href="mailto:support@conforva.com" className="text-blue-600 hover:underline">support@conforva.com</a>
            </p>
            <p>
              Pour plus d'informations sur la gestion de vos données personnelles, consultez notre{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">Politique de confidentialité</a>.
            </p>
          </Section>

        </div>
      </div>
      <PublicFooter />
    </div>
  )
}
