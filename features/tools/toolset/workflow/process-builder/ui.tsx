"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Workflow, Settings, Download, Clock, DollarSign } from "lucide-react";
import Link from "next/link";
import { ProcessBuilderInput, ProcessBuilderOutput } from "./tool";

interface ProcessBuilderUIProps {
  onBuild: (input: ProcessBuilderInput) => Promise<ProcessBuilderOutput>;
}

export function ProcessBuilderUI({ onBuild }: ProcessBuilderUIProps) {
  const [processName, setProcessName] = useState("Invoice Processing Workflow");
  const [department, setDepartment] = useState("Finance");
  const [complexity, setComplexity] = useState<"simple" | "medium" | "complex">("medium");
  const [triggerType, setTriggerType] = useState<"manual" | "scheduled" | "event" | "api">("event");
  const [steps, setSteps] = useState("Receive invoice,Validate data,Route for approval,Process payment,Update records");
  const [integrations, setIntegrations] = useState("QuickBooks,Salesforce,Email System");
  const [approvals, setApprovals] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const [result, setResult] = useState<ProcessBuilderOutput | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);

  const handleBuild = async () => {
    setIsBuilding(true);
    try {
      const input: ProcessBuilderInput = {
        processName,
        department,
        complexity,
        triggerType,
        steps: steps.split(",").map(s => s.trim()).filter(Boolean),
        integrations: integrations.split(",").map(i => i.trim()).filter(Boolean),
        approvals,
        notifications
      };
      const output = await onBuild(input);
      setResult(output);
    } catch (error) {
      console.error("Build failed:", error);
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
              <Workflow className="w-4 h-4" />
              Workflow Automation
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Process Builder
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build automated workflows without code - streamline operations with AI-powered process automation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Process Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="processName">Process Name</Label>
                    <Input
                      id="processName"
                      value={processName}
                      onChange={(e) => setProcessName(e.target.value)}
                      placeholder="Name your process"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="e.g., Finance, HR"
                      />
                    </div>
                    <div>
                      <Label htmlFor="complexity">Complexity</Label>
                      <Select value={complexity} onValueChange={(value: any) => setComplexity(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simple">Simple</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="complex">Complex</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="triggerType">Trigger Type</Label>
                    <Select value={triggerType} onValueChange={(value: any) => setTriggerType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual Start</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="event">Event Triggered</SelectItem>
                        <SelectItem value="api">API Triggered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="steps">Process Steps</Label>
                    <Textarea
                      id="steps"
                      value={steps}
                      onChange={(e) => setSteps(e.target.value)}
                      placeholder="Step 1, Step 2, Step 3..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="integrations">System Integrations</Label>
                    <Textarea
                      id="integrations"
                      value={integrations}
                      onChange={(e) => setIntegrations(e.target.value)}
                      placeholder="System 1, System 2, System 3..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="approvals">Approval Workflow</Label>
                      <Switch
                        id="approvals"
                        checked={approvals}
                        onCheckedChange={setApprovals}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Notifications</Label>
                      <Switch
                        id="notifications"
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleBuild}
                    className="w-full"
                    disabled={isBuilding}
                  >
                    {isBuilding ? "Building Process..." : "Build Automated Process"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {result ? (
                <>
                  {/* Process Overview */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-blue-500/20 bg-blue-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">
                              {result.timeline}
                            </p>
                          </div>
                          <Clock className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-green-500/20 bg-green-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Expected ROI</p>
                            <p className="text-lg font-bold text-green-600 mt-2">
                              60% Efficiency
                            </p>
                          </div>
                          <DollarSign className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 bg-purple-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Process Steps</p>
                            <p className="text-2xl font-bold text-purple-600 mt-2">
                              {steps.split(",").length}
                            </p>
                          </div>
                          <Settings className="w-8 h-8 text-purple-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Automation Steps */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Automation Steps</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.automationSteps.map((step, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">{step.step}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{step.automation}</p>
                          <div className="flex flex-wrap gap-1">
                            {step.tools.map((tool, i) => (
                              <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {tool}
                              </span>
                            ))}
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
                          Download Process Blueprint
                        </Button>
                        <Link href="/ai-sprint" className="w-full">
                          <Button variant="outline" className="w-full" size="lg">
                            Start Automation Sprint
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <Workflow className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Ready to Build</p>
                    <p className="text-muted-foreground">
                      Configure your process parameters to create an automated workflow
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