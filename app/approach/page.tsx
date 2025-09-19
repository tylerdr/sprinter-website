import { Metadata } from "next";
import { PeopleFirstHero } from "@/components/approach/hero";
import { FourPillars } from "@/components/approach/four-pillars";
import { StartSmall } from "@/components/approach/start-small";
import { DocumentIntelligence } from "@/components/approach/document-intelligence";
import { ChangePlaybook } from "@/components/approach/change-playbook";
import { WhatWeMeasure } from "@/components/approach/what-we-measure";
import { HowToStart } from "@/components/approach/how-to-start";

export const metadata: Metadata = {
  title: "People-First AI Approach | Sprinter AI",
  description: "Technology isn't the hard part—adoption is. We start small with a use case that improves everyday work. When employees feel the win, momentum takes care of the rest.",
  openGraph: {
    title: "People-First AI Approach | Sprinter AI",
    description: "Start with one document type your team will love. Expand to end-to-end automation. AI done FOR people, not TO people.",
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