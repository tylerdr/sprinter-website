import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/lib/use-cases-data";
import { getPageMetadata } from "@/lib/seo";
import { 
  Building2, 
  TrendingUp, 
  Clock,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = getPageMetadata("useCases");

export default function IndustriesPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Industries</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Solutions by <span className="gradient-text">Industry</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore how AI transforms operations across different industries
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {industries.map((industry) => (
            <Link
              key={industry.id}
              href={`/use-cases/industries/${industry.id}`}
              className="group"
            >
              <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all h-full">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{industry.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {industry.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">
                      {industry.averageROI}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {industry.useCases.length} use cases available
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore solutions
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Industry-Specific AI Strategy
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/use-cases"
              className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background font-medium rounded-lg hover:bg-card transition-colors"
            >
              Back to All Use Cases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}