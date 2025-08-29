"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Target, Timer, Shield, TrendingUp } from "lucide-react";

const criteria = [
  {
    icon: Target,
    metric: "≥60%",
    label: "Touchless Processing",
    description: "Of standard invoices process without human intervention",
  },
  {
    icon: Timer,
    metric: "<48h",
    label: "Exception Resolution",
    description: "All flagged items reviewed and resolved",
  },
  {
    icon: Shield,
    metric: "100%",
    label: "Audit Trail",
    description: "Complete logging of all actions and approvals",
  },
  {
    icon: TrendingUp,
    metric: "≤2%",
    label: "Error Rate",
    description: "GL coding accuracy after first month",
  },
];

export function AcceptanceCriteria() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Clear Acceptance Criteria</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We sign up for specific, measurable outcomes—not vague promises
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {criteria.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6 text-center hover:shadow-lg transition-all">
                <item.icon className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{item.metric}</div>
                <div className="font-semibold mb-2">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-8 bg-gradient-to-r from-green-500/5 to-blue-500/5 border-green-500/20">
            <h3 className="text-2xl font-semibold mb-4 text-center">Our Guarantee</h3>
            <p className="text-center text-lg mb-4">
              If we don't hit these metrics in 45 days, we work the next sprint at our cost.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-background/50 rounded-lg">
                <h4 className="font-semibold mb-2">Day 15 Checkpoint</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• System configured</li>
                  <li>• Test invoices processed</li>
                  <li>• Approval workflows live</li>
                </ul>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <h4 className="font-semibold mb-2">Day 30 Checkpoint</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 40% touchless achieved</li>
                  <li>• Exception queue stable</li>
                  <li>• Team trained</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}