"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
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
        if (current < 80) {
          setVisible(true)
        } else if (current > lastScrollY.current + 4) {
          setVisible(false)
        } else if (current < lastScrollY.current - 4) {
          setVisible(true)
        }
        lastScrollY.current = current
        ticking.current = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#060D09]/90 backdrop-blur-md transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <ConforvaLogo size={28} />
            <span className="font-black text-white tracking-tight" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <Link href="/#fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</Link>
            <Link href="/#tarifs" className="hover:text-white transition-colors">Tarifs</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/partenaires" className="hover:text-white transition-colors">Partenaires</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="hidden sm:block text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors">
              Connexion
            </Link>
            <Link
              href="/auth/register"
              className="flex items-center gap-1.5 bg-[#00E676] hover:bg-[#00c964] text-[#060D09] font-bold text-sm px-4 py-2 rounded-xl transition-colors"
            >
              Essai gratuit <ArrowRight className="h-3.5 w-3.5" />
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
    <footer className="border-t border-white/8 bg-[#030806] py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <ConforvaLogo size={24} />
              <span className="font-black text-white tracking-tight" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Agent IA de veille concurrentielle pour les e-commerçants.
            </p>
            <p className="mt-3 text-xs text-gray-600">contact.conforva@gmail.com</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-3">Produit</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/#fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
              <li><Link href="/#tarifs" className="hover:text-white transition-colors">Tarifs</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-3">Entreprise</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/partenaires" className="hover:text-white transition-colors">Partenaires</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-3">Légal</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/cgu" className="hover:text-white transition-colors">CGU</Link></li>
              <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Conforva. Tous droits réservés.</p>
          <p className="text-xs text-gray-600">Intelligence artificielle propulsée par Gemini AI</p>
        </div>
      </div>
    </footer>
  )
}
