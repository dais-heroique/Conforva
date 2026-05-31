import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import OpenAI from "openai"

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return new Response("Not configured", { status: 503 })
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return new Response("Unauthorized", { status: 401 })

  const { messages, productContext } = await req.json()

  const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  })

  const systemPrompt = `Tu es un expert en conformité réglementaire internationale, spécialisé dans :
- GPSR (EU) 2023/988 — Règlement général sur la sécurité des produits (applicable depuis décembre 2024)
- Marquage CE et directives européennes associées (LVD, RED, MDR, etc.)
- CPSC (USA) — Consumer Product Safety Commission
- CCC (Chine) — Certification obligatoire chinoise
- UKCA (Royaume-Uni) — UK Conformity Assessed
- ISO/IEC, normes harmonisées et exigences de documentation technique

Règles de comportement :
- Tu réponds en français par défaut, sauf si la question est posée en anglais (dans ce cas tu réponds en anglais)
- Tu es concis et professionnel : moins de 150 mots sauf si la question est complexe et nécessite plus de détails
- Tu donnes des recommandations concrètes et actionnables, avec des étapes claires si pertinent
- Tu cites les réglementations et articles applicables quand c'est utile
- Tu n'émets jamais de garantie juridique et rappelles que tes réponses ne constituent pas un avis juridique contraignant
- Tu identifies rapidement si un produit est dans le scope d'une réglementation particulière
- Pour les questions sur le GPSR, tu mentionnes l'obligation de Personne Responsable EU si pertinent
- Tu utilises des listes à puces pour les étapes ou exigences multiples, pour une meilleure lisibilité`

  const stream = await openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    stream: true,
    max_tokens: 600,
    messages: [
      {
        role: "system",
        content:
          systemPrompt +
          (productContext
            ? `\n\nCONTEXTE PRODUIT ACTUEL:\n${productContext}`
            : ""),
      },
      ...messages,
    ],
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? ""
          if (text) controller.enqueue(encoder.encode(text))
        }
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
