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
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  Search,
  Eye,
  Shield,
  Users,
  Award,
  Building,
  Lightbulb,
  Zap,
  Clock
} from "lucide-react";
import Link from "next/link";
import { CompetitiveIntelligenceInput, CompetitiveIntelligenceOutput } from "./tool";

interface CompetitiveIntelligenceUIProps {
  onAnalyze: (input: CompetitiveIntelligenceInput) => Promise<CompetitiveIntelligenceOutput>;
}

export function CompetitiveIntelligenceUI({ onAnalyze }: CompetitiveIntelligenceUIProps) {
  const [competitors, setCompetitors] = useState("Microsoft, Google, Amazon, Salesforce");
  const [industry, setIndustry] = useState("Enterprise Software");
  const [analysisScope, setAnalysisScope] = useState<"product" | "pricing" | "marketing" | "comprehensive">("comprehensive");
  const [geographicMarket, setGeographicMarket] = useState("North America");
  const [timeframe, setTimeframe] = useState("Last 6 months");
  const [focusAreas, setFocusAreas] = useState("pricing,features,marketing,partnerships");
  const [companySize, setCompanySize] = useState<"startup" | "small" | "medium" | "large" | "enterprise">("medium");
  const [businessModel, setBusinessModel] = useState("B2B SaaS subscription model");

  const [result, setResult] = useState<CompetitiveIntelligenceOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const input: CompetitiveIntelligenceInput = {
        primaryCompetitors: competitors.split(",").map(c => c.trim()).filter(Boolean),
        industry,
        analysisScope,
        geographicMarket,
        timeframe,
        focusAreas: focusAreas.split(",").map(f => f.trim()).filter(Boolean),
        companySize,
        businessModel
      };
      const output = await onAnalyze(input);
      setResult(output);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case "critical": return "bg-red-600/10 text-red-700 border-red-600/20";
      case "high": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default: return "bg-green-500/10 text-green-600 border-green-500/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default: return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default: return "bg-green-500/10 text-green-600 border-green-500/20";
    }
  };

  const getSizeColor = (size: string) => {
    switch (size) {
      case "large": return "bg-green-600/10 text-green-700 border-green-600/20";
      case "medium": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
              <Search className="w-4 h-4" />
              Competitive Intelligence
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Competitive Intelligence Analyzer
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track competitor activities and discover market opportunities with AI-powered analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="competitors">Primary Competitors (comma-separated)</Label>
                    <Textarea
                      id="competitors"
                      value={competitors}
                      onChange={(e) => setCompetitors(e.target.value)}
                      placeholder="Competitor 1, Competitor 2, Competitor 3"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry/Market</Label>
                    <Input
                      id="industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="e.g., Enterprise Software, FinTech"
                    />
                  </div>

                  <div>
                    <Label htmlFor="analysisScope">Analysis Scope</Label>
                    <Select value={analysisScope} onValueChange={(value: any) => setAnalysisScope(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Product Analysis</SelectItem>
                        <SelectItem value="pricing">Pricing Analysis</SelectItem>
                        <SelectItem value="marketing">Marketing Analysis</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="geographicMarket">Geographic Market</Label>
                    <Select value={geographicMarket} onValueChange={setGeographicMarket}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="North America">North America</SelectItem>
                        <SelectItem value="Europe">Europe</SelectItem>
                        <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                        <SelectItem value="Global">Global</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="companySize">Your Company Size</Label>
                    <Select value={companySize} onValueChange={(value: any) => setCompanySize(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="small">Small (10-50 employees)</SelectItem>
                        <SelectItem value="medium">Medium (50-500 employees)</SelectItem>
                        <SelectItem value="large">Large (500-5000 employees)</SelectItem>
                        <SelectItem value="enterprise">Enterprise (5000+ employees)</SelectItem>
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
                    <Label htmlFor="timeframe">Analysis Timeframe</Label>
                    <Select value={timeframe} onValueChange={setTimeframe}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Last 3 months">Last 3 months</SelectItem>
                        <SelectItem value="Last 6 months">Last 6 months</SelectItem>
                        <SelectItem value="Last 12 months">Last 12 months</SelectItem>
                        <SelectItem value="Last 2 years">Last 2 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="focusAreas">Focus Areas (comma-separated)</Label>
                    <Input
                      id="focusAreas"
                      value={focusAreas}
                      onChange={(e) => setFocusAreas(e.target.value)}
                      placeholder="pricing, features, marketing, partnerships"
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessModel">Your Business Model</Label>
                    <Textarea
                      id="businessModel"
                      value={businessModel}
                      onChange={(e) => setBusinessModel(e.target.value)}
                      placeholder="Describe your business model..."
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    className="w-full"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Analyzing Market..." : "Start Intelligence Analysis"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {result ? (
                <>
                  {/* Market Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Market Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Market Size</p>
                              <p className="text-xl font-semibold">{result.marketOverview.marketSize}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                              <p className="text-xl font-semibold">{result.marketOverview.growthRate}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Market Maturity</p>
                              <Badge className="capitalize">{result.marketOverview.marketMaturity}</Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-3">Key Market Trends</p>
                          <ul className="space-y-2">
                            {result.marketOverview.keyTrends.slice(0, 4).map((trend, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                                <span>{trend}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Competitive Matrix */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Competitive Positioning
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Your Position</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Market Ranking</span>
                              <Badge className="bg-blue-500/10 text-blue-600">
                                #{result.competitiveMatrix.yourPosition.ranking}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Competitive Score</span>
                              <span className="font-semibold">{result.competitiveMatrix.yourPosition.score}/100</span>
                            </div>
                            <Progress value={result.competitiveMatrix.yourPosition.score} className="h-2" />
                            <div>
                              <p className="text-sm font-medium mb-2">Key Differentiators:</p>
                              <ul className="space-y-1">
                                {result.competitiveMatrix.yourPosition.differentiators.map((diff, index) => (
                                  <li key={index} className="text-xs flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    {diff}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Top Performers</h4>
                          <div className="space-y-3">
                            {result.competitiveMatrix.topPerformers.map((performer, index) => (
                              <div key={index} className="border rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium">{performer.name}</span>
                                  <span className="text-sm font-semibold">{performer.score}/100</span>
                                </div>
                                <Progress value={performer.score} className="h-1.5 mb-2" />
                                <div className="text-xs space-y-1">
                                  {performer.keyAdvantages.map((advantage, i) => (
                                    <div key={i} className="flex items-center gap-1">
                                      <div className="w-1 h-1 bg-orange-500 rounded-full" />
                                      {advantage}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Competitor Profiles */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        Competitor Profiles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.competitorProfiles.map((profile, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-lg">{profile.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {profile.marketShare}% market share • {profile.positioning}
                              </p>
                            </div>
                            <Badge className={getThreatColor(profile.threatLevel)}>
                              {profile.threatLevel} threat
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-green-600 mb-2">Strengths</h5>
                              <ul className="space-y-1">
                                {profile.strengths.map((strength, i) => (
                                  <li key={i} className="text-sm flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2" />
                                    {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-red-600 mb-2">Weaknesses</h5>
                              <ul className="space-y-1">
                                {profile.weaknesses.map((weakness, i) => (
                                  <li key={i} className="text-sm flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" />
                                    {weakness}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Pricing Strategy</p>
                                <p className="text-sm text-muted-foreground">{profile.pricingStrategy}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Recent Moves</p>
                                <p className="text-sm text-muted-foreground">
                                  {profile.recentMoves[0] || "No recent significant moves detected"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Gap Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Gap Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.gapAnalysis.map((gap, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium">{gap.area}</h4>
                            <div className="flex gap-2">
                              <Badge className={getImpactColor(gap.impact)}>
                                {gap.impact} impact
                              </Badge>
                              <Badge className={gap.effort === "high" ? "bg-red-500/10 text-red-600" :
                                              gap.effort === "medium" ? "bg-yellow-500/10 text-yellow-600" :
                                              "bg-green-500/10 text-green-600"}>
                                {gap.effort} effort
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Gap:</strong> {gap.gap}
                          </p>
                          <p className="text-sm">
                            <strong>Recommendation:</strong> {gap.recommendation}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Market Opportunities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        Market Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.marketOpportunities.map((opportunity, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium">{opportunity.opportunity}</h4>
                            <div className="flex gap-2">
                              <Badge className={getSizeColor(opportunity.size)}>
                                {opportunity.size} size
                              </Badge>
                              <Badge className={opportunity.competition === "high" ? "bg-red-500/10 text-red-600" :
                                              opportunity.competition === "medium" ? "bg-yellow-500/10 text-yellow-600" :
                                              "bg-green-500/10 text-green-600"}>
                                {opportunity.competition} competition
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{opportunity.timeToMarket}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Strategic Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Strategic Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.strategicRecommendations.map((rec, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{rec.recommendation}</h4>
                              <p className="text-sm text-muted-foreground">{rec.category}</p>
                            </div>
                            <Badge className={getPriorityColor(rec.priority)}>
                              {rec.priority} priority
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium">Expected Impact</p>
                              <p className="text-muted-foreground">{rec.expectedImpact}</p>
                            </div>
                            <div>
                              <p className="font-medium">Timeline</p>
                              <p className="text-muted-foreground">{rec.timeline}</p>
                            </div>
                            <div>
                              <p className="font-medium">Resources</p>
                              <p className="text-muted-foreground">{rec.resources}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Monitoring Alerts */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Intelligence Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.monitoringAlerts.map((alert, index) => (
                        <Alert key={index} className="border-blue-500/20 bg-blue-500/5">
                          <Shield className="h-4 w-4 text-blue-500" />
                          <AlertDescription>
                            <div className="flex items-start justify-between">
                              <div>
                                <strong>{alert.competitor}:</strong> {alert.alertType}
                                <p className="text-sm mt-1">{alert.description}</p>
                              </div>
                              <Badge className={alert.significance === "high" ? "bg-red-500/10 text-red-600" :
                                              alert.significance === "medium" ? "bg-yellow-500/10 text-yellow-600" :
                                              "bg-green-500/10 text-green-600"}>
                                {alert.significance}
                              </Badge>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <Card className="border-2 border-purple-500/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-3">
                        <Button className="w-full gap-2" size="lg">
                          <Download className="w-4 h-4" />
                          Download Intelligence Report
                        </Button>
                        <Link href="/ai-sprint" className="w-full">
                          <Button variant="outline" className="w-full" size="lg">
                            Start Competitive Strategy Sprint
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Ready to Analyze</p>
                    <p className="text-muted-foreground">
                      Configure your competitors and market parameters to start intelligence analysis
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