import type { Metadata } from "next";
import { PEHero } from "@/components/home/pe-hero";
import { ClientSuccessSection } from "@/components/home/client-success-section";
import { PortfolioLogos } from "@/components/home/portfolio-logos";
import { LabsPreview } from "@/components/home/labs-preview";
import { ValuePillars } from "@/components/home/value-pillars";
import { HowItWorks } from "@/components/home/how-it-works";
import { ForYourWorld } from "@/components/home/for-your-world";
import { ProofMetrics } from "@/components/home/proof-metrics";
import { FinalCTA } from "@/components/home/final-cta";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("home");

export default function Home() {
  return (
    <>
      <PEHero />
      <ClientSuccessSection />
      <PortfolioLogos />
      <ValuePillars />
      <HowItWorks />
      <ForYourWorld />
      <ProofMetrics />
      <LabsPreview />
      <FinalCTA />
    </>
  );
}
