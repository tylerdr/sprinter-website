"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const keyPoints = [
  {
    title: "From \"AI done to me\" to \"AI done for me\"",
    description: "Transform fear into excitement by showing how AI makes work enjoyable again.",
  },
  {
    title: "Lunch breaks are back",
    description: "Let computers do the paper, so people do the thinking. Work on what matters.",
  },
  {
    title: "Start where it improves someone's day",
    description: "Begin with one specific use case. Build trust. Then expand.",
  },
];

export function PeopleFirstHero() {
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
              <span>People-First Approach</span>
            </div>
          </div>

          <h1 className="spr-heading-xl">Our People-First Approach to AI</h1>

          <p className="spr-body-lg mt-6 max-w-3xl mx-auto">
            Technology isn&apos;t the hard part — adoption is. We start small with a use case that improves everyday work.
            When employees feel the win, momentum takes care of the rest.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {keyPoints.map((point) => (
              <div key={point.title} className="spr-card p-6 text-center">
                <h3 className="font-semibold text-[color:var(--spr-text)] mb-2">{point.title}</h3>
                <p className="text-sm text-[color:var(--spr-text-muted)]">{point.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="spr-button spr-button-primary">
              Book People-First Workshop
            </Link>
            <Link href="#four-pillars" className="spr-button spr-button-secondary">
              See Our Methodology ↓
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
