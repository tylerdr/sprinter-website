"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Scale,
  Shield,
  AlertTriangle,
  Download,
  CheckCircle,
  Building,
  User,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { ContractBuilderInput, ContractBuilderOutput } from "./tool";

interface ContractBuilderUIProps {
  onGenerate: (input: ContractBuilderInput) => Promise<ContractBuilderOutput>;
}

export function ContractBuilderUI({ onGenerate }: ContractBuilderUIProps) {
  const [contractType, setContractType] = useState<"service_agreement" | "nda" | "employment" | "partnership" | "licensing" | "sales" | "consulting" | "custom">("service_agreement");

  // Party A details
  const [partyAName, setPartyAName] = useState("Sprinter AI Inc.");
  const [partyAType, setPartyAType] = useState<"individual" | "company" | "organization">("company");
  const [partyAAddress, setPartyAAddress] = useState("123 Innovation Drive, San Francisco, CA 94102");
  const [partyAJurisdiction, setPartyAJurisdiction] = useState("Delaware");

  // Party B details
  const [partyBName, setPartyBName] = useState("Client Company LLC");
  const [partyBType, setPartyBType] = useState<"individual" | "company" | "organization">("company");
  const [partyBAddress, setPartyBAddress] = useState("456 Business Blvd, New York, NY 10001");
  const [partyBJurisdiction, setPartyBJurisdiction] = useState("New York");

  // Contract terms
  const [duration, setDuration] = useState("12 months");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [scope, setScope] = useState("AI consulting and implementation services for digital transformation");

  // Compensation
  const [amount, setAmount] = useState(100000);
  const [structure, setStructure] = useState<"fixed" | "hourly" | "milestone" | "commission" | "equity" | "other">("fixed");
  const [paymentTerms, setPaymentTerms] = useState("30% upfront, 40% at milestone completion, 30% upon delivery");

  const [deliverables, setDeliverables] = useState("AI strategy development,System implementation,Training and support,Documentation");
  const [jurisdictionLaw, setJurisdictionLaw] = useState("California");
  const [confidentialityLevel, setConfidentialityLevel] = useState<"none" | "standard" | "high" | "mutual">("standard");
  const [disputeResolution, setDisputeResolution] = useState<"litigation" | "arbitration" | "mediation" | "negotiation">("arbitration");

  const [result, setResult] = useState<ContractBuilderOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const input: ContractBuilderInput = {
        contractType,
        partyA: {
          name: partyAName,
          type: partyAType,
          address: partyAAddress,
          jurisdiction: partyAJurisdiction
        },
        partyB: {
          name: partyBName,
          type: partyBType,
          address: partyBAddress,
          jurisdiction: partyBJurisdiction
        },
        contractTerms: {
          duration,
          startDate,
          renewalTerms: "Automatic renewal for successive 12-month periods unless terminated"
        },
        scope,
        compensation: {
          amount,
          structure,
          paymentTerms,
          currency: "USD"
        },
        deliverables: deliverables.split(",").map(d => d.trim()).filter(Boolean),
        keyProvisions: [
          "Intellectual property ownership",
          "Work product ownership",
          "Non-compete restrictions",
          "Data protection requirements"
        ],
        jurisdiction_law: jurisdictionLaw,
        terminationClauses: [
          "Either party may terminate with 30 days written notice",
          "Immediate termination for material breach",
          "Termination for convenience with notice period"
        ],
        confidentialityLevel,
        liability_limitations: "Liability shall be limited to the total contract value, excluding gross negligence or willful misconduct",
        disputeResolution
      };
      const output = await onGenerate(input);
      setResult(output);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getRiskColor = (severity: string) => {
    switch (severity) {
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
              <Scale className="w-4 h-4" />
              Legal Document Generator
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Contract Builder
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate professional contracts with AI assistance and built-in legal guidance
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contract Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="contractType">Contract Type</Label>
                    <Select value={contractType} onValueChange={(value: any) => setContractType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="service_agreement">Service Agreement</SelectItem>
                        <SelectItem value="consulting">Consulting Agreement</SelectItem>
                        <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                        <SelectItem value="employment">Employment Contract</SelectItem>
                        <SelectItem value="partnership">Partnership Agreement</SelectItem>
                        <SelectItem value="licensing">Licensing Agreement</SelectItem>
                        <SelectItem value="sales">Sales Contract</SelectItem>
                        <SelectItem value="custom">Custom Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g., 12 months"
                      />
                    </div>
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="jurisdictionLaw">Governing Law</Label>
                    <Input
                      id="jurisdictionLaw"
                      value={jurisdictionLaw}
                      onChange={(e) => setJurisdictionLaw(e.target.value)}
                      placeholder="e.g., California, New York"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="confidentialityLevel">Confidentiality</Label>
                      <Select value={confidentialityLevel} onValueChange={(value: any) => setConfidentialityLevel(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="mutual">Mutual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="disputeResolution">Dispute Resolution</Label>
                      <Select value={disputeResolution} onValueChange={(value: any) => setDisputeResolution(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="litigation">Litigation</SelectItem>
                          <SelectItem value="arbitration">Arbitration</SelectItem>
                          <SelectItem value="mediation">Mediation</SelectItem>
                          <SelectItem value="negotiation">Negotiation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Party Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Party A (Provider)
                    </h4>
                    <div className="space-y-3">
                      <Input
                        value={partyAName}
                        onChange={(e) => setPartyAName(e.target.value)}
                        placeholder="Company/Individual name"
                      />
                      <Select value={partyAType} onValueChange={(value: any) => setPartyAType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="organization">Organization</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={partyAAddress}
                        onChange={(e) => setPartyAAddress(e.target.value)}
                        placeholder="Address"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Party B (Client)
                    </h4>
                    <div className="space-y-3">
                      <Input
                        value={partyBName}
                        onChange={(e) => setPartyBName(e.target.value)}
                        placeholder="Company/Individual name"
                      />
                      <Select value={partyBType} onValueChange={(value: any) => setPartyBType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="organization">Organization</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={partyBAddress}
                        onChange={(e) => setPartyBAddress(e.target.value)}
                        placeholder="Address"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Terms & Compensation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="scope">Scope of Work</Label>
                    <Textarea
                      id="scope"
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      placeholder="Detailed scope of work or services..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="deliverables">Key Deliverables</Label>
                    <Textarea
                      id="deliverables"
                      value={deliverables}
                      onChange={(e) => setDeliverables(e.target.value)}
                      placeholder="Deliverable 1, Deliverable 2, etc."
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Amount ($)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="structure">Structure</Label>
                      <Select value={structure} onValueChange={(value: any) => setStructure(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Fee</SelectItem>
                          <SelectItem value="hourly">Hourly Rate</SelectItem>
                          <SelectItem value="milestone">Milestone</SelectItem>
                          <SelectItem value="commission">Commission</SelectItem>
                          <SelectItem value="equity">Equity</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Input
                      id="paymentTerms"
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      placeholder="Payment schedule and terms"
                    />
                  </div>

                  <Button
                    onClick={handleGenerate}
                    className="w-full"
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating Contract..." : "Generate AI Contract"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {result ? (
                <>
                  {/* Contract Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {result.contractTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{result.preamble}</p>
                    </CardContent>
                  </Card>

                  {/* Main Clauses */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contract Terms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.mainClauses.slice(0, 5).map((clause, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">
                            Clause {clause.clause}: {clause.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">{clause.content}</p>
                          {clause.subclauses && (
                            <ul className="space-y-1">
                              {clause.subclauses.slice(0, 3).map((subclause, i) => (
                                <li key={i} className="text-xs flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                                  {subclause}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Risk Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.riskAssessment.map((risk, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{risk.risk}</h4>
                            <Badge className={getRiskColor(risk.severity)}>
                              {risk.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Mitigation:</strong> {risk.mitigation}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Legal Compliance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Legal Compliance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Compliance Notes</h4>
                        <ul className="space-y-1">
                          {result.legalCompliance.complianceNotes.map((note, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Jurisdiction Requirements</h4>
                        <ul className="space-y-1">
                          {result.legalCompliance.jurisdiction_requirements.map((req, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Legal Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <Card className="border-2 border-purple-500/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-3">
                        <Button className="w-full gap-2" size="lg">
                          <Download className="w-4 h-4" />
                          Download Contract PDF
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" className="gap-2">
                            <Scale className="w-4 h-4" />
                            Legal Review
                          </Button>
                          <Link href="/ai-sprint" className="w-full">
                            <Button variant="outline" className="w-full">
                              Legal Sprint
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
                    <Scale className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Ready to Generate</p>
                    <p className="text-muted-foreground">
                      Configure contract details to generate a professional legal document
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