"use client";

import { motion } from "framer-motion";

const trustedBy = [
  "Vero Capital", "Rock Hill Capital", "Beckway", "Wells Fargo", "Accenture", "Broadlume"
];

export function TrustIndicators() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Trusted Partners Logo Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            Trusted by
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {trustedBy.map((partner) => (
              <div
                key={partner}
                className="px-4 py-2 text-muted-foreground/60 font-semibold text-lg hover:text-muted-foreground transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}