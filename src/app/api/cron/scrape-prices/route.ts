import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { trackedProducts, trackedCompetitors } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { scrapeAndApply, applyPriceResult } from "@/lib/scraping/apply"
import { scrapeUrlsWithGemini } from "@/lib/scraping/gemini-fallback"

export const maxDuration=300

export async function GET(req:Request){return handleScrape(req)}
export async function POST(req:Request){return handleScrape(req)}

async function handleScrape(req:Request){
 const authHeader=req.headers.get("authorization")
 if(authHeader!==`Bearer ${process.env.CRON_SECRET}`)return NextResponse.json({error:"UNAUTHORIZED"},{status:401})
 const db=getDb(); const now=Date.now()
 const [products,stores]=await Promise.all([db.select().from(trackedProducts).where(eq(trackedProducts.isActive,true)),db.select().from(trackedCompetitors).where(eq(trackedCompetitors.isActive,true))])
 const storeById=new Map(stores.map(s=>[s.id,s])); const interval=(frequency:string)=>frequency==="hourly"?60*60*1000:frequency==="twice_daily"?12*60*60*1000:24*60*60*1000
 const due=products.filter(p=>{const store=storeById.get(p.competitorId); if(!store)return false; return !p.lastScrapedAt || now-p.lastScrapedAt.getTime()>=interval(store.scrapeFrequency)})
 let scraped=0; const stillMissing:typeof due=[]; const touched=new Set<string>()
 const BATCH_SIZE=5
 for(let i=0;i<due.length;i+=BATCH_SIZE){const batch=due.slice(i,i+BATCH_SIZE);await Promise.all(batch.map(async product=>{try{const result=await scrapeAndApply({id:product.id,url:product.url,currentPrice:product.currentPrice});touched.add(product.competitorId);if(result.scraped)scraped++;else stillMissing.push(product)}catch(err){stillMissing.push(product);console.error(`[cron/scrape-prices] failed ${product.id}`,err)}}))}
 let recovered=0
 if(stillMissing.length){const byUrl=new Map(stillMissing.map(p=>[p.url,p]));const results=await scrapeUrlsWithGemini(stillMissing.map(p=>p.url));for(const [url,result] of results){const product=byUrl.get(url);if(!product)continue;try{const applied=await applyPriceResult({id:product.id,currentPrice:product.currentPrice},result);if(applied.scraped){recovered++;touched.add(product.competitorId)}}catch(err){console.error(`[cron/scrape-prices] Gemini apply failed ${product.id}`,err)}}}
 for(const competitorId of touched)await db.update(trackedCompetitors).set({lastScrapedAt:new Date()}).where(eq(trackedCompetitors.id,competitorId))
 return NextResponse.json({totalActive:products.length,due:due.length,scrapedDirectly:scraped,sentToGemini:stillMissing.length,recoveredByGemini:recovered,unresolved:stillMissing.length-recovered})
}
