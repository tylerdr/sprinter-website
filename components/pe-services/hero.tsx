"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/shared/book-demo-button";
import { ArrowRight, TrendingUp, Building2, Users, DollarSign } from "lucide-react";
import Link from "next/link";

export function PEServicesHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              AI Operating Partner for Private Equity
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Build <span className="gradient-text">AI That Ships</span>
            <br />for Your Portfolio Companies
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Strategic AI implementation for PE-backed companies.
            From pilot to production in 2-3 sprints with measurable ROI.
          </p>

          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="bg-card/50 backdrop-blur border rounded-lg p-4">
              <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">2-3</div>
              <div className="text-sm text-muted-foreground">Sprints to Value</div>
            </div>
            <div className="bg-card/50 backdrop-blur border rounded-lg p-4">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">60%+</div>
              <div className="text-sm text-muted-foreground">Process Automation</div>
            </div>
            <div className="bg-card/50 backdrop-blur border rounded-lg p-4">
              <DollarSign className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">10-Day</div>
              <div className="text-sm text-muted-foreground">Sprint Delivery</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookDemoButton
              size="lg"
              text="Get Portfolio Assessment"
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            />
            <Button asChild size="lg" variant="outline">
              <Link href="#playbook" className="group">
                View Value Creation Playbook
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}