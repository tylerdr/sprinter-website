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
    <div className="spr-theme spr-page">
      <Header />
      <main>
        <AnimatedSection className="spr-container" delay={0.05}>
          <p className="spr-kicker">AI READINESS SPRINT ($2,500)</p>
          <h1 className="spr-heading-xl mt-4 max-w-4xl">Full breakdown of the $2,500 Sprint</h1>
          <p className="spr-body-lg mt-6 max-w-3xl">
            We map your operations in 48 hours. Every process, every bottleneck, every opportunity.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://cal.com/tyler-dreher"
              target="_blank"
              rel="noopener noreferrer"
              className="spr-button spr-button-primary"
            >
              Book your Sprint
            </a>
            <a href="/edge" className="spr-button spr-button-secondary">
              See Sprinter Edge
            </a>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              "48-hour turnaround",
              "20-60 scored opportunities",
              "$200K+ annual value target",
            ].map((item) => (
              <li key={item} className="spr-card spr-card-tight p-3 text-sm text-[color:var(--spr-text-soft)]">
                {item}
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection className="spr-container spr-section-divider" delay={0.05}>
          <h2 className="spr-heading-lg">What's included in 48 hours</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {included.map((item) => (
              <article key={item} className="spr-card p-5 text-[color:var(--spr-text-muted)]">
                {item}
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="spr-container" delay={0.05}>
          <h2 className="spr-heading-lg">Process map visual</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Step 01", "Every process"],
              ["Step 02", "Every bottleneck"],
              ["Step 03", "Every opportunity"],
            ].map(([step, text]) => (
              <div key={step} className="spr-card spr-card-accent p-5">
                <p className="spr-kicker">{step}</p>
                <p className="mt-3 text-[color:var(--spr-text)]">{text}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="spr-container spr-section-divider" delay={0.05}>
          <h2 className="spr-heading-lg">$200K identification guarantee</h2>
          <p className="spr-body-lg mt-5 max-w-3xl">
            Guarantee: We identify $200K+ in annual value or it's free.
          </p>
        </AnimatedSection>

        <AnimatedSection className="spr-container" delay={0.05}>
          <h2 className="spr-heading-lg">FAQ</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="spr-card p-5">
                <h3 className="text-lg font-semibold text-[color:var(--spr-text)]">{faq.question}</h3>
                <p className="mt-2 text-[color:var(--spr-text-muted)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="spr-container spr-section-topline" delay={0.05}>
          <h2 className="spr-heading-lg">Book your AI Readiness Sprint</h2>
          <div className="mt-7">
            <a
              href="https://cal.com/tyler-dreher"
              target="_blank"
              rel="noopener noreferrer"
              className="spr-button spr-button-primary"
            >
              Book your Sprint
            </a>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((item) => (
              <li key={item} className="spr-card spr-card-tight p-4 text-sm text-[color:var(--spr-text-muted)]">
                {item}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
