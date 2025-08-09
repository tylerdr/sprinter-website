"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  Settings,
  RotateCcw,
  Zap,
  Clock,
  Phone,
  PhoneOff,
  User,
  Bot,
  Loader,
  Wifi,
  WifiOff,
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

interface VoiceMessage {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  duration?: number;
  isInterruption?: boolean;
}

interface VoiceSettings {
  voice: "male" | "female" | "natural";
  inputMode: "push-to-talk" | "auto-detect";
  volume: number;
  sensitivity: number;
}

const voiceOptions = [
  { value: "male", label: "Male Voice", description: "Deep, professional tone" },
  { value: "female", label: "Female Voice", description: "Clear, friendly tone" },
  { value: "natural", label: "Natural AI", description: "Adaptive, context-aware" },
];

const sampleConversations = [
  {
    title: "AI Development Discussion",
    messages: [
      { role: "user", text: "What are the latest trends in AI development?" },
      { 
        role: "assistant", 
        text: "Great question! We're seeing fascinating developments in several key areas. First, there's been remarkable progress in multimodal AI systems that can understand and generate text, images, and audio simultaneously. Large language models are becoming more efficient and capable, with techniques like retrieval-augmented generation improving accuracy. AI agents are also evolving rapidly, becoming better at autonomous reasoning and tool usage. What specific aspect interests you most?" 
      },
      { role: "user", text: "Tell me more about AI agents and their capabilities." },
      { 
        role: "assistant", 
        text: "AI agents represent one of the most exciting frontiers in AI. Unlike traditional chatbots, modern AI agents can plan multi-step tasks, use external tools, and maintain context across complex workflows. They can write code, analyze data, make API calls, and even collaborate with other agents. We're seeing agents that can handle customer service, automate business processes, and assist with creative tasks. The key breakthrough is their ability to break down complex problems into manageable steps and execute them autonomously." 
      }
    ]
  },
  {
    title: "Technology Startup Advice",
    messages: [
      { role: "user", text: "I'm thinking about starting an AI company. What should I consider?" },
      { 
        role: "assistant", 
        text: "Starting an AI company is incredibly exciting! First, identify a specific problem you're passionate about solving - AI is a tool, not a destination. Consider your technical expertise and team composition; you'll need strong engineering talent and domain expertise. Think about data access and computational resources early on. The competitive landscape moves fast, so focus on building something defensible through unique data, superior user experience, or specialized knowledge. What problem area are you most interested in tackling?" 
      },
      { role: "user", text: "I want to focus on healthcare AI. Any specific advice?" },
      { 
        role: "assistant", 
        text: "Healthcare AI is a fantastic but complex field! Regulatory compliance is crucial - you'll need to understand FDA requirements, HIPAA, and medical device regulations depending on your approach. Consider starting with non-diagnostic applications like workflow optimization or administrative tasks, as these have lower regulatory barriers. Building relationships with healthcare professionals is essential for understanding real needs and getting adoption. Data privacy and security are paramount. Also, be prepared for longer sales cycles and extensive validation requirements. Have you identified a specific use case or specialty area?" 
      }
    ]
  }
];

export default function VoiceChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPushToTalkActive, setIsPushToTalkActive] = useState(false);
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [, setIsTyping] = useState(false);
  const [settings, setSettings] = useState<VoiceSettings>({
    voice: "natural",
    inputMode: "auto-detect",
    volume: 80,
    sensitivity: 70,
  });
  const [connectionLatency, setConnectionLatency] = useState(45);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize audio context and analyzer
  useEffect(() => {
    if (typeof window !== "undefined" && window.AudioContext) {
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }
    
    return () => {
      if (audioContextRef.current?.state === "running") {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Simulate audio levels for visual feedback
  const updateAudioLevels = useCallback(() => {
    if (isListening || isSpeaking) {
      const newLevels = Array.from({ length: 32 }, () => 
        Math.random() * (isSpeaking ? 0.8 : 0.6) + (isSpeaking ? 0.2 : 0.1)
      );
      setAudioLevels(newLevels);
    } else {
      setAudioLevels(Array.from({ length: 32 }, () => Math.random() * 0.1));
    }
    
    if (isConnected) {
      animationFrameRef.current = requestAnimationFrame(updateAudioLevels);
    }
  }, [isListening, isSpeaking, isConnected]);

  useEffect(() => {
    if (isConnected) {
      updateAudioLevels();
    }
  }, [isConnected, updateAudioLevels]);

  // Simulate connection latency changes
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setConnectionLatency(prev => {
          const change = Math.random() * 20 - 10;
          return Math.max(20, Math.min(100, prev + change));
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connect = async () => {
    setIsConnected(true);
    setMessages([{
      id: Date.now().toString(),
      type: "system",
      content: "🎯 Connected to Sprinter AI Voice Assistant",
      timestamp: new Date(),
    }]);
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: "assistant",
      content: "Hello! I'm your Sprinter AI assistant. I'm ready for our voice conversation. You can ask me about AI technology, business strategy, or anything else you'd like to discuss. How can I help you today?",
      timestamp: new Date(),
      duration: 4.2,
    }]);
  };

  const disconnect = () => {
    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
    setIsPushToTalkActive(false);
    setMessages([]);
    setCurrentTranscript("");
    setIsTyping(false);
  };

  const startListening = () => {
    if (!isConnected) return;
    
    setIsListening(true);
    setCurrentTranscript("");
    
    // Simulate speech recognition
    simulateSpeechRecognition();
  };

  const stopListening = () => {
    setIsListening(false);
    if (currentTranscript) {
      processUserSpeech(currentTranscript);
      setCurrentTranscript("");
    }
  };

  const simulateSpeechRecognition = () => {
    const samplePhrases = [
      "What are the latest trends in AI development?",
      "How can AI help my business?",
      "Tell me about large language models",
      "What's the future of artificial intelligence?",
      "Can you explain machine learning in simple terms?",
      "I'm thinking about starting an AI company",
      "How does natural language processing work?",
      "What are the benefits of AI automation?",
    ];

    const randomPhrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
    const words = randomPhrase.split(" ");
    let currentText = "";

    words.forEach((word, index) => {
      setTimeout(() => {
        currentText += word + " ";
        setCurrentTranscript(currentText.trim());
        
        if (index === words.length - 1) {
          setTimeout(() => {
            if (settings.inputMode === "auto-detect") {
              stopListening();
            }
          }, 1000);
        }
      }, index * 200 + Math.random() * 100);
    });
  };

  const processUserSpeech = async (text: string) => {
    const userMessage: VoiceMessage = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
      duration: text.length * 0.1 + 1,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Add typing indicator
    const typingMessage: VoiceMessage = {
      id: "typing",
      type: "assistant",
      content: "",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Generate AI response
    const response = generateAIResponse(text);
    
    setMessages(prev => [...prev.filter(m => m.id !== "typing"), {
      id: Date.now().toString(),
      type: "assistant",
      content: response,
      timestamp: new Date(),
      duration: response.length * 0.08 + 2,
    }]);
    
    setIsTyping(false);
    
    // Simulate AI speaking
    setIsSpeaking(true);
    setTimeout(() => {
      setIsSpeaking(false);
    }, response.length * 80 + 2000);
  };

  const generateAIResponse = (userText: string): string => {
    const responses = {
      "ai": "AI technology is rapidly evolving with exciting developments in large language models, computer vision, and autonomous systems. We're seeing breakthrough applications in healthcare, finance, and creative industries. The key is finding the right balance between automation and human oversight.",
      "business": "AI can transform your business through intelligent automation, data-driven insights, and enhanced customer experiences. Start by identifying repetitive tasks and areas where decision-making could benefit from data analysis. The ROI typically becomes apparent within 6-12 months of implementation.",
      "machine learning": "Machine learning is like teaching computers to recognize patterns and make predictions from data, similar to how humans learn from experience. It involves algorithms that automatically improve their performance as they process more information, enabling everything from recommendation systems to autonomous vehicles.",
      "future": "The future of AI is incredibly promising! We're moving toward more integrated, multimodal systems that can understand context across different types of data. AI will become more collaborative, working alongside humans as intelligent partners rather than replacements.",
      "startup": "Starting an AI company requires a clear problem focus, strong technical team, and access to quality data. Consider regulatory requirements early, especially in healthcare or finance. Focus on building defensible advantages through unique data, superior user experience, or specialized domain expertise.",
      "language": "Natural language processing has made remarkable strides with transformer architectures and large language models. These systems can now understand context, maintain coherent conversations, and even perform complex reasoning tasks while generating human-like responses.",
      "automation": "AI automation excels at handling repetitive, rule-based tasks while providing consistency and 24/7 availability. The key benefits include cost reduction, improved accuracy, faster processing, and freeing up human workers for more creative and strategic activities.",
    };

    // Simple keyword matching for demo purposes
    const lowerText = userText.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowerText.includes(keyword)) {
        return response;
      }
    }

    return "That's a fascinating question! AI technology continues to evolve rapidly, offering new possibilities across industries. From my experience working with various organizations, I've seen how the right AI implementation can transform workflows and unlock new opportunities. What specific aspect would you like to explore further?";
  };

  const handlePushToTalk = (active: boolean) => {
    setIsPushToTalkActive(active);
    if (active) {
      startListening();
    } else {
      stopListening();
    }
  };

  const loadSampleConversation = (conversation: typeof sampleConversations[0]) => {
    setMessages([
      {
        id: "sample-start",
        type: "system",
        content: `📝 Loading sample conversation: "${conversation.title}"`,
        timestamp: new Date(),
      }
    ]);

    conversation.messages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `sample-${index}`,
          type: msg.role as "user" | "assistant",
          content: msg.text,
          timestamp: new Date(),
          duration: msg.text.length * 0.08 + 1.5,
        }]);
      }, index * 2000);
    });
  };

  const WaveformOrb = () => {
    return (
    <div className="relative w-48 h-48 mx-auto mb-8">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, 
            rgba(59, 130, 246, 0.5), 
            rgba(139, 92, 246, 0.5), 
            rgba(236, 72, 153, 0.5), 
            rgba(59, 130, 246, 0.5)
          )`,
          filter: "blur(8px)",
        }}
        animate={{
          rotate: isConnected ? 360 : 0,
          scale: isSpeaking ? 1.1 : isListening ? 1.05 : 1,
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.5 },
        }}
      />
      
      {/* Main orb */}
      <motion.div
        className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10"
        animate={{
          scale: isSpeaking ? [1, 1.05, 1] : isListening ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: (isSpeaking || isListening) ? Infinity : 0,
        }}
      >
        {/* Audio visualization bars */}
        <div className="absolute inset-4 flex items-center justify-center">
          <div className="flex items-end justify-center gap-1 h-16">
            {audioLevels.slice(0, 16).map((level, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-t from-blue-400 to-purple-400 rounded-full w-1"
                style={{
                  height: `${Math.max(2, level * 60)}px`,
                }}
                animate={{
                  height: `${Math.max(2, level * 60)}px`,
                }}
                transition={{
                  duration: 0.1,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="p-4 rounded-full bg-white/10 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSpeaking ? (
              <Volume2 className="w-8 h-8 text-white" />
            ) : isListening ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Mic className="w-8 h-8 text-white" />
              </motion.div>
            ) : (
              <Mic className="w-8 h-8 text-white/60" />
            )}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Status indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className={cn(
          "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm",
          isConnected 
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
        )}>
          {isConnected ? (
            <>
              <Wifi className="w-3 h-3" />
              {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Connected"}
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3" />
              Disconnected
            </>
          )}
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Voice Interface */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-xl bg-card/20 border border-border/30 backdrop-blur-sm"
          >
            <WaveformOrb />
            
            {/* Current Transcript */}
            <AnimatePresence>
              {currentTranscript && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">You&apos;re saying:</span>
                  </div>
                  <p className="text-white">{currentTranscript}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connection Status */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                  isConnected 
                    ? "bg-green-500/10 text-green-400"
                    : "bg-gray-500/10 text-gray-400"
                )}>
                  {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                  {isConnected ? "Connected" : "Disconnected"}
                </div>
                
                {isConnected && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {Math.round(connectionLatency)}ms
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {!isConnected ? (
                <Button
                  onClick={connect}
                  className="bg-brand-gradient hover:opacity-90 text-primary-foreground px-6 py-3"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              ) : (
                <>
                  <Button
                    onClick={disconnect}
                    variant="soft"
                    className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                  >
                    <PhoneOff className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                  
                  {settings.inputMode === "auto-detect" ? (
                    <Button
                      onClick={() => setIsListening(!isListening)}
                      variant={isListening ? "default" : "soft"}
                      className={cn(
                        isListening 
                          ? "bg-blue-500 text-white" 
                          : "bg-muted/20 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                      {isListening ? "Stop Listening" : "Start Listening"}
                    </Button>
                  ) : (
                    <Button
                      onMouseDown={() => handlePushToTalk(true)}
                      onMouseUp={() => handlePushToTalk(false)}
                      onTouchStart={() => handlePushToTalk(true)}
                      onTouchEnd={() => handlePushToTalk(false)}
                      variant={isPushToTalkActive ? "default" : "soft"}
                      className={cn(
                        "select-none",
                        isPushToTalkActive 
                          ? "bg-blue-500 text-white" 
                          : "bg-muted/20 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      {isPushToTalkActive ? "Release to Stop" : "Hold to Talk"}
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-lg bg-card/30 border border-border/20"
                >
                  <h3 className="text-sm font-medium mb-4">Voice Settings</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-2">Voice Type:</label>
                      <Select 
                        value={settings.voice} 
                        onValueChange={(value: "male" | "female" | "natural") => 
                          setSettings(prev => ({ ...prev, voice: value }))
                        }
                      >
                        <SelectTrigger className="bg-card/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {voiceOptions.map(voice => (
                            <SelectItem key={voice.value} value={voice.value}>
                              <div>
                                <div className="font-medium">{voice.label}</div>
                                <div className="text-xs text-muted-foreground">{voice.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-2">Input Mode:</label>
                      <Select 
                        value={settings.inputMode} 
                        onValueChange={(value: "push-to-talk" | "auto-detect") => 
                          setSettings(prev => ({ ...prev, inputMode: value }))
                        }
                      >
                        <SelectTrigger className="bg-card/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto-detect">Auto-detect</SelectItem>
                          <SelectItem value="push-to-talk">Push-to-talk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Conversation History & Samples */}
        <div className="space-y-6">
          {/* Sample Conversations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 sm:p-6 rounded-xl bg-card/20 border border-border/30 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold mb-4">Sample Conversations</h3>
            <div className="space-y-3">
              {sampleConversations.map((conversation, index) => (
                <Button
                  key={index}
                  variant="soft"
                  className="w-full justify-start text-left p-3 h-auto"
                  onClick={() => loadSampleConversation(conversation)}
                  disabled={!isConnected}
                >
                  <div>
                    <div className="font-medium text-sm">{conversation.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {conversation.messages.length} exchanges
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Conversation History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 sm:p-6 rounded-xl bg-card/20 border border-border/30 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Conversation</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMessages([])}
                disabled={messages.length === 0}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[400px]">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Bot className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground text-sm">
                    Start a conversation or load a sample to see the chat history here.
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
                        "p-3 rounded-lg",
                        message.type === "user" 
                          ? "bg-blue-500/10 border border-blue-500/20"
                          : message.type === "assistant"
                          ? "bg-purple-500/10 border border-purple-500/20"
                          : "bg-yellow-500/10 border border-yellow-500/20"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === "user" && <User className="w-4 h-4 mt-0.5 text-blue-400" />}
                        {message.type === "assistant" && <Bot className="w-4 h-4 mt-0.5 text-purple-400" />}
                        {message.type === "system" && <Zap className="w-4 h-4 mt-0.5 text-yellow-400" />}
                        
                        <div className="flex-1 min-w-0">
                          {message.isTyping ? (
                            <div className="flex items-center gap-2">
                              <Loader className="w-3 h-3 animate-spin" />
                              <span className="text-xs text-muted-foreground">AI is thinking...</span>
                            </div>
                          ) : (
                            <div className="text-sm leading-relaxed">{message.content}</div>
                          )}
                          
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                            {message.duration && (
                              <span>• {message.duration.toFixed(1)}s</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>
          </motion.div>
        </div>
      </div>
      
      {/* Features Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20"
      >
        <h3 className="text-lg font-semibold mb-4 text-center">🎯 Voice AI Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Mic className="w-6 h-6 mx-auto mb-2 text-blue-400" />
            <h4 className="font-medium text-sm">Real-time Recognition</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Natural speech processing with interruption handling
            </p>
          </div>
          <div className="text-center">
            <Volume2 className="w-6 h-6 mx-auto mb-2 text-purple-400" />
            <h4 className="font-medium text-sm">Lifelike Responses</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Natural voice synthesis with emotional context
            </p>
          </div>
          <div className="text-center">
            <Zap className="w-6 h-6 mx-auto mb-2 text-green-400" />
            <h4 className="font-medium text-sm">Low Latency</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Under 100ms response time for natural flow
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}