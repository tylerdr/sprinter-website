'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { trackProposalEvent } from '@/lib/services/proposal'
import type { ProposalContent } from '@/lib/types/proposal'
import { cn } from '@/lib/utils'

interface ProposalChatProps {
  proposalId: string
  proposalContent: ProposalContent
  sessionId: string
  onClose: () => void
}

// Suggested questions based on proposal type
const getSuggestedQuestions = (proposalContent: ProposalContent) => {
  const questions = [
    "What's included in this proposal?",
    "Can you explain the timeline?",
    "What are the payment terms?",
    "How do we get started?"
  ]
  
  // Add context-specific questions
  if (proposalContent.sections?.some(s => s.type === 'pricing')) {
    questions.push("Can you break down the pricing?")
  }
  
  if (proposalContent.sections?.some(s => s.type === 'timeline')) {
    questions.push("What are the key milestones?")
  }
  
  return questions.slice(0, 4)
}

export default function ProposalChatV2({ 
  proposalId, 
  proposalContent, 
  sessionId, 
  onClose 
}: ProposalChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
  }>>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm here to help answer any questions you have about this proposal. You can ask about pricing, timeline, deliverables, or any other details."
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  
  const suggestedQuestions = getSuggestedQuestions(proposalContent)
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return
    
    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as 'user',
      content
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/proposals/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          proposalId,
          proposalContent
        })
      })
      
      if (!response.ok) throw new Error('Failed to get response')
      
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''
      
      const assistantMsg = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant' as 'assistant',
        content: ''
      }
      
      setMessages(prev => [...prev, assistantMsg])
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value)
          assistantMessage += chunk
          
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMsg.id 
              ? { ...msg, content: assistantMessage }
              : msg
          ))
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    trackProposalEvent(proposalId, 'question_asked', sessionId)
    await sendMessage(input)
    setInput('')
  }
  
  const handleSuggestionClick = async (question: string) => {
    if (isLoading) return
    
    trackProposalEvent(proposalId, 'question_asked', sessionId)
    await sendMessage(question)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl"
      >
        <Card className="flex flex-col h-[600px] max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Proposal Assistant</h3>
                <p className="text-sm text-muted-foreground">Powered by GPT-5</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    message.role === 'user' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className={cn(
                    "flex-1 space-y-2",
                    message.role === 'user' ? "text-right" : "text-left"
                  )}>
                    <div className={cn(
                      "inline-block rounded-lg px-4 py-2 text-sm",
                      message.role === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </motion.div>
              )}
              
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          
          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about this proposal..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={!input.trim() || isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  )
}