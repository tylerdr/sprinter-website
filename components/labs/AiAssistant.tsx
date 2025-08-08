"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader,
  Search,
  Database,
  BarChart3,
  FileText,
  Code,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Zap,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
  reasoning?: string;
  isTyping?: boolean;
}

interface ToolCall {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  status: "running" | "completed" | "failed";
  description: string;
  result?: string;
}

interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  color: string;
  capabilities: string[];
}

const agents: Agent[] = [
  {
    id: "general",
    name: "General Assistant",
    icon: Bot,
    description: "Versatile AI assistant for general tasks and conversation",
    color: "from-blue-500 to-cyan-500",
    capabilities: ["General Q&A", "Task Planning", "Problem Solving"],
  },
  {
    id: "code",
    name: "Code Helper",
    icon: Code,
    description: "Specialized in programming, debugging, and code review",
    color: "from-emerald-500 to-teal-500",
    capabilities: ["Code Review", "Debugging", "Architecture", "Best Practices"],
  },
  {
    id: "data",
    name: "Data Analyst",
    icon: BarChart3,
    description: "Expert in data analysis, visualization, and insights",
    color: "from-purple-500 to-pink-500",
    capabilities: ["Data Analysis", "Visualization", "Statistics", "ML Models"],
  },
  {
    id: "creative",
    name: "Creative Writer",
    icon: Lightbulb,
    description: "Creative content generation and writing assistance",
    color: "from-orange-500 to-red-500",
    capabilities: ["Copywriting", "Content Strategy", "Creative Ideas", "Editing"],
  },
  {
    id: "business",
    name: "Business Strategist",
    icon: Brain,
    description: "Strategic business advice and market analysis",
    color: "from-indigo-500 to-purple-500",
    capabilities: ["Strategy", "Market Analysis", "Business Planning", "ROI Analysis"],
  },
];

const samplePrompts: Record<string, string[]> = {
  general: [
    "Help me plan my day efficiently",
    "Explain quantum computing in simple terms",
    "What's the best approach to learning a new skill?",
  ],
  code: [
    "Review this React component for performance issues",
    "Help me debug a memory leak in my Node.js app",
    "What's the best architecture for a microservices system?",
  ],
  data: [
    "Analyze this customer behavior dataset",
    "Create a machine learning model to predict sales",
    "What visualization would best show this trend?",
  ],
  creative: [
    "Write a compelling product launch announcement",
    "Create a social media campaign for our new app",
    "Generate creative names for a tech startup",
  ],
  business: [
    "Analyze the competitive landscape for SaaS tools",
    "Create a go-to-market strategy for our AI product",
    "What are the key metrics for measuring product success?",
  ],
};

const mockTools: Record<string, ToolCall[]> = {
  general: [
    {
      id: "web-search",
      name: "Web Search",
      icon: Search,
      status: "running",
      description: "Searching for latest information...",
    },
    {
      id: "knowledge-base",
      name: "Knowledge Lookup",
      icon: Database,
      status: "running",
      description: "Accessing knowledge base...",
    },
  ],
  code: [
    {
      id: "code-analysis",
      name: "Code Analysis",
      icon: Code,
      status: "running",
      description: "Analyzing code structure and patterns...",
    },
    {
      id: "security-scan",
      name: "Security Scan",
      icon: Search,
      status: "running",
      description: "Scanning for security vulnerabilities...",
    },
  ],
  data: [
    {
      id: "data-processing",
      name: "Data Processing",
      icon: Database,
      status: "running",
      description: "Processing and cleaning dataset...",
    },
    {
      id: "statistical-analysis",
      name: "Statistical Analysis",
      icon: BarChart3,
      status: "running",
      description: "Running statistical computations...",
    },
  ],
  creative: [
    {
      id: "content-generation",
      name: "Content Generation",
      icon: Lightbulb,
      status: "running",
      description: "Generating creative variations...",
    },
    {
      id: "tone-analysis",
      name: "Tone Analysis",
      icon: FileText,
      status: "running",
      description: "Analyzing tone and sentiment...",
    },
  ],
  business: [
    {
      id: "market-research",
      name: "Market Research",
      icon: Search,
      status: "running",
      description: "Gathering market intelligence...",
    },
    {
      id: "competitive-analysis",
      name: "Competitive Analysis",
      icon: BarChart3,
      status: "running",
      description: "Analyzing competitor strategies...",
    },
  ],
};

export default function AiAssistant() {
  const [selectedAgent, setSelectedAgent] = useState<string>("general");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [expandedReasoning, setExpandedReasoning] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentAgent = agents.find((agent) => agent.id === selectedAgent)!;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string, agentId: string): Promise<Message> => {
    const tools = mockTools[agentId] || [];
    const reasoning = generateReasoning(userMessage, agentId);
    
    // Simulate tool execution
    const toolCalls = tools.map(tool => ({ ...tool, status: "running" as const }));
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    // Complete tools
    const completedTools = toolCalls.map(tool => ({
      ...tool,
      status: "completed" as const,
      result: `Successfully completed ${tool.name.toLowerCase()}`
    }));

    const responses: Record<string, string> = {
      general: `Based on my analysis using web search and knowledge base lookup, I can help you with that. Here's a comprehensive approach:\n\n1. **Initial Assessment**: I've analyzed your request and identified key areas to focus on.\n\n2. **Recommendations**: Based on current best practices and recent developments, I recommend the following steps.\n\n3. **Implementation**: Here's how you can put this into action effectively.\n\n4. **Follow-up**: I'll monitor the results and suggest improvements as needed.`,
      code: `After analyzing your code with my specialized tools, here's what I found:\n\n🔍 **Code Analysis Results:**\n- Structure: Well-organized with clear separation of concerns\n- Performance: Identified 2 potential optimizations\n- Security: No critical vulnerabilities detected\n\n📋 **Recommendations:**\n1. Consider memoizing expensive calculations\n2. Implement error boundaries for better error handling\n3. Add TypeScript for better type safety\n\n🛠️ **Next Steps:**\nWould you like me to help implement any of these improvements?`,
      data: `I've processed your data and run comprehensive statistical analysis. Here are the key insights:\n\n📊 **Data Summary:**\n- Dataset size: 10,247 records\n- Missing values: 0.3%\n- Data quality score: 94/100\n\n📈 **Key Findings:**\n1. Strong correlation (0.87) between variables A and B\n2. Seasonal patterns detected in time series data\n3. Three distinct customer segments identified\n\n🎯 **Actionable Insights:**\n- Segment 1 shows highest lifetime value potential\n- Peak activity occurs during Q4\n- Recommend targeted campaigns for each segment`,
      creative: `I've generated several creative approaches for your project:\n\n✨ **Creative Concepts:**\n\n**Option 1: "Bold & Direct"**\n- Strong, attention-grabbing headlines\n- Clean, modern design aesthetic\n- Focus on immediate value proposition\n\n**Option 2: "Story-Driven"**\n- Narrative-based content structure\n- Emotional connection points\n- Customer success stories\n\n**Option 3: "Interactive Experience"**\n- Engaging, dynamic content\n- User participation elements\n- Gamification components\n\n🎨 **Tone Analysis:** The optimal tone for your audience is professional yet approachable, with confidence and innovation as key themes.`,
      business: `After conducting comprehensive market research and competitive analysis, here's my strategic assessment:\n\n🎯 **Market Analysis:**\n- Market size: $12.3B with 15% YoY growth\n- Key trends: AI adoption, automation demand\n- Opportunity gap: Mid-market solutions\n\n🏆 **Competitive Landscape:**\n- 5 major players control 60% market share\n- Gap in customer service excellence\n- Pricing opportunity in premium segment\n\n📈 **Strategic Recommendations:**\n1. **Target Market:** Focus on mid-market enterprises (500-2000 employees)\n2. **Differentiation:** Superior customer experience + AI integration\n3. **Pricing:** Premium positioning with clear ROI demonstration\n4. **Timeline:** 6-month MVP, 12-month market entry\n\n💰 **Projected ROI:** 300% within 24 months based on market analysis`
    };

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: responses[agentId] || responses.general,
      timestamp: new Date(),
      toolCalls: completedTools,
      reasoning,
    };
  };

  const generateReasoning = (userMessage: string, agentId: string): string => {
    const reasoningTemplates: Record<string, string> = {
      general: `**Reasoning Process:**\n\n1. **Query Analysis**: Parsed the user's request to identify key intent and requirements\n2. **Knowledge Retrieval**: Accessed relevant information from multiple sources\n3. **Context Evaluation**: Considered current best practices and recent developments\n4. **Solution Synthesis**: Combined insights to create a comprehensive response\n5. **Quality Check**: Verified accuracy and relevance of recommendations`,
      code: `**Code Analysis Reasoning:**\n\n1. **Syntax Review**: Scanned for syntax errors and code structure issues\n2. **Performance Analysis**: Identified potential bottlenecks and optimization opportunities\n3. **Security Assessment**: Checked for common vulnerabilities and security patterns\n4. **Best Practices**: Evaluated against industry standards and conventions\n5. **Maintainability**: Assessed code readability and long-term sustainability`,
      data: `**Data Analysis Reasoning:**\n\n1. **Data Profiling**: Examined data quality, completeness, and distribution\n2. **Statistical Testing**: Applied appropriate statistical methods and tests\n3. **Pattern Recognition**: Identified trends, correlations, and anomalies\n4. **Validation**: Cross-validated findings using multiple analytical approaches\n5. **Insight Generation**: Translated statistical results into actionable business insights`,
      creative: `**Creative Process:**\n\n1. **Audience Analysis**: Studied target demographic and preferences\n2. **Trend Research**: Analyzed current creative trends and successful campaigns\n3. **Brainstorming**: Generated multiple creative concepts using various techniques\n4. **Evaluation**: Assessed each concept against objectives and constraints\n5. **Refinement**: Polished selected concepts for maximum impact`,
      business: `**Strategic Analysis Process:**\n\n1. **Market Research**: Gathered comprehensive market data and trends\n2. **Competitive Intelligence**: Analyzed competitor strategies and positioning\n3. **SWOT Analysis**: Evaluated strengths, weaknesses, opportunities, and threats\n4. **Financial Modeling**: Created projections and ROI calculations\n5. **Strategic Synthesis**: Developed integrated strategy recommendations`
    };

    return reasoningTemplates[agentId] || reasoningTemplates.general;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: "typing",
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await generateResponse(input, selectedAgent);
      
      // Remove typing indicator and add real response
      setMessages(prev => [...prev.filter(m => m.id !== "typing"), response]);
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const selectSamplePrompt = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Agent Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <div className="p-4 sm:p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm">
          <label className="block text-sm font-medium mb-3">Choose Your AI Agent:</label>
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-full bg-card/10 border-border/20">
              <SelectValue>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${currentAgent.color}`}>
                    <currentAgent.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{currentAgent.name}</div>
                    <div className="text-xs text-muted-foreground">{currentAgent.description}</div>
                  </div>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  <div className="flex items-center gap-3 py-1">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${agent.color}`}>
                      <agent.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">{agent.description}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {agent.capabilities.map((cap) => (
                          <span key={cap} className="text-xs px-2 py-0.5 bg-accent/20 rounded-full">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Sample Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 sm:mb-8"
      >
        <div className="p-4 sm:p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm">
          <h3 className="text-sm font-medium mb-3">Try these sample prompts:</h3>
          <div className="flex flex-wrap gap-2">
            {samplePrompts[selectedAgent]?.map((prompt, index) => (
              <Button
                key={index}
                variant="soft"
                size="sm"
                onClick={() => selectSamplePrompt(prompt)}
                className="text-xs hover:bg-brand-10/80 transition-colors"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm overflow-hidden"
      >
        {/* Messages */}
        <ScrollArea className="h-[500px] p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className={`p-4 rounded-xl bg-gradient-to-r ${currentAgent.color} mb-4`}>
                <currentAgent.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Chat with {currentAgent.name}</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                I&apos;m ready to help! Try one of the sample prompts above or ask me anything within my specialty.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3 sm:gap-4",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-r ${currentAgent.color}`}>
                      <currentAgent.icon className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div className={cn(
                    "max-w-[80%] sm:max-w-[70%]",
                    message.role === "user" ? "order-2" : ""
                  )}>
                    {/* Message Content */}
                    <div className={cn(
                      "rounded-xl px-4 py-3",
                      message.role === "user"
                        ? "bg-brand-10 text-foreground"
                        : "bg-card/10 border border-border/20"
                    )}>
                      {message.isTyping ? (
                        <div className="flex items-center gap-2">
                          <Loader className="w-4 h-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">
                            {currentAgent.name} is thinking...
                          </span>
                        </div>
                      ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {message.content}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tool Calls */}
                    {message.toolCalls && message.toolCalls.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs font-medium text-muted-foreground mb-2">
                          🔧 Tools Used:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {message.toolCalls.map((tool) => (
                            <div
                              key={tool.id}
                              className="flex items-center gap-2 p-2 rounded-lg bg-card/10 border border-border/20"
                            >
                              <tool.icon className="w-4 h-4 text-muted-foreground" />
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium truncate">{tool.name}</div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {tool.status === "completed" ? tool.result : tool.description}
                                </div>
                              </div>
                              {tool.status === "running" && (
                                <Loader className="w-3 h-3 animate-spin text-brand" />
                              )}
                              {tool.status === "completed" && (
                                <Zap className="w-3 h-3 text-success" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reasoning Section */}
                    {message.reasoning && (
                      <div className="mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedReasoning(
                            expandedReasoning === message.id ? null : message.id
                          )}
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          <Brain className="w-3 h-3 mr-1" />
                          View Reasoning
                          {expandedReasoning === message.id ? (
                            <ChevronUp className="w-3 h-3 ml-1" />
                          ) : (
                            <ChevronDown className="w-3 h-3 ml-1" />
                          )}
                        </Button>
                        
                        <AnimatePresence>
                          {expandedReasoning === message.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 p-3 rounded-lg bg-muted/10 border border-border/20"
                            >
                              <div className="text-xs whitespace-pre-wrap text-muted-foreground leading-relaxed">
                                {message.reasoning}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.role === "user" && (
                    <div className="flex-shrink-0 p-2 rounded-lg bg-muted/20 order-1">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border/10 p-4 sm:p-6">
          <div className="flex gap-2 sm:gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask ${currentAgent.name} anything...`}
              className="flex-1 px-4 py-3 rounded-lg bg-card/10 border border-border/20 focus:border-brand focus:outline-none transition-colors text-sm sm:text-base touch-manipulation"
              disabled={isTyping}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="bg-brand-gradient hover:opacity-90 text-primary-foreground px-4 sm:px-6"
            >
              {isTyping ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}