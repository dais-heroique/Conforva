import type { Metadata } from "next"
import Link from "next/link"
import { PublicNavEn, PublicFooterEn } from "@/components/layout/public-nav-en"
import { ARTICLES_EN } from "@/lib/blog/articles-en"
import { Clock, ArrowRight, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog — Competitive Price Monitoring & Pricing Strategy for E-commerce",
  description: "Practical guides on competitive price monitoring, repricing and pricing strategy for Shopify, Amazon and WooCommerce sellers.",
  keywords: [
    "competitive price monitoring", "pricing strategy", "Shopify repricing", "Amazon price tracking",
    "competitive intelligence", "e-commerce blog",
  ],
  openGraph: {
    title: "Conforva Blog — E-commerce Competitive Intelligence",
    description: "Practical guides on competitive price monitoring and pricing strategy for online sellers.",
    url: "https://conforva.com/en/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conforva Blog — E-commerce Competitive Intelligence",
    description: "Practical guides on competitive price monitoring and pricing strategy for online sellers.",
  },
  alternates: {
    canonical: "https://conforva.com/en/blog",
    languages: {
      "fr-FR": "https://conforva.com/blog",
      "en-US": "https://conforva.com/en/blog",
    },
  },
}

const CATEGORY_COLORS: Record<string, string> = {
  "Amazon FBA": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Use Cases": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Strategy": "bg-[#8B5CF6]/15 text-[#A78BFA] border-[#8B5CF6]/20",
  "Tools": "bg-[#8B5CF6]/15 text-[#A78BFA] border-[#8B5CF6]/20",
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
}

export default function BlogPageEn() {
  const [featured, ...rest] = ARTICLES_EN

  return (
    <div className="min-h-screen bg-[#08090C]">
      <PublicNavEn />

      <main className="max-w-5xl mx-auto px-5 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6] mb-2">Blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Guides & e-commerce strategy</h1>
          <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
            Competitive price monitoring, repricing, pricing strategy — everything you need to know to win the price war.
          </p>
        </div>

        {/* Featured article */}
        <Link href={`/en/blog/${featured.slug}`} className="group block mb-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 hover:border-[#8B5CF6]/30 hover:bg-white/8 transition-all duration-150 p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[featured.category] ?? "bg-white/5 text-gray-400 border-white/10"}`}>
                <Tag className="h-3 w-3" />{featured.category}
              </span>
              <span className="text-xs text-gray-500">Featured</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors leading-snug">
              {featured.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-5 max-w-3xl">{featured.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{formatDate(featured.publishedAt)}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readingTime} min read</span>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-[#8B5CF6] group-hover:gap-2 transition-all">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>

        {/* Other articles */}
        <div className="grid sm:grid-cols-2 gap-5">
          {rest.map(article => (
            <Link key={article.slug} href={`/en/blog/${article.slug}`} className="group block">
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 hover:border-[#8B5CF6]/30 hover:bg-white/8 transition-all duration-150 p-6">
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[article.category] ?? "bg-white/5 text-gray-400 border-white/10"}`}>
                    <Tag className="h-3 w-3" />{article.category}
                  </span>
                </div>
                <h2 className="text-base font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{article.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readingTime} min</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-[#8B5CF6] transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <PublicFooterEn />
    </div>
  )
}
