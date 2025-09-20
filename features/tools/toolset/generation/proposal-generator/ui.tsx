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
import { Switch } from "@/components/ui/switch";
import {
  FileText,
  Users,
  DollarSign,
  Clock,
  Target,
  Download,
  Send,
  CheckCircle,
  AlertTriangle,
  Award,
  Briefcase,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { ProposalGeneratorInput, ProposalGeneratorOutput } from "./tool";

interface ProposalGeneratorUIProps {
  onGenerate: (input: ProposalGeneratorInput) => Promise<ProposalGeneratorOutput>;
}

export function ProposalGeneratorUI({ onGenerate }: ProposalGeneratorUIProps) {
  const [clientName, setClientName] = useState("Acme Corporation");
  const [clientIndustry, setClientIndustry] = useState("Financial Services");
  const [projectType, setProjectType] = useState<"consulting" | "software_development" | "marketing" | "training" | "audit" | "custom">("consulting");
  const [projectScope, setProjectScope] = useState("Digital transformation initiative to modernize legacy systems and improve operational efficiency across all business units.");
  const [timeline, setTimeline] = useState("6 months");
  const [budget, setBudget] = useState(150000);
  const [stakeholders, setStakeholders] = useState("CEO, CTO, VP Operations, IT Director");
  const [deliverables, setDeliverables] = useState("System architecture, Implementation plan, Training materials, Documentation");
  const [constraints, setConstraints] = useState("Must maintain 99.9% uptime during implementation, Limited budget for external resources");
  const [competitiveAdvantage, setCompetitiveAdvantage] = useState("AI-powered automation and proven methodology");
  const [proposalTone, setProposalTone] = useState<"formal" | "professional" | "friendly" | "technical">("professional");
  const [includeCaseStudies, setIncludeCaseStudies] = useState(true);
  const [includeTestimonials, setIncludeTestimonials] = useState(true);

  const [result, setResult] = useState<ProposalGeneratorOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const input: ProposalGeneratorInput = {
        clientName,
        clientIndustry,
        projectType,
        projectScope,
        timeline,
        budget: budget || undefined,
        keyStakeholders: stakeholders.split(",").map(s => s.trim()).filter(Boolean),
        deliverables: deliverables.split(",").map(d => d.trim()).filter(Boolean),
        constraints: constraints || undefined,
        competitiveAdvantage,
        proposalTone,
        includeCase_studies: includeCaseStudies,
        includeTestimonials: includeTestimonials
      };
      const output = await onGenerate(input);
      setResult(output);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default: return "bg-green-500/10 text-green-600 border-green-500/20";
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
              AI Document Generation
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Proposal Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create professional, compelling proposals instantly with AI-powered content generation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientIndustry">Industry</Label>
                    <Input
                      id="clientIndustry"
                      value={clientIndustry}
                      onChange={(e) => setClientIndustry(e.target.value)}
                      placeholder="e.g., Financial Services, Healthcare"
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select value={projectType} onValueChange={(value: any) => setProjectType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="software_development">Software Development</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="audit">Audit</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="stakeholders">Key Stakeholders</Label>
                    <Input
                      id="stakeholders"
                      value={stakeholders}
                      onChange={(e) => setStakeholders(e.target.value)}
                      placeholder="CEO, CTO, VP Operations (comma-separated)"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="projectScope">Project Scope</Label>
                    <Textarea
                      id="projectScope"
                      value={projectScope}
                      onChange={(e) => setProjectScope(e.target.value)}
                      placeholder="Detailed project scope and requirements..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timeline">Timeline</Label>
                      <Input
                        id="timeline"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        placeholder="e.g., 3 months"
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget ($)</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="deliverables">Key Deliverables</Label>
                    <Textarea
                      id="deliverables"
                      value={deliverables}
                      onChange={(e) => setDeliverables(e.target.value)}
                      placeholder="Expected deliverables (comma-separated)"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="constraints">Constraints</Label>
                    <Textarea
                      id="constraints"
                      value={constraints}
                      onChange={(e) => setConstraints(e.target.value)}
                      placeholder="Known constraints or limitations"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Proposal Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="competitiveAdvantage">Competitive Advantage</Label>
                    <Input
                      id="competitiveAdvantage"
                      value={competitiveAdvantage}
                      onChange={(e) => setCompetitiveAdvantage(e.target.value)}
                      placeholder="Your unique value proposition"
                    />
                  </div>

                  <div>
                    <Label htmlFor="proposalTone">Proposal Tone</Label>
                    <Select value={proposalTone} onValueChange={(value: any) => setProposalTone(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeCaseStudies">Include Case Studies</Label>
                      <Switch
                        id="includeCaseStudies"
                        checked={includeCaseStudies}
                        onCheckedChange={setIncludeCaseStudies}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeTestimonials">Include Testimonials</Label>
                      <Switch
                        id="includeTestimonials"
                        checked={includeTestimonials}
                        onCheckedChange={setIncludeTestimonials}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    className="w-full"
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating Proposal..." : "Generate AI Proposal"}
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
                        <Briefcase className="w-5 h-5" />
                        Executive Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{result.executiveSummary}</p>
                    </CardContent>
                  </Card>

                  {/* Investment Overview */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-green-500/20 bg-green-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Investment</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                              ${result.investmentBreakdown.totalInvestment.toLocaleString()}
                            </p>
                          </div>
                          <DollarSign className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-500/20 bg-blue-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">
                              {timeline}
                            </p>
                          </div>
                          <Clock className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 bg-purple-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                            <p className="text-3xl font-bold text-purple-600 mt-2">
                              {result.teamAndExpertise.teamComposition.length}
                            </p>
                          </div>
                          <Users className="w-8 h-8 text-purple-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Problem Statement */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Problem Statement & Opportunity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{result.problemStatement}</p>
                    </CardContent>
                  </Card>

                  {/* Proposed Solution */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Proposed Solution</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Approach & Methodology</h4>
                        <p className="text-sm text-muted-foreground mb-4">{result.proposedSolution.approach}</p>
                        <p className="text-sm text-muted-foreground">{result.proposedSolution.methodology}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-4">Project Phases</h4>
                        <div className="space-y-4">
                          {result.proposedSolution.phases.map((phase, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-medium">{phase.phase}</h5>
                                <Badge variant="outline">{phase.duration}</Badge>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium mb-2">Activities:</p>
                                  <ul className="space-y-1">
                                    {phase.activities.slice(0, 3).map((activity, i) => (
                                      <li key={i} className="text-xs flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                                        {activity}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-2">Deliverables:</p>
                                  <ul className="space-y-1">
                                    {phase.deliverables.map((deliverable, i) => (
                                      <li key={i} className="text-xs flex items-start gap-2">
                                        <CheckCircle className="w-3 h-3 text-green-500 mt-1" />
                                        {deliverable}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Investment Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Investment Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {result.investmentBreakdown.breakdown.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{item.category}</p>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <p className="font-semibold">${item.amount.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium">Payment Terms</p>
                        <p className="text-sm text-muted-foreground">{result.investmentBreakdown.paymentTerms}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Team & Expertise */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Team & Expertise
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-3">Team Composition</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {result.teamAndExpertise.teamComposition.map((member, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium">{member.role}</h5>
                                <Badge variant="outline">{member.allocation}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{member.expertise}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Relevant Experience</h4>
                          <ul className="space-y-1">
                            {result.teamAndExpertise.relevantExperience.map((exp, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <Award className="w-4 h-4 text-blue-500 mt-0.5" />
                                {exp}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Certifications</h4>
                          <ul className="space-y-1">
                            {result.teamAndExpertise.certifications.map((cert, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                {cert}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Mitigation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Risk Mitigation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.riskMitigation.map((risk, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium">{risk.risk}</h4>
                            <div className="flex gap-2">
                              <Badge className={getRiskColor(risk.likelihood)}>
                                {risk.likelihood} probability
                              </Badge>
                              <Badge className={getRiskColor(risk.impact)}>
                                {risk.impact} impact
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Mitigation:</strong> {risk.mitigation}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Expected Outcomes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Expected Outcomes & ROI
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-3">Business Impact</h4>
                        <ul className="space-y-2">
                          {result.expectedOutcomes.businessImpact.map((impact, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                              {impact}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Key Performance Indicators</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          {result.expectedOutcomes.kpis.map((kpi, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <h5 className="font-medium text-sm">{kpi.metric}</h5>
                              <p className="text-xs text-muted-foreground mt-1">
                                From: {kpi.baseline}
                              </p>
                              <p className="text-xs text-green-600 font-medium">
                                Target: {kpi.target}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium">Return on Investment</p>
                        <p className="text-lg font-semibold text-green-600">{result.expectedOutcomes.roi}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Next Steps */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Next Steps
                      </CardTitle>
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

                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">{result.contactInformation.primaryContact}</p>
                          <p className="text-sm text-muted-foreground">{result.contactInformation.email}</p>
                          <p className="text-sm text-muted-foreground">{result.contactInformation.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{result.contactInformation.availability}</p>
                          <p className="text-sm font-medium mt-2">{result.proposalValidityPeriod}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <Card className="border-2 border-purple-500/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-3">
                        <Button className="w-full gap-2" size="lg">
                          <Download className="w-4 h-4" />
                          Download Proposal PDF
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" className="gap-2">
                            <Send className="w-4 h-4" />
                            Send to Client
                          </Button>
                          <Link href="/ai-sprint" className="w-full">
                            <Button variant="outline" className="w-full">
                              Start Proposal Sprint
                            </Button>
                          </Link>
                        </div>
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
                      Configure your client and project details to create a professional proposal
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