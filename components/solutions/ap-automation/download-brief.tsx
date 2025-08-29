"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle } from "lucide-react";
import { BookDemoButton } from "@/components/shared/book-demo-button";

const briefContents = [
  "Complete implementation timeline",
  "Acceptance criteria checklist",
  "CSV specifications for Sage/QB Desktop",
  "ROI calculation template",
  "Change management guide",
  "Vendor evaluation matrix",
];

export function DownloadBrief() {
  return (
    <section id="ap-brief" className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-green-500/5 to-blue-500/5 border-green-500/20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-green-400" />
                  <h2 className="text-2xl font-bold">AP Accelerator Brief</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Everything you need to evaluate and implement AP automation in 30-45 days. 
                  Includes acceptance criteria, CSV specs for upload-only ERPs, and ROI calculator.
                </p>
                <div className="space-y-2 mb-6">
                  {briefContents.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="group">
                    <Download className="mr-2 w-5 h-5" />
                    Download Brief (PDF)
                  </Button>
                  <BookDemoButton 
                    size="lg" 
                    variant="outline"
                    text="Schedule Assessment"
                  />
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg blur-3xl opacity-20" />
                <Card className="relative p-6 bg-background/95">
                  <h3 className="font-semibold mb-3">What's Included:</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-green-400">4-page brief:</span>
                      <span className="text-muted-foreground"> Implementation roadmap with milestones</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-400">CSV templates:</span>
                      <span className="text-muted-foreground"> Ready-to-use specs for Sage & QB Desktop</span>
                    </div>
                    <div>
                      <span className="font-medium text-purple-400">ROI calculator:</span>
                      <span className="text-muted-foreground"> Estimate savings based on volume</span>
                    </div>
                    <div>
                      <span className="font-medium text-orange-400">IC memo:</span>
                      <span className="text-muted-foreground"> Board-ready justification paragraph</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-2">Questions about AP automation?</p>
          <p className="text-lg">
            Email{" "}
            <a href="mailto:ap@sprinter.ai" className="text-green-400 hover:underline">
              ap@sprinter.ai
            </a>
            {" "}or book a 30-minute assessment call.
          </p>
        </motion.div>
      </div>
    </section>
  );
}