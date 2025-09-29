import type { Metadata } from "next";
import { PEHero } from "@/components/home/pe-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { AICapabilities } from "@/components/home/ai-capabilities";
import { ServicesFlip } from "@/components/home/services-flip";
import { ClientSuccessSection } from "@/components/home/client-success-section";
import { ValuePillars } from "@/components/home/value-pillars";
import { TechPartners } from "@/components/home/tech-partners";
import { LabsPreview } from "@/components/home/labs-preview";
import { FAQSection } from "@/components/home/faq-section";
import { FinalCTA } from "@/components/home/final-cta";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("home");

export default function Home() {
  return (
    <>
      {/* Hero - First impression */}
      <PEHero />

      {/* Trust/Social Proof - Build credibility */}
      <TrustIndicators />

      {/* Core Capabilities - What we do */}
      <AICapabilities />

      {/* Services - How we help */}
      <ServicesFlip />

      {/* Results/Success - Prove it works */}
      <ClientSuccessSection />

      {/* Value Creation - PE specific value */}
      <ValuePillars />

      {/* Technology Partners - Show expertise */}
      <TechPartners />

      {/* Interactive Labs - Engage users */}
      <LabsPreview />

      {/* Questions - Address concerns */}
      <FAQSection />

      {/* Final Call to Action */}
      <FinalCTA />
    </>
  );
}