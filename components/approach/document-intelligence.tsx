"use client";

import { motion } from "framer-motion";
import { FileText, Cpu, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

const pipeline = [
  { step: "PDFs", icon: FileText, desc: "Any format, any quality" },
  { step: "OCR + LLM", icon: Cpu, desc: "Extract structured data" },
  { step: "Validation", icon: CheckCircle, desc: "Apply business rules" },
  { step: "Confidence", icon: AlertCircle, desc: "Score & route exceptions" },
  { step: "Export", icon: ArrowRight, desc: "To ERP/CRM/Data Lake" },
];

const features = [
  {
    title: "Confidence Scores",
    description: "Every extraction has a confidence score. Low confidence routes to human review.",
  },
  {
    title: "Exception Routing",
    description: "Smart queues for edge cases. Your team handles exceptions, not everything.",
  },
  {
    title: "Audit Trail",
    description: "Complete history of who changed what, when. Defensible to auditors.",
  },
  {
    title: "No API? No Problem",
    description: "Desktop ERPs, upload-only systems—we build the safe middle layer.",
  },
];

export function DocumentIntelligence() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Document Intelligence as the Engine</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Turn unstructured PDFs into reliable, validated data. The safest wedge for most portfolios.
            </p>
          </div>

          {/* Pipeline Visualization */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-8 text-center">From PDF to Structured Data</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {pipeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {index < pipeline.length - 1 && (
                      <div className="hidden md:block absolute top-8 -right-2 z-10">
                        <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
                      </div>
                    )}
                    <div className="bg-card border rounded-lg p-4 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3">
                        <Icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <h4 className="font-medium text-sm mb-1">{item.step}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border rounded-lg p-6"
              >
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Why This Matters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg p-8 border"
          >
            <h3 className="text-xl font-semibold mb-4">Why Document Intelligence is the Perfect Starting Point</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
                <h4 className="font-medium mb-1">Immediate Impact</h4>
                <p className="text-sm text-muted-foreground">
                  Every business has document bottlenecks. Fix one, save hours daily.
                </p>
              </div>
              <div>
                <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
                <h4 className="font-medium mb-1">Low Risk</h4>
                <p className="text-sm text-muted-foreground">
                  Human-in-the-loop validation means nothing goes wrong on day one.
                </p>
              </div>
              <div>
                <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
                <h4 className="font-medium mb-1">Foundation for More</h4>
                <p className="text-sm text-muted-foreground">
                  Once data is structured, automation possibilities multiply.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}