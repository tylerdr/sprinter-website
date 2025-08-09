"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronRight, 
  Home, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Bot,
  FileText,
  BarChart3,
  Mic,
  Palette,
  Gamepad2,
  Share2,
  MessageCircle,
  type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface LabItem {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  featured?: boolean;
}

// Define all labs for suggestions
const allLabs: LabItem[] = [
  {
    href: "/labs/opportunity-audit",
    title: "AI Opportunity Audit",
    description: "Get your personalized AI roadmap",
    icon: Sparkles,
    category: "advisory",
    featured: true,
  },
  {
    href: "/labs/agent-simulator",
    title: "Agent Simulator",
    description: "Watch AI agents collaborate",
    icon: Bot,
    category: "agents",
  },
  {
    href: "/labs/agent-playground",
    title: "Agent Playground",
    description: "Build workflows visually",
    icon: Bot,
    category: "agents",
  },
  {
    href: "/labs/ai-assistant",
    title: "AI Assistant",
    description: "Chat with our AI",
    icon: Bot,
    category: "agents",
  },
  {
    href: "/labs/workflow-tool",
    title: "Workflow Designer",
    description: "Map your business processes",
    icon: Bot,
    category: "agents",
  },
  {
    href: "/labs/document-intelligence",
    title: "Document Intelligence",
    description: "Extract insights from PDFs",
    icon: FileText,
    category: "docs",
  },
  {
    href: "/labs/data-analyzer",
    title: "Data Analyzer",
    description: "Analyze CSV/Excel files",
    icon: BarChart3,
    category: "data",
  },
  {
    href: "/labs/roi-calculator",
    title: "ROI Calculator",
    description: "Calculate AI savings",
    icon: BarChart3,
    category: "data",
  },
  {
    href: "/labs/voice-chat",
    title: "Voice Chat",
    description: "Natural AI conversations",
    icon: Mic,
    category: "voice",
  },
  {
    href: "/labs/ideation",
    title: "Ideation Lab",
    description: "AI brainstorming games",
    icon: Gamepad2,
    category: "creative",
  },
  {
    href: "/labs/sketch-studio",
    title: "Sketch Studio",
    description: "AI-enhanced drawing",
    icon: Palette,
    category: "creative",
  },
  {
    href: "/labs/agent-battle",
    title: "Agent Battle",
    description: "AI vs AI debates",
    icon: Gamepad2,
    category: "play",
    featured: true,
  },
  {
    href: "/labs/tiny-town",
    title: "Tiny Town",
    description: "Simulate AI NPCs",
    icon: Bot,
    category: "play",
    featured: true,
  },
  {
    href: "/labs/vibe-coding",
    title: "Vibe Coding",
    description: "Generate UI components",
    icon: Palette,
    category: "creative",
    featured: true,
  },
  {
    href: "/labs/storyboarding",
    title: "Storyboarding",
    description: "Map user journeys",
    icon: Bot,
    category: "creative",
    featured: true,
  },
  {
    href: "/labs/music-studio",
    title: "Music Studio",
    description: "Create AI music",
    icon: Palette,
    category: "creative",
  },
  {
    href: "/labs/ad-creator",
    title: "Ad Creator",
    description: "Generate social ads",
    icon: Palette,
    category: "creative",
  },
  {
    href: "/labs/code-review",
    title: "Code Review",
    description: "AI code analysis",
    icon: FileText,
    category: "docs",
  },
  {
    href: "/labs/quiz-generator",
    title: "Quiz Generator",
    description: "Generate PDF quizzes",
    icon: FileText,
    category: "docs",
  },
  {
    href: "/labs/voice-to-process",
    title: "Voice to Process",
    description: "Verbal workflow mapping",
    icon: Mic,
    category: "voice",
  },
  {
    href: "/labs/component-studio",
    title: "Component Studio",
    description: "Build AI components",
    icon: Bot,
    category: "creative",
  },
];

interface LabLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  category?: string;
}

export function LabLayout({ 
  children, 
  title = "AI Lab"
}: LabLayoutProps) {
  const pathname = usePathname();
  
  // Get current lab info
  const currentLab = allLabs.find(lab => lab.href === pathname);
  
  // Get related labs (same category or featured)
  const relatedLabs = allLabs.filter(lab => 
    lab.href !== pathname && 
    (lab.category === currentLab?.category || lab.featured)
  ).slice(0, 3);
  
  // Get other interesting labs from different categories
  const otherLabs = allLabs.filter(lab => 
    lab.href !== pathname && 
    lab.category !== currentLab?.category && 
    !lab.featured
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link 
            href="/" 
            className="hover:text-foreground transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            href="/labs" 
            className="hover:text-foreground transition-colors"
          >
            AI Labs
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{title}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Lab Content */}
          <div className="lg:col-span-9">
            {children}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Quick Actions */}
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share This Lab
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Give Feedback
                </Button>
                <Separator className="my-2" />
                <Link href="/labs" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to All Labs
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related Labs */}
            {relatedLabs.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Related Labs</CardTitle>
                  <CardDescription className="text-xs">
                    Similar tools you might like
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedLabs.map((lab) => (
                    <Link
                      key={lab.href}
                      href={lab.href}
                      className="block group"
                    >
                      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <lab.icon className={cn(
                          "w-5 h-5 mt-0.5 text-muted-foreground group-hover:text-brand",
                          lab.featured && "text-yellow-500"
                        )} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm group-hover:text-brand transition-colors flex items-center gap-2">
                            {lab.title}
                            {lab.featured && (
                              <Badge variant="secondary" className="text-xs px-1 py-0">
                                HOT
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {lab.description}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Explore More */}
            {otherLabs.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Explore More</CardTitle>
                  <CardDescription className="text-xs">
                    Discover other AI experiences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {otherLabs.map((lab) => (
                    <Link
                      key={lab.href}
                      href={lab.href}
                      className="block group"
                    >
                      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <lab.icon className="w-5 h-5 mt-0.5 text-muted-foreground group-hover:text-brand" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm group-hover:text-brand transition-colors">
                            {lab.title}
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {lab.description}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-brand/10 to-brand/5 border-brand/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Ready to Build?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Turn these demos into production systems for your business.
                </p>
                <Button size="sm" variant="default" className="w-full" asChild>
                  <Link href="/contact">
                    Start a 10-Day Sprint
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <Separator className="mb-8" />
        <div className="flex justify-between items-center">
          <Link href="/labs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Labs
            </Button>
          </Link>
          
          <div className="flex gap-2">
            {currentLab && relatedLabs[0] && (
              <Link href={relatedLabs[0].href}>
                <Button variant="outline" size="sm">
                  Next: {relatedLabs[0].title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}