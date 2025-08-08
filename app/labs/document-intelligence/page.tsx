import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import DocumentIntelligence from "@/components/labs/DocumentIntelligence";

export const metadata: Metadata = createSEOMetadata({
  title: "Document Intelligence - AI Document Analysis | Sprinter AI",
  description:
    "Upload PDFs, reports, or documents and extract key insights, summaries, and get AI-powered answers to specific questions about the content.",
  keywords:
    "AI document analysis, PDF analysis, document intelligence, content extraction, document summarization, AI reading",
  canonical: `${SEO.siteUrl}/labs/document-intelligence`,
  ogTitle: "Document Intelligence - Extract Insights from Any Document",
  ogDescription:
    "Upload documents and get AI-powered insights, summaries, and answers to questions about the content.",
});

export default function DocumentIntelligencePage() {
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-brand-10 border border-brand-30 mb-4 sm:mb-6">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
            <span className="text-xs sm:text-sm font-medium text-brand">
              Interactive Demo
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Document <span className="gradient-text">Intelligence</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Upload documents and extract key insights, summaries, and get
            AI-powered answers to questions
          </p>
        </div>

        <DocumentIntelligence />

        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-card/5 border border-border/10">
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            How it works
          </h3>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
            Upload any document (PDF, Word, text files) and our AI will analyze
            the content to extract key information, generate summaries, identify
            important entities, and answer specific questions about the document.
            Perfect for processing contracts, reports, research papers, and more.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Sprinter AI&apos;s document intelligence platform can process thousands
            of documents simultaneously, extract structured data, perform
            cross-document analysis, and integrate with your existing document
            management systems for enterprise-scale document processing.
          </p>
        </div>
      </div>
    </div>
  );
}