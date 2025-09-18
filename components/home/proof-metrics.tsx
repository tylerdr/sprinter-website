"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Timer, CheckCircle2 } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: "18x",
    label: "Average ROI",
    description: "Average portfolio return on AI sprints delivered across the last 12 months.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Timer,
    value: "5 days",
    label: "Time to production",
    description: "First automation deployed to production in under a week with training and handoff.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: CheckCircle2,
    value: "85%",
    label: "Workload automated",
    description: "Average share of repetitive tasks removed from finance, revenue, and operations teams.",
    color: "from-purple-500 to-pink-500",
  },
];

export function ProofMetrics() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm mb-6">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">Outcome Backed</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Numbers LPs Care About
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real impact from private equity teams who build with Sprinter instead of waiting on vendors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity rounded-2xl`} />

              <Card className="relative bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${metric.color} p-0.5 mb-4`}>
                      <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                        <metric.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className={`text-5xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}>
                    {metric.value}
                  </div>

                  <div className="text-xl font-semibold text-foreground mb-3">
                    {metric.label}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-border/50">
            <p className="text-muted-foreground text-sm">
              <span className="font-semibold text-foreground">Based on post-implementation reporting</span> across finance, logistics, and field service portfolio companies processed through the Sprinter operating system.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
