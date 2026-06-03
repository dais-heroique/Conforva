import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { getLocale, getDictionary } from "@/lib/i18n"
import { LocaleProvider } from "@/components/providers/locale-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Conforva — Conformité GPSR pour e-commerçants EU",
  description: "Générez votre dossier de conformité GPSR (UE 2023/988) en quelques minutes. Analyse de risque IA, dossier technique PDF, étiquetage multilingue.",
  keywords: ["GPSR", "conformité UE", "dossier technique", "analyse de risque", "étiquetage produit"],
  openGraph: {
    title: "Conforva — Conformité GPSR simplifiée",
    description: "SaaS de conformité GPSR pour e-commerçants vendant dans l'UE",
    type: "website",
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const t = await getDictionary(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <LocaleProvider t={t} locale={locale}>
          {children}
        </LocaleProvider>
        <Toaster />
      </body>
    </html>
  )
}
