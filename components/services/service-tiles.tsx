"use client";

import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";
import {
  FileText,
  Workflow,
  Users,
  Bot,
  FileSignature,
  Truck,
  BookOpen,
  Database,
  BarChart3,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const services = [
  {
    id: "document-intelligence",
    icon: FileText,
    title: "Document Intelligence & PDF Data Extraction",
    outcome: "≥60% touchless processing, exceptions routed",
    scope: [
      "OCR + LLM extraction pipeline",
      "Confidence scoring & validation",
      "Exception routing workflows",
      "Integration with ERPs/CRMs",
      "Audit trail & compliance"
    ],
    timeline: "4-6 weeks",
  },
  {
    id: "process-automation",
    icon: Workflow,
    title: "End-to-End Process Automation",
    outcome: "Cycle time ↓42%, rework ↓80%",
    scope: [
      "Process mapping & optimization",
      "Workflow orchestration",
      "Human-in-the-loop controls",
      "Approval routing & notifications",
      "Performance dashboards"
    ],
    timeline: "6-8 weeks",
  },
  {
    id: "custom-copilots",
    icon: Users,
    title: "Custom CoPilots (Sales, Ops, Finance)",
    outcome: "Throughput ↑3x, onboarding ↓50%",
    scope: [
      "Role-specific AI assistants",
      "Knowledge base integration",
      "Real-time guidance & suggestions",
      "Training & fine-tuning",
      "Usage analytics"
    ],
    timeline: "4-6 weeks",
  },
  {
    id: "agentic-workflows",
    icon: Bot,
    title: "Agentic Workflow Automation",
    outcome: "Autonomous task completion 24/7",
    scope: [
      "Multi-agent orchestration",
      "Task decomposition & planning",
      "Tool integration & APIs",
      "Monitoring & intervention",
      "Continuous learning loops"
    ],
    timeline: "8-10 weeks",
  },
  {
    id: "quote-intelligence",
    icon: FileSignature,
    title: "Quote Intelligence & CPQ Assist",
    outcome: "42% faster quotes, win rate ↑15%",
    scope: [
      "RFQ parsing & analysis",
      "Pricing rule engines",
      "Configuration validation",
      "Proposal generation",
      "Competitive intelligence"
    ],
    timeline: "5-7 weeks",
  },
  {
    id: "3pl-ops",
    icon: Truck,
    title: "3PL Operations & Billing Accuracy",
    outcome: "+18 pts accuracy, leakage stopped",
    scope: [
      "BOL reconciliation",
      "Rate card validation",
      "Dimensional weight checks",
      "Dispute management",
      "Carrier scorecards"
    ],
    timeline: "6-8 weeks",
  },
  {
    id: "rag-policies",
    icon: BookOpen,
    title: "RAG on Policies & Guidelines",
    outcome: "Compliant answers in seconds",
    scope: [
      "Document ingestion & chunking",
      "Vector database setup",
      "Retrieval optimization",
      "Source attribution",
      "Update workflows"
    ],
    timeline: "3-4 weeks",
  },
  {
    id: "data-integration",
    icon: Database,
    title: "Data & Integration Layer",
    outcome: "No API? Safe middle layer built",
    scope: [
      "Desktop ERP connectors",
      "CSV spec generation",
      "Upload automation",
      "Data validation & mapping",
      "Error recovery"
    ],
    timeline: "4-5 weeks",
  },
  {
    id: "analytics-kpi",
    icon: BarChart3,
    title: "Analytics & KPI Instrumentation",
    outcome: "Executive dashboards, EBITDA tracking",
    scope: [
      "KPI definition & mapping",
      "Real-time data pipelines",
      "Executive dashboards",
      "Alert & anomaly detection",
      "Board reporting packs"
    ],
    timeline: "5-6 weeks",
  },
  {
    id: "governance-security",
    icon: Shield,
    title: "AI Governance & Security",
    outcome: "Defensible to ICs, LPs, auditors",
    scope: [
      "Responsible AI policy",
      "Model registry & versioning",
      "Audit logs & access controls",
      "Data privacy & retention",
      "Compliance frameworks"
    ],
    timeline: "3-4 weeks",
  }
];

export function ServiceTiles() {
  return (
    <AnimatedSection id="service-tiles" className="spr-container" delay={0.05}>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
          <span>What We Do</span>
        </div>
      </div>
      <h2 className="spr-heading-lg text-center mb-4">Outcome-Focused AI Services</h2>
      <p className="spr-body-lg text-center max-w-3xl mx-auto mb-12">
        Measurable results in weeks, not quarters. Every engagement includes acceptance criteria, KPIs, and governance.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.id} className="spr-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:rgba(106,167,255,0.18)]">
                  <Icon className="h-5 w-5 text-[color:var(--spr-primary)]" />
                </div>
                <span className="spr-chip">{service.timeline}</span>
              </div>

              <h3 className="text-lg font-semibold text-[color:var(--spr-text)] mb-3">{service.title}</h3>

              <div className="mb-4 rounded border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.08)] p-3">
                <p className="text-xs font-semibold text-[color:var(--spr-accent)]">Outcome:</p>
                <p className="text-sm text-[color:var(--spr-text-soft)]">{service.outcome}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-[color:var(--spr-text-muted)] mb-2 uppercase tracking-wider">What&apos;s Included:</p>
                <ul className="space-y-1.5">
                  {service.scope.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2">
                      <span className="spr-list-dot mt-1.5 !w-1.5 !h-1.5" aria-hidden />
                      <span className="text-[color:var(--spr-text-muted)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="spr-body mb-6">
          Each service includes acceptance criteria, KPIs, and governance frameworks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/approach" className="spr-button spr-button-secondary">
            Learn Our Approach
          </Link>
          <Link href="/contact" className="spr-button spr-button-primary">
            Start a Conversation
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
