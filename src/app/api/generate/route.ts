import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import OpenAI from "openai"

const OPENROUTER_MODEL = "moonshotai/kimi-k2:free"

export async function POST(req: NextRequest) {
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json({ error: "AI generation not configured" }, { status: 503 })
  }
  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "https://conforva.com",
      "X-Title": "Conforva",
    },
  })
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { productId } = await req.json()
  if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 })

  // Load product with all related data
  const { data: product, error: pErr } = await supabase
    .from("products")
    .select(`*, product_categories(*)`)
    .eq("id", productId)
    .single()
  if (pErr || !product) return NextResponse.json({ error: "Product not found" }, { status: 404 })

  const { data: qr } = await supabase
    .from("questionnaire_responses")
    .select("answers")
    .eq("product_id", productId)
    .single()

  const { data: standards } = await supabase
    .from("standards")
    .select("code, title, summary, requirements")
    .or(`category_id.eq.${product.category_id},category_id.is.null`)
    .limit(10)

  const { data: org } = await supabase
    .from("organizations")
    .select("name, country")
    .eq("owner_id", user.id)
    .single()

  const category = (product as any).product_categories
  const standardsText = standards?.map(s =>
    `Norme ${s.code} — ${s.title}: ${s.summary}\nExigences: ${JSON.stringify(s.requirements)}`
  ).join("\n\n") ?? "Règlement GPSR 2023/988 applicable"

  const systemPrompt = `Tu es un expert en conformité réglementaire européenne, spécialisé dans le Règlement GPSR (UE 2023/988).
Tu génères des analyses de risque et dossiers techniques professionnels pour des e-commerçants.

IMPORTANT:
- Tu fournis une AIDE à la conformité, jamais une garantie juridique
- Tu bases ton analyse sur les normes européennes applicables
- Tu génères des sorties JSON structurées et précises
- Tu es rigoureux, professionnel, et complet`

  const userPrompt = `Génère une analyse de risque GPSR complète pour ce produit.

PRODUIT:
- Nom: ${product.name}
- Référence: ${product.reference ?? "N/A"}
- Catégorie: ${category?.name_fr ?? "Divers"} (${category?.code ?? "other"})
- Usage prévu: ${product.intended_use ?? "Non spécifié"}
- Matériaux: ${product.materials?.join(", ") ?? "Non spécifiés"}
- Poids: ${product.weight_g ? `${product.weight_g}g` : "Non spécifié"}
- Marchés: ${product.target_markets?.join(", ") ?? "EU"}
- Organisation: ${org?.name ?? "Non spécifiée"} (${org?.country ?? "EU"})

RÉPONSES QUESTIONNAIRE:
${JSON.stringify(qr?.answers ?? {}, null, 2)}

NORMES APPLICABLES:
${standardsText}

Génère une réponse JSON avec exactement cette structure:
{
  "summary": "Résumé exécutif de l'analyse (2-3 phrases)",
  "overall_severity": "low|medium|high|critical",
  "hazards": [
    {
      "id": "H1",
      "type": "physical|chemical|biological|ergonomic|electrical|thermal|other",
      "title": "Titre court du danger",
      "description": "Description détaillée du danger identifié",
      "severity": "low|medium|high|critical",
      "probability": "low|medium|high",
      "affected_users": ["enfants", "adultes", "etc"],
      "referenced_standards": ["EN XXXXX", "GPSR Art. X"]
    }
  ],
  "mitigation_measures": [
    {
      "hazard_id": "H1",
      "measure": "Description de la mesure de prévention/mitigation",
      "type": "design|warning|packaging|labeling|restriction",
      "priority": "mandatory|recommended",
      "norm_reference": "Norme ou article applicable"
    }
  ],
  "referenced_standards": ["liste des normes citées"],
  "required_tests": ["liste des tests à réaliser"],
  "labeling_requirements": {
    "fr": ["mention 1", "mention 2"],
    "en": ["mention 1", "mention 2"],
    "de": ["mention 1", "mention 2"],
    "it": ["mention 1", "mention 2"],
    "es": ["mention 1", "mention 2"]
  },
  "pictograms": ["liste des pictogrammes requis (ex: CE, flame, skull)"],
  "responsible_person_required": true,
  "declaration_of_conformity_required": true,
  "technical_file_sections": [
    {
      "section": "1. Description du produit",
      "content": "Contenu détaillé de la section"
    }
  ],
  "disclaimer": "Ce document est une aide à la conformité. Une validation par un expert juridique ou un organisme notifié est indispensable avant toute mise sur le marché EU."
}`

  try {
    const response = await openai.chat.completions.create({
      model: OPENROUTER_MODEL,
      max_tokens: 4096,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    })

    const text = response.choices[0]?.message?.content
    if (!text) throw new Error("Empty response from AI")

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error("No JSON in response")

    const analysisData = JSON.parse(jsonMatch[0])

    // Get existing version count
    const { count } = await supabase
      .from("risk_assessments")
      .select("id", { count: "exact" })
      .eq("product_id", productId)

    const version = (count ?? 0) + 1

    const { data: ra, error: raErr } = await supabase
      .from("risk_assessments")
      .insert({
        product_id: productId,
        version,
        hazards: analysisData.hazards ?? [],
        severity: analysisData.overall_severity ?? "medium",
        mitigation: analysisData.mitigation_measures ?? [],
        referenced_standards: analysisData.referenced_standards ?? [],
        status: "draft",
        validated_by_human: false,
        ai_model: OPENROUTER_MODEL,
        content_json: analysisData,
      })
      .select()
      .single()

    if (raErr) throw raErr

    // Create technical file stub
    await supabase.from("technical_files").insert({
      product_id: productId,
      version,
      content_json: {
        sections: analysisData.technical_file_sections ?? [],
        analysis: analysisData,
        product: { name: product.name, reference: product.reference, category: category?.name_fr },
      },
      status: "draft",
      watermarked: true,
    })

    // Create labels for each language
    const langs = ["fr", "en", "de", "it", "es"] as const
    for (const lang of langs) {
      await supabase.from("labels").upsert({
        product_id: productId,
        language: lang,
        content: {
          product_name: product.name,
          reference: product.reference,
          warnings: analysisData.labeling_requirements?.[lang] ?? [],
          manufacturer: org?.name,
        },
        pictograms: analysisData.pictograms ?? [],
        warnings: analysisData.labeling_requirements?.[lang] ?? [],
        clp_mentions: [],
      }, { onConflict: "product_id,language" })
    }

    // Update compliance score
    await supabase.rpc("update_compliance_score", { p_product_id: productId })

    // Audit log
    const { data: orgData } = await supabase.from("organizations").select("id").eq("owner_id", user.id).single()
    if (orgData) {
      await supabase.from("audit_log").insert({
        org_id: orgData.id,
        user_id: user.id,
        action: "generate_risk_assessment",
        entity_type: "risk_assessment",
        entity_id: ra.id,
        details: { product_id: productId, version, severity: ra.severity },
      })
    }

    return NextResponse.json({ success: true, riskAssessmentId: ra.id, data: analysisData })
  } catch (err) {
    console.error("Generation error:", err)
    return NextResponse.json({ error: "Generation failed", details: String(err) }, { status: 500 })
  }
}
