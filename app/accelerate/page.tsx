import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import StickyCTA from "@/components/sprinter-ai/StickyCTA";
import TrustedBy from "@/components/sprinter-ai/TrustedBy";
import Guarantee from "@/components/sprinter-ai/Guarantee";
import { generateServiceStructuredData, getStructuredDataScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sprinter Accelerate | Sprinter AI",
  description:
    "A monthly implementation retainer to deploy AI systems fast, track ROI weekly, and compound wins across your portfolio.",
};

const timeline = [
  "Week 1: Prioritize highest-value workflow and lock acceptance criteria.",
  "Week 2: Deploy first production workflow with operator handoff.",
  "Weeks 3-4: Optimize performance, add guardrails, and document playbooks.",
  "Month 2+: Replicate wins across teams and portfolio companies.",
];

const outcomes = [
  "Production-ready automations (not slide decks)",
  "Operator-ready SOPs and training",
  "Weekly ROI scorecard with leading indicators",
  "Reusable implementation playbooks for repeatability",
];

const serviceData = generateServiceStructuredData(
  "Sprinter Accelerate",
  "A monthly AI implementation retainer that deploys production AI workflows, trains operators, and tracks measurable business outcomes.",
  "12000"
);

export default function AcceleratePage() {
  return (
    <div className="spr-theme spr-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={getStructuredDataScript(serviceData)}
      />
      <main className="spr-container overflow-x-hidden py-20 pb-36 sm:px-2">
        <div className="mb-10 inline-flex items-center rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.12)] px-4 py-2 text-sm font-medium text-[color:var(--spr-primary)]">
          Sprinter Accelerate
        </div>

        <h1 className="spr-heading-xl mb-6 max-w-4xl">
          Keep the momentum: <span className="gradient-text">ship AI every month</span>
        </h1>

        <p className="spr-body-lg mb-10 max-w-3xl">
          Deploy AI agents that run your operations every day, not just in demos.
          Accelerate gives your team weekly implementation velocity, measurable revenue lift, and portfolio-ready playbooks.
        </p>

        <div className="mb-16">
          <a
            href="https://cal.com/tyler-dreher"
            target="_blank"
            rel="noopener noreferrer"
            className="spr-button spr-button-primary"
          >
            Book Accelerate Call
          </a>
        </div>

        <TrustedBy />

        <section className="mb-14">
          <h2 className="spr-heading-lg mb-5">How it runs</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <div key={item} className="spr-card p-5 text-[color:var(--spr-text-muted)]">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="spr-heading-lg mb-5">What you get</h2>
          <ul className="space-y-3">
            {outcomes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[color:var(--spr-text-muted)]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[color:var(--spr-primary)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <div className="spr-card spr-card-accent p-8">
            <h2 className="spr-heading-lg mb-4">Proof from operator teams</h2>
            <p className="spr-body mb-4 italic">
              "In month one, Sprinter replaced manual quote triage with AI agents, cut cycle time by 41%, and freed two operators for revenue work."
            </p>
            <p className="text-sm text-[color:var(--spr-text-muted)]">COO, PE-backed logistics platform</p>
          </div>
        </section>

        <section className="mb-14">
          <div className="spr-card rounded-[var(--spr-radius-md)] p-8">
            <h2 className="spr-heading-lg mb-3">Execution guarantee</h2>
            <p className="spr-body">
              If we do not ship a production workflow with operator handoff in your first 30 days, the next month is on us.
            </p>
          </div>
        </section>

        <Guarantee />

        <section className="spr-card spr-card-accent rounded-[var(--spr-radius-md)] p-8">
          <h2 className="spr-heading-lg mb-3">Best fit</h2>
          <p className="spr-body mb-6">
            PE firms, operating teams, and growth-stage companies that are done experimenting and ready
            to operationalize AI with weekly execution cadence.
          </p>
          <Link href="/contact" className="spr-button spr-button-primary">
            Talk with Sprinter
          </Link>
        </section>
      </main>
      <StickyCTA href="https://cal.com/tyler-dreher" label="Book Accelerate Call" />
    </div>
  );
}
