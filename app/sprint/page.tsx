import type { Metadata } from "next";
import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Footer from "@/components/sprinter-ai/Footer";
import Header from "@/components/sprinter-ai/Header";
export const metadata: Metadata = {
  title: "AI Readiness Sprint ($2,500) | sprinter.ai",
  description: "Map your operations in 48 hours and identify $200K+ in annual automation value.",
};


const included = [
  "We map your operations in 48 hours. Every process, every bottleneck, every opportunity.",
  "You get a scored backlog of 20-60 automation opportunities with ROI estimates.",
  "63 automation opportunities identified in 48 hours",
  "48-hour assessment turnaround",
];

const deliverables = [
  "Full breakdown of the $2,500 Sprint",
  "What's included in 48 hours",
  "Process map visual",
  "$200K identification guarantee",
];

const faqs = [
  {
    question: "How fast is the Sprint?",
    answer: "We map your operations in 48 hours.",
  },
  {
    question: "What do we leave with?",
    answer:
      "You get a scored backlog of 20-60 automation opportunities with ROI estimates.",
  },
  {
    question: "What guarantee is included?",
    answer: "Guarantee: We identify $200K+ in annual value or it's free.",
  },
];

export default function SprintPage() {
  return (
    <>
      <Header />
      <main>
        <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8" delay={0.05}>
          <p className="text-sm uppercase tracking-[0.16em] text-[#3B82F6]">AI READINESS SPRINT ($2,500)</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-[#FAFAFA] sm:text-5xl">
            Full breakdown of the $2,500 Sprint
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-[#A1A1AA]">
            We map your operations in 48 hours. Every process, every bottleneck, every opportunity.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://cal.com/tyler-dreher"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#fb923c]"
            >
              Book your Sprint
            </a>
            <a
              href="/edge"
              className="inline-flex items-center justify-center rounded-full border border-[#3B82F6]/60 px-6 py-3 text-sm font-semibold text-[#FAFAFA] transition hover:border-[#3B82F6] hover:text-[#3B82F6]"
            >
              See Sprinter Edge
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mx-auto w-full max-w-6xl border-y border-white/10 px-4 py-16 sm:px-6 lg:px-8" delay={0.05}>
          <h2 className="text-2xl font-semibold text-[#FAFAFA] sm:text-3xl">What's included in 48 hours</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {included.map((item) => (
              <article key={item} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-[#A1A1AA]">
                {item}
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8" delay={0.05}>
          <h2 className="text-2xl font-semibold text-[#FAFAFA] sm:text-3xl">Process map visual</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[#3B82F6]/35 bg-[#3B82F6]/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#3B82F6]">Step 01</p>
              <p className="mt-3 text-[#FAFAFA]">Every process</p>
            </div>
            <div className="rounded-xl border border-[#3B82F6]/35 bg-[#3B82F6]/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#3B82F6]">Step 02</p>
              <p className="mt-3 text-[#FAFAFA]">Every bottleneck</p>
            </div>
            <div className="rounded-xl border border-[#3B82F6]/35 bg-[#3B82F6]/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#3B82F6]">Step 03</p>
              <p className="mt-3 text-[#FAFAFA]">Every opportunity</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mx-auto w-full max-w-6xl border-y border-white/10 px-4 py-16 sm:px-6 lg:px-8" delay={0.05}>
          <h2 className="text-2xl font-semibold text-[#FAFAFA] sm:text-3xl">$200K identification guarantee</h2>
          <p className="mt-5 max-w-3xl text-lg text-[#A1A1AA]">
            Guarantee: We identify $200K+ in annual value or it's free.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8" delay={0.05}>
          <h2 className="text-2xl font-semibold text-[#FAFAFA] sm:text-3xl">FAQ</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-lg font-semibold text-[#FAFAFA]">{faq.question}</h3>
                <p className="mt-2 text-[#A1A1AA]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mx-auto w-full max-w-6xl border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8" delay={0.05}>
          <h2 className="text-3xl font-semibold text-[#FAFAFA] sm:text-4xl">Book your AI Readiness Sprint</h2>
          <div className="mt-7">
            <a
              href="https://cal.com/tyler-dreher"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#fb923c]"
            >
              Book your Sprint
            </a>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((item) => (
              <li key={item} className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-sm text-[#A1A1AA]">
                {item}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
