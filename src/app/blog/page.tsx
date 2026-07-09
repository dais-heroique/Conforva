import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { ARTICLES } from "@/lib/blog/articles"
import { Clock, ArrowRight, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog — Veille concurrentielle & stratégie prix e-commerce",
  description: "Guides pratiques sur la veille concurrentielle, le repricing et la stratégie tarifaire pour e-commerçants Shopify, Amazon et WooCommerce.",
  keywords: [
    "veille concurrentielle e-commerce", "stratégie prix", "repricing Shopify", "suivi prix Amazon",
    "intelligence concurrentielle", "blog e-commerce",
  ],
  openGraph: {
    title: "Blog Conforva — Veille concurrentielle e-commerce",
    description: "Guides pratiques sur la veille concurrentielle et la stratégie tarifaire pour e-commerçants.",
    url: "https://conforva.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Conforva — Veille concurrentielle e-commerce",
    description: "Guides pratiques sur la veille concurrentielle et la stratégie tarifaire pour e-commerçants.",
  },
  alternates: { canonical: "https://conforva.com/blog" },
}

const CATEGORY_COLORS: Record<string, string> = {
  "Réglementation": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Amazon FBA": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Documentation": "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  "Cas d'usage": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Stratégie": "bg-[#00E676]/15 text-[#00E676] border-[#00E676]/20",
  "Outils": "bg-purple-500/15 text-purple-400 border-purple-500/20",
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
}

export default function BlogPage() {
  const [featured, ...rest] = ARTICLES

  return (
    <div className="min-h-screen bg-[#060D09]">
      <PublicNav />

      <main className="max-w-5xl mx-auto px-5 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00E676] mb-2">Blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Guides & stratégie e-commerce</h1>
          <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
            Veille concurrentielle, repricing, stratégie tarifaire — tout ce que vous devez savoir pour gagner la guerre des prix.
          </p>
        </div>

        {/* Featured article */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 hover:border-[#00E676]/30 hover:bg-white/8 transition-all duration-150 p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[featured.category] ?? "bg-white/5 text-gray-400 border-white/10"}`}>
                <Tag className="h-3 w-3" />{featured.category}
              </span>
              <span className="text-xs text-gray-500">À la une</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#00E676] transition-colors leading-snug">
              {featured.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-5 max-w-3xl">{featured.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{formatDate(featured.publishedAt)}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readingTime} min de lecture</span>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-[#00E676] group-hover:gap-2 transition-all">
                Lire l'article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>

        {/* Other articles */}
        <div className="grid sm:grid-cols-2 gap-5">
          {rest.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 hover:border-[#00E676]/30 hover:bg-white/8 transition-all duration-150 p-6">
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[article.category] ?? "bg-white/5 text-gray-400 border-white/10"}`}>
                    <Tag className="h-3 w-3" />{article.category}
                  </span>
                </div>
                <h2 className="text-base font-bold text-white mb-2 group-hover:text-[#00E676] transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{article.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readingTime} min</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-[#00E676] transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
