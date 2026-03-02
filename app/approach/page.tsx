import { Metadata } from "next";
import { PeopleFirstHero } from "@/components/approach/hero";
import { FourPillars } from "@/components/approach/four-pillars";
import { ChangePlaybook } from "@/components/approach/change-playbook";
import { WorkInSprints } from "@/components/approach/work-in-sprints";
import { AINative } from "@/components/approach/ai-native";
import { InfiniteDigitalLabor } from "@/components/approach/infinite-labor";
import { HowToStart } from "@/components/approach/how-to-start";
import { ApproachCTA } from "@/components/approach/approach-cta";

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
    <div className="spr-theme spr-page">
      <main className="overflow-x-hidden">
        <PeopleFirstHero />
        <FourPillars />
        {/* Gradient band for visual variety */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(106,167,255,0.08),_transparent_70%)]" />
          <ChangePlaybook />
          <WorkInSprints />
        </div>
        <AINative />
        {/* Gradient band for visual variety */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(255,171,102,0.06),_transparent_70%)]" />
          <InfiniteDigitalLabor />
          <HowToStart />
        </div>
        <ApproachCTA />
      </main>
    </div>
  );
}
