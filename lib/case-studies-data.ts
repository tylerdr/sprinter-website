import { z } from "zod"

export const ResultSchema = z.object({ metric: z.string(), label: z.string() })
export const CaseStudySchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  challenge: z.string(),
  solution: z.string(),
  results: z.array(ResultSchema),
  testimonial: z.string(),
  features: z.array(z.string()),
  gradient: z.string(),
})

export type CaseStudy = z.infer<typeof CaseStudySchema>

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-mortgage-assistant",
    title: "MortgageQ – AI Loan Assistant",
    category: "FinTech AI Platform",
    description: "AI-powered loan assistant for Non-QM mortgage professionals",
    challenge: "Mortgage officers spending 4+ hours daily searching through 50+ lender guidelines, losing deals to faster competitors",
    solution: "Built an AI knowledge engine that instantly answers complex loan questions, matches scenarios to lenders in seconds",
    results: [
      { metric: "95%", label: "Reduction in research time" },
      { metric: "300%", label: "Increase in closing speed" },
      { metric: "50+", label: "Lenders integrated" },
      { metric: "$2.4M", label: "Additional revenue enabled" },
    ],
    testimonial: "We've seen our closing time increase by 300%. The AI assistant is like having a senior underwriter available 24/7.",
    features: [
      "Instant answers to complex Non-QM questions",
      "Automated lender matching",
      "Document requirement generation",
      "Real-time guideline updates",
    ],
    gradient: "from-green-500 to-emerald-600",
  },
  {
    slug: "ai-cabinet-automation",
    title: "Cab-O-Matic – AI SKU Translator",
    category: "B2B SaaS",
    description: "AI SKU translator for cabinet dealers",
    challenge: "Cabinet dealers wasting 3+ hours per quote managing spreadsheets across multiple manufacturers",
    solution: "Developed AI that translates one cabinet plan into every manufacturer's SKUs instantly",
    results: [
      { metric: "3x", label: "Productivity increase" },
      { metric: "90%", label: "Error reduction" },
      { metric: "15min", label: "Quote time (was 3 hours)" },
      { metric: "$450K", label: "Annual savings per dealer" },
    ],
    testimonial: "What took hours now takes minutes, and accuracy is perfect.",
    features: [
      "One-click multi-manufacturer quotes",
      "Automatic tax & freight calculation",
      "Real-time pricing updates",
      "Cloud-based collaboration",
    ],
    gradient: "from-blue-500 to-purple-600",
  },
  {
    slug: "ai-patient-coach",
    title: "RPM Healthcare – AI Care Coach",
    category: "Healthcare Tech",
    description: "Autonomous care coach for remote patient monitoring",
    challenge: "Nurses overwhelmed managing 200+ patients, missing critical health events",
    solution: "Created AI care coach that automates check-ins, triages data, and escalates issues",
    results: [
      { metric: "60%", label: "Nurse workload reduction" },
      { metric: "85%", label: "Patient engagement rate" },
      { metric: "40%", label: "Reduction in readmissions" },
      { metric: "5x", label: "Patient coverage increase" },
    ],
    testimonial: "The AI coach handles routine tasks so our nurses can focus on critical care. It's transformative.",
    features: [
      "Automated patient check-ins",
      "Intelligent triage system",
      "Personalized health education",
      "Predictive risk alerts",
    ],
    gradient: "from-red-500 to-pink-600",
  },
  {
    slug: "ai-workshop-platform",
    title: "Amble Innovation – AI Workshop Platform",
    category: "Enterprise Software",
    description: "Digital innovation toolkit for Fortune 500 consultants",
    challenge: "Accenture needed to digitize and scale their innovation workshops globally",
    solution: "Built AI-powered platform for remote workshops with intelligent insight extraction",
    results: [
      { metric: "10x", label: "Workshop efficiency" },
      { metric: "500+", label: "Workshops delivered" },
      { metric: "30%", label: "Better idea quality" },
      { metric: "$1.2M", label: "Consulting revenue enabled" },
    ],
    testimonial: "Amble revolutionized how we run innovation sessions. The AI insights are game-changing.",
    features: [
      "AI-powered insight extraction",
      "Digital war room collaboration",
      "Automated connection mapping",
      "Knowledge base integration",
    ],
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    slug: "ai-content-automation",
    title: "TrueLetter – AI Content Engine",
    category: "Content Automation",
    description: "Scaled content generation for e-commerce",
    challenge: "E-commerce site needed 10,000+ unique product pages for SEO",
    solution: "Built AI pipeline that scrapes, analyzes, and generates SEO-optimized content at scale",
    results: [
      { metric: "10,000+", label: "Pages generated" },
      { metric: "400%", label: "Organic traffic increase" },
      { metric: "98%", label: "Content uniqueness score" },
      { metric: "$3M", label: "Revenue attributed" },
    ],
    testimonial: "The content engine delivered more in 3 months than our team could in 3 years.",
    features: [
      "Automated data scraping",
      "Sentiment analysis",
      "SEO optimization",
      "Comparison table generation",
    ],
    gradient: "from-orange-500 to-yellow-600",
  },
]

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find(cs => cs.slug === slug)
}
