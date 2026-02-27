import type { Metadata } from "next";
import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

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
  "They work nights, weekends, and holidays - on your processes, with your data",
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
    <div className="spr-theme spr-page">
      <main>
        <AnimatedSection className="spr-container" delay={0.05}>
          <p className="spr-kicker">SPRINTER EDGE - $8,000/mo</p>
          <h1 className="spr-heading-xl mt-4 max-w-4xl">Full breakdown of $8K/mo retainer</h1>
          <p className="spr-body-lg mt-6 max-w-3xl">
            We build and deploy 3-5 custom AI agents in the first two weeks.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="/sprint" className="spr-button spr-button-primary">
              Start with a Sprint
            </a>
            <a
              href="https://cal.com/tyler-dreher"
              target="_blank"
              rel="noopener noreferrer"
              className="spr-button spr-button-secondary"
            >
              Book a Call
            </a>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {["Deploy in 2 weeks", "3-5 AI agents", "ROI tracked weekly"].map((item) => (
              <li key={item} className="spr-card spr-card-tight p-3 text-sm text-[color:var(--spr-text-soft)]">
                {item}
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection className="spr-container spr-section-divider" delay={0.05}>
          <h2 className="spr-heading-lg">Agent deployment timeline</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <article key={item} className="spr-card p-5 text-[color:var(--spr-text-muted)]">
                {item}
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="spr-container" delay={0.05}>
          <h2 className="spr-heading-lg">What agents can do (with examples)</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {examples.map((example) => (
              <li key={example} className="spr-card p-5 text-[color:var(--spr-text-soft)]">
                <span className="mr-3 inline-flex align-middle">
                  <span className="spr-list-dot" aria-hidden />
                </span>
                <span className="align-middle">{example}</span>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection className="spr-container spr-section-divider" delay={0.05}>
          <h2 className="spr-heading-lg">90-day ROI guarantee</h2>
          <p className="spr-body-lg mt-5 max-w-3xl">
            90-day minimum. ROI guarantee or we work free until you see it.
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
          <h2 className="spr-heading-lg">Start with a Sprint or book a call</h2>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <a href="/sprint" className="spr-button spr-button-primary">
              Start with a Sprint
            </a>
            <a
              href="https://cal.com/tyler-dreher"
              target="_blank"
              rel="noopener noreferrer"
              className="spr-button spr-button-secondary"
            >
              Book a Call
            </a>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
