"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const industries = [
  {
    tag: "CR",
    title: "Construction & Roofing",
    body: "Estimating, job costing, permit tracking, crew scheduling",
  },
  {
    tag: "MF",
    title: "Manufacturing",
    body: "QC, maintenance prediction, order processing, yield optimization",
  },
  {
    tag: "WS",
    title: "Wine & Spirits",
    body: "Sales enablement, territory planning, compliance, customer research",
  },
  {
    tag: "KB",
    title: "Kitchen & Bath",
    body: "Catalog management, quoting, dealer onboarding, order automation",
  },
  {
    tag: "PE",
    title: "Investment & PE",
    body: "Portfolio monitoring, deal flow, due diligence, market intelligence",
  },
  {
    tag: "PS",
    title: "Professional Services",
    body: "Client onboarding, billing, project tracking, knowledge management",
  },
];

export default function Industries() {
  return (
    <AnimatedSection id="industries" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>Industry Expertise</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center max-w-4xl mx-auto">
        We don&apos;t learn your industry on your dime. We already know it.
      </h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        Deep domain expertise across six verticals means faster implementations and better outcomes.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <article key={industry.title} className="spr-card p-6">
            <span className="spr-chip">{industry.tag}</span>
            <h3 className="mt-4 text-lg font-semibold text-[color:var(--spr-text)]">{industry.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--spr-text-muted)]">{industry.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-9 text-lg text-center text-[color:var(--spr-text-soft)]">
        Don&apos;t see your industry? If you have processes, we can automate them.
      </p>
    </AnimatedSection>
  );
}
