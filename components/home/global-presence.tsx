"use client";

import WorldMap from "@/components/ui/world-map";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";

const dots = [
  { start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 37.7749, lng: -122.4194 } }, // NY to SF
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 40.7128, lng: -74.0060 } }, // London to NY
  { start: { lat: 35.6762, lng: 139.6503 }, end: { lat: 37.7749, lng: -122.4194 } }, // Tokyo to SF
  { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: 51.5074, lng: -0.1278 } }, // Paris to London
  { start: { lat: -33.8688, lng: 151.2093 }, end: { lat: 35.6762, lng: 139.6503 } }, // Sydney to Tokyo
  { start: { lat: 1.3521, lng: 103.8198 }, end: { lat: 35.6762, lng: 139.6503 } }, // Singapore to Tokyo
  { start: { lat: 19.0760, lng: 72.8777 }, end: { lat: 1.3521, lng: 103.8198 } }, // Mumbai to Singapore
  { start: { lat: 52.5200, lng: 13.4050 }, end: { lat: 48.8566, lng: 2.3522 } }, // Berlin to Paris
];

export function GlobalPresence() {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <TextGenerateEffect
            words="Global Reach. Local Impact."
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          />
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Portfolio companies across 6 continents leveraging AI to compete globally.
          </p>
        </div>

        <div className="relative h-[600px] w-full max-w-7xl mx-auto">
          <WorldMap dots={dots} />

          {/* Stats overlay */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-border/50"
            >
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Portfolio Companies</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-border/50"
            >
              <div className="text-2xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-border/50"
            >
              <div className="text-2xl font-bold text-primary">$2B+</div>
              <div className="text-sm text-muted-foreground">AUM Enhanced</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}