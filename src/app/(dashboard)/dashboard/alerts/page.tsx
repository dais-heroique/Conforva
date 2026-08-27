import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getDb } from "@/lib/db"
import { organizations, organizationMembers, alerts, trackedProducts } from "@/lib/db/schema"
import { eq, and, desc } from "drizzle-orm"
import { Bell, TrendingDown, Package, ShoppingCart, TrendingUp, Eye } from "lucide-react"
import { AddAlertButton } from "./add-alert-button"
import { DeleteAlertButton } from "./delete-alert-button"
import { getLocale } from "@/lib/i18n/locale"
import { withUnlimitedAccess } from "@/lib/admin"

const TYPES:Record<string,{fr:string;en:string;icon:any;color:string}>={
 price_drop:{fr:"Baisse de prix",en:"Price drop",icon:TrendingDown,color:"text-emerald-400"},
 price_increase:{fr:"Hausse de prix",en:"Price increase",icon:TrendingUp,color:"text-red-400"},
 out_of_stock:{fr:"Rupture de stock",en:"Out of stock",icon:Package,color:"text-orange-400"},
 back_in_stock:{fr:"Retour en stock",en:"Back in stock",icon:ShoppingCart,color:"text-blue-400"},
}
const DICT={fr:{title:"Alertes",count:(n:number,l:number)=>`${n} / ${l} alertes`,subtitle:"Les notifications qui nécessitent votre attention.",empty:"Aucune alerte pour le moment",emptyDesc:"Créez une alerte sur un produit pour être prévenu dès qu’un changement important est détecté.",product:"Produit",threshold:(n:number)=>`variation ≥ ${n}%`,last:(d:string)=>`dernier signal ${d}`,view:"Voir le produit"},en:{title:"Alerts",count:(n:number,l:number)=>`${n} / ${l} alerts`,subtitle:"Notifications that need your attention.",empty:"No alerts yet",emptyDesc:"Create an alert for a product and get notified when an important change is detected.",product:"Product",threshold:(n:number)=>`change ≥ ${n}%`,last:(d:string)=>`last signal ${d}`,view:"View product"}}
export default async function AlertsPage(){
 const session=await auth();if(!session?.user?.id)redirect('/auth/login');const locale=await getLocale();const t=DICT[locale];const db=getDb()
 const [membership]=await db.select({org:organizations}).from(organizationMembers).innerJoin(organizations,eq(organizationMembers.organizationId,organizations.id)).where(eq(organizationMembers.userId,session.user.id)).limit(1);if(!membership)redirect('/onboarding');const org=withUnlimitedAccess(membership.org,session.user.email)
 const [list,products]=await Promise.all([db.select().from(alerts).where(eq(alerts.organizationId,org.id)).orderBy(desc(alerts.createdAt)),db.select({id:trackedProducts.id,name:trackedProducts.name,url:trackedProducts.url}).from(trackedProducts).where(and(eq(trackedProducts.organizationId,org.id),eq(trackedProducts.isActive,true)))])
 const pm=new Map(products.map(p=>[p.id,p]));
 return <div className="p-6 md:p-7 space-y-6 bg-[#08090C] min-h-full"><header className="flex items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[.16em] text-[#A78BFA] font-semibold">Conforva</p><h1 className="text-3xl font-black text-white mt-2">{t.title}</h1><p className="text-sm text-gray-500 mt-1">{t.subtitle}</p></div><AddAlertButton products={products.map(p=>({id:p.id,name:p.name||p.url}))} canAdd={list.length<org.alertLimit} locale={locale}/></header>
 {list.length===0?<section className="rounded-3xl border border-white/8 bg-white/[.025] p-12 text-center"><Bell className="h-7 w-7 text-[#A78BFA] mx-auto"/><h2 className="text-lg font-bold text-white mt-4">{t.empty}</h2><p className="text-sm text-gray-500 max-w-md mx-auto mt-2">{t.emptyDesc}</p><Link href="/dashboard/products" className="inline-flex mt-6 px-4 py-2.5 rounded-xl bg-white text-black text-sm font-bold">{t.view}</Link></section>:<div className="space-y-3">{list.map(a=>{const meta=TYPES[a.type]||{fr:a.type,en:a.type,icon:Bell,color:'text-gray-400'};const Icon=meta.icon;const p=a.productId?pm.get(a.productId):null;return <div key={a.id} className="rounded-2xl border border-white/8 bg-white/[.025] p-4 flex items-center gap-4"><div className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center ${meta.color}`}><Icon className="h-4 w-4"/></div><div className="min-w-0 flex-1"><p className="text-sm font-bold text-white">{a.name}</p><div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500"><span className={meta.color}>{locale==='fr'?meta.fr:meta.en}</span>{a.threshold!=null&&<span>· {t.threshold(a.threshold)}</span>}{p&&<span className="flex items-center gap-1">· <Eye className="h-3 w-3"/>{p.name||p.url}</span>}{a.lastTriggeredAt&&<span>· {t.last(new Date(a.lastTriggeredAt).toLocaleDateString(locale==='en'?'en-US':'fr-FR'))}</span>}</div></div><DeleteAlertButton alertId={a.id} locale={locale}/></div>})}</div>}
 </div>
}