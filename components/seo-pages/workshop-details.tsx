"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Users, Target, Clock, DollarSign } from "lucide-react";

const details = [
  {
    icon: Users,
    title: "Who It's For",
    description: "Operating Partners, Value Creation teams, Portfolio CEOs/CFOs, and PE deal teams evaluating AI opportunities."
  },
  {
    icon: Target,
    title: "What We Focus On",
    description: "High-impact, fast-payback use cases. AP automation, quote intelligence, 3PL operations, and portfolio reporting."
  },
  {
    icon: Clock,
    title: "Time Commitment",
    description: "10 business days total. Your team invests ~10 hours across stakeholder interviews and working sessions."
  },
  {
    icon: DollarSign,
    title: "Investment",
    description: "Fixed fee of $25,000. 100% credits toward pilot implementation if you proceed within 30 days."
  }
];

export function WorkshopDetails() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-xl group-hover:blur-2xl transition-all opacity-50" />
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 h-full">
                <detail.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{detail.title}</h3>
                <p className="text-muted-foreground text-sm">{detail.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}