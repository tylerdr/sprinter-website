"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Mail, Users, BarChart3, Download, Zap } from "lucide-react";
import Link from "next/link";
import { EmailAutomationInput, EmailAutomationOutput } from "./tool";

interface EmailAutomationUIProps {
  onAutomate: (input: EmailAutomationInput) => Promise<EmailAutomationOutput>;
}

export function EmailAutomationUI({ onAutomate }: EmailAutomationUIProps) {
  const [automationType, setAutomationType] = useState<"responses" | "routing" | "follow_up" | "drip_campaign" | "custom">("responses");
  const [triggerEvent, setTriggerEvent] = useState("New lead inquiry received");
  const [emailTemplates, setEmailTemplates] = useState("Welcome email,Follow-up email,Nurture sequence,Closing email");
  const [audienceSegments, setAudienceSegments] = useState("New leads,Existing customers,High-value prospects,Re-engagement targets");
  const [schedule, setSchedule] = useState("Business hours only, respect time zones");
  const [personalization, setPersonalization] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [integrations, setIntegrations] = useState("Salesforce,HubSpot,Mailchimp");

  const [result, setResult] = useState<EmailAutomationOutput | null>(null);
  const [isAutomating, setIsAutomating] = useState(false);

  const handleAutomate = async () => {
    setIsAutomating(true);
    try {
      const input: EmailAutomationInput = {
        automationType,
        triggerEvent,
        emailTemplates: emailTemplates.split(",").map(t => t.trim()).filter(Boolean),
        audienceSegments: audienceSegments.split(",").map(s => s.trim()).filter(Boolean),
        schedule,
        personalization,
        analytics,
        integrations: integrations.split(",").map(i => i.trim()).filter(Boolean)
      };
      const output = await onAutomate(input);
      setResult(output);
    } catch (error) {
      console.error("Automation failed:", error);
    } finally {
      setIsAutomating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
              <Mail className="w-4 h-4" />
              Email Automation
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Email Automation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Automate email responses and routing with intelligent AI-powered sequences
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Automation Setup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="automationType">Automation Type</Label>
                    <Select value={automationType} onValueChange={(value: any) => setAutomationType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="responses">Auto Responses</SelectItem>
                        <SelectItem value="routing">Email Routing</SelectItem>
                        <SelectItem value="follow_up">Follow-up Sequences</SelectItem>
                        <SelectItem value="drip_campaign">Drip Campaign</SelectItem>
                        <SelectItem value="custom">Custom Automation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="triggerEvent">Trigger Event</Label>
                    <Input
                      id="triggerEvent"
                      value={triggerEvent}
                      onChange={(e) => setTriggerEvent(e.target.value)}
                      placeholder="What triggers the automation?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="emailTemplates">Email Templates</Label>
                    <Textarea
                      id="emailTemplates"
                      value={emailTemplates}
                      onChange={(e) => setEmailTemplates(e.target.value)}
                      placeholder="Template 1, Template 2, etc."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="audienceSegments">Audience Segments</Label>
                    <Textarea
                      id="audienceSegments"
                      value={audienceSegments}
                      onChange={(e) => setAudienceSegments(e.target.value)}
                      placeholder="Segment 1, Segment 2, etc."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="schedule">Schedule Preferences</Label>
                    <Input
                      id="schedule"
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                      placeholder="e.g., Business hours only"
                    />
                  </div>

                  <div>
                    <Label htmlFor="integrations">Integrations</Label>
                    <Input
                      id="integrations"
                      value={integrations}
                      onChange={(e) => setIntegrations(e.target.value)}
                      placeholder="CRM, Email platform, etc."
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="personalization">Personalization</Label>
                      <Switch
                        id="personalization"
                        checked={personalization}
                        onCheckedChange={setPersonalization}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="analytics">Analytics Tracking</Label>
                      <Switch
                        id="analytics"
                        checked={analytics}
                        onCheckedChange={setAnalytics}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleAutomate}
                    className="w-full"
                    disabled={isAutomating}
                  >
                    {isAutomating ? "Setting up Automation..." : "Create Email Automation"}
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
                            <p className="text-sm font-medium text-muted-foreground">Open Rate</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                              {Math.round(result.expectedMetrics.openRate * 100)}%
                            </p>
                          </div>
                          <Mail className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-500/20 bg-blue-500/5">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Click Rate</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">
                              {Math.round(result.expectedMetrics.clickRate * 100)}%
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
                            <p className="text-sm font-medium text-muted-foreground">Conversion</p>
                            <p className="text-3xl font-bold text-purple-600 mt-2">
                              {Math.round(result.expectedMetrics.conversionRate * 100)}%
                            </p>
                          </div>
                          <BarChart3 className="w-8 h-8 text-purple-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Email Sequence</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.emailSequence.map((email, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">Step {email.step}: {email.subject}</h4>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {email.delay}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">Trigger: {email.trigger}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Audience Segmentation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.segmentation.map((segment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{segment.segment}</p>
                            <p className="text-sm text-muted-foreground">{segment.criteria}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold">{segment.count.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">contacts</p>
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
                          Download Automation Blueprint
                        </Button>
                        <Link href="/ai-sprint" className="w-full">
                          <Button variant="outline" className="w-full" size="lg">
                            Start Email Marketing Sprint
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Ready to Automate</p>
                    <p className="text-muted-foreground">
                      Configure your email automation parameters to create intelligent sequences
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