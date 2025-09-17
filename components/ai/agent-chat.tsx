"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Sparkles,
  Loader2,
  Minimize2,
  Maximize2,
  Settings,
  Code,
  Database,
  Image as ImageIcon,
  FileText,
  TrendingUp,
  Users,
  Briefcase,
  Cpu,
  Workflow,
  Shield,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getPublicAgents, getAdminAgents, getAgentById } from "@/lib/agents/registry";
import { AgentConfig } from "@/lib/agents/types";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: any[];
}

interface AgentChatProps {
  isAdmin?: boolean;
  pageContext?: {
    url: string;
    title: string;
    section?: string;
  };
  userProfile?: {
    email?: string;
    role?: string;
  };
  className?: string;
}

const agentIcons: Record<string, any> = {
  'content-manager': FileText,
  'analytics-agent': TrendingUp,
  'image-generator': ImageIcon,
  'database-manager': Database,
  'customer-support': Users,
  'sales-agent': Briefcase,
  'technical-advisor': Cpu,
  'workflow-automator': Workflow,
  'seo-specialist': Code,
  'governance-advisor': Shield,
};

export function AgentChat({ 
  isAdmin = false, 
  pageContext,
  userProfile,
  className 
}: AgentChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string>('customer-support');
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  
  const availableAgents = isAdmin ? [...getPublicAgents(), ...getAdminAgents()] : getPublicAgents();
  const currentAgent = getAgentById(selectedAgent);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Create the assistant message with empty content to start streaming
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      toolInvocations: []
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          agentId: selectedAgent,
          context: {
            isAdmin,
            pageContext,
            userProfile
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('0:')) {
                // Extract content from the streaming format
                const content = line.slice(2).replace(/^"(.*)"$/, '$1');
                if (content) {
                  fullContent += content;
                  // Update the assistant message in real-time
                  setMessages(prev => prev.map(msg =>
                    msg.id === assistantMessage.id
                      ? { ...msg, content: fullContent }
                      : msg
                  ));
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
        }
      }

      // Check if agent suggests handoff
      if (fullContent.includes('[HANDOFF]')) {
        const match = fullContent.match(/\[HANDOFF:(\w+)\]/);
        if (match) {
          const targetAgent = match[1];
          setSelectedAgent(targetAgent);
          toast.info(`Transferring to ${getAgentById(targetAgent)?.name}`);
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      // Remove the failed assistant message
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const regenerate = async () => {
    if (messages.length === 0) return;

    // Remove the last assistant message and resend the last user message
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      const messagesUpToLastUser = messages.slice(0, messages.lastIndexOf(lastUserMessage) + 1);
      setMessages(messagesUpToLastUser.slice(0, -1)); // Remove last assistant message
      await sendMessage(lastUserMessage.content);
    }
  };
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Auto-select agent based on page context
  useEffect(() => {
    if (pageContext?.section && isAdmin) {
      const sectionAgentMap: Record<string, string> = {
        'articles': 'content-manager',
        'images': 'image-generator',
        'analytics': 'analytics-agent',
        'settings': 'database-manager'
      };
      
      const mappedAgent = sectionAgentMap[pageContext.section];
      if (mappedAgent) {
        setSelectedAgent(mappedAgent);
      }
    }
  }, [pageContext, isAdmin]);
  
  const handleAgentChange = (agentId: string) => {
    setSelectedAgent(agentId);
    setShowAgentSelector(false);
    setMessages([]); // Clear messages when switching agents
    setError(null); // Clear any existing errors
    toast.success(`Switched to ${getAgentById(agentId)?.name}`);
  };
  
  const renderToolCall = (toolCall: any) => {
    return (
      <div className="mt-2 p-2 bg-muted/50 rounded-lg text-xs">
        <div className="flex items-center gap-2 mb-1">
          <Code className="w-3 h-3" />
          <span className="font-medium">{toolCall.toolName}</span>
        </div>
        {toolCall.args && (
          <pre className="text-muted-foreground overflow-x-auto">
            {JSON.stringify(toolCall.args, null, 2)}
          </pre>
        )}
      </div>
    );
  };
  
  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              "fixed bottom-6 right-6 z-50 p-4 bg-brand-gradient rounded-full shadow-2xl text-white hover:scale-110 transition-transform",
              className
            )}
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "fixed bottom-6 right-6 z-50 shadow-2xl",
              isMinimized ? "w-80" : "w-[500px]"
            )}
          >
            <Card 
              className="glass-card flex flex-col overflow-hidden border-2 border-border/50" 
              style={{ height: isMinimized ? "60px" : "650px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-brand-start/10 to-brand-end/10">
                <button
                  onClick={() => setShowAgentSelector(!showAgentSelector)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-1"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-brand-gradient text-white">
                      {currentAgent && React.createElement(
                        agentIcons[currentAgent.id] || Bot,
                        { className: "w-5 h-5" }
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{currentAgent?.name || 'AI Assistant'}</h3>
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform",
                        showAgentSelector && "rotate-180"
                      )} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {currentAgent?.description || 'Powered by AI'}
                    </p>
                  </div>
                </button>
                
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Agent Selector */}
              <AnimatePresence>
                {showAgentSelector && !isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b bg-card/50 overflow-hidden"
                  >
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground mb-2">Select an AI Agent:</p>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {availableAgents.map(agent => {
                          const Icon = agentIcons[agent.id] || Bot;
                          return (
                            <button
                              key={agent.id}
                              onClick={() => handleAgentChange(agent.id)}
                              className={cn(
                                "flex items-center gap-2 p-2 rounded-lg text-left hover:bg-muted transition-colors",
                                selectedAgent === agent.id && "bg-muted border border-brand-start"
                              )}
                            >
                              <Icon className="w-4 h-4 shrink-0 text-muted-foreground" />
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{agent.name}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {agent.capabilities.slice(0, 2).join(', ')}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.length === 0 && (
                        <div className="text-center py-8">
                          <Bot className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                          <p className="text-sm text-muted-foreground">
                            Hi! I'm {currentAgent?.name}. {currentAgent?.description}
                          </p>
                          <div className="flex flex-wrap gap-2 justify-center mt-4">
                            {currentAgent?.capabilities.slice(0, 3).map(cap => (
                              <Badge key={cap} variant="secondary" className="text-xs">
                                {cap.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex gap-3",
                            message.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          {message.role === "assistant" && (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-br from-brand-start to-brand-end text-white text-xs">
                                {React.createElement(
                                  agentIcons[selectedAgent] || Bot,
                                  { className: "w-4 h-4" }
                                )}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className={cn(
                            "max-w-[80%] space-y-2",
                            message.role === "user" ? "items-end" : "items-start"
                          )}>
                            <div className={cn(
                              "px-4 py-2 rounded-2xl",
                              message.role === "user" 
                                ? "bg-brand-gradient text-white" 
                                : "bg-card border"
                            )}>
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              
                              {/* Render tool calls if present */}
                              {message.toolInvocations?.map((tool: any, idx: number) => (
                                <div key={idx}>
                                  {renderToolCall(tool)}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {message.role === "user" && (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                <User className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                      
                      {isLoading && (
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gradient-to-br from-brand-start to-brand-end text-white">
                              {React.createElement(
                                agentIcons[selectedAgent] || Bot,
                                { className: "w-4 h-4" }
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className="px-4 py-2 bg-card border rounded-2xl">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {error && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                          <p className="text-sm text-destructive">
                            {error || 'An error occurred. Please try again.'}
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => regenerate()}
                            className="mt-2"
                          >
                            Retry
                          </Button>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Quick Actions */}
                  {currentAgent?.capabilities && (
                    <div className="p-3 border-t bg-muted/20">
                      <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentAgent.capabilities.includes('content_generation') && (
                          <Badge 
                            variant="outline" 
                            className="cursor-pointer hover:bg-card text-xs"
                            onClick={() => setInput("Help me write content for our landing page")}
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            Generate Content
                          </Badge>
                        )}
                        {currentAgent.capabilities.includes('image_generation') && (
                          <Badge 
                            variant="outline" 
                            className="cursor-pointer hover:bg-card text-xs"
                            onClick={() => setInput("Generate a hero image for the homepage")}
                          >
                            <ImageIcon className="w-3 h-3 mr-1" />
                            Create Image
                          </Badge>
                        )}
                        {currentAgent.capabilities.includes('data_analysis') && (
                          <Badge 
                            variant="outline" 
                            className="cursor-pointer hover:bg-card text-xs"
                            onClick={() => setInput("Show me our analytics dashboard")}
                          >
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Analytics
                          </Badge>
                        )}
                        {currentAgent.capabilities.includes('database_access') && (
                          <Badge 
                            variant="outline" 
                            className="cursor-pointer hover:bg-card text-xs"
                            onClick={() => setInput("Query the database for recent articles")}
                          >
                            <Database className="w-3 h-3 mr-1" />
                            Database
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t">
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      if (input.trim()) {
                        await sendMessage(input);
                        setInput('');
                      }
                    }} className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Ask ${currentAgent?.name || 'me'} anything...`}
                        disabled={isLoading}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}