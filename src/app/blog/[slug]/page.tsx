import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PublicNav, PublicFooter } from "@/components/layout/public-nav"
import { Button } from "@/components/ui/button"
import { ARTICLES, getArticle } from "@/lib/blog/articles"
import { Clock, Tag, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"

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
  "Réglementation": "bg-blue-50 text-blue-700 border-blue-100",
  "Amazon FBA": "bg-amber-50 text-amber-700 border-amber-100",
  "Documentation": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Cas d'usage": "bg-emerald-50 text-emerald-700 border-emerald-100",
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
}

function renderBody(lines: string[]) {
  return lines.map((line, i) => {
    if (line.startsWith("**") && line.includes("**")) {
      const parts = line.split(/\*\*(.*?)\*\*/)
      return (
        <p key={i} className="text-gray-700 leading-relaxed">
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="font-semibold text-gray-900">{part}</strong> : part
          )}
        </p>
      )
    }
    if (line.startsWith("✓ ")) {
      return (
        <div key={i} className="flex items-start gap-2.5 py-1">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <span className="text-sm text-gray-700">{line.slice(2)}</span>
        </div>
      )
    }
    return <p key={i} className="text-gray-700 leading-relaxed">{line}</p>
  })
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const articleIndex = ARTICLES.findIndex(a => a.slug === slug)
  const nextArticle = ARTICLES[articleIndex + 1]
  const prevArticle = ARTICLES[articleIndex - 1]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt ?? article.publishedAt,
    "author": { "@type": "Organization", "name": "Conforva", "url": "https://conforva.com" },
    "publisher": { "@type": "Organization", "name": "Conforva", "logo": { "@type": "ImageObject", "url": "https://conforva.com/favicon.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://conforva.com/blog/${article.slug}` },
    "keywords": article.keywords.join(", "),
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PublicNav />

      <main className="max-w-3xl mx-auto px-5 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 truncate">{article.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[article.category] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
              <Tag className="h-3 w-3" />{article.category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">{article.title}</h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-6">{article.description}</p>
          <div className="flex items-center gap-5 text-sm text-gray-400 pb-6 border-b border-gray-100">
            <span>Par <span className="font-medium text-gray-600">Conforva</span></span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{article.readingTime} min de lecture</span>
          </div>
        </header>

        {/* Article content */}
        <article className="prose-style">
          {/* Intro */}
          <p className="text-base text-gray-700 leading-relaxed mb-8 text-lg font-[450]">
            {article.intro}
          </p>

          {/* Sections */}
          {article.sections.map((section, i) => (
            <section key={i} className="mb-10">
              {section.heading && (
                <h2 className="text-xl font-bold text-gray-900 mb-4 mt-10 first:mt-0">
                  {section.heading}
                </h2>
              )}
              <div className="space-y-3">
                {renderBody(section.body)}
              </div>
            </section>
          ))}

          {/* Conclusion */}
          <div className="my-10 rounded-xl bg-gray-50 border border-gray-200 p-6">
            <h2 className="text-base font-bold text-gray-900 mb-2">En résumé</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{article.conclusion}</p>
          </div>
        </article>

        {/* CTA */}
        <div className="my-10 rounded-2xl bg-blue-600 p-8 text-white">
          <h3 className="text-xl font-bold mb-2">{article.cta.heading}</h3>
          <p className="text-blue-100 text-sm mb-6 leading-relaxed">{article.cta.text}</p>
          <Link href={article.cta.href}>
            <Button className="bg-white text-blue-600 hover:bg-blue-50 gap-2">
              {article.cta.button} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-100 gap-4">
          {prevArticle ? (
            <Link href={`/blog/${prevArticle.slug}`} className="group flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors max-w-[48%]">
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span className="line-clamp-2 text-left">{prevArticle.title}</span>
            </Link>
          ) : <div />}
          {nextArticle ? (
            <Link href={`/blog/${nextArticle.slug}`} className="group flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors max-w-[48%] text-right ml-auto">
              <span className="line-clamp-2">{nextArticle.title}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          ) : <div />}
        </div>

        {/* Back to blog */}
        <div className="mt-8 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
