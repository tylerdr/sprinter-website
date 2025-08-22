"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  Plus,
  Trash2,
  Download,
  Send,
  Sparkles,
  TrendingUp,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  ChartBar,
  FileText,
  Users,
  Zap,
  Target,
  Lightbulb,
  ArrowRight,
  Loader2,
  Shield,
  Search,
  FileSearch,
  Bot,
  Brain,
  Briefcase,
} from "lucide-react";
import { generatePortfolioBlueprint } from "./actions";

interface PortfolioCompany {
  id: string;
  name: string;
  industry: string;
  revenue: string;
  employees: string;
  description: string;
}

interface BlueprintResult {
  company: string;
  industry: string;
  aiReadinessScore: number;
  topOpportunities: {
    name: string;
    impact: string;
    effort: string;
    roi: string;
    description: string;
    category: string;
  }[];
  implementationPlan: {
    phase: string;
    timeline: string;
    actions: string[];
  }[];
  estimatedValue: {
    annual: string;
    threeYear: string;
    exitMultiple: string;
  };
}

const industryCategories = [
  "Software & SaaS",
  "Healthcare & Life Sciences",
  "Financial Services",
  "Manufacturing & Industrial",
  "Retail & E-commerce",
  "Business Services",
  "Consumer Goods",
  "Energy & Resources",
  "Real Estate",
  "Media & Entertainment",
];

export default function PortfolioAIBlueprintPage() {
  const [firmName, setFirmName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [fundSize, setFundSize] = useState("");
  
  const [companies, setCompanies] = useState<PortfolioCompany[]>([
    { id: "1", name: "", industry: "", revenue: "", employees: "", description: "" }
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprintResults, setBlueprintResults] = useState<BlueprintResult[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [generationProgress, setGenerationProgress] = useState(0);

  const addCompany = () => {
    const newCompany: PortfolioCompany = {
      id: Date.now().toString(),
      name: "",
      industry: "",
      revenue: "",
      employees: "",
      description: "",
    };
    setCompanies([...companies, newCompany]);
  };

  const removeCompany = (id: string) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  const updateCompany = (id: string, field: keyof PortfolioCompany, value: string) => {
    setCompanies(companies.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const generateBlueprint = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => Math.min(prev + 10, 90));
    }, 500);

    try {
      const results = await generatePortfolioBlueprint({
        firmName,
        contactEmail,
        contactName,
        contactRole,
        fundSize,
        companies: companies.filter(c => c.name && c.industry),
      });
      
      setBlueprintResults(results);
      setCurrentStep(3);
    } catch (error) {
      console.error("Error generating blueprint:", error);
    } finally {
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setIsGenerating(false);
    }
  };

  const downloadPDF = () => {
    // In production, this would generate a real PDF
    console.log("Downloading PDF...");
  };

  const scheduleCall = () => {
    window.open("https://calendly.com/sprinter-ai/portfolio-blueprint-review", "_blank");
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            <Sparkles className="w-3 h-3 mr-1" />
            PE-Exclusive Tool
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Portfolio AI Blueprint Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get a customized AI opportunity matrix for your entire portfolio. 
            See exactly where AI can drive value, with ROI estimates and implementation roadmaps.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { step: 1, label: "Firm Details" },
              { step: 2, label: "Portfolio Companies" },
              { step: 3, label: "AI Blueprint" },
            ].map((item, idx) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= item.step
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {currentStep > item.step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    item.step
                  )}
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  {item.label}
                </span>
                {idx < 2 && (
                  <div
                    className={`w-20 h-0.5 mx-4 ${
                      currentStep > item.step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Tell us about your firm</CardTitle>
                  <CardDescription>
                    This information helps us customize the AI opportunities for your specific context
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firmName">PE Firm Name *</Label>
                      <Input
                        id="firmName"
                        value={firmName}
                        onChange={(e) => setFirmName(e.target.value)}
                        placeholder="Acme Capital Partners"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fundSize">Fund Size</Label>
                      <Input
                        id="fundSize"
                        value={fundSize}
                        onChange={(e) => setFundSize(e.target.value)}
                        placeholder="$2B AUM"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Your Name *</Label>
                      <Input
                        id="contactName"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactRole">Your Role</Label>
                      <Input
                        id="contactRole"
                        value={contactRole}
                        onChange={(e) => setContactRole(e.target.value)}
                        placeholder="Operating Partner"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Business Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="john@acmecapital.com"
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll send your blueprint here and never spam
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      disabled={!firmName || !contactName || !contactEmail}
                    >
                      Continue
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Add your portfolio companies</CardTitle>
                  <CardDescription>
                    Add 3-10 companies to get the most valuable insights. 
                    We'll analyze AI opportunities for each one.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {companies.map((company, index) => (
                    <Card key={company.id} className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-medium">Company {index + 1}</h4>
                        {companies.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCompany(company.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company Name *</Label>
                          <Input
                            value={company.name}
                            onChange={(e) => updateCompany(company.id, "name", e.target.value)}
                            placeholder="TechCo Inc."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Industry *</Label>
                          <select
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            value={company.industry}
                            onChange={(e) => updateCompany(company.id, "industry", e.target.value)}
                          >
                            <option value="">Select industry...</option>
                            {industryCategories.map(industry => (
                              <option key={industry} value={industry}>{industry}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Annual Revenue</Label>
                          <Input
                            value={company.revenue}
                            onChange={(e) => updateCompany(company.id, "revenue", e.target.value)}
                            placeholder="$50M"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Employees</Label>
                          <Input
                            value={company.employees}
                            onChange={(e) => updateCompany(company.id, "employees", e.target.value)}
                            placeholder="200"
                          />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Label>Brief Description</Label>
                        <Textarea
                          value={company.description}
                          onChange={(e) => updateCompany(company.id, "description", e.target.value)}
                          placeholder="B2B SaaS platform for supply chain management..."
                          rows={2}
                        />
                      </div>
                    </Card>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={addCompany}
                    className="w-full"
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Add Another Company
                  </Button>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={generateBlueprint}
                      disabled={!companies.some(c => c.name && c.industry) || isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          Generating Blueprint...
                        </>
                      ) : (
                        <>
                          Generate AI Blueprint
                          <Sparkles className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  {isGenerating && (
                    <div className="space-y-2">
                      <Progress value={generationProgress} />
                      <p className="text-sm text-center text-muted-foreground">
                        Analyzing portfolio opportunities...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && blueprintResults.length > 0 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Summary Card */}
              <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">
                        Your Portfolio AI Blueprint is Ready!
                      </CardTitle>
                      <CardDescription className="mt-2">
                        We've identified {blueprintResults.reduce((acc, r) => acc + r.topOpportunities.length, 0)} AI opportunities 
                        across your {blueprintResults.length} portfolio companies
                      </CardDescription>
                    </div>
                    <Shield className="w-12 h-12 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        $
                        {Math.round(blueprintResults.reduce((acc, r) => 
                          acc + parseInt(r.estimatedValue.annual.replace(/[^0-9]/g, "")), 0
                        ) / 1000000)}
                        M
                      </div>
                      <p className="text-sm text-muted-foreground">Total Annual Value</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-500">
                        {Math.round(blueprintResults.reduce((acc, r) => acc + r.aiReadinessScore, 0) / blueprintResults.length)}
                        /100
                      </div>
                      <p className="text-sm text-muted-foreground">Avg AI Readiness</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-500">
                        90 days
                      </div>
                      <p className="text-sm text-muted-foreground">To First ROI</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button onClick={downloadPDF} className="flex-1">
                      <Download className="mr-2 w-4 h-4" />
                      Download Full Report (PDF)
                    </Button>
                    <Button onClick={scheduleCall} variant="outline" className="flex-1">
                      <Users className="mr-2 w-4 h-4" />
                      Schedule Review Call
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Company Results */}
              <Tabs defaultValue={blueprintResults[0]?.company} className="space-y-4">
                <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {blueprintResults.map((result) => (
                    <TabsTrigger key={result.company} value={result.company}>
                      {result.company}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {blueprintResults.map((result) => (
                  <TabsContent key={result.company} value={result.company} className="space-y-6">
                    {/* Company Overview */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{result.company}</CardTitle>
                            <Badge variant="outline" className="mt-2">
                              {result.industry}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {result.aiReadinessScore}/100
                            </div>
                            <p className="text-xs text-muted-foreground">AI Readiness Score</p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* Top Opportunities */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-yellow-500" />
                          Top AI Opportunities
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {result.topOpportunities.map((opp, idx) => (
                          <Card key={idx} className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{opp.name}</h4>
                                <Badge variant="secondary" className="mt-1">
                                  {opp.category}
                                </Badge>
                              </div>
                              <Badge variant="default" className="bg-green-500">
                                {opp.roi} ROI
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {opp.description}
                            </p>
                            <div className="flex gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span className="font-medium">Impact:</span> {opp.impact}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">Effort:</span> {opp.effort}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Implementation Roadmap */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-500" />
                          Implementation Roadmap
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {result.implementationPlan.map((phase, idx) => (
                            <div key={idx} className="flex gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  {idx + 1}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold">{phase.phase}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{phase.timeline}</p>
                                <ul className="space-y-1">
                                  {phase.actions.map((action, actionIdx) => (
                                    <li key={actionIdx} className="flex items-start gap-2 text-sm">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                      <span>{action}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Value Estimates */}
                    <Card className="border-green-500/20 bg-green-500/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-500" />
                          Estimated Value Creation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <p className="text-sm text-muted-foreground">Annual Impact</p>
                            <p className="text-2xl font-bold text-green-500">
                              {result.estimatedValue.annual}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">3-Year Value</p>
                            <p className="text-2xl font-bold text-green-500">
                              {result.estimatedValue.threeYear}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Exit Multiple Impact</p>
                            <p className="text-2xl font-bold text-green-500">
                              {result.estimatedValue.exitMultiple}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Next Steps CTA */}
              <Card className="mt-8 border-primary/30 bg-gradient-to-br from-primary/10 to-purple-600/10">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Ready to Implement These Opportunities?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Our team has helped 50+ PE firms deploy these exact AI solutions. 
                    Let's discuss your specific portfolio and create an implementation plan.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button size="lg" onClick={scheduleCall}>
                      Schedule Strategy Call
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a href="/ai-sprint">
                        Start with 1-Week Sprint
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}