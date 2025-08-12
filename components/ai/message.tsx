'use client';

import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  className?: string;
  showAvatar?: boolean;
}

export function Message({ role, content, className, showAvatar = true }: MessageProps) {
  return (
    <div
      className={cn(
        'flex gap-3',
        role === 'user' ? 'justify-end' : 'justify-start',
        className
      )}
    >
      {role === 'assistant' && showAvatar && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-2',
          role === 'user'
            ? 'bg-primary text-primary-foreground'
            : role === 'system'
            ? 'bg-muted/50 italic'
            : 'bg-muted'
        )}
      >
        {role === 'assistant' ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
              a: ({ children, ...props }) => (
                <a {...props} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;
                
                if (isInline) {
                  return (
                    <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  );
                }
                
                return (
                  <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        )}
      </div>
      
      {role === 'user' && showAvatar && (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}