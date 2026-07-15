import Link from "next/link"
import type { Metadata } from "next"
import { PublicNavEn, PublicFooterEn } from "@/components/layout/public-nav-en"
import { ChevronDown } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ — Questions about Conforva's Competitive Intelligence",
  description: "All the answers about Conforva: competitor price tracking, repricing, alerts, Shopify/Amazon/WooCommerce integrations, plans and billing.",
  keywords: [
    "Conforva FAQ", "competitive intelligence questions", "how to monitor competitor prices",
    "Shopify automatic repricing", "Amazon price tracking", "competitor price alert",
    "e-commerce competitive intelligence",
  ],
  openGraph: {
    title: "Conforva FAQ — Your questions about competitive intelligence",
    description: "How does price monitoring work? What integrations? Which plan to choose? All the answers here.",
    url: "https://conforva.com/en/faq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conforva FAQ — E-commerce competitive intelligence",
    description: "How to monitor your competitors' prices? Shopify, Amazon, WooCommerce — all the answers.",
  },
  alternates: {
    canonical: "https://conforva.com/en/faq",
    languages: {
      "fr-FR": "https://conforva.com/faq",
      "en-US": "https://conforva.com/en/faq",
    },
  },
}

const SECTIONS = [
  {
    title: "How Conforva works",
    questions: [
      {
        q: "How does Conforva monitor my competitors' prices?",
        a: "Conforva uses web scrapers that regularly visit your competitors' pages and capture the displayed price, availability (in stock / out of stock), and any new listings. Frequency depends on your plan: every hour on Pro, every 6h on Growth, every 24h on Starter. Every change is time-stamped and kept in your price history.",
      },
      {
        q: "What counts as a 'competitor' in Conforva?",
        a: "A competitor is any e-commerce site you want to monitor — a domain or store URL. Conforva tracks that competitor's products that match yours. You can add Shopify stores, Amazon sellers, WooCommerce sites, or any e-commerce site with publicly accessible product pages.",
      },
      {
        q: "What are the weekly AI reports?",
        a: "Every Monday morning, Conforva generates a competitive intelligence report for your store, powered by the Gemini AI API. The report analyzes the past week's price movements, flags important trends (coordinated drops, flash sales, an aggressive new competitor) and gives you actionable recommendations: which prices to adjust, which products to push, which competitors to watch closely.",
      },
      {
        q: "How do price alerts work?",
        a: "You create alerts on specific conditions: \"alert me if a competitor drops their price by more than 5%\", \"alert me if a product goes out of stock at X\". As soon as the condition is met, you get an email with the details of the change. Alerts are checked on every competitor scan.",
      },
    ],
  },
  {
    title: "Integrations & compatibility",
    questions: [
      {
        q: "Does Conforva work with Shopify?",
        a: "Yes. You can add any Shopify store as a competitor — Conforva automatically monitors its products and prices. For importing your own catalog, Shopify connection (via OAuth or API key) is available on Growth and Pro plans and lets you import your listings in one click.",
      },
      {
        q: "Can I monitor Amazon sellers?",
        a: "Yes. Enter the seller profile URL or an Amazon product page and Conforva adds that competitor to your dashboard. Amazon monitoring includes price, Buy Box status, availability, and third-party seller prices on the same listing.",
      },
      {
        q: "Is WooCommerce supported?",
        a: "Yes, for monitoring competitor WooCommerce sites (public access). To import your own WooCommerce catalog, a connection via WooCommerce REST API keys is available on Growth and Pro plans.",
      },
      {
        q: "Can I monitor any e-commerce site?",
        a: "In most cases, yes. Conforva can monitor any site whose product pages are publicly accessible. Sites with aggressive anti-bot protection (Cloudflare, etc.) may have limitations. If a specific competitor gives you trouble, contact our support.",
      },
    ],
  },
  {
    title: "Plans & billing",
    questions: [
      {
        q: "What's the difference between plans?",
        a: "Starter ($29/mo): 5 competitors, 50 products, email alerts, weekly AI reports. Growth ($79/mo): 20 competitors, 500 products, advanced alerts, Shopify/WooCommerce integrations, scans every 6h. Pro ($199/mo): unlimited competitors, 5,000 products, hourly scans, real-time alerts, API access. Enterprise: custom.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes. Every plan includes a 14-day free trial — no card required to start. After 14 days, you choose a plan or your account switches to read-only (data kept for 30 days).",
      },
      {
        q: "Can I change plans at any time?",
        a: "Yes. Upgrade or downgrade from the Billing section of your dashboard. Changes take effect immediately with prorated billing for the current period.",
      },
      {
        q: "Can I get a refund?",
        a: "A 14-day withdrawal period applies from the date of subscription. Beyond that, contact contact.conforva@gmail.com with your order number — we review each situation individually.",
      },
    ],
  },
  {
    title: "Data & security",
    questions: [
      {
        q: "Where is my data stored?",
        a: "Your data is stored in a Turso (libSQL) database hosted in the European Union. Payments go exclusively through Stripe. AI inference runs on the Gemini API (Google), with no permanent storage of your data on Google's side.",
      },
      {
        q: "Is my data used to train the AI?",
        a: "No. Your catalog and competitor data is never used to train third-party AI models. Your competitive information stays strictly confidential.",
      },
      {
        q: "Is Conforva GDPR compliant?",
        a: "Yes. Conforva is GDPR compliant. You have the right to access, rectify, delete and port your data. To exercise these rights, contact contact.conforva@gmail.com.",
      },
    ],
  },
]

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": SECTIONS.flatMap(s => s.questions).map(q => ({
    "@type": "Question",
    "name": q.q,
    "acceptedAnswer": { "@type": "Answer", "text": q.a },
  })),
}

export default function FAQPageEn() {
  return (
    <div className="min-h-screen bg-[#08090C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <PublicNavEn />

      <main className="max-w-3xl mx-auto px-5 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-2">Support</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently asked questions</h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Can't find what you're looking for?{" "}
            <Link href="/contact" className="text-[#8B5CF6] underline underline-offset-2 hover:text-[#8B5CF6]/80">
              Contact me directly
            </Link>.
          </p>
        </div>

        <div className="space-y-12">
          {SECTIONS.map(section => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-white mb-5 pb-3 border-b border-white/10">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.questions.map(item => (
                  <details key={item.q} className="group rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none hover:bg-white/8 transition-colors">
                      <span className="font-medium text-sm text-white">{item.q}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-400 leading-relaxed border-t border-white/5">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-8 text-center">
          <h2 className="text-lg font-bold text-white mb-2">Have another question?</h2>
          <p className="text-sm text-gray-400 mb-5">Send a message to contact.conforva@gmail.com.</p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#8B5CF6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#7C3AED] transition-colors">
              Send a message
            </button>
          </Link>
        </div>
      </main>

      <PublicFooterEn />
    </div>
  )
}
