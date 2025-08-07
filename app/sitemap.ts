import { MetadataRoute } from "next"
import { SEO } from "@/lib/constants"
import { articles } from "@/lib/blog-data"
import { caseStudies } from "@/lib/case-studies-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO.siteUrl
  const routes = ["/", "/about", "/services", "/use-cases", "/labs", "/case-studies", "/blog", "/contact"].map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.7,
  }))

  const blogRoutes = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const caseRoutes = caseStudies.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...routes, ...blogRoutes, ...caseRoutes]
}
