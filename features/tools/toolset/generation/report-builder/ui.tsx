"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { FileText, BarChart3, Download, Users, TrendingUp, Target } from "lucide-react";
import Link from "next/link";
import { ReportBuilderInput, ReportBuilderOutput } from "./tool";

interface ReportBuilderUIProps {
  onGenerate: (input: ReportBuilderInput) => Promise<ReportBuilderOutput>;
}

export function ReportBuilderUI({ onGenerate }: ReportBuilderUIProps) {
  const [reportType, setReportType] = useState<"executive" | "financial" | "operational" | "performance" | "custom">("executive");
  const [title, setTitle] = useState("Q4 2024 Executive Performance Report");
  const [period, setPeriod] = useState("Q4 2024");
  const [audience, setAudience] = useState<"executives" | "board" | "investors" | "team" | "public">("executives");
  const [sections, setSections] = useState("Executive Summary,Financial Performance,Operational Metrics,Strategic Initiatives");
  const [insights, setInsights] = useState("Revenue growth,Cost optimization,Market expansion,Customer satisfaction");
  const [recommendations, setRecommendations] = useState("Digital transformation,Process automation,Market expansion,Team development");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeAppendix, setIncludeAppendix] = useState(false);

  const [result, setResult] = useState<ReportBuilderOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const input: ReportBuilderInput = {
        reportType,
        title,
        period,
        audience,
        dataPoints: [
          { metric: "Revenue", value: 2500000, trend: "up", context: "25% increase over previous period" },
          { metric: "Customer Satisfaction", value: 87, trend: "up", context: "Improved by 12 points" },
          { metric: "Operational Efficiency", value: 92, trend: "up", context: "22% improvement through automation" }
        ],
        sections: sections.split(",").map(s => s.trim()).filter(Boolean),
        insights: insights.split(",").map(i => i.trim()).filter(Boolean),
        recommendations: recommendations.split(",").map(r => r.trim()).filter(Boolean),
        includeCharts,
        includeAppendix
      };
      const output = await onGenerate(input);
      setResult(output);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              AI Report Generation
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Report Builder
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create comprehensive executive reports automatically with AI-powered insights and analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="reportType">Report Type</Label>
                    <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="executive">Executive Report</SelectItem>
                        <SelectItem value="financial">Financial Report</SelectItem>
                        <SelectItem value="operational">Operational Report</SelectItem>
                        <SelectItem value="performance">Performance Report</SelectItem>
                        <SelectItem value="custom">Custom Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="title">Report Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Report title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="period">Period</Label>
                      <Input
                        id="period"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        placeholder="Q4 2024"
                      />
                    </div>
                    <div>
                      <Label htmlFor="audience">Audience</Label>
                      <Select value={audience} onValueChange={(value: any) => setAudience(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="executives">Executives</SelectItem>
                          <SelectItem value="board">Board of Directors</SelectItem>
                          <SelectItem value="investors">Investors</SelectItem>
                          <SelectItem value="team">Team</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeCharts">Include Charts</Label>
                      <Switch
                        id="includeCharts"
                        checked={includeCharts}
                        onCheckedChange={setIncludeCharts}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeAppendix">Include Appendix</Label>
                      <Switch
                        id="includeAppendix"
                        checked={includeAppendix}
                        onCheckedChange={setIncludeAppendix}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sections">Report Sections</Label>
                    <Textarea
                      id="sections"
                      value={sections}
                      onChange={(e) => setSections(e.target.value)}
                      placeholder="Section 1, Section 2, etc."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="insights">Key Insights</Label>
                    <Textarea
                      id="insights"
                      value={insights}
                      onChange={(e) => setInsights(e.target.value)}
                      placeholder="Insight 1, Insight 2, etc."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="recommendations">Recommendations</Label>
                    <Textarea
                      id="recommendations"
                      value={recommendations}
                      onChange={(e) => setRecommendations(e.target.value)}
                      placeholder="Recommendation 1, Recommendation 2, etc."
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleGenerate}
                    className="w-full"
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating Report..." : "Generate AI Report"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {result ? (
                <>
                  {/* Executive Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Executive Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{result.executiveSummary}</p>
                    </CardContent>
                  </Card>

                  {/* Key Findings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Key Findings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.keyFindings.map((finding, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Report Sections */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Report Sections</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.reportSections.map((section, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">{section.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{section.content}</p>
                          {section.charts && (
                            <div className="flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-blue-500" />
                              <span className="text-xs text-blue-600">
                                {section.charts.length} chart(s) included
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Strategic Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.recommendations.map((rec, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{rec.recommendation}</h4>
                            <Badge className={
                              rec.priority === "high" ? "bg-red-500/10 text-red-600" :
                              rec.priority === "medium" ? "bg-yellow-500/10 text-yellow-600" :
                              "bg-green-500/10 text-green-600"
                            }>
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{rec.rationale}</p>
                          <p className="text-xs text-blue-600">Timeline: {rec.timeline}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Next Steps */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2">
                        {result.nextSteps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <p className="text-sm">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <Card className="border-2 border-purple-500/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-3">
                        <Button className="w-full gap-2" size="lg">
                          <Download className="w-4 h-4" />
                          Download Report PDF
                        </Button>
                        <Link href="/ai-sprint" className="w-full">
                          <Button variant="outline" className="w-full" size="lg">
                            Start Reporting Sprint
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Ready to Generate</p>
                    <p className="text-muted-foreground">
                      Configure your report parameters to create a comprehensive executive report
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