"use client";

import { motion } from "framer-motion";
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

const iconByCategory: Record<string, any> = {
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
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              Insights & Resources
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Practical guides, case studies, and strategies for implementing AI
            in your business. No hype, just results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex justify-between items-center"
                  >
                    <span className="text-sm">{category.name}</span>
                    <span className="text-xs text-gray-500">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30">
                <h4 className="font-semibold mb-3">Get Weekly AI Insights</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Join 5,000+ leaders getting practical AI strategies delivered
                  to their inbox.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm mb-3"
                />
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group p-6 rounded-xl border backdrop-blur-sm transition-all hover:scale-[1.02] ${
                  article.featured
                    ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          article.featured
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        {article.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:gradient-text transition-all">
                      {article.title}
                    </h2>

                    <p className="text-gray-400 mb-4">{article.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
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
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        article.featured
                          ? "bg-gradient-to-br from-blue-500 to-purple-600"
                          : "bg-white/10"
                      }`}
                    >
                      <article.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center py-8"
            >
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors">
                Load More Articles
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/10 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to implement these{" "}
            <span className="gradient-text">strategies</span>?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Don't just read about AI transformation—experience it. Let's discuss
            how these insights apply to your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Schedule a Strategy Call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
