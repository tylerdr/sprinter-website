"use client";

import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";

export default function Guarantee() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="px-6 py-16 lg:px-8"
      initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-[color:var(--spr-border,#23314f)] bg-[color:var(--spr-surface,#0f1b33)] p-8 text-center shadow-[var(--spr-shadow-soft,0_12px_30px_rgba(1,4,14,0.35))] sm:p-10">
        <ShieldCheckIcon className="mx-auto mb-5 h-12 w-12 text-[color:var(--spr-primary,#6aa7ff)]" />
        <h2 className="text-3xl font-bold tracking-tight text-[color:var(--spr-text,#f4f8ff)]">
          The Sprinter Guarantee
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[color:var(--spr-text-muted,#9fadc8)] sm:text-lg">
          We identify $200K+ in automation value during your Sprint — or you pay nothing. For ongoing engagements, if you do not see measurable ROI within 90 days, we work for free until you do.
        </p>
      </div>
    </motion.section>
  );
}
