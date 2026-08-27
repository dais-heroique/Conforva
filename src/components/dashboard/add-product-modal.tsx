"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Link2, Tag, Hash, Loader2, Plus, ShoppingBag, Euro } from "lucide-react"
import type { Locale } from "@/lib/i18n/locale"

const DICT = {
  fr: {
    add: "Surveiller un produit", title: "Ajouter un produit à surveiller", used: (n:number,l:number)=>`${n} / ${l} produits surveillés`, url:"URL exacte du produit", hint:"Collez la page du produit. Conforva détecte automatiquement le site, le produit et le prix.", placeholder:"https://www.amazon.fr/dp/B0...", name:"Nom du produit", optional:"optionnel", namePlaceholder:"Détecté automatiquement si laissé vide", sku:"Référence", price:"Prix actuel", ifKnown:"si connu", priceHint:"Laissez vide pour une détection automatique.", cancel:"Annuler", submit:"Commencer la surveillance", adding:"Analyse en cours…", added:"Produit ajouté à la surveillance", noPrice:"Produit ajouté. Le prix sera récupéré dès que possible.", limit:(l:number)=>`Limite de ${l} produits atteinte. Passez à un plan supérieur.`, duplicate:"Ce produit est déjà surveillé.", invalid:"URL invalide.", error:"Impossible d'ajouter ce produit.", network:"Erreur réseau.", footer:"Un produit = une URL précise. Ajouter Amazon ne surveille pas tout Amazon."
  },
  en: {
    add: "Track a product", title: "Add a product to track", used: (n:number,l:number)=>`${n} / ${l} products tracked`, url:"Exact product URL", hint:"Paste the product page. Conforva automatically detects the store, product and price.", placeholder:"https://www.amazon.com/dp/B0...", name:"Product name", optional:"optional", namePlaceholder:"Detected automatically if left blank", sku:"Reference", price:"Current price", ifKnown:"if known", priceHint:"Leave empty for automatic detection.", cancel:"Cancel", submit:"Start tracking", adding:"Analyzing…", added:"Product added to tracking", noPrice:"Product added. Price will be retrieved as soon as possible.", limit:(l:number)=>`Limit of ${l} products reached. Upgrade your plan.`, duplicate:"This product is already tracked.", invalid:"Invalid URL.", error:"Could not add this product.", network:"Network error.", footer:"One product = one exact URL. Adding Amazon does not monitor all of Amazon."
  }
}

interface Props { productLimit:number; currentCount:number; locale:Locale }

export function AddProductModal({ productLimit, currentCount, locale }: Props) {
  const t=DICT[locale]; const router=useRouter(); const [open,setOpen]=useState(false); const [loading,setLoading]=useState(false); const [error,setError]=useState<string|null>(null); const [success,setSuccess]=useState<string|null>(null)
  const [url,setUrl]=useState(""); const [name,setName]=useState(""); const [sku,setSku]=useState(""); const [price,setPrice]=useState("")
  const atLimit=currentCount>=productLimit

  async function submit(e:React.FormEvent){
    e.preventDefault(); if(!url.trim()) return; setLoading(true); setError(null)
    const manual=price.trim()?parseFloat(price.trim().replace(",",".")):undefined
    try{
      const res=await fetch("/api/products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:url.trim(),name:name.trim()||undefined,sku:sku.trim()||undefined,price:manual!=null&&Number.isFinite(manual)?manual:undefined})})
      const data=await res.json()
      if(!res.ok){setError(data.error==="LIMIT_REACHED"?t.limit(productLimit):data.error==="DUPLICATE_URL"?t.duplicate:data.error==="INVALID_INPUT"?data.details?.[0]?.message||t.invalid:t.error);setLoading(false);return}
      setSuccess(data.product?.currentPrice!=null?t.added:`${t.noPrice}`)
      setTimeout(()=>{setOpen(false);setSuccess(null);setUrl("");setName("");setSku("");setPrice("");router.refresh()},1100)
    }catch{setError(t.network);setLoading(false)}
  }

  return <>
    <button onClick={()=>!atLimit&&setOpen(true)} disabled={atLimit} className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"><Plus className="h-4 w-4"/>{t.add}</button>
    {open&&<div className="fixed inset-0 z-50 flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={()=>setOpen(false)}/><div className="relative w-full max-w-lg bg-[#0F1016] border border-white/10 rounded-2xl shadow-2xl">
      <div className="px-6 py-5 border-b border-white/8 flex items-center justify-between"><div className="flex items-center gap-3"><div className="h-9 w-9 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center"><ShoppingBag className="h-4 w-4 text-[#A78BFA]"/></div><div><h2 className="text-white font-bold">{t.title}</h2><p className="text-xs text-gray-500 mt-0.5">{t.used(currentCount,productLimit)}</p></div></div><button onClick={()=>setOpen(false)} className="text-gray-500 hover:text-white"><X className="h-5 w-5"/></button></div>
      <form onSubmit={submit} className="p-6 space-y-5">
        <div><label className="block text-xs font-semibold text-gray-300 mb-2">{t.url}</label><div className="relative"><Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"/><input autoFocus type="url" required value={url} onChange={e=>setUrl(e.target.value)} placeholder={t.placeholder} className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#8B5CF6]/60"/></div><p className="text-xs text-gray-600 mt-2">{t.hint}</p></div>
        <div><label className="block text-xs font-semibold text-gray-300 mb-2">{t.name} <span className="text-gray-600">({t.optional})</span></label><div className="relative"><Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"/><input value={name} onChange={e=>setName(e.target.value)} placeholder={t.namePlaceholder} className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#8B5CF6]/60"/></div></div>
        <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-gray-300 mb-2">{t.sku} <span className="text-gray-600">({t.optional})</span></label><div className="relative"><Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"/><input value={sku} onChange={e=>setSku(e.target.value)} className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#8B5CF6]/60"/></div></div><div><label className="block text-xs font-semibold text-gray-300 mb-2">{t.price} <span className="text-gray-600">({t.ifKnown})</span></label><div className="relative"><Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"/><input inputMode="decimal" value={price} onChange={e=>setPrice(e.target.value)} placeholder="19.99" className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#8B5CF6]/60"/></div></div></div><p className="text-xs text-gray-600">{t.priceHint}</p>
        <div className="rounded-xl border border-[#8B5CF6]/15 bg-[#8B5CF6]/5 p-3 text-xs text-gray-400">{t.footer}</div>
        {error&&<div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">{error}</div>}{success&&<div className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">{success}</div>}
        <div className="flex gap-3"><button type="button" onClick={()=>setOpen(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-sm rounded-xl">{t.cancel}</button><button type="submit" disabled={loading||!!success} className="flex-1 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-60 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2">{loading&&<Loader2 className="h-4 w-4 animate-spin"/>}{loading?t.adding:t.submit}</button></div>
      </form></div></div>}
  </>
}
