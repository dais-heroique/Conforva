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

  const { data: userData } = await supabase
    .from("users")
    .select("plan")
    .eq("id", user.id)
    .single()

  const isFree = !userData?.plan || userData.plan === "free"

  // Load the product's assigned RP if any, otherwise fall back to the first active RP
  const productRpId = (product as any).responsible_person_id as string | null
  let rp: any = null
  if (productRpId) {
    const { data } = await supabase.from("responsible_persons").select("*").eq("id", productRpId).single()
    rp = data
  } else if (org?.id) {
    const { data } = await supabase
      .from("responsible_persons")
      .select("*")
      .eq("org_id", org.id)
      .eq("status", "active")
      .limit(1)
      .maybeSingle()
    rp = data
  }

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

      const shouldWatermark = isFree || (tf?.watermarked ?? true)
      if (type === "declaration") {
        pdfBuffer = await renderToBuffer(
          DeclarationOfConformityPDF({ product, org, rp, riskAssessment: ra, watermarked: shouldWatermark, branded: isFree })
        )
      } else {
        pdfBuffer = await renderToBuffer(
          TechnicalFilePDF({ product, org, rp, riskAssessment: ra, technicalFile: tf, language, watermarked: shouldWatermark, branded: isFree })
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
        LabelPDF({ product, label, language, org, watermarked: isFree || !label })
      )
    }

    const ab = pdfBuffer.buffer.slice(pdfBuffer.byteOffset, pdfBuffer.byteOffset + pdfBuffer.byteLength) as ArrayBuffer
    return new NextResponse(new Blob([ab], { type: "application/pdf" }), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="conforva-${type}-${language}.pdf"`,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("PDF generation error:", message, err)
    return NextResponse.json({ error: "PDF generation failed", details: message }, { status: 500 })
  }
}
