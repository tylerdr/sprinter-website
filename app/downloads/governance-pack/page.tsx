import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle2, Shield, ArrowRight, Lock, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Governance Pack | Sprinter AI",
  description: "Complete AI governance documentation for PE funds. Security frameworks, fee-offset strategies, and LP reporting templates.",
};

export default function GovernancePackPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              AI Governance Pack
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to defend AI initiatives to LPs. Security frameworks, 
              compliance docs, and fee-offset strategies.
            </p>
          </div>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-start" />
                Complete Documentation Suite
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">AI Security Framework</h3>
                    <p className="text-sm text-muted-foreground">
                      20-page security framework covering data handling, model governance, and access controls
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Security & Privacy Framework</h3>
                    <p className="text-sm text-muted-foreground">
                      Vendor evaluation guide ensuring SOC 2 eligible providers and private data protection
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Fee-Offset Playbook</h3>
                    <p className="text-sm text-muted-foreground">
                      Strategies for positioning AI investments as operational improvements vs. fees
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">LP Reporting Templates</h3>
                    <p className="text-sm text-muted-foreground">
                      Quarterly reporting templates with AI ROI metrics and risk assessments
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Vendor Assessment Matrix</h3>
                    <p className="text-sm text-muted-foreground">
                      Evaluation framework for AI vendors with security and compliance scoring
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Incident Response Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete IR plan for AI-related security incidents with escalation procedures
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-yellow-500" />
                Key Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">For GPs</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Defend AI investments to LPs</li>
                    <li>• Reduce compliance risk</li>
                    <li>• Accelerate vendor approval</li>
                    <li>• Standardize portfolio approach</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">For Portfolio Companies</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Fast-track AI initiatives</li>
                    <li>• Meet security requirements</li>
                    <li>• Reduce audit findings</li>
                    <li>• Build LP confidence</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-card/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Included Formats:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-brand-start/10 text-brand-start rounded text-xs">Word Templates</span>
                  <span className="px-2 py-1 bg-brand-start/10 text-brand-start rounded text-xs">Excel Matrices</span>
                  <span className="px-2 py-1 bg-brand-start/10 text-brand-start rounded text-xs">PowerPoint Decks</span>
                  <span className="px-2 py-1 bg-brand-start/10 text-brand-start rounded text-xs">PDF Guides</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <Button size="lg" className="gap-2">
              <Download className="w-4 h-4" />
              Download Governance Pack
            </Button>
            
            <p className="text-sm text-muted-foreground">
              75+ pages of governance documentation. Instant download.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/governance">
                <Button variant="outline" className="gap-2">
                  Learn About Our Governance Approach
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button variant="outline" className="gap-2">
                  Schedule Governance Review
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}