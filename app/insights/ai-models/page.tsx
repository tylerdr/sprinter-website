import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Zap, TrendingUp, ArrowRight, Sparkles, Code2, Image as ImageIcon, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Models Guide 2025 | Sprinter AI",
  description: "Comprehensive guide to the latest AI models including GPT-5, Claude Opus, Gemini 2.5, and more. Understand capabilities, use cases, and implementation strategies.",
};

const models = [
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "OpenAI",
    category: "Large Language Model",
    releaseDate: "2025",
    icon: MessageSquare,
    capabilities: ["Advanced reasoning", "128K context", "Multimodal", "Code generation"],
    useCase: "Complex analysis, creative writing, and advanced coding tasks",
    description: "OpenAI's most advanced model with unprecedented reasoning capabilities and extended context window.",
    benchmarks: { "MMLU": "95.2%", "HumanEval": "92.1%", "Context": "128K tokens" },
    pricePerMillion: "$15.00",
    recommended: true,
  },
  {
    id: "claude-opus-4",
    name: "Claude Opus 4.1",
    provider: "Anthropic",
    category: "Large Language Model",
    releaseDate: "2025",
    icon: Brain,
    capabilities: ["Constitutional AI", "200K context", "Code analysis", "Research"],
    useCase: "Long-form content, research analysis, and complex document processing",
    description: "Anthropic's flagship model with industry-leading context window and safety features.",
    benchmarks: { "MMLU": "94.8%", "HumanEval": "91.5%", "Context": "200K tokens" },
    pricePerMillion: "$12.00",
    recommended: true,
  },
  {
    id: "gemini-2-5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    category: "Multimodal Model",
    releaseDate: "2025",
    icon: ImageIcon,
    capabilities: ["Image generation", "Video understanding", "Real-time processing", "Native multimodal"],
    useCase: "Visual content creation, real-time applications, and multimedia analysis",
    description: "Google's ultra-fast multimodal model with native image generation capabilities.",
    benchmarks: { "MMLU": "93.5%", "ViT Score": "98.2%", "Latency": "<100ms" },
    pricePerMillion: "$2.50",
    recommended: false,
  },
  {
    id: "llama-3-405b",
    name: "Llama 3 405B",
    provider: "Meta",
    category: "Open Source LLM",
    releaseDate: "2024",
    icon: Code2,
    capabilities: ["Open source", "Fine-tunable", "On-premise", "Cost-effective"],
    useCase: "Custom deployments, sensitive data processing, and specialized applications",
    description: "Meta's open-source powerhouse enabling custom AI deployments without vendor lock-in.",
    benchmarks: { "MMLU": "91.2%", "HumanEval": "88.7%", "Context": "32K tokens" },
    pricePerMillion: "Self-hosted",
    recommended: false,
  },
  {
    id: "mixtral-8x22b",
    name: "Mixtral 8x22B",
    provider: "Mistral AI",
    category: "MoE Model",
    releaseDate: "2024",
    icon: Zap,
    capabilities: ["Mixture of Experts", "Efficient inference", "32K context", "Multilingual"],
    useCase: "High-throughput applications, European languages, and cost-sensitive deployments",
    description: "Efficient Mixture of Experts architecture delivering GPT-4 level performance at lower cost.",
    benchmarks: { "MMLU": "89.5%", "HumanEval": "85.3%", "Context": "32K tokens" },
    pricePerMillion: "$0.70",
    recommended: false,
  },
  {
    id: "command-r-plus",
    name: "Command R+",
    provider: "Cohere",
    category: "RAG-Optimized",
    releaseDate: "2024",
    icon: Sparkles,
    capabilities: ["RAG-optimized", "Tool use", "Citations", "Multilingual"],
    useCase: "Enterprise search, document Q&A, and knowledge management systems",
    description: "Purpose-built for retrieval-augmented generation with built-in citation capabilities.",
    benchmarks: { "RAG Score": "96.1%", "Tool Use": "94.3%", "Context": "128K tokens" },
    pricePerMillion: "$3.00",
    recommended: false,
  },
  {
    id: "stable-diffusion-3",
    name: "Stable Diffusion 3",
    provider: "Stability AI",
    category: "Image Generation",
    releaseDate: "2024",
    icon: ImageIcon,
    capabilities: ["Text-to-image", "Image editing", "Style transfer", "Open source"],
    useCase: "Marketing visuals, product mockups, and creative content generation",
    description: "Leading open-source image generation model with commercial-friendly licensing.",
    benchmarks: { "FID Score": "7.2", "CLIP Score": "0.82", "Resolution": "Up to 8K" },
    pricePerMillion: "$0.002/image",
    recommended: false,
  },
  {
    id: "whisper-v3",
    name: "Whisper V3",
    provider: "OpenAI",
    category: "Speech Recognition",
    releaseDate: "2024",
    icon: MessageSquare,
    capabilities: ["Speech-to-text", "99 languages", "Real-time", "Noise robust"],
    useCase: "Meeting transcription, voice interfaces, and accessibility features",
    description: "State-of-the-art speech recognition with exceptional multilingual capabilities.",
    benchmarks: { "WER": "4.2%", "Languages": "99", "Real-time factor": "0.3x" },
    pricePerMillion: "$0.006/minute",
    recommended: false,
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    category: "Coding Model",
    releaseDate: "2025",
    icon: Code2,
    capabilities: ["Code generation", "Bug detection", "Refactoring", "Multi-language"],
    useCase: "Automated code review, pair programming, and development acceleration",
    description: "Specialized coding model outperforming general-purpose LLMs on programming tasks.",
    benchmarks: { "HumanEval": "95.3%", "MBPP": "92.8%", "Languages": "50+" },
    pricePerMillion: "$1.50",
    recommended: false,
  },
  {
    id: "phi-3",
    name: "Phi-3",
    provider: "Microsoft",
    category: "Small Language Model",
    releaseDate: "2024",
    icon: Zap,
    capabilities: ["Edge deployment", "Low latency", "3.8B parameters", "Efficient"],
    useCase: "Mobile apps, edge computing, and resource-constrained environments",
    description: "Microsoft's efficient small model delivering impressive performance for its size.",
    benchmarks: { "MMLU": "78.2%", "Size": "3.8B", "Latency": "<20ms" },
    pricePerMillion: "$0.10",
    recommended: false,
  },
];

export default function AIModelsPage() {
  const recommendedModels = models.filter(m => m.recommended);
  const otherModels = models.filter(m => !m.recommended);

  return (
    <div className="spr-theme spr-page min-h-screen">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-start/5 via-transparent to-brand-end/5" />
        
        <div className="relative container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4">2025 Model Landscape</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">
              AI Models: The Complete Guide
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Navigate the rapidly evolving landscape of AI models. From GPT-5 to specialized solutions, 
              understand capabilities, costs, and implementation strategies.
            </p>
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card">
              <CardHeader>
                <Brain className="w-8 h-8 text-brand-start mb-2" />
                <CardTitle>Model Explosion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Over 100+ production-ready models available, each optimized for specific use cases
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>Price/Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  90% cost reduction since 2023 while capabilities have increased 10x
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <Zap className="w-8 h-8 text-yellow-500 mb-2" />
                <CardTitle>Specialization Wins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Task-specific models outperform general models by 20-40% on domain tasks
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Models */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              PE Portfolio Recommended
            </h2>
            <div className="grid gap-6">
              {recommendedModels.map((model) => {
                const Icon = model.icon;
                return (
                  <Card key={model.id} className="glass-card border-yellow-500/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-brand-start/10">
                            <Icon className="w-6 h-6 text-brand-start" />
                          </div>
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {model.name}
                              <Badge variant="outline">{model.provider}</Badge>
                              <Badge className="bg-yellow-500/10 text-yellow-500">Recommended</Badge>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{model.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{model.pricePerMillion}</p>
                          <p className="text-xs text-muted-foreground">per million tokens</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{model.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Key Capabilities:</p>
                        <div className="flex flex-wrap gap-2">
                          {model.capabilities.map((cap) => (
                            <Badge key={cap} variant="secondary">{cap}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Best For:</p>
                        <p className="text-sm text-muted-foreground">{model.useCase}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 p-4 bg-card/50 rounded-lg">
                        {Object.entries(model.benchmarks).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-xs text-muted-foreground">{key}</p>
                            <p className="font-semibold">{value}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Other Notable Models */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Other Notable Models</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {otherModels.map((model) => {
                const Icon = model.icon;
                return (
                  <Card key={model.id} className="glass-card">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-card">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {model.name}
                            <Badge variant="outline" className="text-xs">{model.provider}</Badge>
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">{model.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{model.pricePerMillion}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">{model.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {model.capabilities.slice(0, 3).map((cap) => (
                          <Badge key={cap} variant="secondary" className="text-xs">{cap}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Selection Framework */}
          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Model Selection Framework</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">1. Define Your Requirements</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-card/50 rounded-lg">
                    <p className="font-medium mb-2">Performance Requirements</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Latency constraints (real-time vs. batch)</li>
                      <li>• Accuracy requirements</li>
                      <li>• Context window needs</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg">
                    <p className="font-medium mb-2">Business Constraints</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Budget and cost per request</li>
                      <li>• Data privacy requirements</li>
                      <li>• Deployment environment</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">2. Evaluate Options</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-card/50 rounded-lg">
                    <p className="font-medium mb-2">General Purpose</p>
                    <p className="text-sm text-muted-foreground">
                      GPT-5, Claude Opus for versatile applications
                    </p>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg">
                    <p className="font-medium mb-2">Specialized</p>
                    <p className="text-sm text-muted-foreground">
                      DeepSeek for code, Command R+ for RAG
                    </p>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg">
                    <p className="font-medium mb-2">Open Source</p>
                    <p className="text-sm text-muted-foreground">
                      Llama 3, Mixtral for custom deployments
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">3. Implementation Best Practices</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Start with API-based models for rapid prototyping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Implement model routing to optimize cost/performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Use caching and batching to reduce API costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Monitor performance and iterate based on real usage</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help Choosing the Right Model?</h2>
            <p className="text-muted-foreground mb-6">
              Our AI engineers can help you select and implement the optimal model mix for your portfolio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Get Model Recommendations
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/insights/implementation">
                <Button size="lg" variant="outline" className="gap-2">
                  View Implementation Guide
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