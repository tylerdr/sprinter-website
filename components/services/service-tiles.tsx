"use client";

import { motion } from "framer-motion";
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
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    color: "blue",
    href: "/services/document-intelligence"
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
    color: "purple",
    href: "/services/process-automation"
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
    color: "green",
    href: "/services/copilots"
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
    color: "orange",
    href: "/services/agentic"
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
    color: "pink",
    href: "/services/quote-intelligence"
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
    color: "indigo",
    href: "/services/3pl-ops"
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
    color: "teal",
    href: "/services/rag"
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
    color: "cyan",
    href: "/services/integration"
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
    color: "amber",
    href: "/services/analytics"
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
    color: "red",
    href: "/services/governance"
  }
];

const colorStyles = {
  blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
  purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
  green: "from-green-500/20 to-green-600/20 border-green-500/30",
  orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
  pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30",
  indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30",
  teal: "from-teal-500/20 to-teal-600/20 border-teal-500/30",
  cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
  amber: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
  red: "from-red-500/20 to-red-600/20 border-red-500/30",
};

export function ServiceTiles() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Outcome-focused AI services that deliver measurable results in weeks, not quarters.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorStyle = colorStyles[service.color as keyof typeof colorStyles];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`bg-gradient-to-br ${colorStyle} backdrop-blur-sm border rounded-xl p-8 hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-background/50 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium bg-background/50 px-3 py-1 rounded-full">
                    {service.timeline}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>

                <div className="mb-4 p-3 bg-background/30 rounded-lg">
                  <p className="text-sm font-medium text-green-400">Outcome:</p>
                  <p className="text-sm">{service.outcome}</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium mb-2 text-muted-foreground">What's Included:</p>
                  <ul className="space-y-1">
                    {service.scope.map((item) => (
                      <li key={item} className="text-sm flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={service.href} className="block">
                  <Button variant="ghost" className="w-full group-hover:bg-background/50">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Each service includes acceptance criteria, KPIs, and governance frameworks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/approach">Learn Our Approach</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">See Package Options</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}