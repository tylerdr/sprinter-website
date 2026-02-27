"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "@/components/sprinter-ai/AnimatedSection";

const particles = Array.from({ length: 28 }, (_, index) => {
  const x = (index * 37) % 100;
  const y = (index * 19) % 100;
  return {
    id: index,
    left: `${x}%`,
    top: `${y}%`,
    duration: 6 + (index % 5),
    delay: (index % 6) * 0.25,
  };
});

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection id="hero" className="relative overflow-hidden border-b border-white/10" delay={0.05}>
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(59,130,246,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.18) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  backgroundPosition: ["0px 0px", "48px 48px"],
                }
          }
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(249,115,22,0.14),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.12),transparent_50%)]" />

        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
            style={{ left: particle.left, top: particle.top }}
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [-5, 6, -5],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.9, 1.2, 0.9],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-[84vh] w-full max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.p
          className="mb-5 text-sm uppercase tracking-[0.2em] text-[#A1A1AA]"
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          Sprinter Consulting AI Services
        </motion.p>
        <motion.h1
          className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#FAFAFA] sm:text-5xl lg:text-6xl"
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        >
          Your team, amplified.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-3xl text-lg leading-relaxed text-[#A1A1AA] sm:text-xl"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        >
          AI agents that work your business 24/7. Built by someone who's been in your industry — not a vendor who Googled it last week.
        </motion.p>
        <motion.div
          className="mt-9 flex flex-col gap-4 sm:flex-row"
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        >
          <a
            href="https://cal.com/tyler-dreher"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#fb923c]"
          >
            Book a Strategy Call
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-full border border-[#3B82F6]/60 px-6 py-3 text-sm font-semibold text-[#FAFAFA] transition hover:border-[#3B82F6] hover:text-[#3B82F6]"
          >
            See How It Works ↓
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
