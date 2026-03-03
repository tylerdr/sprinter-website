"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  Target,
  Building,
  Clock,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  ArrowRight,
  RefreshCw,
  Download,
  BookOpen,
  Lightbulb
} from "lucide-react";

// Import data and types
import { industries, useCases, roles, type UseCase, type Industry, type Role } from "@/lib/use-cases-data";

interface FilterState {
  search: string;
  industries: string[];
  roles: string[];
  difficulty: string[];
  complexity: string[];
  timeToValue: string[];
  category: string[];
  aiMaturity: string[];
  regulatoryComplexity: string[];
}

interface SortOption {
  field: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { field: "title", label: "Name A-Z" },
  { field: "-title", label: "Name Z-A" },
  { field: "difficulty", label: "Difficulty (Easy first)" },
  { field: "-difficulty", label: "Difficulty (Hard first)" },
  { field: "timeToValue", label: "Time to Value" },
  { field: "-priority", label: "Priority" },
];

export default function OpportunityAtlasPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    industries: [],
    roles: [],
    difficulty: [],
    complexity: [],
    timeToValue: [],
    category: [],
    aiMaturity: [],
    regulatoryComplexity: [],
  });
  const [sortBy, setSortBy] = useState("title");
  const [showFilters, setShowFilters] = useState(false);

  // Filter use cases
  const filteredUseCases = useMemo(() => {
    return useCases.filter((useCase) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          useCase.title.toLowerCase().includes(searchLower) ||
          useCase.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Industry filter
      if (filters.industries.length > 0) {
        const hasMatchingIndustry = useCase.industry.some(ind =>
          filters.industries.includes(ind)
        );
        if (!hasMatchingIndustry) return false;
      }

      // Role filter
      if (filters.roles.length > 0) {
        const hasMatchingRole = useCase.roles.some(role =>
          filters.roles.includes(role)
        );
        if (!hasMatchingRole) return false;
      }

      // Difficulty filter
      if (filters.difficulty.length > 0) {
        if (!filters.difficulty.includes(useCase.difficulty)) return false;
      }

      // Category filter - useCase doesn't have category in legacy data
      if (filters.category.length > 0) {
        // Skip category filtering for now since legacy data doesn't have category
      }

      // Time to value filter
      if (filters.timeToValue.length > 0) {
        if (!filters.timeToValue.includes(useCase.timeToValue)) return false;
      }

      return true;
    });
  }, [useCases, filters]);

  // Filter industries
  const filteredIndustries = useMemo(() => {
    return industries.filter((industry) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          industry.name.toLowerCase().includes(searchLower) ||
          industry.description.toLowerCase().includes(searchLower) ||
          industry.challenges.some(challenge =>
            challenge.toLowerCase().includes(searchLower)
          );
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [industries, filters]);

  // Update filter
  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Toggle array filter
  const toggleArrayFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];

      return {
        ...prev,
        [key]: newArray
      };
    });
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      industries: [],
      roles: [],
      difficulty: [],
      complexity: [],
      timeToValue: [],
      category: [],
      aiMaturity: [],
      regulatoryComplexity: [],
    });
  }, []);

  // Get stats
  const stats = useMemo(() => ({
    totalUseCases: useCases.length,
    filteredUseCases: filteredUseCases.length,
    totalIndustries: industries.length,
    filteredIndustries: filteredIndustries.length,
    avgTimeToValue: "30-60 days",
    avgROI: "150-300%"
  }), [filteredUseCases.length, filteredIndustries.length]);

  return (
    <div className="spr-theme spr-page min-h-screen">
      {/* Header */}
      <div className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Opportunity Atlas</h1>
                <p className="text-muted-foreground">
                  Discover AI transformation opportunities across industries and use cases
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Use Cases</p>
                      <p className="text-xl font-bold">{stats.filteredUseCases}/{stats.totalUseCases}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Industries</p>
                      <p className="text-xl font-bold">{stats.filteredIndustries}/{stats.totalIndustries}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Time to Value</p>
                      <p className="text-lg font-bold">{stats.avgTimeToValue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. ROI</p>
                      <p className="text-lg font-bold">{stats.avgROI}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search opportunities..."
                      value={filters.search}
                      onChange={(e) => updateFilter("search", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Separator />

                {/* Industries */}
                <div>
                  <label className="text-sm font-medium">Industries</label>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {industries.map((industry) => (
                      <div key={industry.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`industry-${industry.id}`}
                          checked={filters.industries.includes(industry.id)}
                          onCheckedChange={() => toggleArrayFilter("industries", industry.id)}
                        />
                        <label
                          htmlFor={`industry-${industry.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {industry.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Roles */}
                <div>
                  <label className="text-sm font-medium">Target Roles</label>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {roles.map((role) => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`role-${role.id}`}
                          checked={filters.roles.includes(role.id)}
                          onCheckedChange={() => toggleArrayFilter("roles", role.id)}
                        />
                        <label
                          htmlFor={`role-${role.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {role.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Difficulty */}
                <div>
                  <label className="text-sm font-medium">Difficulty</label>
                  <div className="mt-2 space-y-2">
                    {["Easy", "Medium", "Advanced"].map((difficulty) => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox
                          id={`difficulty-${difficulty}`}
                          checked={filters.difficulty.includes(difficulty)}
                          onCheckedChange={() => toggleArrayFilter("difficulty", difficulty)}
                        />
                        <label
                          htmlFor={`difficulty-${difficulty}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {difficulty}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Time to Value */}
                <div>
                  <label className="text-sm font-medium">Time to Value</label>
                  <div className="mt-2 space-y-2">
                    {["7-days", "14-days", "30-days", "60-days", "90-days"].map((timeframe) => (
                      <div key={timeframe} className="flex items-center space-x-2">
                        <Checkbox
                          id={`time-${timeframe}`}
                          checked={filters.timeToValue.includes(timeframe)}
                          onCheckedChange={() => toggleArrayFilter("timeToValue", timeframe)}
                        />
                        <label
                          htmlFor={`time-${timeframe}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {timeframe.replace("-", " ")}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.field} value={option.field}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Guide
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases ({filteredUseCases.length})</TabsTrigger>
                  <TabsTrigger value="industries">Industries ({filteredIndustries.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    {/* Quick Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-500" />
                            Quick Wins
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {filteredUseCases
                              .filter(uc => uc.difficulty === "Easy")
                              .slice(0, 3)
                              .map((useCase) => (
                                <div key={useCase.id} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div>
                                    <h4 className="font-medium">{useCase.title}</h4>
                                    <p className="text-sm text-muted-foreground">{useCase.timeToValue}</p>
                                  </div>
                                  <Badge variant="outline">{useCase.difficulty}</Badge>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            High ROI Opportunities
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {filteredUseCases
                              .slice(0, 3)
                              .map((useCase) => (
                                <div key={useCase.id} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div>
                                    <h4 className="font-medium">{useCase.title}</h4>
                                    <p className="text-sm text-muted-foreground">{useCase.roi}</p>
                                  </div>
                                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Industry Highlights */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Industry Opportunities</CardTitle>
                        <CardDescription>
                          Top industries with the highest AI transformation potential
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {filteredIndustries.slice(0, 3).map((industry) => (
                            <div key={industry.id} className="p-4 border rounded-lg">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">{industry.icon}</span>
                                <h4 className="font-medium">{industry.name}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{industry.averageROI}</p>
                              <div className="flex flex-wrap gap-1">
                                {industry.useCases.slice(0, 2).map((useCaseId) => (
                                  <Badge key={useCaseId} variant="outline" className="text-xs">
                                    {useCaseId.replace(/-/g, " ")}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="use-cases" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredUseCases.map((useCase) => (
                      <Card key={useCase.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={
                                  useCase.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                                  useCase.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-red-100 text-red-800"
                                }>
                                  {useCase.difficulty}
                                </Badge>
                              </div>
                              <CardTitle className="line-clamp-2">{useCase.title}</CardTitle>
                              <CardDescription className="line-clamp-3 mt-2">
                                {useCase.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Metrics */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{useCase.timeToValue}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                                <span>{useCase.roi}</span>
                              </div>
                            </div>

                            {/* Industries */}
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Industries:</p>
                              <div className="flex flex-wrap gap-1">
                                {useCase.industry.map((ind) => (
                                  <Badge key={ind} variant="outline" className="text-xs">
                                    {ind.replace(/-/g, " ")}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Benefits */}
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Benefits:</p>
                              <ul className="space-y-1">
                                {useCase.benefits.slice(0, 2).map((benefit, index) => (
                                  <li key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                                    <div className="w-1 h-1 bg-green-500 rounded-full" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <Button className="w-full" variant="outline">
                              View Details
                              <ArrowRight className="h-3 w-3 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="industries" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredIndustries.map((industry) => (
                      <Card key={industry.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{industry.icon}</span>
                            <div className="flex-1">
                              <CardTitle>{industry.name}</CardTitle>
                              <CardDescription className="line-clamp-2 mt-1">
                                {industry.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">ROI Range</p>
                                <p className="font-medium">{industry.averageROI}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Top Tools</p>
                                <p className="font-medium">{industry.topTools.length}+</p>
                              </div>
                            </div>

                            {/* Challenges Preview */}
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Key Challenges:</p>
                              <ul className="space-y-1">
                                {industry.challenges.slice(0, 3).map((challenge, index) => (
                                  <li key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                                    <div className="w-1 h-1 bg-red-500 rounded-full" />
                                    {challenge}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Use Cases */}
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Use Cases:</p>
                              <div className="flex flex-wrap gap-1">
                                {industry.useCases.slice(0, 3).map((useCaseId) => (
                                  <Badge key={useCaseId} variant="outline" className="text-xs">
                                    {useCaseId.replace(/-/g, " ")}
                                  </Badge>
                                ))}
                                {industry.useCases.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{industry.useCases.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <Button className="w-full" variant="outline">
                              Explore Industry
                              <ArrowRight className="h-3 w-3 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}