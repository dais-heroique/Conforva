import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { organizations, trackedCompetitors, trackedProducts, priceHistory, weeklyReports } from "@/lib/db/schema"
import { eq, and, gte, desc } from "drizzle-orm"

// Called by Vercel Cron — protected by secret header
export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })
  }

  const db = getDb()
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const now = new Date()
  const weekStart = since7d
  const weekEnd = now

  try {
    // Get all active orgs with competitors
    const allOrgs = await db.select().from(organizations)

    const results = []

    for (const org of allOrgs) {
      try {
        const competitors = await db
          .select()
          .from(trackedCompetitors)
          .where(and(eq(trackedCompetitors.organizationId, org.id), eq(trackedCompetitors.isActive, true)))

        if (competitors.length === 0) continue

        const recentChanges = await db
          .select({ product: trackedProducts })
          .from(trackedProducts)
          .where(and(
            eq(trackedProducts.organizationId, org.id),
            gte(trackedProducts.lastPriceChangedAt, since7d)
          ))
          .orderBy(desc(trackedProducts.lastPriceChangedAt))
          .limit(50)

        const report = await generateGeminiReport({
          orgName: org.name,
          competitors: competitors.map(c => ({ name: c.name, domain: c.domain, platform: c.platform })),
          priceChanges: recentChanges.map(({ product }) => ({
            name: product.name || product.url,
            previousPrice: product.previousPrice,
            currentPrice: product.currentPrice,
            changePercent: product.priceChangePercent,
            currency: product.currency ?? "EUR",
          })),
        })

        await db.insert(weeklyReports).values({
          organizationId: org.id,
          weekStart,
          weekEnd,
          summary: report.summary,
          keyInsights: report.keyInsights,
          recommendations: report.recommendations,
          priceMovements: JSON.stringify(recentChanges.slice(0, 10).map(r => r.product)),
        })

        results.push({ orgId: org.id, success: true })
      } catch (err) {
        console.error(`[reports/generate] Failed for org ${org.id}:`, err)
        results.push({ orgId: org.id, error: String(err) })
      }
    }

    return NextResponse.json({ generated: results.length, results })
  } catch (err) {
    console.error("[reports/generate]", err)
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}

interface ReportData {
  orgName: string
  competitors: { name: string; domain: string; platform: string }[]
  priceChanges: { name: string | null; previousPrice: number | null; currentPrice: number | null; changePercent: number | null; currency: string }[]
}

async function generateGeminiReport(data: ReportData): Promise<{ summary: string; keyInsights: string; recommendations: string }> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error("GEMINI_API_KEY not set")

  const prompt = `Tu es un expert en stratégie tarifaire e-commerce. Analyse les données de veille concurrentielle suivantes et génère un rapport hebdomadaire pour ${data.orgName}.

CONCURRENTS SURVEILLÉS:
${data.competitors.map(c => `- ${c.name} (${c.domain}, plateforme: ${c.platform})`).join("\n")}

MOUVEMENTS DE PRIX CETTE SEMAINE (${data.priceChanges.length} changements):
${data.priceChanges.slice(0, 20).map(p =>
  `- ${p.name || "Produit"}: ${p.previousPrice ?? "?"}→${p.currentPrice ?? "?"}${p.currency} (${p.changePercent != null ? (p.changePercent > 0 ? "+" : "") + p.changePercent.toFixed(1) + "%" : "N/A"})`
).join("\n")}

Génère un rapport structuré avec:
1. RÉSUMÉ EXÉCUTIF (2-3 phrases): vue globale de la semaine
2. INSIGHTS CLÉS (liste bullet points): tendances importantes, patterns détectés
3. RECOMMANDATIONS ACTIONNABLES (liste bullet points): actions concrètes à prendre cette semaine

Réponds EN FRANÇAIS. Sois précis, actionnable et business-oriented. Pas de généralités.`

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }),
  })

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`)

  const json = await res.json()
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? ""

  // Parse sections
  const summaryMatch = text.match(/RÉSUMÉ EXÉCUTIF[:\s]*([\s\S]*?)(?=INSIGHTS CLÉS|$)/i)
  const insightsMatch = text.match(/INSIGHTS CLÉS[:\s]*([\s\S]*?)(?=RECOMMANDATIONS|$)/i)
  const recoMatch = text.match(/RECOMMANDATIONS[:\s]*([\s\S]*?)$/i)

  return {
    summary: summaryMatch?.[1]?.trim() ?? text.slice(0, 300),
    keyInsights: insightsMatch?.[1]?.trim() ?? "",
    recommendations: recoMatch?.[1]?.trim() ?? "",
  }
}
