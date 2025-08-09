"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Building2, 
  Stethoscope,
  Factory,
  TrendingUp
} from "lucide-react";

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

const microStories = [
  {
    icon: Stethoscope,
    result: "5× capacity increase",
    company: "Health Network",
    description: "AI care coach manages routine patient check-ins, freeing doctors for complex cases"
  },
  {
    icon: TrendingUp,
    result: "$2.4M revenue boost",
    company: "FinTech Startup", 
    description: "AI loan assistant processes 300% more applications while improving approval accuracy"
  },
  {
    icon: Factory,
    result: "400% traffic growth",
    company: "E-commerce Platform",
    description: "AI content engine creates 10,000 optimized product pages in 3 months"
  }
];

export function WhoWeWorkWith() {
  return (
    <section
      className="py-12 sm:py-16 md:py-20 relative"
      aria-labelledby="who-we-work-with-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/10 border border-border/20 mb-6">
            <Building2 className="w-5 h-5 text-brand" />
            <span className="text-sm font-medium text-brand">
              Trusted By Industry Leaders
            </span>
          </div>

          <h2
            id="who-we-work-with-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Who We <span className="gradient-text">Work With</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Forward-thinking companies building their unfair advantage with AI.
          </p>
        </motion.div>

        {/* Client Logo Wall */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={logo.slug}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-4 rounded-lg bg-card/5 border border-border/10 text-center hover:bg-card/10 transition-colors group"
              >
                <div className="flex items-center justify-center h-16">
                  <Image
                    src={`/images/clients/${logo.slug}.svg`}
                    alt={`${logo.name} logo`}
                    width={logo.width}
                    height={logo.height}
                    className="filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Micro Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {microStories.map((story, index) => (
              <motion.div
                key={story.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-card/5 border border-border/10 hover:bg-card/10 transition-colors group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-brand/20 to-brand/10 group-hover:scale-110 transition-transform">
                    <story.icon className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-success mb-1">
                      {story.result}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {story.company}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {story.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/5 to-purple/5">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Build Your <span className="gradient-text">Unfair Advantage</span>?
            </h3>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-brand to-purple text-primary-foreground font-medium rounded-lg hover:from-brand/90 hover:to-purple/90 transition-all"
            >
              Start Your AI Journey
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}