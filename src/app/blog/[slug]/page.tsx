import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import { ARTICLES, getArticle } from "@/lib/blog/articles"
import { Clock, Tag, ArrowLeft, ArrowRight, CheckCircle2, Calculator, Percent } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: "Article introuvable" }

  const url = `https://conforva.com/blog/${article.slug}`

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: "Conforva", url: "https://conforva.com" }],
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      section: article.category,
      tags: article.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
    alternates: { canonical: url },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  "Stratégie": "bg-[#8B5CF6]/15 text-[#A78BFA] border-[#8B5CF6]/20",
  "Amazon FBA": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Outils": "bg-[#8B5CF6]/15 text-[#A78BFA] border-[#8B5CF6]/20",
  "Cas d'usage": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
}

function renderBody(lines: string[]) {
  return lines.map((line, i) => {
    if (line.startsWith("**") && line.includes("**")) {
      const parts = line.split(/\*\*(.*?)\*\*/)
      return (
        <p key={i} className="text-gray-300 leading-relaxed">
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="font-semibold text-white">{part}</strong> : part
          )}
        </p>
      )
    }
    if (line.startsWith("✓ ")) {
      return (
        <div key={i} className="flex items-start gap-2.5 py-1">
          <CheckCircle2 className="h-4 w-4 text-[#8B5CF6] shrink-0 mt-0.5" />
          <span className="text-sm text-gray-300">{line.slice(2)}</span>
        </div>
      )
    }
    return <p key={i} className="text-gray-300 leading-relaxed">{line}</p>
  })
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const articleIndex = ARTICLES.findIndex(a => a.slug === slug)
  const nextArticle = ARTICLES[articleIndex + 1]
  const prevArticle = ARTICLES[articleIndex - 1]

  // Topically related articles (same category) beat purely positional prev/next
  // for both internal linking value and reader relevance.
  const relatedArticles = ARTICLES
    .filter(a => a.slug !== slug && a.category === article.category)
    .slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt ?? article.publishedAt,
    "author": { "@type": "Organization", "name": "Conforva", "url": "https://conforva.com" },
    "publisher": { "@type": "Organization", "name": "Conforva", "logo": { "@type": "ImageObject", "url": "https://conforva.com/favicon.svg" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://conforva.com/blog/${article.slug}` },
    "keywords": article.keywords.join(", "),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://conforva.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://conforva.com/blog" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://conforva.com/blog/${article.slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-[#08090C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PublicNav />

      <main className="max-w-3xl mx-auto px-5 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400 truncate">{article.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[article.category] ?? "bg-white/5 text-gray-400 border-white/10"}`}>
              <Tag className="h-3 w-3" />{article.category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-4">{article.title}</h1>
          <p className="text-lg text-gray-400 leading-relaxed mb-6">{article.description}</p>
          <div className="flex items-center gap-5 text-sm text-gray-500 pb-6 border-b border-white/10">
            <span>Par <span className="font-medium text-gray-300">Conforva</span></span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{article.readingTime} min de lecture</span>
          </div>
        </header>

        {/* Article content */}
        <article>
          <p className="text-base text-gray-300 leading-relaxed mb-8 text-lg font-[450]">
            {article.intro}
          </p>

          {article.sections.map((section, i) => (
            <section key={i} className="mb-10">
              {section.heading && (
                <h2 className="text-xl font-bold text-white mb-4 mt-10 first:mt-0">
                  {section.heading}
                </h2>
              )}
              <div className="space-y-3">
                {renderBody(section.body)}
              </div>
            </section>
          ))}

          {/* Conclusion */}
          <div className="my-10 rounded-xl bg-white/5 border border-white/10 p-6">
            <h2 className="text-base font-bold text-white mb-2">En résumé</h2>
            <p className="text-sm text-gray-300 leading-relaxed">{article.conclusion}</p>
          </div>
        </article>

        {/* CTA */}
        <div className="my-10 rounded-2xl bg-[#8B5CF6] p-8">
          <h3 className="text-xl font-bold text-white mb-2">{article.cta.heading}</h3>
          <p className="text-white/70 text-sm mb-6 leading-relaxed">{article.cta.text}</p>
          <Link href={article.cta.href}>
            <Button className="bg-white/15 text-white hover:bg-white/25 gap-2 border border-white/20">
              {article.cta.button} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Free tools cross-link */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/4 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-4">Outils gratuits liés</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href="/comparateur-prix"
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/8 border border-white/8 transition-colors group"
            >
              <div className="h-9 w-9 rounded-lg bg-[#8B5CF6]/15 flex items-center justify-center shrink-0">
                <Percent className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white group-hover:text-[#A78BFA] transition-colors">Comparateur de prix</p>
                <p className="text-xs text-gray-500">Comparez votre prix à un concurrent, gratuitement</p>
              </div>
            </Link>
            <Link
              href="/calculateur-marge-ecommerce"
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/8 border border-white/8 transition-colors group"
            >
              <div className="h-9 w-9 rounded-lg bg-[#8B5CF6]/15 flex items-center justify-center shrink-0">
                <Calculator className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white group-hover:text-[#A78BFA] transition-colors">Calculateur de marge</p>
                <p className="text-xs text-gray-500">Calculez votre marge et prix de vente idéal</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Related articles (same category) */}
        {relatedArticles.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-4">Articles similaires</h3>
            <div className="space-y-3">
              {relatedArticles.map(a => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="block p-4 rounded-xl bg-white/4 hover:bg-white/8 border border-white/8 transition-colors group"
                >
                  <p className="text-sm font-semibold text-white group-hover:text-[#A78BFA] transition-colors mb-1">{a.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{a.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10 gap-4">
          {prevArticle ? (
            <Link href={`/blog/${prevArticle.slug}`} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-[#8B5CF6] transition-colors max-w-[48%]">
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span className="line-clamp-2 text-left">{prevArticle.title}</span>
            </Link>
          ) : <div />}
          {nextArticle ? (
            <Link href={`/blog/${nextArticle.slug}`} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-[#8B5CF6] transition-colors max-w-[48%] text-right ml-auto">
              <span className="line-clamp-2">{nextArticle.title}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          ) : <div />}
        </div>

        {/* Back to blog */}
        <div className="mt-8 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#8B5CF6] hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
