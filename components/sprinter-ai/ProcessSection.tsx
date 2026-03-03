"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import {
  ShieldCheckIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const guarantees = [
  "Scored automation backlog with ROI estimates — not a slide deck",
  "Working prototype in 48 hours where applicable",
  "Fixed pricing, no surprises, no scope creep",
  "All code, prompts, and configurations are yours",
  "30 days of post-sprint support included",
  "Sprint fee credited toward any continued engagement",
];

export default function ProcessSection() {
  return (
    <AnimatedSection id="process" className="spr-container" delay={0.05}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
            <ShieldCheckIcon className="h-4 w-4" />
            <span>Our Guarantee</span>
          </div>
        </div>
        <h2 className="spr-heading-lg text-center">Start with zero risk. See value in 48 hours.</h2>
        <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
          The AI Readiness Sprint is the fastest way to understand what AI can do for your business.
          $2,500 investment. Real opportunities identified and scored.
        </p>

        <div className="mt-12 spr-card p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {guarantees.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-[color:var(--spr-primary)]" />
                <span className="text-[color:var(--spr-text-soft)]">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.12)] p-6 text-center">
            <p className="text-2xl font-bold text-[color:var(--spr-text)]">
              <span className="text-[color:var(--spr-primary)]">$2,500</span> — 48-hour AI Readiness Sprint
            </p>
            <p className="mt-2 text-[color:var(--spr-text-muted)]">
              Your full operations map with scored automation opportunities and ROI roadmap
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
          <Link href="/ai-sprint" className="spr-button spr-button-primary">
            Book Your AI Sprint
          </Link>
          <Link href="/services" className="spr-button spr-button-secondary">
            See Our Full Methodology
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
