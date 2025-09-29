"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  Zap,
  Users,
  Rocket,
  Layers
} from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "Agentic AI Mastery",
    description: "World-class expertise",
    details:
      "We know agentic AI and autonomous systems as well as anyone in the world. This depth lets us identify the highest-ROI opportunities and architect solutions that actually work.",
  },
  {
    icon: Layers,
    title: "Pragmatic Approach",
    description: "Custom + off-the-shelf",
    details:
      "Integrate proven tools when smart, build custom when needed. Repeatable playbooks that accelerate each deployment. The 2nd portco implementation is 50% faster, the 3rd is 70% faster.",
  },
  {
    icon: Rocket,
    title: "Portfolio Wins in 45 Days",
    description: "Ship real systems fast",
    details:
      "We don't deliver PowerPoints or proofs-of-concept. Every engagement ships production systems with real users, real data, and measurable ROI within 30-45 days. Make AI boring.",
  },
  {
    icon: Users,
    title: "Operator Enablement",
    description: "Build internal capability",
    details:
      "We build WITH your operators, not for them. Full training, documentation, and repeatable playbooks ensure your team can sustain and expand AI capabilities independently.",
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
            Why <span className="gradient-text">Sprinter</span> for Agentic AI?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            World-class agentic AI expertise meets battle-tested portfolio execution. Real builders, real products, real results.
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
