"use client";

import { motion } from "framer-motion";
import { FileText, CheckSquare, BarChart3, Calculator, Shield, Rocket } from "lucide-react";

const iconMap = {
  document: FileText,
  checklist: CheckSquare,
  chart: BarChart3,
  calculator: Calculator,
  shield: Shield,
  rocket: Rocket,
};

interface DeliverableItem {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
}

interface DeliverablesListProps {
  title: string;
  items: DeliverableItem[];
}

export function DeliverablesList({ title, items }: DeliverablesListProps) {
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-lg p-6 border border-border"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}