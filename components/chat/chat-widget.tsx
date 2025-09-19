"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm here to help you explore AI opportunities for your business. What brings you here today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const maxRetries = 3;

  useEffect(() => {
    // Check if email already captured in localStorage
    try {
      const storedEmail = localStorage.getItem("chat_email");
      if (storedEmail) {
        setEmailCaptured(true);
        setEmail(storedEmail);
      }
    } catch (err) {
      console.warn("LocalStorage not available:", err);
    }

    // Check online status
    const handleOnline = () => {
      setIsOffline(false);
      setError(null);
    };
    const handleOffline = () => {
      setIsOffline(true);
      setError("You're offline. Messages will be sent when connection is restored.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial status
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setMessageCount((prev) => prev + 1);

    // Check if we need to capture email (after 3rd message)
    if (messageCount === 2 && !emailCaptured) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: "I'd love to continue helping you! To provide personalized recommendations, could you share your email? We'll send you a summary of our conversation and relevant resources.",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }, 1000);
      return;
    }

    // Handle bot response with error handling and retry logic
    const sendBotResponse = async () => {
      setIsTyping(true);
      setError(null);

      try {
        // Simulate API call with potential failure
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate occasional failures for demo (remove in production)
            if (isOffline) {
              reject(new Error('No internet connection'));
            } else {
              resolve(true);
            }
          }, 1500);
        });

        const responses = [
          "That's a great question! Based on what you've shared, I recommend starting with our AI Opportunity Audit to identify high-ROI automation opportunities.",
          "Many companies in your industry have seen 40-70% efficiency gains with AI automation. Would you like to see some relevant case studies?",
          "Our 10-day sprint approach could be perfect for your needs. We build a working prototype that demonstrates real value quickly.",
          "I can connect you with our team for a more detailed discussion. Would you like to schedule a 30-minute strategy call?",
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: randomResponse,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setRetryCount(0);
      } catch (err) {
        console.error('Error sending bot response:', err);

        if (retryCount < maxRetries) {
          setError(`Connection issue. Retrying... (${retryCount + 1}/${maxRetries})`);
          setRetryCount(prev => prev + 1);
          setTimeout(() => sendBotResponse(), 2000 * (retryCount + 1));
        } else {
          setError('Unable to connect. Please check your connection and try again.');
          setRetryCount(0);
        }
      } finally {
        setIsTyping(false);
      }
    };

    sendBotResponse();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Save email to localStorage and Supabase
    localStorage.setItem("chat_email", email);
    setEmailCaptured(true);

    // Track in Supabase with error handling
    try {
      const supabase = createClient();
      const { error: dbError } = await supabase.from("leads").insert({
        email,
        source: "chat_widget",
        messages: messages.map((m) => ({ text: m.text, sender: m.sender })),
      });

      if (dbError) {
        console.error("Error saving lead:", dbError);
        // Store locally as fallback
        try {
          const localLeads = JSON.parse(localStorage.getItem('pending_leads') || '[]');
          localLeads.push({ email, timestamp: Date.now(), messages });
          localStorage.setItem('pending_leads', JSON.stringify(localLeads));
        } catch (localErr) {
          console.error("Error saving to local storage:", localErr);
        }
      }
    } catch (error) {
      console.error("Error saving lead:", error);
      setError('Email saved locally. We\'ll sync it when connection is restored.');
    }

    // Continue conversation
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: "Perfect! I've saved your email. Now, how can I help you explore AI opportunities for your business?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
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
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 bg-brand-gradient rounded-full shadow-2xl text-primary-foreground"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full"
            />
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
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-brand-gradient text-primary-foreground flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Strategy Assistant</h3>
                  <p className="text-xs opacity-90">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] px-4 py-2 rounded-2xl",
                      message.sender === "user"
                        ? "bg-brand text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Error Display */}
            {error && (
              <div className="px-4 py-2 bg-red-900/20 border-t border-red-900/30">
                <p className="text-xs text-red-400 flex items-center gap-2">
                  {isOffline && (
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                  {error}
                </p>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              {messageCount === 3 && !emailCaptured ? (
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-10"
                      required
                    />
                  </div>
                  <Button type="submit" size="sm" className="bg-brand-gradient">
                    Continue
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="bg-brand-gradient">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}