"use client";

import { motion } from "framer-motion";
import { Target, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const wedgeExamples = [
  "BOL & freight bills reconciliation",
  "Field work order digitization",
  "Warranty claim processing",
  "Vendor onboarding document extraction",
  "Job ticket parsing and routing",
  "HR onboarding checklist automation",
  "Safety compliance document validation",
  "Mortgage guideline extraction",
];

export function StartSmall() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start Small. Win Early. Expand.</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We begin with a "wedge"—one document type, one process, one team.
              Two weeks later, they're believers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: What is a Wedge */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">What is a Wedge?</h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Target className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">One Specific Document Type</h4>
                    <p className="text-sm text-muted-foreground">
                      Pick a single document that causes daily pain—invoices, BOLs, work orders.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-purple-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Two-Week Sprint</h4>
                    <p className="text-sm text-muted-foreground">
                      Fast enough to maintain momentum, thorough enough to prove value.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Clear Acceptance Criteria</h4>
                    <p className="text-sm text-muted-foreground">
                      Defined success metrics: touchless rate, cycle time, accuracy improvements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Foundation for Expansion</h4>
                    <p className="text-sm text-muted-foreground">
                      Success with one document type builds trust for broader automation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button asChild>
                  <Link href="/approach/wedge">Find Your Perfect Wedge →</Link>
                </Button>
              </div>
            </div>

            {/* Right: Example Wedges */}
            <div className="bg-muted/20 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-6">Popular Wedge Examples</h3>
              <div className="grid grid-cols-1 gap-3">
                {wedgeExamples.map((example, index) => (
                  <motion.div
                    key={example}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{example}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm font-medium text-blue-400 mb-1">Not AP-Centric</p>
                <p className="text-xs text-muted-foreground">
                  We focus on document intelligence across all operations, not just accounts payable.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}