"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceEntity } from "@/lib/entities/service-entity";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface DynamicServiceViewProps {
  service: ServiceEntity;
}

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = Icons[name as keyof typeof Icons] as any;
  return Icon ? <Icon className={className} /> : <Icons.Sparkles className={className} />;
}

export function DynamicServiceView({ service }: DynamicServiceViewProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4" variant="outline">
                <DynamicIcon name={service.hero.badge.icon} className="w-3 h-3 mr-1" />
                {service.hero.badge.text}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {service.hero.headline.text}{" "}
                <span className="gradient-text">{service.hero.headline.highlighted}</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {service.hero.subheadline}
              </p>

              {/* Stats Grid */}
              {service.hero.stats && service.hero.stats.length > 0 && (
                <div className={cn(
                  "grid gap-4 mb-8 max-w-3xl mx-auto",
                  service.hero.stats.length === 1 && "grid-cols-1",
                  service.hero.stats.length === 2 && "grid-cols-2",
                  service.hero.stats.length === 3 && "grid-cols-3",
                  service.hero.stats.length >= 4 && "grid-cols-4"
                )}>
                  {service.hero.stats.map((stat, i) => (
                    <div key={i} className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border">
                      <p className={cn(
                        "text-2xl font-bold",
                        stat.color || "text-blue-500"
                      )}>{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <Link href={`/contact?service=${service.slug}&action=${service.hero.cta.primary.action}`}>
                    {service.hero.cta.primary.text}
                    <Icons.ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={service.hero.cta.secondary.href}>
                    {service.hero.cta.secondary.text}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      {service.challenges && service.challenges.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Challenges We Solve</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transform these pain points into competitive advantages
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {service.challenges.map((challenge, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {challenge.icon && (
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          <DynamicIcon name={challenge.icon} className="w-5 h-5 text-blue-500" />
                        </div>
                      )}
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                        <p className="text-sm">
                          <span className="font-medium text-red-500">Problem:</span> {challenge.problem}
                        </p>
                      </div>
                      <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                        <p className="text-sm">
                          <span className="font-medium text-green-500">Solution:</span> {challenge.solution}
                        </p>
                      </div>
                      <Badge variant="secondary" className="w-full justify-center">
                        {challenge.outcome}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities Section */}
      {service.capabilities && service.capabilities.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Platform Capabilities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Enterprise-grade features that deliver measurable results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {service.capabilities.map((capability, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <DynamicIcon name={capability.icon} className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      {capability.title}
                      {capability.badge && (
                        <Badge variant="outline" className="ml-2">{capability.badge}</Badge>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{capability.description}</p>
                    <ul className="space-y-1">
                      {capability.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <Icons.CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Implementation Timeline */}
      {service.implementation && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{service.implementation.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {service.implementation.description}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {service.implementation.timeline.map((phase, index) => (
                  <Card key={index} className="relative">
                    {index < service.implementation.timeline.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 z-0" />
                    )}
                    <CardHeader>
                      <Badge className="w-fit mb-2">{phase.duration}</Badge>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Icons.CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-1" />
                            <span className="text-sm">{activity}</span>
                          </li>
                        ))}
                      </ul>
                      {phase.milestone && (
                        <div className="mt-4 pt-3 border-t">
                          <Badge variant="secondary">{phase.milestone}</Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Metrics & ROI */}
      {service.metrics && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Proven Results</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Measurable impact across portfolio deployments
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Before/After Metrics */}
                {service.metrics.beforeAfter && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Transformation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {service.metrics.beforeAfter.map((metric, i) => (
                          <div key={i}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">{metric.metric}</span>
                              <Badge variant="secondary">+{metric.improvement}</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-red-500/10 rounded p-2">
                                <p className="text-xs text-muted-foreground">Before</p>
                                <p className="font-semibold">{metric.before}</p>
                              </div>
                              <div className="bg-green-500/10 rounded p-2">
                                <p className="text-xs text-muted-foreground">After</p>
                                <p className="font-semibold">{metric.after}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Financial Impact */}
                {service.metrics.financial && (
                  <Card className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/30">
                    <CardHeader>
                      <CardTitle>{service.metrics.financial.headline}</CardTitle>
                      <CardDescription>{service.metrics.financial.impactPeriod}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {service.metrics.financial.stats.map((stat, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-card rounded">
                            <div>
                              <p className="text-sm font-medium">{stat.label}</p>
                              {stat.description && (
                                <p className="text-xs text-muted-foreground">{stat.description}</p>
                              )}
                            </div>
                            <span className="font-bold text-lg">{stat.value}</span>
                          </div>
                        ))}
                        <div className="pt-4 border-t text-center">
                          <p className="text-sm text-muted-foreground mb-2">Total Impact</p>
                          <p className="text-3xl font-bold gradient-text">
                            {service.metrics.financial.totalImpact}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      {service.useCases && service.useCases.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real results from portfolio company implementations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {service.useCases.map((useCase, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{useCase.title}</CardTitle>
                        {useCase.industry && (
                          <Badge variant="outline" className="mt-1">{useCase.industry}</Badge>
                        )}
                      </div>
                      {useCase.metric && (
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-500">{useCase.metric.value}</p>
                          <p className="text-xs text-muted-foreground">{useCase.metric.label}</p>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      <span className="font-medium">Challenge:</span> {useCase.challenge}
                    </p>
                    <p className="text-sm mb-3">
                      <span className="font-medium">Solution:</span> {useCase.solution}
                    </p>
                    <div className="space-y-2">
                      {useCase.results.map((result, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <Icons.CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      {service.pricing && service.pricing.tiers.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start small, scale across your portfolio
              </p>
            </div>

            <div className={cn(
              "grid gap-6 max-w-6xl mx-auto grid-cols-1",
              service.pricing.tiers.length === 1 && "md:grid-cols-1",
              service.pricing.tiers.length === 2 && "md:grid-cols-2",
              service.pricing.tiers.length === 3 && "md:grid-cols-3",
              service.pricing.tiers.length >= 4 && "md:grid-cols-4"
            )}>
              {service.pricing.tiers.map((tier, i) => (
                <Card key={i} className={cn(
                  tier.highlighted && "border-blue-500 shadow-xl relative"
                )}>
                  {tier.badge && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">{tier.badge}</Badge>
                  )}
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <div>
                      <p className="text-2xl font-bold">{tier.price}</p>
                      <p className="text-sm text-muted-foreground">{tier.duration}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                    <ul className="space-y-2">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <Icons.CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {service.testimonials && service.testimonials.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Leaders Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {service.testimonials.map((testimonial, i) => (
                <Card key={i} className="bg-gradient-to-br from-neutral-900 to-neutral-800">
                  <CardContent className="pt-6">
                    {testimonial.metric && (
                      <Badge variant="secondary" className="mb-4">{testimonial.metric}</Badge>
                    )}
                    <p className="text-sm italic mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/30">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                {service.cta.headline}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {service.cta.description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {service.cta.buttons.map((button, i) => (
                  <Button
                    key={i}
                    size="lg"
                    variant={button.variant}
                    className="gap-2"
                    asChild
                  >
                    <Link href={button.href}>
                      {button.icon && <DynamicIcon name={button.icon} className="w-5 h-5" />}
                      {button.text}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}