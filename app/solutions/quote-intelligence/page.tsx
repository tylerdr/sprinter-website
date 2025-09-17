import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Clock, DollarSign, ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Quote Intelligence | Sprinter AI",
  description: "Transform RFPs into quote drafts 42% faster. AI-powered quote generation for manufacturing, logistics, and distribution.",
};

export default function QuoteIntelligencePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-start/10 text-brand-start text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              42% Faster Quote Cycles
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              Quote Intelligence
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform complex RFPs into accurate quote drafts in minutes, not hours. 
              Built by AI engineers who understand manufacturing and logistics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card">
              <CardHeader>
                <Clock className="w-8 h-8 text-brand-start mb-2" />
                <CardTitle>42% Faster</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Average reduction in quote turnaround time across portfolio companies
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>3x Throughput</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Handle more RFPs without adding headcount
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <DollarSign className="w-8 h-8 text-yellow-500 mb-2" />
                <CardTitle>18% Win Rate Lift</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Faster response times lead to higher close rates
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">1. RFP Ingestion</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Parse complex RFPs from any format (PDF, Excel, Word)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Extract requirements, quantities, and specifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Identify custom requirements and exceptions</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">2. Intelligent Matching</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Match requirements to your product catalog</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Apply customer-specific pricing rules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Flag items requiring manual review</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">3. Quote Generation</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Generate formatted quote documents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Include terms, conditions, and lead times</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Export to your CRM or ERP</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">4. Human Review</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Highlight areas needing attention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Track changes and approvals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Learn from corrections for continuous improvement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Perfect For</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Manufacturing</h3>
                  <p className="text-sm text-muted-foreground">
                    Custom parts, assemblies, and production runs with complex specifications
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Distribution</h3>
                  <p className="text-sm text-muted-foreground">
                    Multi-line item quotes with volume pricing and delivery schedules
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">3PL & Logistics</h3>
                  <p className="text-sm text-muted-foreground">
                    Transportation quotes with lane pricing and service level agreements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to Accelerate Your Quote Process?</h2>
              <p className="text-muted-foreground">
                See Quote Intelligence in action with your actual RFPs
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Schedule Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <Link href="/tools/quote-estimator">
                <Button size="lg" variant="outline" className="gap-2">
                  Calculate Your ROI
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