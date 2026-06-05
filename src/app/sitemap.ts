import type { MetadataRoute } from "next"
import { ARTICLES } from "@/lib/blog/articles"

const BASE = "https://conforva.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${BASE}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/enterprise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE}/security`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE}/cgu`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/cgv`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    ...blogEntries,
  ]
}
