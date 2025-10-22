import type { Metadata } from "next";
import { OperatingPartnerHero } from "@/components/operating-partner/hero";
import { HowWeWork } from "@/components/operating-partner/how-we-work";
import { WhatYouGet } from "@/components/operating-partner/what-you-get";
import { GovernancePack } from "@/components/operating-partner/governance-pack";
import { ProofPoints } from "@/components/operating-partner/proof-points";
import { Workshop } from "@/components/operating-partner/workshop";
import { FAQ } from "@/components/operating-partner/faq";

export const metadata: Metadata = {
  title: "AI Operating Partner for Private Equity | Sprinter AI",
  description: "Your AI Operating Partner for lower-middle-market PE. Boringly reliable 2-3 sprint wins with fund-level governance. No API? No problem. We build the safe middle layer for QBO/Sage/desktop.",
  keywords: "PE operating partner, AI for private equity, portfolio operations, AP automation, QBO automation, Sage automation, no-API solutions, fund governance, sprint-based AI",
};

export default function OperatingPartnerPage() {
  return (
    <>
      <OperatingPartnerHero />
      <HowWeWork />
      <WhatYouGet />
      <GovernancePack />
      <ProofPoints />
      <Workshop />
      <FAQ />
    </>
  );
}