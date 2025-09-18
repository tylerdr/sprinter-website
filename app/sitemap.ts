import { MetadataRoute } from "next"
import { SEO } from "@/lib/constants"
import { articles } from "@/lib/blog-data"
import { caseStudies } from "@/lib/case-studies-data"
import { useCases, industries } from "@/lib/use-cases-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO.siteUrl
  const currentDate = new Date().toISOString()

  // Core pages with high priority
  const coreRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/operating-partner", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/ai-assessment", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/partnership", priority: 0.85, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Solution pages
  const solutionRoutes = [
    { path: "/solutions/ap-automation", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/solutions/quote-intelligence", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/solutions/3pl-ops", priority: 0.85, changeFrequency: "weekly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Industry pages
  const industryMainRoutes = [
    { path: "/industries", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/industries/manufacturing", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/industries/logistics", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/industries/healthcare", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/industries/financial-services", priority: 0.75, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Service pages
  const serviceRoutes = [
    { path: "/services", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/services/discovery", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/services/sprint", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/services/enterprise", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/services/venture", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/ai-sprint", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/ai-partnership", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/pe-services", priority: 0.75, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Resource pages
  const resourceRoutes = [
    { path: "/resources", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/case-studies", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/case-studies/pe", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "daily" as const },
    { path: "/insights", priority: 0.65, changeFrequency: "weekly" as const },
    { path: "/insights/ai-models", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/insights/how-to-win", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/insights/software-3", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/insights/trends", priority: 0.6, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Lab pages (main interactive demos)
  const labRoutes = [
    { path: "/labs", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/labs/opportunity-audit", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/labs/agent-simulator", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/labs/workflow-tool", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/labs/ideation", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/labs/sketch-studio", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/labs/document-intelligence", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/labs/data-analyzer", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/labs/roi-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/labs/ai-assistant", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/labs/agent-playground", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/labs/portfolio-ai-blueprint", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/labs/deal-flow-analyzer", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/labs/industry-blueprint", priority: 0.6, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Additional lab pages (creative and experimental)
  const additionalLabRoutes = [
    { path: "/labs/ad-creator", priority: 0.5 },
    { path: "/labs/agent-battle", priority: 0.5 },
    { path: "/labs/ai-playbook", priority: 0.55 },
    { path: "/labs/ai-telestrations", priority: 0.45 },
    { path: "/labs/cards-against-ai", priority: 0.45 },
    { path: "/labs/code-review", priority: 0.55 },
    { path: "/labs/component-studio", priority: 0.5 },
    { path: "/labs/future-scenarios", priority: 0.5 },
    { path: "/labs/just-hire-ai", priority: 0.5 },
    { path: "/labs/lead-gen-visualizer", priority: 0.55 },
    { path: "/labs/music-studio", priority: 0.45 },
    { path: "/labs/pdf-chat", priority: 0.6 },
    { path: "/labs/pdf-extractor", priority: 0.6 },
    { path: "/labs/pe-tycoon", priority: 0.5 },
    { path: "/labs/quiz-generator", priority: 0.5 },
    { path: "/labs/story-adventure", priority: 0.45 },
    { path: "/labs/storyboarding", priority: 0.55 },
    { path: "/labs/tiny-town", priority: 0.45 },
    { path: "/labs/vibe-coding", priority: 0.5 },
    { path: "/labs/voice-chat", priority: 0.55 },
    { path: "/labs/voice-to-process", priority: 0.55 },
    { path: "/labs/ai-elements-demo", priority: 0.45 },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: "monthly" as const,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Tool pages
  const toolRoutes = [
    { path: "/tools", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/tools/ap-calculator", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/tools/dscr-calculator", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/tools/quote-estimator", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/tools/red-flag-checker", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/tools/specprint-scanner", priority: 0.55, changeFrequency: "monthly" as const },
    { path: "/tools/chat-my-spec", priority: 0.55, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Download pages
  const downloadRoutes = [
    { path: "/downloads/no-api-cookbook", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/downloads/governance-pack", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/downloads/ap-brief", priority: 0.6, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Use case pages
  const useCaseMainRoutes = [
    { path: "/use-cases", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/use-cases/industries", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/use-cases/roles", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/use-cases/mcp-servers", priority: 0.6, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Company and legal pages
  const companyRoutes = [
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/products", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/governance", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Dashboard pages (lower priority, typically behind auth)
  const dashboardRoutes = [
    { path: "/dashboard/portfolio-health", priority: 0.4, changeFrequency: "weekly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: currentDate,
  }))

  // Dynamic blog routes
  const blogRoutes = articles.map((article) => ({
    url: `${base}/blog/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: article.date || currentDate,
  }))

  // Dynamic case study routes
  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${base}/case-studies/${study.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: currentDate,
  }))

  // Dynamic use case routes
  const useCaseRoutes = useCases.map((useCase) => ({
    url: `${base}/use-cases/${useCase.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
    lastModified: currentDate,
  }))

  // Dynamic industry use case routes
  const industryUseCaseRoutes = industries.map((industry) => ({
    url: `${base}/use-cases/industries/${industry.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
    lastModified: currentDate,
  }))

  // Combine all routes
  return [
    ...coreRoutes,
    ...solutionRoutes,
    ...industryMainRoutes,
    ...serviceRoutes,
    ...resourceRoutes,
    ...labRoutes,
    ...additionalLabRoutes,
    ...toolRoutes,
    ...downloadRoutes,
    ...useCaseMainRoutes,
    ...companyRoutes,
    ...dashboardRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
    ...useCaseRoutes,
    ...industryUseCaseRoutes,
  ]
}