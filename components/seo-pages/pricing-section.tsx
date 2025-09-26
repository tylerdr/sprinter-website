"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingPackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

interface PricingSectionProps {
  title: string;
  packages: PricingPackage[];
}

export function PricingSection({ title, packages }: PricingSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative bg-background rounded-lg p-8 border",
                pkg.recommended
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              )}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </div>

              <ul className="space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}