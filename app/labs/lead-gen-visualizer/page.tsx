"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Image as ImageIcon, 
  Target, 
  Download, 
  Share2, 
  Loader2,
  Building2,
  User,
  MessageSquare,
  Wand2,
  Copy,
  Check
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function LeadGenVisualizerPage() {
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [prospectName, setProspectName] = useState("");
  const [prospectRole, setProspectRole] = useState("");
  const [prospectCompany, setProspectCompany] = useState("");
  const [pitch, setPitch] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedCopy, setGeneratedCopy] = useState("");
  const [generatedSubjectLines, setGeneratedSubjectLines] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!companyName || !prospectName || !prospectCompany || !pitch) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Call to Gemini 2.5 Flash Image API
      const response = await fetch("/api/lead-gen/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: {
            name: companyName,
            description: companyDescription
          },
          prospect: {
            name: prospectName,
            role: prospectRole,
            company: prospectCompany
          },
          pitch
        })
      });

      if (!response.ok) throw new Error("Generation failed");

      const data = await response.json();
      
      setGeneratedImage(data.imageUrl);
      setGeneratedCopy(data.copy);
      setGeneratedSubjectLines(data.subjectLines);
      
      toast.success("Personalized content generated!");
    } catch (error) {
      // For demo purposes, use placeholder content
      setGeneratedImage("/api/placeholder/800/600");
      setGeneratedCopy(
        `Hi ${prospectName},\n\n` +
        `I noticed ${prospectCompany} is ${pitch}. ` +
        `At ${companyName}, we've helped similar companies achieve remarkable results.\n\n` +
        `Our ${companyDescription || "solution"} can help you:\n` +
        `• Reduce operational costs by 30%\n` +
        `• Increase efficiency by 45%\n` +
        `• Scale faster with AI-powered automation\n\n` +
        `Would love to show you how we helped [Similar Company] achieve these results.\n\n` +
        `Worth a quick 15-minute call next week?\n\n` +
        `Best,\n[Your Name]`
      );
      setGeneratedSubjectLines([
        `${prospectName}, quick question about ${prospectCompany}'s growth plans`,
        `Idea for ${prospectCompany}: ${pitch}`,
        `${prospectName} - 30% cost reduction possible?`
      ]);
      
      toast.success("Demo content generated! (Gemini API integration pending)");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `lead-gen-${prospectCompany}-${Date.now()}.png`;
      link.click();
      toast.success("Image downloaded!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4">AI Lab</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              Lead Gen Visual Personalizer
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Generate personalized visual outreach for prospects using Google's Gemini 2.5 Flash Image. 
              Create unique, tailored content that stands out in crowded inboxes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-brand-start" />
                    Your Company
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name *</Label>
                    <Input
                      id="company-name"
                      placeholder="Sprinter AI"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company-desc">What You Do</Label>
                    <Textarea
                      id="company-desc"
                      placeholder="AI automation for private equity portfolios..."
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-brand-start" />
                    Target Prospect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="prospect-name">Prospect Name *</Label>
                    <Input
                      id="prospect-name"
                      placeholder="John Smith"
                      value={prospectName}
                      onChange={(e) => setProspectName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="prospect-role">Role/Title</Label>
                    <Input
                      id="prospect-role"
                      placeholder="VP of Operations"
                      value={prospectRole}
                      onChange={(e) => setProspectRole(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="prospect-company">Company *</Label>
                    <Input
                      id="prospect-company"
                      placeholder="Acme Corp"
                      value={prospectCompany}
                      onChange={(e) => setProspectCompany(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-brand-start" />
                    Your Pitch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="pitch">Brief Value Proposition *</Label>
                  <Textarea
                    id="pitch"
                    placeholder="Looking to reduce manual processing time by 80% with AI automation..."
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>

              <Button 
                size="lg" 
                className="w-full gap-2"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Personalized Content...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate Personalized Outreach
                  </>
                )}
              </Button>
            </div>

            {/* Generated Content */}
            <div className="space-y-6">
              {generatedImage || generatedCopy ? (
                <Tabs defaultValue="visual" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="visual">Visual</TabsTrigger>
                    <TabsTrigger value="copy">Copy</TabsTrigger>
                    <TabsTrigger value="subject">Subject Lines</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="visual" className="space-y-4">
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-brand-start" />
                            Personalized Visual
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={downloadImage}>
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {generatedImage && (
                          <div className="relative aspect-video bg-card rounded-lg overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-start/20 to-brand-end/20 flex items-center justify-center">
                              <div className="text-center p-8">
                                <ImageIcon className="w-16 h-16 text-brand-start mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">
                                  Personalized for {prospectName}
                                </h3>
                                <p className="text-muted-foreground">
                                  AI-generated visual showing how {companyName} can help {prospectCompany}
                                </p>
                                <Badge className="mt-4">Powered by Gemini 2.5 Flash</Badge>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="copy" className="space-y-4">
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Personalized Email Copy</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyToClipboard(generatedCopy)}
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-card/50 p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap text-sm font-mono">
                            {generatedCopy}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="subject" className="space-y-4">
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle>Subject Line Options</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {generatedSubjectLines.map((line, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between p-3 bg-card/50 rounded-lg"
                          >
                            <span className="text-sm">{line}</span>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => copyToClipboard(line)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              ) : (
                <Card className="glass-card">
                  <CardContent className="py-12">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 text-brand-start mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Ready to Generate</h3>
                      <p className="text-sm text-muted-foreground">
                        Fill in the details and click generate to create personalized outreach content
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Features */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-brand-start mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Smart Personalization</p>
                      <p className="text-xs text-muted-foreground">
                        AI analyzes prospect and company to create relevant visuals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ImageIcon className="w-5 h-5 text-brand-start mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Visual Generation</p>
                      <p className="text-xs text-muted-foreground">
                        Creates unique images tailored to each prospect's needs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-brand-start mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Copy Optimization</p>
                      <p className="text-xs text-muted-foreground">
                        Generates compelling copy that resonates with the prospect
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}