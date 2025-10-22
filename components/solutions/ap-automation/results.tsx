"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, DollarSign, Users } from "lucide-react";

const results = [
  {
    company: "Manufacturing Portco",
    erp: "QuickBooks Online",
    metrics: {
      touchless: "64%",
      time: "75% reduction",
      cost: "$180K/year saved",
      timeline: "30 days",
    },
    quote: "AP backlog eliminated. Month-end close moved from day 15 to day 5.",
  },
  {
    company: "Distribution Company",
    erp: "Sage 100",
    metrics: {
      touchless: "58%",
      time: "60% reduction",
      cost: "$120K/year saved",
      timeline: "3 sprints",
    },
    quote: "Upload-only Sage worked perfectly. CSV specs made it simple.",
  },
  {
    company: "Healthcare Services",
    erp: "NetSuite",
    metrics: {
      touchless: "71%",
      time: "80% reduction",
      cost: "$240K/year saved",
      timeline: "25 days",
    },
    quote: "Multi-entity approval routing solved. Audit passed with zero findings.",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Time Savings",
    metric: "70%",
    description: "Average reduction in AP processing time",
  },
  {
    icon: DollarSign,
    title: "Cost Reduction",
    metric: "$150K+",
    description: "Average annual savings per portco",
  },
  {
    icon: TrendingUp,
    title: "Accuracy",
    metric: "98%",
    description: "GL coding accuracy after training",
  },
  {
    icon: Users,
    title: "Team Impact",
    metric: "3 FTEs",
    description: "Redeployed to strategic finance work",
  },
];

export function Results() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Results from Real Portcos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Anonymized, CFO-verified outcomes you can replicate
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">{result.company}</h3>
                  <p className="text-sm text-muted-foreground">ERP: {result.erp}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <div className="text-2xl font-bold text-green-400">{result.metrics.touchless}</div>
                    <div className="text-xs text-muted-foreground">Touchless</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{result.metrics.timeline}</div>
                    <div className="text-xs text-muted-foreground">Implementation</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">{result.metrics.time}</div>
                    <div className="text-xs text-muted-foreground">Time saved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400">{result.metrics.cost}</div>
                    <div className="text-xs text-muted-foreground">Annual savings</div>
                  </div>
                </div>
                <blockquote className="text-sm italic text-muted-foreground border-l-2 border-green-400 pl-3">
                  "{result.quote}"
                </blockquote>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Average Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">Portfolio-Wide Impact</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center">
                <benefit.icon className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{benefit.metric}</div>
                <div className="font-semibold mb-1">{benefit.title}</div>
                <div className="text-sm text-muted-foreground">{benefit.description}</div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}