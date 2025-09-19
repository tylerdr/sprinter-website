"use client";

import React, { useState } from "react";
import type { ToolUI } from "@/features/tools/types";
import { inputSchema as Input, outputSchema as Output } from "./tool";
import { Button } from "@/components/ui/button";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp, TrendingDown, Target, Zap, AlertCircle, CheckCircle,
  Building, User, Activity, DollarSign, Calendar, Award
} from "lucide-react";

const UI: ToolUI<typeof Input, typeof Output> = {
  InputForm: ({ onSubmit, isLoading, lastInput }) => {
    const [formData, setFormData] = useState({
      companyName: lastInput?.companyName || "",
      industry: lastInput?.industry || "",
      companySize: lastInput?.companySize || "51-200",
      annualRevenue: lastInput?.annualRevenue || undefined,
      contactRole: lastInput?.contactRole || "Manager",
      contactDepartment: lastInput?.contactDepartment || "Sales",
      engagementHistory: lastInput?.engagementHistory || {
        websiteVisits: 0,
        emailsOpened: 0,
        contentDownloads: 0,
        demoRequested: false,
        pricingViewed: false
      },
      currentTools: lastInput?.currentTools || [],
      painPoints: lastInput?.painPoints || "",
      budget: lastInput?.budget || undefined,
      timeline: lastInput?.timeline || undefined,
      competitorInterest: lastInput?.competitorInterest || []
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <ShadcnInput
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                placeholder="Acme Corp"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <ShadcnInput
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
                placeholder="Technology"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size *</Label>
              <Select
                value={formData.companySize}
                onValueChange={(value) => setFormData({...formData, companySize: value as any})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="501-1000">501-1000 employees</SelectItem>
                  <SelectItem value="1001-5000">1001-5000 employees</SelectItem>
                  <SelectItem value="5000+">5000+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualRevenue">Annual Revenue</Label>
              <Select
                value={formData.annualRevenue}
                onValueChange={(value) => setFormData({...formData, annualRevenue: value as any})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select revenue range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<$1M">Less than $1M</SelectItem>
                  <SelectItem value="$1M-$10M">$1M - $10M</SelectItem>
                  <SelectItem value="$10M-$50M">$10M - $50M</SelectItem>
                  <SelectItem value="$50M-$100M">$50M - $100M</SelectItem>
                  <SelectItem value="$100M-$500M">$100M - $500M</SelectItem>
                  <SelectItem value="$500M-$1B">$500M - $1B</SelectItem>
                  <SelectItem value=">$1B">More than $1B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactRole">Contact Role *</Label>
              <Select
                value={formData.contactRole}
                onValueChange={(value) => setFormData({...formData, contactRole: value as any})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C-Level">C-Level</SelectItem>
                  <SelectItem value="VP">VP</SelectItem>
                  <SelectItem value="Director">Director</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Individual Contributor">Individual Contributor</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactDepartment">Department *</Label>
              <Select
                value={formData.contactDepartment}
                onValueChange={(value) => setFormData({...formData, contactDepartment: value as any})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Executive">Executive</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Engagement History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="websiteVisits">Website Visits</Label>
                <ShadcnInput
                  id="websiteVisits"
                  type="number"
                  min="0"
                  value={formData.engagementHistory.websiteVisits}
                  onChange={(e) => setFormData({
                    ...formData,
                    engagementHistory: {
                      ...formData.engagementHistory,
                      websiteVisits: parseInt(e.target.value) || 0
                    }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailsOpened">Emails Opened</Label>
                <ShadcnInput
                  id="emailsOpened"
                  type="number"
                  min="0"
                  value={formData.engagementHistory.emailsOpened}
                  onChange={(e) => setFormData({
                    ...formData,
                    engagementHistory: {
                      ...formData.engagementHistory,
                      emailsOpened: parseInt(e.target.value) || 0
                    }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentDownloads">Content Downloads</Label>
                <ShadcnInput
                  id="contentDownloads"
                  type="number"
                  min="0"
                  value={formData.engagementHistory.contentDownloads}
                  onChange={(e) => setFormData({
                    ...formData,
                    engagementHistory: {
                      ...formData.engagementHistory,
                      contentDownloads: parseInt(e.target.value) || 0
                    }
                  })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="demoRequested" className="cursor-pointer">
                  Demo Requested
                </Label>
                <Switch
                  id="demoRequested"
                  checked={formData.engagementHistory.demoRequested}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    engagementHistory: {
                      ...formData.engagementHistory,
                      demoRequested: checked
                    }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="pricingViewed" className="cursor-pointer">
                  Pricing Page Viewed
                </Label>
                <Switch
                  id="pricingViewed"
                  checked={formData.engagementHistory.pricingViewed}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    engagementHistory: {
                      ...formData.engagementHistory,
                      pricingViewed: checked
                    }
                  })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Purchase Intent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => setFormData({...formData, timeline: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediate">Immediate</SelectItem>
                    <SelectItem value="This Quarter">This Quarter</SelectItem>
                    <SelectItem value="Next Quarter">Next Quarter</SelectItem>
                    <SelectItem value="This Year">This Year</SelectItem>
                    <SelectItem value="Next Year">Next Year</SelectItem>
                    <SelectItem value="No Timeline">No Timeline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData({...formData, budget: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Disclosed">Not Disclosed</SelectItem>
                    <SelectItem value="<$10K">Less than $10K</SelectItem>
                    <SelectItem value="$10K-$50K">$10K - $50K</SelectItem>
                    <SelectItem value="$50K-$100K">$50K - $100K</SelectItem>
                    <SelectItem value="$100K-$500K">$100K - $500K</SelectItem>
                    <SelectItem value=">$500K">More than $500K</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="painPoints">Pain Points / Challenges</Label>
              <Textarea
                id="painPoints"
                value={formData.painPoints}
                onChange={(e) => setFormData({...formData, painPoints: e.target.value})}
                placeholder="Describe their main challenges..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Scoring Lead..." : "Score Lead"}
        </Button>
      </form>
    );
  },

  Result: ({ data }) => {
    const getTierColor = (tier: string) => {
      switch(tier) {
        case "Hot": return "text-red-600 bg-red-100";
        case "Warm": return "text-orange-600 bg-orange-100";
        case "Cool": return "text-blue-600 bg-blue-100";
        case "Cold": return "text-gray-600 bg-gray-100";
        default: return "text-gray-600 bg-gray-100";
      }
    };

    const getGradeColor = (grade: string) => {
      switch(grade) {
        case "A": return "text-green-600 bg-green-100";
        case "B": return "text-blue-600 bg-blue-100";
        case "C": return "text-yellow-600 bg-yellow-100";
        case "D": return "text-orange-600 bg-orange-100";
        case "F": return "text-red-600 bg-red-100";
        default: return "text-gray-600 bg-gray-100";
      }
    };

    const getPriorityColor = (priority: string) => {
      if (priority.includes("Immediate")) return "bg-red-500";
      if (priority.includes("High")) return "bg-orange-500";
      if (priority.includes("Medium")) return "bg-yellow-500";
      if (priority.includes("Low")) return "bg-blue-500";
      return "bg-gray-500";
    };

    return (
      <div className="space-y-6">
        {/* Score Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Score Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {data.score}
                </div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
                <Progress value={data.score} className="mt-2" />
              </div>

              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${getGradeColor(data.grade).split(' ')[0]}`}>
                  {data.grade}
                </div>
                <div className="text-sm text-muted-foreground">Grade</div>
                <Badge className={`mt-2 ${getGradeColor(data.grade)}`}>
                  {data.grade === "A" ? "Excellent" : data.grade === "B" ? "Good" : data.grade === "C" ? "Average" : "Poor"}
                </Badge>
              </div>

              <div className="text-center">
                <Badge className={`text-lg px-4 py-2 ${getTierColor(data.tier)}`}>
                  {data.tier}
                </Badge>
                <div className="text-sm text-muted-foreground mt-2">Temperature</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {data.conversionProbability}%
                </div>
                <div className="text-sm text-muted-foreground">Conversion Probability</div>
                <Progress value={data.conversionProbability} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priority and Deal Size */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Priority Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`text-lg px-4 py-2 text-white ${getPriorityColor(data.priorityLevel)}`}>
                {data.priorityLevel}
              </Badge>
            </CardContent>
          </Card>

          {data.predictedDealSize && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Predicted Deal Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {data.predictedDealSize}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Key Scoring Factors */}
        {data.reasons.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Key Scoring Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.reasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-sm">{reason}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Insights Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="strengths">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
                <TabsTrigger value="concerns">Concerns</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              </TabsList>

              <TabsContent value="strengths" className="space-y-2 mt-4">
                {data.insights.strengths.map((strength, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-green-50 rounded">
                    <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-sm">{strength}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="concerns" className="space-y-2 mt-4">
                {data.insights.concerns.map((concern, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-yellow-50 rounded">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <span className="text-sm">{concern}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="opportunities" className="space-y-2 mt-4">
                {data.insights.opportunities.map((opportunity, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                    <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span className="text-sm">{opportunity}</span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recommended Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Recommended Next Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recommendations.map((recommendation, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },

  Loading: ({ progressPct, note }) => (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="text-muted-foreground">Analyzing lead data...</span>
          </div>
          {progressPct !== undefined && (
            <Progress value={progressPct} className="mt-4" />
          )}
          {note && (
            <p className="text-sm text-muted-foreground text-center mt-2">{note}</p>
          )}
        </CardContent>
      </Card>
    </div>
  ),

  Error: ({ error }) => (
    <Card className="border-destructive">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="w-5 h-5" />
          <p className="font-semibold">Error scoring lead</p>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{error}</p>
      </CardContent>
    </Card>
  )
};

export default UI;