"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Clock, CheckCircle } from "lucide-react";
import { BookDemoButton } from "@/components/shared/book-demo-button";

export function APHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-background py-20 pt-32">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm mb-8"
          >
            <FileText className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              AP & Expense Automation
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            60% Touchless Invoices
            <span className="gradient-text block mt-2">in 2-3 Sprints</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Works with QBO, Sage, NetSuite, and even upload-only ERPs. 
            <span className="block mt-2 text-lg">Clear acceptance criteria. Full audit trail. Exception SLA &lt;48 hours.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <BookDemoButton 
              size="lg" 
              text="Book AP Assessment"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            />
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="#ap-brief" className="group">
                Download AP Accelerator Brief
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">≥60%</div>
              <div className="text-sm text-muted-foreground">Touchless rate</div>
            </div>
            <div className="text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">&lt;48h</div>
              <div className="text-sm text-muted-foreground">Exception SLA</div>
            </div>
            <div className="text-center">
              <FileText className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground">Audit trail</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}