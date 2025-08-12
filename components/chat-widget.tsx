'use client';

import * as React from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, X } from 'lucide-react';
import { ChatInterface } from '@/components/ai/chat-interface';

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [showEmailGate, setShowEmailGate] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailCaptured, setEmailCaptured] = React.useState(false);
  const [messageCount, setMessageCount] = React.useState(0);
  const supabase = createClient();

  // Track message count for email gate
  React.useEffect(() => {
    if (messageCount === 3 && !emailCaptured && !email) {
      setShowEmailGate(true);
    }
  }, [messageCount, emailCaptured, email]);

  // Check if email already captured
  React.useEffect(() => {
    const storedEmail = localStorage.getItem('chat_email');
    if (storedEmail) {
      setEmailCaptured(true);
      setEmail(storedEmail);
    }
  }, []);

  const handleMessageSent = () => {
    setMessageCount(prev => prev + 1);
  };

  async function captureEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    try {
      // Save email to localStorage
      localStorage.setItem('chat_email', email);
      setEmailCaptured(true);
      
      // Track in Supabase
      await supabase.from('leads').insert({
        email,
        source: 'chat_widget',
        created_at: new Date().toISOString(),
      });
      
      setShowEmailGate(false);
    } catch (error) {
      console.error('Email capture error:', error);
      // Still mark as captured even if DB fails
      setEmailCaptured(true);
      setShowEmailGate(false);
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

          {/* Chat Interface or Email Gate */}
          {showEmailGate ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <form onSubmit={captureEmail} className="w-full max-w-sm space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg">Continue the Conversation</h3>
                  <p className="text-sm text-muted-foreground">
                    Drop your email to unlock unlimited chat and get your personalized AI Opportunity Audit.
                  </p>
                </div>
                <div className="space-y-3">
                  <Input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                  <Button type="submit" className="w-full">
                    Continue Chatting
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  No spam, unsubscribe anytime
                </p>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <ChatInterface 
                className="flex-1"
                placeholder="Ask about AI for your business..."
                welcomeMessage="Hi! I'm here to help you explore AI opportunities for your business. What would you like to know?"
              />
            </div>
          )}
        </Card>
      )}
    </>
  );
}