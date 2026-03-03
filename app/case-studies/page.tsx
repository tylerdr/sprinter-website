import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Bot,
  Zap,
  Brain,
  Building2,
  Heart,
} from "lucide-react";
import { Stat } from "@/components/ui/stat";

import { caseStudies as caseStudyData } from "@/lib/case-studies-data";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("caseStudies");

const iconByCategory: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  "FinTech AI Platform": DollarSign,
  "FinTech": DollarSign,
  "B2B SaaS": Zap,
  "B2B SaaS / Manufacturing": Zap,
  "Healthcare Tech": Users,
  "Healthcare": Heart,
  "Enterprise Software": Brain,
  "Content Automation": Bot,
  "Financial Services": Building2,
  "Healthcare Technology": Heart,
  "Manufacturing / Wine & Spirits": Building2,
};

const caseStudies = caseStudyData.map((c) => ({
  id: c.slug,
  title: c.title,
  category: c.category,
  description: c.description,
  challenge: c.challenge,
  solution: c.solution,
  results: c.results,
  testimonial: c.testimonial,
  testimonialAuthor: c.testimonialAuthor,
  icon: iconByCategory[c.category] ?? Zap,
  gradient: c.gradient,
  features: c.features,
  screenshot: c.screenshot,
  architectureDiagram: c.architectureDiagram,
}));

export default function CaseStudiesPage() {
  return (
    <div className="spr-theme spr-page min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-success-10 border border-success-30 mb-4 sm:mb-6">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
            <span className="text-xs sm:text-sm font-medium text-success">
              Proven Results
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
            Real AI systems in production across manufacturing, fintech,
            healthcare, and more. See how we deploy AI agent systems that
            empower teams and automate operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study) => (
            <article key={study.id} className="group">
              <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm hover:bg-card/40 transition-all">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                  <div className="xl:col-span-2">
                    {/* Screenshot */}
                    <div className="mb-6 rounded-xl overflow-hidden bg-card/30 border border-border/30">
                      <Image
                        src={study.screenshot}
                        alt={`${study.title} screenshot`}
                        width={800}
                        height={400}
                        className="w-full h-48 sm:h-64 object-cover"
                        priority={caseStudies.indexOf(study) < 2}
                      />
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div
                        className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${study.gradient} flex-shrink-0`}
                      >
                        <study.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold mb-1">
                          <Link
                            href={`/case-studies/${study.id}`}
                            className="hover:underline"
                          >
                            {study.title}
                          </Link>
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {study.category}
                        </p>
                      </div>
                    </div>

                    <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                      {study.description}
                    </p>

                    <div className="space-y-4 mb-4 sm:mb-6">
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-destructive mb-2">
                          THE CHALLENGE
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-info mb-2">
                          OUR SOLUTION
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-3">
                        KEY FEATURES
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {study.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-info" />
                            <span className="text-xs sm:text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <blockquote className="p-3 sm:p-4 rounded-lg bg-card/20 border-l-2 border-info">
                      <p className="italic text-muted-foreground text-sm sm:text-base leading-relaxed mb-2">
                        &quot;{study.testimonial}&quot;
                      </p>
                      <cite className="text-xs text-muted-foreground not-italic font-medium">
                        — {study.testimonialAuthor}
                      </cite>
                    </blockquote>
                  </div>

                  <div className="xl:col-span-1 order-first xl:order-last">
                    <div className="xl:sticky xl:top-24">
                      <h3 className="text-xs sm:text-sm font-semibold text-success mb-3 sm:mb-4">
                        RESULTS
                      </h3>
                      <div className="grid grid-cols-2 xl:grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        {study.results.map((result) => (
                          <Stat
                            key={result.label}
                            label={result.label}
                            value={result.metric}
                            className="border-success-30 bg-success-10 text-success"
                          />
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row xl:flex-col gap-3">
                        <Link
                          href={`/case-studies/${study.id}`}
                          className="flex items-center justify-center gap-2 flex-1 px-4 sm:px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
                        >
                          View Details
                        </Link>
                        <Link
                          href="/contact"
                          className="flex items-center justify-center gap-2 flex-1 px-4 sm:px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity touch-manipulation min-h-[44px] text-sm sm:text-base"
                        >
                          Get Similar Results
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-brand-10 border border-brand-30 max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to ship <span className="gradient-text">AI to production</span>?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            Let&apos;s talk about what AI agents can do for your business.
            Start with a $2,500 AI Readiness Sprint — we&apos;ll map your
            operations and show you exactly where AI creates value.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              Start Your AI Transformation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/labs"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              See Live Demos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
