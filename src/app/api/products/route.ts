import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, trackedCompetitors, trackedProducts } from "@/lib/db/schema"
import { eq, and, count } from "drizzle-orm"
import { z } from "zod"
import { scrapeAndApply, applyPriceResult } from "@/lib/scraping/apply"
import { withUnlimitedAccess } from "@/lib/admin"

const schema = z.object({
  competitorId: z.string().optional(),
  url: z.string().url("URL invalide"),
  name: z.string().max(200).optional(),
  sku: z.string().max(100).optional(),
  price: z.number().positive().optional(),
})

const patchSchema = z.object({ productId: z.string().min(1), price: z.number().positive().optional(), costPrice: z.number().nonnegative().nullable().optional(), yourPrice: z.number().nonnegative().nullable().optional() })

function normalizeHost(url:string){
  const host=new URL(url).hostname.toLowerCase().replace(/^www\./,"")
  return host
}

function storeName(host:string){
  if(host.includes("amazon.")) return "Amazon"
  if(host.includes("ebay.")) return "eBay"
  if(host.includes("aliexpress.")) return "AliExpress"
  if(host.includes("cdiscount.")) return "Cdiscount"
  return host.split(".")[0].replace(/[-_]/g," ").replace(/\b\w/g,c=>c.toUpperCase())
}

export async function POST(req: Request) {
  try {
    const session=await auth(); if(!session?.user?.id) return NextResponse.json({error:"UNAUTHORIZED"},{status:401})
    const db=getDb(); const [membership]=await db.select({org:organizations}).from(organizationMembers).innerJoin(organizations,eq(organizationMembers.organizationId,organizations.id)).where(eq(organizationMembers.userId,session.user.id)).limit(1)
    if(!membership) return NextResponse.json({error:"NO_ORG"},{status:404})
    const org=withUnlimitedAccess(membership.org,session.user.email)
    const body=await req.json(); const {competitorId,url,name,sku,price}=schema.parse(body)
    const host=normalizeHost(url)

    let competitor
    if(competitorId){
      ;[competitor]=await db.select().from(trackedCompetitors).where(and(eq(trackedCompetitors.id,competitorId),eq(trackedCompetitors.organizationId,org.id))).limit(1)
      if(!competitor) return NextResponse.json({error:"COMPETITOR_NOT_FOUND"},{status:404})
    } else {
      ;[competitor]=await db.select().from(trackedCompetitors).where(and(eq(trackedCompetitors.organizationId,org.id),eq(trackedCompetitors.domain,host),eq(trackedCompetitors.isActive,true))).limit(1)
      if(!competitor){
        const [{total:competitorTotal}]=await db.select({total:count()}).from(trackedCompetitors).where(and(eq(trackedCompetitors.organizationId,org.id),eq(trackedCompetitors.isActive,true)))
        if(competitorTotal>=org.competitorLimit) return NextResponse.json({error:"STORE_LIMIT_REACHED",limit:org.competitorLimit},{status:403})
        ;[competitor]=await db.insert(trackedCompetitors).values({id:crypto.randomUUID(),organizationId:org.id,name:storeName(host),domain:host,platform:host.includes("amazon.")?"amazon":"custom",isActive:true}).returning()
      }
    }

    const [{total}]=await db.select({total:count()}).from(trackedProducts).where(and(eq(trackedProducts.organizationId,org.id),eq(trackedProducts.isActive,true)))
    if(total>=org.productLimit) return NextResponse.json({error:"LIMIT_REACHED",limit:org.productLimit},{status:403})
    const [existing]=await db.select({id:trackedProducts.id}).from(trackedProducts).where(and(eq(trackedProducts.organizationId,org.id),eq(trackedProducts.url,url),eq(trackedProducts.isActive,true))).limit(1)
    if(existing) return NextResponse.json({error:"DUPLICATE_URL"},{status:409})

    const productId=crypto.randomUUID()
    const [product]=await db.insert(trackedProducts).values({id:productId,competitorId:competitor!.id,organizationId:org.id,url,name:name||null,sku:sku||null,isActive:true}).returning()
    let finalProduct=product; let autoScraped=true
    try{
      if(price!=null){autoScraped=false;await applyPriceResult({id:productId,currentPrice:null},{price,currency:"EUR",inStock:null,name:null,confidence:"high"})}
      else {const result=await scrapeAndApply({id:productId,url,currentPrice:null});autoScraped=result.scraped}
      const [refreshed]=await db.select().from(trackedProducts).where(eq(trackedProducts.id,productId)).limit(1); if(refreshed) finalProduct=refreshed
    }catch(err){console.error("[products/POST] initial resolution failed:",err)}
    return NextResponse.json({success:true,product:finalProduct,autoScraped,store:{name:competitor!.name,domain:competitor!.domain}})
  }catch(err){
    if(err instanceof z.ZodError) return NextResponse.json({error:"INVALID_INPUT",details:err.issues},{status:400})
    console.error("[products/POST]",err); return NextResponse.json({error:"SERVER_ERROR"},{status:500})
  }
}

export async function PATCH(req: Request) {
  try {
    const session=await auth(); if(!session?.user?.id) return NextResponse.json({error:"UNAUTHORIZED"},{status:401})
    const db=getDb(); const [membership]=await db.select({org:organizations}).from(organizationMembers).innerJoin(organizations,eq(organizationMembers.organizationId,organizations.id)).where(eq(organizationMembers.userId,session.user.id)).limit(1)
    if(!membership) return NextResponse.json({error:"NO_ORG"},{status:404})
    const {productId,price,costPrice,yourPrice}=patchSchema.parse(await req.json())
    const [product]=await db.select().from(trackedProducts).where(and(eq(trackedProducts.id,productId),eq(trackedProducts.organizationId,membership.org.id))).limit(1)
    if(!product) return NextResponse.json({error:"NOT_FOUND"},{status:404})
    if(price!=null) await applyPriceResult({id:product.id,currentPrice:product.currentPrice},{price,currency:product.currency??"EUR",inStock:product.isInStock,name:null,confidence:"high"})
    if(costPrice!==undefined||yourPrice!==undefined) await db.update(trackedProducts).set({...costPrice!==undefined?{costPrice}:{},...yourPrice!==undefined?{yourPrice}:{}}).where(eq(trackedProducts.id,productId))
    const [updated]=await db.select().from(trackedProducts).where(eq(trackedProducts.id,productId)).limit(1); return NextResponse.json({success:true,product:updated})
  }catch(err){if(err instanceof z.ZodError)return NextResponse.json({error:"INVALID_INPUT",details:err.issues},{status:400});console.error("[products/PATCH]",err);return NextResponse.json({error:"SERVER_ERROR"},{status:500})}
}

export async function DELETE(req: Request) {
  try {
    const session=await auth(); if(!session?.user?.id)return NextResponse.json({error:"UNAUTHORIZED"},{status:401})
    const productId=new URL(req.url).searchParams.get("id"); if(!productId)return NextResponse.json({error:"MISSING_ID"},{status:400})
    const db=getDb(); const [membership]=await db.select({org:organizations}).from(organizationMembers).innerJoin(organizations,eq(organizationMembers.organizationId,organizations.id)).where(eq(organizationMembers.userId,session.user.id)).limit(1)
    if(!membership)return NextResponse.json({error:"NO_ORG"},{status:404})
    await db.update(trackedProducts).set({isActive:false}).where(and(eq(trackedProducts.id,productId),eq(trackedProducts.organizationId,membership.org.id)))
    return NextResponse.json({success:true})
  }catch(err){console.error("[products/DELETE]",err);return NextResponse.json({error:"SERVER_ERROR"},{status:500})}
}
