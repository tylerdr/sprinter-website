'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThinkingProps {
  message?: string;
  className?: string;
}

export function Thinking({ message = "Thinking...", className }: ThinkingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn("flex gap-3 justify-start", className)}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-start to-brand-end flex items-center justify-center">
        <Brain className="w-4 h-4 text-white animate-pulse" />
      </div>
      
      <div className="bg-muted rounded-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
              className="w-2 h-2 bg-foreground/50 rounded-full"
            />
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
              className="w-2 h-2 bg-foreground/50 rounded-full"
            />
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
              className="w-2 h-2 bg-foreground/50 rounded-full"
            />
          </div>
          <span className="text-sm text-muted-foreground">{message}</span>
        </div>
      </div>
    </motion.div>
  );
}