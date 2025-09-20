"use client";

import { MagicBento } from "@/components/MagicBento";
import {
  Zap,
  Layers,
  TrendingUp,
  Users,
  Brain,
  Rocket,
  FileText,
  BarChart
} from "lucide-react";

const services = [
  {
    id: "rapid-prototypes",
    title: "Rapid Prototypes",
    description: "Ship working AI in 10 days. From concept to production-ready prototype with real data and live integrations.",
    icon: <Rocket className="w-8 h-8" />,
    className: "md:col-span-2",
    backgroundColor: "rgba(59, 130, 246, 0.05)",
  },
  {
    id: "automation-sprints",
    title: "Automation Sprints",
    description: "Deploy automations that save 10+ hours/week per team. Focus on high-impact workflows with immediate ROI.",
    icon: <Zap className="w-8 h-8" />,
    backgroundColor: "rgba(168, 85, 247, 0.05)",
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description: "Connect AI to your existing tools. Slack, CRM, ERP - we make everything work together seamlessly.",
    icon: <Layers className="w-8 h-8" />,
    backgroundColor: "rgba(34, 197, 94, 0.05)",
  },
  {
    id: "team-enablement",
    title: "Team Enablement",
    description: "Upskill your operators with hands-on AI training. Build internal champions who drive adoption.",
    icon: <Users className="w-8 h-8" />,
    backgroundColor: "rgba(251, 146, 60, 0.05)",
  },
  {
    id: "portfolio-insights",
    title: "Portfolio Insights",
    description: "Real-time dashboard of AI impact across all portfolio companies. Track adoption, ROI, and best practices.",
    icon: <BarChart className="w-8 h-8" />,
    className: "md:col-span-2",
    backgroundColor: "rgba(236, 72, 153, 0.05)",
  },
  {
    id: "ai-strategy",
    title: "AI Strategy",
    description: "Board-ready AI roadmaps tailored to each company's maturity and market position.",
    icon: <Brain className="w-8 h-8" />,
    backgroundColor: "rgba(99, 102, 241, 0.05)",
  },
];

export function ServicesBento() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Built for Speed, Designed for Scale
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Every engagement delivers working AI in production, not PowerPoint decks.
          </p>
        </div>

        <MagicBento items={services} className="max-w-6xl mx-auto" />
      </div>
    </section>
  );
}