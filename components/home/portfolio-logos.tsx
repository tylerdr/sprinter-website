"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Building2 } from "lucide-react";

const portfolioCompanies = [
  { name: "DataFlow Systems", industry: "Software", growth: "+45% YoY" },
  { name: "HealthVital", industry: "Healthcare", growth: "+32% YoY" },
  { name: "RetailMax", industry: "Consumer", growth: "+28% YoY" },
  { name: "CloudScale", industry: "SaaS", growth: "+62% YoY" },
  { name: "FinTech Pro", industry: "Financial Services", growth: "+38% YoY" },
  { name: "LogiChain", industry: "Logistics", growth: "+41% YoY" },
  { name: "MedDevice Co", industry: "Medical Devices", growth: "+35% YoY" },
  { name: "EnergyGrid", industry: "Energy", growth: "+29% YoY" },
];

export function PortfolioLogos() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Building2 className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              Portfolio Success Stories
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Transformed Portfolio Companies
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We've helped PE-backed companies across industries achieve remarkable growth through AI implementation
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {portfolioCompanies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                {/* Placeholder for logo - in production, use actual logos */}
                <div className="h-12 mb-4 flex items-center justify-center">
                  <div className="text-2xl font-bold text-muted-foreground/50 group-hover:text-green-500 transition-colors">
                    {company.name.split(' ')[0]}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="font-semibold text-sm mb-1">{company.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">{company.industry}</div>
                  <div className="text-xs font-bold text-green-500">{company.growth}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-2xl p-8 border border-border/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">127</div>
              <div className="text-sm text-muted-foreground">Portfolio Companies Transformed</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">$2.3B</div>
              <div className="text-sm text-muted-foreground">Total Value Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">35%</div>
              <div className="text-sm text-muted-foreground">Avg. EBITDA Improvement</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">6mo</div>
              <div className="text-sm text-muted-foreground">Avg. Time to Value</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}