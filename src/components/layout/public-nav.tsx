import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function PublicNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/favicon.png" alt="Conforva" className="h-8 w-8 object-contain" />
          <span className="font-bold text-gray-900">Conforva</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500">
          <Link href="/#fonctionnalites" className="hover:text-gray-900 transition-colors">Fonctionnalités</Link>
          <Link href="/#tarifs" className="hover:text-gray-900 transition-colors">Tarifs</Link>
          <Link href="/faq" className="hover:text-gray-900 transition-colors">FAQ</Link>
          <Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/auth/login" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            Connexion
          </Link>
          <Link href="/auth/login">
            <Button size="sm" className="gap-1.5">Essai gratuit <ChevronRight className="h-3.5 w-3.5" /></Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export function PublicFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <img src="/favicon.png" alt="Conforva" className="h-7 w-7 object-contain" />
              <span className="font-bold text-gray-900">Conforva</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Conformité GPSR simplifiée pour les e-commerçants vendant dans l'Union Européenne.
            </p>
            <p className="mt-3 text-xs text-gray-400">support@conforva.com</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Produit</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/#fonctionnalites" className="hover:text-gray-900 transition-colors">Fonctionnalités</Link></li>
              <li><Link href="/#tarifs" className="hover:text-gray-900 transition-colors">Tarifs</Link></li>
              <li><Link href="/faq" className="hover:text-gray-900 transition-colors">FAQ</Link></li>
              <li><Link href="/status" className="hover:text-gray-900 transition-colors">Statut du service</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Entreprise</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-gray-900 transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link></li>
              <li><Link href="/security" className="hover:text-gray-900 transition-colors">Sécurité</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Légal</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/cgu" className="hover:text-gray-900 transition-colors">CGU</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Confidentialité</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-gray-900 transition-colors">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Conforva. Tous droits réservés.</p>
          <p className="text-xs text-gray-400 text-center max-w-md leading-relaxed">
            Les documents générés par Conforva constituent une aide structurée. Ils ne remplacent pas l'avis d'un expert en conformité.
          </p>
        </div>
      </div>
    </footer>
  )
}
