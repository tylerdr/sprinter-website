import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface Player {
  id: string;
  name: string;
  isAI: boolean;
  avatar: string;
  isHost?: boolean;
  score?: number;
  [key: string]: unknown;
}

interface UseMultiplayerRoomProps {
  roomCode: string | null;
  playerId: string;
  playerName: string;
  isHost: boolean;
  onPresenceSync?: (players: Player[]) => void;
  onBroadcast?: (event: string, payload: Record<string, unknown>) => void;
}

export function useMultiplayerRoom({
  roomCode,
  playerId,
  playerName,
  isHost,
  onPresenceSync,
  onBroadcast,
}: UseMultiplayerRoomProps) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    if (!roomCode || !playerName) return;

    let isCancelled = false;
    let roomChannel: RealtimeChannel | null = null;

    try {
      const supabase = createClient();
      setIsConfigured(true);

      const channel = supabase.channel(`room:${roomCode}`, {
        config: {
          presence: {
            key: playerId,
          },
        },
      });
      roomChannel = channel;

      channel
        .on('presence', { event: 'sync' }, () => {
          const state = channel.presenceState() ?? {};
          const playersList = Object.values(state).flat() as unknown as Player[];
          onPresenceSync?.(playersList);
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }: any) => {
          console.log('Player joined:', key, newPresences);
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }: any) => {
          console.log('Player left:', key, leftPresences);
        })
        .on('broadcast', { event: '*' }, ({ event, payload }: any) => {
          onBroadcast?.(event, payload);
        })
        .subscribe(async (status: any) => {
          if (isCancelled) return;
          if (status === 'SUBSCRIBED') {
            setIsConnected(true);
            await channel.track({
              id: playerId,
              name: playerName,
              isAI: false,
              isHost,
              avatar: '👤',
            });
          } else if (status === 'CLOSED') {
            setIsConnected(false);
          }
        });

      setChannel(roomChannel);
    } catch (error) {
      console.warn('Supabase realtime is not configured; multiplayer features disabled.', error);
      setIsConfigured(false);
      setIsConnected(false);
    }

    return () => {
      isCancelled = true;
      if (roomChannel) {
        roomChannel.unsubscribe();
      }
      setChannel(null);
      setIsConnected(false);
    };
  }, [roomCode, playerName, playerId, isHost, onPresenceSync, onBroadcast]);

  const trackPlayer = useCallback(
    async (playerData: Partial<Player>) => {
      if (!channel || !isConnected) {
        console.warn('Cannot track player: channel not connected');
        return;
      }
      await channel.track(playerData);
    },
    [channel, isConnected]
  );

  const broadcast = useCallback(
    async (event: string, payload: Record<string, unknown>) => {
      if (!channel || !isConnected) {
        console.warn('Cannot broadcast: channel not connected');
        return;
      }
      await channel.send({
        type: 'broadcast',
        event,
        payload,
      });
    },
    [channel, isConnected]
  );

  return {
    channel,
    isConnected,
    trackPlayer,
    broadcast,
    isConfigured,
  };
}
