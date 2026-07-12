import type { ScrapedPrice } from "./price"

interface GeminiPriceResult {
  url: string
  price: number | null
  inStock: boolean | null
}

// Last-resort fallback: ask Gemini to visit the page itself (via its URL context tool)
// and extract the price. Used for products the static scraper couldn't read —
// typically JS-rendered pages or layouts our selectors don't cover.
export async function scrapeUrlsWithGemini(urls: string[]): Promise<Map<string, ScrapedPrice>> {
  const results = new Map<string, ScrapedPrice>()
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || urls.length === 0) return results

  const BATCH_SIZE = 8
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE)
    try {
      const batchResults = await scrapeBatch(batch, apiKey)
      for (const r of batchResults) {
        if (r.price != null) {
          results.set(r.url, { price: r.price, currency: "EUR", inStock: r.inStock, name: null })
        }
      }
    } catch (err) {
      console.error("[gemini-fallback] batch failed:", err)
    }
  }

  return results
}

async function scrapeBatch(urls: string[], apiKey: string): Promise<GeminiPriceResult[]> {
  const prompt = `Tu es un outil d'extraction de prix e-commerce. Pour chacune des URLs ci-dessous, consulte la page produit et trouve le prix actuel affiché (en euros) et si le produit est en stock.

Réponds UNIQUEMENT avec un tableau JSON strict, sans texte autour, au format exact :
[{"url": "https://...", "price": 19.99, "inStock": true}, ...]

Si tu ne parviens pas à trouver le prix d'une URL, mets "price": null et "inStock": null pour cette entrée. N'invente jamais un prix.

URLs à analyser :
${urls.map((u) => `- ${u}`).join("\n")}`

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        tools: [{ url_context: {} }],
        generationConfig: { temperature: 0, maxOutputTokens: 2048 },
      }),
    }
  )

  if (!res.ok) {
    console.error(`[gemini-fallback] Gemini API error: ${res.status}`)
    return []
  }

  const json = await res.json()
  const text: string = json.candidates?.[0]?.content?.parts?.[0]?.text ?? ""

  const cleaned = text.replace(/```json\s*|```\s*/g, "").trim()
  const match = cleaned.match(/\[[\s\S]*\]/)
  if (!match) return []

  try {
    const parsed = JSON.parse(match[0])
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item) => item && typeof item.url === "string")
      .map((item) => ({
        url: item.url,
        price: typeof item.price === "number" ? item.price : null,
        inStock: typeof item.inStock === "boolean" ? item.inStock : null,
      }))
  } catch {
    return []
  }
}
