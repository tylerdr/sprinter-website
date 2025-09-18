"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingUp, LineChart, Handshake, Lightbulb, ArrowRight } from "lucide-react";

const segments = [
  {
    icon: TrendingUp,
    title: "Lower Middle Market PE",
    description: "Ship value creation in 45 days",
    details:
      "Embed a sprint factory across your portfolio. We handle legacy ERPs, change management, and fee-offset reporting.",
    href: "/operating-partner",
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: LineChart,
    title: "Growth Equity",
    description: "Accelerate GTM experiments",
    details:
      "Stand up revenue operations, quote intelligence, and AI-assisted CS faster than the competition can copy you.",
    href: "/solutions/quote-intelligence",
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: Handshake,
    title: "Independent Sponsors",
    description: "Bring an operating partner day one",
    details:
      "Show lenders and co-investors a ready-made operating system—complete with governance, reporting, and execution muscle.",
    href: "/partnership",
    color: "from-amber-500/10 to-orange-500/10",
  },
  {
    icon: Lightbulb,
    title: "Venture Studios & PE Platforms",
    description: "Turn playbooks into platform value",
    details:
      "Spin up shared services, templatize wins, and reuse data models so every add-on accretes faster.",
    href: "/pe-services",
    color: "from-emerald-500/10 to-teal-500/10",
  },
];

export function ForYourWorld() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Built for Your World
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Private equity, growth equity, and operators who need real products—not pitch decks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {segments.map((segment, index) => (
            <motion.div
              key={segment.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${segment.color}`} />

                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-background/90 backdrop-blur-sm border border-border">
                      <segment.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <CardTitle className="text-2xl group-hover:text-primary transition-colors mb-2">
                    {segment.title}
                  </CardTitle>

                  <CardDescription className="text-primary/80 font-semibold text-lg">
                    {segment.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 flex flex-col justify-between flex-grow">
                  <p className="text-sm text-muted-foreground mb-6">
                    {segment.details}
                  </p>

                  <Button
                    asChild
                    variant="ghost"
                    className="w-full group justify-start p-0 h-auto text-primary hover:text-primary/80"
                  >
                    <Link href={segment.href} className="flex items-center gap-2">
                      Explore how we help {segment.title}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm">
            <span className="text-sm text-muted-foreground">
              Need something different?
            </span>
            <Button asChild variant="link" className="p-0 h-auto text-sm">
              <Link href="/contact">
                Let&apos;s design a playbook together
                <ArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
