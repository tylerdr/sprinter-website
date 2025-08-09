"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clientLogos = [
  {
    name: "Healthcare Network",
    slug: "healthcare-network",
    width: 120,
    height: 60
  },
  {
    name: "FinTech Startup",
    slug: "fintech-startup",
    width: 120,
    height: 60
  },
  {
    name: "Manufacturing Corp",
    slug: "manufacturing-corp",
    width: 120,
    height: 60
  },
  {
    name: "E-commerce Platform",
    slug: "ecommerce-platform",
    width: 120,
    height: 60
  },
  {
    name: "Logistics Leader",
    slug: "logistics-leader",
    width: 120,
    height: 60
  },
  {
    name: "Tech Innovator",
    slug: "tech-innovator",
    width: 120,
    height: 60
  }
];

export function ClientProofBand() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="mt-12 sm:mt-16"
    >
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground/70 mb-6">
          Trusted by forward-thinking companies
        </p>
      </div>
      
      <div className="relative overflow-hidden">
        <div className="flex gap-8 animate-scroll">
          {/* First set of logos */}
          {clientLogos.map((logo, index) => (
            <motion.div
              key={`${logo.slug}-1`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              className="flex-shrink-0"
            >
              <div className="flex items-center justify-center h-16 px-4 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={`/images/clients/${logo.slug}.svg`}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={logo.height}
                  className="filter grayscale hover:grayscale-0 transition-all duration-300"
                  priority
                />
              </div>
            </motion.div>
          ))}
          
          {/* Duplicate set for seamless scrolling */}
          {clientLogos.map((logo, index) => (
            <motion.div
              key={`${logo.slug}-2`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
              className="flex-shrink-0"
            >
              <div className="flex items-center justify-center h-16 px-4 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={`/images/clients/${logo.slug}.svg`}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={logo.height}
                  className="filter grayscale hover:grayscale-0 transition-all duration-300"
                  priority
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}