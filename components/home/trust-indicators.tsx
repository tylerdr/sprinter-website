"use client";

import ScrollFloat from "@/components/ScrollFloat";
import { motion } from "framer-motion";
import { Shield, Award, Users2, TrendingUp, Building2, Clock } from "lucide-react";

const trustStats = [
  {
    icon: Building2,
    value: "20+",
    label: "AI Systems Built",
    description: "Production deployments"
  },
  {
    icon: TrendingUp,
    value: "2-4",
    label: "Week Sprints",
    description: "From kickoff to production"
  },
  {
    icon: Clock,
    value: "Multi-Agent",
    label: "Architectures",
    description: "Complex workflows automated"
  },
  {
    icon: Shield,
    value: "Your Stack",
    label: "We Integrate",
    description: "No rip-and-replace required"
  }
];

const trustedBy = [
  "Vero Capital", "Rock Hill Capital", "Beckway", "Wells Fargo", "Accenture", "Broadlume"
];

export function TrustIndicators() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="gradient-text">Agentic AI</span> That Ships to Production
          </h2>
          <p className="text-muted-foreground">
            We build AI agents, automate workflows, and redesign processes. Sprint-based implementations that deliver working systems.
          </p>
        </div>

        {/* Trust Stats Grid with Better Spacing */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
          {trustStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-8 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 mb-4">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground/90 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted Partners Logo Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {trustedBy.map((partner) => (
              <div
                key={partner}
                className="px-4 py-2 text-muted-foreground/60 font-semibold text-lg hover:text-muted-foreground transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}