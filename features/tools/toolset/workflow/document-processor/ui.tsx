"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FileSearch, Download, Zap, Target } from "lucide-react";
import Link from "next/link";
import { DocumentProcessorInput, DocumentProcessorOutput } from "./tool";

interface DocumentProcessorUIProps {
  onProcess: (input: DocumentProcessorInput) => Promise<DocumentProcessorOutput>;
}

export function DocumentProcessorUI({ onProcess }: DocumentProcessorUIProps) {
  const [documentType, setDocumentType] = useState<"invoice" | "contract" | "resume" | "form" | "report" | "custom">("invoice");
  const [processingGoal, setProcessingGoal] = useState("Extract key invoice data for automated processing");
  const [documentSource, setDocumentSource] = useState<"upload" | "email" | "folder" | "api">("email");
  const [extractionFields, setExtractionFields] = useState("Invoice number,Date,Amount,Vendor,Line items");
  const [outputFormat, setOutputFormat] = useState<"json" | "csv" | "database" | "api">("database");
  const [workflow, setWorkflow] = useState("Receive document,Extract data,Validate information,Route for approval,Update systems");
  const [validation, setValidation] = useState(true);
  const [automation, setAutomation] = useState(true);

  const [result, setResult] = useState<DocumentProcessorOutput | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const input: DocumentProcessorInput = {
        documentType,
        processingGoal,
        documentSource,
        extractionFields: extractionFields.split(",").map(f => f.trim()).filter(Boolean),
        outputFormat,
        workflow: workflow.split(",").map(w => w.trim()).filter(Boolean),
        validation,
        automation
      };
      const output = await onProcess(input);
      setResult(output);
    } catch (error) {
      console.error("Processing failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
              <FileSearch className="w-4 h-4" />
              Document Processing
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Document Processor
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Extract and process document data automatically with AI-powered document understanding
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="documentType">Document Type</Label>
                    <Select value={documentType} onValueChange={(value: any) => setDocumentType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="invoice">Invoice</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="resume">Resume/CV</SelectItem>
                        <SelectItem value="form">Form</SelectItem>
                        <SelectItem value="report">Report</SelectItem>
                        <SelectItem value="custom">Custom Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="processingGoal">Processing Goal</Label>
                    <Textarea
                      id="processingGoal"
                      value={processingGoal}
                      onChange={(e) => setProcessingGoal(e.target.value)}
                      placeholder="What do you want to extract or achieve?"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="documentSource">Source</Label>
                      <Select value={documentSource} onValueChange={(value: any) => setDocumentSource(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upload">File Upload</SelectItem>
                          <SelectItem value="email">Email Attachments</SelectItem>
                          <SelectItem value="folder">Folder Monitoring</SelectItem>
                          <SelectItem value="api">API Integration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="outputFormat">Output Format</Label>
                      <Select value={outputFormat} onValueChange={(value: any) => setOutputFormat(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="database">Database</SelectItem>
                          <SelectItem value="api">API Response</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="extractionFields">Fields to Extract</Label>
                    <Textarea
                      id="extractionFields"
                      value={extractionFields}
                      onChange={(e) => setExtractionFields(e.target.value)}
                      placeholder="Field 1, Field 2, Field 3..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="workflow">Processing Workflow</Label>
                    <Textarea
                      id="workflow"
                      value={workflow}
                      onChange={(e) => setWorkflow(e.target.value)}
                      placeholder="Step 1, Step 2, Step 3..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="validation">Data Validation</Label>
                      <Switch
                        id="validation"
                        checked={validation}
                        onCheckedChange={setValidation}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="automation">Full Automation</Label>
                      <Switch
                        id="automation"
                        checked={automation}
                        onCheckedChange={setAutomation}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleProcess}
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Setting up Processor..." : "Configure Document Processor"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {result ? (
                <>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-green-500/20 bg-green-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Accuracy</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                              {result.accuracy}%
                            </p>
                          </div>
                          <Target className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-500/20 bg-blue-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Throughput</p>
                            <p className="text-lg font-bold text-blue-600 mt-2">
                              {result.throughput}
                            </p>
                          </div>
                          <Zap className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 bg-purple-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Fields</p>
                            <p className="text-3xl font-bold text-purple-600 mt-2">
                              {extractionFields.split(",").length}
                            </p>
                          </div>
                          <FileSearch className="w-8 h-8 text-purple-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Field Extraction Map</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.extractionMap.map((field, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{field.field}</p>
                            <p className="text-sm text-muted-foreground">{field.method}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{Math.round(field.confidence * 100)}%</p>
                            <p className="text-xs text-muted-foreground">Confidence</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-purple-500/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-3">
                        <Button className="w-full gap-2" size="lg">
                          <Download className="w-4 h-4" />
                          Download Processing Blueprint
                        </Button>
                        <Link href="/ai-sprint" className="w-full">
                          <Button variant="outline" className="w-full" size="lg">
                            Start Document Processing Sprint
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <FileSearch className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Ready to Process</p>
                    <p className="text-muted-foreground">
                      Configure document processing parameters to extract data automatically
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