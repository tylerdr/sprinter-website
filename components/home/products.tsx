"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { 
  Bot, 
  ArrowRight,
  CheckCircle,
  Home,
  Building2,
  Lightbulb,
  FileText,
  TrendingUp
} from "lucide-react";

const products = [
  {
    icon: Home,
    title: "MortgageQ.ai",
    description: "AI guideline intelligence for Non-QM lending. Instant, evidence-backed answers with per-lender comparisons.",
    features: ["90% time savings", "Answers in seconds vs hours", "Evidence-backed responses", "Multi-lender comparisons"],
    cta: "Try MortgageQ.ai",
    href: "https://mortgageq.ai",
    gradient: "from-blue-500 to-cyan-600",
    featured: true,
    isExternal: true,
    screenshot: {
      src: "/images/products/mortgageq-screenshot.svg",
      alt: "MortgageQ.ai interface showing AI-powered lending guideline comparisons",
      width: 400,
      height: 300
    }
  },
  {
    icon: Building2,
    title: "Cabomatic.com",
    description: "AI-driven SKU mapping for cabinet manufacturers. Turn one CAD export into multi-manufacturer quotes instantly.",
    features: ["10x faster quoting", "Zero manual SKU matching", "Multi-manufacturer quotes", "CAD export integration"],
    cta: "Visit Cabomatic",
    href: "https://cabomatic.com",
    gradient: "from-purple-500 to-pink-600",
    featured: true,
    isExternal: true,
    screenshot: {
      src: "/images/products/cabomatic-screenshot.svg",
      alt: "Cabomatic interface showing CAD-to-quote AI processing",
      width: 400,
      height: 300
    }
  },
  {
    icon: Lightbulb,
    title: "AmbleIdeation.com",
    description: "AI-powered workshop platform for discovery, clustering and insights. Run collaborative ideation sessions at scale.",
    features: ["100+ ideas per session", "Instant theme extraction", "Collaborative workshops", "AI-driven clustering"],
    cta: "Start Ideating",
    href: "https://ambleideation.com",
    gradient: "from-green-500 to-teal-600",
    featured: true,
    isExternal: true,
    screenshot: {
      src: "/images/products/amble-ideation-screenshot.svg",
      alt: "Amble Ideation workshop interface with AI clustering visualization",
      width: 400,
      height: 300
    }
  },
  {
    icon: FileText,
    title: "AI Document Processing Platform",
    description: "Extract insights from any document type with advanced AI processing and intelligent data extraction.",
    features: ["Multi-format support", "Intelligent extraction", "Real-time processing", "Custom workflows"],
    cta: "Process Documents",
    href: "/contact?product=document-processing",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics Engine",
    description: "Turn historical data into future predictions with advanced machine learning models and forecasting.",
    features: ["Historical data analysis", "Future predictions", "ML-powered insights", "Custom forecasting"],
    cta: "Predict Trends",
    href: "/contact?product=predictive-analytics",
    gradient: "from-yellow-500 to-orange-600",
  },
];

export function Products() {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      aria-labelledby="products-heading"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, color-mix(in oklch, var(--brand-start) 3%, transparent), transparent)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12 md:space-y-16"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-brand-gradient/10 border border-brand-start/20">
              <Bot className="w-4 h-4 text-brand-start" />
              <span className="text-xs sm:text-sm font-semibold text-brand-start">
                Core Products
              </span>
            </div>

            <h2
              id="products-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight"
            >
              <Balancer>
                Live Products. <span className="gradient-text">Real Results.</span>
              </Balancer>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0 font-normal leading-relaxed">
              <Balancer>
                Experience our AI solutions in action. From live SaaS products to custom development services.
              </Balancer>
            </p>
          </div>
        </motion.div>

        {/* Featured Products (Real SaaS Products) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mt-16">
          {products.filter(product => product.featured).map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-full"
            >
              <div
                className="group block p-6 sm:p-8 rounded-2xl bg-card/5 border backdrop-blur-sm hover:bg-card/10 transition-all hover:scale-105 touch-manipulation h-full relative border-brand-start/30 bg-brand-gradient/5"
              >
                <div className="absolute -top-3 left-6">
                  <div className="px-3 py-1 bg-brand-gradient text-primary-foreground text-xs font-semibold rounded-full">
                    Live Product
                  </div>
                </div>

                <div className="flex flex-col h-full">
                  {/* Product screenshot */}
                  {product.screenshot && (
                    <div className="mb-6 overflow-hidden rounded-lg border border-border/10">
                      <Image
                        src={product.screenshot.src}
                        alt={product.screenshot.alt}
                        width={product.screenshot.width}
                        height={product.screenshot.height}
                        className="w-full h-auto transition-transform hover:scale-105"
                        priority
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${product.gradient} flex-shrink-0`}
                      aria-hidden="true"
                    >
                      <product.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:gradient-text transition-all tracking-tight leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm sm:text-base font-normal leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 mb-6">
                    <ul className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={product.href}
                      {...(product.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 font-medium rounded-lg transition-all touch-manipulation min-h-[44px] text-sm sm:text-base w-full justify-center bg-brand-gradient text-primary-foreground hover:opacity-90"
                    >
                      {product.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mt-16"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
            <Balancer>
              Custom <span className="gradient-text">AI Solutions</span>
            </Balancer>
          </h3>
          <p className="text-muted-foreground font-normal leading-relaxed">
            <Balancer>
              Tailored AI platforms and services for your unique business needs.
            </Balancer>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mt-8">
          {products.filter(product => !product.featured).map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 3) * 0.1, duration: 0.5 }}
              className="w-full"
            >
              <div className="group block p-6 sm:p-8 rounded-2xl bg-card/5 border backdrop-blur-sm hover:bg-card/10 transition-all hover:scale-105 touch-manipulation h-full relative border-border/10">
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${product.gradient} flex-shrink-0`}
                      aria-hidden="true"
                    >
                      <product.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:gradient-text transition-all tracking-tight leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm sm:text-base font-normal leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 mb-6">
                    <ul className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={product.href}
                      {...(product.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 font-medium rounded-lg transition-all touch-manipulation min-h-[44px] text-sm sm:text-base w-full justify-center bg-card/20 text-foreground border border-border/20 hover:bg-card/30"
                    >
                      {product.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="p-6 rounded-xl border border-info/30 max-w-2xl mx-auto bg-info/5">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-tight leading-tight">
              <Balancer>
                Not sure which product fits your needs?
              </Balancer>
            </h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base font-normal leading-relaxed">
              <Balancer>
                Schedule a free 30-minute consultation to explore the best AI solution for your business.
              </Balancer>
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-card/10 backdrop-blur-sm text-foreground font-medium rounded-lg border border-border/20 hover:bg-card/20 transition-all touch-manipulation min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
            >
              Get Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}