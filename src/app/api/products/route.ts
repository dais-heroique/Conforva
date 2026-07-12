import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, trackedCompetitors, trackedProducts } from "@/lib/db/schema"
import { eq, and, count } from "drizzle-orm"
import { z } from "zod"
import { scrapeAndApply, applyPriceResult } from "@/lib/scraping/apply"

const schema = z.object({
  competitorId: z.string().min(1),
  url: z.string().url("URL invalide"),
  name: z.string().max(200).optional(),
  sku: z.string().max(100).optional(),
  price: z.number().positive().optional(),
})

const patchSchema = z.object({
  productId: z.string().min(1),
  price: z.number().positive(),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })

    const db = getDb()

    const [membership] = await db
      .select({ org: organizations })
      .from(organizationMembers)
      .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
      .where(eq(organizationMembers.userId, session.user.id))
      .limit(1)

    if (!membership) return NextResponse.json({ error: "NO_ORG" }, { status: 404 })
    const org = membership.org

    const body = await req.json()
    const { competitorId, url, name, sku, price } = schema.parse(body)

    // Verify competitor belongs to this org
    const [competitor] = await db
      .select()
      .from(trackedCompetitors)
      .where(and(eq(trackedCompetitors.id, competitorId), eq(trackedCompetitors.organizationId, org.id)))
      .limit(1)

    if (!competitor) return NextResponse.json({ error: "COMPETITOR_NOT_FOUND" }, { status: 404 })

    // Check product limit
    const [{ total }] = await db
      .select({ total: count() })
      .from(trackedProducts)
      .where(and(eq(trackedProducts.organizationId, org.id), eq(trackedProducts.isActive, true)))

    if (total >= org.productLimit) {
      return NextResponse.json({ error: "LIMIT_REACHED", limit: org.productLimit }, { status: 403 })
    }

    // Check for duplicate URL within same competitor
    const [existing] = await db
      .select({ id: trackedProducts.id })
      .from(trackedProducts)
      .where(and(
        eq(trackedProducts.competitorId, competitorId),
        eq(trackedProducts.url, url),
        eq(trackedProducts.isActive, true),
      ))
      .limit(1)

    if (existing) return NextResponse.json({ error: "DUPLICATE_URL" }, { status: 409 })

    const productId = crypto.randomUUID()
    const [product] = await db
      .insert(trackedProducts)
      .values({
        id: productId,
        competitorId,
        organizationId: org.id,
        url,
        name: name || null,
        sku: sku || null,
        isActive: true,
      })
      .returning()

    // If the user typed the price themselves, trust it directly — no need to scrape.
    // Otherwise fetch the live price right away instead of waiting for the next cron run.
    // Best-effort: if the target site can't be scraped, the product is still created;
    // the daily cron (and its Gemini fallback) will retry, or the user can enter it manually.
    let finalProduct = product
    let autoScraped = true
    try {
      if (price != null) {
        autoScraped = false
        await applyPriceResult({ id: productId, currentPrice: null }, { price, currency: "EUR", inStock: null, name: null })
      } else {
        const result = await scrapeAndApply({ id: productId, url, currentPrice: null })
        autoScraped = result.scraped
      }
      const [refreshed] = await db.select().from(trackedProducts).where(eq(trackedProducts.id, productId)).limit(1)
      if (refreshed) finalProduct = refreshed
    } catch (err) {
      console.error("[products/POST] initial price resolution failed:", err)
    }

    return NextResponse.json({ success: true, product: finalProduct, autoScraped })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "INVALID_INPUT", details: err.issues }, { status: 400 })
    }
    console.error("[products/POST]", err)
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}

// Lets a user manually set/correct a product's price when auto-scraping couldn't find it.
export async function PATCH(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })

    const db = getDb()

    const [membership] = await db
      .select({ org: organizations })
      .from(organizationMembers)
      .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
      .where(eq(organizationMembers.userId, session.user.id))
      .limit(1)

    if (!membership) return NextResponse.json({ error: "NO_ORG" }, { status: 404 })

    const body = await req.json()
    const { productId, price } = patchSchema.parse(body)

    const [product] = await db
      .select()
      .from(trackedProducts)
      .where(and(eq(trackedProducts.id, productId), eq(trackedProducts.organizationId, membership.org.id)))
      .limit(1)

    if (!product) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 })

    await applyPriceResult(
      { id: product.id, currentPrice: product.currentPrice },
      { price, currency: product.currency ?? "EUR", inStock: product.isInStock, name: null }
    )

    const [updated] = await db.select().from(trackedProducts).where(eq(trackedProducts.id, productId)).limit(1)
    return NextResponse.json({ success: true, product: updated })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "INVALID_INPUT", details: err.issues }, { status: 400 })
    }
    console.error("[products/PATCH]", err)
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const productId = searchParams.get("id")
    if (!productId) return NextResponse.json({ error: "MISSING_ID" }, { status: 400 })

    const db = getDb()

    const [membership] = await db
      .select({ org: organizations })
      .from(organizationMembers)
      .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
      .where(eq(organizationMembers.userId, session.user.id))
      .limit(1)

    if (!membership) return NextResponse.json({ error: "NO_ORG" }, { status: 404 })

    await db
      .update(trackedProducts)
      .set({ isActive: false })
      .where(and(
        eq(trackedProducts.id, productId),
        eq(trackedProducts.organizationId, membership.org.id),
      ))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[products/DELETE]", err)
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}
