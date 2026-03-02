import CaseStudyHighlights from "@/components/sprinter-ai/CaseStudyHighlights";
import FinalCTA from "@/components/sprinter-ai/FinalCTA";
import Founder from "@/components/sprinter-ai/Founder";
import Hero from "@/components/sprinter-ai/Hero";
import HowItWorks from "@/components/sprinter-ai/HowItWorks";
import Industries from "@/components/sprinter-ai/Industries";
import Problem from "@/components/sprinter-ai/Problem";
import ProcessSection from "@/components/sprinter-ai/ProcessSection";
import Results from "@/components/sprinter-ai/Results";
import ServicesOverview from "@/components/sprinter-ai/ServicesOverview";
import Solution from "@/components/sprinter-ai/Solution";
import Testimonials from "@/components/sprinter-ai/Testimonials";
import TrustedBy from "@/components/sprinter-ai/TrustedBy";

export default function Home() {
  return (
    <div className="spr-theme spr-page">
      <main>
        <Hero />
        <TrustedBy />
        <Problem />
        <Solution />
        <ServicesOverview />
        {/* Gradient band for visual variety */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(106,167,255,0.08),_transparent_70%)]" />
          <HowItWorks />
        </div>
        <Results />
        <CaseStudyHighlights />
        {/* Gradient band for visual variety */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(255,171,102,0.06),_transparent_70%)]" />
          <Industries />
          <Testimonials />
        </div>
        <Founder />
        <ProcessSection />
        <FinalCTA />
      </main>
    </div>
  );
}
