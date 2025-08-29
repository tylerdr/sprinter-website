"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Upload, Brain, CheckSquare, AlertCircle, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Invoice Ingestion",
    description: "Email, portal upload, or API integration. OCR + AI extraction for all formats.",
  },
  {
    icon: Brain,
    title: "Smart Matching",
    description: "3-way match against POs and receipts. Learns your coding patterns.",
  },
  {
    icon: CheckSquare,
    title: "Auto-Approval",
    description: "Route by rules and thresholds. Skip approvals for trusted vendors.",
  },
  {
    icon: AlertCircle,
    title: "Exception Handling",
    description: "Flag anomalies for review. 48-hour SLA on all exceptions.",
  },
  {
    icon: FileCheck,
    title: "ERP Sync",
    description: "Post to GL with proper coding. Works with any ERP, even upload-only.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How AP Automation Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            End-to-end invoice processing with clear handoffs and audit trails
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-4 text-center hover:shadow-lg transition-shadow">
                <step.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">What Gets Automated</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Standard vendor invoices</li>
              <li>✓ Recurring subscriptions</li>
              <li>✓ Credit card receipts</li>
              <li>✓ Employee expenses</li>
              <li>✓ Utility bills</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">What Needs Review</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>→ New vendors (first 3 invoices)</li>
              <li>→ Amount variance &gt;10%</li>
              <li>→ Missing PO match</li>
              <li>→ Duplicate detection</li>
              <li>→ Policy violations</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}