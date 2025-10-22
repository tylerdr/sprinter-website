"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  headline: string;
  description: string;
  primaryCTA: string;
  primaryCTAHref: string;
  secondaryCTA?: string;
  secondaryCTAHref?: string;
}

export function CTASection({
  headline,
  description,
  primaryCTA,
  primaryCTAHref,
  secondaryCTA,
  secondaryCTAHref,
}: CTASectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{headline}</h2>
          <p className="text-lg text-muted-foreground mb-8">{description}</p>

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