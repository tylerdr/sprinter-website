"use client";

import React from "react";
import { UseCase } from "./schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, TrendingUp, Users, Zap, CheckCircle, AlertTriangle, Target, Wrench } from "lucide-react";

interface UseCaseUIProps {
  useCase: UseCase;
  variant?: "card" | "full" | "compact";
  showActions?: boolean;
  onEdit?: (useCase: UseCase) => void;
  onDelete?: (useCase: UseCase) => void;
  onView?: (useCase: UseCase) => void;
}

export function UseCaseUI({
  useCase,
  variant = "card",
  showActions = true,
  onEdit,
  onDelete,
  onView
}: UseCaseUIProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "moderate": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "complex": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "enterprise": return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatIndustries = (industries: string[]) => {
    return industries.map(industry =>
      industry.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    ).join(", ");
  };

  const formatRoles = (roles: string[]) => {
    return roles.map(role =>
      role.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    ).join(", ");
  };

  if (variant === "compact") {
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onView?.(useCase)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2">{useCase.title}</CardTitle>
              <CardDescription className="line-clamp-2 mt-1">{useCase.shortDescription}</CardDescription>
            </div>
            <Badge className={getDifficultyColor(useCase.difficulty)}>{useCase.difficulty}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {useCase.timeToValue.replace(/-/g, ' ')}
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {useCase.roiRange}
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
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{useCase.category.replace(/-/g, ' ')}</Badge>
                <Badge className={getDifficultyColor(useCase.difficulty)}>{useCase.difficulty}</Badge>
                <Badge className={getComplexityColor(useCase.complexity)}>{useCase.complexity}</Badge>
              </div>
              <CardTitle className="line-clamp-2">{useCase.title}</CardTitle>
              <CardDescription className="line-clamp-3 mt-2">{useCase.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Time to Value:</span>
                <span className="font-medium">{useCase.timeToValue.replace(/-/g, ' ')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">ROI:</span>
                <span className="font-medium">{useCase.roiRange}</span>
              </div>
            </div>

            {/* Industries & Roles */}
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Industries:</span>
                <span className="ml-2 font-medium">{formatIndustries(useCase.industries)}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Roles:</span>
                <span className="ml-2 font-medium">{formatRoles(useCase.roles)}</span>
              </div>
            </div>

            {/* Benefits Preview */}
            {useCase.benefits && useCase.benefits.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Key Benefits</h4>
                <div className="grid grid-cols-1 gap-1">
                  {useCase.benefits.slice(0, 3).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{benefit.metric}: {benefit.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {showActions && (
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="default" size="sm" onClick={() => onView?.(useCase)}>
                  View Details
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEdit?.(useCase)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete?.(useCase)}>
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
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">{useCase.category.replace(/-/g, ' ')}</Badge>
              <Badge className={getDifficultyColor(useCase.difficulty)}>{useCase.difficulty}</Badge>
              <Badge className={getComplexityColor(useCase.complexity)}>{useCase.complexity}</Badge>
              {useCase.featured && <Badge variant="secondary">Featured</Badge>}
            </div>
            <h1 className="text-3xl font-bold">{useCase.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">{useCase.description}</p>
          </div>
          {showActions && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onEdit?.(useCase)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => onDelete?.(useCase)}>
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
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Time to Value</p>
                  <p className="font-semibold">{useCase.timeToValue.replace(/-/g, ' ')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">ROI Range</p>
                  <p className="font-semibold">{useCase.roiRange}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{useCase.estimatedDuration}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Industries</p>
                  <p className="font-semibold">{useCase.industries.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="cases">Case Studies</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Business Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{useCase.businessValue}</p>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Target Industries</h4>
                  <div className="flex flex-wrap gap-1">
                    {useCase.industries.map((industry) => (
                      <Badge key={industry} variant="outline">
                        {industry.replace(/-/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Target Roles</h4>
                  <div className="flex flex-wrap gap-1">
                    {useCase.roles.map((role) => (
                      <Badge key={role} variant="outline">
                        {role.replace(/-/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI & Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">ROI Description</h4>
                    <p className="text-sm text-muted-foreground">{useCase.roiDescription}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Expected Range</h4>
                    <p className="text-lg font-semibold text-green-600">{useCase.roiRange}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Implementation Timeline</h4>
                    <p className="text-sm text-muted-foreground">{useCase.estimatedDuration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {useCase.benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">{benefit.metric}</h4>
                        {benefit.context && (
                          <p className="text-sm text-muted-foreground">{benefit.context}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{benefit.value}</p>
                      {benefit.unit && (
                        <p className="text-sm text-muted-foreground">{benefit.unit}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="mt-6">
          <div className="space-y-4">
            {useCase.implementationPhases.map((phase, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    {phase.phase} ({phase.duration})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Activities</h4>
                      <ul className="space-y-1">
                        {phase.activities.map((activity, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Deliverables</h4>
                      <ul className="space-y-1">
                        {phase.deliverables.map((deliverable, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {phase.milestone && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Milestone: {phase.milestone}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="technical" className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Technical Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {useCase.technicalRequirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${req.required ? 'bg-red-500' : 'bg-yellow-500'}`} />
                      <div className="flex-1">
                        <h4 className="font-medium">{req.name}</h4>
                        <p className="text-sm text-muted-foreground">{req.description}</p>
                        {req.alternatives && req.alternatives.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Alternatives: {req.alternatives.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tool Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {useCase.toolIntegrations.map((tool, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${tool.required ? 'bg-red-500' : 'bg-green-500'}`} />
                      <div className="flex-1">
                        <h4 className="font-medium">{tool.tool}</h4>
                        <p className="text-sm text-muted-foreground">{tool.purpose}</p>
                        <Badge variant="outline" className="mt-1">{tool.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cases" className="mt-6">
          {useCase.caseStudies && useCase.caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {useCase.caseStudies.map((caseStudy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{caseStudy.title}</CardTitle>
                    <CardDescription>Industry: {caseStudy.industry}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-red-600">Challenge</h4>
                        <p className="text-sm text-muted-foreground">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-600">Solution</h4>
                        <p className="text-sm text-muted-foreground">{caseStudy.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-600">Results</h4>
                        <ul className="space-y-1">
                          {caseStudy.results.map((result, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {caseStudy.testimonial && (
                        <div className="p-4 bg-muted rounded-lg">
                          <blockquote className="text-sm italic mb-2">"{caseStudy.testimonial.quote}"</blockquote>
                          <cite className="text-sm text-muted-foreground">
                            — {caseStudy.testimonial.author}, {caseStudy.testimonial.role} at {caseStudy.testimonial.company}
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
                <p className="text-muted-foreground">No case studies available for this use case.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="risks" className="mt-6">
          {useCase.riskAssessment && useCase.riskAssessment.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {useCase.riskAssessment.map((risk, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{risk.risk}</h4>
                          <Badge variant="outline" className={
                            risk.probability === 'high' ? 'border-red-500 text-red-700' :
                            risk.probability === 'medium' ? 'border-yellow-500 text-yellow-700' :
                            'border-green-500 text-green-700'
                          }>
                            {risk.probability} probability
                          </Badge>
                          <Badge variant="outline" className={
                            risk.impact === 'critical' ? 'border-red-500 text-red-700' :
                            risk.impact === 'high' ? 'border-orange-500 text-orange-700' :
                            risk.impact === 'medium' ? 'border-yellow-500 text-yellow-700' :
                            'border-green-500 text-green-700'
                          }>
                            {risk.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Mitigation:</strong> {risk.mitigation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No risk assessment available for this use case.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}