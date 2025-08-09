"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Building2, Users, TrendingUp, Shield } from "lucide-react";
import { createAudit } from "./actions";
import { LabLayout } from "@/components/labs/LabLayout";

const auditSchema = z.object({
  role: z.enum(["Founder", "CEO", "Influencer", "Creator", "Investor", "PE", "Operator"]),
  industry: z.string().min(2, "Industry is required"),
  company: z.string().min(2, "Company name is required"),
  companyUrl: z.string().url().optional().or(z.literal("")),
  systems: z.array(z.string()).min(1, "Select at least one system"),
  painPoints: z.array(z.string()).min(1, "Select at least one pain point").max(3, "Select up to 3 pain points"),
  objectives: z.array(z.string()).min(1, "Select at least one objective"),
  email: z.string().email("Valid email required"),
});

type AuditFormData = z.infer<typeof auditSchema>;

const SYSTEMS = [
  "Salesforce", "HubSpot", "Google Workspace", "Microsoft 365", "Slack",
  "PostgreSQL", "MongoDB", "Snowflake", "AWS", "Azure", "GCP",
  "SAP", "Oracle", "NetSuite", "Workday", "ServiceNow",
  "Epic", "Cerner", "Athena", "PDFs/Documents", "Custom APIs"
];

const PAIN_POINTS = [
  "Manual data entry eating hours",
  "Customer response times too slow",
  "Cannot scale operations with headcount",
  "Insights buried in data silos",
  "Compliance documentation nightmare",
  "Repetitive tasks burning out team",
  "Competitor moving faster with AI",
  "Missing revenue opportunities",
  "Quality control inconsistent"
];

const OBJECTIVES = [
  "10x revenue per employee",
  "Cut operational costs 40%+",
  "Launch new AI product line",
  "Automate 80% of routine work",
  "Real-time intelligence from data",
  "Regulatory compliance automation",
  "Customer experience transformation",
  "Build competitive moat with AI"
];

export default function OpportunityAuditPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);

  const form = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),
    defaultValues: {
      systems: [],
      painPoints: [],
      objectives: [],
    },
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleSystemToggle = (system: string) => {
    setSelectedSystems(prev =>
      prev.includes(system)
        ? prev.filter(s => s !== system)
        : [...prev, system]
    );
  };

  const handlePainPointToggle = (painPoint: string) => {
    setSelectedPainPoints(prev => {
      if (prev.includes(painPoint)) {
        return prev.filter(p => p !== painPoint);
      }
      if (prev.length < 3) {
        return [...prev, painPoint];
      }
      return prev;
    });
  };

  const handleObjectiveToggle = (objective: string) => {
    setSelectedObjectives(prev =>
      prev.includes(objective)
        ? prev.filter(o => o !== objective)
        : [...prev, objective]
    );
  };

  const nextStep = async () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = await form.trigger(["role", "industry", "company"]);
    } else if (step === 2) {
      form.setValue("systems", selectedSystems);
      isValid = selectedSystems.length > 0;
    } else if (step === 3) {
      form.setValue("painPoints", selectedPainPoints);
      isValid = selectedPainPoints.length > 0 && selectedPainPoints.length <= 3;
    } else if (step === 4) {
      form.setValue("objectives", selectedObjectives);
      isValid = selectedObjectives.length > 0;
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(Math.max(1, step - 1));

  const onSubmit = async (data: AuditFormData) => {
    setLoading(true);
    try {
      const result = await createAudit({
        ...data,
        systems: selectedSystems,
        painPoints: selectedPainPoints,
        objectives: selectedObjectives,
      });
      
      if (result.reportUrl) {
        window.location.href = result.reportUrl;
      }
    } catch (error) {
      console.error("Failed to generate audit:", error);
      setLoading(false);
    }
  };

  return (
    <LabLayout 
      title="AI Opportunity Audit" 
      description="Get your personalized AI roadmap in 10 minutes"
      category="advisory"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
          <div className="text-center space-y-4">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Analysis
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Get Your AI Opportunity Audit
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Personalized, evidence-backed AI roadmap in 10 minutes. Discover your top 3 agentic plays with ROI projections and a 30-day action plan.
            </p>
          </div>

          <Progress value={progress} className="h-2" />

          <Card className="border-border/200 backdrop-blur">
            <CardContent className="pt-6">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <Building2 className="w-6 h-6 text-primary" />
                          Tell us about you
                        </h2>
                        <p className="text-muted-foreground">
                          We&apos;ll customize your audit based on your role and industry.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label>Your Role</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {["Founder", "CEO", "Influencer", "Creator", "Investor", "Operator"].map((role) => (
                              <Button
                                key={role}
                                type="button"
                                variant={form.watch("role") === role ? "default" : "outline"}
                                onClick={() => form.setValue("role", role as "Founder" | "CEO" | "Influencer" | "Creator" | "Investor" | "Operator")}
                                className="justify-start"
                              >
                                {role}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="industry">Industry</Label>
                          <Input
                            id="industry"
                            placeholder="e.g., Healthcare, Finance, E-commerce"
                            {...form.register("industry")}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            placeholder="Your company name"
                            {...form.register("company")}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="companyUrl">Company Website (Optional)</Label>
                          <Input
                            id="companyUrl"
                            type="url"
                            placeholder="https://example.com"
                            {...form.register("companyUrl")}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <Shield className="w-6 h-6 text-primary" />
                          Your Tech Stack
                        </h2>
                        <p className="text-muted-foreground">
                          Select all systems and data sources you currently use.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {SYSTEMS.map((system) => (
                          <Button
                            key={system}
                            type="button"
                            variant={selectedSystems.includes(system) ? "default" : "outline"}
                            onClick={() => handleSystemToggle(system)}
                            className="justify-start text-sm"
                          >
                            {selectedSystems.includes(system) && (
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                            )}
                            {system}
                          </Button>
                        ))}
                      </div>

                      {selectedSystems.length === 0 && (
                        <p className="text-sm text-destructive">Select at least one system</p>
                      )}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <Users className="w-6 h-6 text-primary" />
                          Your Pain Points
                        </h2>
                        <p className="text-muted-foreground">
                          Select your top 1-3 operational challenges.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {PAIN_POINTS.map((painPoint) => (
                          <Button
                            key={painPoint}
                            type="button"
                            variant={selectedPainPoints.includes(painPoint) ? "default" : "outline"}
                            onClick={() => handlePainPointToggle(painPoint)}
                            className="w-full justify-start text-left h-auto py-3 px-4"
                            disabled={!selectedPainPoints.includes(painPoint) && selectedPainPoints.length >= 3}
                          >
                            <div className="flex items-start gap-3">
                              {selectedPainPoints.includes(painPoint) && (
                                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                              )}
                              <span className="text-sm">{painPoint}</span>
                            </div>
                          </Button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Selected: {selectedPainPoints.length}/3
                        </span>
                        {selectedPainPoints.length === 0 && (
                          <span className="text-destructive">Select at least one pain point</span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <TrendingUp className="w-6 h-6 text-primary" />
                          Your Objectives
                        </h2>
                        <p className="text-muted-foreground">
                          What outcomes matter most to your business?
                        </p>
                      </div>

                      <div className="space-y-3">
                        {OBJECTIVES.map((objective) => (
                          <Button
                            key={objective}
                            type="button"
                            variant={selectedObjectives.includes(objective) ? "default" : "outline"}
                            onClick={() => handleObjectiveToggle(objective)}
                            className="w-full justify-start text-left h-auto py-3 px-4"
                          >
                            <div className="flex items-start gap-3">
                              {selectedObjectives.includes(objective) && (
                                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                              )}
                              <span className="text-sm font-medium">{objective}</span>
                            </div>
                          </Button>
                        ))}
                      </div>

                      {selectedObjectives.length === 0 && (
                        <p className="text-sm text-destructive">Select at least one objective</p>
                      )}
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <Sparkles className="w-6 h-6 text-primary" />
                          Get Your Custom Report
                        </h2>
                        <p className="text-muted-foreground">
                          We&apos;ll analyze your inputs and deliver a personalized AI roadmap.
                        </p>
                      </div>

                      <Card className="bg-muted/50">
                        <CardHeader>
                          <CardTitle className="text-lg">Your report will include:</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Top 3 AI Opportunities</p>
                              <p className="text-sm text-muted-foreground">
                                Specific agentic patterns for your use case
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">ROI Projections</p>
                              <p className="text-sm text-muted-foreground">
                                Conservative estimates with clear assumptions
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">30-Day Action Plan</p>
                              <p className="text-sm text-muted-foreground">
                                Week-by-week implementation roadmap
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Risk Assessment</p>
                              <p className="text-sm text-muted-foreground">
                                Data governance and compliance considerations
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            {...form.register("email")}
                            className="mt-2"
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            We&apos;ll send your report here and follow up with implementation support.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Separator className="my-6" />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {step < 5 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="gap-2"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="gap-2 min-w-[200px]"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Generate My Report
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>Average completion time: 7 minutes 42 seconds</p>
            <p className="mt-1">Join 1,247+ leaders who&apos;ve discovered their AI opportunities</p>
          </div>
      </motion.div>
    </LabLayout>
  );
}