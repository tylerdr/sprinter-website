"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  TrendingUp,
  FileText,
  Users,
  Download,
  Filter,
  Search,
  Briefcase,
  ChartBar,
  Target,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { peArticles } from "@/lib/pe-blog-data";

const categories = [
  { id: "all", name: "All Insights", icon: BookOpen },
  { id: "Market Research", name: "Market Research", icon: ChartBar },
  { id: "Case Studies", name: "Case Studies", icon: Briefcase },
  { id: "How-To Guides", name: "Implementation Guides", icon: FileText },
  { id: "Value Creation", name: "Value Creation", icon: TrendingUp },
];

const featuredResources = [
  {
    title: "PE AI Readiness Checklist",
    description: "127-point evaluation framework for your firm",
    icon: Target,
    href: "/ai-assessment",
    type: "PDF",
  },
  {
    title: "ROI Calculator",
    description: "Calculate AI impact on your portfolio",
    icon: ChartBar,
    href: "/labs/roi-calculator",
    type: "Interactive",
  },
  {
    title: "DD Automation Toolkit",
    description: "Templates and vendor comparison guide",
    icon: FileText,
    href: "/labs/deal-flow-analyzer",
    type: "Toolkit",
  },
];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = peArticles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="spr-theme spr-page min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Lightbulb className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                PE-Exclusive Insights
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AI Insights for <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Private Equity</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real data, proven strategies, and tactical guides from 100+ PE AI implementations. 
              No theory, just what actually works.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search insights, case studies, guides..."
                className="pl-10 pr-4 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="px-6 py-12 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <Card key={resource.title} className="hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <resource.icon className="w-8 h-8 text-primary" />
                    <Badge variant="secondary">{resource.type}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-3">{resource.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardHeader>
                <CardContent>
                  <Link href={resource.href}>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Access Resource
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Latest Insights</h2>
            <p className="text-sm text-muted-foreground">
              {filteredArticles.length} articles
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              layout
            >
              {filteredArticles.map((article, idx) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.1 }}
                  layout
                  className={`group ${article.featured ? 'lg:col-span-2' : ''}`}
                >
                  <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant={article.featured ? "default" : "secondary"}>
                            {article.category}
                          </Badge>
                          {article.featured && (
                            <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(article.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>

                      <CardTitle className={`${article.featured ? 'text-2xl' : 'text-xl'} group-hover:text-primary transition-colors`}>
                        {article.title}
                      </CardTitle>
                      
                      <p className="text-muted-foreground mt-3">
                        {article.excerpt}
                      </p>

                      {article.author && (
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{article.author.name}</p>
                            <p className="text-xs text-muted-foreground">{article.author.role}</p>
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link href={`/insights/${article.slug}`}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                          Read Full Article
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-purple-600/10">
            <CardContent className="p-12 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-primary mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Stay Ahead of the Curve
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get weekly insights on AI in private equity. Case studies, ROI data, and implementation strategies 
                delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="your@pefirm.com"
                  className="flex-1"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Subscribe
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Join 500+ PE professionals. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-12 lg:px-8 border-t border-border/50">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Implement These Strategies?
          </h3>
          <p className="text-muted-foreground mb-6">
            Don't just read about AI transformation—experience it with a hands-on sprint.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai-assessment">
              <Button size="lg" variant="outline">
                Get Free Assessment
              </Button>
            </Link>
            <Link href="/ai-sprint">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                Book AI Sprint ($10K/week)
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}