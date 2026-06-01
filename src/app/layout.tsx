import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Conforva — Conformité GPSR pour e-commerçants EU",
  description: "Générez votre dossier de conformité GPSR (UE 2023/988) en quelques minutes. Analyse de risque IA, dossier technique PDF, étiquetage multilingue.",
  keywords: ["GPSR", "conformité UE", "dossier technique", "analyse de risque", "étiquetage produit"],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "Conforva — Conformité GPSR simplifiée",
    description: "SaaS de conformité GPSR pour e-commerçants vendant dans l'UE",
    type: "website",
    images: [{ url: "/favicon.png", width: 512, height: 512, alt: "Conforva" }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
