import { getLocale } from "@/lib/i18n/locale"
import ShopifyClient from "./shopify-client"

export default async function ShopifyPage() {
  const locale = await getLocale()
  return <ShopifyClient locale={locale} />
}
