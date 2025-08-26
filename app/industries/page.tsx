import { Metadata } from 'next';
import Link from 'next/link';
import { INDUSTRIES } from '@/lib/pseo/config/industries';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Solutions by Industry | Sprinter AI',
  description: 'Specialized AI consulting and solutions for every industry. Transform your business with industry-specific AI strategies and proven ROI.',
  keywords: 'AI by industry, industry AI solutions, vertical AI, sector-specific AI, enterprise AI',
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              AI Solutions by Industry
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Every industry has unique challenges. We deliver tailored AI solutions that drive real results for your specific sector.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group relative overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{industry.name}</h3>
                  <p className="text-muted-foreground mb-6">
                    {industry.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-semibold">{industry.metrics.avgROI} ROI</span>
                      <span className="text-muted-foreground">• {industry.metrics.timeToValue}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                        Key Solutions:
                      </p>
                      <ul className="text-sm space-y-1">
                        {industry.solutions.slice(0, 3).map((solution, index) => (
                          <li key={index} className="text-muted-foreground">
                            • {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't See Your Industry?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We work with businesses across all sectors. Let's discuss how AI can transform your specific industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-brand-gradient hover:opacity-90" asChild>
                <Link href="/contact">
                  Contact Our Experts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/ai-assessment">Get Free Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}