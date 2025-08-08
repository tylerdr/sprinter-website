"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Feature {
  name: string;
  workshop: boolean | string;
  sprint: boolean | string;
  enterprise: boolean | string;
  venture: boolean | string;
}

const features: Feature[] = [
  {
    name: "Discovery & Assessment",
    workshop: true,
    sprint: true,
    enterprise: true,
    venture: true
  },
  {
    name: "Working Prototype",
    workshop: false,
    sprint: "10 days",
    enterprise: "Multiple",
    venture: "Continuous"
  },
  {
    name: "Production Deployment",
    workshop: false,
    sprint: true,
    enterprise: true,
    venture: true
  },
  {
    name: "Custom AI Models",
    workshop: false,
    sprint: "Pre-trained",
    enterprise: "Custom trained",
    venture: "Full stack"
  },
  {
    name: "Team Training",
    workshop: "Workshop",
    sprint: "Included",
    enterprise: "Full program",
    venture: "Team building"
  },
  {
    name: "Post-Launch Support",
    workshop: false,
    sprint: "30 days",
    enterprise: "6 months",
    venture: "Ongoing"
  },
  {
    name: "Source Code Ownership",
    workshop: false,
    sprint: true,
    enterprise: true,
    venture: "Shared"
  },
  {
    name: "ROI Tracking",
    workshop: "Projections",
    sprint: true,
    enterprise: true,
    venture: true
  },
  {
    name: "Dedicated Team",
    workshop: false,
    sprint: "2-4 weeks",
    enterprise: "3-6 months",
    venture: "Full-time"
  },
  {
    name: "Strategic Advisory",
    workshop: true,
    sprint: false,
    enterprise: true,
    venture: true
  }
];

const packages = [
  {
    id: "workshop",
    name: "AI Discovery Workshop",
    price: "$5,000",
    duration: "1 Day",
    description: "Find your AI quick wins",
    highlight: false,
    cta: "Book Workshop"
  },
  {
    id: "sprint",
    name: "AI Sprint",
    price: "$25-75K",
    duration: "2-4 Weeks",
    description: "Ship production AI fast",
    highlight: true,
    cta: "Start Sprint"
  },
  {
    id: "enterprise",
    name: "Enterprise Transformation",
    price: "$150K+",
    duration: "3-6 Months",
    description: "Full-scale AI integration",
    highlight: false,
    cta: "Transform Now"
  },
  {
    id: "venture",
    name: "Venture Partnership",
    price: "Equity",
    duration: "6-12 Months",
    description: "Your technical co-founder",
    highlight: false,
    cta: "Partner With Us"
  }
];

export function PricingComparison() {
  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Compare Our <span className="gradient-text">Service Packages</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Choose the engagement model that fits your timeline, budget, and ambition. 
          All packages deliver real, working AI—not just recommendations.
        </p>
      </motion.div>

      {/* Mobile Cards View */}
      <div className="block lg:hidden space-y-6">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "p-6 rounded-xl border",
              pkg.highlight
                ? "bg-brand-10 border-brand-30 shadow-lg shadow-brand/10"
                : "bg-card/5 border-border/10"
            )}
          >
            {pkg.highlight && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-gradient text-xs font-semibold text-primary-foreground mb-4">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold gradient-text">{pkg.price}</span>
              <span className="text-sm text-muted-foreground">/ {pkg.duration}</span>
            </div>
            
            <div className="space-y-3 mb-6">
              {features.slice(0, 5).map((feature) => {
                const value = feature[pkg.id as keyof Feature];
                return (
                  <div key={feature.name} className="flex items-start gap-2">
                    {value === true ? (
                      <Check className="w-4 h-4 text-success mt-0.5" />
                    ) : value === false ? (
                      <X className="w-4 h-4 text-muted-foreground/30 mt-0.5" />
                    ) : (
                      <Check className="w-4 h-4 text-success mt-0.5" />
                    )}
                    <div className="flex-1">
                      <span className="text-sm">{feature.name}</span>
                      {typeof value === "string" && (
                        <span className="text-xs text-brand ml-2">({value})</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-medium transition-all",
                pkg.highlight
                  ? "bg-brand-gradient text-primary-foreground hover:opacity-90"
                  : "bg-card/10 border border-border/20 hover:bg-card/20"
              )}
            >
              {pkg.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="min-w-[900px]"
        >
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Features
                </th>
                {packages.map((pkg) => (
                  <th key={pkg.id} className="p-4">
                    <div className={cn(
                      "p-4 rounded-t-xl",
                      pkg.highlight
                        ? "bg-brand-gradient"
                        : "bg-card/5"
                    )}>
                      {pkg.highlight && (
                        <div className="text-xs font-semibold text-primary-foreground mb-2">
                          MOST POPULAR
                        </div>
                      )}
                      <h3 className={cn(
                        "text-lg font-bold mb-1",
                        pkg.highlight ? "text-primary-foreground" : ""
                      )}>
                        {pkg.name}
                      </h3>
                      <p className={cn(
                        "text-sm mb-3",
                        pkg.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}>
                        {pkg.description}
                      </p>
                      <div className={cn(
                        "text-2xl font-bold mb-1",
                        pkg.highlight ? "text-primary-foreground" : "gradient-text"
                      )}>
                        {pkg.price}
                      </div>
                      <div className={cn(
                        "text-sm",
                        pkg.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}>
                        {pkg.duration}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={cn(
                    "border-b border-border/10",
                    index % 2 === 0 ? "bg-card/5" : ""
                  )}
                >
                  <td className="p-4 font-medium text-sm">{feature.name}</td>
                  {packages.map((pkg) => {
                    const value = feature[pkg.id as keyof Feature];
                    return (
                      <td key={pkg.id} className="p-4 text-center">
                        {value === true ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : value === false ? (
                          <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                        ) : (
                          <span className="text-sm text-brand font-medium">
                            {value}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="p-4"></td>
                {packages.map((pkg) => (
                  <td key={pkg.id} className="p-4">
                    <Link
                      href="/contact"
                      className={cn(
                        "inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-medium transition-all",
                        pkg.highlight
                          ? "bg-brand-gradient text-primary-foreground hover:opacity-90"
                          : "bg-card/10 border border-border/20 hover:bg-card/20"
                      )}
                    >
                      {pkg.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 p-6 rounded-xl bg-info-10 border border-info-30 max-w-3xl mx-auto"
      >
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Not sure which package is right for you?
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Most clients start with our AI Discovery Workshop to identify opportunities, 
          then move to an AI Sprint for rapid implementation. Enterprise clients often 
          combine multiple sprints for comprehensive transformation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-medium text-info hover:underline"
        >
          Schedule a free consultation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}