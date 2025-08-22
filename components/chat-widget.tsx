'use client';

import * as React from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Sparkles, Building2 } from 'lucide-react';
import { ChatInterface } from '@/components/ai/chat-interface';
import { usePathname } from 'next/navigation';

// High-intent keywords that indicate buying signals
const HIGH_INTENT_KEYWORDS = [
  'pricing', 'cost', 'investment', 'sprint', 'partnership',
  'portfolio', 'deal', 'diligence', 'roi', 'implementation',
  'team', 'contract', 'timeline', 'demo', 'call', 'meeting'
];

// PE-specific opener messages based on page
const PAGE_SPECIFIC_OPENERS: Record<string, string> = {
  '/': "👋 Welcome! I help PE firms deploy AI across their portfolios. What's your biggest operational challenge right now?",
  '/ai-assessment': "I see you're interested in our AI Readiness Assessment. It takes just 2 minutes and you'll get a custom Portfolio AI Blueprint within 24 hours. Ready to start?",
  '/ai-sprint': "Our 5-Day AI Sprint delivers a working prototype with guaranteed 10× ROI. What use case are you most interested in automating?",
  '/ai-partnership': "Looking for ongoing AI expertise? Our partnership program provides a virtual AI operating partner for your entire portfolio. What's your fund size?",
  '/use-cases': "Exploring AI opportunities? Most PE firms start with deal sourcing automation or due diligence acceleration. What's your priority?",
  '/case-studies': "Our PE clients typically see 20× ROI within 90 days. Which case study brought you here?",
};

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [showEmailGate, setShowEmailGate] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [firmName, setFirmName] = React.useState('');
  const [emailCaptured, setEmailCaptured] = React.useState(false);
  const [messageCount, setMessageCount] = React.useState(0);
  const [isHighIntent, setIsHighIntent] = React.useState(false);
  const [messages, setMessages] = React.useState<string[]>([]);
  const pathname = usePathname();
  const supabase = createClient();

  // Auto-open on high-value pages after delay
  React.useEffect(() => {
    const highValuePages = ['/ai-sprint', '/ai-partnership', '/contact'];
    if (highValuePages.includes(pathname)) {
      const timer = setTimeout(() => {
        if (!open && !localStorage.getItem('chat_dismissed')) {
          setOpen(true);
        }
      }, 15000); // Open after 15 seconds on high-value pages
      return () => clearTimeout(timer);
    }
  }, [pathname, open]);

  // Track message count for email gate
  React.useEffect(() => {
    if (messageCount === 3 && !emailCaptured && !email) {
      setShowEmailGate(true);
    }
  }, [messageCount, emailCaptured, email]);

  // Check if email already captured
  React.useEffect(() => {
    const storedEmail = localStorage.getItem('chat_email');
    const storedFirm = localStorage.getItem('chat_firm');
    if (storedEmail) {
      setEmailCaptured(true);
      setEmail(storedEmail);
      if (storedFirm) setFirmName(storedFirm);
    }
  }, []);

  // Detect high-intent messages
  const checkHighIntent = (message: string) => {
    const lowerMessage = message.toLowerCase();
    const hasHighIntentKeyword = HIGH_INTENT_KEYWORDS.some(keyword => 
      lowerMessage.includes(keyword)
    );
    
    if (hasHighIntentKeyword && !isHighIntent) {
      setIsHighIntent(true);
      // Track high-intent lead
      trackHighIntentLead(message);
    }
    
    return hasHighIntentKeyword;
  };

  const trackHighIntentLead = async (message: string) => {
    try {
      await supabase.from('high_intent_leads').insert({
        email: email || 'anonymous',
        firm_name: firmName,
        trigger_message: message,
        page: pathname,
        created_at: new Date().toISOString(),
      });
      
      // Could also trigger a Slack notification or email alert here
      console.log('High-intent lead detected:', { email, message, page: pathname });
    } catch (error) {
      console.error('Failed to track high-intent lead:', error);
    }
  };

  const handleMessageSent = (message: string) => {
    setMessageCount(prev => prev + 1);
    setMessages(prev => [...prev, message]);
    checkHighIntent(message);
  };

  async function captureEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    try {
      // Save to localStorage
      localStorage.setItem('chat_email', email);
      if (firmName) localStorage.setItem('chat_firm', firmName);
      setEmailCaptured(true);
      
      // Track in Supabase with enriched data
      await supabase.from('leads').insert({
        email,
        firm_name: firmName,
        source: 'chat_widget',
        page_captured: pathname,
        is_high_intent: isHighIntent,
        message_count: messageCount,
        messages: messages,
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

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('chat_dismissed', 'true');
    // Clear dismissal after 24 hours
    setTimeout(() => localStorage.removeItem('chat_dismissed'), 24 * 60 * 60 * 1000);
  };

  // Get context-aware welcome message
  const getWelcomeMessage = () => {
    return PAGE_SPECIFIC_OPENERS[pathname] || PAGE_SPECIFIC_OPENERS['/'];
  };

  return (
    <>
      {/* Chat Button with animation */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-50 group"
          aria-label="Open AI assistant"
        >
          <div className="relative">
            {/* Pulsing ring for attention */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 group-hover:opacity-100 animate-ping" />
            
            {/* Main button */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            
            {/* PE Badge */}
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white border-0 px-2 py-0.5 text-xs">
              PE
            </Badge>
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
              AI Assistant for PE Firms
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <Card className="fixed bottom-4 right-4 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Building2 className="h-5 w-5" />
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold">PE AI Advisor</h3>
                <p className="text-xs opacity-90">
                  {isHighIntent ? '🟢 Priority Support Active' : 'Typically replies instantly'}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleClose}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* High Intent Banner */}
          {isHighIntent && emailCaptured && (
            <div className="bg-green-50 border-b border-green-200 px-4 py-2">
              <p className="text-sm text-green-800">
                🎯 <strong>Priority mode activated!</strong> A specialist will be notified.
              </p>
            </div>
          )}

          {/* Chat Interface or Email Gate */}
          {showEmailGate ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <form onSubmit={captureEmail} className="w-full max-w-sm space-y-4">
                <div className="text-center space-y-2">
                  <Building2 className="h-12 w-12 text-blue-600 mx-auto" />
                  <h3 className="font-semibold text-lg">Let's Continue</h3>
                  <p className="text-sm text-muted-foreground">
                    Get your personalized Portfolio AI Blueprint and unlock unlimited advisory
                  </p>
                </div>
                <div className="space-y-3">
                  <Input
                    type="email"
                    required
                    placeholder="you@pefirm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                  <Input
                    type="text"
                    placeholder="Firm name (optional)"
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    className="w-full"
                  />
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Continue Conversation
                  </Button>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground text-center">
                  <p>✓ No spam, ever</p>
                  <p>✓ Talk directly to our PE team</p>
                  <p>✓ Get your AI Blueprint in 24h</p>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <ChatInterface 
                className="flex-1"
                placeholder="Ask about AI for your portfolio..."
                welcomeMessage={getWelcomeMessage()}
                onMessageSent={handleMessageSent}
              />
              {!emailCaptured && messageCount > 0 && (
                <div className="border-t bg-blue-50 px-4 py-2">
                  <p className="text-xs text-blue-800">
                    💡 {3 - messageCount} more messages before email required
                  </p>
                </div>
              )}
            </div>
          )}
        </Card>
      )}
    </>
  );
}