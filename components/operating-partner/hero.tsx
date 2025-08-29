"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Shield, Clock, CheckCircle } from "lucide-react";
import { BookDemoButton } from "@/components/shared/book-demo-button";

export function OperatingPartnerHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background py-20 pt-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              Fund-Level AI Orchestration
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Your AI Operating Partner
            <span className="gradient-text block mt-2">for Private Equity</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Fund-level orchestration and <strong>boringly reliable</strong> 30-45 day wins—starting with AP & expense automation, Quote Intelligence, and 3PL Ops. 
            <span className="block mt-2 text-lg">No API? No problem. We build the safe middle layer for QBO/Sage/desktop.</span>
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
              text="Book 90-Minute OP Workshop"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            />
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="#ap-brief" className="group">
                Download AP Accelerator Brief
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-green-400" />
              <span>30-45 day wins</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Vendor neutral</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <span>Acceptance criteria</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4 text-orange-400" />
              <span>Portfolio-wide</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}