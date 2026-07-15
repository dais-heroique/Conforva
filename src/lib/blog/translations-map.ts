export const BLOG_TRANSLATIONS: { fr: string; en: string }[] = [
  { fr: "veille-concurrentielle-ecommerce-guide-complet", en: "ecommerce-competitive-intelligence-complete-guide" },
  { fr: "repricing-shopify-strategie-outils", en: "shopify-repricing-strategy-tools" },
  { fr: "analyser-prix-concurrents-amazon", en: "analyzing-competitor-prices-amazon" },
  { fr: "strategie-prix-quand-baisser-augmenter", en: "pricing-strategy-when-to-raise-lower-prices" },
  { fr: "outils-suivi-prix-concurrents-comparatif-2026", en: "competitor-price-tracking-tools-comparison-2026" },
  { fr: "gagner-buy-box-amazon-fba-2026", en: "win-amazon-buy-box-fba-2026" },
  { fr: "conforva-vs-price2spy-comparatif", en: "conforva-vs-price2spy-comparison" },
  { fr: "meilleur-outil-veille-prix-shopify-2026", en: "best-competitor-price-monitoring-tool-shopify-2026" },
  { fr: "dropshipping-surveiller-prix-concurrents", en: "dropshipping-monitor-competitor-prices" },
  { fr: "keepa-alternative-francaise-veille-prix", en: "keepa-alternative-competitive-price-monitoring" },
  { fr: "woocommerce-surveiller-prix-concurrents", en: "woocommerce-monitor-competitor-prices" },
  { fr: "glossaire-veille-concurrentielle-ecommerce", en: "ecommerce-competitive-intelligence-glossary" },
  { fr: "prestashop-surveiller-prix-concurrents", en: "prestashop-monitor-competitor-prices" },
]

export function getEnSlugForFr(frSlug: string): string | undefined {
  return BLOG_TRANSLATIONS.find(t => t.fr === frSlug)?.en
}

export function getFrSlugForEn(enSlug: string): string | undefined {
  return BLOG_TRANSLATIONS.find(t => t.en === enSlug)?.fr
}
