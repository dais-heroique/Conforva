import Link from "next/link"
import { ConforvaLogo } from "@/components/logo"
import { AlertTriangle } from "lucide-react"

const ERRORS: Record<string, string> = {
  Configuration: "Erreur de configuration du serveur d'authentification.",
  AccessDenied: "Accès refusé. Vous n'avez pas la permission d'accéder à cette ressource.",
  Verification: "Le lien de vérification est invalide ou a expiré.",
  Default: "Une erreur est survenue lors de la connexion.",
}

export default function AuthErrorPage({ searchParams }: { searchParams: { error?: string } }) {
  const message = ERRORS[searchParams.error ?? ""] ?? ERRORS.Default

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060D09] px-4">
      <div className="w-full max-w-sm text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 justify-center mb-8">
          <ConforvaLogo size={32} />
          <span className="font-black text-xl tracking-tight text-white" style={{ letterSpacing: "-0.02em" }}>CONFORVA</span>
        </Link>

        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
          <AlertTriangle className="h-10 w-10 text-red-400 mx-auto mb-4" />
          <h1 className="text-lg font-bold text-white mb-2">Erreur d'authentification</h1>
          <p className="text-sm text-gray-400 mb-6">{message}</p>
          <Link
            href="/auth/login"
            className="inline-block w-full py-2.5 bg-[#00E676] hover:bg-[#00c964] text-[#060D09] font-bold text-sm rounded-xl transition-colors"
          >
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
}
