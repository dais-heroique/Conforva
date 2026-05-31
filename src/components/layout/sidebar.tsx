"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Package, FileText, Tag, Settings,
  CreditCard, Shield, LogOut, ChevronRight, Menu, X, Rss,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { UserRow, OrgRow } from "@/types/supabase"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Mes produits", icon: Package },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/labels", label: "Étiquettes", icon: Tag },
  { href: "/dashboard/responsible-person", label: "Pers. Responsable", icon: Shield },
  { href: "/dashboard/regulatory", label: "Veille Réglementaire", icon: Rss },
  { href: "/dashboard/billing", label: "Facturation", icon: CreditCard },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
]

interface SidebarProps {
  user: UserRow
  org: OrgRow | null
}

function NavContent({ user, org, onClose }: SidebarProps & { onClose?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={onClose}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">C</div>
          <span className="font-bold text-gray-900 text-lg">Conforva</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="rounded-lg p-1 text-gray-500 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {org && (
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs text-gray-500">Organisation</p>
          <p className="text-sm font-medium text-gray-900 truncate">{org.name}</p>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
              {isActive && <ChevronRight className="ml-auto h-3 w-3" />}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-900 truncate">{user.email}</p>
            <p className="text-xs text-gray-500 capitalize">{user.plan}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </div>
  )
}

export function Sidebar({ user, org }: SidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">C</div>
          <span className="font-bold text-gray-900">Conforva</span>
        </Link>
        <div className="w-9" />
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside className={cn(
        "md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-200 ease-in-out",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <NavContent user={user} org={org} onClose={() => setOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
        <NavContent user={user} org={org} />
      </aside>
    </>
  )
}
