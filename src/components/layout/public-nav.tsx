"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ConforvaLogo } from "@/components/logo"

export function PublicNav() {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const current = window.scrollY
        if (current < 80) setVisible(true)
        else if (current > lastScrollY.current + 4) setVisible(false)
        else if (current < lastScrollY.current - 4) setVisible(true)
        lastScrollY.current = current
        ticking.current = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#060D09]/95 backdrop-blur-sm transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <ConforvaLogo size={28} />
            <span className="font-black text-white tracking-tight">CONFORVA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/50">
            <Link href="/audit-gratuit" className="text-[#00E676] font-semibold hover:text-[#00FF84] transition-colors">Audit gratuit</Link>
            <Link href="/conformite-gpsr" className="hover:text-white transition-colors">Guide GPSR</Link>
            <a href="/#tarifs" className="hover:text-white transition-colors">Tarifs</a>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden md:block text-sm text-white/50 hover:text-white px-3 py-1.5 transition-colors">
              Connexion
            </Link>
            <Link href="/auth/login">
              <Button size="sm" className="gap-1.5 bg-[#00E676] text-[#060D09] hover:bg-[#00FF84] font-bold">
                Essai gratuit <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="h-16" />
    </>
  )
}

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#060D09] py-12 px-5 text-white/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <ConforvaLogo size={26} />
              <span className="font-black text-white tracking-tight">CONFORVA</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Conformité GPSR par IA pour les e-commerçants EU.
            </p>
            <p className="mt-3 text-xs text-[#00E676]">contact.conforva@gmail.com</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Produit</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/audit-gratuit" className="text-[#00E676] font-semibold hover:text-[#00FF84] transition-colors">Audit gratuit</Link></li>
              <li><a href="/#tarifs" className="hover:text-white transition-colors">Tarifs</a></li>
              <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
              <li><Link href="/partenaires" className="hover:text-white transition-colors">Affiliés</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Ressources</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog GPSR</Link></li>
              <li><Link href="/conformite-gpsr" className="hover:text-white transition-colors">Guide GPSR</Link></li>
              <li><Link href="/gpsr-amazon" className="hover:text-white transition-colors">GPSR Amazon</Link></li>
              <li><Link href="/gpsr-shopify" className="hover:text-white transition-colors">GPSR Shopify</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Légal</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cgu" className="hover:text-white transition-colors">CGU</Link></li>
              <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/20">
          <p>© 2026 Conforva. Tous droits réservés.</p>
          <p>Les documents générés constituent une aide structurée, non un avis juridique.</p>
        </div>
      </div>
    </footer>
  )
}
