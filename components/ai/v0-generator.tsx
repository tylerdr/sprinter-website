"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { generateUIComponent } from "./actions";
import { 
  Code2, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw,
  Wand2,
  Layout,
  Monitor,
  Smartphone,
  ChevronRight,
  Download
} from "lucide-react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import Link from "next/link";
import { toast } from "sonner";

// UI Templates
const UI_TEMPLATES = [
  {
    id: "landing-hero",
    name: "Landing Hero",
    description: "Hero section with CTA",
    icon: Layout,
    prompt: "Modern hero section with gradient background, headline, subheadline, and two CTAs",
  },
  {
    id: "pricing-cards",
    name: "Pricing Cards",
    description: "SaaS pricing tiers",
    icon: Monitor,
    prompt: "Three-tier pricing cards with features, prices, and sign-up buttons",
  },
  {
    id: "dashboard-stats",
    name: "Dashboard Stats",
    description: "Analytics dashboard widgets",
    icon: Monitor,
    prompt: "Dashboard with stats cards, charts, and activity feed",
  },
  {
    id: "mobile-app",
    name: "Mobile App Screen",
    description: "iOS/Android app UI",
    icon: Smartphone,
    prompt: "Mobile app screen with bottom navigation and content cards",
  },
];

// Style presets
const STYLE_PRESETS = [
  { id: "minimal", name: "Minimal", description: "Clean and simple" },
  { id: "gradient", name: "Gradient", description: "Colorful gradients" },
  { id: "dark", name: "Dark Mode", description: "Dark theme optimized" },
  { id: "glassmorphism", name: "Glassmorphism", description: "Frosted glass effect" },
  { id: "neubrutalism", name: "Neubrutalism", description: "Bold and playful" },
  { id: "corporate", name: "Corporate", description: "Professional business" },
];

interface GeneratedComponent {
  id: string;
  prompt: string;
  code: string;
  framework: string;
  style: string;
  timestamp: number;
  v0Url?: string;
}

export function V0Generator() {
  const [prompt, setPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("minimal");
  const [framework, setFramework] = useState("react");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<GeneratedComponent | null>(null);
  const [history, setHistory] = useState<GeneratedComponent[]>([]);
  const [copied, setCopied] = useState(false);
  const [creativity, setCreativity] = useState(50);

  const handleTemplateSelect = (templateId: string) => {
    const template = UI_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setPrompt(template.prompt);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateUIComponent({
        prompt,
        framework,
        style: selectedStyle,
        responsive: true,
        typescript: false,
        creativity: creativity / 100,
      });

      const component: GeneratedComponent = {
        id: `component-${Date.now()}`,
        prompt,
        code: result.code,
        framework,
        style: selectedStyle,
        timestamp: Date.now(),
        v0Url: result.v0Url,
      };

      setGeneratedCode(component);
      setHistory(prev => [component, ...prev].slice(0, 10));
      toast.success("Component generated successfully!");
    } catch (error) {
      console.error("Generation failed:", error);
      toast.error("Failed to generate component");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Code copied to clipboard");
    }
  };

  const sandpackFiles = generatedCode ? {
    "/App.js": generatedCode.code,
    "/styles.css": `
/* Generated styles */
body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 20px;
  background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
}

* {
  box-sizing: border-box;
}
    `,
  } : undefined;

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          {/* Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Start Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {UI_TEMPLATES.map(template => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <template.icon className="w-4 h-4 mr-2" />
                    <span className="truncate">{template.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prompt Input */}
          <Card>
            <CardHeader>
              <CardTitle>Describe Your UI</CardTitle>
              <CardDescription>
                Be specific about layout, colors, and functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="e.g., A modern pricing table with three tiers, gradient backgrounds, and hover animations..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Framework */}
                <div>
                  <Label>Framework</Label>
                  <Select value={framework} onValueChange={setFramework}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="svelte">Svelte</SelectItem>
                      <SelectItem value="html">HTML/CSS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Style */}
                <div>
                  <Label>Style Preset</Label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STYLE_PRESETS.map(style => (
                        <SelectItem key={style.id} value={style.id}>
                          {style.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Creativity Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Creativity</Label>
                  <span className="text-sm text-muted-foreground">{creativity}%</span>
                </div>
                <Slider
                  value={[creativity]}
                  onValueChange={([v]) => setCreativity(v)}
                  min={0}
                  max={100}
                  step={10}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Conservative</span>
                  <span>Experimental</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Component
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* History */}
          {history.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recent Generations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {history.slice(0, 5).map(item => (
                    <button
                      key={item.id}
                      onClick={() => setGeneratedCode(item)}
                      className="w-full text-left p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.prompt}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {item.framework}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          {generatedCode ? (
            <>
              {/* Code Preview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Generated Component</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                      {generatedCode.v0Url && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link href={generatedCode.v0Url} target="_blank" rel="noopener noreferrer">
                            Open in v0
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="code">Code</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="mt-4">
                      {sandpackFiles && (
                        <Sandpack
                          template="react"
                          files={sandpackFiles}
                          theme={sandpackDark}
                          options={{
                            showNavigator: false,
                            showTabs: false,
                            showLineNumbers: true,
                            showInlineErrors: true,
                            wrapContent: true,
                            editorHeight: 400,
                          }}
                        />
                      )}
                    </TabsContent>
                    <TabsContent value="code" className="mt-4">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm">{generatedCode.code}</code>
                      </pre>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center">
                <Code2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Component Generated Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Describe your UI or choose a template to get started
                </p>
                <Button
                  variant="outline"
                  onClick={() => handleTemplateSelect("landing-hero")}
                >
                  Try a Template
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}