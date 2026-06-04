import type { Metadata } from "next"
import Link from "next/link"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { ARTICLES } from "@/lib/blog/articles"
import { Clock, ArrowRight, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog GPSR — Conformité produit pour e-commerçants",
  description: "Guides pratiques sur la conformité GPSR (UE) 2023/988 : dossier technique, analyse de risque, Amazon FBA, dropshipping, personne responsable EU. Mis à jour régulièrement.",
  keywords: [
    "blog GPSR", "guide conformité GPSR", "actualité GPSR", "GPSR e-commerce",
    "dossier technique guide", "conformité produit UE",
  ],
  openGraph: {
    title: "Blog GPSR — Guides conformité pour e-commerçants",
    description: "Guides pratiques sur la conformité GPSR : dossier technique, Amazon FBA, dropshipping, personne responsable EU.",
    url: "https://conforva.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog GPSR — Guides conformité pour e-commerçants",
    description: "Guides pratiques sur la conformité GPSR : dossier technique, Amazon FBA, dropshipping, personne responsable EU.",
  },
  alternates: { canonical: "https://conforva.com/blog" },
}

const CATEGORY_COLORS: Record<string, string> = {
  "Réglementation": "bg-blue-50 text-blue-700 border-blue-100",
  "Amazon FBA": "bg-amber-50 text-amber-700 border-amber-100",
  "Documentation": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Cas d'usage": "bg-emerald-50 text-emerald-700 border-emerald-100",
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
}

export default function BlogPage() {
  const [featured, ...rest] = ARTICLES

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <main className="max-w-5xl mx-auto px-5 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Guides & actualités GPSR</h1>
          <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
            Tout ce que vous devez savoir sur la conformité GPSR pour vendre en Europe — réglementation, pratique, outils.
          </p>
        </div>

        {/* Featured article */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-10">
          <div className="rounded-2xl border border-gray-200 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-150 p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[featured.category] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
                <Tag className="h-3 w-3" />{featured.category}
              </span>
              <span className="text-xs text-gray-400">À la une</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">
              {featured.title}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5 max-w-3xl">{featured.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{formatDate(featured.publishedAt)}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readingTime} min de lecture</span>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                Lire l'article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>

        {/* Other articles */}
        <div className="grid sm:grid-cols-2 gap-5">
          {rest.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
              <div className="h-full rounded-2xl border border-gray-200 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-150 p-6">
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[article.category] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
                    <Tag className="h-3 w-3" />{article.category}
                  </span>
                </div>
                <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{article.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readingTime} min</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
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
