"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const bullets = [
  "Email triage and response drafting — your inbox sorted, prioritized, and handled before you open it",
  "Document processing and data extraction — invoices, specs, and contracts parsed in seconds, not hours",
  "CRM enrichment and sales prep — prospects researched, records updated, and call briefs generated automatically",
  "Quoting and estimation — multi-source pricing assembled and formatted, cutting days down to minutes",
  "Operational reporting — dashboards populated, anomalies flagged, and summaries delivered on schedule",
];

export default function Solution() {
  return (
    <AnimatedSection id="solution" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>The Solution</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center max-w-4xl mx-auto">
        We analyze your operations, find the highest-value opportunities, then deploy AI agents that handle them.
      </h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        Powered by OpenClaw — our AI operations platform. Custom agents that live inside your business,
        work with your data, and integrate with the tools you already use.
      </p>
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
      <p className="mt-8 text-xl font-medium text-center text-[color:var(--spr-text)]">
        Your team empowered. Your operations automated. Running while you sleep.
      </p>
    </AnimatedSection>
  );
}
