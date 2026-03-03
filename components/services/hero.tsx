"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckIcon, SparklesIcon } from "@heroicons/react/24/outline";

const outcomes = [
  "Document Intelligence that achieves ≥60% touchless processing",
  "End-to-end automation that reduces cycle time by 42%",
  "Custom CoPilots that triple team throughput",
  "AI governance frameworks defensible to LPs"
];

export function ServicesHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="spr-container relative overflow-hidden px-2 py-20 sm:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(106,167,255,0.2),_transparent_62%)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
              <SparklesIcon className="h-4 w-4" />
              <span>AI Services</span>
            </div>
          </div>

          <h1 className="spr-heading-xl">
            AI Services That Actually Ship
          </h1>

          <p className="spr-body-lg mt-6 max-w-3xl mx-auto">
            From strategy to implementation in weeks. We deliver working AI solutions with clear acceptance criteria, measurable KPIs, and governance you can defend.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="spr-card spr-card-tight flex items-start gap-3 p-4 text-left"
              >
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-[color:var(--spr-primary)] mt-0.5" />
                <span className="text-sm text-[color:var(--spr-text-soft)]">{outcome}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="spr-list-dot" aria-hidden />
              <span className="font-medium text-[color:var(--spr-text)]">We Ship, Not Slide</span>
              <span className="text-[color:var(--spr-text-muted)]">Working code in 10 days</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="spr-list-dot" aria-hidden />
              <span className="font-medium text-[color:var(--spr-text)]">Real Engineers</span>
              <span className="text-[color:var(--spr-text-muted)]">Shipped AI since 2018</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="spr-list-dot" aria-hidden />
              <span className="font-medium text-[color:var(--spr-text)]">ROI Focused</span>
              <span className="text-[color:var(--spr-text-muted)]">Every project tied to outcomes</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
