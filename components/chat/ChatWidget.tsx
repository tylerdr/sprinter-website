'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap, TrendingUp, DollarSign, Users, BarChart3, Loader2, WifiOff, AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { sendChatMessage } from './actions'
import { ChatErrorBoundary } from './ChatErrorBoundary'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SUGGESTED_QUESTIONS = [
  { icon: TrendingUp, text: "What can AI agents do for my business?" },
  { icon: DollarSign, text: "What does the $2,500 Sprint include?" },
  { icon: Users, text: "How do you empower teams with AI?" },
  { icon: BarChart3, text: "Show me real case studies" },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm here to help you explore what AI agents can do for your business. What industry are you in, and what's your biggest operational headache?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [pendingMessages, setPendingMessages] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const maxRetries = 3

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      setError(null)
      // Process pending messages when back online
      if (pendingMessages.length > 0) {
        pendingMessages.forEach(msg => processPendingMessage(msg))
        setPendingMessages([])
      }
    }

    const handleOffline = () => {
      setIsOffline(true)
      setError('You\'re offline. Messages will be queued and sent when connection is restored.')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check initial status
    setIsOffline(!navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [pendingMessages])

  const processPendingMessage = async (messageContent: string) => {
    await sendMessageWithRetry(messageContent)
  }

  const sendMessageWithRetry = async (messageContent: string, attempt: number = 0): Promise<void> => {
    setIsTyping(true)
    setError(null)

    try {
      const response = await sendChatMessage(messageContent)

      const assistantMessage: Message = {
        id: (Date.now() + Math.random()).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setRetryCount(0)
    } catch (error) {
      console.error('Chat message failed:', error)

      if (attempt < maxRetries && !isOffline) {
        setError(`Connection issue. Retrying... (${attempt + 1}/${maxRetries})`)
        setRetryCount(attempt + 1)

        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000)
        setTimeout(() => {
          sendMessageWithRetry(messageContent, attempt + 1)
        }, delay)
      } else {
        const errorMessage: Message = {
          id: (Date.now() + Math.random()).toString(),
          role: 'assistant',
          content: isOffline
            ? "I'm offline right now. Your message will be processed when connection is restored."
            : "I'm having trouble connecting right now. Please try again or contact us at hello@sprinter.ai",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
        setError(isOffline ? 'Offline - messages queued' : 'Connection failed after retries')
        setRetryCount(0)
      }
    } finally {
      setIsTyping(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const messageContent = input
    setInput('')

    if (isOffline) {
      // Queue message for when back online
      setPendingMessages(prev => [...prev, messageContent])
      setError('Message queued - will send when online')
      return
    }

    await sendMessageWithRetry(messageContent)
  }

  const handleRetry = () => {
    if (messages.length > 1) {
      const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
      if (lastUserMessage) {
        sendMessageWithRetry(lastUserMessage.content)
      }
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    handleSend()
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="rounded-full h-14 w-14 p-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="sr-only">Open chat</span>
            </Button>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)]"
          >
            <Card className="flex flex-col h-[600px] max-h-[calc(100vh-6rem)] shadow-2xl border-neutral-800 bg-neutral-900/95 backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <span className={cn(
                      "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-neutral-900",
                      isOffline ? "bg-red-500" : "bg-green-500"
                    )}></span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Sprinter AI</h3>
                    <p className="text-xs text-muted-foreground">
                      {isOffline ? 'Offline' : 'Always here to help'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isOffline && (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  {error && !isOffline && retryCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRetry}
                      className="h-8 w-8 p-0"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Retry</span>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close chat</span>
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-3",
                      message.role === 'user' && "flex-row-reverse"
                    )}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                      message.role === 'assistant' 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                        : "bg-neutral-700"
                    )}>
                      {message.role === 'assistant' ? (
                        <Bot className="h-4 w-4 text-white" />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={cn(
                      "flex flex-col gap-1 max-w-[80%]",
                      message.role === 'user' && "items-end"
                    )}>
                      <div className={cn(
                        "rounded-lg px-4 py-2",
                        message.role === 'assistant'
                          ? "bg-neutral-800 text-neutral-100"
                          : "bg-blue-600 text-white"
                      )}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-neutral-800 rounded-lg px-4 py-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Error Banner */}
              {error && (
                <div className={cn(
                  "px-4 py-2 border-b border-neutral-800",
                  isOffline ? "bg-yellow-900/20" : "bg-red-900/20"
                )}>
                  <div className="flex items-center gap-2">
                    {isOffline ? (
                      <WifiOff className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    )}
                    <p className={cn(
                      "text-xs",
                      isOffline ? "text-yellow-400" : "text-red-400"
                    )}>
                      {error}
                    </p>
                    {retryCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRetry}
                        className="ml-auto h-6 px-2 text-xs"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestedQuestion(q.text)}
                        className="justify-start text-xs h-auto py-2 px-3 bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800"
                      >
                        <q.icon className="h-3 w-3 mr-2 flex-shrink-0" />
                        <span className="text-left line-clamp-2">{q.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-neutral-800">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex gap-2"
                >
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about AI agents..."
                    disabled={isTyping}
                    className="flex-1 bg-neutral-800/50 border-neutral-700"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isTyping ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {isOffline ? (
                    "Offline • Messages will be sent when connected"
                  ) : pendingMessages.length > 0 ? (
                    `${pendingMessages.length} message(s) queued`
                  ) : (
                    "Powered by AI • Instant responses 24/7"
                  )}
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Wrap the ChatWidget with error boundary
export function ChatWidgetWithErrorBoundary() {
  return (
    <ChatErrorBoundary>
      <ChatWidget />
    </ChatErrorBoundary>
  )
}