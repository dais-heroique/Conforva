import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

async function callGemini(apiKey: string, prompt: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: "Tu es un expert en conformité réglementaire GPSR (règlement UE 2023/988). Tu génères des documents de conformité professionnels, précis et structurés en français. Réponds uniquement en JSON valide." }],
        },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          maxOutputTokens: 32768,
          temperature: 0.4,
        },
      }),
      signal: AbortSignal.timeout(120_000),
    }
  )
  if (!res.ok) throw new Error(`Gemini error ${res.status}`)
  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error("Empty Gemini response")
  return text
}

async function scrapeProduct(url: string) {
  // Try Shopify JSON
  const jsonUrl = url.replace(/\?.*$/, "") + ".json"
  const shopifyRes = await fetch(jsonUrl, {
    headers: { "User-Agent": "Mozilla/5.0" },
    signal: AbortSignal.timeout(5000),
  }).catch(() => null)

  if (shopifyRes?.ok) {
    const data = await shopifyRes.json().catch(() => null)
    if (data?.product) {
      const p = data.product
      return {
        name: p.title ?? "",
        description: p.body_html?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 1500) ?? "",
        category_hint: p.product_type ?? "",
        tags: Array.isArray(p.tags) ? p.tags.join(", ") : (p.tags ?? ""),
      }
    }
  }

  // HTML fallback
  const htmlRes = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" },
    signal: AbortSignal.timeout(8000),
  }).catch(() => null)

  if (!htmlRes?.ok) return null

  const html = await htmlRes.text()
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .replace(/\s{2,}/g, " ").trim()

  const getMeta = (prop: string) =>
    html.match(new RegExp(`<meta[^>]*(?:property|name)=["']${prop}["'][^>]*content=["']([^"']+)["']`, "i"))?.[1]?.trim()
    ?? html.match(new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["']${prop}["']`, "i"))?.[1]?.trim()
    ?? ""

  return {
    name: getMeta("og:title") || html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1]?.trim() || "",
    description: (getMeta("og:description") || clean.slice(0, 1500)),
    category_hint: "",
    tags: "",
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "Service IA non configuré" }, { status: 503 })
  }

  const { email, product_url, product_name, supplier_name, category } = await req.json()

  if (!email) return NextResponse.json({ error: "Email requis" }, { status: 400 })

  const svc = await createServiceClient()

  // Check 1-per-email limit
  const { data: existing } = await svc
    .from("free_audits")
    .select("id, score, product_name, created_at, answers")
    .eq("email", email.toLowerCase().trim())
    .single()

  if (existing) {
    const docs = (existing.answers as any)?.generated_docs
    return NextResponse.json({
      already_used: true,
      previous: {
        product_name: existing.product_name,
        score: existing.score,
        created_at: existing.created_at,
        docs: docs ?? null,
      },
    })
  }

  // Scrape product if URL provided
  let scraped: { name: string; description: string; category_hint: string; tags: string } | null = null
  if (product_url) {
    scraped = await scrapeProduct(product_url).catch(() => null)
  }

  const name = scraped?.name || product_name || "Produit"
  const description = scraped?.description || ""
  const categoryHint = scraped?.category_hint || category || ""

  // Build AI prompt
  const prompt = `Génère un dossier de conformité GPSR complet pour ce produit.

PRODUIT: ${name}
FOURNISSEUR: ${supplier_name || "Non précisé"}
CATÉGORIE: ${categoryHint}
DESCRIPTION: ${description.slice(0, 1000)}
URL: ${product_url || "Non fournie"}

Génère un JSON avec cette structure exacte:
{
  "product_info": {
    "name": "nom exact du produit",
    "category": "catégorie GPSR précise",
    "intended_use": "usage prévu en 2-3 phrases",
    "target_users": "utilisateurs cibles",
    "manufacturer": "${supplier_name || 'À compléter'}",
    "country_of_origin": "pays supposé de fabrication",
    "model_reference": "référence modèle si connue"
  },
  "score": <nombre entre 0 et 100 représentant la conformité estimée basée sur les infos disponibles>,
  "technical_file": {
    "sections": [
      {
        "title": "1. Description et identification du produit",
        "content": "contenu détaillé..."
      },
      {
        "title": "2. Caractéristiques essentielles de sécurité",
        "content": "contenu détaillé..."
      },
      {
        "title": "3. Réglementations et normes applicables",
        "content": "liste des directives et normes EN applicables avec justification..."
      },
      {
        "title": "4. Analyse des risques",
        "content": "identification des dangers, évaluation probabilité/gravité..."
      },
      {
        "title": "5. Mesures de sécurité mises en œuvre",
        "content": "mesures techniques, organisationnelles, informations utilisateur..."
      },
      {
        "title": "6. Tests et évaluations",
        "content": "tests recommandés et leur statut..."
      },
      {
        "title": "7. Étiquetage et instructions",
        "content": "exigences d'étiquetage, avertissements requis, langues..."
      },
      {
        "title": "8. Traçabilité et surveillance post-marché",
        "content": "plan de surveillance, gestion des incidents, rappels..."
      }
    ]
  },
  "risk_assessment": {
    "methodology": "ISO 12100:2010 — Principes généraux de conception",
    "hazards": [
      {
        "id": "H1",
        "category": "catégorie de danger",
        "description": "description précise du danger",
        "probability": "Faible|Modérée|Élevée",
        "severity": "Mineure|Modérée|Grave|Critique",
        "risk_level": "Acceptable|Tolérable|Inacceptable",
        "mitigation": "mesure de réduction du risque"
      }
    ],
    "conclusion": "conclusion globale de l'évaluation des risques"
  },
  "declaration": {
    "product_name": "nom officiel",
    "model": "référence",
    "directives": ["liste des directives UE applicables"],
    "standards": ["liste des normes EN harmonisées"],
    "statement": "Nous déclarons sous notre seule responsabilité que le produit décrit ci-dessus est conforme aux exigences essentielles...",
    "place": "Lieu de signature",
    "responsible_person": "Personne responsable EU désignée"
  },
  "missing_actions": [
    "action prioritaire 1 à accomplir",
    "action prioritaire 2",
    "action prioritaire 3"
  ]
}`

  let aiResult: any
  try {
    const raw = await callGemini(process.env.GEMINI_API_KEY!, prompt)
    aiResult = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: "Erreur lors de la génération IA. Réessayez." }, { status: 500 })
  }

  const score = typeof aiResult.score === "number" ? Math.min(100, Math.max(0, aiResult.score)) : 50

  // Save to DB
  await svc.from("free_audits").insert({
    email: email.toLowerCase().trim(),
    product_name: name,
    product_url: product_url || null,
    category: aiResult.product_info?.category || categoryHint,
    score,
    missing_docs: aiResult.missing_actions ?? [],
    answers: { generated_docs: aiResult, supplier_name },
  })

  return NextResponse.json({ ok: true, result: aiResult, score })
}
