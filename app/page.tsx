import CTA from "@/components/sprinter-ai/CTA";
import Footer from "@/components/sprinter-ai/Footer";
import Founder from "@/components/sprinter-ai/Founder";
import Header from "@/components/sprinter-ai/Header";
import Hero from "@/components/sprinter-ai/Hero";
import HowItWorks from "@/components/sprinter-ai/HowItWorks";
import Industries from "@/components/sprinter-ai/Industries";
import Manifesto from "@/components/sprinter-ai/Manifesto";
import Problem from "@/components/sprinter-ai/Problem";
import Results from "@/components/sprinter-ai/Results";
import Solution from "@/components/sprinter-ai/Solution";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Results />
        <Industries />
        <Founder />
        <Manifesto />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
