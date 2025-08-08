import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { ServicesPreview } from "@/components/home/services-preview"
import { RecentWins } from "@/components/home/recent-wins"
import { InteractiveDemo } from "@/components/home/interactive-demo"
import { TrustSignals } from "@/components/home/trust-signals"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("home")

export default function Home() {
  return (
    <>
      <Hero />
      <RecentWins />
      <ServicesPreview />
      <InteractiveDemo />
      <TrustSignals />
    </>
  )
}