import { MetadataRoute } from "next"
import { SEO } from "@/lib/constants"
import { articles } from "@/lib/blog-data"
import { caseStudies } from "@/lib/case-studies-data"
import { useCases, industries } from "@/lib/use-cases-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO.siteUrl
  const currentDate = new Date().toISOString()

  // Main pages
  const mainRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/use-cases", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/labs", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/case-studies", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "daily" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Lab demo pages
  const labRoutes = [
    { path: "/labs/agent-simulator", priority: 0.6 },
    { path: "/labs/workflow-tool", priority: 0.6 },
    { path: "/labs/ideation", priority: 0.6 },
    { path: "/labs/sketch-studio", priority: 0.6 },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: "monthly" as const,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Blog routes
  const blogRoutes = articles.map((article) => ({
    url: `${base}/blog/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: article.date || currentDate,
  }))

  // Case study routes
  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${base}/case-studies/${study.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: currentDate,
  }))

  // Use case routes
  const useCaseRoutes = useCases.map((useCase) => ({
    url: `${base}/use-cases/${useCase.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
    lastModified: currentDate,
  }))

  // Industry routes
  const industryRoutes = industries.map((industry) => ({
    url: `${base}/use-cases/industries/${industry.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
    lastModified: currentDate,
  }))

  return [
    ...mainRoutes,
    ...labRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
    ...useCaseRoutes,
    ...industryRoutes,
  ]
}
