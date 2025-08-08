import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Zap,
  Brain,
  Rocket,
} from "lucide-react";

import { articles as articleData } from "@/lib/blog-data";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("blog");

const iconByCategory: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  "AI Strategy": Brain,
  "Business Value": TrendingUp,
  Technology: Zap,
  Leadership: Rocket,
  "Case Studies": Brain,
  "How-To": Zap,
};

const articles = articleData.map((a) => ({
  id: a.slug,
  title: a.title,
  excerpt: a.excerpt,
  category: a.category,
  readTime: a.readTime,
  date: a.date,
  featured: a.featured ?? false,
  icon: iconByCategory[a.category] ?? Zap,
  tags: a.tags,
}));

const counts = articles.reduce<Record<string, number>>((acc, a) => {
  acc[a.category] = (acc[a.category] || 0) + 1;
  return acc;
}, {});

const categories = [
  { name: "All", count: articles.length },
  ...Object.entries(counts).map(([name, count]) => ({ name, count })),
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-brand-10 border border-brand-30 mb-4 sm:mb-6">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
            <span className="text-xs sm:text-sm font-medium text-brand">
              Insights & Resources
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            AI <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-2 sm:px-0">
            Practical guides, case studies, and strategies for implementing AI
            in your business. No hype, just results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-1 order-last lg:order-first">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Categories
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="w-full text-left px-3 sm:px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex justify-between items-center touch-manipulation min-h-[44px]"
                  >
                    <span className="text-xs sm:text-sm">{category.name}</span>
                    <span className="text-xs text-gray-500">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl bg-brand-10 border border-brand-30">
                <h4 className="font-semibold mb-3 text-sm sm:text-base">
                  Stay Updated
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 mb-4 leading-relaxed">
                  AI Insights newsletter coming soon. Get notified when we
                  launch.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-2 bg-brand-gradient text-primary-foreground text-xs sm:text-sm font-medium rounded-lg hover:opacity-90 touch-manipulation min-h-[40px]"
                >
                  Get Notified
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className={`group p-4 sm:p-6 rounded-xl border backdrop-blur-sm transition-all hover:scale-[1.01] ${
                  article.featured
                    ? "bg-brand-10 border-brand-30"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                        <span
                          className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full inline-block w-fit ${
                            article.featured
                              ? "bg-brand-10 text-brand"
                              : "bg-white/10 text-gray-400"
                          }`}
                        >
                          {article.category}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(article.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>

                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 group-hover:gradient-text transition-all leading-tight">
                        {article.title}
                      </h2>

                      <p className="text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/blog/${article.id}`}
                          className="inline-flex items-center gap-2 text-brand hover:opacity-90 font-medium text-sm touch-manipulation py-1"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    <div className="flex-shrink-0 order-first sm:order-last">
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center ${
                          article.featured ? "bg-brand-gradient" : "bg-white/10"
                        }`}
                      >
                        <article.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="text-center py-6 sm:py-8">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base">
                Load More Articles
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center p-6 sm:p-8 rounded-2xl bg-brand-10 border border-brand-30 max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to implement these{" "}
            <span className="gradient-text">strategies</span>?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            Don&apos;t just read about AI transformation—experience it.
            Let&apos;s discuss how these insights apply to your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity touch-manipulation min-h-[44px] text-sm sm:text-base"
          >
            Schedule a Strategy Call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
