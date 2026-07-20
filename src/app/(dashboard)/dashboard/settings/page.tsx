import { getLocale } from "@/lib/i18n/locale"
import SettingsClient from "./settings-client"

export default async function SettingsPage() {
  const locale = await getLocale()
  return <SettingsClient locale={locale} />
}
