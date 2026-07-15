"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { ConforvaLogo } from "@/components/logo"

export function PublicNavEn() {
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
      <header className={`fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#08090C]/90 backdrop-blur-md transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/en" className="flex items-center gap-2.5">
            <ConforvaLogo size={28} />
            <span className="font-black text-white tracking-tight" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <Link href="/en/price-comparison" className="hover:text-white transition-colors">Free tool</Link>
            <Link href="/en/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/en/faq" className="hover:text-white transition-colors">FAQ</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden sm:block text-xs text-gray-500 hover:text-white transition-colors px-2 py-1.5 border border-white/10 rounded-lg">
              FR
            </Link>
            <Link href="/auth/login" className="hidden sm:block text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors">
              Log in
            </Link>
            <Link href="/auth/register" className="flex items-center gap-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors">
              Free trial <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>
      <div className="h-16" />
    </>
  )
}

export function PublicFooterEn() {
  return (
    <footer className="border-t border-white/8 bg-[#05060A] py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/en" className="flex items-center gap-2.5 mb-3">
              <ConforvaLogo size={24} />
              <span className="font-black text-white tracking-tight" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Automated competitive intelligence for e-commerce sellers.
            </p>
            <p className="mt-3 text-xs text-gray-600">contact.conforva@gmail.com</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-3">Product</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/en#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/en/price-comparison" className="hover:text-white transition-colors">Free price comparison</Link></li>
              <li><Link href="/en/margin-calculator" className="hover:text-white transition-colors">Free margin calculator</Link></li>
              <li><Link href="/en/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/en/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-3">Company</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-white transition-colors">Version française</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-3">Legal</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/cgu" className="hover:text-white transition-colors">Terms (FR)</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy (FR)</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Legal notice (FR)</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-700">© 2026 Conforva. All rights reserved.</p>
          <p className="text-xs text-gray-700">AI-powered analysis</p>
        </div>
      </div>
    </footer>
  )
}
