"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ConforvaLogo } from "@/components/logo"
import { BarChart3, Bell, Package, Settings, LogOut, Zap, CreditCard, ChevronDown } from "lucide-react"
import { signOut } from "next-auth/react"
import { useState, useTransition } from "react"
import { setLocale } from "@/lib/i18n/actions"
import type { Locale } from "@/lib/i18n/locale"

const DICT={
 fr:{nav:[{label:"Vue d'ensemble",href:"/dashboard",icon:BarChart3},{label:"Produits",href:"/dashboard/products",icon:Package},{label:"Alertes",href:"/dashboard/alerts",icon:Bell},{label:"Rapports IA",href:"/dashboard/reports",icon:Zap}],bottom:[{label:"Facturation",href:"/dashboard/billing",icon:CreditCard},{label:"Paramètres",href:"/dashboard/settings",icon:Settings}],plans:{free:"Gratuit",starter:"Starter",growth:"Growth",pro:"Pro",enterprise:"Enterprise"},settings:"Paramètres",logout:"Déconnexion"},
 en:{nav:[{label:"Overview",href:"/dashboard",icon:BarChart3},{label:"Products",href:"/dashboard/products",icon:Package},{label:"Alerts",href:"/dashboard/alerts",icon:Bell},{label:"AI reports",href:"/dashboard/reports",icon:Zap}],bottom:[{label:"Billing",href:"/dashboard/billing",icon:CreditCard},{label:"Settings",href:"/dashboard/settings",icon:Settings}],plans:{free:"Free",starter:"Starter",growth:"Growth",pro:"Pro",enterprise:"Enterprise"},settings:"Settings",logout:"Log out"}
}
interface Props{user:{id:string;email:string;name?:string|null;image?:string|null};org:{id:string;name:string;plan:string};locale:Locale}
export function DashboardSidebar({user,org,locale}:Props){
 const pathname=usePathname(),router=useRouter(),t=DICT[locale]; const [open,setOpen]=useState(false); const [,startTransition]=useTransition()
 function switchLocale(next:Locale){if(next===locale)return;startTransition(async()=>{await setLocale(next);router.refresh()})}
 return <aside className="w-56 h-full flex flex-col border-r border-white/8 bg-[#08090C] flex-shrink-0">
  <div className="h-14 flex items-center justify-between px-4 border-b border-white/8"><Link href="/dashboard" className="flex items-center gap-2"><ConforvaLogo size={24}/><span className="font-black text-white text-sm tracking-tight">CONFORVA</span></Link><div className="flex items-center gap-0.5 bg-white/5 border border-white/8 rounded-md p-0.5">{(["fr","en"] as const).map(l=><button key={l} onClick={()=>switchLocale(l)} className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${l===locale?"bg-[#8B5CF6] text-white":"text-gray-500 hover:text-white"}`}>{l}</button>)}</div></div>
  <div className="px-3 py-3 border-b border-white/8"><div className="px-2 py-1.5 rounded-lg bg-white/4"><p className="text-xs font-semibold text-white truncate">{org.name}</p><p className="text-xs text-gray-500">{t.plans[org.plan as keyof typeof t.plans]??org.plan}</p></div></div>
  <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">{t.nav.map(({label,href,icon:Icon})=>{const active=pathname===href||(href!=="/dashboard"&&pathname.startsWith(href));return <Link key={href} href={href} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm ${active?"bg-[#8B5CF6]/15 text-[#A78BFA] font-semibold":"text-gray-400 hover:text-white hover:bg-white/5"}`}><Icon className="h-4 w-4"/>{label}</Link>})}<div className="pt-3 mt-3 border-t border-white/8 space-y-0.5">{t.bottom.map(({label,href,icon:Icon})=>{const active=pathname.startsWith(href);return <Link key={href} href={href} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm ${active?"bg-[#8B5CF6]/15 text-[#A78BFA] font-semibold":"text-gray-400 hover:text-white hover:bg-white/5"}`}><Icon className="h-4 w-4"/>{label}</Link>})}</div></nav>
  <div className="px-3 py-3 border-t border-white/8"><button onClick={()=>setOpen(v=>!v)} className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/5"><div className="h-7 w-7 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-[#A78BFA] text-xs font-bold">{(user.name||user.email)[0].toUpperCase()}</div><div className="flex-1 text-left min-w-0"><p className="text-xs font-medium text-white truncate">{user.name||user.email}</p></div><ChevronDown className={`h-3 w-3 text-gray-500 ${open?"rotate-180":""}`}/></button>{open&&<div className="mt-1 bg-[#0D0D14] border border-white/10 rounded-xl overflow-hidden"><Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-white"><Settings className="h-3.5 w-3.5"/>{t.settings}</Link><button onClick={()=>signOut({callbackUrl:"/"})} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/5"><LogOut className="h-3.5 w-3.5"/>{t.logout}</button></div>}</div>
 </aside>
}
