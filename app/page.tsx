import type { Metadata } from "next";
import { PEHero } from "@/components/home/pe-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { AICapabilities } from "@/components/home/ai-capabilities";
import { SprintTimeline } from "@/components/home/sprint-timeline";
import { ServicesFlip } from "@/components/home/services-flip";
import { ClientSuccessSection } from "@/components/home/client-success-section";
import { TestimonialsStack } from "@/components/home/testimonials-stack";
import { ValuePillars } from "@/components/home/value-pillars";
import { TechPartners } from "@/components/home/tech-partners";
import { FAQSection } from "@/components/home/faq-section";
import { LabsPreview } from "@/components/home/labs-preview";
import { FinalCTA } from "@/components/home/final-cta";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("home");

export default function Home() {
  return (
    <>
      <PEHero />
      <TrustIndicators />
      <AICapabilities />
      <SprintTimeline />
      <ServicesFlip />
      <ClientSuccessSection />
      <TestimonialsStack />
      <ValuePillars />
      <TechPartners />
      <FAQSection />
      <LabsPreview />
      <FinalCTA />
    </>
  );
}
