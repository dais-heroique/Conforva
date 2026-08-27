import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import { headers } from "next/headers"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"

const dmSans=DM_Sans({subsets:["latin"],display:"swap",variable:"--font-sans"})
const BASE_URL="https://conforva.com"
const JSON_LD={"@context":"https://schema.org","@graph":[
 {"@type":"Organization","@id":`${BASE_URL}/#organization`,name:"Conforva",url:BASE_URL,logo:{"@type":"ImageObject",url:`${BASE_URL}/favicon.svg`},contactPoint:{"@type":"ContactPoint",email:"contact.conforva@gmail.com",contactType:"customer support",availableLanguage:["French","English"]}},
 {"@type":"WebSite","@id":`${BASE_URL}/#website`,url:BASE_URL,name:"Conforva",publisher:{"@id":`${BASE_URL}/#organization`},inLanguage:["fr-FR","en-US"]},
 {"@type":"SoftwareApplication",name:"Conforva",applicationCategory:"BusinessApplication",applicationSubCategory:"Competitive Intelligence",operatingSystem:"Web",url:BASE_URL,description:"Plateforme de veille concurrentielle e-commerce qui surveille les produits choisis, détecte les changements de prix et de disponibilité et utilise l'IA pour prioriser les actions.",featureList:["Surveillance des prix produit par produit","Détection des changements de disponibilité","Historique des prix","Alertes","Analyse IA","Surveillance multi-boutiques"],offers:[{"@type":"Offer",name:"Starter",price:"29",priceCurrency:"EUR"},{"@type":"Offer",name:"Growth",price:"79",priceCurrency:"EUR"},{"@type":"Offer",name:"Pro",price:"199",priceCurrency:"EUR"}],publisher:{"@id":`${BASE_URL}/#organization`}},
 {"@type":"FAQPage","@id":`${BASE_URL}/#faq`,mainEntity:[
  {"@type":"Question",name:"Conforva surveille-t-il tous les produits d'un site ?",acceptedAnswer:{"@type":"Answer",text:"Non. Conforva surveille les fiches produits exactes choisies par l'utilisateur. Ajouter un produit Amazon ne signifie pas surveiller tout Amazon."}},
  {"@type":"Question",name:"Que surveille Conforva ?",acceptedAnswer:{"@type":"Answer",text:"Conforva peut suivre le prix, la disponibilité et l'historique d'un produit sélectionné, puis signaler les changements importants."}},
  {"@type":"Question",name:"Comment fonctionne l'analyse IA de Conforva ?",acceptedAnswer:{"@type":"Answer",text:"L'IA synthétise les changements détectés sur les produits surveillés afin d'aider les équipes e-commerce à identifier les situations qui méritent leur attention."}},
  {"@type":"Question",name:"Faut-il installer quelque chose ?",acceptedAnswer:{"@type":"Answer",text:"Non. L'utilisateur ajoute l'URL exacte d'une fiche produit et Conforva s'occupe de la surveillance."}}
 ]}
]}

export const metadata:Metadata={metadataBase:new URL(BASE_URL),title:{default:"Conforva — Veille concurrentielle IA pour e-commerçants",template:"%s | Conforva"},description:"Conforva surveille les prix et stocks des produits concurrents et utilise l'IA pour transformer les changements du marché en actions prioritaires.",keywords:["veille concurrentielle e-commerce","surveillance prix concurrents","intelligence concurrentielle","veille tarifaire","monitoring prix produit","analyse concurrentielle IA","competitive intelligence e-commerce","price monitoring","competitor price tracking","AI competitive intelligence"],authors:[{name:"Conforva",url:BASE_URL}],creator:"Conforva",publisher:"Conforva",robots:{index:true,follow:true,googleBot:{index:true,follow:true,maxSnippet:-1,maxImagePreview:"large",maxVideoPreview:-1}},icons:{icon:[{url:"/favicon.svg",type:"image/svg+xml"},{url:"/favicon.ico",sizes:"any"}],shortcut:"/favicon.ico"},openGraph:{type:"website",siteName:"Conforva",title:"Conforva — Veille concurrentielle IA pour e-commerce",description:"Surveillez les produits qui comptent, détectez les mouvements de prix et laissez l'IA vous aider à prioriser les actions.",url:BASE_URL,locale:"fr_FR",alternateLocale:["en_US"]},twitter:{card:"summary_large_image",title:"Conforva — Veille concurrentielle IA",description:"Surveillance produit + alertes + analyse IA pour e-commerce."},alternates:{canonical:BASE_URL,languages:{"fr-FR":BASE_URL,"en-US":`${BASE_URL}/en`}}}
export const viewport:Viewport={themeColor:"#08090C",width:"device-width",initialScale:1,viewportFit:"cover"}
export default async function RootLayout({children}:{children:React.ReactNode}){const pathname=(await headers()).get("x-pathname")??"";const lang=pathname.startsWith("/en")?"en":"fr";return <html lang={lang} suppressHydrationWarning><head><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(JSON_LD)}}/></head><body className={`${dmSans.variable} font-[family-name:var(--font-sans)]`}>{children}<Toaster/><Analytics/></body></html>}
