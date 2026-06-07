import React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { DISCLAIMER_TEXT } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Colour tokens
// ---------------------------------------------------------------------------
const BLUE = "#1d4ed8"
const BLUE_LIGHT = "#dbeafe"
const BLUE_BG = "#eff6ff"
const GRAY = "#6b7280"
const DARK = "#111827"
const MID = "#374151"
const RED_BG = "#fef2f2"
const RED_TEXT = "#991b1b"
const AMBER_BG = "#fffbeb"
const AMBER_TEXT = "#92400e"
const AMBER_BORDER = "#fbbf24"
const GREEN_BG = "#f0fdf4"
const GREEN_TEXT = "#166534"
const BORDER = "#e5e7eb"

// ---------------------------------------------------------------------------
// Style sheet
// ---------------------------------------------------------------------------
const base = StyleSheet.create({
  // ---- page ----------------------------------------------------------------
  page: {
    padding: 48,
    paddingBottom: 90,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: DARK,
    lineHeight: 1.6,
    backgroundColor: "#ffffff",
  },
  // ---- watermark -----------------------------------------------------------
  watermark: {
    position: "absolute",
    top: 270,
    left: 30,
    right: 30,
    fontSize: 52,
    color: "#d4d4d4",
    transform: "rotate(-30deg)",
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
  // ---- cover ---------------------------------------------------------------
  coverTopBand: {
    backgroundColor: BLUE,
    padding: 40,
    paddingBottom: 30,
    marginHorizontal: -48,
    marginTop: -48,
    marginBottom: 24,
  },
  coverLogoRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  coverLogoBox: {
    width: 32,
    height: 32,
    backgroundColor: "#ffffff",
    borderRadius: 7,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  coverLogoLetter: { color: BLUE, fontSize: 20, fontFamily: "Helvetica-Bold" },
  coverAppName: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#ffffff" },
  coverTitle: { fontSize: 24, fontFamily: "Helvetica-Bold", color: "#ffffff", marginBottom: 6, lineHeight: 1.2 },
  coverSubtitle: { fontSize: 10, color: "#bfdbfe" },
  // ---- cover meta ----------------------------------------------------------
  coverBox: {
    backgroundColor: BLUE_BG,
    border: `1 solid ${BLUE_LIGHT}`,
    borderRadius: 5,
    padding: 14,
    marginBottom: 14,
  },
  coverRow: { flexDirection: "row", marginBottom: 5 },
  coverLabel: { width: 140, fontSize: 8.5, color: GRAY, fontFamily: "Helvetica-Bold" },
  coverValue: { flex: 1, fontSize: 8.5, color: DARK, fontFamily: "Helvetica-Bold" },
  // ---- cover classification badge ------------------------------------------
  coverBadgeRow: { flexDirection: "row", alignItems: "center", marginTop: 4, marginBottom: 14 },
  coverBadge: {
    backgroundColor: AMBER_BG,
    border: `1 solid ${AMBER_BORDER}`,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
  },
  coverBadgeText: { fontSize: 8, color: AMBER_TEXT, fontFamily: "Helvetica-Bold" },
  coverBadgeNote: { fontSize: 7.5, color: GRAY, flex: 1, lineHeight: 1.5 },
  // ---- cover TOC -----------------------------------------------------------
  tocEntry: { flexDirection: "row", marginBottom: 3 },
  tocNum: { width: 24, fontSize: 8, color: BLUE, fontFamily: "Helvetica-Bold" },
  tocText: { flex: 1, fontSize: 8, color: MID },
  // ---- page header / footer ------------------------------------------------
  pageHeader: {
    borderBottom: `1 solid ${BLUE_LIGHT}`,
    paddingBottom: 7,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  pageHeaderLeft: {},
  pageHeaderApp: { fontSize: 8, color: BLUE, fontFamily: "Helvetica-Bold" },
  pageHeaderRef: { fontSize: 7.5, color: GRAY },
  pageHeaderRight: { fontSize: 7.5, color: GRAY, textAlign: "right" },
  disclaimer: {
    position: "absolute",
    bottom: 44,
    left: 48,
    right: 48,
    borderTop: `1 solid ${AMBER_BORDER}`,
    paddingTop: 6,
    fontSize: 7,
    color: AMBER_TEXT,
    backgroundColor: AMBER_BG,
    padding: 7,
    borderRadius: 3,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 48,
    right: 48,
    borderTop: `1 solid ${BORDER}`,
    paddingTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#9ca3af",
  },
  // ---- section titles ------------------------------------------------------
  h1: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: BLUE,
    borderBottom: `1.5 solid ${BLUE_LIGHT}`,
    paddingBottom: 4,
    marginBottom: 10,
    marginTop: 2,
  },
  h2: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 5,
    marginTop: 10,
  },
  // ---- key-value rows ------------------------------------------------------
  row: { flexDirection: "row", marginBottom: 5 },
  label: { width: 155, fontSize: 8.5, color: GRAY, fontFamily: "Helvetica-Bold" },
  value: { flex: 1, fontSize: 8.5, color: DARK },
  // ---- text ----------------------------------------------------------------
  body: { fontSize: 8.5, color: MID, lineHeight: 1.65 },
  // ---- bullet list ---------------------------------------------------------
  bulletItem: { flexDirection: "row", marginBottom: 4 },
  bulletDot: { width: 14, fontSize: 9, color: BLUE },
  bulletText: { flex: 1, fontSize: 8.5, color: MID },
  // ---- info / warn boxes ---------------------------------------------------
  infoBox: {
    backgroundColor: BLUE_BG,
    border: `1 solid ${BLUE_LIGHT}`,
    borderRadius: 4,
    padding: 9,
    marginBottom: 9,
  },
  infoBoxText: { fontSize: 8.5, color: "#1e40af" },
  warnBox: {
    backgroundColor: AMBER_BG,
    border: `1 solid ${AMBER_BORDER}`,
    borderRadius: 4,
    padding: 9,
    marginBottom: 9,
  },
  warnBoxText: { fontSize: 8.5, color: AMBER_TEXT },
  // ---- hazard cards --------------------------------------------------------
  hazardCardNeutral: { border: `1 solid ${BORDER}`, borderRadius: 4, padding: 9, marginBottom: 8, backgroundColor: "#fafafa" },
  hazardCardHigh: { border: `1 solid #fca5a5`, borderRadius: 4, padding: 9, marginBottom: 8, backgroundColor: "#fff5f5" },
  hazardCardMed: { border: `1 solid #fcd34d`, borderRadius: 4, padding: 9, marginBottom: 8, backgroundColor: "#fffdf0" },
  hazardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4, alignItems: "flex-start" },
  hazardTitle: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: DARK, flex: 1, paddingRight: 8 },
  hazardDesc: { fontSize: 8.5, color: MID, marginBottom: 4, lineHeight: 1.55 },
  hazardMeta: { flexDirection: "row", marginTop: 4 },
  hazardMetaItem: { flexDirection: "row", marginRight: 14 },
  hazardMetaLabel: { fontSize: 7.5, color: GRAY, marginRight: 3 },
  hazardMetaValue: { fontSize: 7.5, color: DARK, fontFamily: "Helvetica-Bold" },
  // ---- severity badges -----------------------------------------------------
  badgeCritical: { backgroundColor: "#7f1d1d", color: "#ffffff", fontSize: 7.5, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, fontFamily: "Helvetica-Bold" },
  badgeHigh: { backgroundColor: RED_BG, color: RED_TEXT, fontSize: 7.5, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, fontFamily: "Helvetica-Bold" },
  badgeMed: { backgroundColor: AMBER_BG, color: AMBER_TEXT, fontSize: 7.5, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, fontFamily: "Helvetica-Bold" },
  badgeLow: { backgroundColor: GREEN_BG, color: GREEN_TEXT, fontSize: 7.5, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, fontFamily: "Helvetica-Bold" },
  // ---- mitigation ----------------------------------------------------------
  mitigationItem: {
    flexDirection: "row",
    marginBottom: 7,
    paddingBottom: 7,
    borderBottom: `1 solid ${BORDER}`,
  },
  mitigationCheck: { width: 16, color: GREEN_TEXT, fontFamily: "Helvetica-Bold", fontSize: 9 },
  mitigationContent: { flex: 1 },
  mitigationMeasure: { fontSize: 8.5, color: DARK, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  mitigationMeta: { fontSize: 7.5, color: GRAY },
  mitigationDetail: { fontSize: 8, color: MID, marginTop: 2 },
  // ---- test item -----------------------------------------------------------
  testItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    padding: 7,
    backgroundColor: BLUE_BG,
    borderRadius: 4,
    border: `1 solid ${BLUE_LIGHT}`,
  },
  testDotMandatory: { width: 7, height: 7, backgroundColor: BLUE, borderRadius: 4, marginRight: 8, marginTop: 2 },
  testDotOptional: { width: 7, height: 7, backgroundColor: BORDER, borderRadius: 4, marginRight: 8, marginTop: 2 },
  testName: { flex: 1, fontSize: 8.5, color: DARK },
  testStd: { fontSize: 7.5, color: BLUE, marginTop: 1 },
  testTag: { fontSize: 7, color: BLUE, fontFamily: "Helvetica-Bold" },
  // ---- table (standards / substances) -------------------------------------
  tbl: { border: `1 solid ${BORDER}`, borderRadius: 4, overflow: "hidden", marginTop: 6 },
  tblHeaderRow: { flexDirection: "row", backgroundColor: BLUE_BG },
  tblHeaderCell: { flex: 1, padding: 6, borderRight: `1 solid ${BLUE_LIGHT}` },
  tblHeaderText: { fontSize: 8, color: BLUE, fontFamily: "Helvetica-Bold" },
  tblRow: { flexDirection: "row", borderTop: `1 solid ${BORDER}` },
  tblCell: { flex: 1, padding: 6, borderRight: `1 solid ${BORDER}` },
  tblCellText: { fontSize: 8, color: MID },
  tblNumCell: { width: 28, padding: 6, borderRight: `1 solid ${BORDER}`, justifyContent: "center", backgroundColor: "#fafafa" },
  tblNumText: { fontSize: 8, color: BLUE, fontFamily: "Helvetica-Bold", textAlign: "center" },
  // ---- risk matrix ---------------------------------------------------------
  matrixContainer: { marginVertical: 8 },
  matrixHeaderRow: { flexDirection: "row", backgroundColor: BLUE },
  matrixHeaderCell: { flex: 1, padding: 5, borderRight: `1 solid #3b82f6` },
  matrixHeaderText: { fontSize: 7.5, color: "#ffffff", fontFamily: "Helvetica-Bold", textAlign: "center" },
  matrixRow: { flexDirection: "row", borderTop: `1 solid ${BORDER}` },
  matrixLabelCell: { width: 72, padding: 5, backgroundColor: "#f9fafb", borderRight: `1 solid ${BORDER}`, justifyContent: "center" },
  matrixLabelText: { fontSize: 7.5, color: MID, fontFamily: "Helvetica-Bold" },
  matrixCellLow: { flex: 1, padding: 5, backgroundColor: GREEN_BG, borderRight: `1 solid ${BORDER}`, alignItems: "center" },
  matrixCellMed: { flex: 1, padding: 5, backgroundColor: AMBER_BG, borderRight: `1 solid ${BORDER}`, alignItems: "center" },
  matrixCellHigh: { flex: 1, padding: 5, backgroundColor: RED_BG, borderRight: `1 solid ${BORDER}`, alignItems: "center" },
  matrixCellCrit: { flex: 1, padding: 5, backgroundColor: "#7f1d1d", alignItems: "center" },
  matrixCellTextLow: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: GREEN_TEXT },
  matrixCellTextMed: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: AMBER_TEXT },
  matrixCellTextHigh: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: RED_TEXT },
  matrixCellTextCrit: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: "#ffffff" },
  // ---- declaration of conformity ------------------------------------------
  docHeader: {
    borderBottom: `2 solid ${BLUE}`,
    paddingBottom: 12,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  docLogoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  docLogoBox: {
    width: 26,
    height: 26,
    backgroundColor: BLUE,
    borderRadius: 5,
    marginRight: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  docLogoLetter: { color: "#ffffff", fontSize: 15, fontFamily: "Helvetica-Bold" },
  docAppName: { fontSize: 14, fontFamily: "Helvetica-Bold", color: BLUE },
  docTitle: { fontSize: 15, fontFamily: "Helvetica-Bold", color: DARK },
  docSubtitle: { fontSize: 8.5, color: GRAY, marginTop: 3 },
  docRefBlock: { alignItems: "flex-end" },
  docRefLine: { fontSize: 8, color: GRAY, marginBottom: 2 },
  declSection: { marginBottom: 13 },
  declH1: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: BLUE,
    borderBottom: `1 solid ${BLUE_LIGHT}`,
    paddingBottom: 3,
    marginBottom: 7,
  },
  declBody: { fontSize: 8.5, color: MID, lineHeight: 1.65 },
  // ---- signature block -----------------------------------------------------
  sigBlock: {
    marginTop: 14,
    border: `1 solid ${BORDER}`,
    borderRadius: 4,
    padding: 14,
    backgroundColor: "#fafafa",
  },
  sigRow: { flexDirection: "row", alignItems: "flex-end", marginBottom: 14 },
  sigLabel: { width: 140, fontSize: 8.5, color: GRAY, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  sigLine: { flex: 1, borderBottom: `1 solid ${BORDER}`, height: 20 },
  // ---- AI section block ----------------------------------------------------
  aiBlock: {
    marginBottom: 14,
    paddingBottom: 11,
    borderBottom: `1 solid ${BORDER}`,
  },
  aiBlockTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: BLUE, marginBottom: 5 },
  aiBlockContent: { fontSize: 8.5, color: MID, lineHeight: 1.65 },
})

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------
interface PDFProps {
  product: any
  org: any
  rp?: any
  riskAssessment?: any
  technicalFile?: any
  label?: any
  language?: string
  watermarked?: boolean
  branded?: boolean  // true = show Conforva branding (free plan); false = clean document (paid)
}

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------
function buildDocRef(productId: string, suffix: string): string {
  const shortId = (productId ?? "XXXXXXXX").slice(-8).toUpperCase()
  return `${shortId}-${suffix}-${new Date().getFullYear()}`
}

function todayStr(locale = "fr-FR"): string {
  return new Date().toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" })
}

function severityBadgeStyle(sev: string) {
  const s = (sev ?? "").toLowerCase()
  if (s === "critical") return base.badgeCritical
  if (s === "high") return base.badgeHigh
  if (s === "medium" || s === "moderate") return base.badgeMed
  return base.badgeLow
}

function hazardCardStyle(sev: string) {
  const s = (sev ?? "").toLowerCase()
  if (s === "critical" || s === "high") return base.hazardCardHigh
  if (s === "medium" || s === "moderate") return base.hazardCardMed
  return base.hazardCardNeutral
}

function severityLabel(sev: string, lang: string): string {
  const fr: Record<string, string> = { critical: "CRITIQUE", high: "ÉLEVÉ", medium: "MOYEN", moderate: "MODÉRÉ", low: "FAIBLE" }
  const en: Record<string, string> = { critical: "CRITICAL", high: "HIGH", medium: "MEDIUM", moderate: "MODERATE", low: "LOW" }
  const map = lang === "en" ? en : fr
  return map[(sev ?? "").toLowerCase()] ?? (sev ?? "N/A").toUpperCase()
}

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------
function PageHeader({ docRef, productName, branded = true }: { docRef: string; productName: string; branded?: boolean }) {
  return (
    <View style={base.pageHeader} fixed>
      <View style={base.pageHeaderLeft}>
        {branded ? <Text style={base.pageHeaderApp}>CONFORVA</Text> : null}
        <Text style={base.pageHeaderRef}>Réf. : {docRef}</Text>
      </View>
      <Text style={base.pageHeaderRight}>{productName}</Text>
    </View>
  )
}

function PageFooter({ language, branded = true }: { language: string; branded?: boolean }) {
  return (
    <>
      <View style={base.disclaimer} fixed>
        <Text>{language === "en" ? DISCLAIMER_TEXT.en : DISCLAIMER_TEXT.fr}</Text>
      </View>
      <View style={base.footer} fixed>
        {branded ? <Text>Conforva — Aide à la conformité GPSR</Text> : <Text> </Text>}
        <Text render={({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) =>
          `Page ${pageNumber} / ${totalPages}`}
        />
        <Text>{todayStr()}</Text>
      </View>
    </>
  )
}

function WatermarkText({ label = "PROJET — NON VALIDÉ" }: { label?: string }) {
  return <Text style={base.watermark}>{label}</Text>
}

function H1({ children }: { children: string }) {
  return <Text style={base.h1}>{children}</Text>
}

function H2({ children }: { children: string }) {
  return <Text style={base.h2}>{children}</Text>
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={base.row}>
      <Text style={base.label}>{label}</Text>
      <Text style={base.value}>{value}</Text>
    </View>
  )
}

function BulletList({ items, color = BLUE }: { items: string[]; color?: string }) {
  return (
    <>
      {items.map((item, i) => (
        <View key={i} style={base.bulletItem}>
          <Text style={[base.bulletDot, { color }]}>•</Text>
          <Text style={base.bulletText}>{item}</Text>
        </View>
      ))}
    </>
  )
}

function SeverityBadge({ sev, lang = "fr" }: { sev: string; lang?: string }) {
  return <Text style={severityBadgeStyle(sev)}>{severityLabel(sev, lang)}</Text>
}

// ---------------------------------------------------------------------------
// Risk matrix
// ---------------------------------------------------------------------------
function RiskMatrix() {
  const rows: Array<{ label: string; cells: Array<{ text: string; style: any; textStyle: any }> }> = [
    {
      label: "Faible",
      cells: [
        { text: "Faible", style: base.matrixCellLow, textStyle: base.matrixCellTextLow },
        { text: "Faible", style: base.matrixCellLow, textStyle: base.matrixCellTextLow },
        { text: "Moyen", style: base.matrixCellMed, textStyle: base.matrixCellTextMed },
      ],
    },
    {
      label: "Modérée",
      cells: [
        { text: "Faible", style: base.matrixCellLow, textStyle: base.matrixCellTextLow },
        { text: "Moyen", style: base.matrixCellMed, textStyle: base.matrixCellTextMed },
        { text: "Élevé", style: base.matrixCellHigh, textStyle: base.matrixCellTextHigh },
      ],
    },
    {
      label: "Grave",
      cells: [
        { text: "Moyen", style: base.matrixCellMed, textStyle: base.matrixCellTextMed },
        { text: "Élevé", style: base.matrixCellHigh, textStyle: base.matrixCellTextHigh },
        { text: "Critique", style: base.matrixCellCrit, textStyle: base.matrixCellTextCrit },
      ],
    },
  ]

  return (
    <View style={base.matrixContainer}>
      <View style={base.matrixHeaderRow}>
        <View style={[base.matrixLabelCell, { backgroundColor: BLUE, borderRight: "1 solid #3b82f6" }]}>
          <Text style={[base.matrixHeaderText, { fontSize: 6.5, textAlign: "left" }]}>Gravité ↓ / Probabilité →</Text>
        </View>
        {["Improbable", "Possible", "Probable"].map((h) => (
          <View key={h} style={base.matrixHeaderCell}>
            <Text style={base.matrixHeaderText}>{h}</Text>
          </View>
        ))}
      </View>
      {rows.map(({ label, cells }) => (
        <View key={label} style={base.matrixRow}>
          <View style={base.matrixLabelCell}>
            <Text style={base.matrixLabelText}>{label}</Text>
          </View>
          {cells.map(({ text, style, textStyle }, ci) => (
            <View key={ci} style={style}>
              <Text style={textStyle}>{text}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

// ---------------------------------------------------------------------------
// TECHNICAL FILE PDF — 8+ pages
// ---------------------------------------------------------------------------
export function TechnicalFilePDF({
  product,
  org,
  rp,
  riskAssessment,
  technicalFile,
  language = "fr",
  watermarked = true,
  branded = true,
}: PDFProps) {
  const ra = (riskAssessment?.content_json ?? {}) as any
  const tf = (technicalFile?.content_json ?? {}) as any
  const category = product?.product_categories
  const docRef = buildDocRef(product?.id ?? "", "DTF")
  const genDate = todayStr()

  // Data arrays
  const hazards: any[] = ra.hazards ?? []
  const mitigations: any[] = ra.mitigation_measures ?? []
  const rawStds = ra.referenced_standards ?? []
  const standards: string[] = rawStds.map((s: any) =>
    typeof s === "string" ? s : `${s?.code ?? ""}${s?.title ? ` — ${s.title}` : ""}${s?.status ? ` [${s.status}]` : ""}`
  )
  const requiredTests: any[] = ra.required_tests ?? []
  const residualRisks: any[] = ra.residual_risks ?? []
  const bomComponents: any[] = tf.bom_components ?? []
  // AI-generated technical file sections
  const aiSections: any[] = tf.technical_file_sections ?? ra.technical_file_sections ?? tf.sections ?? []

  // Translation map
  const T: Record<string, Record<string, string>> = {
    fr: {
      docTitle: "DOSSIER TECHNIQUE GPSR",
      reg: "Règlement (UE) 2023/988 sur la sécurité générale des produits",
      classification: "DOCUMENT CONFIDENTIEL — NON VALIDÉ",
      classificationOk: "DOCUMENT OFFICIEL",
      product: "Produit",
      refLabel: "Référence / Modèle",
      category: "Catégorie",
      intendedUse: "Usage prévu",
      materials: "Matériaux",
      weight: "Poids",
      markets: "Marchés cibles",
      docRef: "Référence document",
      version: "Version",
      docDate: "Date",
      rpTitle: "Personne Responsable",
      orgTitle: "Organisation",
      society: "Société",
      address: "Adresse",
      email: "Email",
      phone: "Téléphone",
      type: "Qualité",
      country: "Pays",
    },
    en: {
      docTitle: "GPSR TECHNICAL FILE",
      reg: "Regulation (EU) 2023/988 on General Product Safety",
      classification: "CONFIDENTIAL DOCUMENT — NOT VALIDATED",
      classificationOk: "OFFICIAL DOCUMENT",
      product: "Product",
      refLabel: "Reference / Model",
      category: "Category",
      intendedUse: "Intended use",
      materials: "Materials",
      weight: "Weight",
      markets: "Target markets",
      docRef: "Document reference",
      version: "Version",
      docDate: "Date",
      rpTitle: "Responsible Person",
      orgTitle: "Organisation",
      society: "Company",
      address: "Address",
      email: "Email",
      phone: "Phone",
      type: "Capacity",
      country: "Country",
    },
    de: {
      docTitle: "GPSR TECHNISCHE UNTERLAGE",
      reg: "Verordnung (EU) 2023/988 über die allgemeine Produktsicherheit",
      classification: "VERTRAULICH — NICHT VALIDIERT",
      classificationOk: "OFFIZIELLES DOKUMENT",
      product: "Produkt",
      refLabel: "Referenz / Modell",
      category: "Kategorie",
      intendedUse: "Bestimmungsgemäßer Gebrauch",
      materials: "Materialien",
      weight: "Gewicht",
      markets: "Zielmärkte",
      docRef: "Dokumentreferenz",
      version: "Version",
      docDate: "Datum",
      rpTitle: "Verantwortliche Person",
      orgTitle: "Organisation",
      society: "Unternehmen",
      address: "Adresse",
      email: "E-Mail",
      phone: "Telefon",
      type: "Eigenschaft",
      country: "Land",
    },
  }
  const lbl = T[language] ?? T.fr

  // Helper: find AI section content by key words
  function aiSectionContent(key: string): string {
    const section = aiSections.find(
      (s: any) =>
        (s.key ?? "").toLowerCase().includes(key) ||
        (s.id ?? "").toLowerCase().includes(key) ||
        (s.section ?? "").toLowerCase().includes(key) ||
        (s.title ?? "").toLowerCase().includes(key)
    )
    return section?.content ?? section?.text ?? ""
  }

  return (
    <Document title={`Dossier technique — ${product?.name ?? "Produit"}`}>

      {/* ===================================================================
          PAGE 1 — COVER
          =================================================================== */}
      <Page size="A4" style={[base.page, { paddingTop: 0, paddingBottom: 0 }]}>
        {watermarked ? <WatermarkText /> : null}

        {/* Blue top band */}
        <View style={base.coverTopBand}>
          {branded ? (
            <View style={base.coverLogoRow}>
              <View style={base.coverLogoBox}>
                <Text style={base.coverLogoLetter}>C</Text>
              </View>
              <Text style={base.coverAppName}>Conforva</Text>
            </View>
          ) : null}
          <Text style={base.coverTitle}>{lbl.docTitle}</Text>
          <Text style={base.coverSubtitle}>{lbl.reg}</Text>
        </View>

        {/* Body */}
        <View style={{ paddingHorizontal: 48, paddingBottom: 48 }}>
          {/* Meta info box */}
          <View style={base.coverBox}>
            <View style={base.coverRow}>
              <Text style={base.coverLabel}>{lbl.product}</Text>
              <Text style={base.coverValue}>{product?.name ?? "N/A"}</Text>
            </View>
            <View style={base.coverRow}>
              <Text style={base.coverLabel}>{lbl.refLabel}</Text>
              <Text style={base.coverValue}>{product?.reference ?? "N/A"}</Text>
            </View>
            <View style={base.coverRow}>
              <Text style={base.coverLabel}>{lbl.category}</Text>
              <Text style={base.coverValue}>{language === "en" ? (category?.name_en ?? category?.name_fr ?? "N/A") : (category?.name_fr ?? "N/A")}</Text>
            </View>
            <View style={base.coverRow}>
              <Text style={base.coverLabel}>{lbl.docRef}</Text>
              <Text style={base.coverValue}>{docRef}</Text>
            </View>
            <View style={base.coverRow}>
              <Text style={base.coverLabel}>{lbl.version}</Text>
              <Text style={base.coverValue}>{riskAssessment?.version ?? 1}.0</Text>
            </View>
            <View style={base.coverRow}>
              <Text style={base.coverLabel}>{lbl.docDate}</Text>
              <Text style={base.coverValue}>{genDate}</Text>
            </View>
            <View style={[base.coverRow, { marginBottom: 0 }]}>
              <Text style={base.coverLabel}>Classification</Text>
              <Text style={base.coverValue}>{watermarked ? lbl.classification : lbl.classificationOk}</Text>
            </View>
          </View>

          {/* Classification badge */}
          {watermarked ? (
            <View style={base.coverBadgeRow}>
              <View style={base.coverBadge}>
                <Text style={base.coverBadgeText}>BROUILLON — NON VALIDÉ</Text>
              </View>
              <Text style={base.coverBadgeNote}>
                Généré par Conforva (aide à la conformité). Doit être validé par un expert qualifié avant toute mise sur le marché.
              </Text>
            </View>
          ) : null}

          {/* Table of contents */}
          <H1>Sommaire</H1>
          {[
            "Description générale du produit",
            "Usage prévu et utilisation prévisible abusive",
            "Fabricant et chaîne d'approvisionnement",
            "Normes et réglementations applicables",
            "Évaluation des risques — Méthodologie",
            "Dangers identifiés",
            "Mesures de mitigation",
            "Risques résiduels",
            "Tests et essais requis",
            "Marquage et étiquetage",
            "Instructions d'utilisation",
            "Substances réglementées (REACH / CLP / RoHS)",
            "Traçabilité",
            "Exigences par marché",
            "Conclusion et recommandations",
          ].map((entry, i) => (
            <View key={i} style={base.tocEntry}>
              <Text style={base.tocNum}>{i + 1}.</Text>
              <Text style={base.tocText}>{entry}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* ===================================================================
          PAGE 2 — SECTIONS 1–3: Description / Usage / Fabricant
          =================================================================== */}
      <Page size="A4" style={base.page}>
        {watermarked ? <WatermarkText /> : null}
        <PageHeader docRef={docRef} productName={product?.name ?? "N/A"} branded={branded} />

        {/* Section 1 */}
        <H1>1. Description générale du produit</H1>
        {aiSectionContent("description") ? (
          <Text style={[base.body, { marginBottom: 8 }]}>{aiSectionContent("description")}</Text>
        ) : null}
        <Row label={lbl.product} value={product?.name ?? "N/A"} />
        <Row label={lbl.refLabel} value={product?.reference ?? "N/A"} />
        <Row label={lbl.category} value={category?.name_fr ?? "N/A"} />
        <Row label={lbl.materials} value={product?.materials?.join(", ") ?? "N/A"} />
        {product?.weight_g ? <Row label={lbl.weight} value={`${product.weight_g} g`} /> : null}
        <Row label={lbl.markets} value={product?.target_markets?.join(", ") ?? "UE"} />
        {product?.description ? (
          <View>
            <H2>Description détaillée</H2>
            <Text style={base.body}>{product.description}</Text>
          </View>
        ) : null}
        {ra.product_description ? (
          <View>
            <H2>Description technique</H2>
            <Text style={base.body}>{ra.product_description}</Text>
          </View>
        ) : null}

        {/* Section 1.2 — BOM */}
        <View style={{ marginTop: 14 }} wrap={false}>
          <H2>1.2 Nomenclature (BOM) — Liste des composants</H2>
          {bomComponents.length > 0 ? (
            <View style={base.tbl}>
              <View style={base.tblHeaderRow}>
                <View style={[base.tblHeaderCell, { flex: 2 }]}>
                  <Text style={base.tblHeaderText}>Composant</Text>
                </View>
                <View style={[base.tblHeaderCell, { flex: 1.5 }]}>
                  <Text style={base.tblHeaderText}>Matériau</Text>
                </View>
                <View style={[base.tblHeaderCell, { flex: 1.5 }]}>
                  <Text style={base.tblHeaderText}>Fournisseur</Text>
                </View>
                <View style={[base.tblHeaderCell, { flex: 1, borderRight: 0 }]}>
                  <Text style={base.tblHeaderText}>Réf. pièce</Text>
                </View>
              </View>
              {bomComponents.map((bom: any, i: number) => (
                <View key={i} style={base.tblRow} wrap={false}>
                  <View style={[base.tblCell, { flex: 2 }]}>
                    <Text style={[base.tblCellText, { fontFamily: "Helvetica-Bold", color: DARK }]}>{bom.component ?? "—"}</Text>
                  </View>
                  <View style={[base.tblCell, { flex: 1.5 }]}>
                    <Text style={base.tblCellText}>{bom.material || "N/A"}</Text>
                  </View>
                  <View style={[base.tblCell, { flex: 1.5 }]}>
                    <Text style={base.tblCellText}>{bom.supplier || "N/A"}</Text>
                  </View>
                  <View style={[base.tblCell, { flex: 1, borderRight: 0 }]}>
                    <Text style={base.tblCellText}>{bom.part_number || "N/A"}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={base.infoBox}>
              <Text style={base.infoBoxText}>
                Nomenclature non renseignée. Complétez le questionnaire produit (étape Nomenclature) pour faire apparaître la liste détaillée des composants dans ce dossier.
              </Text>
            </View>
          )}
        </View>

        {/* Section 2 */}
        <View style={{ marginTop: 18 }}>
          <H1>2. Usage prévu et utilisation prévisible abusive</H1>
          {aiSectionContent("usage") ? (
            <Text style={[base.body, { marginBottom: 8 }]}>{aiSectionContent("usage")}</Text>
          ) : null}
          <Row label={lbl.intendedUse} value={product?.intended_use ?? "N/A"} />
          <Row label="Utilisateurs cibles" value={product?.target_users ?? ra.target_users ?? "Grand public"} />
          {ra.foreseeable_misuse ? (
            <View>
              <H2>Utilisation prévisible abusive</H2>
              <Text style={base.body}>{ra.foreseeable_misuse}</Text>
            </View>
          ) : null}
          {ra.vulnerable_groups ? (
            <View>
              <H2>Groupes vulnérables concernés</H2>
              <Text style={base.body}>{ra.vulnerable_groups}</Text>
            </View>
          ) : null}
        </View>

        {/* Section 3 */}
        <View style={{ marginTop: 18 }}>
          <H1>3. Fabricant et chaîne d'approvisionnement</H1>
          {aiSectionContent("fabricant") ? (
            <Text style={[base.body, { marginBottom: 8 }]}>{aiSectionContent("fabricant")}</Text>
          ) : null}
          <H2>{rp ? lbl.rpTitle : lbl.orgTitle}</H2>
          {rp ? (
            <View>
              <Row label={lbl.society} value={rp.company_name ?? "N/A"} />
              <Row label={lbl.address} value={`${rp.address_line ?? ""}, ${rp.postal_code ?? ""} ${rp.city ?? ""}, ${rp.country_eu ?? ""}`.replace(/^,\s*/, "")} />
              <Row label={lbl.email} value={rp.email ?? "N/A"} />
              {rp.phone ? <Row label={lbl.phone} value={rp.phone} /> : null}
              <Row label={lbl.type} value={rp.type === "importer" ? "Importateur / Personne Responsable UE" : "Représentant Autorisé UE"} />
            </View>
          ) : (
            <View>
              <Row label={lbl.society} value={org?.name ?? "N/A"} />
              <Row label={lbl.country} value={org?.country ?? "N/A"} />
            </View>
          )}
          {org?.name && rp ? (
            <View>
              <H2>Donneur d'ordre</H2>
              <Row label={lbl.society} value={org.name} />
              <Row label={lbl.country} value={org.country ?? "N/A"} />
            </View>
          ) : null}
          {ra.supply_chain ? (
            <View>
              <H2>Chaîne d'approvisionnement</H2>
              <Text style={base.body}>{ra.supply_chain}</Text>
            </View>
          ) : null}
        </View>

        <PageFooter language={language} branded={branded} />
      </Page>

      {/* ===================================================================
          PAGE 3 — SECTION 4: Normes et réglementations
          =================================================================== */}
      <Page size="A4" style={base.page}>
        {watermarked ? <WatermarkText /> : null}
        <PageHeader docRef={docRef} productName={product?.name ?? "N/A"} branded={branded} />

        <H1>4. Normes et réglementations applicables</H1>
        {aiSectionContent("norme") ? (
          <Text style={[base.body, { marginBottom: 10 }]}>{aiSectionContent("norme")}</Text>
        ) : null}

        <H2>Réglementations de base</H2>
        <View style={base.tbl}>
          <View style={base.tblHeaderRow}>
            <View style={[base.tblNumCell, { backgroundColor: BLUE_BG }]}>
              <Text style={base.tblHeaderText}>#</Text>
            </View>
            <View style={[base.tblHeaderCell, { flex: 2 }]}>
              <Text style={base.tblHeaderText}>Réglementation</Text>
            </View>
            <View style={[base.tblHeaderCell, { flex: 1 }]}>
              <Text style={base.tblHeaderText}>Statut</Text>
            </View>
          </View>
          {[
            { ref: "Règl. (UE) 2023/988", desc: "Sécurité générale des produits (GPSR)", status: "Applicable" },
            { ref: "Règl. (CE) 1907/2006", desc: "REACH — substances chimiques", status: "À vérifier" },
            { ref: "Règl. (CE) 1272/2008", desc: "CLP — classification et étiquetage", status: "À vérifier" },
            { ref: "Dir. 2011/65/UE (RoHS 2)", desc: "Restriction des substances dangereuses", status: "À vérifier" },
            { ref: "Règl. (UE) 2019/1020", desc: "Surveillance du marché", status: "Applicable" },
          ].map(({ ref: rRef, desc, status }, i) => (
            <View key={i} style={base.tblRow}>
              <View style={base.tblNumCell}>
                <Text style={base.tblNumText}>{i + 1}</Text>
              </View>
              <View style={[base.tblCell, { flex: 2 }]}>
                <Text style={[base.tblCellText, { fontFamily: "Helvetica-Bold", color: DARK }]}>{rRef}</Text>
                <Text style={base.tblCellText}>{desc}</Text>
              </View>
              <View style={[base.tblCell, { flex: 1 }]}>
                <Text style={[base.tblCellText, {
                  color: status === "Applicable" ? GREEN_TEXT : AMBER_TEXT,
                  fontFamily: "Helvetica-Bold",
                }]}>{status}</Text>
              </View>
            </View>
          ))}
        </View>

        {standards.length > 0 ? (
          <View>
            <H2>Normes harmonisées et documents techniques</H2>
            <View style={base.tbl}>
              <View style={base.tblHeaderRow}>
                <View style={[base.tblNumCell, { backgroundColor: BLUE_BG }]}>
                  <Text style={base.tblHeaderText}>#</Text>
                </View>
                <View style={base.tblHeaderCell}>
                  <Text style={base.tblHeaderText}>Référence de la norme</Text>
                </View>
              </View>
              {standards.map((s: string, i: number) => (
                <View key={i} style={base.tblRow}>
                  <View style={base.tblNumCell}>
                    <Text style={base.tblNumText}>{i + 1}</Text>
                  </View>
                  <View style={base.tblCell}>
                    <Text style={base.tblCellText}>{s}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={base.warnBox}>
            <Text style={base.warnBoxText}>
              Aucune norme harmonisée identifiée automatiquement. Une recherche dans le Journal officiel de l'UE est recommandée.
            </Text>
          </View>
        )}

        {/* Market-specific requirements */}
        {ra.market_specific_requirements ? (
          <View>
            <H2>Exigences spécifiques par marché</H2>
            {Object.entries(ra.market_specific_requirements)
              .filter(([, req]: [string, any]) => req?.applicable)
              .map(([market, req]: [string, any]) => (
                <View key={market} style={{ marginBottom: 9 }} wrap={false}>
                  <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: DARK, marginBottom: 3 }}>
                    {market} — {req.regulation}
                  </Text>
                  {(req.specific_requirements ?? []).map((r: string, i: number) => (
                    <View key={i} style={{ flexDirection: "row", marginBottom: 2 }}>
                      <Text style={{ width: 12, color: BLUE }}>–</Text>
                      <Text style={{ flex: 1, fontSize: 8 }}>{r}</Text>
                    </View>
                  ))}
                </View>
              ))}
          </View>
        ) : null}

        <PageFooter language={language} branded={branded} />
      </Page>

      {/* ===================================================================
          PAGE 4 — SECTIONS 5–6: Méthodologie + Risk matrix + Hazards
          =================================================================== */}
      <Page size="A4" style={base.page}>
        {watermarked ? <WatermarkText /> : null}
        <PageHeader docRef={docRef} productName={product?.name ?? "N/A"} branded={branded} />

        {/* Section 5 */}
        <H1>5. Évaluation des risques — Méthodologie</H1>
        {aiSectionContent("methodologie") || aiSectionContent("methodology") ? (
          <Text style={base.body}>{aiSectionContent("methodologie") || aiSectionContent("methodology")}</Text>
        ) : (
          <Text style={base.body}>
            L'évaluation des risques a été conduite conformément aux principes généraux du
            Règlement (UE) 2023/988 (GPSR) et aux méthodes de l'ISO 31000 (Management du risque)
            et de l'EN ISO 12100 (Appréciation du risque). Chaque danger est caractérisé selon sa
            nature, sa probabilité d'occurrence et la gravité du dommage potentiel pour calculer
            un niveau de risque initial. Des mesures de mitigation sont définies; le risque
            résiduel est ensuite évalué et documenté.
          </Text>
        )}
        {ra.risk_assessment_methodology ? (
          <Text style={[base.body, { marginTop: 6 }]}>{ra.risk_assessment_methodology}</Text>
        ) : null}

        <H2>Matrice de criticité (Gravité × Probabilité)</H2>
        <RiskMatrix />
        <View style={{ flexDirection: "row", marginTop: 6, marginBottom: 4 }}>
          {[
            { label: "Faible", bg: GREEN_BG, color: GREEN_TEXT },
            { label: "Moyen", bg: AMBER_BG, color: AMBER_TEXT },
            { label: "Élevé", bg: RED_BG, color: RED_TEXT },
            { label: "Critique", bg: "#7f1d1d", color: "#ffffff" },
          ].map(({ label, bg, color }) => (
            <View key={label} style={{ flexDirection: "row", alignItems: "center", marginRight: 14 }}>
              <View style={{ width: 9, height: 9, backgroundColor: bg, borderRadius: 2, marginRight: 4 }} />
              <Text style={{ fontSize: 7, color: MID }}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Section 6 */}
        <View style={{ marginTop: 16 }}>
          <H1>6. Dangers identifiés</H1>
          {aiSectionContent("danger") || aiSectionContent("hazard") ? (
            <Text style={[base.body, { marginBottom: 8 }]}>
              {aiSectionContent("danger") || aiSectionContent("hazard")}
            </Text>
          ) : null}
          {hazards.length === 0 ? (
            <View style={base.infoBox}>
              <Text style={base.infoBoxText}>Aucun danger identifié dans cette évaluation.</Text>
            </View>
          ) : (
            hazards.slice(0, 3).map((h: any, i: number) => (
              <View key={i} style={hazardCardStyle(h.severity)} wrap={false}>
                <View style={base.hazardHeader}>
                  <Text style={base.hazardTitle}>
                    {h.id ? `${h.id} — ` : ""}{h.title ?? h.name ?? `Danger ${i + 1}`}
                  </Text>
                  <SeverityBadge sev={h.severity ?? "low"} lang={language} />
                </View>
                <Text style={base.hazardDesc}>{h.description ?? ""}</Text>
                {h.severity_justification ? (
                  <Text style={{ fontSize: 7.5, color: GRAY, marginBottom: 2 }}>
                    Justification : {h.severity_justification}
                  </Text>
                ) : null}
                {h.exposure_conditions ? (
                  <Text style={{ fontSize: 7.5, color: GRAY, marginBottom: 2 }}>
                    Conditions : {h.exposure_conditions}
                  </Text>
                ) : null}
                <View style={base.hazardMeta}>
                  {h.probability ? (
                    <View style={base.hazardMetaItem}>
                      <Text style={base.hazardMetaLabel}>Probabilité :</Text>
                      <Text style={base.hazardMetaValue}>{h.probability}</Text>
                    </View>
                  ) : null}
                  {h.risk_level ? (
                    <View style={base.hazardMetaItem}>
                      <Text style={base.hazardMetaLabel}>Niveau :</Text>
                      <Text style={base.hazardMetaValue}>{h.risk_level}</Text>
                    </View>
                  ) : null}
                  {h.affected_users?.length > 0 ? (
                    <View style={base.hazardMetaItem}>
                      <Text style={base.hazardMetaLabel}>Utilisateurs :</Text>
                      <Text style={base.hazardMetaValue}>{h.affected_users.join(", ")}</Text>
                    </View>
                  ) : null}
                </View>
                {h.referenced_standards?.length > 0 ? (
                  <Text style={{ fontSize: 7.5, color: BLUE, marginTop: 3 }}>
                    {h.referenced_standards.join(" · ")}
                  </Text>
                ) : null}
              </View>
            ))
          )}
        </View>

        <PageFooter language={language} branded={branded} />
      </Page>

      {/* ===================================================================
          PAGE 5 — SECTION 6 suite (remaining hazards)
          =================================================================== */}
      {hazards.length > 3 ? (
        <Page size="A4" style={base.page}>
          {watermarked ? <WatermarkText /> : null}
          <PageHeader docRef={docRef} productName={product?.name ?? "N/A"} branded={branded} />
          <H1>6. Dangers identifiés (suite)</H1>
          {hazards.slice(3).map((h: any, i: number) => (
            <View key={i} style={hazardCardStyle(h.severity)} wrap={false}>
              <View style={base.hazardHeader}>
                <Text style={base.hazardTitle}>
                  {h.id ? `${h.id} — ` : ""}{h.title ?? h.name ?? `Danger ${i + 4}`}
                </Text>
                <SeverityBadge sev={h.severity ?? "low"} lang={language} />
              </View>
              <Text style={base.hazardDesc}>{h.description ?? ""}</Text>
              {h.severity_justification ? (
                <Text style={{ fontSize: 7.5, color: GRAY, marginBottom: 2 }}>
                  Justification : {h.severity_justification}
                </Text>
              ) : null}
              {h.exposure_conditions ? (
                <Text style={{ fontSize: 7.5, color: GRAY, marginBottom: 2 }}>
                  Conditions : {h.exposure_conditions}
                </Text>
              ) : null}
              <View style={base.hazardMeta}>
                {h.probability ? (
                  <View style={base.hazardMetaItem}>
                    <Text style={base.hazardMetaLabel}>Probabilité :</Text>
                    <Text style={base.hazardMetaValue}>{h.probability}</Text>
                  </View>
                ) : null}
                {h.risk_level ? (
                  <View style={base.hazardMetaItem}>
                    <Text style={base.hazardMetaLabel}>Niveau :</Text>
                    <Text style={base.hazardMetaValue}>{h.risk_level}</Text>
                  </View>
                ) : null}
              </View>
              {h.referenced_standards?.length > 0 ? (
                <Text style={{ fontSize: 7.5, color: BLUE, marginTop: 3 }}>
                  {h.referenced_standards.join(" · ")}
                </Text>
              ) : null}
            </View>
          ))}
          <PageFooter language={language} branded={branded} />
        </Page>
      ) : null}

      {/* ===================================================================
          PAGE 6 — SECTION 7: Mesures de mitigation
          =================================================================== */}
      <Page size="A4" style={base.page}>
        {watermarked ? <WatermarkText /> : null}
        <PageHeader docRef={docRef} productName={product?.name ?? "N/A"} branded={branded} />

        <H1>7. Mesures de mitigation</H1>
        {aiSectionContent("mitigation") ? (
          <Text style={[base.body, { marginBottom: 10 }]}>{aiSectionContent("mitigation")}</Text>
        ) : null}

        {mitigations.length === 0 ? (
          <View style={base.warnBox}>
            <Text style={base.warnBoxText}>
              Aucune mesure de mitigation générée. Des mesures doivent être définies pour chaque danger identifié.
            </Text>
          </View>
        ) : (
          mitigations.map((m: any, i: number) => (
            <View key={i} style={base.mitigationItem} wrap={false}>
              <Text style={base.mitigationCheck}>{m.priority === "mandatory" ? "!" : "✓"}</Text>
              <View style={base.mitigationContent}>
                <Text style={base.mitigationMeasure}>
                  {m.measure ?? m.description ?? m.text ?? `Mesure ${i + 1}`}
                </Text>
                {m.implementation_details ? (
                  <Text style={base.mitigationDetail}>{m.implementation_details}</Text>
                ) : null}
                <Text style={base.mitigationMeta}>
                  {[
                    m.type,
                    m.priority === "mandatory" ? "Obligatoire" : m.priority === "recommended" ? "Recommandé" : m.priority,
                    m.norm_reference,
                  ].filter(Boolean).join(" · ")}
                </Text>
              </View>
            </View>
          ))
        )}

        {/* Section 8 — Risques résiduels */}
        <View style={{ marginTop: 18 }}>
          <H1>8. Risques résiduels</H1>
          {aiSectionContent("residuel") || aiSectionContent("residual") ? (
            <Text style={[base.body, { marginBottom: 10 }]}>
              {aiSectionContent("residuel") || aiSectionContent("residual")}
            </Text>
          ) : null}

          {residualRisks.length > 0 ? (
            residualRisks.map((r: any, i: number) => (
              <View key={i} style={base.mitigationItem} wrap={false}>
                <Text style={[base.mitigationCheck, { color: AMBER_TEXT }]}>→</Text>
                <View style={base.mitigationContent}>
                  <Text style={base.mitigationMeasure}>
                    {r.hazard_id ? `[${r.hazard_id}] ` : ""}{r.title ?? r.description ?? `Risque résiduel ${i + 1}`}
                  </Text>
                  {r.description && r.title ? (
                    <Text style={base.mitigationDetail}>{r.description}</Text>
                  ) : null}
                  <Text style={base.mitigationMeta}>
                    {[r.acceptability, r.mitigation_applied].filter(Boolean).join(" · ")}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={base.infoBox}>
              <Text style={base.infoBoxText}>
                Après application des mesures de mitigation, les risques résiduels sont jugés acceptables. Ils doivent être communiqués à l'utilisateur via l'étiquetage et la documentation produit.
              </Text>
            </View>
          )}

          {ra.summary ? (
            <View>
              <H2>Synthèse de l'évaluation</H2>
              <Text style={base.body}>{ra.summary}</Text>
              {ra.overall_severity ? (
                <View style={{ flexDirection: "row", marginTop: 6, alignItems: "center" }}>
                  <Text style={{ fontSize: 8.5, color: GRAY, marginRight: 8 }}>Niveau de risque global :</Text>
                  <SeverityBadge sev={ra.overall_severity} lang={language} />
                </View>
              ) : null}
            </View>
          ) : null}
        </View>

        <PageFooter language={language} branded={branded} />
      </Page>

      {/* ===================================================================
          PAGE 7 — SECTION 9: Tests requis
          =================================================================== */}
      <Page size="A4" style={base.page}>
        {watermarked ? <WatermarkText /> : null}
        <PageHeader docRef={docRef} productName={product?.name ?? "N/A"} branded={branded} />

        <H1>9. Tests et essais requis</H1>
        {aiSectionContent("tests") ? (
          <Text style={[base.body, { marginBottom: 10 }]}>{aiSectionContent("tests")}</Text>
        ) : null}

        {requiredTests.length === 0 ? (
          <View style={base.warnBox}>
            <Text style={base.warnBoxText}>
              Aucun test identifié automatiquement. Se référer aux normes harmonisées applicables pour déterminer les essais requis.
            </Text>
          </View>
        ) : (
          requiredTests.map((item: any, i: number) => {
            const isObj = typeof item === "object" && item !== null
            const testName = isObj ? (item.test ?? item.name ?? item.description ?? `Test ${i + 1}`) : item
            const testStd = isObj ? (item.standard ?? item.norm ?? "") : ""
            const labAccred = isObj ? (item.laboratory_accreditation ?? "") : ""
            const mandatory = isObj ? (item.mandatory !== false) : true
            return (
              <View key={i} style={base.testItem} wrap={false}>
                <View style={mandatory ? base.testDotMandatory : base.testDotOptional} />
                <View style={{ flex: 1 }}>
                  <Text style={base.testName}>{testName}</Text>
                  {testStd ? <Text style={base.testStd}>Norme : {testStd}{labAccred ? ` · ${labAccred}` : ""}</Text> : null}
                </View>
                <Text style={[base.testTag, { color: mandatory ? BLUE : GRAY }]}>
                  {mandatory ? "OBLIGATOIRE" : "RECOMMANDÉ"}
                </Text>
              </View>
            )
          })
        )}

        {/* Section 10 — Marquage */}
        <View style={{ marginTop: 20 }}>
          <H1>10. Marquage et étiquetage</H1>
          {aiSectionContent("marquage") || aiSectionContent("labeling") ? (
            <Text style={[base.body, { marginBottom: 8 }]}>
              {aiSectionContent("marquage") || aiSectionContent("labeling")}
            </Text>
          ) : (
            <Text style={[base.body, { marginBottom: 8 }]}>
              Conformément à l'Article 19 du Règlement (UE) 2023/988, le produit doit porter les informations suivantes de manière lisible et durable :
            </Text>
          )}
          <BulletList items={[
            "Nom et adresse du fabricant ou de la personne responsable UE",
            "Nom du produit ou référence permettant l'identification",
            "Numéro de lot ou de série",
            "Avertissements de sécurité si applicables",
            "Marquage CE si requis par la réglementation sectorielle",
            "Instructions d'utilisation dans la langue du pays de vente",
          ]} />
        </View>

        {/* Section 11 — Instructions */}
        <View style={{ marginTop: 16 }}>
          <H1>11. Instructions d'utilisation</H1>
          {aiSectionContent("instruction") ? (
            <Text style={[base.body, { marginBottom: 8 }]}>{aiSectionContent("instruction")}</Text>
          ) : null}
          <BulletList items={[
            "Rédigées dans la langue officielle du pays de commercialisation",
            "Consignes de sécurité, précautions d'emploi et conditions de stockage",
            "Avertissements pour groupes vulnérables (enfants, personnes âgées)",
            "Durée de vie du produit et conditions de fin de vie / recyclage",
            "Contact fabricant et service après-vente",
          ]} />
          {product?.instructions_url ? (
            <Row label="URL des instructions" value={product.instructions_url} />
          ) : null}
        </View>

        <PageFooter language={language} branded={branded} />
      </Page>

      {/* ===================================================================
          PAGE 8 — SECTIONS 12–15: Substances / Traçabilité / Marchés / Conclusion
          =================================================================== */}
      <Page size="A4" style={base.page}>
        {watermarked ? <WatermarkText /> : null}
        <PageHeader docRef={docRef} productName={product?.name ?? "N/A"} branded={branded} />

        {/* Section 12 */}
        <H1>12. Substances réglementées (REACH / CLP / RoHS)</H1>
        {aiSectionContent("substance") || aiSectionContent("reach") ? (
          <Text style={[base.body, { marginBottom: 8 }]}>
            {aiSectionContent("substance") || aiSectionContent("reach")}
          </Text>
        ) : null}
        <View style={base.tbl}>
          <View style={base.tblHeaderRow}>
            <View style={[base.tblHeaderCell, { flex: 2 }]}>
              <Text style={base.tblHeaderText}>Réglementation</Text>
            </View>
            <View style={[base.tblHeaderCell, { flex: 2 }]}>
              <Text style={base.tblHeaderText}>Obligation principale</Text>
            </View>
            <View style={[base.tblHeaderCell, { flex: 1 }]}>
              <Text style={base.tblHeaderText}>Statut</Text>
            </View>
          </View>
          {[
            { reg: "REACH (CE 1907/2006)", obl: "Déclaration SVHC > 0,1 % m/m", status: "À vérifier" },
            { reg: "CLP (CE 1272/2008)", obl: "Classification et étiquetage", status: "À vérifier" },
            { reg: "RoHS 2 (2011/65/UE)", obl: "Restriction Pb, Hg, Cd, Cr6+…", status: "À vérifier" },
            { reg: "Règl. (UE) 2019/1020", obl: "Surveillance du marché", status: "Applicable" },
          ].map(({ reg, obl, status }, i) => (
            <View key={i} style={base.tblRow}>
              <View style={[base.tblCell, { flex: 2 }]}>
                <Text style={[base.tblCellText, { fontFamily: "Helvetica-Bold", color: DARK }]}>{reg}</Text>
              </View>
              <View style={[base.tblCell, { flex: 2 }]}>
                <Text style={base.tblCellText}>{obl}</Text>
              </View>
              <View style={[base.tblCell, { flex: 1 }]}>
                <Text style={[base.tblCellText, {
                  color: status === "Applicable" ? GREEN_TEXT : AMBER_TEXT,
                  fontFamily: "Helvetica-Bold",
                }]}>{status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Section 13 */}
        <View style={{ marginTop: 16 }}>
          <H1>13. Traçabilité</H1>
          {aiSectionContent("tracabilite") || aiSectionContent("traceability") ? (
            <Text style={[base.body, { marginBottom: 8 }]}>
              {aiSectionContent("tracabilite") || aiSectionContent("traceability")}
            </Text>
          ) : null}
          <BulletList items={[
            "Identification par numéro de lot ou de série",
            "Registre des fournisseurs et sous-traitants conservé 10 ans",
            "Registre des réclamations et incidents de sécurité",
            "Procédure de rappel produit documentée",
            "Enregistrements de contrôle qualité conservés pendant la durée réglementaire",
          ]} />
          {product?.batch_number || product?.serial_number ? (
            <View>
              {product?.batch_number ? <Row label="N° de lot" value={product.batch_number} /> : null}
              {product?.serial_number ? <Row label="N° de série" value={product.serial_number} /> : null}
            </View>
          ) : null}
        </View>

        {/* Section 14 */}
        <View style={{ marginTop: 16 }}>
          <H1>14. Exigences par marché</H1>
          {(product?.target_markets ?? []).length > 0 ? (
            <View style={base.tbl}>
              <View style={base.tblHeaderRow}>
                <View style={[base.tblHeaderCell, { flex: 1 }]}>
                  <Text style={base.tblHeaderText}>Marché</Text>
                </View>
                <View style={[base.tblHeaderCell, { flex: 3 }]}>
                  <Text style={base.tblHeaderText}>Exigences spécifiques</Text>
                </View>
              </View>
              {(product.target_markets as string[]).map((market: string, i: number) => {
                const mReqs: Record<string, string> = {
                  FR: "Documentation en français, conformité GPSR obligatoire",
                  DE: "Documentation en allemand, GPSR + normes DIN",
                  IT: "Documentation en italien, GPSR + normes UNI",
                  ES: "Documentation en espagnol, GPSR + normes UNE",
                  UK: "UKCA marking post-Brexit, UK Product Security Regulation",
                  US: "CPSC regulations, ASTM standards, FCC si applicable",
                  JP: "PSE marking, JIS standards, Electrical Appliance Act",
                  CN: "CCC certification, normes GB, enregistrement CNCA",
                }
                return (
                  <View key={i} style={base.tblRow}>
                    <View style={[base.tblCell, { flex: 1 }]}>
                      <Text style={[base.tblCellText, { fontFamily: "Helvetica-Bold", color: BLUE }]}>{market}</Text>
                    </View>
                    <View style={[base.tblCell, { flex: 3 }]}>
                      <Text style={base.tblCellText}>{mReqs[market] ?? "Vérifier les exigences locales en vigueur"}</Text>
                    </View>
                  </View>
                )
              })}
            </View>
          ) : (
            <View style={base.infoBox}>
              <Text style={base.infoBoxText}>
                Marchés non spécifiés. Le Règlement (UE) 2023/988 s'applique à l'ensemble du territoire de l'Union européenne.
              </Text>
            </View>
          )}
        </View>

        {/* Section 15 */}
        <View style={{ marginTop: 16 }}>
          <H1>15. Conclusion et recommandations</H1>
          {aiSectionContent("conclusion") ? (
            <Text style={base.body}>{aiSectionContent("conclusion")}</Text>
          ) : (
            <Text style={base.body}>
              {`Sur la base des informations disponibles et de l'analyse effectuée, le produit "${product?.name ?? "N/A"}" présente les caractéristiques nécessaires pour une mise sur le marché UE conforme au Règlement (UE) 2023/988, sous réserve de la validation et de la mise en œuvre des mesures décrites dans ce dossier.`}
            </Text>
          )}
          <H2>Prochaines étapes recommandées</H2>
          {[
            "Faire valider ce dossier par un expert qualification",
            "Réaliser les tests requis auprès d'un laboratoire accrédité",
            "Rédiger et signer la Déclaration UE de Conformité",
            "Mettre en place la surveillance post-commercialisation",
            "Conserver le dossier technique 10 ans après la mise sur le marché",
          ].map((item, i) => (
            <View key={i} style={base.bulletItem}>
              <Text style={[base.bulletDot, { color: GREEN_TEXT, fontFamily: "Helvetica-Bold" }]}>{i + 1}.</Text>
              <Text style={base.bulletText}>{item}</Text>
            </View>
          ))}
          <View style={[base.infoBox, { marginTop: 10 }]}>
            <Text style={[base.infoBoxText, { fontFamily: "Helvetica-Bold" }]}>
              Document généré le {genDate} — Réf. {docRef}
            </Text>
            <Text style={[base.infoBoxText, { marginTop: 2 }]}>
              Produit par Conforva (outil d'aide à la conformité GPSR). Doit être validé et complété par un expert avant usage officiel.
            </Text>
          </View>
        </View>

        <PageFooter language={language} branded={branded} />
      </Page>

      {/* ===================================================================
          ANNEXE A — AI technical file sections (if present)
          =================================================================== */}
      {aiSections.length > 0 ? (
        <Page size="A4" style={base.page}>
          {watermarked ? <WatermarkText /> : null}
          <PageHeader docRef={docRef} productName={product?.name ?? "N/A"} branded={branded} />
          <H1>Annexe A — Contenu généré par analyse IA</H1>
          <Text style={[base.body, { marginBottom: 12 }]}>
            Les sections suivantes ont été générées automatiquement par l'analyse IA de Conforva sur la base des informations produit fournies. Elles doivent être relues, vérifiées et validées par un expert.
          </Text>
          {aiSections.map((s: any, i: number) => (
            <View key={i} style={base.aiBlock} wrap={false}>
              <Text style={base.aiBlockTitle}>
                {s.title ?? s.section ?? s.name ?? `Section ${i + 1}`}
              </Text>
              <Text style={base.aiBlockContent}>{s.content ?? s.text ?? ""}</Text>
            </View>
          ))}
          <PageFooter language={language} branded={branded} />
        </Page>
      ) : null}
    </Document>
  )
}

// ---------------------------------------------------------------------------
// DECLARATION OF CONFORMITY PDF — single A4 EU format
// ---------------------------------------------------------------------------
export function DeclarationOfConformityPDF({
  product,
  org,
  rp,
  riskAssessment,
  watermarked = true,
  branded = true,
}: PDFProps) {
  const ra = (riskAssessment?.content_json ?? {}) as any
  const doc = (ra.declaration_of_conformity_content ?? {}) as any
  const rawStds = ra.referenced_standards ?? []
  const standards: string[] = rawStds.map((s: any) =>
    typeof s === "string" ? s : `${s?.code ?? ""}${s?.title ? ` — ${s.title}` : ""}`
  )
  const docRef = buildDocRef(product?.id ?? "", "DOC")
  const genDate = todayStr()
  const category = product?.product_categories

  const responsibleName = rp?.company_name ?? org?.name ?? "N/A"
  const responsibleAddress = rp
    ? `${rp.address_line ?? ""}, ${rp.postal_code ?? ""} ${rp.city ?? ""}, ${rp.country_eu ?? ""}`.replace(/^,\s*/, "").replace(/,\s*,/g, ",")
    : (org?.country ?? "N/A")
  const responsibleEmail = rp?.email ?? org?.email ?? ""

  const baseRegulations: string[] = [
    "Règlement (UE) 2023/988 du Parlement européen et du Conseil sur la sécurité générale des produits (GPSR)",
    ...((ra.applicable_regulations ?? ra.regulations ?? []) as string[]).filter(
      (r: string) => !r.includes("2023/988")
    ),
  ]

  return (
    <Document title={`Déclaration de Conformité — ${product?.name ?? "Produit"}`}>
      <Page size="A4" style={base.page}>
        {watermarked ? <WatermarkText label="PROJET — NON SIGNÉ" /> : null}

        {/* Header */}
        <View style={base.docHeader}>
          <View>
            {branded ? (
              <View style={base.docLogoRow}>
                <View style={base.docLogoBox}>
                  <Text style={base.docLogoLetter}>C</Text>
                </View>
                <Text style={base.docAppName}>Conforva</Text>
              </View>
            ) : null}
            <Text style={base.docTitle}>DÉCLARATION UE DE CONFORMITÉ</Text>
            <Text style={base.docSubtitle}>Conformément à l'Article 24 du Règlement (UE) 2023/988</Text>
          </View>
          <View style={base.docRefBlock}>
            <Text style={base.docRefLine}>N° {docRef}</Text>
            <Text style={base.docRefLine}>Version 1.0</Text>
            <Text style={base.docRefLine}>{genDate}</Text>
            {watermarked ? (
              <View style={[base.coverBadge, { marginTop: 6 }]}>
                <Text style={base.coverBadgeText}>NON SIGNÉ</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Section 1 — Produit */}
        <View style={base.declSection}>
          <Text style={base.declH1}>1. IDENTIFICATION DU PRODUIT</Text>
          <View style={base.coverBox}>
            <Row label="Désignation du produit" value={product?.name ?? "N/A"} />
            <Row label="Référence / Modèle" value={product?.reference ?? "N/A"} />
            <Row label="Catégorie" value={category?.name_fr ?? "N/A"} />
            {product?.intended_use ? <Row label="Usage prévu" value={product.intended_use} /> : null}
            {product?.materials?.length > 0 ? (
              <Row label="Matériaux principaux" value={product.materials.join(", ")} />
            ) : null}
            {product?.weight_g ? <Row label="Poids" value={`${product.weight_g} g`} /> : null}
            <Row label="Marchés cibles" value={product?.target_markets?.join(", ") ?? "UE"} />
          </View>
        </View>

        {/* Section 2 — Fabricant / RP */}
        <View style={base.declSection}>
          <Text style={base.declH1}>2. FABRICANT / PERSONNE RESPONSABLE UE</Text>
          <View style={base.coverBox}>
            {rp ? (
              <>
                <Row label="Dénomination sociale" value={rp.company_name ?? "N/A"} />
                <Row label="Adresse complète" value={responsibleAddress} />
                {responsibleEmail ? <Row label="Email" value={responsibleEmail} /> : null}
                {rp.phone ? <Row label="Téléphone" value={rp.phone} /> : null}
                <Row
                  label="Qualité"
                  value={rp.type === "importer" ? "Importateur / Personne Responsable UE" : "Représentant Autorisé UE"}
                />
              </>
            ) : (
              <>
                <Row label="Dénomination sociale" value={responsibleName} />
                <Row label="Pays d'établissement" value={org?.country ?? "À compléter"} />
              </>
            )}
            {org?.name && rp ? (
              <Row label="Donneur d'ordre" value={org.name} />
            ) : null}
          </View>
        </View>

        {/* Section 3 — Objet */}
        <View style={base.declSection}>
          <Text style={base.declH1}>3. OBJET DE LA DÉCLARATION</Text>
          <Text style={base.declBody}>
            {doc.product_description ??
              `Le produit désigné ci-dessus est l'objet de la présente déclaration UE de conformité. Il a été conçu et fabriqué conformément aux exigences essentielles de sécurité et aux autres dispositions pertinentes des réglementations applicables.`}
          </Text>
        </View>

        {/* Section 4 — Réglementations */}
        <View style={base.declSection}>
          <Text style={base.declH1}>4. RÉGLEMENTATIONS APPLICABLES</Text>
          {(doc.applicable_regulations ?? baseRegulations).map((r: string, i: number) => (
            <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
              <Text style={{ width: 14, color: BLUE }}>–</Text>
              <Text style={{ flex: 1, fontSize: 8.5 }}>{r}</Text>
            </View>
          ))}
        </View>

        {/* Section 5 — Normes */}
        <View style={base.declSection}>
          <Text style={base.declH1}>5. NORMES HARMONISÉES ET AUTRES NORMES APPLIQUÉES</Text>
          {standards.length > 0 ? (
            (doc.standards_complied ?? standards).map((s: any, i: number) => {
              const label = typeof s === "string" ? s : `${s?.code ?? ""}${s?.title ? ` — ${s.title}` : ""}`
              return (
              <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
                <Text style={{ width: 14, color: BLUE }}>•</Text>
                <Text style={{ flex: 1, fontSize: 8.5 }}>{label}</Text>
              </View>
            )})
          ) : (
            <Text style={base.declBody}>
              Aucune norme harmonisée spécifique appliquée — conformité établie par évaluation directe aux exigences essentielles du Règlement (UE) 2023/988.
            </Text>
          )}
        </View>

        {/* Section 6 — Procédure */}
        <View style={base.declSection}>
          <Text style={base.declH1}>6. PROCÉDURE D'ÉVALUATION DE LA CONFORMITÉ</Text>
          <Text style={base.declBody}>
            {doc.assessment_procedure ??
              "Évaluation interne de la conformité conformément à l'Annexe III du Règlement (UE) 2023/988. L'évaluation des risques a été réalisée selon la méthodologie ISO 12100:2010. Aucun organisme notifié n'est requis pour cette catégorie de produit."}
          </Text>
          {ra.notified_body ? (
            <Text style={[base.declBody, { marginTop: 4 }]}>
              Organisme notifié : {ra.notified_body}
            </Text>
          ) : null}
        </View>

        {/* Section 7 — Déclaration et signature */}
        <View style={base.declSection}>
          <Text style={base.declH1}>7. DÉCLARATION ET SIGNATURE</Text>
          <Text style={[base.declBody, { marginBottom: 10 }]}>
            Je soussigné(e), agissant au nom et pour le compte de la société mentionnée ci-dessus, déclare sous ma seule responsabilité que le produit décrit est conforme aux exigences essentielles de sécurité et aux autres dispositions pertinentes des réglementations listées ci-dessus.
          </Text>
          <View style={base.sigBlock}>
            <View style={base.sigRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 8, color: GRAY, fontFamily: "Helvetica-Bold", marginBottom: 4 }}>Lieu et date :</Text>
                <View style={base.sigLine} />
              </View>
            </View>
            <View style={base.sigRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 8, color: GRAY, fontFamily: "Helvetica-Bold", marginBottom: 4 }}>Nom, prénom et fonction :</Text>
                <View style={base.sigLine} />
              </View>
            </View>
            <View style={[base.sigRow, { marginBottom: 0 }]}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 8, color: GRAY, fontFamily: "Helvetica-Bold", marginBottom: 4 }}>Signature :</Text>
                <View style={[base.sigLine, { height: 42 }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={{ marginTop: 14, borderTop: `1 solid ${AMBER_BORDER}`, paddingTop: 7, backgroundColor: AMBER_BG, padding: 7, borderRadius: 3 }}>
          <Text style={{ fontSize: 7, color: AMBER_TEXT }}>
            Ce document doit être complété, relu et signé par le responsable légal avant tout usage officiel. Il ne constitue pas en lui-même un acte légal sans signature manuscrite ou électronique certifiée.
          </Text>
        </View>

        <View style={base.footer} fixed>
          {branded ? <Text>Conforva — Aide à la conformité GPSR</Text> : <Text> </Text>}
          <Text>N° {docRef}</Text>
          <Text>{genDate}</Text>
        </View>
      </Page>
    </Document>
  )
}

// ---------------------------------------------------------------------------
// LABEL PDF — improved with zh / ja support
// ---------------------------------------------------------------------------
export function LabelPDF({
  product,
  label,
  language = "fr",
  org,
  watermarked = false,
}: {
  product: any
  label: any
  language?: string
  org: any
  watermarked?: boolean
}) {
  const warnings: string[] = label?.warnings ?? []
  const pictograms: string[] = label?.pictograms ?? []
  const certifications: string[] = label?.certifications ?? []

  const T: Record<string, Record<string, string>> = {
    fr: {
      title: "ÉTIQUETTE DE SÉCURITÉ",
      warnings: "AVERTISSEMENTS",
      product: "Produit",
      ref: "Réf.",
      manufacturer: "Fabricant",
      certifications: "Certifications",
      generated: "Généré par Conforva",
      disclaimer: "Aide à la conformité. Ne constitue pas un avis juridique.",
    },
    en: {
      title: "SAFETY LABEL",
      warnings: "WARNINGS",
      product: "Product",
      ref: "Ref.",
      manufacturer: "Manufacturer",
      certifications: "Certifications",
      generated: "Generated by Conforva",
      disclaimer: "Compliance aid. Does not constitute legal advice.",
    },
    de: {
      title: "SICHERHEITSETIKETT",
      warnings: "WARNHINWEISE",
      product: "Produkt",
      ref: "Ref.",
      manufacturer: "Hersteller",
      certifications: "Zertifizierungen",
      generated: "Erstellt von Conforva",
      disclaimer: "Konformitätshilfe. Stellt keine Rechtsberatung dar.",
    },
    it: {
      title: "ETICHETTA DI SICUREZZA",
      warnings: "AVVERTENZE",
      product: "Prodotto",
      ref: "Rif.",
      manufacturer: "Produttore",
      certifications: "Certificazioni",
      generated: "Generato da Conforva",
      disclaimer: "Aiuto alla conformità. Non costituisce consulenza legale.",
    },
    es: {
      title: "ETIQUETA DE SEGURIDAD",
      warnings: "ADVERTENCIAS",
      product: "Producto",
      ref: "Ref.",
      manufacturer: "Fabricante",
      certifications: "Certificaciones",
      generated: "Generado por Conforva",
      disclaimer: "Ayuda de cumplimiento. No constituye asesoramiento jurídico.",
    },
    nl: {
      title: "VEILIGHEIDSLABEL",
      warnings: "WAARSCHUWINGEN",
      product: "Product",
      ref: "Ref.",
      manufacturer: "Fabrikant",
      certifications: "Certificeringen",
      generated: "Gegenereerd door Conforva",
      disclaimer: "Nalevingshulpmiddel. Vormt geen juridisch advies.",
    },
    pt: {
      title: "ETIQUETA DE SEGURANÇA",
      warnings: "ADVERTÊNCIAS",
      product: "Produto",
      ref: "Ref.",
      manufacturer: "Fabricante",
      certifications: "Certificações",
      generated: "Gerado por Conforva",
      disclaimer: "Auxílio à conformidade. Não constitui aconselhamento jurídico.",
    },
    pl: {
      title: "ETYKIETA BEZPIECZEŃSTWA",
      warnings: "OSTRZEŻENIA",
      product: "Produkt",
      ref: "Ref.",
      manufacturer: "Producent",
      certifications: "Certyfikaty",
      generated: "Wygenerowane przez Conforva",
      disclaimer: "Pomoc w zakresie zgodności. Nie stanowi porady prawnej.",
    },
    zh: {
      title: "安全标签",
      warnings: "警告",
      product: "产品",
      ref: "型号",
      manufacturer: "制造商",
      certifications: "认证",
      generated: "由 Conforva 生成",
      disclaimer: "合规辅助工具，不构成法律意见。",
    },
    ja: {
      title: "安全ラベル",
      warnings: "警告",
      product: "製品",
      ref: "型番",
      manufacturer: "製造者",
      certifications: "認証",
      generated: "Conforva により生成",
      disclaimer: "コンプライアンス支援ツール。法的アドバイスではありません。",
    },
  }
  const lbl = T[language] ?? T.fr

  return (
    <Document title={`Étiquette — ${product?.name} — ${language}`}>
      <Page size="A5" style={{ ...base.page, padding: 28, paddingBottom: 28 }}>
        {watermarked ? <Text style={{ ...base.watermark, fontSize: 34, top: 170 }}>NON VALIDÉ</Text> : null}

        {/* Outer border box */}
        <View style={{ border: `2 solid ${BLUE}`, borderRadius: 7, padding: 16, flex: 1 }}>

          {/* Logo row */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{
                width: 22, height: 22, backgroundColor: BLUE, borderRadius: 5,
                marginRight: 6, justifyContent: "center", alignItems: "center",
              }}>
                <Text style={{ color: "#ffffff", fontSize: 13, fontFamily: "Helvetica-Bold" }}>C</Text>
              </View>
              <Text style={{ fontSize: 8, color: GRAY, fontFamily: "Helvetica-Bold" }}>Conforva</Text>
            </View>
            <Text style={{ fontSize: 7, color: GRAY }}>{language.toUpperCase()}</Text>
          </View>

          {/* Title */}
          <Text style={{
            fontSize: 14, fontFamily: "Helvetica-Bold", color: BLUE, marginBottom: 8,
            borderBottom: `1 solid ${BLUE_LIGHT}`, paddingBottom: 6,
          }}>{lbl.title}</Text>

          {/* Product info */}
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text style={{ width: 70, fontSize: 8, color: GRAY, fontFamily: "Helvetica-Bold" }}>{lbl.product}</Text>
            <Text style={{ flex: 1, fontSize: 8.5, color: DARK, fontFamily: "Helvetica-Bold" }}>{product?.name ?? "N/A"}</Text>
          </View>
          {product?.reference ? (
            <View style={{ flexDirection: "row", marginBottom: 7 }}>
              <Text style={{ width: 70, fontSize: 8, color: GRAY, fontFamily: "Helvetica-Bold" }}>{lbl.ref}</Text>
              <Text style={{ flex: 1, fontSize: 8, color: MID }}>{product.reference}</Text>
            </View>
          ) : null}

          {/* Pictograms */}
          {pictograms.length > 0 ? (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 7.5, fontFamily: "Helvetica-Bold", color: MID, marginBottom: 4 }}>
                Pictogrammes :
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {pictograms.map((p, i) => (
                  <View key={i} style={{
                    backgroundColor: BLUE_BG, border: `1 solid ${BLUE_LIGHT}`,
                    borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2, marginRight: 4, marginBottom: 3,
                  }}>
                    <Text style={{ fontSize: 7, color: BLUE }}>{p}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Certifications */}
          {certifications.length > 0 ? (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 7.5, fontFamily: "Helvetica-Bold", color: MID, marginBottom: 4 }}>
                {lbl.certifications} :
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {certifications.map((c, i) => (
                  <View key={i} style={{
                    backgroundColor: GREEN_BG, border: `1 solid #bbf7d0`,
                    borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2, marginRight: 4, marginBottom: 3,
                  }}>
                    <Text style={{ fontSize: 7, color: GREEN_TEXT, fontFamily: "Helvetica-Bold" }}>{c}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Warnings */}
          {warnings.length > 0 ? (
            <View style={{
              backgroundColor: AMBER_BG,
              border: `1 solid ${AMBER_BORDER}`,
              borderRadius: 4,
              padding: 8,
              marginBottom: 10,
            }}>
              <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: AMBER_TEXT, marginBottom: 4 }}>
                {`⚠ ${lbl.warnings}`}
              </Text>
              {warnings.map((w, i) => (
                <View key={i} style={{ flexDirection: "row", marginBottom: 2 }}>
                  <Text style={{ fontSize: 7.5, color: "#78350f", width: 10 }}>•</Text>
                  <Text style={{ fontSize: 7.5, color: "#78350f", flex: 1 }}>{w}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Footer inside box */}
          <View style={{ borderTop: `1 solid ${BORDER}`, paddingTop: 6, marginTop: "auto" }}>
            <Text style={{ fontSize: 7, color: GRAY }}>
              {lbl.manufacturer}: {org?.name ?? "N/A"}{org?.country ? ` · ${org.country}` : ""}
            </Text>
            <Text style={{ fontSize: 6.5, color: "#9ca3af", marginTop: 2 }}>
              {lbl.generated} · {todayStr()}
            </Text>
          </View>
        </View>

        {/* Disclaimer strip below box */}
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 6.5, color: AMBER_TEXT, backgroundColor: AMBER_BG, padding: 5, borderRadius: 3 }}>
            {lbl.disclaimer}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
