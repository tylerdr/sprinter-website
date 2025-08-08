"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  HeartHandshake, 
  Factory, 
  Banknote, 
  Truck, 
  Rocket, 
  Stethoscope,
  TrendingUp
} from "lucide-react";

const industries = [
  {
    icon: Stethoscope,
    name: "Healthcare",
    description: "Systems & providers modernizing patient care",
    gradient: "from-red-500 to-pink-600",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description: "Leaders optimizing operations & supply chains",
    gradient: "from-orange-500 to-yellow-600",
  },
  {
    icon: Banknote,
    name: "Financial Services",
    description: "Banks & fintech automating complex processes",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Truck,
    name: "Logistics",
    description: "Companies revolutionizing freight & delivery",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Rocket,
    name: "Technology",
    description: "Startups building AI-first products",
    gradient: "from-purple-500 to-violet-600",
  },
];

const companyTypes = [
  {
    icon: Building2,
    title: "Fortune 500 Companies",
    description: "Global corporations transforming at scale with AI automation and intelligent systems",
    examples: ["Enterprise Scale", "Multi-National"],
  },
  {
    icon: TrendingUp,
    title: "Series A-C Startups",
    description: "Fast-moving companies building AI-native products from day one",
    examples: ["VC-Backed", "High Growth"],
  },
  {
    icon: HeartHandshake,
    title: "Healthcare Systems",
    description: "Hospitals and health networks improving patient outcomes with AI",
    examples: ["Hospital Networks", "Health Tech"],
  },
  {
    icon: Factory,
    title: "Manufacturing Leaders",
    description: "Industrial giants optimizing operations and supply chains",
    examples: ["Industrial IoT", "Smart Factories"],
  },
];

export function WhoWeWorkWith() {
  return (
    <section
      className="py-12 sm:py-16 md:py-24 relative"
      aria-labelledby="who-we-work-with-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
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
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
            Forward-thinking companies across industries are building their unfair advantage with AI. 
            From Fortune 500 enterprises to fast-growing startups.
          </p>
        </motion.div>

        {/* Industries Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
            Industries We Serve
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className="h-full p-4 sm:p-6 rounded-2xl bg-card/5 border border-border/10 backdrop-blur-sm hover:bg-card/10 transition-all hover:scale-105 text-center">
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${industry.gradient} mb-4`}
                    aria-hidden="true"
                  >
                    <industry.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2">
                    {industry.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Types Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
            Company Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {companyTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-card/5 border border-border/10 backdrop-blur-sm hover:bg-card/10 transition-all hover:scale-[1.02]">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-brand/20 to-brand/10 group-hover:scale-110 transition-transform duration-300">
                      <type.icon className="w-6 h-6 text-brand" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-all">
                        {type.title}
                      </h4>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {type.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((example) => (
                          <span
                            key={example}
                            className="px-3 py-1 text-xs font-medium bg-brand/10 text-brand rounded-full border border-brand/20"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/5 to-purple/5 backdrop-blur-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Build Your <span className="gradient-text">Unfair Advantage</span>?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join leading companies that are using AI to free their teams for higher-value work 
              while driving unprecedented growth and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-brand to-purple text-primary-foreground font-medium rounded-lg hover:from-brand/90 hover:to-purple/90 transition-all touch-manipulation min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-background"
              >
                Start Your AI Journey
              </motion.a>
              <motion.a
                href="/case-studies"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-card/10 backdrop-blur-sm text-foreground font-medium rounded-lg border border-border/20 hover:bg-card/20 transition-all touch-manipulation min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-background"
              >
                View Success Stories
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}