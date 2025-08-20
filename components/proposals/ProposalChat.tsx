'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { addProposalChat, getProposalChats, trackProposalEvent } from '@/lib/services/proposal'
import type { ProposalChat as ProposalChatType, ProposalContent } from '@/lib/types/proposal'
import { cn } from '@/lib/utils'

interface ProposalChatProps {
  proposalId: string
  proposalContent: ProposalContent
  sessionId: string
  onClose: () => void
}

export default function ProposalChat({ 
  proposalId, 
  proposalContent, 
  sessionId, 
  onClose 
}: ProposalChatProps) {
  const [messages, setMessages] = useState<ProposalChatType[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const load = async () => {
      try {
        const history = await getProposalChats(proposalId, sessionId)
        setMessages(history)
        
        // Add welcome message if no history
        if (history.length === 0) {
          const welcomeMessage: ProposalChatType = {
            id: 'welcome',
            proposalId,
            role: 'assistant',
            content: "Hi! I'm here to help answer any questions you have about this proposal. Feel free to ask about pricing, timeline, deliverables, or any other details.",
            createdAt: new Date().toISOString()
          }
          setMessages([welcomeMessage])
        }
      } catch (error) {
        console.error('Failed to load chat history:', error)
      }
    }
    load()
  }, [proposalId, sessionId])
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  const handleSend = async () => {
    if (!input.trim() || loading) return
    
    const userMessage = input.trim()
    setInput('')
    setLoading(true)
    
    // Add user message
    const userChat: ProposalChatType = {
      id: `user-${Date.now()}`,
      proposalId,
      sessionId,
      role: 'user',
      content: userMessage,
      createdAt: new Date().toISOString()
    }
    setMessages(prev => [...prev, userChat])
    
    // Track event
    trackProposalEvent(proposalId, 'question_asked', sessionId, { question: userMessage })
    
    try {
      // Save user message
      await addProposalChat(proposalId, 'user', userMessage, sessionId)
      
      // Get AI response
      const response = await fetch('/api/proposals/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalId,
          message: userMessage,
          proposalContent,
          sessionId
        })
      })
      
      if (!response.ok) throw new Error('Failed to get response')
      
      const data = await response.json()
      
      // Add AI response
      const assistantChat: ProposalChatType = {
        id: `assistant-${Date.now()}`,
        proposalId,
        sessionId,
        role: 'assistant',
        content: data.response,
        metadata: data.metadata,
        createdAt: new Date().toISOString()
      }
      setMessages(prev => [...prev, assistantChat])
      
      // Save AI response
      await addProposalChat(proposalId, 'assistant', data.response, sessionId, data.metadata)
    } catch (error) {
      console.error('Failed to send message:', error)
      
      const errorChat: ProposalChatType = {
        id: `error-${Date.now()}`,
        proposalId,
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
        createdAt: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorChat])
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg"
      >
        <Card className="h-[600px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Proposal Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2",
                      message.role === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-primary/50 rounded-full animate-bounce" />
                      <span className="h-2 w-2 bg-primary/50 rounded-full animate-bounce delay-100" />
                      <span className="h-2 w-2 bg-primary/50 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          
          {/* Input */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about this proposal..."
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}