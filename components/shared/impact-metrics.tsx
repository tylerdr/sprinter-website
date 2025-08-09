"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Metric {
  value: string;
  label: string;
  color?: string;
  suffix?: string;
  prefix?: string;
}

interface ImpactMetricsProps {
  metrics?: Metric[];
  variant?: "hero" | "card" | "inline";
  showAnimation?: boolean;
  className?: string;
}

const defaultMetrics: Metric[] = [
  {
    value: "100",
    suffix: "K+",
    label: "Hours Reclaimed",
    color: "gradient-text"
  },
  {
    value: "50",
    suffix: "+",
    label: "Jobs Created", 
    color: "gradient-text"
  },
  {
    value: "10",
    label: "Days to Ship",
    color: "gradient-text"
  }
];

function AnimatedNumber({ 
  value, 
  duration = 2,
  delay = 0 
}: { 
  value: number; 
  duration?: number;
  delay?: number;
}) {
  const [displayValue, setDisplayValue] = useState<number>(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Check for reduced motion preference
  const prefersReducedMotion = useRef<boolean>(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    // If reduced motion is preferred, show final value immediately
    if (prefersReducedMotion.current) {
      setDisplayValue(value);
      setHasAnimated(true);
      return;
    }

    const startTime = Date.now() + delay * 1000;
    const endValue = value;
    const startValue = Math.floor(value * 0.5); // Start from 50% of final value

    const updateNumber = () => {
      const now = Date.now();
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + easedProgress * (endValue - startValue));
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        setHasAnimated(true);
      }
    };

    // Start animation after delay
    if (delay === 0) {
      setDisplayValue(startValue);
      requestAnimationFrame(updateNumber);
    } else {
      setTimeout(() => {
        setDisplayValue(startValue);
        requestAnimationFrame(updateNumber);
      }, delay * 1000);
    }
  }, [isInView, value, duration, delay, hasAnimated]);

  return <span ref={ref}>{displayValue}</span>;
}

export function ImpactMetrics({
  metrics = defaultMetrics,
  variant = "hero",
  showAnimation = true,
  className = ""
}: ImpactMetricsProps) {
  const containerClasses = {
    hero: "grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto",
    card: "grid grid-cols-3 gap-6",
    inline: "flex flex-wrap gap-8 justify-center"
  };

  const metricClasses = {
    hero: "text-center",
    card: "text-center",
    inline: "text-center"
  };

  const valueClasses = {
    hero: "text-2xl sm:text-3xl font-semibold tabular-nums",
    card: "text-3xl font-semibold mb-2 tabular-nums",
    inline: "text-2xl font-semibold tabular-nums"
  };

  const labelClasses = {
    hero: "text-xs sm:text-sm text-muted-foreground mt-1 leading-tight",
    card: "text-sm text-muted-foreground",
    inline: "text-sm text-muted-foreground mt-1"
  };

  return (
    <motion.div
      initial={showAnimation ? { opacity: 0 } : undefined}
      animate={showAnimation ? { opacity: 1 } : undefined}
      transition={{ delay: 0.8, duration: 1 }}
      className={`${containerClasses[variant]} ${className}`}
      role="group"
      aria-label="Company impact metrics"
    >
      {metrics.map((metric, index) => {
        const numericValue = parseFloat(metric.value);
        const isNumeric = !isNaN(numericValue);

        return (
          <motion.div
            key={metric.label}
            initial={showAnimation ? { opacity: 0, y: 20 } : undefined}
            animate={showAnimation ? { opacity: 1, y: 0 } : undefined}
            transition={showAnimation ? { delay: 0.8 + index * 0.1 } : undefined}
            className={metricClasses[variant]}
          >
            <div 
              className={`${valueClasses[variant]} ${metric.color || "gradient-text"}`}
              aria-label={`${metric.prefix || ""}${metric.value}${metric.suffix || ""}`}
            >
              {metric.prefix}
              {showAnimation && isNumeric ? (
                <>
                  <AnimatedNumber 
                    value={numericValue} 
                    duration={1.5}
                    delay={0.8 + index * 0.1}
                  />
                  {metric.suffix}
                </>
              ) : (
                <>
                  {metric.value}
                  {metric.suffix}
                </>
              )}
            </div>
            <div className={labelClasses[variant]}>
              {metric.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}