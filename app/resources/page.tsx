import { Metadata } from 'next';
import Link from 'next/link';
import { getPageMetadata } from '@/lib/seo';
import { ArrowRight, FileText, Beaker, Calculator, Download, BookOpen } from 'lucide-react';

export const metadata: Metadata = getPageMetadata('resources');

const resources = [
  {
    title: 'Case Studies',
    description: 'Real-world PE portfolio transformations with measurable ROI.',
    href: '/case-studies',
    icon: FileText,
    items: [
      'Vista Portfolio AI Transformation',
      'Thoma Bravo Deal Sourcing',
      'KKR Portfolio Operations'
    ]
  },
  {
    title: 'AI Labs',
    description: 'Interactive demos and tools to test AI capabilities.',
    href: '/labs',
    icon: Beaker,
    items: [
      '50+ interactive demos',
      'Portfolio health dashboards',
      'AI opportunity audits'
    ]
  },
  {
    title: 'Tools & Calculators',
    description: 'Quantify automation ROI and efficiency gains.',
    href: '/tools',
    icon: Calculator,
    items: [
      'ROI Calculator',
      'AP Automation Calculator',
      'DSCR Calculator'
    ]
  },
  {
    title: 'Downloads',
    description: 'Playbooks, templates, and guides for PE firms.',
    href: '/downloads/no-api-cookbook',
    icon: Download,
    items: [
      'No-API Automation Cookbook',
      'Governance Pack',
      'AP Automation Brief'
    ]
  },
  {
    title: 'Insights',
    description: 'Private equity AI analysis and thought leadership.',
    href: '/blog',
    icon: BookOpen,
    items: [
      'Building 50 Production AI Systems',
      '10-Day AI Sprint Guide',
      'Agentic Workflows Guide'
    ]
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            PE AI <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to evaluate, implement, and scale AI across your portfolio.
            From interactive demos to ROI calculators to battle-tested playbooks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {resources.map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="group relative p-6 sm:p-8 rounded-2xl bg-card/20 border border-border/30 backdrop-blur-sm hover:bg-card/30 hover:border-border/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors">
                  <resource.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {resource.description}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {resource.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary/50" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-primary font-semibold">
                Explore {resource.title}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center p-8 rounded-2xl border border-brand-30 bg-brand-10">
          <h3 className="text-2xl font-bold mb-4">
            Ready to see ROI in 45 days?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let&apos;s run a pilot with one portfolio company and prove the value before scaling.
          </p>
          <Link
            href="/ai-assessment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Free Assessment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}