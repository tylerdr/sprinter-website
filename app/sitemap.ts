import { MetadataRoute } from "next"
import { SEO } from "@/lib/constants"
import { articles } from "@/lib/blog-data"
import { caseStudies } from "@/lib/case-studies-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO.siteUrl
  const currentDate = new Date().toISOString()

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/ai-sprint", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/fractional-ai-cofounder", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/case-studies", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/labs", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/resources", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  const blogRoutes = articles.map((article) => ({
    url: `${base}/blog/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: article.date || currentDate,
  }))

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${base}/case-studies/${study.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: currentDate,
  }))

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes]
}
