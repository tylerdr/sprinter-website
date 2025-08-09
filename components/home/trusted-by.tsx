"use client";

import { motion } from "framer-motion";
import { Building2, Award } from "lucide-react";

const trustedClients = [
  { name: "Wells Fargo", type: "Fortune 500 Bank" },
  { name: "Accenture", type: "Global Consulting Leader" },
  { name: "Rock Hill Capital", type: "Private Equity Firm" },
  { name: "Broadlume", type: "Tech Innovation Company" },
  { name: "Vero Capital", type: "Investment Management" },
  { name: "Beckway", type: "Business Advisory" },
];

export function TrustedBy() {
  return (
    <section className="py-12 sm:py-16 relative overflow-hidden border-y border-border/50">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">
              Trusted Partners
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Working with Industry Leaders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From Fortune 500 to high-growth startups, we partner with ambitious teams ready to lead with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {trustedClients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group"
            >
              <div className="p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                <div className="flex flex-col items-center text-center gap-2">
                  <Building2 className="w-8 h-8 text-muted-foreground/50 group-hover:text-primary/70 transition-colors" />
                  <div>
                    <div className="font-semibold text-sm">{client.name}</div>
                    <div className="text-xs text-muted-foreground/70">{client.type}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground/70">
            + Dozens of innovative companies across healthcare, finance, manufacturing, and technology
          </p>
        </motion.div>
      </div>
    </section>
  );
}