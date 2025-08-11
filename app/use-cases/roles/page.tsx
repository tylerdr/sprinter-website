import type { Metadata } from "next";
import Link from "next/link";
import { roles } from "@/lib/use-cases-data";
import { getPageMetadata } from "@/lib/seo";
import { 
  Users, 
  Clock,
  Briefcase,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = getPageMetadata("useCases");

export default function RolesPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Roles</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Solutions by <span className="gradient-text">Role</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how AI can augment your specific role and responsibilities
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {roles.map((role) => (
            <div
              key={role.id}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all h-full"
            >
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{role.department}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {role.description}
                </p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">
                    {role.avgTimeSaved} saved weekly
                  </span>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Top pain points AI solves:</p>
                  <ul className="space-y-1">
                    {role.painPoints.slice(0, 2).map((pain, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Get AI strategy for {role.title}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link
              href="/labs/opportunity-audit"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Your Personalized AI Roadmap
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