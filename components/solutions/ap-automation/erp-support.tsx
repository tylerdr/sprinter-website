"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";

const erpSystems = [
  {
    name: "QuickBooks Online",
    status: "native",
    integration: "Full API",
    features: ["Real-time sync", "Auto-coding", "Approval routing", "Attachments"],
  },
  {
    name: "Sage (50/100/300)",
    status: "supported",
    integration: "CSV Upload",
    features: ["Batch processing", "GL mapping", "CSV specs provided", "Scheduled sync"],
  },
  {
    name: "NetSuite",
    status: "native",
    integration: "Full API",
    features: ["Real-time sync", "Custom fields", "Multi-entity", "SuiteScript compatible"],
  },
  {
    name: "Microsoft Dynamics",
    status: "native",
    integration: "Full API",
    features: ["Real-time sync", "Workflow integration", "Multi-company", "Power Automate"],
  },
  {
    name: "SAP Business One",
    status: "supported",
    integration: "Service Layer",
    features: ["Near real-time", "Document series", "Approval stages", "UDF support"],
  },
  {
    name: "Desktop/Legacy ERPs",
    status: "manual",
    integration: "Upload-Only",
    features: ["CSV export", "Excel templates", "Batch import guides", "Validation reports"],
  },
];

export function ERPSupport() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Works With Your ERP</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No API? No problem. We build the safe middle layer for any system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {erpSystems.map((erp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold">{erp.name}</h3>
                  <Badge 
                    variant={erp.status === "native" ? "default" : erp.status === "supported" ? "secondary" : "outline"}
                    className={
                      erp.status === "native" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                      erp.status === "supported" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      "bg-orange-500/10 text-orange-400 border-orange-500/20"
                    }
                  >
                    {erp.status === "native" ? "Native API" : erp.status === "supported" ? "Supported" : "Upload-Only"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{erp.integration}</p>
                <ul className="space-y-1">
                  {erp.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card className="p-6 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 border-orange-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Special Note for Upload-Only ERPs</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For Sage 50/100, QuickBooks Desktop, and other systems without APIs, we provide:
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li>• Complete CSV specifications</li>
                  <li>• Import templates and guides</li>
                  <li>• Validation before upload</li>
                  <li>• Error reconciliation tools</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}