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

  const BATCH_SIZE = 5
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE)
    try {
      const batchResults = await scrapeBatch(batch, apiKey)
      for (const r of batchResults) {
        if (r.price != null) {
          results.set(r.url, { price: r.price, currency: "EUR", inStock: r.inStock, name: null, confidence: "low" })
        }
      }
    } catch (err) {
      console.error("[gemini-fallback] batch failed:", err)
    }
  }

  return results
}

async function scrapeBatch(urls: string[], apiKey: string): Promise<GeminiPriceResult[]> {
  const prompt = `Tu es un outil d'extraction de prix e-commerce très précis. Pour chacune des URLs ci-dessous, consulte le contenu réel de la page produit (HTML, balises meta, JSON-LD, microdata) et détermine :
1. Le prix de vente actuel affiché au client (pas un prix barré, pas un prix "avant réduction")
2. La devise
3. Si le produit est actuellement en stock / disponible à l'achat

Cherche activement dans : le texte visible de la page, les balises <meta property="product:price:amount">, les scripts JSON-LD de type Product/Offer, les attributs data-price, et tout élément dont la classe contient "price".

Convertis toujours le prix en nombre décimal avec un point (ex: 19.99, jamais "19,99" ni "19.99€").

Réponds UNIQUEMENT avec un tableau JSON strict, sans aucun texte autour, au format exact :
[{"url": "https://...", "price": 19.99, "inStock": true}, ...]

Si tu ne parviens vraiment pas à déterminer le prix d'une URL après avoir consulté la page, mets "price": null. N'invente JAMAIS un prix approximatif.

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
