"use client";

import CardFlip from "@/components/kokonutui/card-flip";
import { motion } from "framer-motion";
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
    title: "Multi-Agent Systems",
    subtitle: "Coordinated AI Workflows",
    description: "Multiple AI agents working together to handle complex tasks—research, analysis, and execution in parallel.",
    features: ["Parallel Processing", "Task Orchestration", "Human-in-the-Loop", "Scalable Architecture"],
    icon: Brain,
  },
  {
    title: "Document Intelligence",
    subtitle: "PDFs to Decisions",
    description: "Turn unstructured documents into structured data and automated workflows. Powers lending, compliance, and operations.",
    features: ["PDF Extraction", "Multi-Doc Analysis", "Data Normalization", "Decision Automation"],
    icon: Layers,
  },
  {
    title: "Process Automation",
    subtitle: "End-to-End Workflows",
    description: "Redesign and automate complex business processes. From document intake to final decision—fully orchestrated.",
    features: ["Workflow Design", "Exception Handling", "Audit Trails", "Integration Ready"],
    icon: Zap,
  },
  {
    title: "Legacy System Integration",
    subtitle: "Works With What You Have",
    description: "Think you're not 'tech-forward' enough? We build AI that works with your existing systems—messy data and all.",
    features: ["Any System", "Existing Data", "No Rip & Replace", "Gradual Adoption"],
    icon: Shield,
  },
  {
    title: "Sprint Implementations",
    subtitle: "Production in Weeks",
    description: "Fixed-scope sprints with clear deliverables. Working systems, not slide decks. You validate, we iterate.",
    features: ["2-4 Week Sprints", "Clear Deliverables", "Rapid Iteration", "Production Ready"],
    icon: Rocket,
  },
  {
    title: "Portfolio Playbooks",
    subtitle: "Wins That Compound",
    description: "The playbook from your first implementation makes the second faster. Shared learnings across your portfolio.",
    features: ["Proven Templates", "Best Practices", "Team Training", "Knowledge Transfer"],
    icon: Globe,
  },
];

export function ServicesFlip() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Proven <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Agentic AI systems that handle the tedious work so your team can focus on
            strategy and exceptions. Sprint-based implementations that ship fast.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex justify-center"
            >
              <CardFlip
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                features={service.features}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}