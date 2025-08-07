import { z } from "zod"

export const ArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: z.string(),
  readTime: z.string(),
  date: z.string(),
  featured: z.boolean().optional().default(false),
  tags: z.array(z.string()).default([]),
  content: z.array(z.object({
    heading: z.string(),
    paragraphs: z.array(z.string())
  }))
})

export type Article = z.infer<typeof ArticleSchema>

export const articles: Article[] = [
  {
    slug: "agentic-workflows-guide",
    title: "The Complete Guide to Agentic Workflows: How AI Agents Transform Business Operations",
    excerpt: "Learn how autonomous AI agents can handle complex tasks in parallel, reducing operational overhead by 95% while improving accuracy.",
    category: "AI Strategy",
    readTime: "8 min read",
    date: "2024-01-15",
    featured: true,
    tags: ["Agentic AI", "Automation", "Enterprise"],
    content: [
      {
        heading: "What are agentic workflows?",
        paragraphs: [
          "Agentic workflows are systems where multiple autonomous agents collaborate to achieve a shared goal.",
          "Each agent is specialized, communicates with others, and operates in parallel to reduce total cycle time."
        ]
      },
      {
        heading: "Where they shine",
        paragraphs: [
          "Research + analysis + planning + QA chains benefit most, as dependencies can be orchestrated and parallelized.",
          "Typical results include 60–95% time reduction and improved consistency."
        ]
      }
    ]
  },
  {
    slug: "roi-calculator-ai",
    title: "Calculate Your AI ROI: A Framework for Measuring AI Impact",
    excerpt: "A practical framework for calculating the real ROI of AI implementations, with case studies showing 300% returns in 60 days.",
    category: "Business Value",
    readTime: "6 min read",
    date: "2024-01-10",
    featured: true,
    tags: ["ROI", "Metrics", "Strategy"],
    content: [
      {
        heading: "Core formula",
        paragraphs: [
          "ROI = (Benefit − Cost) / Cost. For AI, include time saved, error reduction, and revenue enablement.",
          "Track pre/post baselines and attribute impact conservatively."
        ]
      }
    ]
  },
  {
    slug: "ai-vs-automation",
    title: "AI vs Traditional Automation: When to Use Which",
    excerpt: "Understanding the difference between rule-based automation and intelligent AI agents, and how to choose the right approach.",
    category: "Technology",
    readTime: "5 min read",
    date: "2024-01-08",
    tags: ["Technology", "Decision Making"],
    content: [
      {
        heading: "Rules vs intelligence",
        paragraphs: [
          "Use RPA for stable, deterministic tasks. Use AI/agents when tasks require judgment, language, or adaptation."
        ]
      }
    ]
  },
  {
    slug: "building-ai-team",
    title: "Building Your AI Team: Hire, Partner, or Build?",
    excerpt: "Explore the pros and cons of different approaches to building AI capabilities in your organization.",
    category: "Leadership",
    readTime: "7 min read",
    date: "2024-01-05",
    tags: ["Team Building", "Strategy"],
    content: [
      {
        heading: "Three paths",
        paragraphs: [
          "Hiring takes time and leadership focus; partnering accelerates; hybrids often win in practice."
        ]
      }
    ]
  },
  {
    slug: "ai-healthcare-revolution",
    title: "How AI is Revolutionizing Healthcare: 5 Real Examples",
    excerpt: "From patient monitoring to diagnosis assistance, see how AI is transforming healthcare delivery with concrete examples.",
    category: "Case Studies",
    readTime: "10 min read",
    date: "2024-01-03",
    tags: ["Healthcare", "Case Studies"],
    content: [
      {
        heading: "Care coaching",
        paragraphs: [
          "Autonomous follow-ups increase coverage and reduce readmissions, freeing clinicians for higher-value care."
        ]
      }
    ]
  },
  {
    slug: "prompt-engineering-business",
    title: "Prompt Engineering for Business: Getting the Most from AI",
    excerpt: "Master the art of prompt engineering to maximize the value of AI tools in your business operations.",
    category: "How-To",
    readTime: "6 min read",
    date: "2023-12-28",
    tags: ["Tutorial", "Best Practices"],
    content: [
      {
        heading: "Structured prompts",
        paragraphs: [
          "Provide role, goal, constraints, examples, and evaluation criteria for reliable outputs."
        ]
      }
    ]
  }
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}
