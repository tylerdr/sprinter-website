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
    <AnimatedSection
      id="hero"
      className="relative overflow-hidden border-b [border-color:var(--spr-border)]"
      delay={0.05}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(106,167,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(106,167,255,0.18) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  backgroundPosition: ["0px 0px", "52px 52px"],
                }
          }
          transition={{ repeat: Infinity, duration: 11, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(106,167,255,0.25),transparent_42%),radial-gradient(circle_at_86%_0%,rgba(255,171,102,0.18),transparent_45%),radial-gradient(circle_at_52%_100%,rgba(43,109,255,0.16),transparent_52%)]" />
        <div className="absolute inset-0 bg-[url('/images/sprinter-ai/geometric-glow.svg')] bg-cover bg-center opacity-45" />

        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute h-1.5 w-1.5 rounded-full bg-[color:var(--spr-primary)]"
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

      <div className="spr-container relative flex min-h-[84vh] flex-col justify-center py-24">
        <motion.p
          className="spr-chip mb-6 w-fit"
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          AI Agents Running in Production Today
        </motion.p>
        <motion.h1
          className="spr-heading-xl max-w-4xl"
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        >
          AI agents that run your operations 24/7.
        </motion.h1>
        <motion.p
          className="spr-body-lg mt-6 max-w-3xl"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        >
          We deploy AI agent systems that handle quoting, invoicing, follow-ups, reporting, and data entry — so your team focuses on what actually matters. Working systems in weeks, not months.
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
            className="spr-button spr-button-primary"
          >
            Book a Strategy Call — Free, 30 min
          </a>
          <a href="#how-it-works" className="spr-button spr-button-secondary">
            See How It Works ↓
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
