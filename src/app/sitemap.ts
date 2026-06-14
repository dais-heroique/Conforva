import type { MetadataRoute } from "next"
import { ARTICLES } from "@/lib/blog/articles"

const BASE = "https://conforva.com"

// Static date for pages that rarely change — avoids needless re-crawl on every build
const SITE_LAUNCH = "2025-01-01"
const LAST_CONTENT_UPDATE = "2026-06-06"

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${BASE}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    // ── Core pages ─────────────────────────────────��──────────────────────────
    {
      url: BASE,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/faq`,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/conformite-gpsr`,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE}/enterprise`,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // ── Company pages ─────────────────────────────────────────────────────────
    {
      url: `${BASE}/about`,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(SITE_LAUNCH),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE}/security`,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    // ── Legal pages ───────────────────────────────────────────────────────────
    {
      url: `${BASE}/cgu`,
      lastModified: new Date("2026-05-31"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/cgv`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date("2026-05-31"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/cookies`,
      lastModified: new Date("2026-06-03"),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: `${BASE}/mentions-legales`,
      lastModified: new Date("2026-05-31"),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    // ── Free tools ────────────────────────────────────────────────────────────
    {
      url: `${BASE}/audit-gratuit`,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // ── SEO landing pages ─────────────────────────────────────────────────────
    {
      url: `${BASE}/gpsr-amazon`,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/gpsr-shopify`,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/gpsr-dropshipping`,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    // ── Affiliate / partner pages ─────────────────────────────────────────────
    {
      url: `${BASE}/partenaires`,
      lastModified: new Date(LAST_CONTENT_UPDATE),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // ── Blog articles ─────────────────────────────────────────────────────────
    ...blogEntries,
  ]
}
