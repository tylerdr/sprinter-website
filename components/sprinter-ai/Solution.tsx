"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const bullets = [
  "They read your emails, triage your inbox, draft responses — your team focuses on relationships",
  "They research prospects, enrich your CRM, prep your sales calls — your reps close more deals",
  "They monitor your operations, flag issues, generate reports — your managers make better decisions",
  "They work nights, weekends, and holidays — on your processes, with your data, while your people do their best work",
];

export default function Solution() {
  return (
    <AnimatedSection id="solution" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>The Solution</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center">We don&apos;t sell software. We deploy an unlimited AI workforce.</h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">Custom AI agents that live inside your business — empowering your people to do what they do best:</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {bullets.map((bullet) => (
          <li key={bullet} className="spr-card p-5 text-[color:var(--spr-text-soft)]">
            <span className="mr-3 inline-flex align-middle">
              <span className="spr-list-dot" aria-hidden />
            </span>
            <span className="align-middle">{bullet}</span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xl font-medium text-center text-[color:var(--spr-text)]">Your team empowered. Your operations automated. Running while you sleep.</p>
    </AnimatedSection>
  );
}
