"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/shared/book-demo-button";

export function GovernanceHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-background py-20 pt-32">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              Enterprise-Grade Governance
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Governance You Can
            <span className="gradient-text block mt-2">Defend to LPs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Vendor-neutral recommendations. Least-privilege access. Full audit logs. 
            <span className="block mt-2 text-lg">Everything Legal and Compliance needs to approve.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Download Governance Pack
            </Button>
            <BookDemoButton 
              size="lg" 
              variant="outline"
              text="Schedule Security Review"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4 text-green-400" />
              <span>SOC2 Type II</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Zero Trust</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Eye className="w-4 h-4 text-purple-400" />
              <span>Full Audit Trail</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <FileCheck className="w-4 h-4 text-orange-400" />
              <span>Vendor Neutral</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Stub components for now
export function SecurityFeatures() {
  return <div className="py-20" />;
}

export function ComplianceSection() {
  return <div className="py-20" />;
}

export function AuditTrail() {
  return <div className="py-20" />;
}

export function GovernanceDownload() {
  return <div className="py-20" />;
}