import { nanoid } from 'nanoid';

export interface Room {
  id: string;
  code: string;
  game: string;
  host: string;
  players: Player[];
  state: 'waiting' | 'playing' | 'finished';
  gameState: Record<string, unknown>;
  createdAt: string;
  settings: RoomSettings;
}

export interface Player {
  id: string;
  name: string;
  isAI: boolean;
  avatar?: string;
  score: number;
  isHost: boolean;
  connectionId?: string;
}

export interface RoomSettings {
  maxPlayers: number;
  minPlayers: number;
  isPublic: boolean;
  allowAI: boolean;
  aiDifficulty?: 'easy' | 'medium' | 'hard' | 'chaos';
  roundTime?: number;
  customPrompts?: boolean;
}

export function generateRoomCode(): string {
  // Generate a readable 6-character room code
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function generatePlayerId(): string {
  return nanoid(10);
}

// AI player personalities for different games
export const AI_PERSONALITIES = {
  'cards-against-ai': [
    { name: 'GPT-5', personality: 'witty', avatar: '🤖' },
    { name: 'Claude', personality: 'philosophical', avatar: '🧠' },
    { name: 'Bard', personality: 'creative', avatar: '🎨' },
    { name: 'Llama', personality: 'quirky', avatar: '🦙' },
    { name: 'Mixtral', personality: 'edgy', avatar: '⚡' },
  ],
  'telestrations': [
    { name: 'Picasso AI', personality: 'artistic', avatar: '🎨' },
    { name: 'Doodle Bot', personality: 'minimalist', avatar: '✏️' },
    { name: 'Vision Pro', personality: 'precise', avatar: '👁️' },
  ],
  'future-scenarios': [
    { name: 'Optimist AI', personality: 'utopian', avatar: '🌟' },
    { name: 'Realist Bot', personality: 'pragmatic', avatar: '⚖️' },
    { name: 'Chaos Agent', personality: 'dystopian', avatar: '🔥' },
  ],
  'family-feud': [
    { name: 'Survey Says', personality: 'statistical', avatar: '📊' },
    { name: 'Pop Culture AI', personality: 'trendy', avatar: '🎭' },
    { name: 'Wisdom Bot', personality: 'traditional', avatar: '🦉' },
  ]
};