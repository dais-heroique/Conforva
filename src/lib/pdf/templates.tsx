import React from "react"
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"
import { DISCLAIMER_TEXT } from "@/lib/utils"

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Helvetica", fontSize: 10, color: "#1a1a1a", lineHeight: 1.5 },
  watermark: {
    position: "absolute", top: "40%", left: "10%", width: "80%",
    fontSize: 52, color: "#e5e7eb", opacity: 0.4, transform: "rotate(-30deg)",
    textAlign: "center", fontFamily: "Helvetica-Bold",
  },
  header: { borderBottom: "2 solid #1d4ed8", paddingBottom: 12, marginBottom: 20 },
  logoRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  logoBox: { width: 28, height: 28, backgroundColor: "#1d4ed8", borderRadius: 6, marginRight: 8, justifyContent: "center", alignItems: "center" },
  logoText: { color: "white", fontSize: 16, fontFamily: "Helvetica-Bold" },
  appName: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#1d4ed8" },
  docTitle: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#111827", marginTop: 8 },
  subtitle: { fontSize: 9, color: "#6b7280" },
  section: { marginTop: 18 },
  sectionTitle: { fontSize: 12, fontFamily: "Helvetica-Bold", color: "#1d4ed8", borderBottom: "1 solid #dbeafe", paddingBottom: 4, marginBottom: 8 },
  row: { flexDirection: "row", marginBottom: 5 },
  label: { width: 150, fontSize: 9, color: "#6b7280", fontFamily: "Helvetica-Bold" },
  value: { flex: 1, fontSize: 9, color: "#111827" },
  hazardCard: { border: "1 solid #e5e7eb", borderRadius: 4, padding: 8, marginBottom: 8 },
  hazardTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#111827", marginBottom: 3 },
  hazardDesc: { fontSize: 9, color: "#374151", marginBottom: 3 },
  badgeHigh: { backgroundColor: "#fef2f2", color: "#991b1b", fontSize: 8, padding: "2 6", borderRadius: 10 },
  badgeMed: { backgroundColor: "#fffbeb", color: "#92400e", fontSize: 8, padding: "2 6", borderRadius: 10 },
  badgeLow: { backgroundColor: "#f0fdf4", color: "#166534", fontSize: 8, padding: "2 6", borderRadius: 10 },
  mitigationItem: { flexDirection: "row", marginBottom: 5 },
  bullet: { width: 14, color: "#1d4ed8" },
  disclaimer: { marginTop: 24, borderTop: "1 solid #fbbf24", paddingTop: 10, fontSize: 8, color: "#92400e", backgroundColor: "#fffbeb", padding: 10, borderRadius: 4 },
  footer: { position: "absolute", bottom: 30, left: 50, right: 50, borderTop: "1 solid #e5e7eb", paddingTop: 6, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: "#9ca3af" },
  pageNum: { fontSize: 8, color: "#9ca3af" },
})

interface PDFProps {
  product: any
  org: any
  rp?: any
  riskAssessment?: any
  technicalFile?: any
  language?: string
  watermarked?: boolean
}

export function TechnicalFilePDF({ product, org, rp, riskAssessment, technicalFile, language = "fr", watermarked = true }: PDFProps) {
  const ra = riskAssessment?.content_json ?? {}
  const category = product?.product_categories

  const labels: Record<string, Record<string, string>> = {
    fr: { title: "DOSSIER TECHNIQUE GPSR", product: "Produit", ref: "Référence", category: "Catégorie", manufacturer: "Fabricant/Responsable", country: "Pays", standards: "Normes applicables", hazards: "Dangers identifiés", mitigation: "Mesures de mitigation", tests: "Tests requis", date: "Date de génération", validated: "Statut validation" },
    en: { title: "GPSR TECHNICAL FILE", product: "Product", ref: "Reference", category: "Category", manufacturer: "Manufacturer/Responsible", country: "Country", standards: "Applicable standards", hazards: "Identified hazards", mitigation: "Mitigation measures", tests: "Required tests", date: "Generation date", validated: "Validation status" },
    de: { title: "GPSR TECHNISCHE UNTERLAGE", product: "Produkt", ref: "Referenz", category: "Kategorie", manufacturer: "Hersteller/Verantwortlicher", country: "Land", standards: "Anwendbare Normen", hazards: "Identifizierte Gefahren", mitigation: "Schutzmaßnahmen", tests: "Erforderliche Tests", date: "Erstellungsdatum", validated: "Validierungsstatus" },
  }
  const t = labels[language] ?? labels.fr

  return (
    <Document title={`Dossier technique — ${product?.name}`}>
      <Page size="A4" style={styles.page}>
        {watermarked && <Text style={styles.watermark}>PROJET — NON VALIDÉ</Text>}

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}><Text style={styles.logoText}>C</Text></View>
            <Text style={styles.appName}>Conforva</Text>
          </View>
          <Text style={styles.docTitle}>{t.title}</Text>
          <Text style={styles.subtitle}>Règlement UE 2023/988 sur la sécurité générale des produits (GPSR)</Text>
        </View>

        {/* Product info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Description du produit</Text>
          <View style={styles.row}>
            <Text style={styles.label}>{t.product}</Text>
            <Text style={styles.value}>{product?.name ?? "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t.ref}</Text>
            <Text style={styles.value}>{product?.reference ?? "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t.category}</Text>
            <Text style={styles.value}>{category?.name_fr ?? "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Usage prévu</Text>
            <Text style={styles.value}>{product?.intended_use ?? "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Matériaux</Text>
            <Text style={styles.value}>{product?.materials?.join(", ") ?? "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Marchés cibles</Text>
            <Text style={styles.value}>{product?.target_markets?.join(", ") ?? "EU"}</Text>
          </View>
        </View>

        {/* Responsible person */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Personne responsable</Text>
          {rp ? (
            <>
              <View style={styles.row}><Text style={styles.label}>Société</Text><Text style={styles.value}>{rp.company_name}</Text></View>
              <View style={styles.row}><Text style={styles.label}>Adresse</Text><Text style={styles.value}>{rp.address_line}, {rp.postal_code} {rp.city}, {rp.country_eu}</Text></View>
              <View style={styles.row}><Text style={styles.label}>Email</Text><Text style={styles.value}>{rp.email}</Text></View>
            </>
          ) : (
            <>
              <View style={styles.row}><Text style={styles.label}>{t.manufacturer}</Text><Text style={styles.value}>{org?.name ?? "N/A"}</Text></View>
              <View style={styles.row}><Text style={styles.label}>{t.country}</Text><Text style={styles.value}>{org?.country ?? "EU"}</Text></View>
            </>
          )}
        </View>

        {/* Standards */}
        {ra.referenced_standards?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Normes applicables</Text>
            {ra.referenced_standards.map((s: string, i: number) => (
              <View key={i} style={styles.mitigationItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={{ flex: 1, fontSize: 9 }}>{s}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Summary */}
        {ra.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Résumé de l'évaluation de sécurité</Text>
            <Text style={{ fontSize: 9, color: "#374151" }}>{ra.summary}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.disclaimer} fixed>
          <Text>{language === "en" ? DISCLAIMER_TEXT.en : DISCLAIMER_TEXT.fr}</Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>Conforva — Aide à la conformité GPSR</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
          <Text>{new Date().toLocaleDateString("fr-FR")}</Text>
        </View>
      </Page>

      {/* Page 2 - Hazards */}
      {ra.hazards?.length > 0 && (
        <Page size="A4" style={styles.page}>
          {watermarked && <Text style={styles.watermark}>PROJET — NON VALIDÉ</Text>}
          <View style={styles.header}>
            <Text style={styles.docTitle}>5. {t.hazards}</Text>
          </View>
          {ra.hazards.map((h: any, i: number) => (
            <View key={i} style={styles.hazardCard}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                <Text style={styles.hazardTitle}>{h.id} — {h.title}</Text>
                <Text style={h.severity === "high" || h.severity === "critical" ? styles.badgeHigh : h.severity === "medium" ? styles.badgeMed : styles.badgeLow}>
                  {h.severity?.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.hazardDesc}>{h.description}</Text>
              {h.referenced_standards?.length > 0 && (
                <Text style={{ fontSize: 8, color: "#1d4ed8" }}>{h.referenced_standards.join(", ")}</Text>
              )}
            </View>
          ))}

          {ra.mitigation_measures?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. {t.mitigation}</Text>
              {ra.mitigation_measures.map((m: any, i: number) => (
                <View key={i} style={styles.mitigationItem}>
                  <Text style={styles.bullet}>✓</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 9, color: "#111827" }}>{m.measure}</Text>
                    <Text style={{ fontSize: 8, color: "#6b7280" }}>{m.type} · {m.priority} · {m.norm_reference}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {ra.required_tests?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. {t.tests}</Text>
              {ra.required_tests.map((t: string, i: number) => (
                <View key={i} style={styles.mitigationItem}>
                  <Text style={styles.bullet}>□</Text>
                  <Text style={{ flex: 1, fontSize: 9 }}>{t}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.disclaimer} fixed>
            <Text>{language === "en" ? DISCLAIMER_TEXT.en : DISCLAIMER_TEXT.fr}</Text>
          </View>
          <View style={styles.footer} fixed>
            <Text>Conforva — Aide à la conformité GPSR</Text>
            <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
            <Text>{new Date().toLocaleDateString("fr-FR")}</Text>
          </View>
        </Page>
      )}
    </Document>
  )
}

export function LabelPDF({ product, label, language = "fr", org, watermarked = false }: { product: any; label: any; language?: string; org: any; watermarked?: boolean }) {
  const warnings: string[] = label?.warnings ?? []
  const pictograms: string[] = label?.pictograms ?? []

  const langLabels: Record<string, Record<string, string>> = {
    fr: { title: "ÉTIQUETTE DE SÉCURITÉ", warnings: "AVERTISSEMENTS", product: "Produit", ref: "Réf.", manufacturer: "Fabricant" },
    en: { title: "SAFETY LABEL", warnings: "WARNINGS", product: "Product", ref: "Ref.", manufacturer: "Manufacturer" },
    de: { title: "SICHERHEITSETIKETT", warnings: "WARNHINWEISE", product: "Produkt", ref: "Ref.", manufacturer: "Hersteller" },
    it: { title: "ETICHETTA DI SICUREZZA", warnings: "AVVERTENZE", product: "Prodotto", ref: "Rif.", manufacturer: "Produttore" },
    es: { title: "ETIQUETA DE SEGURIDAD", warnings: "ADVERTENCIAS", product: "Producto", ref: "Ref.", manufacturer: "Fabricante" },
  }
  const t = langLabels[language] ?? langLabels.fr

  return (
    <Document title={`Étiquette — ${product?.name} — ${language}`}>
      <Page size="A5" style={{ ...styles.page, padding: 30 }}>
        {watermarked && <Text style={{ ...styles.watermark, fontSize: 36 }}>NON VALIDÉ</Text>}
        <View style={{ border: "2 solid #1d4ed8", borderRadius: 6, padding: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <View style={{ ...styles.logoBox, width: 22, height: 22, marginRight: 6 }}>
              <Text style={{ ...styles.logoText, fontSize: 12 }}>C</Text>
            </View>
            <Text style={{ fontSize: 8, color: "#6b7280" }}>Conforva</Text>
          </View>

          <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold", color: "#1d4ed8", marginBottom: 6 }}>{t.title}</Text>

          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={{ ...styles.label, width: 70 }}>{t.product}</Text>
            <Text style={{ ...styles.value, fontFamily: "Helvetica-Bold" }}>{product?.name}</Text>
          </View>
          {product?.reference && (
            <View style={{ flexDirection: "row", marginBottom: 8 }}>
              <Text style={{ ...styles.label, width: 70 }}>{t.ref}</Text>
              <Text style={styles.value}>{product.reference}</Text>
            </View>
          )}

          {pictograms.length > 0 && (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: "#374151", marginBottom: 4 }}>Pictogrammes :</Text>
              <Text style={{ fontSize: 9, color: "#374151" }}>{pictograms.join(" · ")}</Text>
            </View>
          )}

          {warnings.length > 0 && (
            <View style={{ backgroundColor: "#fffbeb", border: "1 solid #fbbf24", borderRadius: 4, padding: 8, marginBottom: 8 }}>
              <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#92400e", marginBottom: 4 }}>⚠ {t.warnings}</Text>
              {warnings.map((w, i) => (
                <Text key={i} style={{ fontSize: 8, color: "#78350f", marginBottom: 2 }}>• {w}</Text>
              ))}
            </View>
          )}

          <View style={{ borderTop: "1 solid #e5e7eb", paddingTop: 6, marginTop: 6 }}>
            <Text style={{ fontSize: 7, color: "#6b7280" }}>{t.manufacturer}: {org?.name ?? "N/A"} · {org?.country ?? "EU"}</Text>
            <Text style={{ fontSize: 7, color: "#9ca3af", marginTop: 3 }}>
              Généré par Conforva (aide à la conformité) — {new Date().toLocaleDateString("fr-FR")}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 10, padding: 6, backgroundColor: "#fef3c7", borderRadius: 4 }}>
          <Text style={{ fontSize: 7, color: "#92400e" }}>
            Ce document est une aide à la conformité. Il ne constitue pas un avis juridique et ne garantit pas la conformité du produit.
          </Text>
        </View>
      </Page>
    </Document>
  )
}
