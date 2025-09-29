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
    title: "Agentic AI Systems",
    subtitle: "Your competitive edge",
    description: "Get autonomous agents handling your complex workflows. Your team focuses on strategy while AI executes.",
    features: ["Your Custom Architecture", "Multi-Agent Coordination", "Seamless Tool Integration", "Your Repeatable Playbooks"],
    icon: Brain,
  },
  {
    title: "Your Choice: Build or Buy",
    subtitle: "Smart flexibility",
    description: "You choose: proven off-the-shelf tools or custom-built solutions. Your goals drive the decision.",
    features: ["Expert Tool Recommendations", "Smooth API Integration", "Custom When You Need It", "Hybrid Solutions for You"],
    icon: Layers,
  },
  {
    title: "No-API? No Problem.",
    subtitle: "Your legacy systems work",
    description: "Your old systems without APIs? We automate them. 70%+ of deployments need zero API access.",
    features: ["Document Intelligence for You", "Screen Automation", "Your Process Mining", "Workflow Orchestration"],
    icon: Zap,
  },
  {
    title: "Your Portfolio Playbooks",
    subtitle: "Scale your wins",
    description: "Your 2nd deployment is 50% faster. Your 3rd is 70% faster. You compound your advantage.",
    features: ["Your Proven Templates", "Best Practices Library", "Your Knowledge Base", "Cross-Portfolio Wins"],
    icon: Globe,
  },
  {
    title: "10-Day Sprints",
    subtitle: "You ship fast",
    description: "Your AI system goes from discovery to production in 10 days. Real results, real ROI.",
    features: ["Your Sprint Schedule", "Production Deployment", "Your Real Data", "Your Team Training"],
    icon: Rocket,
  },
  {
    title: "Your Operators, Empowered",
    subtitle: "Own your AI future",
    description: "Your operators learn to own and expand the AI. You build lasting capability, not dependency.",
    features: ["Hands-on Training", "Complete Documentation", "Your Internal Champions", "Ongoing Support"],
    icon: Users,
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
            What <span className="gradient-text">You Get</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your choice: custom development or off-the-shelf integrations. Your repeatable playbooks.
            You identify the opportunities. You ship portfolio wins in 10 days. You own the results.
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