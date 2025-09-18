"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Zap,
  Users,
  ShieldCheck,
} from "lucide-react";

const pillars = [
  {
    icon: Building2,
    title: "Portfolio OS",
    description: "Fund-level visibility",
    details:
      "Centralize KPIs, governance, and ROI tracking so partners and LPs see progress without chasing every operator for updates.",
  },
  {
    icon: Zap,
    title: "Sprint Factory",
    description: "Prebuilt execution",
    details:
      "Deploy the library of battle-tested automations to ship the first win in 30–45 days, even inside legacy stacks with no APIs.",
  },
  {
    icon: Users,
    title: "Operator Enablement",
    description: "Hands-on adoption",
    details:
      "Train management teams, wire SOPs, and embed change champions so the tech sticks after we hand off.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Governance",
    description: "Security and compliance",
    details:
      "Fee-offset ready documentation, audit trails, and portfolio guardrails designed for regulated PE environments.",
  },
];

export function ValuePillars() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Four Pillars for PE Value Creation
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            The operating partner system that keeps every portfolio company moving in the same direction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full hover:border-primary/50 transition-all duration-300 group relative flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                      <pillar.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {pillar.title}
                  </CardTitle>

                  <CardDescription className="text-primary/70 font-medium">
                    {pillar.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    {pillar.details}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
