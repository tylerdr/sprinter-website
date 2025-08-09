"use client";

import DocumentIntelligence from "@/components/labs/DocumentIntelligence";
import { LabWrapper } from "@/components/labs/lab-wrapper";

export function DocumentIntelligenceClient() {
  const howItWorks = (
    <>
      <h3>How Document Intelligence Works</h3>
      <p>
        Our Document Intelligence system uses advanced AI to extract, analyze, and understand
        information from PDFs, contracts, reports, and other documents. Upload any document
        to see instant insights and structured data extraction.
      </p>
      <h4>Key Capabilities</h4>
      <ul>
        <li><strong>Smart Extraction:</strong> Automatically identifies and extracts key information</li>
        <li><strong>Contextual Understanding:</strong> Understands document structure and relationships</li>
        <li><strong>Multi-format Support:</strong> Works with PDFs, images, and scanned documents</li>
        <li><strong>Instant Insights:</strong> Generates summaries and answers questions about content</li>
      </ul>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Contract Analysis</h4>
        <p className="text-sm text-muted-foreground">
          Extract key terms, dates, parties, and obligations from legal contracts
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Invoice Processing</h4>
        <p className="text-sm text-muted-foreground">
          Automatically extract line items, totals, and vendor information
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Research Papers</h4>
        <p className="text-sm text-muted-foreground">
          Summarize findings, extract citations, and identify key insights
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technical Architecture</h3>
      <ul className="space-y-2 text-sm">
        <li>• OCR with 99.5% accuracy for scanned documents</li>
        <li>• GPT-4 Vision for complex layouts and tables</li>
        <li>• Vector embeddings for semantic search</li>
        <li>• Real-time processing (typically under 5 seconds)</li>
        <li>• Secure document handling with automatic deletion</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="Document Intelligence"
      description="Extract insights from any document instantly"
      slug="document-intelligence"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Process thousands of documents with AI"
    >
      <DocumentIntelligence />
    </LabWrapper>
  );
}