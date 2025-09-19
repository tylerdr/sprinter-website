"use client";

import { motion } from "framer-motion";
import { Users, Workflow, Briefcase, Package, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "People",
    description: "Earn trust; design for the front line; measure joy-of-work and adoption.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Workflow,
    title: "Process",
    description: "Map how work really happens; remove friction; define acceptance criteria.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Briefcase,
    title: "Projects",
    description: "Deliver 2-week wedge sprints; prove value fast; document results.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Package,
    title: "Product",
    description: "Scale what works into durable automations and internal products.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

export function FourPillars() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The 4 Ps: Our Proven Methodology</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A systematic approach that starts with people and ends with scalable solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                {/* Arrow between pillars */}
                {index < pillars.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-3 z-10">
                    <ArrowRight className="w-6 h-6 text-muted-foreground/50" />
                  </div>
                )}

                <div className="bg-card border rounded-lg p-6 h-full hover:shadow-lg transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${pillar.bgColor} mb-4`}>
                    <Icon className={`w-6 h-6 ${pillar.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <span className="text-sm font-medium">Result:</span>
            <span className="text-sm text-muted-foreground">
              Sustainable AI adoption with measurable ROI and happy teams
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}