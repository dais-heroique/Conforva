import React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { DISCLAIMER_TEXT } from "@/lib/utils"

const BLUE = "#1d4ed8"
const BLUE_LIGHT = "#dbeafe"
const BLUE_BG = "#eff6ff"
const GRAY = "#6b7280"
const DARK = "#111827"
const RED_BG = "#fef2f2"
const RED_TEXT = "#991b1b"
const AMBER_BG = "#fffbeb"
const AMBER_TEXT = "#92400e"
const GREEN_BG = "#f0fdf4"
const GREEN_TEXT = "#166534"
const BORDER = "#e5e7eb"

const base = StyleSheet.create({
  page: { padding: 48, fontFamily: "Helvetica", fontSize: 9.5, color: DARK, lineHeight: 1.6 },
  watermark: {
    position: "absolute", top: "38%", left: "8%", width: "84%",
    fontSize: 58, color: "#e5e7eb", opacity: 0.35, transform: "rotate(-30deg)",
    textAlign: "center", fontFamily: "Helvetica-Bold",
  },
  // Header
  header: { borderBottom: `2 solid ${BLUE}`, paddingBottom: 14, marginBottom: 22 },
  logoRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  logoBox: { width: 30, height: 30, backgroundColor: BLUE, borderRadius: 6, marginRight: 10, justifyContent: "center", alignItems: "center" },
  logoText: { color: "white", fontSize: 17, fontFamily: "Helvetica-Bold" },
  appName: { fontSize: 19, fontFamily: "Helvetica-Bold", color: BLUE },
  docTitle: { fontSize: 15, fontFamily: "Helvetica-Bold", color: DARK, marginTop: 6 },
  subtitle: { fontSize: 8.5, color: GRAY },
  docRef: { fontSize: 8, color: GRAY, marginTop: 3 },
  // Sections
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", color: BLUE, borderBottom: `1 solid ${BLUE_LIGHT}`, paddingBottom: 4, marginBottom: 8 },
  sectionContent: { fontSize: 9, color: "#374151", lineHeight: 1.6 },
  // Rows
  row: { flexDirection: "row", marginBottom: 5 },
  label: { width: 155, fontSize: 8.5, color: GRAY, fontFamily: "Helvetica-Bold" },
  value: { flex: 1, fontSize: 8.5, color: DARK },
  // Hazard cards
  hazardCard: { border: `1 solid ${BORDER}`, borderRadius: 4, padding: 9, marginBottom: 7, backgroundColor: "#fafafa" },
  hazardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  hazardTitle: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: DARK },
  hazardDesc: { fontSize: 8.5, color: "#374151", marginBottom: 4 },
  hazardMeta: { fontSize: 7.5, color: GRAY },
  // Badges
  badgeCritical: { backgroundColor: "#7f1d1d", color: "white", fontSize: 7.5, padding: "2 6", borderRadius: 10 },
  badgeHigh: { backgroundColor: RED_BG, color: RED_TEXT, fontSize: 7.5, padding: "2 6", borderRadius: 10 },
  badgeMed: { backgroundColor: AMBER_BG, color: AMBER_TEXT, fontSize: 7.5, padding: "2 6", borderRadius: 10 },
  badgeLow: { backgroundColor: GREEN_BG, color: GREEN_TEXT, fontSize: 7.5, padding: "2 6", borderRadius: 10 },
  // Mitigation
  mitigationItem: { flexDirection: "row", marginBottom: 6, paddingBottom: 6, borderBottom: `1 solid ${BORDER}` },
  bullet: { width: 16, color: BLUE, fontFamily: "Helvetica-Bold" },
  // Footer
  disclaimer: { marginTop: 20, borderTop: `1 solid #fbbf24`, paddingTop: 8, fontSize: 7.5, color: AMBER_TEXT, backgroundColor: AMBER_BG, padding: 9, borderRadius: 4 },
  footer: { position: "absolute", bottom: 28, left: 48, right: 48, borderTop: `1 solid ${BORDER}`, paddingTop: 5, flexDirection: "row", justifyContent: "space-between", fontSize: 7.5, color: "#9ca3af" },
  // Cover
  coverBox: { backgroundColor: BLUE_BG, border: `1 solid ${BLUE_LIGHT}`, borderRadius: 6, padding: 16, marginBottom: 14 },
  coverRow: { flexDirection: "row", marginBottom: 6 },
  coverLabel: { width: 140, fontSize: 8.5, color: GRAY, fontFamily: "Helvetica-Bold" },
  coverValue: { flex: 1, fontSize: 8.5, color: DARK },
  // Test item
  testItem: { flexDirection: "row", marginBottom: 5 },
  testBullet: { width: 14, fontSize: 9, color: BLUE },
})

interface PDFProps {
  product: any
  org: any
  rp?: any
  riskAssessment?: any
  technicalFile?: any
  label?: any
  language?: string
  watermarked?: boolean
}

function Footer({ text }: { text: string }) {
  return (
    <View style={base.footer} fixed>
      <Text>Conforva — Aide à la conformité réglementaire</Text>
      <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} />
      <Text>{new Date().toLocaleDateString("fr-FR")}</Text>
    </View>
  )
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={base.sectionTitle}>{children}</Text>
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={base.row}>
      <Text style={base.label}>{label}</Text>
      <Text style={base.value}>{value}</Text>
    </View>
  )
}

function SeverityBadge({ s }: { s: string }) {
  const style = s === "critical" ? base.badgeCritical : s === "high" ? base.badgeHigh : s === "medium" ? base.badgeMed : base.badgeLow
  const labels: Record<string, string> = { critical: "CRITIQUE", high: "ÉLEVÉ", medium: "MOYEN", low: "FAIBLE" }
  return <Text style={style}>{labels[s] ?? s?.toUpperCase()}</Text>
}

// ---------------------------------------------------------------------------
// TECHNICAL FILE PDF
// ---------------------------------------------------------------------------

export function TechnicalFilePDF({ product, org, rp, riskAssessment, technicalFile, language = "fr", watermarked = true }: PDFProps) {
  const ra = riskAssessment?.content_json ?? {}
  const tf = technicalFile?.content_json ?? {}
  const category = product?.product_categories
  const docRef = `TF-${(product?.id ?? "XXXX").slice(-8).toUpperCase()}-${new Date().getFullYear()}`
  const sections: { section: string; content: string }[] = ra.technical_file_sections ?? tf.sections ?? []

  const t: Record<string, Record<string, string>> = {
    fr: {
      docTitle: "DOSSIER TECHNIQUE GPSR",
      reg: "Règlement (UE) 2023/988 sur la sécurité générale des produits",
      productLabel: "Produit",
      refLabel: "Référence",
      catLabel: "Catégorie",
      marketsLabel: "Marchés cibles",
      useLabel: "Usage prévu",
      matLabel: "Matériaux",
      weightLabel: "Poids",
      rpLabel: "Personne Responsable",
      orgLabel: "Organisation",
      stdTitle: "Normes et réglementations applicables",
      hazTitle: "Dangers identifiés",
      mitTitle: "Mesures de réduction des risques",
      testTitle: "Tests et essais requis",
      residTitle: "Risques résiduels",
    },
    en: {
      docTitle: "GPSR TECHNICAL FILE",
      reg: "Regulation (EU) 2023/988 on General Product Safety",
      productLabel: "Product",
      refLabel: "Reference",
      catLabel: "Category",
      marketsLabel: "Target markets",
      useLabel: "Intended use",
      matLabel: "Materials",
      weightLabel: "Weight",
      rpLabel: "Responsible Person",
      orgLabel: "Organisation",
      stdTitle: "Applicable standards and regulations",
      hazTitle: "Identified hazards",
      mitTitle: "Risk reduction measures",
      testTitle: "Required tests and assessments",
      residTitle: "Residual risks",
    },
    de: {
      docTitle: "GPSR TECHNISCHE UNTERLAGE",
      reg: "Verordnung (EU) 2023/988 über die allgemeine Produktsicherheit",
      productLabel: "Produkt",
      refLabel: "Referenz",
      catLabel: "Kategorie",
      marketsLabel: "Zielmärkte",
      useLabel: "Bestimmungsgemäßer Gebrauch",
      matLabel: "Materialien",
      weightLabel: "Gewicht",
      rpLabel: "Verantwortliche Person",
      orgLabel: "Organisation",
      stdTitle: "Anwendbare Normen und Vorschriften",
      hazTitle: "Identifizierte Gefahren",
      mitTitle: "Maßnahmen zur Risikominderung",
      testTitle: "Erforderliche Prüfungen",
      residTitle: "Restrisiken",
    },
  }
  const lbl = t[language] ?? t.fr

  return (
    <Document title={`Dossier technique — ${product?.name}`}>
      {/* === COVER PAGE === */}
      <Page size="A4" style={base.page}>
        {watermarked && <Text style={base.watermark}>PROJET — NON VALIDÉ</Text>}

        <View style={base.header}>
          <View style={base.logoRow}>
            <View style={base.logoBox}><Text style={base.logoText}>C</Text></View>
            <Text style={base.appName}>Conforva</Text>
          </View>
          <Text style={base.docTitle}>{lbl.docTitle}</Text>
          <Text style={base.subtitle}>{lbl.reg}</Text>
          <Text style={base.docRef}>Réf. document : {docRef} · Version {riskAssessment?.version ?? 1} · {new Date().toLocaleDateString("fr-FR")}</Text>
        </View>

        {/* Product info */}
        <View style={[base.section, base.coverBox]}>
          <Row label={lbl.productLabel} value={product?.name ?? "N/A"} />
          <Row label={lbl.refLabel} value={product?.reference ?? "N/A"} />
          <Row label={lbl.catLabel} value={category?.name_fr ?? "N/A"} />
          <Row label={lbl.useLabel} value={product?.intended_use ?? "Non spécifié"} />
          <Row label={lbl.matLabel} value={product?.materials?.join(", ") ?? "Non spécifié"} />
          {product?.weight_g && <Row label={lbl.weightLabel} value={`${product.weight_g} g`} />}
          <Row label={lbl.marketsLabel} value={product?.target_markets?.join(", ") ?? "EU"} />
        </View>

        {/* Responsible person */}
        <View style={base.section}>
          <SectionTitle>{rp ? lbl.rpLabel : lbl.orgLabel}</SectionTitle>
          {rp ? (
            <>
              <Row label="Société" value={rp.company_name} />
              <Row label="Adresse" value={`${rp.address_line}, ${rp.postal_code} ${rp.city}, ${rp.country_eu}`} />
              <Row label="Email" value={rp.email} />
              {rp.phone && <Row label="Téléphone" value={rp.phone} />}
              <Row label="Type" value={rp.type === "importer" ? "Importateur UE" : "Représentant Autorisé"} />
            </>
          ) : (
            <>
              <Row label="Nom" value={org?.name ?? "N/A"} />
              <Row label="Pays" value={org?.country ?? "N/A"} />
            </>
          )}
        </View>

        {/* Summary */}
        {ra.summary && (
          <View style={base.section}>
            <SectionTitle>Résumé de l'évaluation</SectionTitle>
            <Text style={base.sectionContent}>{ra.summary}</Text>
            {ra.overall_severity && (
              <View style={{ flexDirection: "row", marginTop: 6, gap: 8 }}>
                <Text style={{ fontSize: 8.5, color: GRAY }}>Niveau de risque global :</Text>
                <SeverityBadge s={ra.overall_severity} />
              </View>
            )}
          </View>
        )}

        {/* Methodology */}
        {ra.risk_assessment_methodology && (
          <View style={base.section}>
            <SectionTitle>Méthodologie d'évaluation</SectionTitle>
            <Text style={base.sectionContent}>{ra.risk_assessment_methodology}</Text>
          </View>
        )}

        <View style={base.disclaimer} fixed>
          <Text>{language === "en" ? DISCLAIMER_TEXT.en : DISCLAIMER_TEXT.fr}</Text>
        </View>
        <Footer text="Conforva" />
      </Page>

      {/* === TECHNICAL FILE SECTIONS (from AI) === */}
      {sections.length > 0 && (
        <Page size="A4" style={base.page}>
          {watermarked && <Text style={base.watermark}>PROJET — NON VALIDÉ</Text>}
          <View style={base.header}>
            <Text style={base.docTitle}>Contenu du dossier technique</Text>
          </View>
          {sections.slice(0, 8).map((s, i) => (
            <View key={i} style={base.section} wrap={false}>
              <SectionTitle>{s.section}</SectionTitle>
              <Text style={base.sectionContent}>{s.content}</Text>
            </View>
          ))}
          <View style={base.disclaimer} fixed>
            <Text>{language === "en" ? DISCLAIMER_TEXT.en : DISCLAIMER_TEXT.fr}</Text>
          </View>
          <Footer text="Conforva" />
        </Page>
      )}

      {/* === SECTIONS 9-15 === */}
      {sections.length > 8 && (
        <Page size="A4" style={base.page}>
          {watermarked && <Text style={base.watermark}>PROJET — NON VALIDÉ</Text>}
          <View style={base.header}>
            <Text style={base.docTitle}>Dossier technique (suite)</Text>
          </View>
          {sections.slice(8).map((s, i) => (
            <View key={i} style={base.section} wrap={false}>
              <SectionTitle>{s.section}</SectionTitle>
              <Text style={base.sectionContent}>{s.content}</Text>
            </View>
          ))}
          <View style={base.disclaimer} fixed>
            <Text>{language === "en" ? DISCLAIMER_TEXT.en : DISCLAIMER_TEXT.fr}</Text>
          </View>
          <Footer text="Conforva" />
        </Page>
      )}

      {/* === STANDARDS === */}
      {ra.referenced_standards?.length > 0 && (
        <Page size="A4" style={base.page}>
          {watermarked && <Text style={base.watermark}>PROJET — NON VALIDÉ</Text>}
          <View style={base.header}>
            <Text style={base.docTitle}>{lbl.stdTitle}</Text>
          </View>
          <View style={base.section}>
            {ra.referenced_standards.map((s: string, i: number) => (
              <View key={i} style={base.mitigationItem}>
                <Text style={base.bullet}>•</Text>
                <Text style={{ flex: 1, fontSize: 8.5 }}>{s}</Text>
              </View>
            ))}
          </View>
          {/* Market-specific requirements */}
          {ra.market_specific_requirements && (
            <View style={base.section}>
              <SectionTitle>Exigences par marché</SectionTitle>
              {Object.entries(ra.market_specific_requirements).map(([market, req]: [string, any]) => {
                if (!req?.applicable) return null
                return (
                  <View key={market} style={{ marginBottom: 10 }} wrap={false}>
                    <Text style={{ fontSize: 9.5, fontFamily: "Helvetica-Bold", color: DARK, marginBottom: 3 }}>{market} — {req.regulation}</Text>
                    {req.specific_requirements?.map((r: string, i: number) => (
                      <View key={i} style={{ flexDirection: "row", marginBottom: 2 }}>
                        <Text style={{ width: 12, color: BLUE }}>–</Text>
                        <Text style={{ flex: 1, fontSize: 8.5 }}>{r}</Text>
                      </View>
                    ))}
                  </View>
                )
              })}
            </View>
          )}
          <View style={base.disclaimer} fixed>
            <Text>{language === "en" ? DISCLAIMER_TEXT.en : DISCLAIMER_TEXT.fr}</Text>
          </View>
          <Footer text="Conforva" />
        </Page>
      )}

      {/* === HAZARDS === */}
      {ra.hazards?.length > 0 && (
        <Page size="A4" style={base.page}>
          {watermarked && <Text style={base.watermark}>PROJET — NON VALIDÉ</Text>}
          <View style={base.header}>
            <Text style={base.docTitle}>{lbl.hazTitle}</Text>
          </View>
          {ra.hazards.map((h: any, i: number) => (
            <View key={i} style={base.hazardCard} wrap={false}>
              <View style={base.hazardHeader}>
                <Text style={base.hazardTitle}>{h.id} — {h.title}</Text>
                <SeverityBadge s={h.severity} />
              </View>
              <Text style={base.hazardDesc}>{h.description}</Text>
              {h.severity_justification && (
                <Text style={{ fontSize: 7.5, color: GRAY, marginBottom: 3 }}>Gravité : {h.severity_justification}</Text>
              )}
              {h.exposure_conditions && (
                <Text style={{ fontSize: 7.5, color: GRAY, marginBottom: 3 }}>Conditions d'exposition : {h.exposure_conditions}</Text>
              )}
              <View style={{ flexDirection: "row", gap: 12, marginTop: 3 }}>
                {h.probability && <Text style={base.hazardMeta}>Probabilité : {h.probability}</Text>}
                {h.risk_level && <Text style={base.hazardMeta}>Niveau de risque : {h.risk_level}</Text>}
                {h.affected_users?.length > 0 && <Text style={base.hazardMeta}>Utilisateurs : {h.affected_users.join(", ")}</Text>}
              </View>
              {h.referenced_standards?.length > 0 && (
                <Text style={{ fontSize: 7.5, color: BLUE, marginTop: 3 }}>{h.referenced_standards.join(" · ")}</Text>
              )}
            </View>
          ))}
          <View style={base.disclaimer} fixed>
            <Text>{language === "en" ? DISCLAIMER_TEXT.en : DISCLAIMER_TEXT.fr}</Text>
          </View>
          <Footer text="Conforva" />
        </Page>
      )}

      {/* === MITIGATION + TESTS + RESIDUAL === */}
      {(ra.mitigation_measures?.length > 0 || ra.required_tests?.length > 0 || ra.residual_risks?.length > 0) && (
        <Page size="A4" style={base.page}>
          {watermarked && <Text style={base.watermark}>PROJET — NON VALIDÉ</Text>}

          {ra.mitigation_measures?.length > 0 && (
            <View style={base.section}>
              <View style={base.header}>
                <Text style={base.docTitle}>{lbl.mitTitle}</Text>
              </View>
              {ra.mitigation_measures.map((m: any, i: number) => (
                <View key={i} style={base.mitigationItem} wrap={false}>
                  <Text style={base.bullet}>{m.priority === "mandatory" ? "!" : "✓"}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 9, color: DARK, fontFamily: "Helvetica-Bold" }}>{m.measure}</Text>
                    {m.implementation_details && (
                      <Text style={{ fontSize: 8, color: "#4b5563", marginTop: 2 }}>{m.implementation_details}</Text>
                    )}
                    <Text style={{ fontSize: 7.5, color: GRAY, marginTop: 2 }}>
                      Type : {m.type} · Priorité : {m.priority === "mandatory" ? "Obligatoire" : "Recommandé"} · Réf. : {m.norm_reference}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {ra.required_tests?.length > 0 && (
            <View style={base.section}>
              <SectionTitle>{lbl.testTitle}</SectionTitle>
              {ra.required_tests.map((test: any, i: number) => {
                const isObj = typeof test === "object"
                return (
                  <View key={i} style={base.testItem}>
                    <Text style={base.testBullet}>{isObj && test.mandatory ? "!" : "□"}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 8.5 }}>{isObj ? test.test : test}</Text>
                      {isObj && test.standard && (
                        <Text style={{ fontSize: 7.5, color: GRAY }}>Norme : {test.standard}{test.laboratory_accreditation ? ` · ${test.laboratory_accreditation}` : ""}</Text>
                      )}
                    </View>
                  </View>
                )
              })}
            </View>
          )}

          {ra.residual_risks?.length > 0 && (
            <View style={base.section}>
              <SectionTitle>{lbl.residTitle}</SectionTitle>
              {ra.residual_risks.map((r: any, i: number) => (
                <View key={i} style={base.mitigationItem}>
                  <Text style={base.bullet}>→</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 8.5 }}>[{r.hazard_id}] {r.description}</Text>
                    <Text style={{ fontSize: 7.5, color: GRAY }}>Acceptabilité : {r.acceptability}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={base.disclaimer} fixed>
            <Text>{language === "en" ? DISCLAIMER_TEXT.en : DISCLAIMER_TEXT.fr}</Text>
          </View>
          <Footer text="Conforva" />
        </Page>
      )}
    </Document>
  )
}

// ---------------------------------------------------------------------------
// DECLARATION OF CONFORMITY PDF
// ---------------------------------------------------------------------------

export function DeclarationOfConformityPDF({ product, org, rp, riskAssessment, watermarked = true }: PDFProps) {
  const ra = riskAssessment?.content_json ?? {}
  const doc = ra.declaration_of_conformity_content ?? {}
  const docRef = `DOC-${(product?.id ?? "XXXX").slice(-8).toUpperCase()}-${new Date().getFullYear()}`
  const category = product?.product_categories
  const responsible = rp ?? org

  return (
    <Document title={`Déclaration de Conformité — ${product?.name}`}>
      <Page size="A4" style={base.page}>
        {watermarked && <Text style={base.watermark}>PROJET — NON SIGNÉ</Text>}

        {/* Header */}
        <View style={base.header}>
          <View style={base.logoRow}>
            <View style={base.logoBox}><Text style={base.logoText}>C</Text></View>
            <Text style={base.appName}>Conforva</Text>
          </View>
          <Text style={base.docTitle}>DÉCLARATION UE DE CONFORMITÉ</Text>
          <Text style={base.subtitle}>Établie conformément à l'Article 24 du Règlement (UE) 2023/988</Text>
          <Text style={base.docRef}>N° {docRef} · {new Date().toLocaleDateString("fr-FR")}</Text>
        </View>

        {/* 1. Product */}
        <View style={base.section}>
          <SectionTitle>1. Identification du produit</SectionTitle>
          <View style={base.coverBox}>
            <Row label="Désignation du produit" value={product?.name ?? "N/A"} />
            <Row label="Référence / Modèle" value={product?.reference ?? "N/A"} />
            <Row label="Catégorie" value={category?.name_fr ?? "N/A"} />
            {product?.intended_use && <Row label="Usage prévu" value={product.intended_use} />}
            {product?.materials?.length > 0 && <Row label="Matériaux principaux" value={product.materials.join(", ")} />}
            {product?.weight_g && <Row label="Poids" value={`${product.weight_g} g`} />}
            <Row label="Marchés cibles" value={product?.target_markets?.join(", ") ?? "UE"} />
          </View>
        </View>

        {/* 2. Manufacturer / RP */}
        <View style={base.section}>
          <SectionTitle>2. Fabricant / Personne Responsable</SectionTitle>
          <View style={base.coverBox}>
            {rp ? (
              <>
                <Row label="Dénomination sociale" value={rp.company_name} />
                <Row label="Adresse complète" value={`${rp.address_line}, ${rp.postal_code} ${rp.city}, ${rp.country_eu}`} />
                <Row label="Adresse email" value={rp.email} />
                {rp.phone && <Row label="Téléphone" value={rp.phone} />}
                <Row label="Qualité" value={rp.type === "importer" ? "Importateur / Représentant Responsable UE" : "Représentant Autorisé UE"} />
              </>
            ) : (
              <>
                <Row label="Dénomination sociale" value={org?.name ?? "À compléter"} />
                <Row label="Pays d'établissement" value={org?.country ?? "À compléter"} />
              </>
            )}
          </View>
        </View>

        {/* 3. Object of declaration */}
        <View style={base.section}>
          <SectionTitle>3. Objet de la déclaration</SectionTitle>
          <Text style={base.sectionContent}>
            {doc.product_description ?? `Le produit désigné ci-dessus est l'objet de la présente déclaration UE de conformité.`}
          </Text>
        </View>

        {/* 4. Regulations */}
        <View style={base.section}>
          <SectionTitle>4. Réglementations applicables</SectionTitle>
          {(doc.applicable_regulations ?? ["Règlement (UE) 2023/988 du Parlement européen et du Conseil sur la sécurité générale des produits (GPSR)"]).map((r: string, i: number) => (
            <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
              <Text style={{ width: 16, color: BLUE }}>–</Text>
              <Text style={{ flex: 1, fontSize: 8.5 }}>{r}</Text>
            </View>
          ))}
        </View>

        {/* 5. Standards */}
        {ra.referenced_standards?.length > 0 && (
          <View style={base.section}>
            <SectionTitle>5. Normes harmonisées et autres normes appliquées</SectionTitle>
            {(doc.standards_complied ?? ra.referenced_standards).map((s: string, i: number) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
                <Text style={{ width: 16, color: BLUE }}>•</Text>
                <Text style={{ flex: 1, fontSize: 8.5 }}>{s}</Text>
              </View>
            ))}
          </View>
        )}

        {/* 6. Assessment procedure */}
        <View style={base.section}>
          <SectionTitle>6. Procédure d'évaluation de la conformité</SectionTitle>
          <Text style={base.sectionContent}>
            {doc.assessment_procedure ?? "Évaluation interne de la conformité conformément à l'Annexe III du Règlement (UE) 2023/988. L'évaluation des risques a été réalisée selon la méthodologie ISO 12100:2010. Aucun organisme notifié n'est requis pour cette catégorie de produit."}
          </Text>
        </View>

        {/* 7. Signature */}
        <View style={[base.section, { marginTop: 24 }]}>
          <SectionTitle>7. Déclaration et signature</SectionTitle>
          <Text style={{ fontSize: 8.5, color: DARK, marginBottom: 16, lineHeight: 1.7 }}>
            Je soussigné(e), agissant au nom et pour le compte de la société mentionnée ci-dessus, déclare sous ma seule responsabilité que le produit décrit est conforme aux exigences essentielles de sécurité et aux autres dispositions pertinentes des réglementations listées ci-dessus.
          </Text>
          <View style={{ flexDirection: "row", gap: 30, marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 8, color: GRAY, marginBottom: 24 }}>Lieu et date :</Text>
              <View style={{ borderBottom: "1 solid #9ca3af", marginBottom: 4 }} />
              <Text style={{ fontSize: 8, color: GRAY }}>__________________________</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 8, color: GRAY, marginBottom: 24 }}>Nom, prénom et fonction :</Text>
              <View style={{ borderBottom: "1 solid #9ca3af", marginBottom: 4 }} />
              <Text style={{ fontSize: 8, color: GRAY }}>__________________________</Text>
            </View>
          </View>
          <View style={{ marginTop: 18 }}>
            <Text style={{ fontSize: 8, color: GRAY, marginBottom: 24 }}>Signature :</Text>
            <View style={{ borderBottom: "1 solid #9ca3af", width: "50%", marginBottom: 4 }} />
            <Text style={{ fontSize: 8, color: GRAY }}>__________________________</Text>
          </View>
        </View>

        <View style={[base.disclaimer, { marginTop: 20 }]}>
          <Text>Ce document a été généré par Conforva à titre d'aide à la conformité. Il doit être complété, relu et signé par le responsable légal de la société avant tout usage officiel. Il ne constitue pas en lui-même un acte légal sans signature manuscrite ou électronique certifiée.</Text>
        </View>
        <Footer text="Conforva" />
      </Page>
    </Document>
  )
}

// ---------------------------------------------------------------------------
// LABEL PDF
// ---------------------------------------------------------------------------

export function LabelPDF({ product, label, language = "fr", org, watermarked = false }: { product: any; label: any; language?: string; org: any; watermarked?: boolean }) {
  const warnings: string[] = label?.warnings ?? []
  const pictograms: string[] = label?.pictograms ?? []

  const t: Record<string, Record<string, string>> = {
    fr: { title: "ÉTIQUETTE DE SÉCURITÉ", warnings: "AVERTISSEMENTS", product: "Produit", ref: "Réf.", manufacturer: "Fabricant" },
    en: { title: "SAFETY LABEL", warnings: "WARNINGS", product: "Product", ref: "Ref.", manufacturer: "Manufacturer" },
    de: { title: "SICHERHEITSETIKETT", warnings: "WARNHINWEISE", product: "Produkt", ref: "Ref.", manufacturer: "Hersteller" },
    it: { title: "ETICHETTA DI SICUREZZA", warnings: "AVVERTENZE", product: "Prodotto", ref: "Rif.", manufacturer: "Produttore" },
    es: { title: "ETIQUETA DE SEGURIDAD", warnings: "ADVERTENCIAS", product: "Producto", ref: "Ref.", manufacturer: "Fabricante" },
    zh: { title: "安全标签", warnings: "警告", product: "产品", ref: "型号", manufacturer: "制造商" },
    ja: { title: "安全ラベル", warnings: "警告", product: "製品", ref: "型番", manufacturer: "製造者" },
  }
  const lbl = t[language] ?? t.fr

  return (
    <Document title={`Étiquette — ${product?.name} — ${language}`}>
      <Page size="A5" style={{ ...base.page, padding: 28 }}>
        {watermarked && <Text style={{ ...base.watermark, fontSize: 38 }}>NON VALIDÉ</Text>}
        <View style={{ border: `2 solid ${BLUE}`, borderRadius: 6, padding: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <View style={{ width: 22, height: 22, backgroundColor: BLUE, borderRadius: 5, marginRight: 7, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 12, fontFamily: "Helvetica-Bold" }}>C</Text>
            </View>
            <Text style={{ fontSize: 7.5, color: GRAY }}>Conforva</Text>
          </View>

          <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold", color: BLUE, marginBottom: 8 }}>{lbl.title}</Text>

          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text style={{ width: 70, fontSize: 8.5, color: GRAY, fontFamily: "Helvetica-Bold" }}>{lbl.product}</Text>
            <Text style={{ flex: 1, fontSize: 8.5, fontFamily: "Helvetica-Bold" }}>{product?.name}</Text>
          </View>
          {product?.reference && (
            <View style={{ flexDirection: "row", marginBottom: 8 }}>
              <Text style={{ width: 70, fontSize: 8.5, color: GRAY, fontFamily: "Helvetica-Bold" }}>{lbl.ref}</Text>
              <Text style={{ flex: 1, fontSize: 8.5 }}>{product.reference}</Text>
            </View>
          )}

          {pictograms.length > 0 && (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: "#374151", marginBottom: 4 }}>Pictogrammes :</Text>
              <Text style={{ fontSize: 8.5, color: "#374151" }}>{pictograms.join(" · ")}</Text>
            </View>
          )}

          {warnings.length > 0 && (
            <View style={{ backgroundColor: AMBER_BG, border: `1 solid #fbbf24`, borderRadius: 4, padding: 8, marginBottom: 8 }}>
              <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: AMBER_TEXT, marginBottom: 5 }}>
                {`⚠`} {lbl.warnings}
              </Text>
              {warnings.map((w, i) => (
                <Text key={i} style={{ fontSize: 8, color: "#78350f", marginBottom: 3 }}>• {w}</Text>
              ))}
            </View>
          )}

          <View style={{ borderTop: `1 solid ${BORDER}`, paddingTop: 6, marginTop: 6 }}>
            <Text style={{ fontSize: 7, color: GRAY }}>{lbl.manufacturer}: {org?.name ?? "N/A"} · {org?.country ?? "EU"}</Text>
            <Text style={{ fontSize: 7, color: "#9ca3af", marginTop: 3 }}>
              Généré par Conforva (aide à la conformité) · {new Date().toLocaleDateString("fr-FR")}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 8, padding: 6, backgroundColor: AMBER_BG, borderRadius: 4 }}>
          <Text style={{ fontSize: 6.5, color: AMBER_TEXT }}>
            Ce document est une aide à la conformité. Il ne constitue pas un avis juridique et ne garantit pas la conformité du produit.
          </Text>
        </View>
      </Page>
    </Document>
  )
}
