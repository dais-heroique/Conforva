"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Menu, X } from "lucide-react"
import { ConforvaLogo } from "@/components/logo"

const NAV_LINKS = [
  { href: "/comparateur-prix", label: "Comparateur gratuit" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

export function PublicNav() {
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
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
      <header className={`fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#08090C]/90 backdrop-blur-md transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <ConforvaLogo size={28} />
            <span className="font-black text-white tracking-tight" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/en" className="hidden sm:block text-xs text-gray-500 hover:text-white transition-colors px-2 py-1.5 border border-white/10 rounded-lg">
              EN
            </Link>
            <Link href="/auth/login" className="hidden sm:block text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors">
              Connexion
            </Link>
            <Link href="/auth/register" className="hidden sm:flex items-center gap-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors">
              Essai gratuit <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden h-9 w-9 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/8 bg-[#08090C] px-5 py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-white/8 flex items-center gap-2">
              <Link
                href="/en"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-xs text-gray-400 hover:text-white transition-colors px-3 py-2 border border-white/10 rounded-lg"
              >
                English
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-sm text-gray-300 hover:text-white transition-colors px-3 py-2 border border-white/10 rounded-lg"
              >
                Connexion
              </Link>
            </div>
            <Link
              href="/auth/register"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors mt-2"
            >
              Essai gratuit <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </header>
      <div className="h-16" />
    </>
  )
}

export function PublicFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#05060A] py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <ConforvaLogo size={24} />
              <span className="font-black text-white tracking-tight" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Veille concurrentielle automatisée pour les e-commerçants.
            </p>
            <p className="mt-3 text-xs text-gray-600">contact.conforva@gmail.com</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-3">Produit</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/#tarifs" className="hover:text-white transition-colors">Tarifs</Link></li>
              <li><Link href="/comparateur-prix" className="hover:text-white transition-colors">Comparateur gratuit</Link></li>
              <li><Link href="/calculateur-marge-ecommerce" className="hover:text-white transition-colors">Calculateur de marge</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-3">Entreprise</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-3">Légal</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/cgu" className="hover:text-white transition-colors">CGU</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-700">© 2026 Conforva. Tous droits réservés.</p>
          <p className="text-xs text-gray-700">Analyse propulsée par intelligence artificielle</p>
        </div>
      </div>
    </footer>
  )
}
