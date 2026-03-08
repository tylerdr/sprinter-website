import type { Metadata } from "next";
import { OperatingPartnerHero } from "@/components/operating-partner/hero";
import { HowWeWork } from "@/components/operating-partner/how-we-work";
import { WhatYouGet } from "@/components/operating-partner/what-you-get";
import { GovernancePack } from "@/components/operating-partner/governance-pack";
import { ProofPoints } from "@/components/operating-partner/proof-points";
import { Workshop } from "@/components/operating-partner/workshop";
import { FAQ } from "@/components/operating-partner/faq";

export const metadata: Metadata = {
  title: "AI Operating Partner | Sprinter AI",
  description: "Embedded AI leadership for organizations managing multiple business units. Sprint-based wins with measurable outcomes.",
  robots: { index: false, follow: false },
};

export default function OperatingPartnerPage() {
  return (
    <div className="spr-theme spr-page">
      <OperatingPartnerHero />
      <HowWeWork />
      <WhatYouGet />
      <GovernancePack />
      <ProofPoints />
      <Workshop />
      <FAQ />
    </div>
  );
}