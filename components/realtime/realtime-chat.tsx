'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Send, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { subscribeToChats } from '@/lib/supabase/realtime'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  chat_id: string
  sender_id: string
  sender_name: string
  sender_avatar?: string
  content: string
  created_at: string
  sender_type: 'user' | 'ai' | 'system'
}

interface RealtimeChatProps {
  chatId: string
  currentUserId: string
  currentUserName: string
  currentUserAvatar?: string
  className?: string
  showPresence?: boolean
}

export function RealtimeChat({
  chatId,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  className,
  showPresence = true,
}: RealtimeChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true })

      if (!error && data) {
        setMessages(data)
      }
      setIsLoading(false)
    }

    loadMessages()
  }, [chatId, supabase])

  // Subscribe to realtime messages
  useEffect(() => {
    const channel = subscribeToChats(chatId, (payload) => {
      if (payload.eventType === 'INSERT') {
        const newMessage = payload.new as unknown as Message
        setMessages((prev) => [...prev, newMessage])
        scrollToBottom()
      } else if (payload.eventType === 'UPDATE') {
        const updatedMessage = payload.new as unknown as Message
        setMessages((prev) =>
          prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
        )
      } else if (payload.eventType === 'DELETE') {
        const deletedMessage = payload.old as unknown as Message
        setMessages((prev) => prev.filter((msg) => msg.id !== deletedMessage.id))
      }
    })

    return () => {
      channel.unsubscribe()
    }
  }, [chatId])

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isSending) return

    setIsSending(true)
    const messageContent = inputValue.trim()
    setInputValue('')

    const { error } = await supabase.from('messages').insert({
      chat_id: chatId,
      sender_id: currentUserId,
      sender_name: currentUserName,
      sender_avatar: currentUserAvatar,
      content: messageContent,
      sender_type: 'user',
    })

    if (error) {
      console.error('Failed to send message:', error)
      setInputValue(messageContent) // Restore input on error
    }

    setIsSending(false)
  }

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    
    if (isToday) {
      return format(date, 'HH:mm')
    }
    return format(date, 'MMM d, HH:mm')
  }

  // Group messages by sender for better visual grouping
  const groupedMessages = messages.reduce((groups: Message[][], message, index) => {
    if (index === 0 || messages[index - 1].sender_id !== message.sender_id) {
      groups.push([message])
    } else {
      groups[groups.length - 1].push(message)
    }
    return groups
  }, [])

  return (
    <Card className={cn('flex flex-col h-[600px]', className)}>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Chat</CardTitle>
          {showPresence && (
            <Badge variant="outline" className="text-xs">
              Live
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          ) : (
            <div className="space-y-4">
              {groupedMessages.map((group, groupIndex) => {
                const isCurrentUser = group[0].sender_id === currentUserId
                const senderType = group[0].sender_type
                
                return (
                  <div
                    key={groupIndex}
                    className={cn(
                      'flex gap-3',
                      isCurrentUser && 'flex-row-reverse'
                    )}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage 
                        src={group[0].sender_avatar} 
                        alt={group[0].sender_name} 
                      />
                      <AvatarFallback
                        className={cn(
                          senderType === 'ai' && 'bg-purple-100 text-purple-700',
                          senderType === 'system' && 'bg-gray-100 text-gray-700'
                        )}
                      >
                        {senderType === 'ai' ? 'AI' : 
                         senderType === 'system' ? 'SYS' :
                         group[0].sender_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={cn(
                      'flex flex-col gap-1 max-w-[70%]',
                      isCurrentUser && 'items-end'
                    )}>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">{group[0].sender_name}</span>
                        <span>{formatTime(group[0].created_at)}</span>
                      </div>
                      
                      {group.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            'rounded-lg px-3 py-2 text-sm',
                            isCurrentUser
                              ? 'bg-primary text-primary-foreground'
                              : senderType === 'ai'
                              ? 'bg-purple-50 text-purple-900 border border-purple-200'
                              : senderType === 'system'
                              ? 'bg-gray-50 text-gray-700 border border-gray-200 italic'
                              : 'bg-muted'
                          )}
                        >
                          {message.content}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            disabled={isSending}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim() || isSending}>
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}