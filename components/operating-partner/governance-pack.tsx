"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, FileCheck, Download } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Vendor Neutrality",
    description: "Recommendations, not reselling. We show all options: build, buy, or hybrid.",
  },
  {
    icon: Lock,
    title: "Least-Privilege Access",
    description: "Minimal permissions, redacted docs, segregated environments.",
  },
  {
    icon: Eye,
    title: "Full Audit Trail",
    description: "Every action logged. Every decision documented. LP-defensible.",
  },
  {
    icon: FileCheck,
    title: "Fee-Offset Optics",
    description: "Clear documentation for management fee offsets and portco billing.",
  },
];

export function GovernancePack() {
  return (
    <section id="governance" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Governance You Can Defend</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Security, audit, fee-offset optics, neutrality. Everything Legal and Compliance needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                    <feature.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20">
            <h3 className="text-2xl font-semibold mb-4">Get the Governance Pack</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Complete security policies, data handling procedures, audit samples, and fee-offset documentation. 
              Everything your CFO and counsel need to approve.
            </p>
            <Button size="lg" className="group">
              <Download className="mr-2 w-5 h-5" />
              Download Governance Pack PDF
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}