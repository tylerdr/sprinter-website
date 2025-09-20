"use client";

import Link from "next/link";
import { CometCard } from "@/components/ui/comet-card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LabCardProps {
  lab: {
    icon: any;
    title: string;
    description: string;
    href: string;
    gradient: string;
    category: string;
    actionVerb: string;
    featured?: boolean;
    requiresAuth?: boolean;
    comingSoon?: boolean;
  };
  index: number;
}

export function LabCardEnhanced({ lab, index }: LabCardProps) {
  if (lab.featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <CometCard className="h-full">
          <Link
            href={lab.comingSoon ? "#" : lab.href}
            className={cn(
              "block h-full p-6 rounded-2xl border transition-all duration-300",
              "bg-gradient-to-br",
              lab.gradient,
              "border-white/10 hover:border-white/20",
              lab.comingSoon && "cursor-not-allowed opacity-60"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <lab.icon className="w-6 h-6 text-white" />
              </div>
              {lab.featured && (
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                  Featured
                </span>
              )}
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">
              {lab.title}
            </h3>

            <p className="text-white/80 text-sm mb-4 line-clamp-2">
              {lab.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm font-medium">
                {lab.actionVerb} →
              </span>
              {lab.requiresAuth && (
                <span className="text-xs text-white/40">Auth Required</span>
              )}
            </div>
          </Link>
        </CometCard>
      </motion.div>
    );
  }

  // Regular card without Comet effect
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={lab.comingSoon ? "#" : lab.href}
        className={cn(
          "block h-full p-6 rounded-xl border transition-all duration-300",
          "bg-card hover:bg-card/80",
          "border-border hover:border-primary/50",
          "group",
          lab.comingSoon && "cursor-not-allowed opacity-60"
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "p-3 rounded-xl transition-colors",
            "bg-gradient-to-br",
            lab.gradient,
            "opacity-10 group-hover:opacity-20"
          )}>
            <lab.icon className="w-6 h-6 text-foreground" />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {lab.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {lab.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
            {lab.actionVerb} →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}