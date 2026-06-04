import { ImageResponse } from "next/og"

export const alt = "Conforva — Conformité GPSR pour e-commerçants EU"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        {/* Logo + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "14px",
            background: "white", display: "flex", alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px",
              background: "#1d4ed8",
            }} />
          </div>
          <span style={{ color: "white", fontSize: "28px", fontWeight: "700", letterSpacing: "-0.5px" }}>
            Conforva
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1 style={{
            color: "white", fontSize: "62px", fontWeight: "800",
            lineHeight: 1.05, margin: 0, letterSpacing: "-1px",
          }}>
            Conformité GPSR<br />en quelques minutes
          </h1>
          <p style={{ color: "#93c5fd", fontSize: "26px", margin: 0, fontWeight: "400" }}>
            Dossier technique · Analyse de risque · Étiquetage multilingue
          </p>
        </div>

        {/* Bottom tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            background: "rgba(255,255,255,0.15)", borderRadius: "100px",
            padding: "8px 20px", display: "flex", alignItems: "center",
          }}>
            <span style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>
              Règlement (UE) 2023/988 — GPSR
            </span>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.15)", borderRadius: "100px",
            padding: "8px 20px", display: "flex", alignItems: "center",
          }}>
            <span style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>
              conforva.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
