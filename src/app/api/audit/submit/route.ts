import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

const REQUIRED_DOCS: Record<string, string[]> = {
  electronics: ["Dossier technique", "Analyse de risques ISO 12100", "Déclaration de conformité UE (DoC)", "Marquage CE", "Notice d'utilisation (FR+EN min.)", "Personne responsable EU"],
  toy: ["Dossier technique", "Analyse de risques (EN 71)", "Tests EN 71-1/2/3 laboratoire accrédité", "Déclaration de conformité UE", "Marquage CE + avertissements âge", "Personne responsable EU"],
  candle: ["Dossier technique", "Fiche de données de sécurité (FDS/SDS)", "Analyse allergènes SCCS", "Avertissements CLP sur emballage", "Conformité IFRA", "Personne responsable EU"],
  cosmetic: ["Dossier technique", "Rapport de sécurité cosmétique (CPSR)", "Notification CPNP", "Test d'efficacité du conservateur (PET)", "Liste INCI sur étiquette", "Personne responsable EU"],
  textile: ["Dossier technique", "Attestation composition fibres (EU 1007/2011)", "Conformité REACH / azo dyes", "Test inflammabilité (si enfants)", "Étiquetage entretien ISO 3758", "Personne responsable EU"],
  puericulture: ["Dossier technique", "Tests EN normes applicables (labo accrédité)", "Analyse risques piégeage / stabilité", "Déclaration de conformité UE", "Marquage CE + avertissements", "Personne responsable EU"],
  decoration: ["Dossier technique", "Conformité REACH (substances SVHC)", "Analyse risques (bords, chute, chimie)", "Notice montage si applicable", "Traçabilité / n° de lot", "Personne responsable EU"],
  food_contact: ["Dossier technique", "Déclaration conformité matériaux (EU 1935/2004)", "Test migration globale / spécifique", "Symbole verre-fourchette sur produit", "Marquages température", "Personne responsable EU"],
  furniture: ["Dossier technique", "Tests stabilité + résistance charge", "Conformité REACH + émissions formaldéhyde", "Notice de montage (FR+EN min.)", "Traçabilité / n° de lot", "Personne responsable EU"],
  sport: ["Dossier technique", "Tests normes applicables (labo accrédité)", "Déclaration de conformité UE (si EPI)", "Marquage CE (obligatoire EPI)", "Notice d'utilisation + durée de vie", "Personne responsable EU"],
  other: ["Dossier technique", "Analyse de risques", "Déclaration de conformité UE", "Étiquetage réglementaire", "Traçabilité / n° de lot", "Personne responsable EU"],
}

const CATEGORY_RISK: Record<string, number> = {
  toy: 30, puericulture: 28, electronics: 25, cosmetic: 22, candle: 18,
  food_contact: 20, sport: 18, textile: 12, furniture: 12, decoration: 10, other: 15,
}

function computeScore(category: string, answers: Record<string, unknown>): { score: number; missing: string[] } {
  const required = REQUIRED_DOCS[category] ?? REQUIRED_DOCS.other
  const docs = (answers.existing_docs as string[]) ?? []

  const has = {
    technical: docs.includes("technical"),
    risk: docs.includes("risk"),
    declaration: docs.includes("declaration"),
    ce: docs.includes("ce"),
    instructions: docs.includes("instructions"),
    responsible: docs.includes("responsible"),
    labels: docs.includes("labels"),
    tests: docs.includes("tests"),
  }

  const missing: string[] = []
  if (!has.technical) missing.push(required[0])
  if (!has.risk) missing.push(required[1])
  if (!has.tests && required[2]?.includes("lab")) missing.push(required[2])
  if (!has.declaration) missing.push(required[2] ?? "Déclaration de conformité UE")
  if (!has.ce && ["electronics","toy","puericulture","sport"].includes(category)) missing.push("Marquage CE")
  if (!has.instructions) missing.push("Notice / instructions (langue UE)")
  if (!has.responsible) missing.push("Personne responsable EU")

  const baseRisk = CATEGORY_RISK[category] ?? 15
  let score = 100 - baseRisk
  const docPenalty = Math.min(60, missing.length * 12)
  score = Math.max(0, score - docPenalty)

  // Boost for good answers
  if (has.tests) score = Math.min(100, score + 10)
  if ((answers.lab_test_done as boolean) === true) score = Math.min(100, score + 8)

  return { score: Math.round(score), missing: [...new Set(missing)] }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, product_name, product_url, category, answers } = body

  if (!email || !product_name || !category) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
  }

  const svc = await createServiceClient()

  // Check if email already used
  const { data: existing } = await svc
    .from("free_audits")
    .select("id, score, missing_docs, product_name, created_at")
    .eq("email", email.toLowerCase().trim())
    .single()

  if (existing) {
    return NextResponse.json({
      already_used: true,
      previous: {
        product_name: existing.product_name,
        score: existing.score,
        created_at: existing.created_at,
      },
    }, { status: 200 })
  }

  const { score, missing } = computeScore(category, answers ?? {})

  await svc.from("free_audits").insert({
    email: email.toLowerCase().trim(),
    product_name,
    product_url: product_url || null,
    category,
    answers,
    score,
    missing_docs: missing,
  })

  return NextResponse.json({ score, missing, category })
}
