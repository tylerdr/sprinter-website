import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  TrendingUp,
  Zap,
  CheckCircle,
  Building2,
  Users,
  Cpu,
} from "lucide-react";
import {
  useCases,
  industries,
  roles,
  getRelatedMCPServers,
} from "@/lib/use-cases-data";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";

export async function generateStaticParams() {
  return useCases.map((useCase) => ({
    id: useCase.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const useCase = useCases.find((uc) => uc.id === id);

  if (!useCase) {
    return createSEOMetadata({
      title: "Use Case Not Found",
      description: "The requested use case could not be found.",
      noindex: true,
    });
  }

  const industryNames = useCase.industry
    .map((ind) => industries.find((i) => i.id === ind)?.name)
    .filter(Boolean)
    .join(", ");

  return createSEOMetadata({
    title: `${useCase.title} - AI Implementation Guide`,
    description: `${useCase.description} Expected ROI: ${useCase.roi}. Time to value: ${useCase.timeToValue}.`,
    keywords: `${useCase.title.toLowerCase()}, AI implementation, ${industryNames.toLowerCase()}, ${useCase.tools.join(", ").toLowerCase()}, business automation, AI use case`,
    canonical: `${SEO.siteUrl}/use-cases/${useCase.id}`,
    ogTitle: `${useCase.title} - Proven AI Implementation`,
    ogDescription: `${useCase.description} Get ${useCase.roi} ROI in ${useCase.timeToValue}.`,
  });
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const useCase = useCases.find((uc) => uc.id === id);

  if (!useCase) {
    notFound();
  }

  const relatedMCPServers = getRelatedMCPServers(useCase.id);
  const relatedUseCases = useCases
    .filter(
      (uc) =>
        uc.id !== useCase.id &&
        uc.industry.some((ind) => useCase.industry.includes(ind))
    )
    .slice(0, 3);

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
          <span className="text-white">{useCase.title}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                useCase.difficulty === "Easy"
                  ? "bg-green-500/20 text-green-400"
                  : useCase.difficulty === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
              }`}
            >
              {useCase.difficulty} Implementation
            </span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-400">
              {useCase.implementation}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {useCase.title}
          </h1>

          <p className="text-xl text-gray-400 mb-8">{useCase.description}</p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30">
              <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {useCase.roi}
              </div>
              <p className="text-xs text-gray-400">Expected ROI</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Clock className="w-5 h-5 text-blue-400 mb-2" />
              <div className="text-2xl font-bold">{useCase.timeToValue}</div>
              <p className="text-xs text-gray-400">Time to Value</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Zap className="w-5 h-5 text-yellow-400 mb-2" />
              <div className="text-2xl font-bold">{useCase.implementation}</div>
              <p className="text-xs text-gray-400">Implementation</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <CheckCircle className="w-5 h-5 text-purple-400 mb-2" />
              <div className="text-2xl font-bold">
                {useCase.benefits.length}
              </div>
              <p className="text-xs text-gray-400">Key Benefits</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Benefits */}
            <section className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
              <div className="space-y-3">
                {useCase.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Tools & Technologies */}
            <section className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-2xl font-semibold mb-4">
                Tools & Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {useCase.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* MCP Servers */}
            {relatedMCPServers.length > 0 && (
              <section className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h2 className="text-2xl font-semibold mb-4">
                  MCP Server Integrations
                </h2>
                <div className="space-y-4">
                  {relatedMCPServers.map((server) => (
                    <Link
                      key={server.id}
                      href={`/use-cases/mcp-servers/${server.id}`}
                      className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium">{server.name}</h3>
                        <Cpu className="w-4 h-4 text-gray-500" />
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        {server.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {server.capabilities.slice(0, 3).map((cap) => (
                          <span
                            key={cap}
                            className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-500"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Industries */}
            <section className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-400" />
                Industries
              </h3>
              <div className="space-y-3">
                {useCase.industry.map((ind) => {
                  const industry = industries.find((i) => i.id === ind);
                  if (!industry) return null;
                  return (
                    <Link
                      key={ind}
                      href={`/use-cases/industries/${ind}`}
                      className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{industry.icon}</span>
                        <div>
                          <div className="font-medium text-sm">
                            {industry.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {industry.averageROI}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Roles */}
            <section className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                Who Benefits
              </h3>
              <div className="space-y-3">
                {useCase.roles.map((roleId) => {
                  const role = roles.find((r) => r.id === roleId);
                  if (!role) return null;
                  return (
                    <Link
                      key={roleId}
                      href={`/use-cases/roles/${roleId}`}
                      className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <div className="font-medium text-sm">{role.title}</div>
                      <div className="text-xs text-gray-500">
                        {role.avgTimeSaved} saved
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* CTA */}
            <section className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30">
              <h3 className="text-lg font-semibold mb-3">
                Ready to Implement?
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Get a custom implementation plan for your organization.
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </section>
          </div>
        </div>

        {/* Related Use Cases */}
        {relatedUseCases.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Related Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedUseCases.map((related) => (
                <Link
                  key={related.id}
                  href={`/use-cases/${related.id}`}
                  className="group block p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <h3 className="font-semibold mb-2 group-hover:gradient-text transition-all">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {related.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-green-400">{related.roi}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{related.timeToValue}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
