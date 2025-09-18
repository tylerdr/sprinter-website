import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { PEServicesHero } from "@/components/pe-services/hero";
import { ValueCreationPlaybook } from "@/components/pe-services/value-creation";
import { PortfolioAccelerators } from "@/components/pe-services/accelerators";
import { EngagementModels } from "@/components/pe-services/engagement-models";
import { SuccessMetrics } from "@/components/pe-services/success-metrics";
import { CaseStudiesSection } from "@/components/pe-services/case-studies";
import { CTASection } from "@/components/pe-services/cta-section";

export const metadata: Metadata = getPageMetadata("peServices");

export default function PEServicesPage() {
  return (
    <>
      <PEServicesHero />
      <ValueCreationPlaybook />
      <PortfolioAccelerators />
      <SuccessMetrics />
      <EngagementModels />
      <CaseStudiesSection />
      <CTASection />
    </>
  );
}