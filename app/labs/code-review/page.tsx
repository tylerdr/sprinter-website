import type { Metadata } from "next";
import { Code2 } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import CodeReviewAssistant from "@/components/labs/CodeReviewAssistant";

export const metadata: Metadata = createSEOMetadata({
  title: "AI Code Review Assistant - Instant Code Analysis | Sprinter AI",
  description:
    "Paste your code and get AI-powered suggestions for improvements, security fixes, performance optimizations, and best practice recommendations.",
  keywords:
    "AI code review, code analysis, code optimization, security review, best practices, code quality, automated review",
  canonical: `${SEO.siteUrl}/labs/code-review`,
  ogTitle: "AI Code Review Assistant - Improve Your Code Quality",
  ogDescription:
    "Get instant AI-powered code reviews with suggestions for improvements, security fixes, and best practices.",
});

export default function CodeReviewPage() {
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-brand-10 border border-brand-30 mb-4 sm:mb-6">
            <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
            <span className="text-xs sm:text-sm font-medium text-brand">
              Interactive Demo
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            AI Code <span className="gradient-text">Review</span> Assistant
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Paste your code and get instant AI-powered suggestions for improvements
            and best practices
          </p>
        </div>

        <CodeReviewAssistant />

        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-card/5 border border-border/10">
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            How it works
          </h3>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
            Simply paste your code and our AI will analyze it for potential
            improvements, security vulnerabilities, performance optimizations, and
            adherence to best practices. The AI provides specific suggestions with
            explanations and improved code examples.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Sprinter AI&apos;s code intelligence platform can integrate directly
            into your development workflow, providing real-time reviews in your IDE,
            automated pull request analysis, and continuous code quality monitoring
            across your entire codebase.
          </p>
        </div>
      </div>
    </div>
  );
}