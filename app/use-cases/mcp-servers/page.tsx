import type { Metadata } from "next";
import Link from "next/link";
import { mcpServers } from "@/lib/use-cases-data";
import { getPageMetadata } from "@/lib/seo";
import { 
  Server, 
  Code,
  GitBranch,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export const metadata: Metadata = getPageMetadata("useCases");

export default function MCPServersPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Server className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">MCP Servers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Model Context Protocol <span className="gradient-text">Servers</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pre-built integrations and tools to extend AI capabilities
          </p>
        </div>

        {/* MCP Servers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mcpServers.map((server) => (
            <div
              key={server.id}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all h-full flex flex-col"
            >
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold">
                    {server.name}
                  </h3>
                  {server.githubUrl && (
                    <Link
                      href={server.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <GitBranch className="w-4 h-4" />
                    </Link>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {server.description}
                </p>
              </div>
              
              <div className="space-y-3 flex-1">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Capabilities:</p>
                  <div className="flex flex-wrap gap-1">
                    {server.capabilities.slice(0, 3).map((capability, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                      >
                        {capability}
                      </span>
                    ))}
                    {server.capabilities.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
                        +{server.capabilities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Use cases:</p>
                  <p className="text-xs text-muted-foreground">
                    {server.useCases.length} implementations available
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href={server.documentation}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <Code className="w-3 h-3" />
                  View Docs
                </Link>
                {server.githubUrl && (
                  <Link
                    href={server.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 max-w-3xl mx-auto p-6 rounded-xl bg-info-10 border border-info-30">
          <h3 className="text-lg font-semibold mb-3 text-info">What are MCP Servers?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Model Context Protocol (MCP) servers are standardized integrations that allow AI models to interact with external tools and data sources. They provide a consistent interface for connecting AI to databases, APIs, and other services.
          </p>
          <p className="text-sm text-muted-foreground">
            We use MCP servers to extend AI capabilities in our solutions, enabling seamless integration with your existing tools and workflows.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Build Custom MCP Integration
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