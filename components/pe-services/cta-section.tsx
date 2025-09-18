"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/shared/book-demo-button";
import { ArrowRight, Download, Calendar, Phone } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Main CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Accelerate Portfolio Value?
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Join 100+ PE firms achieving 23% EBITDA improvement with AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookDemoButton
                size="lg"
                text="Get Portfolio Assessment"
                className="bg-white text-blue-600 hover:bg-gray-100"
              />
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="tel:+16156010782" className="group">
                  <Phone className="mr-2 w-5 h-5" />
                  Call: (615) 601-0782
                </a>
              </Button>
            </div>
          </div>

          {/* Resource Downloads */}
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href="/downloads/governance-pack"
                className="block p-6 bg-card border rounded-lg hover:shadow-lg transition-shadow group"
              >
                <Download className="w-8 h-8 text-blue-500 mb-3" />
                <h3 className="font-semibold mb-2">AI Governance Pack</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  LP-ready framework for portfolio AI implementation
                </p>
                <span className="text-sm text-blue-500 group-hover:underline flex items-center">
                  Download PDF
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/downloads/ap-brief"
                className="block p-6 bg-card border rounded-lg hover:shadow-lg transition-shadow group"
              >
                <Download className="w-8 h-8 text-purple-500 mb-3" />
                <h3 className="font-semibold mb-2">AP Accelerator Brief</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  30-day roadmap to 60% touchless invoices
                </p>
                <span className="text-sm text-purple-500 group-hover:underline flex items-center">
                  Download PDF
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/downloads/no-api-cookbook"
                className="block p-6 bg-card border rounded-lg hover:shadow-lg transition-shadow group"
              >
                <Download className="w-8 h-8 text-green-500 mb-3" />
                <h3 className="font-semibold mb-2">No-API Cookbook</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  AI integration for legacy systems guide
                </p>
                <span className="text-sm text-green-500 group-hover:underline flex items-center">
                  Download PDF
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center border-t pt-12"
          >
            <h3 className="text-xl font-semibold mb-4">
              Prefer a Direct Conversation?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/contact" className="group">
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule Partner Meeting
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:pe@sprinter.ai" className="group">
                  Email: pe@sprinter.ai
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}