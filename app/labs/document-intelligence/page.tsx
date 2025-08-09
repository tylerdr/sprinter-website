import type { Metadata } from "next";
import { DocumentIntelligenceClient } from "./client";

export const metadata: Metadata = {
  title: "Document Intelligence - AI Document Analysis | Sprinter AI",
  description: "Extract insights from PDFs and documents instantly with AI. Upload contracts, reports, invoices and get structured data extraction and analysis.",
  keywords: "document AI, PDF extraction, document analysis, contract intelligence, OCR AI, document processing",
  openGraph: {
    title: "Document Intelligence - Extract Insights from Any Document",
    description: "AI-powered document analysis that extracts key information, generates summaries, and answers questions about your documents.",
  },
};

export default function DocumentIntelligencePage() {
  return <DocumentIntelligenceClient />;
}