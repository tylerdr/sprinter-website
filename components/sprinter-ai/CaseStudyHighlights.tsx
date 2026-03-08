"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const highlights = [
  {
    title: "Cab-O-Matic \u2014 AI SKU Mapping Platform",
    category: "B2B SaaS / Manufacturing",
    metric: "250K+",
    metricLabel: "prices generated in 12 months",
    revenue: "$120K+ direct labor savings/year",
    outcome: "Multi-manufacturer quoting reduced from hours to minutes. Designers focus on design, not spreadsheets.",
    slug: "ai-cabinet-automation",
  },
  {
    title: "MortgageQ \u2014 AI Guideline Intelligence",
    category: "FinTech",
    metric: "95%",
    metricLabel: "research time reduction",
    revenue: "50+ lenders searchable in seconds",
    outcome: "Non-QM complexity turned into a competitive advantage. Loan officers close faster with confidence.",
    slug: "ai-mortgage-assistant",
  },
  {
    title: "RPM Healthcare \u2014 AI Care Coach",
    category: "Healthcare",
    metric: "5\u00D7",
    metricLabel: "patient coverage per nurse",
    revenue: "Millions in penalty avoidance",
    outcome: "Nurses manage 5\u00D7 more patients with better outcomes by focusing on those who need hands-on care.",
    slug: "ai-patient-coach",
  },
];

export default function CaseStudyHighlights() {
  return (
    <AnimatedSection id="case-studies-highlights" className="spr-container" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.14)] px-4 py-2 text-sm text-[color:var(--spr-primary)]">
          <span>Proven Results</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center">Real implementations. Measured results.</h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        Production AI systems running across manufacturing, fintech, and healthcare.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {highlights.map((study) => (
          <Link href={`/case-studies/${study.slug}`} key={study.slug} className="block group">
            <article className="spr-card p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="spr-chip">{study.category}</span>
              </div>
              <h3 className="text-lg font-semibold text-[color:var(--spr-text)] mb-3">{study.title}</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold text-[color:var(--spr-primary)]">{study.metric}</span>
                <span className="text-sm text-[color:var(--spr-text-muted)]">{study.metricLabel}</span>
              </div>
              <p className="text-sm font-semibold text-[color:var(--spr-accent)] mb-4">{study.revenue}</p>
              <p className="mt-auto border-t [border-color:var(--spr-border)] pt-4 text-sm text-[color:var(--spr-text-soft)]">
                {study.outcome}
              </p>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/case-studies" className="spr-button spr-button-secondary">
          See All Case Studies
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </AnimatedSection>
  );
}
