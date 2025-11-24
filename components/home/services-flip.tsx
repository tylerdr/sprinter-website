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
    title: "AP Automation",
    subtitle: "65%+ Touchless Processing",
    description: "Invoice processing that works with any ERP—no API required. $3.2M average savings across portfolio companies.",
    features: ["Works With Any ERP", "No API Required", "65%+ Touchless Rate", "Board-Ready Reporting"],
    icon: Brain,
  },
  {
    title: "Quote Intelligence",
    subtitle: "38% Higher Win Rates",
    description: "ML-powered pricing that finds optimal corridors across your portfolio. $4.8M EBITDA improvement case study.",
    features: ["Cross-Portfolio Data", "Win/Loss Analytics", "Real-Time Scoring", "Margin Optimization"],
    icon: BarChart,
  },
  {
    title: "Revenue Cycle AI",
    subtitle: "34% Denial Reduction",
    description: "Prior auth automation and denial prevention for healthcare portfolios. $8.2M annual collection acceleration.",
    features: ["Prior Auth Automation", "Denial Prediction", "Payer Rule Engines", "4-Hour Approvals"],
    icon: Shield,
  },
  {
    title: "Document Intelligence",
    subtitle: "95% Time Saved",
    description: "Turn unstructured PDFs into structured decisions. Powers lending, compliance, and due diligence workflows.",
    features: ["PDF Extraction", "Multi-Doc Analysis", "Compliance Checks", "Decision Automation"],
    icon: Layers,
  },
  {
    title: "No-API Advantage™",
    subtitle: "70% Need Zero API",
    description: "Legacy systems without APIs? We automate them anyway. Screen-level automation for any software.",
    features: ["Screen Automation", "Process Mining", "Legacy Integration", "Zero IT Burden"],
    icon: Zap,
  },
  {
    title: "Portfolio Playbooks",
    subtitle: "50% Faster Each Rollout",
    description: "The playbook from your first portco accelerates every subsequent deployment. Knowledge compounds.",
    features: ["Proven Templates", "Best Practices", "Champion Training", "Cross-Portfolio Wins"],
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
            These aren&apos;t concepts—they&apos;re production systems we&apos;ve deployed 50+ times.
            Each comes with case studies, ROI projections, and our 10-day delivery guarantee.
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