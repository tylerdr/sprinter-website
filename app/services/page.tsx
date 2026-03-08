import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, Users, Code, Briefcase, Shield, Rocket } from "lucide-react";
import StickyCTA from "@/components/sprinter-ai/StickyCTA";

export const metadata: Metadata = {
  title: "AI Services | Sprinter AI",
  description:
    "AI agent deployment, readiness sprints, and custom AI systems. Working solutions in weeks, not months. Empower your team with AI that actually ships.",
};

const coreServices = [
  {
    tag: "START HERE",
    icon: Zap,
    title: "AI Readiness Sprint",
    price: "$2,500",
    duration: "48 hours",
    description:
      "We map your entire operation in 48 hours — every process, every bottleneck, every automation opportunity. You get a scored backlog with ROI estimates and a clear implementation roadmap.",
    deliverables: [
      "Full operations audit across every department",
      "Scored automation backlog with ROI projections",
      "Implementation roadmap with priority sequencing",
      "Working prototype for your #1 use case (where applicable)",
      "60-minute strategy session to review findings",
      "30 days of follow-up support",
      "Sprint fee credited toward any continued engagement",
    ],
    cta: "Book a Sprint",
    href: "/ai-sprint",
    highlight: true,
  },
  {
    tag: "CORE OFFER",
    icon: Users,
    title: "Fractional AI Co-Founder",
    price: "From $5-8K/mo",
    duration: "3-month minimum",
    description:
      "An embedded AI execution partner. We deploy AI agents into your real workflows — email triage, CRM enrichment, quoting, reporting, follow-ups — and tie every release to measurable outcomes. Your team stays in control while AI handles the repetitive.",
    deliverables: [
      "3-5 AI agents deployed in the first 2 weeks",
      "Agents working on your tools, your data, your processes",
      "Monthly optimization and new capability deployment",
      "Operator-ready SOPs and team training",
      "Weekly or bi-weekly progress reviews",
      "Direct Slack/email access for async collaboration",
    ],
    cta: "Learn More",
    href: "/fractional-ai-cofounder",
    highlight: false,
  },
  {
    tag: "BIG SCOPE",
    icon: Code,
    title: "Custom AI Systems",
    price: "Project-based",
    duration: "Scoped per engagement",
    description:
      "For when you need a full platform, not just agents. We build production AI products — document intelligence systems, recommendation engines, multi-agent platforms — tailored to your industry and integrated with your stack.",
    deliverables: [
      "Custom architecture designed for your specific needs",
      "Full-stack implementation (frontend, backend, AI pipeline)",
      "Integration with your existing tools and data sources",
      "All source code and documentation — you own everything",
      "Deployment and production monitoring setup",
      "Knowledge transfer and team training",
    ],
    cta: "Discuss Your Project",
    href: "/contact",
    highlight: false,
  },
];

const enterpriseOptions = [
  {
    icon: Briefcase,
    title: "Fractional Chief AI Officer",
    description: "C-suite AI leadership for larger organizations. Strategy, vendor evaluation, governance, and board presentations.",
    href: "/fractional-caio",
    price: "Custom pricing",
  },
  {
    icon: Shield,
    title: "AI Operating Partner",
    description: "AI implementation across multiple business units or locations with shared playbooks and governance.",
    href: "/operating-partner",
    price: "Custom pricing",
  },
  {
    icon: Rocket,
    title: "AI Transformation Partner",
    description: "End-to-end organizational transformation with embedded AI throughout operations, culture, and strategy.",
    href: "/accelerate",
    price: "Custom pricing",
  },
];

export default function ServicesPage() {
  return (
    <div className="spr-theme spr-page">
      <StickyCTA />
      <main className="spr-container overflow-x-hidden py-20 pb-36 sm:px-2">
        {/* Hero */}
        <div className="mb-4 inline-flex items-center rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.12)] px-4 py-2 text-sm font-medium text-[color:var(--spr-primary)]">
          AI Services
        </div>
        <h1 className="spr-heading-xl mb-6 max-w-4xl">
          AI that ships in weeks.{" "}
          <span className="gradient-text">Value you can measure.</span>
        </h1>
        <p className="spr-body-lg mb-16 max-w-3xl">
          Start with a sprint, prove the value, then scale. Every engagement is
          designed to empower your people and deploy an unlimited AI workforce
          that handles the operational grind.
        </p>

        {/* Core Services */}
        <div className="grid gap-8 lg:grid-cols-3">
          {coreServices.map((service) => (
            <div
              key={service.title}
              className={`spr-card relative flex flex-col p-8 ${
                service.highlight
                  ? "ring-2 ring-[color:var(--spr-primary)]"
                  : ""
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-3 left-6 rounded-full bg-[color:var(--spr-primary)] px-3 py-1 text-xs font-bold text-white">
                  {service.tag}
                </div>
              )}
              {!service.highlight && (
                <div className="mb-4 text-xs font-bold uppercase tracking-widest text-[color:var(--spr-text-muted)]">
                  {service.tag}
                </div>
              )}
              <service.icon className="mb-4 h-8 w-8 text-[color:var(--spr-primary)]" />
              <h2 className="spr-heading-md mb-2">{service.title}</h2>
              <div className="mb-4">
                <span className="text-2xl font-bold text-[color:var(--spr-primary)]">
                  {service.price}
                </span>
                <span className="ml-2 text-sm text-[color:var(--spr-text-muted)]">
                  {service.duration}
                </span>
              </div>
              <p className="mb-6 flex-grow text-[color:var(--spr-text-muted)]">
                {service.description}
              </p>
              <ul className="mb-8 space-y-2">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 text-sm text-[color:var(--spr-text-muted)]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--spr-primary)]" />
                    {d}
                  </li>
                ))}
              </ul>
              <Link
                href={service.href}
                className="spr-button spr-button-primary mt-auto inline-flex items-center justify-center gap-2"
              >
                {service.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Value-Based Pricing Note */}
        <section className="mt-20 rounded-2xl border [border-color:var(--spr-border)] bg-[color:var(--spr-surface)] p-8 text-center">
          <h2 className="spr-heading-md mb-4">
            Pricing tied to outcomes, not hours.
          </h2>
          <p className="spr-body-lg mx-auto max-w-3xl">
            Our base model is a monthly subscription — simple, predictable, and
            designed to deliver ROI that far exceeds the investment. For engagements
            where value is easily quantifiable (hours saved, revenue gained), we
            also offer outcome-based pricing. Either way, you should see
            measurable value within the first 90 days.
          </p>
        </section>

        {/* Enterprise / Other Options */}
        <section className="mt-20">
          <h2 className="spr-heading-lg mb-4 text-center">
            Enterprise &amp; Advisory Options
          </h2>
          <p className="spr-body-lg mb-10 text-center mx-auto max-w-2xl">
            For larger organizations, portfolio companies, or executive-level AI
            leadership needs.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {enterpriseOptions.map((opt) => (
              <Link
                key={opt.title}
                href={opt.href}
                className="spr-card flex flex-col p-6 transition-colors hover:border-[color:var(--spr-primary)]"
              >
                <opt.icon className="mb-3 h-6 w-6 text-[color:var(--spr-primary)]" />
                <h3 className="spr-heading-sm mb-2">{opt.title}</h3>
                <p className="mb-4 flex-grow text-sm text-[color:var(--spr-text-muted)]">
                  {opt.description}
                </p>
                <span className="text-xs font-medium text-[color:var(--spr-primary)]">
                  {opt.price} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 text-center">
          <h2 className="spr-heading-lg mb-4">
            Not sure where to start?
          </h2>
          <p className="spr-body-lg mb-8 mx-auto max-w-2xl">
            Book a free 30-minute strategy call. We&apos;ll learn about your
            business and recommend the right path — no pressure, no pitch deck.
          </p>
          <a
            href="https://cal.com/tyler-dreher"
            target="_blank"
            rel="noopener noreferrer"
            className="spr-button spr-button-primary inline-flex items-center gap-2"
          >
            Book a Strategy Call <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </main>
    </div>
  );
}
