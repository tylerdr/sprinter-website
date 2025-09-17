import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle2, Code2, ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "No-API Cookbook | Sprinter AI",
  description: "10 proven patterns for integrating with legacy ERPs without API access. Battle-tested solutions for real-world constraints.",
};

export default function NoAPICookbookPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              No-API Cookbook
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              10 battle-tested patterns for integrating with legacy ERPs when APIs aren't an option.
            </p>
          </div>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-brand-start" />
                Integration Patterns Included
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Pattern 1: Email Gateway Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Transform email exports into structured data pipelines with validation
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Pattern 2: FTP/SFTP File Watchers</h3>
                    <p className="text-sm text-muted-foreground">
                      Automated file monitoring and processing for batch exports
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Pattern 3: Database Replication</h3>
                    <p className="text-sm text-muted-foreground">
                      Direct database access patterns with change data capture
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Pattern 4: Screen Scraping & RPA</h3>
                    <p className="text-sm text-muted-foreground">
                      Intelligent automation for web-based and desktop applications
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Pattern 5: Print Stream Capture</h3>
                    <p className="text-sm text-muted-foreground">
                      Extract data from print jobs and PDF exports
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Plus 5 More Advanced Patterns</h3>
                    <p className="text-sm text-muted-foreground">
                      OCR pipelines, webhook proxies, message queue integration, and more
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                What You'll Learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Technical Implementation</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Code samples in Python and Node.js</li>
                    <li>• Error handling and retry logic</li>
                    <li>• Data validation frameworks</li>
                    <li>• Security best practices</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Real-World Examples</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• SAP integration without APIs</li>
                    <li>• Oracle EBS data extraction</li>
                    <li>• Legacy mainframe connectivity</li>
                    <li>• Custom ERP solutions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <Button size="lg" className="gap-2">
              <Download className="w-4 h-4" />
              Download Cookbook (PDF)
            </Button>
            
            <p className="text-sm text-muted-foreground">
              35 pages of battle-tested integration patterns. No email required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/operating-partner">
                <Button variant="outline" className="gap-2">
                  Learn About Our Approach
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button variant="outline" className="gap-2">
                  Get Implementation Help
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