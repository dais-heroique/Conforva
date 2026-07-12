import { ImageResponse } from "next/og"

export const alt = "Conforva — Veille concurrentielle IA pour e-commerçants"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a1025 0%, #3B1F70 55%, #8B5CF6 100%)",
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
              background: "#8B5CF6",
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
            Veille concurrentielle<br />pilotée par l&apos;IA
          </h1>
          <p style={{ color: "#D8CCF5", fontSize: "26px", margin: 0, fontWeight: "400" }}>
            Prix · Stocks · Nouveaux produits · Rapports IA hebdomadaires
          </p>
        </div>

        {/* Bottom tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            background: "rgba(255,255,255,0.15)", borderRadius: "100px",
            padding: "8px 20px", display: "flex", alignItems: "center",
          }}>
            <span style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>
              Shopify · Amazon · WooCommerce
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
