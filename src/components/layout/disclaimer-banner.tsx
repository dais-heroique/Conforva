import { AlertTriangle } from "lucide-react"

export function DisclaimerBanner() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
      <p>
        <strong>Avertissement légal :</strong> Conforva est un outil d'aide à la conformité GPSR (UE 2023/988).
        Les documents générés ne constituent pas un avis juridique et ne garantissent pas la conformité de votre produit.
        Une validation par un expert ou un organisme notifié reste obligatoire avant mise sur le marché UE.
      </p>
    </div>
  )
}
