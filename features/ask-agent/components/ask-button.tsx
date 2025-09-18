'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AskAgentChat } from './ask-agent-chat';

// ============================================
// TYPES
// ============================================

interface AskButtonProps {
  tool: {
    slug: string;
    name: string;
    inputSchema?: any;
  };
  workspaceId?: string;
  currentValues?: Record<string, any>;
  onFormUpdate?: (values: Record<string, any>) => void;
  className?: string;
  variant?: 'default' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  showLabel?: boolean;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function AskButton({
  tool,
  workspaceId,
  currentValues = {},
  onFormUpdate,
  className,
  variant = 'gradient',
  size = 'md',
  disabled = false,
  showLabel = true,
}: AskButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelContext = null as any; // Panel functionality not implemented yet

  const handleClick = () => {
    if (panelContext?.openRightPanel) {
      // If we have panel context, open in right panel
      panelContext.openRightPanel({
        type: 'ask-agent',
        title: 'Ask mQ',
        content: (
          <AskAgentChat
            toolSlug={tool.slug}
            toolName={tool.name}
            toolSchema={tool.inputSchema}
            workspaceId={workspaceId}
            initialValues={currentValues}
            onFormUpdate={onFormUpdate}
            onClose={() => panelContext.closeRightPanel()}
          />
        ),
      });
    } else {
      // Fallback: toggle inline state
      setIsOpen(!isOpen);
    }
  };

  const getButtonClasses = () => {
    const base = 'relative overflow-hidden transition-all duration-200';

    const variants = {
      default: 'bg-primary hover:bg-primary/90',
      outline: 'border-2 hover:bg-accent',
      gradient: cn(
        'bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500',
        'hover:from-purple-700 hover:via-purple-600 hover:to-indigo-600',
        'text-white border-0 shadow-lg hover:shadow-xl',
        'before:absolute before:inset-0',
        'before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0',
        'before:translate-x-[-200%] hover:before:translate-x-[200%]',
        'before:transition-transform before:duration-700'
      ),
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-9 px-4 text-sm',
      lg: 'h-10 px-6 text-base',
    };

    return cn(base, variants[variant], sizes[size], className);
  };

  const getIconSize = () => {
    const sizes = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };
    return sizes[size];
  };

  if (!tool.inputSchema) {
    return null; // Don't show Ask button for tools without schemas
  }

  return (
    <>
      <Button
        className={getButtonClasses()}
        onClick={handleClick}
        disabled={disabled || !tool.inputSchema}
        title="Use AI to help fill out this form"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Sparkles className={cn(getIconSize(), 'animate-pulse')} />
          {showLabel && 'Ask mQ'}
        </span>
      </Button>

      {/* Inline chat (fallback when no panel context) */}
      {isOpen && !panelContext && (
        <div className="fixed bottom-4 right-4 z-50 w-96 h-[600px] bg-background border rounded-lg shadow-2xl">
          <AskAgentChat
            toolSlug={tool.slug}
            toolName={tool.name}
            toolSchema={tool.inputSchema}
            workspaceId={workspaceId}
            initialValues={currentValues}
            onFormUpdate={onFormUpdate}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
}

// ============================================
// MINI BUTTON VARIANT
// ============================================

export function AskButtonMini({
  tool,
  currentValues,
  onFormUpdate,
  className,
}: Pick<AskButtonProps, 'tool' | 'currentValues' | 'onFormUpdate' | 'className'>) {
  return (
    <AskButton
      tool={tool}
      currentValues={currentValues}
      onFormUpdate={onFormUpdate}
      className={className}
      size="sm"
      showLabel={false}
      variant="outline"
    />
  );
}

// ============================================
// FLOATING BUTTON VARIANT
// ============================================

export function AskButtonFloating({
  tool,
  workspaceId,
  currentValues,
  onFormUpdate,
}: Pick<AskButtonProps, 'tool' | 'workspaceId' | 'currentValues' | 'onFormUpdate'>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed bottom-8 right-8 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AskButton
        tool={tool}
        workspaceId={workspaceId}
        currentValues={currentValues}
        onFormUpdate={onFormUpdate}
        className={cn(
          'rounded-full shadow-2xl',
          isHovered ? 'scale-110' : 'scale-100'
        )}
        size="lg"
        showLabel={isHovered}
      />
    </div>
  );
}

// ============================================
// FORM FIELD BUTTON
// ============================================

interface AskFieldButtonProps {
  fieldName: string;
  fieldSchema?: any;
  currentValue?: any;
  onUpdate?: (value: any) => void;
  className?: string;
}

export function AskFieldButton({
  fieldName,
  fieldSchema,
  currentValue,
  onUpdate,
  className,
}: AskFieldButtonProps) {
  const panelContext = null as any; // Panel functionality not implemented yet

  const handleClick = () => {
    if (panelContext?.openRightPanel) {
      panelContext.openRightPanel({
        type: 'ask-agent',
        title: `Help with ${fieldName}`,
        content: (
          <div className="p-4">
            <h4 className="text-sm font-medium mb-2">
              Ask mQ to help fill: {fieldName}
            </h4>
            <p className="text-xs text-muted-foreground">
              Describe the value in natural language
            </p>
            {/* Field-specific Ask interface */}
          </div>
        ),
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn('h-6 w-6 p-0', className)}
      onClick={handleClick}
      title={`Ask mQ for help with ${fieldName}`}
    >
      <Sparkles className="h-3 w-3" />
    </Button>
  );
}