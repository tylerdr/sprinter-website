import type { Metadata } from "next";
import { PEHero } from "@/components/home/pe-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { ClientSuccessSection } from "@/components/home/client-success-section";
import { ValuePillars } from "@/components/home/value-pillars";
import { TechPartners } from "@/components/home/tech-partners";
import { FAQSection } from "@/components/home/faq-section";
import { LabsPreview } from "@/components/home/labs-preview";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("home");

export default function Home() {
  return (
    <>
      <PEHero />
      <TrustIndicators />
      <ClientSuccessSection />
      <ValuePillars />
      <TechPartners />
      <FAQSection />
      <LabsPreview />
    </>
  );
}
