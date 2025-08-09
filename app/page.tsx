import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TimeToBuild } from "@/components/home/time-to-build";
import { Products } from "@/components/home/products";
import { ServicesPreview } from "@/components/home/services-preview";
import { RecentWins } from "@/components/home/recent-wins";
import { InteractiveDemo } from "@/components/home/interactive-demo";
import { HumanCenteredSection } from "@/components/home/human-centered";
import { WhoWeWorkWith } from "@/components/home/who-we-work-with";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("home");

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <WhoWeWorkWith />
      <RecentWins />
      <TimeToBuild />
      <ServicesPreview />
      <InteractiveDemo />
      <HumanCenteredSection />
    </>
  );
}
