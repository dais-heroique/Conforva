import type { Metadata } from "next"
import HomePageFr from "./home-client"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://conforva.com",
    languages: {
      "fr-FR": "https://conforva.com",
      "en-US": "https://conforva.com/en",
    },
  },
}

export default function Page() {
  return <HomePageFr />
}
