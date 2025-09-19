"use client";

import React from "react";
import { Industry } from "./schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Users,
  Shield,
  Zap,
  CheckCircle,
  AlertTriangle,
  Target,
  BarChart3,
  Building,
  Star,
  Clock,
  DollarSign
} from "lucide-react";

interface IndustryUIProps {
  industry: Industry;
  variant?: "card" | "full" | "compact";
  showActions?: boolean;
  onEdit?: (industry: Industry) => void;
  onDelete?: (industry: Industry) => void;
  onView?: (industry: Industry) => void;
}

export function IndustryUI({
  industry,
  variant = "card",
  showActions = true,
  onEdit,
  onDelete,
  onView
}: IndustryUIProps) {
  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case "early": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "developing": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "leading": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getRegulatoryColor = (complexity: string) => {
    switch (complexity) {
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "high": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getMaturityProgress = (maturity: string) => {
    switch (maturity) {
      case "early": return 25;
      case "developing": return 50;
      case "advanced": return 75;
      case "leading": return 100;
      default: return 0;
    }
  };

  if (variant === "compact") {
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onView?.(industry)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              {industry.icon && <span className="text-2xl">{industry.icon}</span>}
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-1">{industry.name}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1">{industry.shortDescription}</CardDescription>
              </div>
            </div>
            <Badge className={getMaturityColor(industry.aiMaturity)}>{industry.aiMaturity}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {industry.averageROI}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {industry.implementationTimeline}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "card") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              {industry.icon && <span className="text-3xl">{industry.icon}</span>}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{industry.category.replace(/-/g, ' ')}</Badge>
                  <Badge className={getMaturityColor(industry.aiMaturity)}>{industry.aiMaturity}</Badge>
                  <Badge className={getRegulatoryColor(industry.regulatoryComplexity)}>{industry.regulatoryComplexity} reg</Badge>
                </div>
                <CardTitle className="line-clamp-1">{industry.name}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">{industry.description}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* AI Maturity Progress */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">AI Maturity</span>
                <span className="font-medium">{industry.aiMaturity}</span>
              </div>
              <Progress value={getMaturityProgress(industry.aiMaturity)} className="h-2" />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Market Size</p>
                  <p className="font-medium">{industry.marketMetrics.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Growth</p>
                  <p className="font-medium">{industry.marketMetrics.growth}</p>
                </div>
              </div>
            </div>

            {/* Use Case Opportunities Preview */}
            {industry.useCaseOpportunities && industry.useCaseOpportunities.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Top Opportunities</h4>
                <div className="space-y-1">
                  {industry.useCaseOpportunities.slice(0, 3).map((opportunity, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="h-3 w-3 text-blue-500" />
                      <span className="line-clamp-1">{opportunity.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {opportunity.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {showActions && (
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="default" size="sm" onClick={() => onView?.(industry)}>
                  View Details
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEdit?.(industry)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete?.(industry)}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full variant
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4 flex-1">
            {industry.icon && <span className="text-5xl">{industry.icon}</span>}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">{industry.category.replace(/-/g, ' ')}</Badge>
                <Badge className={getMaturityColor(industry.aiMaturity)}>{industry.aiMaturity}</Badge>
                <Badge className={getRegulatoryColor(industry.regulatoryComplexity)}>
                  {industry.regulatoryComplexity} regulatory
                </Badge>
                {industry.featured && <Badge variant="secondary">Featured</Badge>}
              </div>
              <h1 className="text-3xl font-bold">{industry.name}</h1>
              <p className="text-lg text-muted-foreground mt-2">{industry.description}</p>
            </div>
          </div>
          {showActions && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onEdit?.(industry)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => onDelete?.(industry)}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Market Size</p>
                  <p className="font-semibold">{industry.marketMetrics.size}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                  <p className="font-semibold">{industry.marketMetrics.growth}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">ROI Range</p>
                  <p className="font-semibold">{industry.averageROI}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="font-semibold">{industry.implementationTimeline}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Maturity */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">AI Maturity Level</h3>
              <Badge className={getMaturityColor(industry.aiMaturity)}>{industry.aiMaturity}</Badge>
            </div>
            <Progress value={getMaturityProgress(industry.aiMaturity)} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              Digital Adoption: {industry.marketMetrics.digitalAdoption}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="success">Success Stories</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Market Size</h4>
                    <p className="text-sm text-muted-foreground">{industry.marketMetrics.size}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Growth Rate</h4>
                    <p className="text-sm text-muted-foreground">{industry.marketMetrics.growth}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Digital Adoption</h4>
                    <p className="text-sm text-muted-foreground">{industry.marketMetrics.digitalAdoption}</p>
                  </div>
                  {industry.marketMetrics.aiSpending && (
                    <div>
                      <h4 className="font-medium">AI Investment</h4>
                      <p className="text-sm text-muted-foreground">{industry.marketMetrics.aiSpending}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Typical Timeline</h4>
                    <p className="text-sm text-muted-foreground">{industry.implementationTimeline}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Expected ROI</h4>
                    <p className="text-lg font-semibold text-green-600">{industry.averageROI}</p>
                  </div>
                  {industry.budgetRange && (
                    <div>
                      <h4 className="font-medium">Investment Range</h4>
                      <p className="text-sm text-muted-foreground">{industry.budgetRange}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started Steps */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {industry.gettingStarted.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{step.step}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Duration: {step.duration}</span>
                        <span>Deliverables: {step.deliverables.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {industry.challengeCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{category.category}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={
                        category.priority === 'critical' ? 'border-red-500 text-red-700' :
                        category.priority === 'high' ? 'border-orange-500 text-orange-700' :
                        category.priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
                        'border-green-500 text-green-700'
                      }>
                        {category.priority} priority
                      </Badge>
                      <Badge variant="outline" className={
                        category.aiReadiness === 'ready' ? 'border-green-500 text-green-700' :
                        category.aiReadiness === 'moderate' ? 'border-yellow-500 text-yellow-700' :
                        category.aiReadiness === 'complex' ? 'border-orange-500 text-orange-700' :
                        'border-red-500 text-red-700'
                      }>
                        {category.aiReadiness}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-3 w-3 text-yellow-500" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {industry.useCaseOpportunities.map((opportunity, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{opportunity.title}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={
                        opportunity.priority === 'critical' ? 'border-red-500 text-red-700' :
                        opportunity.priority === 'high' ? 'border-orange-500 text-orange-700' :
                        opportunity.priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
                        'border-green-500 text-green-700'
                      }>
                        {opportunity.priority}
                      </Badge>
                      <Badge variant="outline" className={
                        opportunity.complexity === 'simple' ? 'border-green-500 text-green-700' :
                        opportunity.complexity === 'moderate' ? 'border-yellow-500 text-yellow-700' :
                        opportunity.complexity === 'complex' ? 'border-orange-500 text-orange-700' :
                        'border-red-500 text-red-700'
                      }>
                        {opportunity.complexity}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{opportunity.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium">ROI Potential</h4>
                      <p className="text-muted-foreground">{opportunity.roiPotential}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Time to Value</h4>
                      <p className="text-muted-foreground">{opportunity.timeToValue}</p>
                    </div>
                    {opportunity.adoptionRate && (
                      <div>
                        <h4 className="font-medium">Adoption Rate</h4>
                        <p className="text-muted-foreground">{opportunity.adoptionRate}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="technology" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            {industry.technologyAdoption.map((tech, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{tech.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {tech.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="p-3 border rounded-lg">
                          <h4 className="font-medium">{tool.name}</h4>
                          <p className="text-sm text-muted-foreground">Adoption: {tool.adoptionRate}</p>
                          <p className="text-sm text-muted-foreground">ROI: {tool.roiRange}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {tool.useCases.map((useCase, ucIndex) => (
                              <Badge key={ucIndex} variant="outline" className="text-xs">
                                {useCase}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {tech.trends.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Trends</h4>
                        <ul className="space-y-1">
                          {tech.trends.map((trend, trendIndex) => (
                            <li key={trendIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              {trend}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {tech.barriers.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Barriers</h4>
                        <ul className="space-y-1">
                          {tech.barriers.map((barrier, barrierIndex) => (
                            <li key={barrierIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <AlertTriangle className="h-3 w-3 text-yellow-500" />
                              {barrier}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regulatory" className="mt-6">
          {industry.regulatoryRequirements && industry.regulatoryRequirements.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {industry.regulatoryRequirements.map((req, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{req.regulation}</span>
                      <Badge variant="outline" className={
                        req.impact === 'blocking' ? 'border-red-500 text-red-700' :
                        req.impact === 'high' ? 'border-orange-500 text-orange-700' :
                        req.impact === 'medium' ? 'border-yellow-500 text-yellow-700' :
                        'border-green-500 text-green-700'
                      }>
                        {req.impact} impact
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{req.description}</p>
                      <div>
                        <h4 className="font-medium">AI Implications</h4>
                        <p className="text-sm text-muted-foreground">{req.aiImplications}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Compliance Requirements</h4>
                        <ul className="space-y-1">
                          {req.compliance.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Shield className="h-3 w-3 text-blue-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No specific regulatory requirements documented.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="success" className="mt-6">
          {industry.successStories && industry.successStories.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {industry.successStories.map((story, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      {story.company}
                      <Badge variant="outline">{story.size}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-red-600">Challenge</h4>
                        <p className="text-sm text-muted-foreground">{story.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-600">Solution</h4>
                        <p className="text-sm text-muted-foreground">{story.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-600">Results</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {story.results.map((result, i) => (
                            <div key={i} className="p-3 bg-muted rounded-lg">
                              <p className="text-lg font-semibold">{result.value}</p>
                              <p className="text-sm text-muted-foreground">{result.metric}</p>
                              <p className="text-xs text-muted-foreground">{result.timeframe}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {story.testimonial && (
                        <div className="p-4 bg-muted rounded-lg">
                          <blockquote className="text-sm italic mb-2">"{story.testimonial.quote}"</blockquote>
                          <cite className="text-sm text-muted-foreground">
                            — {story.testimonial.author}, {story.testimonial.role}
                          </cite>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No success stories available for this industry.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {industry.keyTrends.map((trend, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      {trend}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Future Outlook</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{industry.futureOutlook}</p>
              </CardContent>
            </Card>

            {industry.competitiveLandscape && (
              <Card>
                <CardHeader>
                  <CardTitle>Competitive Landscape</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Market Leaders</h4>
                      <ul className="space-y-1">
                        {industry.competitiveLandscape.leaders.map((leader, index) => (
                          <li key={index} className="text-sm text-muted-foreground">• {leader}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Emerging Players</h4>
                      <ul className="space-y-1">
                        {industry.competitiveLandscape.emergingPlayers.map((player, index) => (
                          <li key={index} className="text-sm text-muted-foreground">• {player}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Opportunities</h4>
                      <ul className="space-y-1">
                        {industry.competitiveLandscape.opportunities.map((opp, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {opp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Threats</h4>
                      <ul className="space-y-1">
                        {industry.competitiveLandscape.threats.map((threat, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                            {threat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}