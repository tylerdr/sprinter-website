import type { Metadata } from "next";
import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Footer from "@/components/sprinter-ai/Footer";
import Header from "@/components/sprinter-ai/Header";
export const metadata: Metadata = {
  title: "Sprinter Edge ($8K/mo) | sprinter.ai",
  description: "Deploy 3-5 custom AI agents in two weeks with measurable ROI.",
};


const timeline = [
  "We build and deploy 3-5 custom AI agents in the first two weeks.",
  "They integrate with your tools.",
  "They learn your business.",
  "They start producing value immediately.",
];

const examples = [
  "They read your emails, triage your inbox, draft responses",
  "They research prospects, enrich your CRM, prep your sales calls",
  "They monitor your operations, flag issues, generate reports",
  "They work nights, weekends, and holidays — on your processes, with your data",
];

const faqs = [
  {
    question: "What is the commitment?",
    answer: "90-day minimum.",
  },
  {
    question: "How do you measure performance?",
    answer: "ROI guarantee or we work free until you see it.",
  },
  {
    question: "What happens after deployment?",
    answer: "Monthly strategy sessions. New capabilities. Ongoing optimization.",
  },
];

export default function EdgePage() {
  return (
    <>
      <Header />
      <main>
        <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8" delay={0.05}>
          <p className="text-sm uppercase tracking-[0.16em] text-[#3B82F6]">SPRINTER EDGE — $8,000/mo</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-[#FAFAFA] sm:text-5xl">
            Full breakdown of $8K/mo retainer
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-[#A1A1AA]">
            We build and deploy 3-5 custom AI agents in the first two weeks.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="/sprint"
              className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#fb923c]"
            >
              Start with a Sprint
            </a>
            <a
              href="https://cal.com/tyler-dreher"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#3B82F6]/60 px-6 py-3 text-sm font-semibold text-[#FAFAFA] transition hover:border-[#3B82F6] hover:text-[#3B82F6]"
            >
              Book a Call
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mx-auto w-full max-w-6xl border-y border-white/10 px-4 py-16 sm:px-6 lg:px-8" delay={0.05}>
          <h2 className="text-2xl font-semibold text-[#FAFAFA] sm:text-3xl">Agent deployment timeline</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <article key={item} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-[#A1A1AA]">
                {item}
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8" delay={0.05}>
          <h2 className="text-2xl font-semibold text-[#FAFAFA] sm:text-3xl">What agents can do (with examples)</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {examples.map((example) => (
              <li key={example} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-[#A1A1AA]">
                {example}
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection className="mx-auto w-full max-w-6xl border-y border-white/10 px-4 py-16 sm:px-6 lg:px-8" delay={0.05}>
          <h2 className="text-2xl font-semibold text-[#FAFAFA] sm:text-3xl">90-day ROI guarantee</h2>
          <p className="mt-5 max-w-3xl text-lg text-[#A1A1AA]">90-day minimum. ROI guarantee or we work free until you see it.</p>
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
          <h2 className="text-3xl font-semibold text-[#FAFAFA] sm:text-4xl">Start with a Sprint or book a call</h2>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <a
              href="/sprint"
              className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#fb923c]"
            >
              Start with a Sprint
            </a>
            <a
              href="https://cal.com/tyler-dreher"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#3B82F6]/60 px-6 py-3 text-sm font-semibold text-[#FAFAFA] transition hover:border-[#3B82F6] hover:text-[#3B82F6]"
            >
              Book a Call
            </a>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
