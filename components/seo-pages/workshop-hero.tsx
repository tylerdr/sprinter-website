"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2 } from "lucide-react";
import Balancer from "react-wrap-balancer";

interface HeroSectionProps {
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  primaryCTA: string;
  primaryCTAHref: string;
  secondaryCTA?: string;
  secondaryCTAHref?: string;
}

export function HeroSection({
  badge,
  headline,
  subheadline,
  description,
  primaryCTA,
  primaryCTAHref,
  secondaryCTA,
  secondaryCTAHref,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-background py-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 dark:from-blue-600/10 dark:via-transparent dark:to-purple-600/10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Badge className="mb-4" variant="secondary">
            <Building2 className="w-3 h-3 mr-1" />
            {badge}
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <Balancer>{headline}</Balancer>
          </h1>

          <p className="text-xl md:text-2xl text-primary font-semibold mb-6">
            {subheadline}
          </p>

          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            <Balancer>{description}</Balancer>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link href={primaryCTAHref}>
                {primaryCTA}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {secondaryCTA && secondaryCTAHref && (
              <Button asChild size="lg" variant="outline">
                <Link href={secondaryCTAHref}>{secondaryCTA}</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}