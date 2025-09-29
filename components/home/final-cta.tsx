"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Calendar, ShieldCheck } from "lucide-react";
import Balancer from "react-wrap-balancer";

export function FinalCTA() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-10 left-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-10 bg-blue-600"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 right-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-10 bg-purple-600"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-primary/20 backdrop-blur-sm mb-8"
          >
            <Rocket className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-primary">Portfolio AI Pilot</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            <Balancer>
              Ready to <span className="gradient-text">Transform Your Portfolio</span>?
            </Balancer>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-8 text-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">Fee-offset ready</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">10 days</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">2 live use cases</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            <Balancer>
              Bring two portfolio companies. We run discovery, ship production automation, and capture the metrics your LPs expect.
            </Balancer>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" variant="gradient" className="text-lg px-8">
              <Link href="/contact?type=pilot" className="group">
                Start the Pilot
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <Link href="/ai-assessment">
                Get a Portfolio Assessment
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-4 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-xl border border-border/50 max-w-2xl mx-auto"
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-green-400">Guaranteed adoption</span> — If the sprint doesn&apos;t deliver a live automation with real usage, we refund the entire engagement.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
