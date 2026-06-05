import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import OpenAI from "openai"
import { PLAN_LANGUAGES } from "@/lib/utils"

const GROQ_MODELS = [
  "qwen3-32b",
  "meta-llama/llama-4-scout-17b-16e-instruct",
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
]

/** Strip HTML tags and collapse whitespace, return first maxChars chars */
async function fetchProductPageText(url: string, maxChars = 3000): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Conforva/1.0)" },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return ""
    const html = await res.text()
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\s{2,}/g, " ")
      .trim()
    return text.slice(0, maxChars)
  } catch {
    return ""
  }
}

/** Determine which target markets are active from the product's target_markets array */
function detectMarkets(targetMarkets: string[] | null | undefined): {
  eu: boolean
  us: boolean
  cn: boolean
  gb: boolean
  ca: boolean
  jp: boolean
  au: boolean
} {
  const m = (targetMarkets ?? ["EU"]).map((s) => s.toUpperCase())
  return {
    eu: m.some((x) => ["EU", "EEA", "EUROPE", "FR", "DE", "IT", "ES", "NL", "BE", "PL"].includes(x)),
    us: m.some((x) => ["US", "USA", "UNITED STATES", "AMERICA"].includes(x)),
    cn: m.some((x) => ["CN", "CHINA", "CHINE", "CHN"].includes(x)),
    gb: m.some((x) => ["GB", "UK", "UNITED KINGDOM", "GRANDE-BRETAGNE"].includes(x)),
    ca: m.some((x) => ["CA", "CANADA"].includes(x)),
    jp: m.some((x) => ["JP", "JAPAN", "JAPON"].includes(x)),
    au: m.some((x) => ["AU", "AUSTRALIA", "AUSTRALIE"].includes(x)),
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: "AI generation not configured" }, { status: 503 })
  }
  const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  })
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Fetch user plan to enforce language limits
  const { data: userData } = await supabase
    .from("users")
    .select("plan, subscription_status, subscription_period_end")
    .eq("id", user.id)
    .single()

  const planStatus = userData?.subscription_status
  const periodEnd = userData?.subscription_period_end
  // Keep paid plan if active/trialing/past_due and period hasn't expired
  const planIsActive =
    planStatus == null ||
    planStatus === "active" ||
    planStatus === "trialing" ||
    (planStatus === "past_due" && periodEnd != null && new Date(periodEnd) > new Date())
  const effectivePlan = (planIsActive ? (userData?.plan ?? "free") : "free") as string
  const allowedLangs = PLAN_LANGUAGES[effectivePlan] ?? ["fr", "en"]

  const body = await req.json()
  const { productId, languages } = body as { productId: string; languages?: string[] }
  if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 })
  const requested = languages && languages.length > 0 ? languages : ["fr", "en"]
  const requestedLanguages = requested.filter(l => (allowedLangs as readonly string[]).includes(l))
  if (requestedLanguages.length === 0) requestedLanguages.push("fr")

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

  // Fetch product page if URL provided
  const productUrl = (product as any).product_url as string | null
  const webContent = productUrl ? await fetchProductPageText(productUrl) : ""

  // Extract BOM from questionnaire answers
  const bomComponents: Array<{ component: string; material: string; supplier: string; part_number: string }> =
    (qr?.answers as any)?.bom_components ?? []

  const category = (product as any).product_categories
  const standardsText = standards?.map(s =>
    `Norme ${s.code} — ${s.title}: ${s.summary}\nExigences: ${JSON.stringify(s.requirements)}`
  ).join("\n\n") ?? "Règlement GPSR 2023/988 applicable"

  const markets = detectMarkets((product as any).target_markets)
  const activeMarkets = Object.entries(markets)
    .filter(([, v]) => v)
    .map(([k]) => k.toUpperCase())
    .join(", ")

  // Build a human-readable market requirements block to guide the AI
  const marketGuidance = [
    markets.eu ? "- UE: Règlement GPSR UE 2023/988, marquage CE, normes harmonisées CEN/CENELEC, REACH (règlement 1907/2006), RoHS (2011/65/UE), CLP (règlement 1272/2008), Personne Responsable obligatoire pour importateurs hors UE" : null,
    markets.us ? "- USA: Consumer Product Safety Act (15 U.S.C. §2051), CPSC regulations, UL standards, ASTM International, California Proposition 65 (Safe Drinking Water and Toxic Enforcement Act of 1986), Federal Hazardous Substances Act (FHSA), FCC Part 15 si produit électronique, CPSIA si produit pour enfants" : null,
    markets.cn ? "- CHINE: Normes nationales GB, Certification CCC (China Compulsory Certification) pour catégories obligatoires, SAMR (State Administration for Market Regulation), CNCA, normes GB/T et GB/Z applicables" : null,
    markets.gb ? "- ROYAUME-UNI: UK Product Safety and Metrology Bill (PSMB), marquage UKCA (en remplacement du CE post-Brexit), Personne Responsable UK obligatoire, normes BS EN, OPSS (Office for Product Safety and Standards)" : null,
    markets.ca ? "- CANADA: Loi canadienne sur la sécurité des produits de consommation (LCSPC / CCPSA), Santé Canada, normes CSA, étiquetage bilingue français/anglais obligatoire" : null,
    markets.jp ? "- JAPON: Marque PSE (Product Safety Electrical Appliance & Material), réglementations METI (Ministry of Economy Trade and Industry), Loi sur la sécurité des appareils ménagers électriques (DENAN), normes JIS" : null,
    markets.au ? "- AUSTRALIE / NZ: ACCC (Australian Competition and Consumer Commission), Australian Consumer Law, normes AS/NZS, RCM mark (Regulatory Compliance Mark) pour produits électriques, ACMA pour produits radiofréquences" : null,
  ].filter(Boolean).join("\n")

  const systemPrompt = `Tu es un expert senior en conformité réglementaire internationale et sécurité des produits de consommation, avec plus de 20 ans d'expérience couvrant l'Union Européenne (GPSR, REACH, RoHS, CLP, directives sectorielles), les États-Unis (CPSC, FHSA, FCC, CPSIA), la Chine (CCC, GB standards, SAMR), le Royaume-Uni (UKCA, PSMB), le Canada (CCPSA), le Japon (PSE, METI) et l'Australie (ACCC, AS/NZS).

Tu génères des analyses de risque et des dossiers techniques professionnels destinés à des fabricants, importateurs et e-commerçants souhaitant mettre leurs produits sur le marché en toute conformité réglementaire.

TES PRINCIPES FONDAMENTAUX:
1. Tu analyses systématiquement les dangers selon la méthodologie ISO 12100:2010 (estimation et évaluation des risques) et les exigences de l'Annexe III du règlement GPSR UE 2023/988
2. Tu identifies tous les marchés cibles et adaptes précisément tes recommandations à chaque réglementation nationale ou régionale
3. Tu cites les normes, articles réglementaires et standards techniques pertinents avec leurs références exactes
4. Tu fournis des recommandations concrètes, actionnables et hiérarchisées par priorité
5. Tu génères des sorties JSON parfaitement structurées, sans troncature, sans commentaire hors JSON
6. Tu fournis toujours une aide à la conformité, jamais une garantie juridique absolue — tu le rappelles en disclaimer
7. Ton analyse est exhaustive, professionnelle, et immédiatement exploitable par un responsable conformité ou un organisme notifié`

  const userPrompt = `Génère une analyse de risque et un dossier technique international complets pour ce produit. Couvre TOUS les marchés détectés avec leurs exigences spécifiques.

=== DONNÉES PRODUIT ===
- Nom: ${product.name}
- Référence / SKU: ${product.reference ?? "N/A"}
- Catégorie: ${category?.name_fr ?? "Divers"} (code: ${category?.code ?? "other"})
- Usage prévu: ${product.intended_use ?? "Non spécifié"}
- Matériaux / Composants: ${(product as any).materials?.join(", ") ?? "Non spécifiés"}

${bomComponents.length > 0 ? `=== NOMENCLATURE (BOM) — LISTE DES COMPOSANTS ===
${bomComponents.map((c, i) => `${i + 1}. Composant: "${c.component}" | Matériau: ${c.material || "N/A"} | Fournisseur: ${c.supplier || "N/A"} | Réf. pièce: ${c.part_number || "N/A"}`).join("\n")}

Utilise cette nomenclature pour l'évaluation REACH/RoHS (substances dans les matériaux listés) et pour identifier les dangers spécifiques à chaque composant.
` : ""}
- Poids: ${(product as any).weight_g ? `${(product as any).weight_g}g` : "Non spécifié"}
- Marchés cibles: ${(product as any).target_markets?.join(", ") ?? "EU"} — Marchés actifs détectés: ${activeMarkets}
- Organisation fabricant/importateur: ${org?.name ?? "Non spécifiée"} (pays: ${org?.country ?? "EU"})
${productUrl ? `- URL page produit: ${productUrl}` : ""}

=== EXIGENCES PAR MARCHÉ DÉTECTÉ ===
${marketGuidance || "- UE: GPSR UE 2023/988 applicable par défaut"}

=== RÉPONSES QUESTIONNAIRE DE CONFORMITÉ ===
${JSON.stringify(qr?.answers ?? {}, null, 2)}

=== NORMES SECTORIELLES APPLICABLES (BASE DE DONNÉES) ===
${standardsText}

${webContent ? `=== CONTENU DE LA PAGE PRODUIT (extrait web scraping) ===
${webContent}

` : ""}=== INSTRUCTIONS DE GÉNÉRATION ===
Analyse exhaustivement ce produit selon TOUTES les réglementations des marchés détectés. Identifie au minimum 3 à 6 dangers distincts pertinents pour ce type de produit. Pour chaque danger, applique la méthodologie d'évaluation des risques ISO 12100:2010. Fournis des mesures de mitigation concrètes et hiérarchisées. Génère les sections du dossier technique avec un contenu substantiel (2 à 4 paragraphes par section), pas des placeholders vides.

Retourne UNIQUEMENT le JSON suivant, sans aucun texte avant ou après, sans balises markdown, sans commentaires:

{
  "summary": "Résumé exécutif (3-4 phrases, professionnel)",
  "overall_severity": "low|medium|high|critical",
  "risk_assessment_methodology": "Description de la méthodologie utilisée (ex: ISO 12100:2010, GPSR Annex III)",
  "product_description": {
    "general": "Description technique complète du produit",
    "intended_use": "Usage normal prévu",
    "foreseeable_misuse": ["Usage anormal prévisible 1", "..."],
    "target_users": ["adultes", "enfants", "professionnels", "etc"],
    "age_restrictions": "Ex: Non adapté aux moins de 3 ans / Pas de restriction",
    "distribution_form": "Ex: Vente en ligne, emballage individuel",
    "technical_specifications": "Caractéristiques techniques principales"
  },
  "hazards": [
    {
      "id": "H1",
      "type": "physical|chemical|biological|ergonomic|electrical|thermal|other",
      "title": "Titre court",
      "description": "Description détaillée incluant mécanisme de danger",
      "severity": "low|medium|high|critical",
      "severity_justification": "Justification du niveau de gravité",
      "probability": "low|medium|high",
      "probability_justification": "Justification de la probabilité",
      "risk_level": "acceptable|tolerable|unacceptable",
      "affected_users": ["..."],
      "exposure_conditions": "Conditions d'exposition au danger",
      "referenced_standards": ["EN XXXXX", "GPSR Art. X"]
    }
  ],
  "mitigation_measures": [
    {
      "hazard_id": "H1",
      "measure": "Description précise de la mesure",
      "type": "design|protection|information|warning|packaging|labeling|restriction",
      "priority": "mandatory|recommended",
      "norm_reference": "Norme ou article applicable",
      "implementation_details": "Comment implémenter concrètement"
    }
  ],
  "residual_risks": [
    {
      "hazard_id": "H1",
      "description": "Risque résiduel après mesures",
      "acceptability": "acceptable|to_monitor"
    }
  ],
  "market_specific_requirements": {
    "EU": {
      "applicable": ${markets.eu},
      "regulation": "Règlement GPSR UE 2023/988",
      "ce_marking_required": true,
      "responsible_person_required": true,
      "declaration_of_conformity_required": true,
      "harmonized_standards": ["Liste des normes harmonisées applicables"],
      "specific_requirements": ["Exigence spécifique 1", "..."],
      "labeling_mandatory_elements": ["Éléments obligatoires sur l'étiquette EU"]
    },
    "US": {
      "applicable": ${markets.us},
      "regulation": "CPSC / 15 U.S.C. §2051",
      "certifications_required": ["UL", "ASTM", "FCC si applicable"],
      "california_prop65_warning_required": false,
      "specific_requirements": ["..."],
      "labeling_requirements": ["..."]
    },
    "CN": {
      "applicable": ${markets.cn},
      "regulation": "GB Standards / SAMR / CNCA",
      "ccc_required": false,
      "applicable_gb_standards": ["GB XXXXX"],
      "specific_requirements": ["..."]
    },
    "GB": {
      "applicable": ${markets.gb},
      "regulation": "UK Product Safety and Metrology Bill / UKCA",
      "ukca_marking_required": false,
      "specific_requirements": ["..."]
    },
    "CA": {
      "applicable": ${markets.ca},
      "regulation": "Loi canadienne sur la sécurité des produits de consommation (LCSPC/CCPSA)",
      "bilingual_labeling_required": true,
      "specific_requirements": ["..."]
    },
    "JP": {
      "applicable": ${markets.jp},
      "regulation": "PSE Mark / METI / DENAN Law",
      "pse_mark_required": false,
      "applicable_jis_standards": ["JIS XXXXX"],
      "specific_requirements": ["..."]
    },
    "AU": {
      "applicable": ${markets.au},
      "regulation": "Australian Consumer Law / ACCC / AS-NZS standards",
      "rcm_mark_required": false,
      "specific_requirements": ["..."]
    }
  },
  "referenced_standards": ["Liste complète des normes citées dans l'analyse"],
  "required_tests": [
    {
      "test": "Nom du test",
      "standard": "Norme de référence",
      "mandatory": true,
      "laboratory_accreditation": "ISO 17025 recommandé"
    }
  ],
  "reach_svhc_assessment": "Évaluation REACH substances préoccupantes (SVHC) — pertinence et liste de substances à vérifier",
  "rohs_applicable": false,
  "rohs_assessment": "Évaluation RoHS si applicable (restrictions substances dangereuses dans équipements électriques)",
  "packaging_requirements": ["Exigence emballage 1", "Directive 94/62/CE si UE", "..."],
  "traceability_requirements": {
    "batch_number_required": true,
    "serial_number_required": false,
    "qr_code_recommended": true,
    "minimum_retention_years": 10
  },
  "declaration_of_conformity_content": {
    "product_description": "Description complète du produit pour la Déclaration de Conformité",
    "applicable_regulations": ["GPSR UE 2023/988", "..."],
    "standards_complied": ["EN XXXXX:XXXX", "..."],
    "assessment_procedure": "Description de la procédure d'évaluation de la conformité suivie",
    "additional_information": "Informations complémentaires à mentionner dans la DoC"
  },
  "labeling_requirements": {
    "fr": ["Mention obligatoire FR 1", "..."],
    "en": ["Mandatory mention EN 1", "..."],
    "de": ["Pflichtangabe DE 1", "..."],
    "it": ["Menzione obbligatoria IT 1", "..."],
    "es": ["Mención obligatoria ES 1", "..."],
    "zh": ["强制说明 ZH 1", "..."],
    "ja": ["必須表示 JA 1", "..."]
  },
  "pictograms": ["CE", "WEEE si applicable", "flamme", "etc"],
  "instructions_for_use": {
    "fr": ["Instruction d'utilisation FR 1", "..."],
    "en": ["Instruction for use EN 1", "..."]
  },
  "technical_file_sections": [
    {
      "section": "1. Description générale du produit",
      "content": "Description technique complète et détaillée du produit, incluant sa nature, ses composants principaux, ses caractéristiques dimensionnelles et physiques, et son positionnement commercial. Cette section constitue la base d'identification du produit dans le dossier technique."
    },
    {
      "section": "2. Usage prévu et utilisation prévisible abusive",
      "content": "Définition précise de l'usage normal du produit tel que prévu par le fabricant, accompagnée d'une analyse des utilisations abusives prévisibles susceptibles d'engendrer des dangers. Inclut l'identification des groupes d'utilisateurs vulnérables (enfants, personnes âgées, personnes handicapées) conformément à l'Article 6 du GPSR UE 2023/988."
    },
    {
      "section": "3. Fabricant et chaîne d'approvisionnement",
      "content": "Identification complète du fabricant ou de l'importateur responsable de la mise sur le marché, incluant coordonnées, pays d'établissement et rôle dans la chaîne d'approvisionnement. Conformément à l'Article 10 du GPSR, les importateurs établis hors UE doivent désigner une Personne Responsable établie dans l'Union Européenne."
    },
    {
      "section": "4. Normes et réglementations applicables",
      "content": "Liste exhaustive des réglementations, directives et normes harmonisées applicables au produit pour chaque marché cible, avec justification de leur applicabilité. Inclut les normes européennes EN, les standards ISO/IEC, et les réglementations nationales des marchés détectés (CPSC/US, GB standards/CN, BS EN/UK, etc.)."
    },
    {
      "section": "5. Évaluation des risques — Méthodologie",
      "content": "Description de la méthodologie d'évaluation des risques appliquée, basée sur ISO 12100:2010 (principes généraux de conception — appréciation et réduction du risque) et l'Annexe III du Règlement GPSR UE 2023/988. L'évaluation prend en compte la gravité du dommage potentiel, la probabilité d'occurrence et la population exposée, aboutissant à un niveau de risque global."
    },
    {
      "section": "6. Évaluation des risques — Résultats",
      "content": "Présentation synthétique de l'ensemble des dangers identifiés, avec leur cotation (gravité × probabilité) et leur niveau de risque résultant (acceptable, tolérable, inacceptable). Chaque danger est référencé par un identifiant unique (H1, H2, etc.) permettant la traçabilité avec les mesures de mitigation."
    },
    {
      "section": "7. Mesures de réduction des risques",
      "content": "Description détaillée de l'ensemble des mesures de maîtrise des risques retenues, classées selon la hiérarchie de prévention ISO 12100: (1) mesures de conception intrinsèquement sûre, (2) protections et dispositifs de protection, (3) informations pour l'utilisation. Chaque mesure est associée au danger qu'elle traite et à sa priorité de mise en œuvre."
    },
    {
      "section": "8. Risques résiduels",
      "content": "Identification et évaluation des risques résiduels subsistant après application de toutes les mesures de maîtrise. Ces risques, jugés tolérables ou acceptables, doivent être communiqués aux utilisateurs via les instructions d'utilisation, les avertissements et l'étiquetage. Cette section justifie l'acceptabilité globale du produit."
    },
    {
      "section": "9. Tests et essais requis",
      "content": "Liste complète des tests de conformité à réaliser, avec les normes de référence, le caractère obligatoire ou recommandé, et les accréditations requises pour les laboratoires (ISO/IEC 17025). Inclut les essais physiques, chimiques, électriques et de performance selon les marchés cibles."
    },
    {
      "section": "10. Marquage et étiquetage",
      "content": "Exigences complètes de marquage et d'étiquetage pour tous les marchés cibles: marquage CE (UE), UKCA (GB), marque CCC (CN), PSE (JP), RCM (AU), ainsi que les mentions légales obligatoires dans chaque langue requise. Inclut les pictogrammes de sécurité, les avertissements CLP/GHS et les informations traçabilité."
    },
    {
      "section": "11. Instructions d'utilisation",
      "content": "Contenu obligatoire des instructions d'utilisation conformément à l'Article 8 du GPSR et aux normes applicables. Les instructions doivent être rédigées dans la ou les langues officielles du pays de mise sur le marché, être claires et compréhensibles, et couvrir l'utilisation normale, les mises en garde, l'entretien et l'élimination."
    },
    {
      "section": "12. Substances réglementées (REACH/CLP/RoHS)",
      "content": "Évaluation de la conformité aux réglementations sur les substances chimiques: REACH (règlement CE 1907/2006) pour les substances extrêmement préoccupantes (SVHC) au-delà du seuil de 0,1% en poids, RoHS (directive 2011/65/UE) pour les restrictions dans les équipements électriques, et CLP (règlement CE 1272/2008) pour la classification et l'étiquetage. Inclut les équivalents US (Prop 65), chinois (China REACH) et autres marchés."
    },
    {
      "section": "13. Traçabilité et identification",
      "content": "Système de traçabilité mis en place conformément à l'Article 9 du GPSR: numérotation de lot, numéro de série si applicable, code QR recommandé pour accès aux informations numériques de sécurité. La documentation doit être conservée pendant une durée minimale de 10 ans après la mise sur le marché, conformément aux obligations réglementaires."
    },
    {
      "section": "14. Exigences par marché (UE / USA / Chine / UK)",
      "content": "Analyse comparative des exigences spécifiques à chaque marché cible, incluant les certifications obligatoires, les organismes de contrôle compétents, les procédures de notification en cas d'incident, et les obligations de rappel. Cette section permet au responsable conformité d'identifier les actions prioritaires pour chaque territoire."
    },
    {
      "section": "15. Conclusion et recommandations",
      "content": "Synthèse de l'évaluation globale de conformité du produit, avec un plan d'action priorisé listant les étapes indispensables avant mise sur le marché (tests manquants, certifications à obtenir, modifications produit requises, documents à compléter). Inclut une estimation du niveau de risque résiduel global et une recommandation sur la mise sur le marché."
    }
  ],
  "responsible_person_required": true,
  "declaration_of_conformity_required": true,
  "disclaimer": "Ce document est une aide à la conformité généré par intelligence artificielle. Il ne constitue pas un avis juridique ou réglementaire. Une validation par un expert qualifié ou un organisme notifié est indispensable avant toute mise sur le marché."
}`

  try {
    let response: Awaited<ReturnType<typeof openai.chat.completions.create>> | null = null
    let usedModel = GROQ_MODELS[0]
    let lastError: unknown

    for (const model of GROQ_MODELS) {
      try {
        response = await openai.chat.completions.create({
          model,
          max_tokens: 12000,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        })
        usedModel = model
        break
      } catch (err: unknown) {
        const status = (err as { status?: number })?.status
        if (status === 429 || status === 503 || status === 404) {
          lastError = err
          continue
        }
        throw err
      }
    }

    if (!response) throw lastError ?? new Error("All models unavailable")

    const text = response.choices[0]?.message?.content
    if (!text) throw new Error("Empty response from AI")

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error("No JSON in response")

    const analysisData = JSON.parse(jsonMatch[0])

    // Merge detected market flags into market_specific_requirements so they reflect
    // the actual product configuration even if the AI overrode them
    if (analysisData.market_specific_requirements) {
      const msr = analysisData.market_specific_requirements
      if (msr.EU) msr.EU.applicable = markets.eu
      if (msr.US) msr.US.applicable = markets.us
      if (msr.CN) msr.CN.applicable = markets.cn
      if (msr.GB) msr.GB.applicable = markets.gb
      if (msr.CA) msr.CA.applicable = markets.ca
      if (msr.JP) msr.JP.applicable = markets.jp
      if (msr.AU) msr.AU.applicable = markets.au
    }

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
        ai_model: usedModel,
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
        market_specific_requirements: analysisData.market_specific_requirements ?? {},
        declaration_of_conformity: analysisData.declaration_of_conformity_content ?? {},
        traceability: analysisData.traceability_requirements ?? {},
        bom_components: bomComponents,
      },
      status: "draft",
      watermarked: true,
    })

    // Create labels only for languages selected by the user at generation time
    const langs = requestedLanguages as Array<"fr" | "en" | "de" | "it" | "es" | "zh" | "ja">
    for (const lang of langs) {
      const warnings = analysisData.labeling_requirements?.[lang] ?? []
      await supabase.from("labels").upsert({
        product_id: productId,
        language: lang,
        content: {
          product_name: product.name,
          reference: product.reference,
          warnings,
          manufacturer: org?.name,
          instructions_for_use: analysisData.instructions_for_use?.[lang] ?? [],
          pictograms: analysisData.pictograms ?? [],
        },
        pictograms: analysisData.pictograms ?? [],
        warnings,
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
        details: {
          product_id: productId,
          version,
          severity: ra.severity,
          markets_analyzed: activeMarkets,
          ai_model: usedModel,
        },
      })
    }

    return NextResponse.json({ success: true, riskAssessmentId: ra.id, data: analysisData })
  } catch (err) {
    console.error("Generation error:", err)
    return NextResponse.json({ error: "Generation failed", details: String(err) }, { status: 500 })
  }
}
