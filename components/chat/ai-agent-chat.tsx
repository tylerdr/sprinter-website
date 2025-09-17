"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Image as ImageIcon,
  Sparkles,
  Loader2,
  Download,
  Copy,
  RefreshCw,
  Wand2,
  Minimize2,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: string;
  timestamp: Date;
  isGeneratingImage?: boolean;
}

export function AIAgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI assistant powered by Gemini 2.5 Flash. I can help with questions about Sprinter AI, generate images for your website, and assist with content creation. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Check if user is requesting an image
    const isImageRequest = input.toLowerCase().includes("image") || 
                          input.toLowerCase().includes("generate") ||
                          input.toLowerCase().includes("create") ||
                          input.toLowerCase().includes("design") ||
                          input.toLowerCase().includes("visual");

    try {
      if (isImageRequest) {
        // Generate image with Gemini 2.5 Flash
        await generateImage(input);
      } else {
        // Regular chat response
        await generateChatResponse(input);
      }
    } catch (error) {
      console.error("Error in chat:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateChatResponse = async (prompt: string) => {
    // Simulate API call to chat endpoint
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, context: "website_admin" })
    });

    if (!response.ok) {
      throw new Error("Failed to get response");
    }

    const data = await response.json();
    
    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: data.response || getSimulatedResponse(prompt),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
  };

  const generateImage = async (prompt: string) => {
    setIsGeneratingImage(true);
    
    const generatingMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: "I'm generating an image based on your request. This may take a moment...",
      timestamp: new Date(),
      isGeneratingImage: true
    };
    
    setMessages(prev => [...prev, generatingMessage]);

    try {
      // Call to Gemini 2.5 Flash Image API
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt,
          model: "gemini-2.5-flash",
          purpose: "website_content"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      
      // Update the message with the generated image
      setMessages(prev => prev.map(msg => 
        msg.id === generatingMessage.id 
          ? {
              ...msg,
              content: "Here's the image I generated for you:",
              image: data.imageUrl || "/api/placeholder/512/512",
              isGeneratingImage: false
            }
          : msg
      ));

      // Add follow-up message
      const followUpMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I've generated this image based on your request. You can download it or ask me to create variations. Would you like me to add this to your website's image library?",
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, followUpMessage]);
      }, 500);

    } catch (error) {
      console.error("Image generation error:", error);
      
      // Update with error message
      setMessages(prev => prev.map(msg => 
        msg.id === generatingMessage.id 
          ? {
              ...msg,
              content: "I've created a placeholder image for demonstration. In production, this would use Gemini 2.5 Flash to generate custom images.",
              image: "/api/placeholder/512/512",
              isGeneratingImage: false
            }
          : msg
      ));
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const getSimulatedResponse = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes("help") || lowerPrompt.includes("what can you do")) {
      return "I can help you with:\n\n• Generating images for your website using Gemini 2.5 Flash\n• Creating and editing content\n• Managing your CMS\n• Answering questions about Sprinter AI\n• Providing AI implementation advice\n\nJust ask me anything!";
    }
    
    if (lowerPrompt.includes("pricing") || lowerPrompt.includes("cost")) {
      return "Sprinter AI offers several engagement models:\n\n• AI Implementation Sprint: $50,000 (5 days)\n• AI Operations Partner: $50,000/month\n• Enterprise Partnership: Custom pricing\n\nAll packages include guaranteed ROI. Would you like more details about any specific package?";
    }
    
    if (lowerPrompt.includes("cms") || lowerPrompt.includes("admin")) {
      return "The CMS allows you to:\n\n• Manage articles and blog posts\n• Upload and organize images\n• Edit content blocks\n• Configure site settings\n• Manage admin users\n\nYou can access it at /admin. Need help with a specific feature?";
    }
    
    return "I understand you're asking about: \"" + prompt + "\". Let me help you with that. For production, this would connect to our AI backend for intelligent responses. What specific aspect would you like to know more about?";
  };

  const handleDownloadImage = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.png`;
    link.click();
    toast.success("Image downloaded!");
  };

  const handleCopyImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      toast.success("Image copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy image");
    }
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
            className="fixed bottom-6 right-6 z-50 p-4 bg-brand-gradient rounded-full shadow-2xl text-white hover:scale-110 transition-transform"
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-400" />
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
              isMinimized ? "w-80" : "w-[450px]"
            )}
          >
            <Card className="glass-card flex flex-col overflow-hidden" style={{ height: isMinimized ? "60px" : "600px" }}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-brand-start/10 to-brand-end/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Powered by Gemini 2.5 Flash</p>
                  </div>
                </div>
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

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex gap-3",
                            message.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          {message.role === "assistant" && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center shrink-0">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
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
                              {message.isGeneratingImage ? (
                                <div className="flex items-center gap-2">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>{message.content}</span>
                                </div>
                              ) : (
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              )}
                            </div>
                            
                            {message.image && (
                              <div className="space-y-2">
                                <div className="relative group">
                                  <img
                                    src={message.image}
                                    alt="Generated image"
                                    className="rounded-lg max-w-full"
                                  />
                                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() => handleDownloadImage(message.image!)}
                                    >
                                      <Download className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() => handleCopyImage(message.image!)}
                                    >
                                      <Copy className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <p className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          
                          {message.role === "user" && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                              <User className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {isLoading && (
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="px-4 py-2 bg-card border rounded-2xl">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Quick Actions */}
                  <div className="p-3 border-t">
                    <div className="flex gap-2 mb-3">
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-card"
                        onClick={() => setInput("Generate a hero image for the homepage")}
                      >
                        <ImageIcon className="w-3 h-3 mr-1" />
                        Generate Image
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-card"
                        onClick={() => setInput("Help me write content for the about page")}
                      >
                        <Wand2 className="w-3 h-3 mr-1" />
                        Write Content
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-card"
                        onClick={() => setInput("Show me how to use the CMS")}
                      >
                        CMS Help
                      </Badge>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t">
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything or request an image..."
                        disabled={isLoading || isGeneratingImage}
                        className="flex-1"
                      />
                      <Button 
                        type="submit" 
                        disabled={isLoading || isGeneratingImage || !input.trim()}
                      >
                        {isLoading || isGeneratingImage ? (
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