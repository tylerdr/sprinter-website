"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AgentConfig } from "@/features/agents/registry";
import { Sparkles, Calculator, Building2, Bot } from "lucide-react";
import Image from "next/image";

interface AgentSelectorPlaceholderProps {
  agents: AgentConfig[];
  onAgentSelect: (agentId: string) => void;
  currentAgentId?: string;
  className?: string;
}

const getAgentIcon = (icon?: string, category?: string) => {
  if (icon) return <span className="text-lg">{icon}</span>;
  
  switch (category) {
    case "calculator":
    case "specialist":
      return <Calculator className="h-4 w-4" />;
    case "entity":
      return <Building2 className="h-4 w-4" />;
    case "core":
      return <Sparkles className="h-4 w-4" />;
    default:
      return <Bot className="h-4 w-4" />;
  }
};

export function AgentSelectorPlaceholder({
  agents,
  onAgentSelect,
  currentAgentId,
  className
}: AgentSelectorPlaceholderProps) {
  // Filter out inactive agents
  const activeAgents = agents
    .filter(agent => agent.isActive !== false)
    .slice(0, 9); // Show up to 9 agents

  const currentAgent = activeAgents.find(a => a.id === currentAgentId);

  return (
    <div className={cn("max-w-4xl mx-auto px-4 flex flex-col justify-center items-center", className)}>
      <div className="w-full">
        {/* MortgageQ Logo */}
        <div className="flex justify-center mb-6 opacity-50">
          <Image
            src="/logo.svg"
            alt="MortgageQ"
            width={150}
            height={40}
            className="opacity-80"
          />
        </div>
        
        {/* Subtle header */}
        <div className="text-center mb-8">
          <h3 className="text-base font-medium text-muted-foreground/70 mb-2">
            Choose Your AI Assistant
          </h3>
          {currentAgent && (
            <p className="text-sm text-muted-foreground/50">
              Currently using <span className="font-medium">{currentAgent.name}</span>
            </p>
          )}
        </div>

      {/* Agent cards in a clean grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {activeAgents.map(agent => {
          const isSelected = agent.id === currentAgentId;
          
          return (
            <Card
              key={agent.id}
              className={cn(
                "relative group cursor-pointer transition-all duration-200",
                "hover:shadow-sm hover:scale-[1.01] p-4",
                "bg-card/30 border-border/30",
                isSelected && "ring-1 ring-primary/30 bg-accent/10"
              )}
              onClick={() => {
                // Simply select the agent - don't create any chats yet
                onAgentSelect(agent.id);
              }}
            >
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent rounded-lg transition-all duration-300" />
              
              {/* Selected indicator - positioned outside of padded content */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-2 h-2 rounded-full bg-primary/50" />
                </div>
              )}
              
              <div className="relative flex flex-col items-center text-center space-y-2">
                {/* Icon */}
                <div className={cn(
                  "p-2 rounded-lg transition-colors duration-200",
                  isSelected 
                    ? "bg-primary/10 text-primary/70" 
                    : "bg-muted/50 text-muted-foreground/60 group-hover:bg-primary/5 group-hover:text-primary/60"
                )}>
                  {getAgentIcon(agent.icon, agent.category)}
                </div>
                
                {/* Name */}
                <h4 className={cn(
                  "text-sm font-medium transition-colors",
                  isSelected 
                    ? "text-foreground/80" 
                    : "text-muted-foreground/70 group-hover:text-foreground/70"
                )}>
                  {agent.name}
                </h4>
                
                {/* Description - very subtle */}
                {agent.description && (
                  <p className="text-xs text-muted-foreground/50 line-clamp-2">
                    {agent.description}
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Very subtle helper text */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground/40">
          Select an assistant or start typing your question below
        </p>
      </div>
      </div>
    </div>
  );
}