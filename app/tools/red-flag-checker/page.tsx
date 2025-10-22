"use client";

import { useState } from "react";
import { AlertTriangle, FileText, Copy, Download, Shield, Gavel, DollarSign, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { FileUploader } from "@/components/tools/FileUploader";
import { RedFlagCard, RedFlagSummary, type RedFlag } from "@/components/tools/RedFlagCard";
import { EmailCaptureModal, type LeadData } from "@/components/tools/EmailCaptureModal";
import { cn } from "@/lib/utils";

interface AnalysisProgress {
  stage: string;
  progress: number;
  message: string;
}

const CATEGORY_ICONS = {
  liability: Shield,
  penalties: DollarSign,
  warranty: Clock,
  insurance: Shield,
  termination: Gavel,
  scope: FileText,
  payment: DollarSign
};

const CATEGORY_DESCRIPTIONS = {
  liability: "Liability and indemnification clauses",
  penalties: "Liquidated damages and penalty terms", 
  warranty: "Warranty and guarantee requirements",
  insurance: "Insurance and bonding obligations",
  termination: "Contract termination conditions",
  scope: "Scope and change management",
  payment: "Payment terms and conditions"
};

export default function RedFlagCheckerPage() {
  const [textInput, setTextInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress | null>(null);
  const [redFlags, setRedFlags] = useState<RedFlag[]>([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [dataUnlocked, setDataUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<"text" | "file">("text");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

  const mockRedFlags: RedFlag[] = [
    {
      id: "rf-001",
      title: "Unlimited Contractor Liability",
      description: "No cap on contractor's financial liability for damages",
      severity: "critical",
      category: "liability",
      riskScore: 9,
      impact: "Exposure to claims far exceeding contract value, potentially bankrupting the contractor",
      recommendation: "Negotiate liability cap at 2-3x contract value with exclusions for gross negligence",
      location: { page: 4, paragraph: 3, text: "Contractor shall be liable for all damages, costs, and expenses arising from..." },
      suggestedClause: "Contractor's aggregate liability under this Agreement shall not exceed two (2) times the total contract value, except in cases of gross negligence or willful misconduct."
    },
    {
      id: "rf-002",
      title: "Excessive Liquidated Damages",
      description: "Daily penalty rate of 2% exceeds industry standard",
      severity: "high", 
      category: "penalties",
      riskScore: 8,
      impact: "Could result in penalties exceeding 50% of contract value within a month of delay",
      recommendation: "Negotiate rate to 0.25-0.5% per day with total cap at 10% of contract value",
      location: { page: 7, paragraph: 2, text: "Liquidated damages at the rate of 2% of contract value per day..." },
      suggestedClause: "Liquidated damages shall be assessed at 0.25% per day of delay, not to exceed 10% of the total contract value."
    },
    {
      id: "rf-003",
      title: "Inadequate Force Majeure Protection",
      description: "Limited force majeure clause excludes common disruptions",
      severity: "high",
      category: "termination", 
      riskScore: 7,
      impact: "No protection against delays due to supply chain issues, labor shortages, or regulatory changes",
      recommendation: "Expand force majeure to include supply chain, regulatory, and third-party delays",
      location: { page: 12, paragraph: 1, text: "Force Majeure shall only include acts of God and war..." },
      suggestedClause: "Force Majeure events include acts of God, war, terrorism, epidemics, government actions, supply chain disruptions, labor disputes, and regulatory changes beyond contractor's control."
    },
    {
      id: "rf-004",
      title: "Broad Indemnification Scope",
      description: "Contractor must indemnify client for any and all claims",
      severity: "critical",
      category: "liability",
      riskScore: 9,
      impact: "Contractor liable even for client's own negligence and unrelated third-party claims",
      recommendation: "Limit indemnification to contractor's negligent acts and exclude client negligence",
      suggestedClause: "Contractor shall indemnify Client only for claims arising from Contractor's negligent acts or omissions, excluding any claims arising from Client's negligence."
    },
    {
      id: "rf-005",
      title: "Unrealistic Performance Bond",
      description: "100% performance bond requirement for low-risk services",
      severity: "medium",
      category: "insurance", 
      riskScore: 6,
      impact: "Significant upfront cost and potential cash flow restrictions",
      recommendation: "Negotiate reduced bond percentage or alternative security",
      location: { page: 9, paragraph: 4, text: "Contractor shall provide 100% performance bond..." },
      suggestedClause: "Contractor shall provide a performance bond equal to 25% of contract value, or alternative security acceptable to Client."
    },
    {
      id: "rf-006",
      title: "Vague Change Order Process",
      description: "No defined timeline or approval process for scope changes",
      severity: "medium",
      category: "scope",
      riskScore: 5,
      impact: "Disputes over additional work authorization and payment delays",
      recommendation: "Define clear change order procedures with specific timelines",
      suggestedClause: "All scope changes require written authorization within 10 business days of submission, with agreed pricing before work commencement."
    }
  ];

  const handleAnalyze = async (input: string | File) => {
    setIsAnalyzing(true);
    setRedFlags([]);
    
    const stages = [
      { stage: "parsing", message: "Parsing document content...", progress: 20 },
      { stage: "extraction", message: "Extracting contract clauses...", progress: 40 },
      { stage: "analysis", message: "Analyzing risk patterns...", progress: 60 },
      { stage: "categorization", message: "Categorizing red flags...", progress: 80 },
      { stage: "complete", message: "Analysis complete!", progress: 100 }
    ];

    for (const stage of stages) {
      setAnalysisProgress(stage);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Filter by selected categories if any
    let filteredFlags = mockRedFlags;
    if (selectedCategories.size > 0) {
      filteredFlags = mockRedFlags.filter(flag => selectedCategories.has(flag.category));
    }

    setRedFlags(filteredFlags);
    setIsAnalyzing(false);
  };

  const handleTextAnalyze = () => {
    if (!textInput.trim()) return;
    handleAnalyze(textInput);
  };

  const handleFileAnalyze = (file: File) => {
    setSelectedFile(file);
    handleAnalyze(file);
  };

  const toggleCategory = (category: string) => {
    const newSelection = new Set(selectedCategories);
    if (newSelection.has(category)) {
      newSelection.delete(category);
    } else {
      newSelection.add(category);
    }
    setSelectedCategories(newSelection);
  };

  const handleEmailCapture = async (leadData: LeadData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDataUnlocked(true);
    setShowEmailModal(false);
  };

  const handleExport = () => {
    if (!dataUnlocked) {
      setShowEmailModal(true);
      return;
    }

    const exportData = {
      analysis_date: new Date().toISOString(),
      total_red_flags: redFlags.length,
      risk_summary: {
        critical: redFlags.filter(rf => rf.severity === 'critical').length,
        high: redFlags.filter(rf => rf.severity === 'high').length,
        medium: redFlags.filter(rf => rf.severity === 'medium').length,
        low: redFlags.filter(rf => rf.severity === 'low').length
      },
      red_flags: redFlags,
      source: selectedFile?.name || "Text Input"
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `red-flag-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyAllSuggestions = async () => {
    const suggestions = redFlags
      .filter(rf => rf.suggestedClause)
      .map(rf => `${rf.title}:\n${rf.suggestedClause}`)
      .join('\n\n');
    
    try {
      await navigator.clipboard.writeText(suggestions);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold gradient-text">Red Flag Checker</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Paste contract text or upload a document to identify risky clauses, assess severity, 
            and get suggested safer language for your negotiations.
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Risk Assessment
            </div>
            <div className="flex items-center gap-2">
              <Gavel className="w-4 h-4" />
              Suggested Clauses
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportable Analysis
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-12">
        {!isAnalyzing && redFlags.length === 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Category Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Focus Areas (Optional)</CardTitle>
                <CardDescription>
                  Select specific contract areas to analyze, or leave blank to analyze all risk categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(CATEGORY_DESCRIPTIONS).map(([category, description]) => {
                    const IconComponent = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS];
                    const isSelected = selectedCategories.has(category);
                    
                    return (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all text-sm",
                          isSelected 
                            ? "border-brand bg-brand/10 text-brand" 
                            : "border-muted hover:border-muted-foreground/50"
                        )}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium capitalize">{category}</span>
                        <span className="text-xs text-muted-foreground text-center leading-tight">
                          {description}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                {selectedCategories.size > 0 && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Selected categories:</span>
                    {Array.from(selectedCategories).map(category => (
                      <Badge key={category} variant="secondary" className="capitalize">
                        {category}
                      </Badge>
                    ))}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedCategories(new Set())}
                    >
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Input Methods */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "text" | "file")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">Paste Text</TabsTrigger>
                <TabsTrigger value="file">Upload File</TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Paste Contract Text</CardTitle>
                    <CardDescription>
                      Copy and paste the contract sections you want to analyze
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Paste your contract text here... For example, liability clauses, payment terms, warranty sections, etc."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      rows={12}
                      className="resize-none"
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {textInput.length} characters • Analyzing {selectedCategories.size || "all"} categories
                      </div>
                      <Button 
                        onClick={handleTextAnalyze} 
                        disabled={!textInput.trim()}
                        className="gap-2"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        Analyze Red Flags
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="file" className="mt-6">
                <FileUploader
                  onFileSelect={handleFileAnalyze}
                  accept=".pdf,.doc,.docx,.txt"
                  maxSizeMB={10}
                  title="Upload Contract Document"
                  description="Support for PDF, Word, and text files. We'll analyze the entire document for red flags."
                />
              </TabsContent>
            </Tabs>

            {/* Sample Analysis */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Or try a sample analysis:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const sampleText = "The Contractor shall indemnify, defend, and hold harmless the Client from and against any and all claims, damages, losses, and expenses arising out of or resulting from the performance of this Agreement, regardless of cause. Liquidated damages shall be assessed at 2% of the contract value per day for any delay in completion.";
                    setTextInput(sampleText);
                    setActiveTab("text");
                  }}
                >
                  High-Risk Clauses
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const sampleFile = new File(['sample'], 'construction-contract.pdf', { type: 'application/pdf' });
                    handleFileAnalyze(sampleFile);
                  }}
                >
                  Construction Contract
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const sampleFile = new File(['sample'], 'service-agreement.pdf', { type: 'application/pdf' });
                    handleFileAnalyze(sampleFile);
                  }}
                >
                  Service Agreement
                </Button>
              </div>
            </div>
          </div>
        ) : isAnalyzing ? (
          // Processing State
          <div className="max-w-xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <div className="w-6 h-6 border-2 border-red-500 border-t-transparent animate-spin rounded-full" />
                  Analyzing for Red Flags
                </CardTitle>
                <CardDescription>
                  {selectedFile ? `Processing: ${selectedFile.name}` : "Analyzing pasted text"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisProgress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{analysisProgress.message}</span>
                      <span>{analysisProgress.progress}%</span>
                    </div>
                    <Progress value={analysisProgress.progress} />
                  </div>
                )}
                
                <div className="text-center text-sm text-muted-foreground">
                  Analyzing contract language patterns and risk indicators...
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Results State
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Results Header */}
            <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      Red Flag Analysis Complete
                    </CardTitle>
                    <CardDescription>
                      Source: {selectedFile?.name || "Pasted Text"}
                    </CardDescription>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyAllSuggestions}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Suggestions
                    </Button>
                    <Button onClick={handleExport} size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Analysis
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Summary */}
            <RedFlagSummary redFlags={redFlags} />

            {/* Red Flags by Severity */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Detailed Analysis</h2>
              
              {(['critical', 'high', 'medium', 'low'] as const).map(severity => {
                const severityFlags = redFlags.filter(rf => rf.severity === severity);
                if (severityFlags.length === 0) return null;

                return (
                  <div key={severity} className="space-y-3">
                    <h3 className="text-lg font-medium capitalize flex items-center gap-2">
                      <Badge 
                        variant={severity === 'critical' || severity === 'high' ? 'destructive' : 'secondary'}
                        className="capitalize"
                      >
                        {severity} Risk
                      </Badge>
                      <span className="text-muted-foreground">({severityFlags.length} issues)</span>
                    </h3>
                    
                    <div className="grid gap-4">
                      {severityFlags.slice(0, dataUnlocked ? severityFlags.length : Math.min(2, severityFlags.length)).map(redFlag => (
                        <RedFlagCard
                          key={redFlag.id}
                          redFlag={redFlag}
                          showSuggestedClause={dataUnlocked}
                        />
                      ))}
                      
                      {!dataUnlocked && severityFlags.length > 2 && (
                        <Card className="border-dashed">
                          <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground mb-4">
                              + {severityFlags.length - 2} more {severity} risk issues with suggested clause language
                            </p>
                            <Button onClick={() => setShowEmailModal(true)}>
                              Unlock All {severity.charAt(0).toUpperCase() + severity.slice(1)} Risk Analysis
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer */}
            <Alert>
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <strong>Legal Disclaimer:</strong> This analysis is for informational purposes only and should not be 
                considered legal advice. Always consult with qualified legal counsel before making contract decisions.
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                onClick={() => {
                  setRedFlags([]);
                  setTextInput("");
                  setSelectedFile(null);
                  setDataUnlocked(false);
                }} 
                size="lg"
                variant="outline"
              >
                Analyze Another Document
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailCapture}
        title="Unlock Complete Risk Analysis"
        description="Get the full detailed analysis with suggested contract language for all identified red flags."
        benefits={[
          `Complete analysis of all ${redFlags.length} red flags identified`,
          "Suggested safer clause language for each risk",
          "Contract negotiation talking points",
          "Exportable analysis report (JSON and PDF)",
          "Priority legal review recommendations"
        ]}
        buttonText="Get Full Analysis"
        downloadType="export"
      />
    </div>
  );
}