import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { renderToBuffer } from "@react-pdf/renderer"
import { TechnicalFilePDF, LabelPDF, DeclarationOfConformityPDF } from "@/lib/pdf/templates"

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { productId, type, language = "fr" } = await req.json()

  const { data: product } = await supabase
    .from("products")
    .select("*, product_categories(*)")
    .eq("id", productId)
    .single()

  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })

  const { data: org } = await supabase
    .from("organizations")
    .select("*")
    .eq("owner_id", user.id)
    .single()

  const { data: rp } = await supabase
    .from("responsible_persons")
    .select("*")
    .eq("org_id", org?.id ?? "")
    .eq("status", "active")
    .single()

  try {
    let pdfBuffer: Buffer

    if (type === "technical" || type === "declaration") {
      const { data: ra } = await supabase
        .from("risk_assessments")
        .select("*")
        .eq("product_id", productId)
        .order("version", { ascending: false })
        .limit(1)
        .single()

      const { data: tf } = await supabase
        .from("technical_files")
        .select("*")
        .eq("product_id", productId)
        .order("version", { ascending: false })
        .limit(1)
        .single()

      if (type === "declaration") {
        pdfBuffer = await renderToBuffer(
          DeclarationOfConformityPDF({ product, org, rp, riskAssessment: ra, watermarked: tf?.watermarked ?? true })
        )
      } else {
        pdfBuffer = await renderToBuffer(
          TechnicalFilePDF({ product, org, rp, riskAssessment: ra, technicalFile: tf, language, watermarked: tf?.watermarked ?? true })
        )
      }
    } else {
      const { data: label } = await supabase
        .from("labels")
        .select("*")
        .eq("product_id", productId)
        .eq("language", language)
        .single()

      pdfBuffer = await renderToBuffer(
        LabelPDF({ product, label, language, org, watermarked: !label })
      )
    }

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="conforva-${type}-${language}.pdf"`,
      },
    })
  } catch (err) {
    console.error("PDF generation error:", err)
    return NextResponse.json({ error: "PDF generation failed", details: String(err) }, { status: 500 })
  }
}
