"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, FileText, Lightbulb, Calendar } from "lucide-react";
import { BookDemoButton } from "@/components/shared/book-demo-button";

const agenda = [
  {
    time: "0-20 min",
    title: "Current State Audit",
    description: "Map your top pain point (AP, quotes, or 3PL)",
  },
  {
    time: "20-50 min",
    title: "Options Analysis",
    description: "Review 3 paths: off-the-shelf, semi-custom, agentic",
  },
  {
    time: "50-70 min",
    title: "Pilot Planning",
    description: "Define acceptance criteria and timeline",
  },
  {
    time: "70-90 min",
    title: "Governance Review",
    description: "Security, fee-offset, and LP reporting approach",
  },
];

export function Workshop() {
  return (
    <section id="workshop" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">90-Minute Operating Partner Workshop</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leave with a pilot plan and options memo. No fluff, just executable next steps.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Agenda */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Workshop Agenda</h3>
            <div className="space-y-4">
              {agenda.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-sm font-medium text-blue-400 whitespace-nowrap">
                      {item.time}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* What You Get */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">What You Leave With</h3>
            <div className="space-y-4 mb-8">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <div>
                    <h4 className="font-semibold">Pilot SOW Template</h4>
                    <p className="text-sm text-muted-foreground">With acceptance criteria and gates</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-purple-400" />
                  <div>
                    <h4 className="font-semibold">Options Memo</h4>
                    <p className="text-sm text-muted-foreground">3 implementation paths with trade-offs</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-400" />
                  <div>
                    <h4 className="font-semibold">IC Paragraph</h4>
                    <p className="text-sm text-muted-foreground">Ready-to-paste for board approval</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-400" />
                <div>
                  <h4 className="font-semibold">Who Should Attend</h4>
                  <p className="text-sm text-muted-foreground">
                    Head of Portfolio Ops + 1-2 portco CFOs (optional)
                  </p>
                </div>
              </div>
              <BookDemoButton 
                size="lg" 
                text="Book Your Workshop"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              />
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}