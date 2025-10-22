import { Metadata } from "next";
import { PeopleFirstHero } from "@/components/approach/hero";
import { FourPillars } from "@/components/approach/four-pillars";
import { ChangePlaybook } from "@/components/approach/change-playbook";
import { WorkInSprints } from "@/components/approach/work-in-sprints";
import { AINative } from "@/components/approach/ai-native";
import { InfiniteDigitalLabor } from "@/components/approach/infinite-labor";
import { HowToStart } from "@/components/approach/how-to-start";

export const metadata: Metadata = {
  title: "People-First AI Operating Partner for Private Equity | Sprinter AI",
  description: "AI done FOR people, not TO people. Our proven methodology: People → Process → Projects → Product. Work in sprints. Build AI-native. Leverage infinite digital labor.",
  openGraph: {
    title: "People-First AI Operating Partner for Private Equity",
    description: "2-3 sprint pilots that compound to full AI-native operations. Built for AI from day one. Scale without labor constraints.",
    images: ["/images/og/approach.jpg"],
  },
};

export default function ApproachPage() {
  return (
    <div className="flex flex-col">
      <PeopleFirstHero />
      <FourPillars />
      <ChangePlaybook />
      <WorkInSprints />
      <AINative />
      <InfiniteDigitalLabor />
      <HowToStart />
    </div>
  );
}