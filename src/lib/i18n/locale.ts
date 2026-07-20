import { cookies } from "next/headers"

export type Locale = "fr" | "en"

export const LOCALE_COOKIE = "dashboard_locale"

export async function getLocale(): Promise<Locale> {
  const store = await cookies()
  return store.get(LOCALE_COOKIE)?.value === "en" ? "en" : "fr"
}
