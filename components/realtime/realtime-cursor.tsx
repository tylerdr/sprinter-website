'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { broadcastCursorPosition, realtimeManager } from '@/lib/supabase/realtime'

interface Cursor {
  userId: string
  userName: string
  x: number
  y: number
  color: string
  timestamp: number
}

interface RealtimeCursorProps {
  roomId: string
  userId: string
  userName: string
  userColor?: string
  containerRef?: React.RefObject<HTMLElement>
}

const CURSOR_TIMEOUT = 3000 // Hide cursor after 3 seconds of inactivity

export function RealtimeCursor({
  roomId,
  userId,
  userName: _userName,
  userColor: _userColor = '#3B82F6',
  containerRef,
}: RealtimeCursorProps) {
  const [cursors, setCursors] = useState<Map<string, Cursor>>(new Map())
  const [isTracking] = useState(true)

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isTracking) return

    const rect = containerRef?.current?.getBoundingClientRect()
    const x = rect ? e.clientX - rect.left : e.clientX
    const y = rect ? e.clientY - rect.top : e.clientY

    // Broadcast cursor position
    broadcastCursorPosition(roomId, { x, y })
  }, [roomId, isTracking, containerRef])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    broadcastCursorPosition(roomId, { x: -1, y: -1 })
  }, [roomId])

  useEffect(() => {
    // Subscribe to cursor broadcasts
    realtimeManager.subscribeToBroadcast(
      `cursor-${roomId}`,
      [
        {
          event: 'cursor',
          callback: (payload: unknown) => {
            const typedPayload = payload as {
              payload: {
                user_id: string
                user_name?: string
                x: number
                y: number
                color?: string
              }
            }
            const { user_id, user_name, x, y, color } = typedPayload.payload
            
            if (user_id === userId) return // Don't show own cursor
            
            setCursors((prev) => {
              const newCursors = new Map(prev)
              
              if (x === -1 && y === -1) {
                // User left the area
                newCursors.delete(user_id)
              } else {
                newCursors.set(user_id, {
                  userId: user_id,
                  userName: user_name || 'Anonymous',
                  x,
                  y,
                  color: color || '#999',
                  timestamp: Date.now(),
                })
              }
              
              return newCursors
            })
          },
        },
      ]
    )

    // Add event listeners
    const element = containerRef?.current || document
    element.addEventListener('mousemove', handleMouseMove as EventListener)
    element.addEventListener('mouseleave', handleMouseLeave as EventListener)

    // Clean up stale cursors
    const interval = setInterval(() => {
      setCursors((prev) => {
        const newCursors = new Map(prev)
        const now = Date.now()
        
        newCursors.forEach((cursor, key) => {
          if (now - cursor.timestamp > CURSOR_TIMEOUT) {
            newCursors.delete(key)
          }
        })
        
        return newCursors
      })
    }, 1000)

    return () => {
      realtimeManager.unsubscribe(`cursor-${roomId}`)
      element.removeEventListener('mousemove', handleMouseMove as EventListener)
      element.removeEventListener('mouseleave', handleMouseLeave as EventListener)
      clearInterval(interval)
    }
  }, [roomId, userId, handleMouseMove, handleMouseLeave, containerRef])

  return (
    <AnimatePresence>
      {Array.from(cursors.values()).map((cursor) => (
        <motion.div
          key={cursor.userId}
          className="pointer-events-none fixed z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: cursor.x,
            y: cursor.y,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', damping: 30, stiffness: 500 }}
          style={{
            left: 0,
            top: 0,
          }}
        >
          {/* Cursor pointer */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'translate(-4px, -4px)' }}
          >
            <path
              d="M5.65376 12.3673L5.29376 12.0273C5.20376 11.9373 5.15376 11.8173 5.15376 11.6873C5.15376 11.5573 5.20376 11.4373 5.29376 11.3473L11.2938 5.34734C11.3838 5.25734 11.5038 5.20734 11.6338 5.20734C11.7638 5.20734 11.8838 5.25734 11.9738 5.34734L17.9738 11.3473C18.0638 11.4373 18.1138 11.5573 18.1138 11.6873C18.1138 11.8173 18.0638 11.9373 17.9738 12.0273L17.6338 12.3673C17.5438 12.4573 17.4238 12.5073 17.2938 12.5073C17.1638 12.5073 17.0438 12.4573 16.9538 12.3673L11.6338 7.04734L6.31376 12.3673C6.22376 12.4573 6.10376 12.5073 5.97376 12.5073C5.84376 12.5073 5.72376 12.4573 5.63376 12.3673H5.65376Z"
              fill={cursor.color}
            />
          </svg>
          
          {/* User name label */}
          <div
            className="absolute left-6 top-0 rounded-md px-2 py-1 text-xs font-medium text-white shadow-lg whitespace-nowrap"
            style={{ backgroundColor: cursor.color }}
          >
            {cursor.userName}
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

// Toggle button for enabling/disabling cursor tracking
export function CursorToggle({ 
  isEnabled, 
  onToggle 
}: { 
  isEnabled: boolean
  onToggle: (enabled: boolean) => void 
}) {
  return (
    <button
      onClick={() => onToggle(!isEnabled)}
      className={cn(
        'fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg transition-colors',
        isEnabled 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted text-muted-foreground'
      )}
      title={isEnabled ? 'Disable cursor sharing' : 'Enable cursor sharing'}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        <path d="M13 13l6 6" />
      </svg>
    </button>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}