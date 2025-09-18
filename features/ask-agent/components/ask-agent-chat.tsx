'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  X,
  Send,
  Sparkles,
  Loader2,
  Check,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PROMPTS } from '../specs/ask-mq';

// ============================================
// TYPES
// ============================================

interface AskAgentChatProps {
  toolSlug: string;
  toolName: string;
  toolSchema?: any;
  workspaceId?: string;
  initialValues?: Record<string, any>;
  onFormUpdate?: (values: Record<string, any>) => void;
  onClose?: () => void;
  className?: string;
}

interface FormUpdate {
  fields: string[];
  values: Record<string, any>;
  timestamp: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  formUpdate?: FormUpdate;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function AskAgentChat({
  toolSlug,
  toolName,
  toolSchema,
  workspaceId,
  initialValues = {},
  onFormUpdate,
  onClose,
  className,
}: AskAgentChatProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>(initialValues);
  const [updateHistory, setUpdateHistory] = useState<FormUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Chat state management (temporary implementation until ai/react is configured)
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ask-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          toolSlug,
          toolName,
          workspaceId,
          currentValues: formValues,
          toolSchema,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: data.message || 'I understood your request. Let me update the form.',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsConnected(true);

      // Extract and apply form updates
      if (data.updates) {
        applyFormUpdate(data.updates);
      }
    } catch (err) {
      setError(err as Error);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const reload = () => {
    setError(null);
    // Re-send last user message if exists
    if (messages.length > 0) {
      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
      if (lastUserMessage) {
        setInput(lastUserMessage.content);
      }
    }
  };

  // Apply form updates
  const applyFormUpdate = useCallback(
    (updates: Record<string, any>) => {
      const newValues = { ...formValues, ...updates };
      setFormValues(newValues);
      onFormUpdate?.(newValues);

      // Track update history
      setUpdateHistory((prev) => [
        ...prev,
        {
          fields: Object.keys(updates),
          values: updates,
          timestamp: new Date().toISOString(),
        },
      ]);
    },
    [formValues, onFormUpdate]
  );

  // Extract form updates from AI message
  const extractFormUpdates = (message: any): Record<string, any> | null => {
    try {
      // Look for data parts in the message
      if (message.data?.updates) {
        return message.data.updates;
      }

      // Try to parse JSON from content
      const jsonMatch = message.content?.match(/```json\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[1]);
        return parsed.updates || parsed;
      }

      // Look for inline updates
      const updateMatch = message.content?.match(/UPDATE:\s*({.*})/);
      if (updateMatch) {
        return JSON.parse(updateMatch[1]);
      }
    } catch (err) {
      console.error('Failed to extract form updates:', err);
    }
    return null;
  };

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      // Add greeting message
      const greeting = PROMPTS.greeting(toolName);
      setMessages([{
        id: 'greeting',
        role: 'assistant',
        content: greeting,
        timestamp: new Date().toISOString(),
      }]);
    }
  }, [toolName]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-5 w-5 text-purple-500" />
            {isConnected && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold">Ask mQ</h3>
            <p className="text-xs text-muted-foreground">{toolName} Assistant</p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Form Update Indicator */}
      {updateHistory.length > 0 && (
        <div className="border-b px-4 py-2 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="h-3 w-3 text-green-500" />
              <span className="text-xs text-muted-foreground">
                {updateHistory.length} field{updateHistory.length !== 1 && 's'} updated
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={() => setUpdateHistory([])}
            >
              Clear
            </Button>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {updateHistory.slice(-3).map((update, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {update.fields.join(', ')}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLatest={message === messages[messages.length - 1]}
            />
          ))}
          {isLoading && <LoadingMessage />}
          {error && (
            <ErrorMessage
              error={error.message}
              onRetry={reload}
            />
          )}
        </div>
      </ScrollArea>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="e.g., I make $120k with $2500 monthly debts"
            disabled={isLoading}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <QuickPrompt
            label="Income"
            value="I make $X per year"
            onClick={(v) => setInput(v)}
          />
          <QuickPrompt
            label="Credit"
            value="My credit score is X"
            onClick={(v) => setInput(v)}
          />
          <QuickPrompt
            label="Property"
            value="Looking at a $X house"
            onClick={(v) => setInput(v)}
          />
        </div>
      </form>
    </div>
  );
}

// ============================================
// MESSAGE COMPONENTS
// ============================================

function ChatMessage({
  message,
  isLatest,
}: {
  message: any;
  isLatest: boolean;
}) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-purple-600" />
          </div>
        </div>
      )}
      <Card
        className={cn(
          'max-w-[80%] px-4 py-2',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        <div
          className={cn(
            'text-sm whitespace-pre-wrap',
            isUser && 'text-white'
          )}
        >
          {message.content}
        </div>
        {message.formUpdate && (
          <div className="mt-2 pt-2 border-t border-muted-foreground/20">
            <div className="flex items-center gap-2">
              <Check className="h-3 w-3 text-green-500" />
              <span className="text-xs opacity-70">
                Updated: {message.formUpdate.fields.join(', ')}
              </span>
            </div>
          </div>
        )}
      </Card>
      {isUser && (
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs text-white font-medium">You</span>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingMessage() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
        </div>
      </div>
      <Card className="px-4 py-2 bg-muted">
        <div className="flex items-center gap-2">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span className="text-sm text-muted-foreground">Thinking...</span>
        </div>
      </Card>
    </div>
  );
}

function ErrorMessage({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <Card className="border-red-200 bg-red-50">
      <div className="flex items-start gap-2 p-3">
        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-red-900">Something went wrong</p>
          <p className="text-xs text-red-700 mt-1">{error}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={onRetry}
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Retry
        </Button>
      </div>
    </Card>
  );
}

function QuickPrompt({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick: (value: string) => void;
}) {
  return (
    <button
      type="button"
      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}