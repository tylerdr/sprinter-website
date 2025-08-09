'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { createCollaborationChannel } from '@/lib/supabase/realtime'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  color?: string
}

interface RealtimePresenceProps {
  roomId: string
  currentUser: User
  className?: string
  maxAvatars?: number
}

export function RealtimePresence({ 
  roomId, 
  currentUser, 
  className,
  maxAvatars = 5 
}: RealtimePresenceProps) {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])

  useEffect(() => {
    const channel = createCollaborationChannel(roomId, currentUser.id, {
      name: currentUser.name,
      email: currentUser.email,
      avatar: currentUser.avatar,
    })

    // Listen for presence changes
    channel.on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState()
      const users: User[] = []
      
      Object.keys(state).forEach((key) => {
        const presences = state[key] as unknown as Array<{
          user_id: string
          name?: string
          email?: string
          avatar?: string
        }>
        presences.forEach((presence) => {
          if (presence.user_id !== currentUser.id) {
            users.push({
              id: presence.user_id,
              name: presence.name || 'Anonymous',
              email: presence.email || '',
              avatar: presence.avatar,
            })
          }
        })
      })
      
      setOnlineUsers(users)
    })

    return () => {
      channel.unsubscribe()
    }
  }, [roomId, currentUser])

  const displayUsers = onlineUsers.slice(0, maxAvatars)
  const remainingCount = onlineUsers.length - maxAvatars

  return (
    <TooltipProvider>
      <div className={cn('flex items-center', className)}>
        <div className="flex -space-x-2">
          {/* Current user */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <Avatar className="border-2 border-background">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{currentUser.name} (You)</p>
            </TooltipContent>
          </Tooltip>

          {/* Other online users */}
          {displayUsers.map((user) => (
            <Tooltip key={user.id}>
              <TooltipTrigger asChild>
                <Avatar className="border-2 border-background">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          {/* Remaining count */}
          {remainingCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="border-2 border-background">
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                    +{remainingCount}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{remainingCount} more online</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Online count */}
        <div className="ml-4 text-sm text-muted-foreground">
          {onlineUsers.length + 1} online
        </div>
      </div>
    </TooltipProvider>
  )
}