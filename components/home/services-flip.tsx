"use client";

import CardFlip from "@/components/kokonutui/card-flip";
import ScrollFloat from "@/components/ScrollFloat";
import {
  Zap,
  Brain,
  Rocket,
  Users,
  BarChart,
  Shield,
  Layers,
  Globe
} from "lucide-react";

const services = [
  {
    title: "Agentic AI Systems",
    subtitle: "Put AI to work",
    description: "Deploy autonomous agents that handle complex workflows across your portfolio.",
    features: ["Agent Architecture", "Multi-Agent Coordination", "Tool Integration", "Repeatable Playbooks"],
    icon: Brain,
  },
  {
    title: "Off-the-Shelf + Custom",
    subtitle: "Best of both worlds",
    description: "Integrate proven tools when smart, build custom when needed. Pragmatic AI.",
    features: ["Tool Evaluation", "API Integration", "Custom Development", "Hybrid Solutions"],
    icon: Layers,
  },
  {
    title: "No-API Automation",
    subtitle: "Legacy system specialists",
    description: "Automate systems without API access. 70%+ of our work requires zero APIs.",
    features: ["Document Intelligence", "Screen Automation", "Process Mining", "Workflow Orchestration"],
    icon: Zap,
  },
  {
    title: "Portfolio Playbooks",
    subtitle: "Scale across portcos",
    description: "Repeatable frameworks that accelerate each deployment. 2nd portco is 50% faster.",
    features: ["Proven Templates", "Best Practices", "Knowledge Base", "Cross-Portfolio Learnings"],
    icon: Globe,
  },
  {
    title: "45-Day Sprints",
    subtitle: "Ship portfolio wins fast",
    description: "From discovery to production in 30-45 days. Real systems with measurable ROI.",
    features: ["Sprint Methodology", "Production Deployment", "Real Data Integration", "User Training"],
    icon: Rocket,
  },
  {
    title: "Operator Enablement",
    subtitle: "Build internal capability",
    description: "Train your operators to sustain and expand AI after we're gone.",
    features: ["Hands-on Training", "Documentation", "Internal Champions", "Ongoing Support"],
    icon: Users,
  },
];

export function ServicesFlip() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollFloat className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Agentic AI <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Custom development, off-the-shelf integrations, and repeatable playbooks.
            We identify the highest-ROI AI opportunities and ship portfolio wins in 45 days.
          </p>
        </ScrollFloat>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ScrollFloat key={service.title} delay={index * 0.1}>
              <div className="flex justify-center">
                <CardFlip
                  title={service.title}
                  subtitle={service.subtitle}
                  description={service.description}
                  features={service.features}
                />
              </div>
            </ScrollFloat>
          ))}
        </div>
      </div>
    </section>
  );
}