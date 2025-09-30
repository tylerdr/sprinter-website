"use client";

import { motion } from "framer-motion";
import { Zap, Target, Rocket, TrendingUp } from "lucide-react";
import { BookDemoButton } from "@/components/shared/book-demo-button";

const sprintBenefits = [
  {
    icon: Target,
    title: "Pilot in 2-3 Sprints",
    description: "See measurable ROI in 20-30 days, not months. Validate value before scaling.",
    metric: "20-30 days",
  },
  {
    icon: Rocket,
    title: "Each Sprint Compounds",
    description: "Quick wins build toward full AI-native operations. No throwaway work.",
    metric: "Compounding value",
  },
  {
    icon: TrendingUp,
    title: "De-Risk Transformation",
    description: "Prove the model works with one process before rolling out fund-wide.",
    metric: "Validate, then scale",
  },
];

export function WorkInSprints() {
  return (
    <section id="sprints" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Zap className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-500">Our Delivery Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Work in Sprints</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            1 sprint = 10 days = 2 weeks. Rapid iteration. Measurable progress. No endless consulting engagements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {sprintBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground mb-3">{benefit.description}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">{benefit.metric}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-8 border"
        >
          <h3 className="text-xl font-bold mb-6 text-center">Typical Sprint Progression</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card/50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="text-sm font-medium text-muted-foreground mb-1">Sprint 1 (10 days)</div>
              <div className="font-semibold mb-2">Prototype & Validate</div>
              <div className="text-sm text-muted-foreground">Test with 10-20 documents. Prove feasibility.</div>
            </div>
            <div className="bg-card/50 rounded-lg p-4 border-l-4 border-purple-500">
              <div className="text-sm font-medium text-muted-foreground mb-1">Sprint 2 (10 days)</div>
              <div className="font-semibold mb-2">Production-Ready</div>
              <div className="text-sm text-muted-foreground">Scale to live data. Integrate with systems.</div>
            </div>
            <div className="bg-card/50 rounded-lg p-4 border-l-4 border-green-500">
              <div className="text-sm font-medium text-muted-foreground mb-1">Sprint 3 (10 days)</div>
              <div className="font-semibold mb-2">Optimize & Expand</div>
              <div className="text-sm text-muted-foreground">Hit target accuracy. Add related use cases.</div>
            </div>
          </div>
          <div className="text-center">
            <BookDemoButton
              size="lg"
              text="Start Your 2-3 Sprint Pilot"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}