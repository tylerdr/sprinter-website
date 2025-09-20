"use client";

import CardFlip from "@/components/kokonutui/card-flip";
import ScrollFloat from "@/components/ScrollFloat";
import TrueFocus from "@/components/TrueFocus";
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
    title: "AI Automation",
    subtitle: "Streamline operations",
    description: "Deploy intelligent automation that saves 20+ hours per week.",
    features: ["Process Mining", "Workflow Automation", "RPA Integration", "AI Orchestration"],
    icon: Zap,
  },
  {
    title: "Data Intelligence",
    subtitle: "Unlock insights",
    description: "Transform raw data into actionable portfolio intelligence.",
    features: ["Predictive Analytics", "Real-time Dashboards", "Custom ML Models", "Data Pipelines"],
    icon: Brain,
  },
  {
    title: "Rapid Prototypes",
    subtitle: "Ship fast",
    description: "From concept to production-ready AI in 10 days.",
    features: ["MVP Development", "API Integration", "Cloud Deployment", "Performance Testing"],
    icon: Rocket,
  },
  {
    title: "Team Enablement",
    subtitle: "Build capability",
    description: "Upskill your teams to leverage AI independently.",
    features: ["Hands-on Training", "Best Practices", "Tool Selection", "Change Management"],
    icon: Users,
  },
  {
    title: "Portfolio Analytics",
    subtitle: "Track impact",
    description: "Measure and optimize AI ROI across all companies.",
    features: ["KPI Tracking", "ROI Analysis", "Benchmarking", "Success Metrics"],
    icon: BarChart,
  },
  {
    title: "AI Governance",
    subtitle: "Manage risk",
    description: "Implement responsible AI with proper controls.",
    features: ["Risk Assessment", "Compliance", "Security Audits", "Ethical Guidelines"],
    icon: Shield,
  },
];

export function ServicesFlip() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollFloat className="text-center mb-16">
          <TrueFocus
            sentence="Every Engagement"
            triggerWord="Engagement"
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          />
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI services designed for private equity portfolios.
            Flip each card to explore our capabilities.
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