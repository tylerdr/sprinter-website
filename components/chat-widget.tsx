'use client';

import * as React from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = { 
  role: 'user' | 'assistant'; 
  content: string;
  timestamp: Date;
};

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m here to help you explore AI opportunities for your business. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = React.useState('');
  const [showEmailGate, setShowEmailGate] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [userId, setUserId] = React.useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize anonymous auth
  React.useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        // Create anonymous user
        const { data, error } = await supabase.auth.signInAnonymously();
        if (!error && data.user) {
          setUserId(data.user.id);
          // Track lead in database
          await fetch('/api/leads/upsert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source: 'chat_widget' })
          });
        }
      } else {
        setUserId(sessionData.session.user.id);
      }
    })();
  }, [supabase]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages(m => [...m, userMessage]);
    setInput('');

    // Check if we should show email gate (after 3 user messages)
    const userMessageCount = messages.filter(m => m.role === 'user').length + 1;
    if (userMessageCount >= 3 && !showEmailGate && !email) {
      setShowEmailGate(true);
      return;
    }

    // Get AI response
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      if (data.text) {
        setMessages(m => [...m, {
          role: 'assistant',
          content: data.text,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(m => [...m, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or contact us directly.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  async function captureEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    try {
      // Update anonymous user with email
      const { error } = await supabase.auth.updateUser({ email });
      if (!error) {
        // Update lead status
        await fetch('/api/leads/mark-emailed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        setShowEmailGate(false);
        
        // Send a follow-up message
        setMessages(m => [...m, {
          role: 'assistant',
          content: `Thanks! I've sent your AI Opportunity Audit to ${email}. Meanwhile, let's continue our conversation. What specific challenges are you facing?`,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Email capture error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient shadow-lg transition-all hover:scale-110 hover:shadow-xl"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <Card className="fixed bottom-4 right-4 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-gradient-to-r from-brand-start to-brand-end p-4 text-white">
            <div>
              <h3 className="font-semibold">Sprinter AI Assistant</h3>
              <p className="text-xs opacity-90">Typically replies instantly</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.role === 'user'
                      ? "bg-brand-gradient text-white"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {showEmailGate ? (
            <form onSubmit={captureEmail} className="border-t p-4">
              <p className="mb-3 text-sm text-muted-foreground">
                Let&apos;s continue! Drop your email to get your personalized AI Opportunity Audit.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continue'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex gap-2 border-t p-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Ask about AI for your business..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={sendMessage} 
                disabled={isLoading || !input.trim()}
                size="icon"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </Card>
      )}
    </>
  );
}