"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar, DollarSign, Users } from "lucide-react";
import { BookDemoButton } from "@/components/shared/book-demo-button";

export function ServicesCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/10 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Main CTA */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-12 border text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Pick the package that fits your needs. All with transparent pricing and clear deliverables.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <BookDemoButton text="Book 90-Minute Workshop" size="lg" />
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">
                  View All Packages
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="text-sm">30-45 day delivery</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className="text-sm">Fixed pricing, no surprises</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="text-sm">Your team, empowered</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/approach" className="group">
              <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                  Our Approach →
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn about our people-first methodology
                </p>
              </div>
            </Link>

            <Link href="/case-studies" className="group">
              <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                  Case Studies →
                </h3>
                <p className="text-sm text-muted-foreground">
                  See real results from portfolio companies
                </p>
              </div>
            </Link>

            <Link href="/governance" className="group">
              <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                  Governance →
                </h3>
                <p className="text-sm text-muted-foreground">
                  AI frameworks defensible to LPs
                </p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}