import { Metadata } from "next";
import { PeopleFirstHero } from "@/components/approach/hero";
import { FourPillars } from "@/components/approach/four-pillars";
import { StartSmall } from "@/components/approach/start-small";
import { DocumentIntelligence } from "@/components/approach/document-intelligence";
import { ChangePlaybook } from "@/components/approach/change-playbook";
import { WhatWeMeasure } from "@/components/approach/what-we-measure";
import { HowToStart } from "@/components/approach/how-to-start";

export const metadata: Metadata = {
  title: "People-First AI Operating Partner for Private Equity | Sprinter AI",
  description: "AI done FOR people, not TO people. Our proven methodology: People → Process → Projects → Product. Start small, win early, expand systematically. 30-45 day wins guaranteed.",
  openGraph: {
    title: "People-First AI Operating Partner for Private Equity",
    description: "Start with one document type your team will love. Expand to end-to-end automation. ≥60% touchless processing with fund-level AI governance.",
    images: ["/images/og/approach.jpg"],
  },
};

export default function ApproachPage() {
  return (
    <div className="flex flex-col">
      <PeopleFirstHero />
      <FourPillars />
      <StartSmall />
      <DocumentIntelligence />
      <ChangePlaybook />
      <WhatWeMeasure />
      <HowToStart />
    </div>
  );
}