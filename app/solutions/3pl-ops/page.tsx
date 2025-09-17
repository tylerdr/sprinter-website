import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Package, DollarSign, ArrowRight, Truck, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "3PL Operations & Billing | Sprinter AI",
  description: "Automate 3PL operations from quote to cash. 18-point accuracy improvement in billing with AI-powered reconciliation.",
};

export default function ThreePLOpsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-start/10 text-brand-start text-sm font-medium mb-4">
              <Truck className="w-4 h-4" />
              18pt Billing Accuracy Gain
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              3PL Operations & Billing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              End-to-end automation for third-party logistics. From quote creation to billing reconciliation, 
              built by operators who understand logistics complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-brand-start mb-2" />
                <CardTitle>18pt Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Average billing accuracy improvement across implementations
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>65% Faster</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Month-end billing cycle reduction
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <DollarSign className="w-8 h-8 text-yellow-500 mb-2" />
                <CardTitle>$2.3M Recovered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Average annual unbilled services captured
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Complete 3PL Automation Suite</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-brand-start" />
                    Quote & Contract Management
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Automated lane pricing and surcharge calculations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Contract compliance monitoring and alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Dynamic pricing based on capacity and demand</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-brand-start" />
                    Operations Tracking
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Real-time shipment visibility and tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Automated POD capture and processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Exception management and resolution workflows</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-brand-start" />
                    Billing & Reconciliation
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Automated invoice generation from operations data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Accessorial charge capture and validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Three-way match: Quote vs. Operations vs. Invoice</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-brand-start" />
                    Analytics & Reporting
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Customer profitability analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Lane performance and optimization insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Revenue leakage identification and recovery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Why 3PLs Choose Sprinter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Built for Complexity</h3>
                  <p className="text-muted-foreground mb-3">
                    We understand the unique challenges of 3PL operations:
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Multi-client operations with different requirements</li>
                    <li>• Complex accessorial charge structures</li>
                    <li>• Volume-based and tiered pricing models</li>
                    <li>• Cross-docking and transloading operations</li>
                    <li>• Last-mile delivery complications</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Proven Results</h3>
                  <p className="text-muted-foreground mb-3">
                    Real outcomes from portfolio implementations:
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 95% billing accuracy (up from 77% average)</li>
                    <li>• 3-day billing cycles (down from 8 days)</li>
                    <li>• 100% accessorial capture rate</li>
                    <li>• 60% reduction in billing disputes</li>
                    <li>• 2.3x improvement in cash flow timing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Integration Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">TMS Platforms</h3>
                  <p className="text-sm text-muted-foreground">
                    Manhattan, BluJay, MercuryGate, TMW, custom systems
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">WMS Systems</h3>
                  <p className="text-sm text-muted-foreground">
                    SAP EWM, Oracle WMS, JDA, HighJump, proprietary solutions
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Financial Systems</h3>
                  <p className="text-sm text-muted-foreground">
                    QuickBooks, Sage, NetSuite, SAP, Oracle ERP
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Transform Your 3PL Operations</h2>
              <p className="text-muted-foreground">
                See how AI can eliminate billing errors and accelerate cash flow
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Schedule Assessment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="gap-2">
                  View Case Studies
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