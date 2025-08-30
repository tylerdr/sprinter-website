import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*'

export interface RealtimeConfig {
  event: RealtimeEvent | RealtimeEvent[]
  schema?: string
  table?: string
  filter?: string
}

export interface BroadcastConfig {
  event: string
  callback: (payload: unknown) => void
}

export interface PresenceConfig {
  callback: (state: unknown) => void
}

class RealtimeManager {
  private channels: Map<string, RealtimeChannel> = new Map()
  private supabase = createClient()

  // Subscribe to database changes
  subscribeToTable(
    channelName: string,
    config: RealtimeConfig,
    callback: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void
  ) {
    // Remove existing channel if it exists
    this.unsubscribe(channelName)

    const channel = this.supabase
      .channel(channelName)
      .on(
        'postgres_changes' as any,
        {
          event: config.event as ('INSERT' | 'UPDATE' | 'DELETE' | '*'),
          schema: config.schema || 'public',
          table: config.table || '*',
          filter: config.filter,
        },
        callback
      )
      .subscribe()

    this.channels.set(channelName, channel)
    return channel
  }

  // Subscribe to broadcast events
  subscribeToBroadcast(
    channelName: string,
    configs: BroadcastConfig[]
  ) {
    // Remove existing channel if it exists
    this.unsubscribe(channelName)

    let channel = this.supabase.channel(channelName)

    configs.forEach(({ event, callback }) => {
      channel = channel.on('broadcast', { event }, callback)
    })

    channel.subscribe()
    this.channels.set(channelName, channel)
    return channel
  }

  // Subscribe to presence (track who's online)
  subscribeToPresence(
    channelName: string,
    config: PresenceConfig
  ) {
    // Remove existing channel if it exists
    this.unsubscribe(channelName)

    const channel = this.supabase
      .channel(channelName)
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState()
        config.callback(state)
      })
      .subscribe()

    this.channels.set(channelName, channel)
    return channel
  }

  // Track user presence
  async trackPresence(
    channelName: string,
    userInfo: Record<string, unknown>
  ) {
    const channel = this.channels.get(channelName)
    if (!channel) {
      console.error(`Channel ${channelName} not found`)
      return
    }

    const status = await channel.track(userInfo)
    return status
  }

  // Send broadcast message
  async broadcast(
    channelName: string,
    event: string,
    payload: unknown
  ) {
    const channel = this.channels.get(channelName)
    if (!channel) {
      console.error(`Channel ${channelName} not found`)
      return
    }

    const status = await channel.send({
      type: 'broadcast',
      event,
      payload,
    })
    return status
  }

  // Unsubscribe from a channel
  unsubscribe(channelName: string) {
    const channel = this.channels.get(channelName)
    if (channel) {
      this.supabase.removeChannel(channel)
      this.channels.delete(channelName)
    }
  }

  // Unsubscribe from all channels
  unsubscribeAll() {
    this.channels.forEach((channel) => {
      this.supabase.removeChannel(channel)
    })
    this.channels.clear()
  }

  // Get channel status
  getChannelStatus(channelName: string) {
    const channel = this.channels.get(channelName)
    return channel ? channel.state : null
  }

  // Get all active channels
  getActiveChannels() {
    return Array.from(this.channels.keys())
  }
}

// Export singleton instance
export const realtimeManager = new RealtimeManager()

// Convenience functions for common use cases

export function subscribeToChats(
  chatId: string,
  onMessage: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void
) {
  return realtimeManager.subscribeToTable(
    `chat-${chatId}`,
    {
      event: '*',
      table: 'messages',
      filter: `chat_id=eq.${chatId}`,
    },
    onMessage
  )
}

export function subscribeToAgents(
  onAgentChange: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void
) {
  return realtimeManager.subscribeToTable(
    'agents',
    {
      event: '*',
      table: 'agents',
    },
    onAgentChange
  )
}

export function subscribeToWorkflowRuns(
  workflowId: string,
  onRunUpdate: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void
) {
  return realtimeManager.subscribeToTable(
    `workflow-${workflowId}`,
    {
      event: '*',
      table: 'workflow_runs',
      filter: `workflow_id=eq.${workflowId}`,
    },
    onRunUpdate
  )
}

export function createCollaborationChannel(
  roomId: string,
  userId: string,
  userInfo: Record<string, unknown>
) {
  // Subscribe to presence
  const channel = realtimeManager.subscribeToPresence(
    `collaboration-${roomId}`,
    {
      callback: (state) => {
        console.log('Presence state:', state)
      },
    }
  )

  // Track this user's presence
  realtimeManager.trackPresence(`collaboration-${roomId}`, {
    user_id: userId,
    ...userInfo,
    online_at: new Date().toISOString(),
  })

  return channel
}

export function broadcastCursorPosition(
  roomId: string,
  position: { x: number; y: number }
) {
  return realtimeManager.broadcast(
    `collaboration-${roomId}`,
    'cursor',
    position
  )
}

export function subscribeToNotifications(
  userId: string,
  onNotification: (payload: unknown) => void
) {
  return realtimeManager.subscribeToBroadcast(
    `notifications-${userId}`,
    [
      {
        event: 'notification',
        callback: onNotification,
      },
    ]
  )
}