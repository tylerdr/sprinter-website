"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Search, Zap, Scale } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Diagnostic (10 days)",
    description: "Map one wedge, deliver an options memo (off-the-shelf vs semi-custom vs agentic).",
    highlight: "Options memo delivered",
  },
  {
    icon: Zap,
    title: "Pilot (2-3 sprints)",
    description: "Hit acceptance criteria: ≥60% touchless invoices, exception SLA <48h, full audit trail.",
    highlight: "Clear acceptance criteria",
  },
  {
    icon: Scale,
    title: "Replicate",
    description: "Roll across the next portco; portfolio scoreboards and OP Council cadence.",
    highlight: "Portfolio-wide leverage",
  },
];

export function HowWeWork() {
  return (
    <section id="how-we-work" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Time-boxed pilots with acceptance criteria. No endless evaluations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                    <step.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-4xl font-bold text-muted-foreground/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-3">{step.description}</p>
                <p className="text-sm font-medium text-blue-400">{step.highlight}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl border border-border/50"
        >
          <p className="text-center text-lg">
            <strong>Risk reversal:</strong> If we miss the acceptance criteria, we work the next sprint at our cost to close the gap.
          </p>
        </motion.div>
      </div>
    </section>
  );
}