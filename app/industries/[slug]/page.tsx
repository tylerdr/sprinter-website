import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDUSTRIES } from '@/lib/pseo/config/industries';
// import { IndustryPageGenerator } from '@/lib/pseo/generators/industry-generator';
import { PageContent } from '@/lib/pseo/generators/base-generator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getIndustryContent(slug: string): Promise<PageContent | null> {
  const industry = INDUSTRIES.find(i => i.slug === slug);
  if (!industry) return null;
  
  // Return static content for now to avoid AI generation at build time
  // In production, this should fetch from pre-generated database
  return {
    title: `AI Solutions for ${industry.name} | Sprinter AI`,
    metaDescription: `Transform your ${industry.name} business with AI. ${industry.metrics.avgROI} average ROI. Expert consulting, rapid implementation, proven results.`,
    h1: `AI Transformation for ${industry.name}`,
    introduction: industry.description,
    sections: [
      {
        title: "Industry Overview",
        content: industry.description,
        subsections: [
          {
            title: "Key Challenges",
            content: `The ${industry.name} industry faces critical challenges that AI can address:`,
            bullets: industry.challenges,
          },
          {
            title: "AI Opportunities",
            content: "Transform these challenges into competitive advantages with our AI solutions:",
            bullets: industry.solutions,
          },
        ],
      },
      {
        title: "Expected ROI",
        content: `Our ${industry.name} clients typically see:`,
        subsections: [
          {
            title: "Financial Impact",
            content: `Average ROI of ${industry.metrics.avgROI} within ${industry.metrics.timeToValue}.`,
            bullets: [
              `${industry.metrics.avgROI} return on investment`,
              `Time to value: ${industry.metrics.timeToValue}`,
              ...Object.entries(industry.metrics)
                .filter(([key]) => key !== 'avgROI' && key !== 'timeToValue')
                .map(([_, value]) => `${value} improvement`),
            ],
          },
        ],
      },
    ],
    keywords: industry.keywords,
    slug: `/industries/${industry.slug}/`,
    canonical: `https://sprinter.ai/industries/${industry.slug}/`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `AI Consulting for ${industry.name}`,
      provider: {
        '@type': 'Organization',
        name: 'Sprinter AI',
      },
      description: `Transform your ${industry.name} business with AI.`,
      areaServed: 'United States',
    },
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const content = await getIndustryContent(resolvedParams.slug);
  
  if (!content) {
    return {
      title: 'Industry Not Found',
    };
  }

  return {
    title: content.title,
    description: content.metaDescription,
    keywords: content.keywords.join(', '),
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      type: 'website',
      url: content.canonical,
    },
    alternates: {
      canonical: content.canonical,
    },
  };
}

export async function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    slug: industry.slug,
  }));
}

export default async function IndustryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const content = await getIndustryContent(resolvedParams.slug);
  
  if (!content) {
    notFound();
  }

  const industry = INDUSTRIES.find(i => i.slug === resolvedParams.slug)!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(content.structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                {content.h1}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {content.introduction}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-brand-gradient hover:opacity-90" asChild>
                  <Link href="/ai-assessment">
                    Get Free Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/case-studies">View Case Studies</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Bar */}
        <section className="py-12 border-y border-border/50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-3xl font-bold">{industry.metrics.avgROI}</span>
                </div>
                <p className="text-muted-foreground">Average ROI</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="text-3xl font-bold">{industry.metrics.timeToValue}</span>
                </div>
                <p className="text-muted-foreground">Time to Value</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                  <span className="text-3xl font-bold">
                    {Object.values(industry.metrics)[2]}
                  </span>
                </div>
                <p className="text-muted-foreground">Key Impact Metric</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              {content.sections.map((section, index) => (
                <div key={index} className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {section.content}
                    </p>
                    
                    {section.subsections?.map((subsection, subIndex) => (
                      <div key={subIndex} className="mb-8">
                        <h3 className="text-xl font-semibold mb-3">{subsection.title}</h3>
                        <p className="text-muted-foreground mb-4">{subsection.content}</p>
                        
                        {subsection.bullets && (
                          <ul className="space-y-3 ml-0">
                            {subsection.bullets.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your {industry.name} Business?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join industry leaders who have already achieved {industry.metrics.avgROI} ROI with our AI solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-brand-gradient hover:opacity-90" asChild>
                  <Link href="/ai-assessment">
                    Get Your Free Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Industries */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Explore Other Industries</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {INDUSTRIES.filter(i => i.slug !== resolvedParams.slug)
                .slice(0, 3)
                .map((relatedIndustry) => (
                  <Link
                    key={relatedIndustry.slug}
                    href={`/industries/${relatedIndustry.slug}`}
                    className="block p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <h3 className="font-semibold mb-2">{relatedIndustry.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {relatedIndustry.description}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}