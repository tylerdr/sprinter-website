"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  Database,
  Eye,
  Target,
  CheckCircle2,
  Clock,
  Activity
} from "lucide-react";
import Link from "next/link";
import { DataAnalyzerInput, DataAnalyzerOutput } from "./tool";

interface DataAnalyzerUIProps {
  onAnalyze: (input: DataAnalyzerInput) => Promise<DataAnalyzerOutput>;
}

export function DataAnalyzerUI({ onAnalyze }: DataAnalyzerUIProps) {
  const [dataSource, setDataSource] = useState("CSV");
  const [dataSize, setDataSize] = useState(5000);
  const [businessContext, setBusinessContext] = useState("Sales performance analysis for Q4 revenue optimization");
  const [keyMetrics, setKeyMetrics] = useState("revenue,customer_acquisition,conversion_rate,churn_rate");
  const [timeframe, setTimeframe] = useState("Last 12 months");
  const [compareAgainst, setCompareAgainst] = useState("Industry benchmarks");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");

  const [result, setResult] = useState<DataAnalyzerOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const input: DataAnalyzerInput = {
        dataSource,
        dataSize,
        businessContext,
        keyMetrics: keyMetrics.split(",").map(m => m.trim()).filter(Boolean),
        timeframe,
        compareAgainst: compareAgainst || undefined,
        urgency
      };
      const output = await onAnalyze(input);
      setResult(output);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "upward": return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "downward": return <TrendingDown className="w-5 h-5 text-red-500" />;
      case "volatile": return <Activity className="w-5 h-5 text-yellow-500" />;
      default: return <BarChart3 className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default: return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
              <Database className="w-4 h-4" />
              AI Analysis Platform
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Data Analyzer
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform raw data into actionable business insights with AI-powered analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Source Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="dataSource">Data Source Type</Label>
                    <Select value={dataSource} onValueChange={setDataSource}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSV">CSV File</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                        <SelectItem value="API">API Connection</SelectItem>
                        <SelectItem value="Excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="Google Sheets">Google Sheets</SelectItem>
                        <SelectItem value="Salesforce">Salesforce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dataSize">Data Size (rows)</Label>
                    <Input
                      id="dataSize"
                      type="number"
                      value={dataSize}
                      onChange={(e) => setDataSize(Number(e.target.value))}
                      min="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeframe">Analysis Timeframe</Label>
                    <Select value={timeframe} onValueChange={setTimeframe}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                        <SelectItem value="Last 3 months">Last 3 months</SelectItem>
                        <SelectItem value="Last 6 months">Last 6 months</SelectItem>
                        <SelectItem value="Last 12 months">Last 12 months</SelectItem>
                        <SelectItem value="Year to date">Year to date</SelectItem>
                        <SelectItem value="Custom range">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="urgency">Analysis Priority</Label>
                    <Select value={urgency} onValueChange={(value: "low" | "medium" | "high") => setUrgency(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analysis Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="businessContext">Business Context</Label>
                    <Textarea
                      id="businessContext"
                      value={businessContext}
                      onChange={(e) => setBusinessContext(e.target.value)}
                      placeholder="Describe the business objectives and context for this analysis..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="keyMetrics">Key Metrics (comma-separated)</Label>
                    <Input
                      id="keyMetrics"
                      value={keyMetrics}
                      onChange={(e) => setKeyMetrics(e.target.value)}
                      placeholder="revenue, customers, conversion_rate"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Specify the main metrics to focus on</p>
                  </div>

                  <div>
                    <Label htmlFor="compareAgainst">Compare Against (optional)</Label>
                    <Input
                      id="compareAgainst"
                      value={compareAgainst}
                      onChange={(e) => setCompareAgainst(e.target.value)}
                      placeholder="Industry benchmarks, previous period, etc."
                    />
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    className="w-full"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Analyzing Data..." : "Start AI Analysis"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {result ? (
                <>
                  {/* Analysis Overview */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-blue-500/20 bg-blue-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Data Quality</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">
                              {result.dataQualityScore}%
                            </p>
                            <Progress value={result.dataQualityScore} className="mt-2" />
                          </div>
                          <Database className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-green-500/20 bg-green-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Confidence Score</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                              {result.confidenceScore}%
                            </p>
                            <Progress value={result.confidenceScore} className="mt-2" />
                          </div>
                          <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 bg-purple-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Trend Direction</p>
                            <p className="text-lg font-bold text-purple-600 mt-2 capitalize">
                              {result.trendAnalysis.direction}
                            </p>
                            <p className="text-sm text-purple-600 mt-1">
                              {result.trendAnalysis.strength}% strength
                            </p>
                          </div>
                          {getTrendIcon(result.trendAnalysis.direction)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Key Insights */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Key Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.keyInsights.map((insight, index) => (
                        <Alert key={index} className="border-blue-500/20 bg-blue-500/5">
                          <Target className="h-4 w-4 text-blue-500" />
                          <AlertDescription>
                            <strong>Insight {index + 1}:</strong> {insight}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Trend Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {getTrendIcon(result.trendAnalysis.direction)}
                        Trend Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-4">{result.trendAnalysis.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Direction</p>
                          <p className="text-lg font-semibold capitalize">{result.trendAnalysis.direction}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Strength</p>
                          <p className="text-lg font-semibold">{result.trendAnalysis.strength}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Anomalies */}
                  {result.anomalies.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          Detected Anomalies
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {result.anomalies.map((anomaly, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{anomaly.metric}</h4>
                              <Badge className={getPriorityColor(anomaly.impact)}>
                                {anomaly.impact} impact
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Deviation: {anomaly.deviation}%
                            </p>
                            <p className="text-sm">{anomaly.explanation}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Actionable Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Actionable Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.actionableItems.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{item.action}</h4>
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              <span>{item.expectedImpact}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{item.timeframe}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* AI Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle>AI-Powered Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Predictive Insights */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Predictive Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.predictiveInsights.map((insight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                            <span className="text-sm">{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Risk Factors */}
                  {result.riskFactors.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          Risk Factors
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.riskFactors.map((risk, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                              <span className="text-sm">{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* CTA */}
                  <Card className="border-2 border-purple-500/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-3">
                        <Button className="w-full gap-2" size="lg">
                          <Download className="w-4 h-4" />
                          Download Analysis Report
                        </Button>
                        <Link href="/ai-sprint" className="w-full">
                          <Button variant="outline" className="w-full" size="lg">
                            Start Data Analytics Sprint
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Ready to Analyze</p>
                    <p className="text-muted-foreground">
                      Configure your data source and parameters to start AI-powered analysis
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}