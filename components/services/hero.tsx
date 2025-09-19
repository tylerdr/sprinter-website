"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

const outcomes = [
  "Document Intelligence that achieves ≥60% touchless processing",
  "End-to-end automation that reduces cycle time by 42%",
  "Custom CoPilots that triple team throughput",
  "AI governance frameworks defensible to LPs"
];

export function ServicesHero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">AI Services</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            AI Services That{" "}
            <span className="gradient-text">Actually Ship</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            From strategy to implementation in weeks. We deliver working AI solutions with clear acceptance criteria, measurable KPIs, and governance you can defend.
          </p>

          {/* Outcome List */}
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 text-left bg-card/50 backdrop-blur-sm border rounded-lg p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{outcome}</span>
              </motion.div>
            ))}
          </div>

          {/* Key Differentiators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-medium">We Ship, Not Slide</span>
              <span className="text-muted-foreground">Working code in 10 days, not PowerPoints in 10 weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="font-medium">Real Engineers</span>
              <span className="text-muted-foreground">Shipped AI at scale since 2018</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-medium">ROI Focused</span>
              <span className="text-muted-foreground">Every project tied to measurable outcomes</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}