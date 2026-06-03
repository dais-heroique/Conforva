"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Package, FileText, Tag, Settings,
  Shield, LogOut, ChevronRight, Menu, X,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { UserRow, OrgRow } from "@/types/supabase"
import { useT } from "@/components/providers/locale-provider"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

interface SidebarProps {
  user: UserRow
  org: OrgRow | null
}

function NavContent({ user, org, onClose }: SidebarProps & { onClose?: () => void }) {
  const t = useT()
  const tSidebar = t.dashboard.sidebar
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: "/dashboard", label: tSidebar.dashboard, icon: LayoutDashboard },
    { href: "/dashboard/products", label: tSidebar.products, icon: Package },
    { href: "/dashboard/documents", label: tSidebar.documents, icon: FileText },
    { href: "/dashboard/labels", label: tSidebar.labels, icon: Tag },
    { href: "/dashboard/responsible-person", label: tSidebar.responsiblePerson, icon: Shield },
    { href: "/dashboard/settings", label: tSidebar.settings, icon: Settings },
  ]

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between px-5 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={onClose}>
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-white font-bold text-xs">C</div>
          <span className="font-bold text-gray-900">Conforva</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {org && (
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">{tSidebar.organisation}</p>
          <p className="text-sm font-semibold text-gray-800 truncate mt-0.5">{org.name}</p>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-blue-600" : "text-gray-400")} />
              {item.label}
              {isActive && <ChevronRight className="ml-auto h-3 w-3 text-blue-400" />}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-100 p-3 space-y-1">
        <div className="px-3 py-1">
          <LanguageSwitcher className="w-full text-sm" />
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-800 truncate">{user.email}</p>
            <p className="text-[11px] text-gray-400 capitalize">{user.plan}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {tSidebar.signOut}
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
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-gray-100 bg-white px-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-50 transition-colors"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/dashboard">
          <span className="font-bold text-gray-900 text-sm">Conforva</span>
        </Link>
        <div className="w-9" />
      </div>

      {/* Mobile overlay — stops above the bottom safe area so it never colors the home indicator strip */}
      {open && (
        <div
          className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black/30"
          style={{ bottom: "env(safe-area-inset-bottom, 0px)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside className={cn(
        "md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transition-transform duration-150 ease-in-out",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <NavContent user={user} org={org} onClose={() => setOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen w-56 shrink-0 flex-col border-r border-gray-100 bg-white">
        <NavContent user={user} org={org} />
      </aside>
    </>
  )
}
