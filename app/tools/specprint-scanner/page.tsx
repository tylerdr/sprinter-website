"use client";

import { useState } from "react";
import { FileText, AlertTriangle, Download, Eye, Sparkles, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileUploader } from "@/components/tools/FileUploader";
import { AttributeDisplay, type ExtractedAttribute } from "@/components/tools/AttributeDisplay";
import { RedFlagCard, RedFlagSummary, type RedFlag } from "@/components/tools/RedFlagCard";
import { EmailCaptureModal, type LeadData } from "@/components/tools/EmailCaptureModal";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProcessingStatus {
  stage: string;
  progress: number;
  message: string;
}

export default function SpecPrintScannerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);
  const [extractedAttributes, setExtractedAttributes] = useState<ExtractedAttribute[]>([]);
  const [redFlags, setRedFlags] = useState<RedFlag[]>([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [dataUnlocked, setDataUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  // Mock data for demonstration
  const mockAttributes: ExtractedAttribute[] = [
    {
      name: "Contract Value",
      value: 2500000,
      confidence: 0.95,
      category: "financial",
      unit: "USD",
      source: { page: 1, section: "Terms" },
      description: "Total contract value including all phases"
    },
    {
      name: "Project Duration",
      value: "18 months",
      confidence: 0.88,
      category: "timeline",
      source: { page: 2, section: "Schedule" }
    },
    {
      name: "Warranty Period",
      value: "24 months",
      confidence: 0.92,
      category: "warranty",
      source: { page: 5, section: "Warranty" }
    },
    {
      name: "Liquidated Damages Rate",
      value: "0.5%",
      confidence: 0.76,
      category: "penalties",
      unit: "per day",
      source: { page: 3, section: "Penalties" }
    }
  ];

  const mockRedFlags: RedFlag[] = [
    {
      id: "rf-001",
      title: "Unlimited Liability Clause",
      description: "Contract contains unlimited liability exposure for contractor",
      severity: "critical",
      category: "liability",
      riskScore: 9,
      impact: "Could expose contractor to claims exceeding contract value by 10x or more",
      recommendation: "Add liability cap at contract value or negotiate specific exclusions",
      location: { page: 4, paragraph: 2, text: "Contractor shall be liable for all damages..." },
      suggestedClause: "Contractor's liability shall not exceed the total contract value, except in cases of gross negligence or willful misconduct."
    },
    {
      id: "rf-002", 
      title: "Aggressive Liquidated Damages",
      description: "Daily penalty rate exceeds industry standard",
      severity: "high",
      category: "penalties",
      riskScore: 7,
      impact: "Could result in significant financial penalties for minor delays",
      recommendation: "Negotiate lower rate and add force majeure protections",
      location: { page: 3, paragraph: 5, text: "Liquidated damages of 1.5% per day..." },
      suggestedClause: "Liquidated damages shall be 0.25% per day, capped at 10% of contract value, with extensions for force majeure events."
    },
    {
      id: "rf-003",
      title: "Inadequate Change Order Process",
      description: "No clear process for handling scope changes",
      severity: "medium", 
      category: "scope",
      riskScore: 5,
      impact: "Disputes over additional work and compensation",
      recommendation: "Define clear change order procedures with timelines",
      suggestedClause: "All changes must be documented in writing and approved within 10 business days with agreed pricing."
    }
  ];

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);
    setActiveTab("processing");

    // Simulate processing stages
    const stages = [
      { stage: "upload", message: "Uploading document...", progress: 20 },
      { stage: "ocr", message: "Extracting text from PDF...", progress: 40 },
      { stage: "analysis", message: "Analyzing contract terms...", progress: 60 },
      { stage: "extraction", message: "Extracting key attributes...", progress: 80 },
      { stage: "risks", message: "Identifying red flags...", progress: 100 }
    ];

    for (const stage of stages) {
      setProcessingStatus(stage);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Set results
    setExtractedAttributes(mockAttributes);
    setRedFlags(mockRedFlags);
    setIsProcessing(false);
    setActiveTab("results");
  };

  const handleEmailCapture = async (leadData: LeadData) => {
    // Here you would integrate with your lead capture API
    console.log('Lead captured:', leadData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setDataUnlocked(true);
    setShowEmailModal(false);
  };

  const handleExportClick = () => {
    if (!dataUnlocked) {
      setShowEmailModal(true);
    } else {
      // Export logic here
      const exportData = {
        attributes: extractedAttributes,
        redFlags: redFlags,
        document: selectedFile?.name
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedFile?.name}-analysis.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-start to-brand-end flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold gradient-text">SpecPrint Scanner</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your contract or specification document and get instant analysis of key attributes, 
            risk assessment, and red flag identification.
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              PDF up to 25 pages
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Analysis in 30 seconds
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview results free
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="processing" disabled={!selectedFile}>Processing</TabsTrigger>
            <TabsTrigger value="results" disabled={extractedAttributes.length === 0}>Results</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="mt-8">
            <div className="max-w-2xl mx-auto space-y-6">
              <FileUploader
                onFileSelect={handleFileSelect}
                accept=".pdf"
                maxSizeMB={25}
                maxPages={25}
                title="Upload Contract or Specification"
                description="Drop your PDF here or click to browse. We support contracts, RFPs, specifications, and technical documents."
                disabled={isProcessing}
              />

              {/* Sample documents */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Or try a sample document:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Simulate sample document
                      const sampleFile = new File(['sample'], 'construction-contract-sample.pdf', { type: 'application/pdf' });
                      handleFileSelect(sampleFile);
                    }}
                  >
                    Construction Contract
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const sampleFile = new File(['sample'], 'software-rfp-sample.pdf', { type: 'application/pdf' });
                      handleFileSelect(sampleFile);
                    }}
                  >
                    Software RFP
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const sampleFile = new File(['sample'], 'service-agreement-sample.pdf', { type: 'application/pdf' });
                      handleFileSelect(sampleFile);
                    }}
                  >
                    Service Agreement
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Processing Tab */}
          <TabsContent value="processing" className="mt-8">
            <div className="max-w-xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-brand border-t-transparent animate-spin rounded-full" />
                    Processing Document
                  </CardTitle>
                  <CardDescription>
                    {selectedFile?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {processingStatus && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{processingStatus.message}</span>
                        <span>{processingStatus.progress}%</span>
                      </div>
                      <Progress value={processingStatus.progress} />
                    </div>
                  )}
                  
                  <div className="text-center text-sm text-muted-foreground">
                    This usually takes 15-30 seconds depending on document size
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="mt-8">
            <div className="space-y-6">
              {/* Summary Card */}
              <Card className="bg-gradient-to-r from-brand/5 to-brand/10 border-brand/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Analysis Complete
                  </CardTitle>
                  <CardDescription>
                    Processed: {selectedFile?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-brand">{extractedAttributes.length}</div>
                      <div className="text-xs text-muted-foreground">Attributes Found</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{redFlags.length}</div>
                      <div className="text-xs text-muted-foreground">Red Flags</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {redFlags.filter(rf => rf.severity === 'critical' || rf.severity === 'high').length}
                      </div>
                      <div className="text-xs text-muted-foreground">High Priority</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(extractedAttributes.reduce((sum, attr) => sum + attr.confidence, 0) / extractedAttributes.length * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Confidence</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Extracted Attributes */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand" />
                    Key Attributes
                  </h2>
                  
                  <AttributeDisplay
                    attributes={extractedAttributes}
                    isBlurred={!dataUnlocked}
                    onToggleBlur={() => setShowEmailModal(true)}
                    onExport={handleExportClick}
                    title="Extracted Data"
                  />
                  
                  {!dataUnlocked && (
                    <Alert>
                      <Eye className="w-4 h-4" />
                      <AlertDescription>
                        This is a preview of your analysis. Enter your email to unlock the full detailed data export.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Red Flags */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Risk Assessment
                  </h2>
                  
                  <RedFlagSummary redFlags={redFlags} />
                  
                  <div className="space-y-3">
                    {redFlags.slice(0, dataUnlocked ? redFlags.length : 1).map((redFlag) => (
                      <RedFlagCard
                        key={redFlag.id}
                        redFlag={redFlag}
                        showSuggestedClause={dataUnlocked}
                      />
                    ))}
                    
                    {!dataUnlocked && redFlags.length > 1 && (
                      <Card className="border-dashed">
                        <CardContent className="p-6 text-center">
                          <p className="text-muted-foreground mb-4">
                            + {redFlags.length - 1} more red flags identified
                          </p>
                          <Button onClick={() => setShowEmailModal(true)}>
                            Unlock Full Analysis
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>

              {/* Export Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button onClick={handleExportClick} size="lg" className="gap-2">
                  <Download className="w-5 h-5" />
                  {dataUnlocked ? "Export Full Report" : "Get Full Export"}
                </Button>
                <Button variant="outline" size="lg" onClick={() => {
                  setSelectedFile(null);
                  setExtractedAttributes([]);
                  setRedFlags([]);
                  setActiveTab("upload");
                }}>
                  Analyze Another Document
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailCapture}
        title="Unlock Your Complete Analysis"
        description="Get the full detailed report with all attributes, red flags, and suggested contract language."
        benefits={[
          `All ${extractedAttributes.length} extracted attributes with confidence scores`,
          `Complete analysis of ${redFlags.length} red flags with severity ratings`,
          "Suggested contract clause language for each red flag",
          "Downloadable JSON and PDF reports",
          "Priority support for questions about your analysis"
        ]}
        downloadType="export"
      />
    </div>
  );
}