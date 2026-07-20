import { getLocale } from "@/lib/i18n/locale"
import { NewCompetitorForm } from "./new-competitor-form"

export default async function NewCompetitorPage() {
  const locale = await getLocale()
  return <NewCompetitorForm locale={locale} />
}
