"use client";

import { motion, useReducedMotion } from "framer-motion";

const companies = ["Cab-O-Matic / ADG", "MortgageQ", "Oak Chips Inc", "RPM Healthcare"];

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
      <div className="spr-container py-8">
        <div className="flex flex-col items-center gap-5">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--spr-text-muted,#9fadc8)]">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
            {companies.map((company, index) => (
              <motion.span
                key={company}
                className="text-base font-semibold tracking-[0.12em] text-[color:var(--spr-text-soft,#c8d6ec)] sm:text-lg"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
                initial={reduceMotion ? undefined : { opacity: 0 }}
                whileInView={reduceMotion ? undefined : { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
              >
                {company}
              </motion.span>
            ))}
          </div>
          <p className="text-center text-xs text-[color:var(--spr-text-muted,#9fadc8)]">
            4+ production AI systems deployed and running
          </p>
        </div>
      </div>
    </motion.section>
  );
}
