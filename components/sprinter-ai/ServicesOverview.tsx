"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const services = [
  {
    tag: "DOC",
    title: "Document Intelligence",
    description: "OCR + LLM extraction pipelines that achieve ≥60% touchless processing. BOLs, invoices, work orders, warranty claims — structured, validated, and routed.",
    outcome: "≥60% touchless processing",
    href: "/services",
  },
  {
    tag: "AUTO",
    title: "Process Automation",
    description: "End-to-end workflow orchestration that reduces cycle times by 42%. From quoting to billing, scheduling to reporting.",
    outcome: "42% faster cycle times",
    href: "/services",
  },
  {
    tag: "AGENT",
    title: "AI Agent Deployment",
    description: "Custom agents that work your processes 24/7. Email triage, prospect research, CRM enrichment, report generation — on your data, in your tools.",
    outcome: "24/7 autonomous operations",
    href: "/services",
  },
  {
    tag: "GOV",
    title: "AI Governance & Security",
    description: "Responsible AI policies, audit trails, model registries, and compliance frameworks defensible to LPs, ICs, and auditors.",
    outcome: "LP-defensible governance",
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
      <h2 className="spr-heading-lg text-center">AI services that ship in weeks, not quarters.</h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        Outcome-focused implementations with clear acceptance criteria. Every project tied to measurable ROI.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
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
