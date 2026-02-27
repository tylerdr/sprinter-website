import CTA from "@/components/sprinter-ai/CTA";
import Founder from "@/components/sprinter-ai/Founder";
import Hero from "@/components/sprinter-ai/Hero";
import HowItWorks from "@/components/sprinter-ai/HowItWorks";
import Industries from "@/components/sprinter-ai/Industries";
import Manifesto from "@/components/sprinter-ai/Manifesto";
import Problem from "@/components/sprinter-ai/Problem";
import Results from "@/components/sprinter-ai/Results";
import Solution from "@/components/sprinter-ai/Solution";
import TrustedBy from "@/components/sprinter-ai/TrustedBy";

export default function Home() {
  return (
    <div className="spr-theme spr-page">
      <main>
        <Hero />
        <TrustedBy />
        <Problem />
        <Solution />
        <HowItWorks />
        <Results />
        <Industries />
        <Founder />
        <Manifesto />
        <CTA />
      </main>
    </div>
  );
}
