"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const services = [
  {
    tag: "ASSESS",
    title: "Free AI Operations Assessment",
    description:
      "We audit your business processes, identify automation opportunities, and deliver a scored roadmap with ROI estimates. See exactly where AI agents can save you time and money — before you commit to anything.",
    outcome: "Free for qualifying businesses",
    href: "/contact",
  },
  {
    tag: "DEPLOY",
    title: "AI Agent Deployment",
    description:
      "We build and deploy custom AI agents powered by OpenClaw. Email triage, quoting, CRM enrichment, reporting — on your data, in your tools. Production systems running in weeks.",
    outcome: "From $5K/mo",
    href: "/services",
  },
  {
    tag: "SCALE",
    title: "Ongoing Optimization",
    description:
      "Monthly optimization, new capabilities, expanding AI across your operations. Once agents prove value in one area, we replicate and extend across your business. Your agent workforce grows smarter every month.",
    outcome: "Continuous improvement",
    href: "/services",
  },
];

export default function ServicesOverview() {
  return (
    <AnimatedSection id="services-overview" className="spr-container spr-section-divider" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>How We Work</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center">Assess. Deploy. Scale.</h2>
      <p className="spr-body-lg mt-4 text-center max-w-3xl mx-auto">
        Start with a free assessment, prove value fast, then expand. Every step tied to real outcomes for your business.
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
