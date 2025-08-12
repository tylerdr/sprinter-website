'use client';

import { motion } from 'framer-motion';
import { Wrench, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolInvocationProps {
  toolName: string;
  args?: Record<string, unknown>;
  result?: unknown;
  status: 'pending' | 'running' | 'success' | 'error';
  className?: string;
}

export function ToolInvocation({ 
  toolName, 
  args, 
  result, 
  status, 
  className 
}: ToolInvocationProps) {
  const statusConfig = {
    pending: {
      icon: Loader2,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      message: 'Preparing...',
    },
    running: {
      icon: Loader2,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      message: 'Running...',
    },
    success: {
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
      message: 'Completed',
    },
    error: {
      icon: XCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      message: 'Failed',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'flex gap-3 justify-start',
        className
      )}
    >
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <Wrench className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <div className={cn('rounded-lg px-4 py-3 flex-1', config.bgColor)}>
        <div className="flex items-center gap-2 mb-1">
          <Icon 
            className={cn(
              'w-4 h-4',
              config.color,
              status === 'running' && 'animate-spin'
            )} 
          />
          <span className="font-medium text-sm">{toolName}</span>
          <span className={cn('text-xs', config.color)}>
            {config.message}
          </span>
        </div>
        
        {args && Object.keys(args).length > 0 && (
          <details className="mt-2">
            <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
              Parameters
            </summary>
            <pre className="mt-1 text-xs bg-background/50 p-2 rounded overflow-x-auto">
              {JSON.stringify(args, null, 2)}
            </pre>
          </details>
        )}
        
        {result && status === 'success' && (
          <details className="mt-2">
            <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
              Result
            </summary>
            <pre className="mt-1 text-xs bg-background/50 p-2 rounded overflow-x-auto">
              {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </motion.div>
  );
}