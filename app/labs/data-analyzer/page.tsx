import type { Metadata } from "next";
import { DataAnalyzerClient } from "./client";

export const metadata: Metadata = {
  title: "Data Analyzer - AI-Powered Data Analysis | Sprinter AI",
  description: "Upload CSV or Excel files and get instant AI analysis. Discover patterns, trends, and insights from your data with natural language queries.",
  keywords: "data analysis AI, CSV analyzer, Excel AI, data insights, business intelligence, data patterns",
  openGraph: {
    title: "Data Analyzer - Transform Spreadsheets into Insights",
    description: "AI-powered data analysis that finds patterns, generates visualizations, and answers questions about your data.",
  },
};

export default function DataAnalyzerPage() {
  return <DataAnalyzerClient />;
}