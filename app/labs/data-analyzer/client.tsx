"use client";

import DataAnalyzer from "@/components/labs/DataAnalyzer";
import { LabWrapper } from "@/components/labs/lab-wrapper";

export function DataAnalyzerClient() {
  const howItWorks = (
    <>
      <h3>How Data Analyzer Works</h3>
      <p>
        Upload CSV or Excel files and get instant AI-powered analysis. Our system automatically
        detects patterns, generates visualizations, and provides actionable insights from your data.
      </p>
      <h4>Analysis Capabilities</h4>
      <ul>
        <li><strong>Statistical Analysis:</strong> Mean, median, distributions, correlations</li>
        <li><strong>Pattern Detection:</strong> Trends, anomalies, and seasonality</li>
        <li><strong>Predictive Insights:</strong> Forecasting and what-if scenarios</li>
        <li><strong>Natural Language:</strong> Ask questions about your data in plain English</li>
      </ul>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Sales Data Analysis</h4>
        <p className="text-sm text-muted-foreground">
          Identify top performers, seasonal trends, and revenue drivers
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Customer Segmentation</h4>
        <p className="text-sm text-muted-foreground">
          Discover customer clusters and behavior patterns automatically
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Operations Metrics</h4>
        <p className="text-sm text-muted-foreground">
          Analyze efficiency, bottlenecks, and optimization opportunities
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technical Capabilities</h3>
      <ul className="space-y-2 text-sm">
        <li>• Handles files up to 100MB with millions of rows</li>
        <li>• Python pandas for data processing</li>
        <li>• GPT-4 for natural language queries</li>
        <li>• Auto-generated visualizations with Chart.js</li>
        <li>• Export results as PDF or PowerBI-ready format</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="Data Analyzer"
      description="Transform spreadsheets into insights instantly"
      slug="data-analyzer"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Analyze your business data with AI"
    >
      <DataAnalyzer />
    </LabWrapper>
  );
}