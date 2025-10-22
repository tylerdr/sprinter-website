"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, FileText, Globe, AlertCircle, Sparkles, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { FileUploader } from "@/components/tools/FileUploader";
import { Citation, CitationList, type Citation as CitationType } from "@/components/tools/Citation";
import { EmailCaptureModal, type LeadData } from "@/components/tools/EmailCaptureModal";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  citations?: CitationType[];
  timestamp: Date;
}

interface SessionState {
  questionsRemaining: number;
  documentLoaded: boolean;
  sessionId: string;
}

export default function ChatMySpecPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<SessionState>({
    questionsRemaining: 5,
    documentLoaded: false,
    sessionId: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [isProcessingDocument, setIsProcessingDocument] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockCitations: CitationType[] = [
    {
      id: "c1",
      source: "Technical Specification Section 3.2",
      page: 12,
      paragraph: 3,
      text: "All equipment shall comply with NEMA 4X standards for outdoor installations...",
      confidence: 0.92,
      documentName: "Equipment_Spec_v2.pdf"
    },
    {
      id: "c2", 
      source: "Contract Terms Section 5.1",
      page: 8,
      paragraph: 1,
      text: "Warranty period shall commence upon final acceptance and shall be valid for 24 months...",
      confidence: 0.88,
      documentName: "Contract_Terms.pdf"
    }
  ];

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsProcessingDocument(true);
    
    // Simulate document processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setSession(prev => ({
      ...prev,
      documentLoaded: true,
      sessionId: Math.random().toString(36).substring(7)
    }));
    
    setIsProcessingDocument(false);
    
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Great! I've analyzed your document "${file.name}". You have 5 free questions to ask about this document. What would you like to know?`,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  };

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) return;
    
    setIsProcessingDocument(true);
    
    // Simulate URL processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setSession(prev => ({
      ...prev,
      documentLoaded: true,
      sessionId: Math.random().toString(36).substring(7)
    }));
    
    setIsProcessingDocument(false);
    
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'assistant', 
      content: `I've successfully loaded and analyzed the content from ${urlInput}. You have 5 free questions to explore this document. What would you like to know?`,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || session.questionsRemaining <= 0) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: generateMockResponse(inputValue),
      citations: Math.random() > 0.5 ? mockCitations.slice(0, Math.floor(Math.random() * 2) + 1) : undefined,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setSession(prev => ({
      ...prev,
      questionsRemaining: prev.questionsRemaining - 1
    }));
    
    setIsLoading(false);
    
    // Show email modal if this was the last question
    if (session.questionsRemaining === 1) {
      setTimeout(() => setShowEmailModal(true), 1000);
    }
  };

  const generateMockResponse = (question: string): string => {
    const responses = [
      "Based on the document analysis, I can see that this requirement is specified in Section 3.2. The key points include compliance with industry standards and specific performance criteria.",
      "According to the contract terms, this clause appears in multiple sections with some important conditions. Let me break down the main requirements for you.",
      "The specification document indicates that this particular aspect has both mandatory and optional components. Here's what's explicitly stated:",
      "From my analysis of the document, this requirement has specific timelines and deliverables attached. The document outlines the following process:",
      "This is an interesting question about the technical specifications. The document provides detailed guidance on implementation and compliance requirements."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleEmailCapture = async (leadData: LeadData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset session with unlimited questions
    setSession(prev => ({
      ...prev,
      questionsRemaining: -1 // -1 indicates unlimited
    }));
    
    setShowEmailModal(false);
    
    const unlockMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'assistant',
      content: "Welcome back! You now have unlimited questions for this session. Feel free to dive deeper into your document analysis.",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, unlockMessage]);
  };

  const resetSession = () => {
    setMessages([]);
    setSelectedFile(null);
    setUrlInput("");
    setSession({
      questionsRemaining: 5,
      documentLoaded: false,
      sessionId: ""
    });
  };

  if (!session.documentLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
        {/* Header */}
        <div className="container mx-auto px-4 sm:px-6 pt-20 pb-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-start to-brand-end flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold gradient-text">Chat My Spec</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Upload any document or enter a URL and have a conversation with your content. 
              Ask questions, get specific citations, and understand complex documents instantly.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                PDF, Word, Web URLs
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                5 free questions
              </div>
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                Instant responses with citations
              </div>
            </div>
          </div>
        </div>

        {/* Upload Interface */}
        <div className="container mx-auto px-4 sm:px-6 pb-12">
          <div className="max-w-2xl mx-auto">
            {isProcessingDocument ? (
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-brand border-t-transparent animate-spin rounded-full" />
                    Processing Document
                  </CardTitle>
                  <CardDescription>
                    Analyzing content and preparing for chat...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={66} className="mb-4" />
                  <p className="text-center text-sm text-muted-foreground">
                    This usually takes 15-30 seconds
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "upload" | "url")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                  <TabsTrigger value="url">From URL</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-6">
                  <FileUploader
                    onFileSelect={handleFileSelect}
                    accept=".pdf,.doc,.docx,.txt"
                    maxSizeMB={10}
                    title="Upload Your Document"
                    description="Support for PDFs, Word documents, and text files up to 10MB"
                  />
                </TabsContent>

                <TabsContent value="url" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Load from URL
                      </CardTitle>
                      <CardDescription>
                        Enter a URL to any publicly accessible document or webpage
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="https://example.com/document.pdf"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                        />
                        <Button onClick={handleUrlSubmit} disabled={!urlInput.trim()}>
                          Load
                        </Button>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <p>Supported: Web pages, PDF links, Google Drive (public), Dropbox (public)</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}

            {/* Sample Documents */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">Or try a sample document:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const sampleFile = new File(['sample'], 'api-documentation.pdf', { type: 'application/pdf' });
                    handleFileSelect(sampleFile);
                  }}
                >
                  API Documentation
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const sampleFile = new File(['sample'], 'compliance-manual.pdf', { type: 'application/pdf' });
                    handleFileSelect(sampleFile);
                  }}
                >
                  Compliance Manual
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const sampleFile = new File(['sample'], 'project-requirements.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                    handleFileSelect(sampleFile);
                  }}
                >
                  Project Requirements
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-brand" />
              Chat My Spec
            </h1>
            <p className="text-sm text-muted-foreground">
              Document: {selectedFile?.name || new URL(urlInput || 'http://example.com').pathname}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {session.questionsRemaining > 0 ? (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {session.questionsRemaining} questions left
              </Badge>
            ) : session.questionsRemaining === -1 ? (
              <Badge variant="default" className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Unlimited
              </Badge>
            ) : (
              <Badge variant="destructive">No questions remaining</Badge>
            )}
            
            <Button variant="outline" size="sm" onClick={resetSession}>
              New Document
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 sm:px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex w-full",
                    message.type === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2 space-y-2",
                      message.type === 'user'
                        ? "bg-brand text-white ml-12"
                        : "bg-muted mr-12"
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.citations && message.citations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-muted-foreground/20">
                        <CitationList
                          citations={message.citations}
                          variant="compact"
                          showConfidence={false}
                          title="Sources"
                        />
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground/70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-muted rounded-lg px-4 py-2 mr-12">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">Analyzing document...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input Area */}
            <div className="border-t p-4">
              {session.questionsRemaining === 0 ? (
                <Alert>
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <span>You've used all 5 free questions. Enter your email to continue the conversation.</span>
                    <Button size="sm" onClick={() => setShowEmailModal(true)}>
                      Continue Chat
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a question about your document..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    disabled={isLoading || session.questionsRemaining === 0}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputValue.trim() || isLoading || session.questionsRemaining === 0}
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              {session.questionsRemaining > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Ask detailed questions, request specific sections, or explore technical requirements. 
                  {session.questionsRemaining} questions remaining in free tier.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailCapture}
        title="Continue Your Conversation"
        description="Get unlimited questions and advanced document analysis features."
        benefits={[
          "Unlimited questions for this session",
          "Advanced search across document sections", 
          "Export chat history and citations",
          "Priority response times",
          "Multi-document comparison features"
        ]}
        buttonText="Continue Chatting"
        downloadType="access"
      />
    </div>
  );
}