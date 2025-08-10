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
  const supabase = createClient();

  useEffect(() => {
    if (!roomCode || !playerName) return;

    // Create channel with presence config
    const roomChannel = supabase.channel(`room:${roomCode}`, {
      config: {
        presence: {
          key: playerId,
        },
      },
    });

    // Set up event listeners
    roomChannel
      .on('presence', { event: 'sync' }, () => {
        const state = roomChannel.presenceState();
        const playersList = Object.values(state).flat() as unknown as Player[];
        onPresenceSync?.(playersList);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('Player joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('Player left:', key, leftPresences);
      })
      .on('broadcast', { event: '*' }, ({ event, payload }) => {
        onBroadcast?.(event, payload);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          // Track this player's presence after subscription
          await roomChannel.track({
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

    return () => {
      roomChannel.unsubscribe();
      setIsConnected(false);
    };
  }, [roomCode, playerName, playerId, isHost, supabase, onPresenceSync, onBroadcast]);

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
  };
}