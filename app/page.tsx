import type { Metadata } from "next";
import { PEHero } from "@/components/home/pe-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { WhatWeDo } from "@/components/home/what-we-do";
import { ClientSuccessSection } from "@/components/home/client-success-section";
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

      {/* What We Do - 3 service pillars */}
      <WhatWeDo />

      {/* Results/Success - Prove it works */}
      <ClientSuccessSection />

      {/* Questions - Address concerns */}
      <FAQSection />

      {/* Final Call to Action */}
      <FinalCTA />
    </>
  );
}