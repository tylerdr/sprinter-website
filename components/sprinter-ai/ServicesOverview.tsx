"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const services = [
  {
    tag: "SPRINT",
    title: "AI Readiness Sprint",
    description: "48-hour deep dive into your operations. We map every process, score automation opportunities, and deliver a prioritized roadmap with ROI estimates. You see exactly what AI can do for your business.",
    outcome: "$2,500 · 48 hours",
    href: "/ai-sprint",
  },
  {
    tag: "DEPLOY",
    title: "AI Agent Deployment",
    description: "We build and deploy custom AI agents that work your processes 24/7. Email triage, quoting, invoicing, CRM enrichment, reporting — on your data, in your tools. Your team focuses on high-value work.",
    outcome: "From $5K/mo · 3-month min",
    href: "/fractional-ai-cofounder",
  },
  {
    tag: "BUILD",
    title: "Custom AI Systems",
    description: "For when you need a full platform, not just agents. We build production AI products — document intelligence, recommendation engines, multi-agent systems — tailored to your industry.",
    outcome: "Project-based",
    href: "/services",
  },
];

export default function ServicesOverview() {
  return (
    <AnimatedSection id="services-overview" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>What We Build</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center">AI that ships in weeks, not quarters.</h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        Start with a sprint, prove the value, then scale. Every engagement tied to real outcomes for your business.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article key={service.tag} className="spr-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="spr-chip">{service.tag}</span>
              <span className="text-sm font-semibold text-[color:var(--spr-primary)]">{service.outcome}</span>
            </div>
            <h3 className="text-xl font-semibold text-[color:var(--spr-text)] mb-3">{service.title}</h3>
            <p className="text-sm leading-relaxed text-[color:var(--spr-text-muted)]">{service.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/services" className="spr-button spr-button-secondary">
          See All Services
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </AnimatedSection>
  );
}
