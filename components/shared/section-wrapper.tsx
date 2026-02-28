"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent" | "gradient";
  padding?: "default" | "tight" | "loose";
}

export function SectionWrapper({
  id,
  children,
  className = "",
  variant = "default",
  padding = "default",
}: SectionWrapperProps) {
  const reduceMotion = useReducedMotion();

  const paddingClass =
    padding === "tight" ? "py-12" : padding === "loose" ? "py-24" : "py-16";

  const variantClass =
    variant === "accent"
      ? "border-y [border-color:var(--spr-border)] bg-[color:rgba(12,20,40,0.45)]"
      : variant === "gradient"
        ? "bg-[linear-gradient(180deg,rgba(106,167,255,0.06)_0%,transparent_100%)]"
        : "";

  return (
    <motion.section
      id={id}
      className={`spr-container ${paddingClass} ${variantClass} ${className}`}
      initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
