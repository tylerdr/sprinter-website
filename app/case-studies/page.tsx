import type { Metadata } from "next";
import Link from "next/link";
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

import { caseStudies as caseStudyData } from "@/lib/case-studies-data";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("caseStudies");

const iconByCategory: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "FinTech AI Platform": DollarSign,
  "B2B SaaS": Zap,
  "Healthcare Tech": Users,
  "Enterprise Software": Brain,
  "Content Automation": Bot,
  "Financial Services": Building2,
  "Healthcare Technology": Heart,
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
  icon: iconByCategory[c.category] ?? Zap,
  gradient: c.gradient,
  features: c.features,
}));

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-4 sm:mb-6">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-green-400">
              Proven Results
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-2 sm:px-0">
            Real AI transformations delivering measurable ROI. See how we&apos;ve
            helped businesses 10x their efficiency and unlock millions in value.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="group"
            >
              <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                  <div className="xl:col-span-2">
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div
                        className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${study.gradient} flex-shrink-0`}
                      >
                        <study.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-xl sm:text-2xl font-bold mb-1">
                          {study.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400">
                          {study.category}
                        </p>
                      </div>
                    </div>

                    <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                      {study.description}
                    </p>

                    <div className="space-y-4 mb-4 sm:mb-6">
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-red-400 mb-2">
                          THE CHALLENGE
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-blue-400 mb-2">
                          OUR SOLUTION
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-500 mb-3">
                        KEY FEATURES
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {study.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-400">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <blockquote className="p-3 sm:p-4 rounded-lg bg-white/5 border-l-2 border-blue-500 italic text-gray-300 text-sm sm:text-base leading-relaxed">
                      &quot;{study.testimonial}&quot;
                    </blockquote>
                  </div>

                  <div className="xl:col-span-1 order-first xl:order-last">
                    <div className="xl:sticky xl:top-24">
                      <h3 className="text-xs sm:text-sm font-semibold text-green-400 mb-3 sm:mb-4">
                        RESULTS
                      </h3>
                      <div className="grid grid-cols-2 xl:grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        {study.results.map((result) => (
                          <div
                            key={result.label}
                            className="p-3 sm:p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20"
                          >
                            <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                              {result.metric}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400">
                              {result.label}
                            </div>
                          </div>
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
                          className="flex items-center justify-center gap-2 flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity touch-manipulation min-h-[44px] text-sm sm:text-base"
                        >
                          Get Similar Results
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/10 max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to become our next{" "}
            <span className="gradient-text">success story</span>?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            Join companies that have transformed their operations with AI. Most
            clients see ROI within 60 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              Start Your AI Transformation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/labs"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              Try Our AI Demos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
