"use client";

import { motion, useReducedMotion } from "framer-motion";

const companies = ["Oak Chips Inc", "ADG", "Amble", "Marbella Interests"];

export default function TrustedBy() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="border-y [border-color:var(--spr-border,#23314f)] bg-[color:var(--spr-bg-strong,#040712)]"
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="spr-container py-6">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--spr-text-muted,#9fadc8)]">
          Trusted by teams at
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium tracking-[0.18em] text-[color:var(--spr-text-muted,#9fadc8)] sm:text-sm">
          {companies.map((company, index) => (
            <motion.span
              key={company}
              initial={reduceMotion ? undefined : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
            >
              {company}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
