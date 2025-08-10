"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Lightbulb, 
  Code, 
  Users,
  ArrowRight,
  Clock,
  Target,
  Zap
} from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "AI Discovery Workshop",
    shortTitle: "Discovery",
    description: "Identify high-ROI AI opportunities in your business. One day to transform your perspective.",
    features: ["1 Day", "$5,000", "3-5 Opportunities"],
    href: "/services/discovery",
    badge: "Most Popular",
    highlight: true,
  },
  {
    icon: Zap,
    title: "10-Day AI Sprint", 
    shortTitle: "Sprint",
    description: "From idea to production AI in 10 days. We build, deploy, and train your team.",
    features: ["10 Days", "$25-50K", "Production Ready"],
    href: "/services/sprint",
    badge: "Fast Track",
  },
  {
    icon: Code,
    title: "Enterprise Transformation",
    shortTitle: "Transform",
    description: "Full-scale AI integration across your organization. Strategic, systematic, scalable.",
    features: ["3-6 Months", "$150K+", "Company-Wide"],
    href: "/services/enterprise",
  },
  {
    icon: Rocket,
    title: "Venture Partnership",
    shortTitle: "Venture",
    description: "We become your technical co-founder. Build breakthrough AI products together.",
    features: ["Ongoing", "Equity-Based", "Co-Creation"],
    href: "/services/venture",
    badge: "Exclusive",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
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
              How We Work
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">AI Journey</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            From rapid prototypes to enterprise transformation. Pick the path that fits your timeline and ambition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Link href={service.href} className="block h-full">
                <Card className={`h-full hover:border-primary/50 transition-all duration-300 group relative ${
                  service.highlight ? 'border-primary/30 bg-primary/5' : ''
                }`}>
                  {service.badge && (
                    <div className="absolute -top-3 left-4">
                      <Badge variant="default" className="text-xs">
                        {service.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-background/50 border border-border">
                        <service.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Compare All Options
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-card/50 transition-colors"
              >
                Schedule a Call
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}