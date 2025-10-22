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
import { Switch } from "@/components/ui/switch";
import {
  Heart,
  Frown,
  Smile,
  Meh,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  MessageSquare,
  Target,
  BarChart3,
  Users,
  Clock,
  Star
} from "lucide-react";
import Link from "next/link";
import { SentimentAnalyzerInput, SentimentAnalyzerOutput } from "./tool";

interface SentimentAnalyzerUIProps {
  onAnalyze: (input: SentimentAnalyzerInput) => Promise<SentimentAnalyzerOutput>;
}

export function SentimentAnalyzerUI({ onAnalyze }: SentimentAnalyzerUIProps) {
  const [textSource, setTextSource] = useState<"reviews" | "surveys" | "social_media" | "emails" | "support_tickets" | "custom">("reviews");
  const [textContent, setTextContent] = useState("Great product! Really love the features and customer service has been excellent. Highly recommend to others.");
  const [volumeSize, setVolumeSize] = useState(1000);
  const [analysisDepth, setAnalysisDepth] = useState<"basic" | "detailed" | "comprehensive">("detailed");
  const [language, setLanguage] = useState("en");
  const [includeEmotions, setIncludeEmotions] = useState(true);
  const [includeTrends, setIncludeTrends] = useState(true);
  const [businessContext, setBusinessContext] = useState("E-commerce product reviews analysis for customer satisfaction insights");

  const [result, setResult] = useState<SentimentAnalyzerOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const input: SentimentAnalyzerInput = {
        textSource,
        textContent,
        volumeSize,
        analysisDepth,
        language,
        includeEmotions,
        includeTrends,
        businessContext
      };
      const output = await onAnalyze(input);
      setResult(output);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentIcon = (label: string) => {
    switch (label) {
      case "very_positive": return <Smile className="w-6 h-6 text-green-600" />;
      case "positive": return <Smile className="w-6 h-6 text-green-500" />;
      case "neutral": return <Meh className="w-6 h-6 text-yellow-500" />;
      case "negative": return <Frown className="w-6 h-6 text-red-500" />;
      case "very_negative": return <Frown className="w-6 h-6 text-red-600" />;
      default: return <Meh className="w-6 h-6 text-gray-500" />;
    }
  };

  const getSentimentColor = (label: string) => {
    switch (label) {
      case "very_positive": return "text-green-600 bg-green-500/10 border-green-500/20";
      case "positive": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "neutral": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "negative": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "very_negative": return "text-red-600 bg-red-500/10 border-red-500/20";
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default: return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-600/10 text-red-700 border-red-600/20";
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
              <MessageSquare className="w-4 h-4" />
              AI Sentiment Analysis
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Sentiment Analyzer
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understand customer emotions and sentiment with advanced AI-powered text analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Text Source Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="textSource">Text Source Type</Label>
                    <Select value={textSource} onValueChange={(value: any) => setTextSource(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reviews">Customer Reviews</SelectItem>
                        <SelectItem value="surveys">Survey Responses</SelectItem>
                        <SelectItem value="social_media">Social Media</SelectItem>
                        <SelectItem value="emails">Email Communications</SelectItem>
                        <SelectItem value="support_tickets">Support Tickets</SelectItem>
                        <SelectItem value="custom">Custom Text</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="volumeSize">Volume Size</Label>
                    <Input
                      id="volumeSize"
                      type="number"
                      value={volumeSize}
                      onChange={(e) => setVolumeSize(Number(e.target.value))}
                      min="1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Number of text entries to analyze</p>
                  </div>

                  <div>
                    <Label htmlFor="analysisDepth">Analysis Depth</Label>
                    <Select value={analysisDepth} onValueChange={(value: any) => setAnalysisDepth(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Analysis</SelectItem>
                        <SelectItem value="detailed">Detailed Analysis</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeEmotions">Include Emotion Detection</Label>
                      <Switch
                        id="includeEmotions"
                        checked={includeEmotions}
                        onCheckedChange={setIncludeEmotions}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeTrends">Include Trend Analysis</Label>
                      <Switch
                        id="includeTrends"
                        checked={includeTrends}
                        onCheckedChange={setIncludeTrends}
                      />
                    </div>
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
                      placeholder="Describe the business context and objectives..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="textContent">Sample Text (Optional)</Label>
                    <Textarea
                      id="textContent"
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder="Enter sample text for analysis preview..."
                      rows={4}
                    />
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    className="w-full"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Analyzing Sentiment..." : "Start Sentiment Analysis"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {result ? (
                <>
                  {/* Overall Sentiment */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className={`border ${getSentimentColor(result.overallSentiment.label)}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Overall Sentiment</p>
                            <p className="text-3xl font-bold mt-2 capitalize">
                              {result.overallSentiment.label.replace('_', ' ')}
                            </p>
                            <p className="text-sm mt-1">
                              Score: {result.overallSentiment.score}
                            </p>
                          </div>
                          {getSentimentIcon(result.overallSentiment.label)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-500/20 bg-blue-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Confidence</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">
                              {result.overallSentiment.confidence}%
                            </p>
                            <Progress value={result.overallSentiment.confidence} className="mt-2" />
                          </div>
                          <Star className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 bg-purple-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Sample Size</p>
                            <p className="text-3xl font-bold text-purple-600 mt-2">
                              {volumeSize.toLocaleString()}
                            </p>
                            <p className="text-sm text-purple-600 mt-1">Text entries</p>
                          </div>
                          <Users className="w-8 h-8 text-purple-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sentiment Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Sentiment Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Smile className="w-4 h-4 text-green-500" />
                            Positive
                          </span>
                          <span className="font-medium">{result.sentimentDistribution.positive}%</span>
                        </div>
                        <Progress value={result.sentimentDistribution.positive} className="h-2" />

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Meh className="w-4 h-4 text-yellow-500" />
                            Neutral
                          </span>
                          <span className="font-medium">{result.sentimentDistribution.neutral}%</span>
                        </div>
                        <Progress value={result.sentimentDistribution.neutral} className="h-2" />

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Frown className="w-4 h-4 text-red-500" />
                            Negative
                          </span>
                          <span className="font-medium">{result.sentimentDistribution.negative}%</span>
                        </div>
                        <Progress value={result.sentimentDistribution.negative} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Emotion Analysis */}
                  {includeEmotions && result.emotionAnalysis.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-pink-500" />
                          Emotion Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {result.emotionAnalysis.map((emotion, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{emotion.emotion}</h4>
                                <span className="text-sm text-muted-foreground">
                                  {emotion.frequency} mentions
                                </span>
                              </div>
                              <Progress
                                value={emotion.intensity * 100}
                                className="h-2 mb-2"
                              />
                              <p className="text-sm text-muted-foreground">
                                Intensity: {Math.round(emotion.intensity * 100)}%
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Key Themes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Key Themes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.keyThemes.map((theme, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium">{theme.theme}</h4>
                            <div className="flex items-center gap-2">
                              {getSentimentIcon(theme.sentiment > 0.2 ? "positive" : theme.sentiment < -0.2 ? "negative" : "neutral")}
                              <span className="text-sm font-medium">
                                {theme.mentions} mentions
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {theme.keywords.map((keyword, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Sentiment Score: {Math.round(theme.sentiment * 100) / 100}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Trend Analysis */}
                  {includeTrends && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {result.trendAnalysis.direction === "improving" ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          ) : result.trendAnalysis.direction === "declining" ? (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                          ) : (
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                          )}
                          Trend Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Direction</p>
                            <p className="text-lg font-semibold capitalize">{result.trendAnalysis.direction}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Velocity</p>
                            <p className="text-lg font-semibold">{result.trendAnalysis.velocity}%</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Key Insights:</h4>
                          <ul className="space-y-1">
                            {result.trendAnalysis.insights.map((insight, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Critical Issues */}
                  {result.criticalIssues.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          Critical Issues
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {result.criticalIssues.map((issue, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{issue.issue}</h4>
                              <Badge className={getSeverityColor(issue.severity)}>
                                {issue.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Frequency: {issue.frequency} mentions
                            </p>
                            <p className="text-sm italic border-l-2 border-gray-300 pl-3">
                              "{issue.sampleText}"
                            </p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Action Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Recommended Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.actionItems.map((item, index) => (
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
                              <Users className="w-4 h-4" />
                              <span>{item.department}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Competitor Comparison */}
                  {result.competitorComparison && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Industry Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Your Score</p>
                            <p className="text-2xl font-bold">{result.competitorComparison.yourScore}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Industry Average</p>
                            <p className="text-2xl font-bold">{result.competitorComparison.industryAverage}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Ranking</p>
                            <p className="text-2xl font-bold">{result.competitorComparison.ranking}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* CTA */}
                  <Card className="border-2 border-purple-500/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-3">
                        <Button className="w-full gap-2" size="lg">
                          <Download className="w-4 h-4" />
                          Download Sentiment Report
                        </Button>
                        <Link href="/ai-sprint" className="w-full">
                          <Button variant="outline" className="w-full" size="lg">
                            Start Customer Experience Sprint
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Ready to Analyze</p>
                    <p className="text-muted-foreground">
                      Configure your text source and parameters to start sentiment analysis
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