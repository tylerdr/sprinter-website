"use client";

import { useState } from "react";
import { Upload, FileSpreadsheet, BarChart3, TrendingUp, AlertCircle } from "lucide-react";

interface AnalysisResult {
  summary: string;
  insights: string[];
  recommendations: string[];
}

export default function DataAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysis(null);
    }
  };

  const analyzeData = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results
    const mockAnalysis: AnalysisResult = {
      summary: `Analyzed ${file.name} (${(file.size / 1024).toFixed(1)}KB) containing sales data with 1,247 records across 8 columns. Detected strong seasonal patterns and growth trends.`,
      insights: [
        "Revenue increased by 34% compared to last quarter",
        "Peak sales occur on Fridays and Saturdays (42% of total)",
        "Product category 'Electronics' shows highest profit margins",
        "Customer retention rate is 78% with average LTV of $342",
        "Seasonal demand peaks in Q4 (November-December)"
      ],
      recommendations: [
        "Increase inventory for Electronics category before Q4",
        "Launch weekend-focused marketing campaigns",
        "Implement customer retention program for 22% at-risk segment",
        "Optimize pricing strategy for mid-week sales"
      ]
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysis(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card/20 border border-border/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
        {!file ? (
          <div className="text-center">
            <div className="border-2 border-dashed border-border/20 rounded-xl p-8 sm:p-12 hover:border-brand/30 transition-colors">
              <Upload className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Upload Your Data File
              </h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Support for CSV, Excel (.xlsx, .xls) files up to 10MB
              </p>
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-sm sm:text-base min-h-[44px]">
                <FileSpreadsheet className="w-4 h-4" />
                Choose File
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-8 h-8 text-brand" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">{file.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(1)}KB • {file.type || 'Unknown format'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={resetAnalysis}
                  className="px-4 py-2 text-sm border border-border/20 rounded-lg hover:bg-card/30 transition-colors min-h-[40px]"
                >
                  Change File
                </button>
                <button
                  onClick={analyzeData}
                  disabled={isAnalyzing}
                  className="px-6 py-2 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm min-h-[40px] flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4" />
                      Analyze Data
                    </>
                  )}
                </button>
              </div>
            </div>

            {isAnalyzing && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
                  <span className="text-sm sm:text-base">AI is analyzing your data...</span>
                </div>
                <div className="mt-4 space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <p>🔍 Parsing data structure and types</p>
                  <p>📊 Identifying patterns and trends</p>
                  <p>🎯 Generating insights and recommendations</p>
                </div>
              </div>
            )}

            {analysis && !isAnalyzing && (
              <div className="space-y-6">
                <div className="p-4 sm:p-6 bg-brand-10 border border-brand-30 rounded-xl">
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Data Summary</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {analysis.summary}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-4 sm:p-6 bg-card/20 border border-border/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-sm sm:text-base">Key Insights</h4>
                    </div>
                    <ul className="space-y-3">
                      {analysis.insights.map((insight, index) => (
                        <li key={index} className="flex gap-2 text-sm">
                          <span className="text-green-500 font-bold">•</span>
                          <span className="text-muted-foreground leading-relaxed">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 sm:p-6 bg-card/20 border border-border/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-brand" />
                      <h4 className="font-semibold text-sm sm:text-base">Recommendations</h4>
                    </div>
                    <ul className="space-y-3">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="flex gap-2 text-sm">
                          <span className="text-brand font-bold">•</span>
                          <span className="text-muted-foreground leading-relaxed">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}