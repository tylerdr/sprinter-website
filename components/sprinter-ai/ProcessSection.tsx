"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import {
  ShieldCheckIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const deliverables = [
  "Full operations audit — every process mapped and scored for automation potential",
  "Prioritized backlog of AI opportunities with ROI estimates",
  "Recommended agent architecture and integration plan",
  "Timeline and investment estimate for deployment",
  "No obligation — the assessment is yours to keep regardless",
  "Assessment investment credited toward any engagement",
];

export default function ProcessSection() {
  return (
    <AnimatedSection id="process" className="spr-container" delay={0.05}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
            <ShieldCheckIcon className="h-4 w-4" />
            <span>Zero Risk</span>
          </div>
        </div>
        <h2 className="spr-heading-lg text-center">Start with a free assessment. See the opportunities before you commit.</h2>
        <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
          We analyze your operations, identify the highest-value automation opportunities,
          and show you exactly where AI agents can make an impact — before you spend a dollar.
        </p>

        <div className="mt-12 spr-card p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-[color:var(--spr-primary)]" />
                <span className="text-[color:var(--spr-text-soft)]">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.12)] p-6 text-center">
            <p className="text-2xl font-bold text-[color:var(--spr-text)]">
              <span className="text-[color:var(--spr-primary)]">Free</span> AI Operations Assessment
            </p>
            <p className="mt-2 text-[color:var(--spr-text-muted)]">
              For qualifying businesses — a full operations audit with scored automation opportunities and ROI roadmap
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/contact" className="spr-button spr-button-primary">
            Get Your Free Assessment
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
