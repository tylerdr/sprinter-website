import { ServiceEntity } from "@/lib/entities/service-entity";

// Mock repository - replace with Supabase queries
export async function getServiceBySlug(slug: string): Promise<ServiceEntity | null> {
  // In production, fetch from database:
  // const { data } = await supabase
  //   .from('services')
  //   .select('*')
  //   .eq('slug', slug)
  //   .single();

  // For now, return mock data for new services
  const mockServices = getMockServices();
  return mockServices.find(s => s.slug === slug) || null;
}

export async function getAllServices(): Promise<ServiceEntity[]> {
  // In production, fetch from database:
  // const { data } = await supabase
  //   .from('services')
  //   .select('*')
  //   .eq('status', 'active');

  return getMockServices();
}

// Example service entities
function getMockServices(): ServiceEntity[] {
  return [
    {
      id: "lead-generation",
      slug: "lead-generation",
      name: "Lead Generation & Outreach",
      category: "growth",
      status: "active",
      metadata: {
        title: "AI-Powered Lead Generation & Outreach | Sprinter AI",
        description: "10x your pipeline with AI that finds, qualifies, and engages perfect-fit prospects at scale.",
        keywords: ["lead generation", "sales automation", "outbound", "AI prospecting", "B2B sales"]
      },
      hero: {
        badge: {
          text: "Lead Generation",
          icon: "Target"
        },
        headline: {
          text: "Your Pipeline on ",
          highlighted: "Autopilot"
        },
        subheadline: "While sales teams chase cold leads, AI identifies, qualifies, and warms up perfect-fit prospects 24/7. Transform outbound from a numbers game to a precision strike.",
        stats: [
          { value: "10x", label: "More Qualified Leads", color: "text-blue-500" },
          { value: "73%", label: "Response Rate", color: "text-green-500" },
          { value: "$42K", label: "Average Deal Size", color: "text-purple-500" },
          { value: "28 days", label: "Sales Cycle", color: "text-orange-500" }
        ],
        cta: {
          primary: {
            text: "See AI Prospecting Demo",
            action: "demo"
          },
          secondary: {
            text: "Calculate Pipeline Impact",
            href: "/calculators/pipeline"
          }
        }
      },
      challenges: [
        {
          title: "Lead Quality Crisis",
          problem: "80% of leads never convert, wasting rep time",
          solution: "AI pre-qualification ensures only hot leads reach sales",
          outcome: "5x conversion rate improvement",
          icon: "AlertTriangle"
        },
        {
          title: "Personalization at Scale",
          problem: "Generic outreach gets ignored or marked as spam",
          solution: "AI crafts unique messages based on deep research",
          outcome: "73% average response rate",
          icon: "MessageSquare"
        },
        {
          title: "Data Enrichment",
          problem: "Incomplete CRM data limits targeting accuracy",
          solution: "Real-time enrichment from 50+ data sources",
          outcome: "Complete profiles for every prospect",
          icon: "Database"
        },
        {
          title: "Multi-Channel Orchestration",
          problem: "Managing email, LinkedIn, phone is chaos",
          solution: "Unified campaigns across all channels",
          outcome: "3x touchpoint effectiveness",
          icon: "Workflow"
        }
      ],
      capabilities: [
        {
          title: "Ideal Customer Profiling",
          description: "AI learns from your best customers to find more",
          icon: "Brain",
          features: [
            "Firmographic & technographic analysis",
            "Intent signal monitoring",
            "Lookalike modeling",
            "Propensity scoring",
            "Competitive displacement opportunities"
          ]
        },
        {
          title: "Hyper-Personalized Outreach",
          description: "Every message feels hand-written",
          icon: "Mail",
          features: [
            "Deep prospect research automation",
            "Dynamic content generation",
            "Tone and style matching",
            "Multi-variant testing",
            "Optimal send time prediction"
          ]
        },
        {
          title: "Conversation Intelligence",
          description: "AI handles early-stage conversations",
          icon: "MessageCircle",
          features: [
            "Automated follow-ups",
            "Objection handling",
            "Meeting scheduling",
            "Lead nurturing sequences",
            "Handoff orchestration"
          ]
        },
        {
          title: "Performance Analytics",
          description: "Know what's working and double down",
          icon: "BarChart3",
          features: [
            "Campaign attribution",
            "Message performance analysis",
            "Lead scoring optimization",
            "Revenue forecasting",
            "Rep performance insights"
          ]
        }
      ],
      implementation: {
        title: "4 Weeks to Pipeline Transformation",
        description: "From ICP definition to scaled outreach in under a month",
        timeline: [
          {
            phase: "Week 1",
            duration: "Discovery",
            title: "ICP & Messaging",
            activities: [
              "Analyze winning deals",
              "Define ideal customer profile",
              "Craft messaging framework",
              "Set success metrics"
            ],
            milestone: "Targeting locked"
          },
          {
            phase: "Week 2-3",
            duration: "Build",
            title: "Campaign Creation",
            activities: [
              "Build prospect lists",
              "Create outreach sequences",
              "Set up automation",
              "Configure tracking"
            ],
            milestone: "First campaigns live"
          },
          {
            phase: "Week 4",
            duration: "Scale",
            title: "Optimization",
            activities: [
              "A/B test messages",
              "Refine targeting",
              "Scale winning plays",
              "Train sales team"
            ],
            milestone: "Full deployment"
          }
        ]
      },
      metrics: {
        beforeAfter: [
          {
            metric: "Qualified Leads/Month",
            before: "50",
            after: "500+",
            improvement: "10x"
          },
          {
            metric: "Cost per Lead",
            before: "$750",
            after: "$85",
            improvement: "88%"
          },
          {
            metric: "Response Rate",
            before: "2%",
            after: "73%",
            improvement: "36x"
          },
          {
            metric: "Sales Velocity",
            before: "67 days",
            after: "28 days",
            improvement: "58%"
          }
        ],
        financial: {
          headline: "Pipeline Impact",
          stats: [
            { label: "New Pipeline Generated", value: "$4.2M/quarter" },
            { label: "Cost Reduction", value: "75%" },
            { label: "Rep Productivity", value: "3.5x" },
            { label: "Win Rate", value: "+41%" }
          ],
          totalImpact: "$18M",
          impactPeriod: "Annual pipeline value"
        }
      },
      useCases: [
        {
          title: "B2B SaaS Scale-up",
          industry: "Technology",
          challenge: "Needed to 10x outbound without 10x headcount",
          solution: "AI-powered outbound engine",
          results: [
            "Generated 2,500 qualified leads/month",
            "Reduced CAC by 67%",
            "Scaled to Series B with lean sales team"
          ],
          metric: { value: "$8M", label: "New ARR" }
        },
        {
          title: "Professional Services",
          industry: "Consulting",
          challenge: "Partners spending 50% time on BD",
          solution: "Automated opportunity sourcing",
          results: [
            "Partners focused on delivery",
            "3x increase in qualified meetings",
            "Average deal size increased 45%"
          ],
          metric: { value: "200hrs", label: "Saved/month" }
        }
      ],
      testimonials: [
        {
          quote: "We went from 20 meetings a month to 20 meetings a week. Game changer.",
          author: "VP Sales",
          role: "Head of Revenue",
          company: "Series A SaaS",
          metric: "10x meeting volume"
        }
      ],
      cta: {
        headline: "Your Competitors Are Already Using This",
        description: "Every day without AI prospecting is pipeline left on the table. See how much revenue you're missing.",
        buttons: [
          {
            text: "Calculate Your Pipeline Potential",
            href: "/calculators/pipeline",
            variant: "default",
            icon: "Calculator"
          },
          {
            text: "Book Prospecting Audit",
            href: "/contact?service=lead-generation",
            variant: "outline",
            icon: "Calendar"
          }
        ]
      }
    },
    {
      id: "training-content",
      slug: "training-content",
      name: "AI Training & Marketing Content",
      category: "enablement",
      status: "active",
      metadata: {
        title: "AI-Powered Training & Content Creation | Sprinter AI",
        description: "Transform tribal knowledge into scalable training. Generate marketing content that converts. Build the knowledge engine that powers growth.",
        keywords: ["AI training", "content generation", "marketing automation", "knowledge management", "LMS"]
      },
      hero: {
        badge: {
          text: "Training & Content",
          icon: "GraduationCap"
        },
        headline: {
          text: "Knowledge at ",
          highlighted: "Infinite Scale"
        },
        subheadline: "Your best people's expertise trapped in their heads. Your marketing team drowning in content demands. AI transforms both into scalable engines that compound value daily.",
        stats: [
          { value: "90%", label: "Faster Onboarding", color: "text-green-500" },
          { value: "50x", label: "Content Volume", color: "text-blue-500" },
          { value: "$4.2M", label: "Training Savings", color: "text-purple-500" },
          { value: "24/7", label: "Availability", color: "text-orange-500" }
        ],
        cta: {
          primary: {
            text: "See Content AI Demo",
            action: "demo"
          },
          secondary: {
            text: "Training ROI Calculator",
            href: "/calculators/training-roi"
          }
        }
      },
      challenges: [
        {
          title: "Knowledge Bottlenecks",
          problem: "Expertise locked in senior staff heads",
          solution: "AI captures and scales institutional knowledge",
          outcome: "Every employee gets expert guidance",
          icon: "Brain"
        },
        {
          title: "Content Velocity",
          problem: "Can't keep up with content demands",
          solution: "AI generates on-brand content at scale",
          outcome: "50x content output increase",
          icon: "Zap"
        },
        {
          title: "Training Consistency",
          problem: "Every manager trains differently",
          solution: "AI-powered standardized curricula",
          outcome: "100% consistent delivery",
          icon: "Target"
        },
        {
          title: "Engagement Crisis",
          problem: "67% never finish training courses",
          solution: "Personalized, interactive AI tutors",
          outcome: "95% completion rates",
          icon: "TrendingUp"
        }
      ],
      capabilities: [
        {
          title: "Intelligent Knowledge Capture",
          description: "Transform tribal knowledge into organizational assets",
          icon: "Database",
          features: [
            "Expert interview automation",
            "Process documentation generation",
            "Best practice extraction",
            "Continuous knowledge updates",
            "Searchable knowledge base"
          ]
        },
        {
          title: "Adaptive Learning Paths",
          description: "Personalized training that adapts to each learner",
          icon: "Route",
          features: [
            "Skills gap analysis",
            "Custom learning journeys",
            "Real-time progress tracking",
            "Micro-learning modules",
            "Certification management"
          ]
        },
        {
          title: "Content Generation Engine",
          description: "Marketing content that writes itself",
          icon: "FileText",
          features: [
            "Blog posts & articles",
            "Social media campaigns",
            "Email sequences",
            "Sales collateral",
            "Video scripts"
          ],
          badge: "New"
        },
        {
          title: "Performance Analytics",
          description: "Measure impact on business outcomes",
          icon: "BarChart3",
          features: [
            "Learning effectiveness metrics",
            "Content performance tracking",
            "ROI dashboards",
            "Skill development trends",
            "Engagement analytics"
          ]
        }
      ],
      implementation: {
        title: "30 Days to Knowledge Transformation",
        description: "From scattered expertise to scalable intelligence",
        timeline: [
          {
            phase: "Week 1",
            duration: "Audit",
            title: "Knowledge Discovery",
            activities: [
              "Map existing knowledge assets",
              "Identify expertise gaps",
              "Define content priorities",
              "Set learning objectives"
            ]
          },
          {
            phase: "Week 2-3",
            duration: "Build",
            title: "Platform Development",
            activities: [
              "Create knowledge taxonomy",
              "Build training modules",
              "Generate initial content",
              "Configure AI assistants"
            ]
          },
          {
            phase: "Week 4",
            duration: "Deploy",
            title: "Launch & Scale",
            activities: [
              "Pilot with test groups",
              "Gather feedback",
              "Optimize content",
              "Full rollout"
            ]
          }
        ]
      },
      metrics: {
        beforeAfter: [
          {
            metric: "Time to Competency",
            before: "6 months",
            after: "3 weeks",
            improvement: "87%"
          },
          {
            metric: "Content Creation",
            before: "5 pieces/month",
            after: "250 pieces/month",
            improvement: "50x"
          },
          {
            metric: "Training Cost",
            before: "$2,500/employee",
            after: "$150/employee",
            improvement: "94%"
          },
          {
            metric: "Knowledge Retention",
            before: "20%",
            after: "85%",
            improvement: "325%"
          }
        ],
        financial: {
          headline: "Learning & Content ROI",
          stats: [
            { label: "Training Cost Savings", value: "$4.2M/year" },
            { label: "Productivity Gains", value: "32%" },
            { label: "Content Marketing ROI", value: "680%" },
            { label: "Reduced Turnover", value: "45%" }
          ],
          totalImpact: "$12.8M",
          impactPeriod: "Annual value creation"
        }
      },
      useCases: [
        {
          title: "Global Manufacturing",
          industry: "Industrial",
          challenge: "Training 5,000 workers across 12 plants",
          solution: "AI-powered skills development platform",
          results: [
            "Reduced safety incidents by 67%",
            "Cut training time by 80%",
            "Saved $3.2M annually"
          ],
          metric: { value: "45 days", label: "To proficiency" }
        },
        {
          title: "Fast-Growing SaaS",
          industry: "Technology",
          challenge: "Scaling content with 10x growth",
          solution: "AI content generation engine",
          results: [
            "Published 2,000+ pieces in 6 months",
            "Increased organic traffic 450%",
            "Generated $8M pipeline"
          ],
          metric: { value: "50x", label: "Content velocity" }
        }
      ],
      cta: {
        headline: "Turn Knowledge Into Competitive Advantage",
        description: "Every day without AI-powered training and content is expertise walking out the door and pipeline left uncaptured.",
        buttons: [
          {
            text: "Calculate Training ROI",
            href: "/calculators/training",
            variant: "default",
            icon: "Calculator"
          },
          {
            text: "Get Content Audit",
            href: "/contact?service=training-content",
            variant: "outline",
            icon: "FileSearch"
          }
        ]
      }
    }
  ];
}