import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import DataAnalyzer from "@/components/labs/DataAnalyzer";

export const metadata: Metadata = createSEOMetadata({
  title: "AI Data Analyzer - Upload & Analyze Data | Sprinter AI",
  description:
    "Upload CSV or Excel files and get instant AI-powered insights, visualizations, and predictions. Transform raw data into actionable intelligence.",
  keywords:
    "AI data analysis, CSV analysis, Excel analysis, data insights, data visualization, predictive analytics, AI reporting",
  canonical: `${SEO.siteUrl}/labs/data-analyzer`,
  ogTitle: "AI Data Analyzer - Instant Insights from Your Data",
  ogDescription:
    "Upload your data files and get AI-powered analysis, visualizations, and actionable insights in seconds.",
});

export default function DataAnalyzerPage() {
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-brand-10 border border-brand-30 mb-4 sm:mb-6">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
            <span className="text-xs sm:text-sm font-medium text-brand">
              Interactive Demo
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            AI Data <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Upload your data files and get instant AI-powered insights and
            visualizations
          </p>
        </div>

        <DataAnalyzer />

        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-card/5 border border-border/10">
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            How it works
          </h3>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
            Simply upload your CSV or Excel file and our AI will automatically
            analyze the data structure, identify patterns, generate insights, and
            create visualizations. The AI can detect trends, outliers, correlations,
            and suggest actionable recommendations based on your data.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            In production, Sprinter AI&apos;s data intelligence platform can handle
            massive datasets, connect to databases and APIs, perform real-time
            analysis, and generate automated reports with predictive modeling.
          </p>
        </div>
      </div>
    </div>
  );
}