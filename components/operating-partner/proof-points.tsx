"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, CheckCircle2, Target } from "lucide-react";

const proofs = [
  {
    metric: "64%",
    label: "AP touchless rate",
    context: "in 30 days (QBO; 18k invoices/yr)*",
    icon: CheckCircle2,
    color: "text-green-400",
  },
  {
    metric: "42%",
    label: "Quote cycle reduction",
    context: "after 6 weeks (RFPs→Avontus)*",
    icon: Clock,
    color: "text-blue-400",
  },
  {
    metric: "18pts",
    label: "3PL billing accuracy gain",
    context: "with upload-only Sage*",
    icon: Target,
    color: "text-purple-400",
  },
  {
    metric: "<48h",
    label: "Exception SLA",
    context: "for all automated workflows*",
    icon: TrendingUp,
    color: "text-orange-400",
  },
];

export function ProofPoints() {
  return (
    <section id="proof" className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proven Results</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Representative outcomes from our implementation methodology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {proofs.map((proof, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6 text-center hover:shadow-lg transition-all">
                <proof.icon className={`w-8 h-8 ${proof.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold mb-1">{proof.metric}</div>
                <div className="text-sm font-medium mb-2">{proof.label}</div>
                <div className="text-xs text-muted-foreground">{proof.context}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground"
        >
          * Anonymized internal data; CFO-verified method included in case briefs.
        </motion.p>
      </div>
    </section>
  );
}