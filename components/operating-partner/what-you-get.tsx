"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FileText, Shield, BarChart3, Users, Target, Trophy } from "lucide-react";

const deliverables = [
  {
    icon: FileText,
    title: "Portfolio AI Roadmap",
    description: "Day-100 plan with clear milestones, acceptance criteria, and replication playbooks.",
  },
  {
    icon: Shield,
    title: "Options Memos",
    description: "Vendor-neutral analysis: off-the-shelf vs semi-custom vs agentic middle layer.",
  },
  {
    icon: BarChart3,
    title: "Portfolio Scoreboard",
    description: "KPIs across portcos: adoption, cycle times, touchless %, verified savings.",
  },
  {
    icon: Users,
    title: "OP Council Access",
    description: "Monthly virtual roundtable with other OPs. Share wins, patterns, and pitfalls.",
  },
  {
    icon: Target,
    title: "Bench Credits",
    description: "Allocate expert hours across portcos. One throat to choke, flexible deployment.",
  },
  {
    icon: Trophy,
    title: "LP-Ready Narrative",
    description: "Slides and language for Partner letters, IC memos, and exit books.",
  },
];

export function WhatYouGet() {
  return (
    <section id="what-you-get" className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fund-level orchestration with portfolio-wide leverage. Not just another vendor.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-all hover:border-blue-500/50">
                <item.icon className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}