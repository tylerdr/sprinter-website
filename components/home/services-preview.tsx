"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChartBar,
  Rocket, 
  Users,
  ArrowRight,
  Target,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const funnelStages = [
  {
    step: "1",
    icon: ChartBar,
    title: "AI Readiness Assessment",
    price: "FREE",
    duration: "24 hours",
    description: "Get a custom Portfolio AI Blueprint identifying your highest-ROI opportunities",
    features: [
      "Portfolio-wide AI opportunity analysis",
      "ROI projections for each use case",
      "Implementation roadmap",
      "Risk assessment & mitigation"
    ],
    href: "/ai-assessment",
    cta: "Start Free Assessment",
    badge: "No Risk",
    highlight: false,
  },
  {
    step: "2",
    icon: Rocket,
    title: "5-Day AI Sprint", 
    price: "$50,000",
    duration: "5 days",
    description: "Build and deploy your first AI solution with guaranteed 10× ROI",
    features: [
      "Working AI prototype",
      "Full source code & documentation",
      "Team training included",
      "90-day support"
    ],
    href: "/ai-sprint",
    cta: "Book Your Sprint",
    badge: "Most Popular",
    highlight: true,
  },
  {
    step: "3",
    icon: Users,
    title: "AI Partnership Program",
    price: "$35-200K/mo",
    duration: "Ongoing",
    description: "Virtual AI operating partner for your entire portfolio",
    features: [
      "Monthly AI implementations",
      "Dedicated AI team",
      "Board-level advisory",
      "10× ROI guarantee"
    ],
    href: "/ai-partnership",
    cta: "Explore Partnership",
    badge: "Enterprise",
    highlight: false,
  }
];

export function ServicesPreview() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Your Path to AI Success
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Simple 3-Step <span className="gradient-text">Growth Journey</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            From assessment to implementation to scale. A proven path that PE firms trust.
          </p>
        </motion.div>

        {/* Visual Progress Bar */}
        <div className="hidden lg:block max-w-5xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-border" />
            <div className="relative flex justify-between">
              {funnelStages.map((stage, index) => (
                <motion.div
                  key={stage.step}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-primary">
                    {stage.step}
                  </div>
                  <span className="text-sm text-muted-foreground mt-2">{stage.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {funnelStages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className={`h-full hover:border-primary/50 transition-all duration-300 group relative flex flex-col ${
                stage.highlight ? 'border-primary/30 bg-primary/5 scale-105' : ''
              }`}>
                {stage.badge && (
                  <div className="absolute -top-3 left-4">
                    <Badge variant={stage.highlight ? "default" : "secondary"} className="text-xs">
                      {stage.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-background/50 border border-border">
                        <stage.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-muted-foreground/30">
                        {stage.step}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {stage.title}
                  </CardTitle>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-2xl font-bold text-primary">
                      {stage.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stage.duration}
                    </span>
                  </div>
                  <CardDescription className="mt-3">
                    {stage.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow flex flex-col">
                  <div className="space-y-2 mb-6 flex-grow">
                    {stage.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    asChild 
                    variant={stage.highlight ? "gradient" : "outline"}
                    className="w-full group"
                  >
                    <Link href={stage.href}>
                      {stage.cta}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-6 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl border border-border/50 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">
              Proven Results for PE Firms
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Time Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">20×</div>
                <div className="text-sm text-muted-foreground">Average ROI</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">$2.3M</div>
                <div className="text-sm text-muted-foreground">Avg Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">5 Days</div>
                <div className="text-sm text-muted-foreground">To Deploy</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Not sure where to start? Our AI experts are here to help.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">
              Schedule a Call with Our Team
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}