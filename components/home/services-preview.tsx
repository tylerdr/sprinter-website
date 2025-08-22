"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Compass,
  Zap, 
  Waves,
  Sailboat,
  ArrowRight,
  CheckCircle,
  Target,
  Footprints,
  Rocket,
  TrendingUp,
  Users
} from "lucide-react";
import { getThemedFunnel, THEME_HEADLINES, THEME_STYLES } from "@/lib/funnel-themes";

// Icon mapping for themes
const themeIcons = {
  adventure: {
    ASSESS: Footprints,
    SPRINT: Zap,
    SCALE: Waves,
    PARTNER: Sailboat
  },
  asap: {
    ASSESS: Target,
    SPRINT: Zap,
    SCALE: Rocket,
    PARTNER: TrendingUp
  },
  motion: {
    ASSESS: Compass,
    SPRINT: Zap,
    SCALE: Rocket,
    PARTNER: Users
  }
};

export function ServicesPreview() {
  const funnel = getThemedFunnel();
  const headlines = THEME_HEADLINES[funnel.theme];
  const styles = THEME_STYLES[funnel.theme];
  const icons = themeIcons[funnel.theme];
  
  const funnelStages = [
    {
      key: "ASSESS",
      step: "1",
      stage: funnel.stages.ASSESS,
      icon: icons.ASSESS,
      badge: funnel.theme === "adventure" ? "Start Here" : "Step 1",
      highlight: false,
    },
    {
      key: "SPRINT", 
      step: "2",
      stage: funnel.stages.SPRINT,
      icon: icons.SPRINT,
      badge: "Most Popular",
      highlight: true,
    },
    {
      key: "SCALE",
      step: "3",
      stage: funnel.stages.SCALE,
      icon: icons.SCALE,
      badge: funnel.theme === "adventure" ? "Catch the Wave" : "Scale Fast",
      highlight: false,
    },
    {
      key: "PARTNER",
      step: "4",
      stage: funnel.stages.PARTNER,
      icon: icons.PARTNER,
      badge: "Enterprise",
      highlight: false,
    }
  ];

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
              {funnel.theme === "adventure" && "Your AI Adventure"}
              {funnel.theme === "asap" && "The ASAP Method"}
              {funnel.theme === "motion" && "Transform Your Velocity"}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {headlines.hero}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            {headlines.subhero}
          </p>
          
          {/* Show progression for ASAP theme */}
          {funnel.theme === "asap" && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {funnel.progression.map((step, idx) => (
                <span key={idx} className="text-sm text-muted-foreground">
                  {step}
                  {idx < funnel.progression.length - 1 && " →"}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Visual Journey Path - Desktop Only */}
        <div className="hidden lg:block max-w-6xl mx-auto mb-12">
          <div className="relative">
            {/* Connection line with theme gradient */}
            <div className={`absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r ${styles.gradient}`} />
            
            {/* Stage indicators with emojis */}
            <div className="relative flex justify-between">
              {funnelStages.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-background border-4 border-primary flex items-center justify-center text-2xl">
                    {item.stage.icon}
                  </div>
                  <span className="text-sm font-medium mt-2">{item.stage.verb}</span>
                  <span className="text-xs text-muted-foreground">{item.stage.price}</span>
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
                  
                  {/* Metaphor tagline */}
                  <p className="text-xs text-primary/70 italic">
                    {item.stage.metaphor}
                  </p>
                  
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-bold text-primary">
                      {item.stage.price}
                    </span>
                    {'priceNote' in item.stage && item.stage.priceNote && (
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
                    {item.stage.deliverables.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {item.stage.deliverables.length > 3 && (
                      <span className="text-xs text-muted-foreground/60 italic">
                        +{item.stage.deliverables.length - 3} more...
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
                      {item.stage.verb === "Amble" && "Start Ambling"}
                      {item.stage.verb === "Sprint" && "Book Sprint"}
                      {item.stage.verb === "Surf" && "Catch the Wave"}
                      {item.stage.verb === "Accelerate" && "Accelerate Now"}
                      {item.stage.verb === "Sail" && "Set Sail"}
                      {item.stage.verb === "Perform" && "Achieve Peak"}
                      {item.stage.verb === "Orient" && "Get Oriented"}
                      {item.stage.verb === "Ignite" && "Ignite Now"}
                      {item.stage.verb === "Cruise" && "Engage Cruise"}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Theme-specific value prop */}
        {funnel.theme === "adventure" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 p-6 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 via-cyan-500/5 to-purple-500/5 rounded-2xl border border-border/50 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                🗺️ Your Adventure Map
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl mb-1">🚶</div>
                  <div className="text-lg font-bold text-emerald-500">Amble</div>
                  <div className="text-xs text-muted-foreground">Explore freely</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">🏃</div>
                  <div className="text-lg font-bold text-blue-500">Sprint</div>
                  <div className="text-xs text-muted-foreground">Push hard</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">🏄</div>
                  <div className="text-lg font-bold text-cyan-500">Surf</div>
                  <div className="text-xs text-muted-foreground">Ride the wave</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">⛵</div>
                  <div className="text-lg font-bold text-purple-500">Sail</div>
                  <div className="text-xs text-muted-foreground">Navigate far</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 italic">
                "The journey of a thousand miles begins with a single step" - or in our case, a casual amble
              </p>
            </div>
          </motion.div>
        )}

        {funnel.theme === "asap" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 p-6 bg-gradient-to-r from-green-500/5 via-blue-500/5 via-orange-500/5 to-yellow-500/5 rounded-2xl border border-border/50 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                Why ASAP?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold text-green-500">A</div>
                  <div className="text-sm font-medium">Amble</div>
                  <div className="text-xs text-muted-foreground">Explore</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-500">S</div>
                  <div className="text-sm font-medium">Sprint</div>
                  <div className="text-xs text-muted-foreground">Execute</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">A</div>
                  <div className="text-sm font-medium">Accelerate</div>
                  <div className="text-xs text-muted-foreground">Scale</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-500">P</div>
                  <div className="text-sm font-medium">Perform</div>
                  <div className="text-xs text-muted-foreground">Excel</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 font-semibold">
                Your competition is moving ASAP. Are you?
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            {headlines.value}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gradient" size="lg">
              <Link href="/ai-assessment">
                {headlines.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Talk to Our Team
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}