import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import {
  industries,
  getUseCasesByIndustry,
  roles,
  aiTools,
} from "@/lib/use-cases-data";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";

export async function generateStaticParams() {
  return industries.map((industry) => ({
    id: industry.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const industry = industries.find((ind) => ind.id === id);

  if (!industry) {
    return createSEOMetadata({
      title: "Industry Not Found",
      description: "The requested industry could not be found.",
      noindex: true,
    });
  }

  const useCases = getUseCasesByIndustry(industry.id);

  return createSEOMetadata({
    title: `AI for ${industry.name} - Use Cases & Implementation`,
    description: `${industry.description} Discover ${useCases.length}+ proven AI use cases with ${industry.averageROI} average ROI.`,
    keywords: `AI for ${industry.name.toLowerCase()}, ${industry.name.toLowerCase()} automation, AI use cases, ${industry.topTools.join(", ").toLowerCase()}, business transformation`,
    canonical: `${SEO.siteUrl}/use-cases/industries/${industry.id}`,
    ogTitle: `Transform ${industry.name} with AI`,
    ogDescription: `${industry.description} See proven implementations with ${industry.averageROI} ROI.`,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const industry = industries.find((ind) => ind.id === id);

  if (!industry) {
    notFound();
  }

  const industryUseCases = getUseCasesByIndustry(industry.id);
  const relatedRoles = roles.filter((role) =>
    role.useCases.some((uc) => industryUseCases.some((iuc) => iuc.id === uc))
  );

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link
            href="/use-cases"
            className="hover:text-white transition-colors"
          >
            Use Cases
          </Link>
          <span>/</span>
          <Link
            href="/use-cases/industries"
            className="hover:text-white transition-colors"
          >
            Industries
          </Link>
          <span>/</span>
          <span className="text-white">{industry.name}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{industry.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                AI for <span className="gradient-text">{industry.name}</span>
              </h1>
              <p className="text-xl text-gray-400">{industry.description}</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-xl border border-success-30 bg-success-10">
              <TrendingUp className="w-5 h-5 text-success mb-2" />
              <div className="text-2xl font-bold text-success">
                {industry.averageROI}
              </div>
              <p className="text-xs text-gray-400">Average ROI</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Briefcase className="w-5 h-5 text-info mb-2" />
              <div className="text-2xl font-bold">
                {industryUseCases.length}
              </div>
              <p className="text-xs text-gray-400">AI Use Cases</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <CheckCircle className="w-5 h-5 text-accent mb-2" />
              <div className="text-2xl font-bold">
                {industry.topTools.length}
              </div>
              <p className="text-xs text-gray-400">Recommended Tools</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Industry Challenges */}
            <section className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-warning" />
                Industry Challenges
              </h2>
              <div className="space-y-3">
                {industry.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2" />
                    <span className="text-gray-300">{challenge}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Use Cases */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">
                AI Solutions for {industry.name}
              </h2>
              <div className="space-y-4">
                {industryUseCases.map((useCase) => (
                  <Link
                    key={useCase.id}
                    href={`/use-cases/${useCase.id}`}
                    className="group block p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all">
                          {useCase.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {useCase.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">
                          {useCase.roi}
                        </span>
                      </div>
                      <div className="text-gray-500">•</div>
                      <span className="text-gray-400">
                        {useCase.timeToValue}
                      </span>
                      <div className="text-gray-500">•</div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          useCase.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-400"
                            : useCase.difficulty === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {useCase.difficulty}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Success Story */}
            <section className="p-6 rounded-xl border border-brand-30 bg-brand-10">
              <h2 className="text-2xl font-semibold mb-4">Success Story</h2>
              <p className="text-gray-300 mb-4">
                A leading {industry.name.toLowerCase()} company implemented our
                AI solutions and achieved:
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">85%</div>
                  <p className="text-xs text-gray-400">Process Automation</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">3x</div>
                  <p className="text-xs text-gray-400">Faster Operations</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">$2M+</div>
                  <p className="text-xs text-gray-400">Annual Savings</p>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Recommended Tools */}
            <section className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">
                Recommended AI Tools
              </h3>
              <div className="space-y-3">
                {industry.topTools.map((toolName) => {
                  const tool = aiTools.find((t) => t.name === toolName);
                  return (
                    <div key={toolName} className="p-3 rounded-lg bg-white/5">
                      <div className="font-medium text-sm mb-1">{toolName}</div>
                      {tool && (
                        <div className="text-xs text-gray-500">
                          {tool.pricing}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Key Roles */}
            <section className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Who Benefits Most</h3>
              <div className="space-y-3">
                {relatedRoles.slice(0, 4).map((role) => (
                  <Link
                    key={role.id}
                    href={`/use-cases/roles/${role.id}`}
                    className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="font-medium text-sm">{role.title}</div>
                    <div className="text-xs text-gray-500">
                      {role.avgTimeSaved} saved
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="p-6 rounded-xl border border-brand-30 bg-brand-10">
              <h3 className="text-lg font-semibold mb-3">
                Transform Your {industry.name} Operations
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Get a custom AI roadmap for your organization.
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Schedule Discovery Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
