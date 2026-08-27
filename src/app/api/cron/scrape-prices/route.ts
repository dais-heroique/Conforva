import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { trackedProducts, organizations } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { scrapeAndApply, applyPriceResult } from "@/lib/scraping/apply"
import { scrapeUrlsWithGemini } from "@/lib/scraping/gemini-fallback"
export const maxDuration=300
export async function GET(req:Request){return handle(req)}
export async function POST(req:Request){return handle(req)}
async function handle(req:Request){
 const auth=req.headers.get('authorization');if(auth!==`Bearer ${process.env.CRON_SECRET}`)return NextResponse.json({error:'UNAUTHORIZED'},{status:401})
 const db=getDb();const now=Date.now()
 const rows=await db.select({product:trackedProducts,org:organizations}).from(trackedProducts).innerJoin(organizations,eq(trackedProducts.organizationId,organizations.id)).where(eq(trackedProducts.isActive,true))
 // The store is only the source of a URL. Monitoring frequency belongs to the customer's plan,
 // so adding 20 Amazon products never creates a hidden "Amazon-wide" monitor or shared cadence.
 const interval=(plan:string)=>plan==='pro'||plan==='enterprise'?60*60*1000:plan==='growth'?12*60*60*1000:24*60*60*1000
 const due=rows.filter(({product,org})=>!product.lastScrapedAt||now-product.lastScrapedAt.getTime()>=interval(org.plan))
 let scraped=0;const missing:typeof due=[];const BATCH=5
 for(let i=0;i<due.length;i+=BATCH){await Promise.all(due.slice(i,i+BATCH).map(async ({product})=>{try{const r=await scrapeAndApply({id:product.id,url:product.url,currentPrice:product.currentPrice});if(r.scraped)scraped++;else missing.push({product,org:rows.find(x=>x.product.id===product.id)!.org})}catch(e){missing.push({product,org:rows.find(x=>x.product.id===product.id)!.org});console.error('[cron/scrape-prices] failed',product.id,e)}}))}
 let recovered=0;if(missing.length){const byUrl=new Map(missing.map(x=>[x.product.url,x.product]));const results=await scrapeUrlsWithGemini(missing.map(x=>x.product.url));for(const [url,result] of results){const p=byUrl.get(url);if(!p)continue;try{const r=await applyPriceResult({id:p.id,currentPrice:p.currentPrice},result);if(r.scraped)recovered++}catch(e){console.error('[cron/scrape-prices] fallback failed',p.id,e)}}}
 return NextResponse.json({totalActive:rows.length,due:due.length,scrapedDirectly:scraped,sentToGemini:missing.length,recoveredByGemini:recovered,unresolved:missing.length-recovered})
}
