"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const highlights = [
  {
    title: "Cab-O-Matic — AI SKU Mapping Platform",
    category: "B2B SaaS / Manufacturing",
    metric: "250K+",
    metricLabel: "prices generated in 12 months",
    revenue: "$120K+ direct labor savings/year",
    quote: "This isn't just automation — it's transformation. We quote more options, close faster, and our designers focus on design instead of spreadsheets.",
    author: "Operations Director, Cabinet Manufacturer",
    slug: "ai-cabinet-automation",
  },
  {
    title: "MortgageQ — AI Guideline Intelligence",
    category: "FinTech",
    metric: "95%",
    metricLabel: "research time reduction",
    revenue: "50+ lenders searchable in seconds",
    quote: "The AI doesn't just help us manage Non-QM complexity — it turned it into our competitive advantage.",
    author: "VP Operations, Non-QM Lender",
    slug: "ai-mortgage-assistant",
  },
  {
    title: "RPM Healthcare — AI Care Coach",
    category: "Healthcare",
    metric: "5×",
    metricLabel: "patient coverage per nurse",
    revenue: "Millions in penalty avoidance",
    quote: "Nurses now manage 5× more patients with better outcomes because they focus on those who need them most.",
    author: "Chief Nursing Officer, Regional Health System",
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
      <h2 className="spr-heading-lg text-center">Real implementations. Real results.</h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        Production AI systems running across manufacturing, fintech, and healthcare. Results speak for themselves.
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
              <blockquote className="mt-auto border-t [border-color:var(--spr-border)] pt-4">
                <p className="text-sm italic text-[color:var(--spr-text-soft)]">&ldquo;{study.quote}&rdquo;</p>
                <cite className="mt-2 block text-xs text-[color:var(--spr-text-muted)] not-italic">{study.author}</cite>
              </blockquote>
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
