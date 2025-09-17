import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle2, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AP Accelerator Brief | Sprinter AI",
  description: "4-page guide for QuickBooks and Sage AP automation. Learn how to achieve 60% touchless processing in 30-45 days.",
};

export default function APBriefPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              AP Accelerator Brief
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your 4-page guide to implementing AP automation with QuickBooks and Sage. 
              No rip-and-replace required.
            </p>
          </div>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-start" />
                What's Inside
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Integration Architecture</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete technical diagram for QBO/Sage integration without API access
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">30-Day Implementation Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Week-by-week roadmap with clear milestones and deliverables
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">ROI Calculator</h3>
                    <p className="text-sm text-muted-foreground">
                      Calculate your savings based on invoice volume and current processing time
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Security & Compliance</h3>
                    <p className="text-sm text-muted-foreground">
                      Audit trail requirements and SOC 2 compliance checklist
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>Key Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-brand-start mb-2">60%</div>
                  <p className="text-sm text-muted-foreground">Touchless Processing Rate</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-start mb-2">30-45</div>
                  <p className="text-sm text-muted-foreground">Days to Production</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-start mb-2">80%</div>
                  <p className="text-sm text-muted-foreground">Time Savings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <Button size="lg" className="gap-2">
              <Download className="w-4 h-4" />
              Download AP Brief (PDF)
            </Button>
            
            <p className="text-sm text-muted-foreground">
              No email required. Instant download.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/solutions/ap-automation">
                <Button variant="outline" className="gap-2">
                  Learn More About AP Automation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button variant="outline" className="gap-2">
                  Book a Workshop
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