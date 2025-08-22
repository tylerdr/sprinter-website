"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChartBar,
  Rocket, 
  TrendingUp,
  Handshake,
  ArrowRight,
  CheckCircle,
  Target
} from "lucide-react";
import { FUNNEL_STAGES, FUNNEL_TRANSITIONS } from "@/lib/funnel-config";

const funnelStages = [
  {
    step: "1",
    stage: FUNNEL_STAGES.ASSESS,
    icon: ChartBar,
    badge: "Start Here",
    highlight: false,
  },
  {
    step: "2",
    stage: FUNNEL_STAGES.SPRINT,
    icon: Rocket,
    badge: "Most Popular",
    highlight: true,
  },
  {
    step: "3",
    stage: FUNNEL_STAGES.SCALE,
    icon: TrendingUp,
    badge: "Best Value",
    highlight: false,
  },
  {
    step: "4",
    stage: FUNNEL_STAGES.PARTNER,
    icon: Handshake,
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
              Your AI Journey: Assess → Sprint → Scale → Partner
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Four Steps to <span className="gradient-text">AI Leadership</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Start with a free assessment. Sprint to prove value. Scale across your portfolio. Partner for the long term.
          </p>
        </motion.div>

        {/* Visual Journey Path - Desktop Only */}
        <div className="hidden lg:block max-w-6xl mx-auto mb-12">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 via-purple-500 to-yellow-500" />
            
            {/* Stage indicators */}
            <div className="relative flex justify-between">
              {funnelStages.map((stage, index) => (
                <motion.div
                  key={stage.step}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-16 h-16 rounded-full bg-background border-4 flex items-center justify-center font-bold text-lg
                    ${index === 0 ? 'border-green-500 text-green-500' : ''}
                    ${index === 1 ? 'border-blue-500 text-blue-500' : ''}
                    ${index === 2 ? 'border-purple-500 text-purple-500' : ''}
                    ${index === 3 ? 'border-yellow-500 text-yellow-500' : ''}
                  `}>
                    {stage.step}
                  </div>
                  <span className="text-sm font-medium mt-2">{stage.stage.verb}</span>
                  <span className="text-xs text-muted-foreground">{stage.stage.price}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {funnelStages.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className={`h-full hover:border-primary/50 transition-all duration-300 group relative flex flex-col ${
                item.highlight ? 'border-primary/30 bg-primary/5 scale-105' : ''
              }`}>
                {item.badge && (
                  <div className="absolute -top-3 left-4">
                    <Badge variant={item.highlight ? "default" : "secondary"} className="text-xs">
                      {item.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-background/50 border border-border">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-muted-foreground/30">
                        {item.step}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {item.stage.title}
                  </CardTitle>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-bold text-primary">
                      {item.stage.price}
                    </span>
                    {item.stage.priceNote && (
                      <span className="text-sm text-muted-foreground">
                        {item.stage.priceNote}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.stage.duration}
                  </span>
                  <CardDescription className="mt-3 text-sm">
                    {item.stage.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow flex flex-col">
                  <div className="space-y-2 mb-6 flex-grow">
                    {item.stage.deliverables.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {item.stage.deliverables.length > 4 && (
                      <span className="text-xs text-muted-foreground/60 italic">
                        +{item.stage.deliverables.length - 4} more...
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    asChild 
                    variant={item.highlight ? "gradient" : "outline"}
                    className="w-full group"
                    size="sm"
                  >
                    <Link href={item.stage.href}>
                      {item.stage.cta.primary}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Value Progression */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-6 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl border border-border/50 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              Each Step Builds on the Last
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold text-green-500">Free</div>
                <div className="text-sm text-muted-foreground">Assessment</div>
                <div className="text-xs mt-1">Zero risk start</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">$10K/wk</div>
                <div className="text-sm text-muted-foreground">Sprint</div>
                <div className="text-xs mt-1">Prove the value</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-500">$50K/qtr</div>
                <div className="text-sm text-muted-foreground">Scale</div>
                <div className="text-xs mt-1">Portfolio impact</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-500">$100K+/mo</div>
                <div className="text-sm text-muted-foreground">Partner</div>
                <div className="text-xs mt-1">Full transformation</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Average client progresses from Assessment to Partnership in 6 months
            </p>
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
            95% of Assessment participants move to Sprint. 80% of Sprint clients upgrade to Scale or Partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gradient" size="lg">
              <Link href="/ai-assessment">
                Start with Free Assessment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Talk to Our PE Team
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}