import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/layout/sidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const [{ data: userData }, { data: org }] = await Promise.all([
    supabase.from("users").select("*").eq("id", user.id).single(),
    supabase.from("organizations").select("*").eq("owner_id", user.id).single(),
  ])

  if (!userData) redirect("/auth/login")
  if (!org) redirect("/onboarding")

  return (
    <div className="flex h-dvh overflow-hidden bg-gray-50">
      <Sidebar user={userData} org={org} />
      <main className="flex-1 overflow-y-auto pt-14 md:pt-0">
        {children}
      </main>
    </div>
  )
}
