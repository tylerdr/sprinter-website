"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";
import { CheckIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const options = [
  {
    title: "90-Minute People-First AI Workshop",
    price: "$1,500",
    description: "Interactive session with your team to identify high-impact wedges and build buy-in",
    deliverables: [
      "AI Opportunity Roadmap",
      "Top 3 wedge candidates",
      "Adoption playbook",
      "ROI projections",
    ],
    note: "Applied as credit to any package within 30 days",
    cta: "Book Workshop",
    href: "/contact?product=workshop",
  },
  {
    title: "2-Week Wedge Sprint",
    price: "$20,000",
    description: "Pick one document type, deliver a working solution, prove the value",
    deliverables: [
      "Production-ready automation",
      "Acceptance criteria validation",
      "Training & documentation",
      "30-day support",
    ],
    note: "If we miss acceptance criteria, remedial sprint at our cost",
    cta: "Start Your Sprint",
    href: "/contact?product=wedge-sprint",
  },
];

export function HowToStart() {
  return (
    <AnimatedSection id="how-to-start" className="spr-container" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>Get Started</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center mb-4">How to Start</h2>
      <p className="spr-body-lg text-center max-w-3xl mx-auto mb-12">
        Two proven paths to begin your people-first AI journey.
      </p>

      <div className="grid gap-8 md:grid-cols-2 mb-12">
        {options.map((option) => (
          <article key={option.title} className="spr-card p-8">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-semibold text-[color:var(--spr-text)] flex-1 mr-4">{option.title}</h3>
              <span className="text-2xl font-bold text-[color:var(--spr-accent)]">{option.price}</span>
            </div>

            <p className="text-[color:var(--spr-text-muted)] mb-6">{option.description}</p>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[color:var(--spr-text)] mb-3 uppercase tracking-wider">What You Get:</h4>
              <ul className="space-y-2">
                {option.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 flex-shrink-0 text-[color:var(--spr-primary)] mt-0.5" />
                    <span className="text-sm text-[color:var(--spr-text-soft)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {option.note && (
              <div className="mb-6 rounded border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.1)] p-3">
                <p className="text-sm text-[color:var(--spr-primary)]">{option.note}</p>
              </div>
            )}

            <Link href={option.href} className="spr-button spr-button-primary w-full">
              {option.cta}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      <div className="text-center">
        <p className="text-[color:var(--spr-text-muted)] mb-6">Want to explore a longer partnership?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pe-services" className="spr-button spr-button-secondary">
            View All Packages & Pricing
          </Link>
          <a href="https://cal.com/tyler-dreher" target="_blank" rel="noopener noreferrer" className="spr-button spr-button-secondary">
            Talk to an AI Strategist
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
