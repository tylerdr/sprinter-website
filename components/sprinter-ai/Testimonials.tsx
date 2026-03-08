"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const outcomes = [
  {
    result: "Quoting time reduced from 4 hours to 15 minutes per plan. Designers now focus on design instead of spreadsheets. ROI was evident within weeks.",
    context: "Cabinet manufacturing operations",
    icon: "\u2699\uFE0F",
  },
  {
    result: "Nurses managing 5\u00D7 more patients with better outcomes. Clinical staff focuses on patients who need hands-on care while AI handles monitoring and triage.",
    context: "Healthcare patient monitoring",
    icon: "\uD83C\uDFE5",
  },
  {
    result: "Non-QM loan complexity turned into a competitive advantage. Guideline research that took hours now happens in seconds across 50+ lenders.",
    context: "Mortgage lending operations",
    icon: "\uD83C\uDFE6",
  },
];

export default function Testimonials() {
  return (
    <AnimatedSection id="testimonials" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>Client Outcomes</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center mb-12">Results that speak for themselves.</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {outcomes.map((item) => (
          <article key={item.context} className="spr-card spr-card-accent p-6">
            <div className="text-2xl mb-4">{item.icon}</div>
            <p className="text-base leading-relaxed text-[color:var(--spr-text-soft)] mb-4">
              {item.result}
            </p>
            <footer>
              <p className="text-sm font-semibold text-[color:var(--spr-text-muted)] uppercase tracking-wide">{item.context}</p>
            </footer>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
