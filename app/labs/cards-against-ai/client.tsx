"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LabWrapper } from "@/components/labs/lab-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Bot, 
  Copy, 
  Crown,
  Zap,
  CheckCircle
} from "lucide-react";
import { generateRoomCode, generatePlayerId, AI_PERSONALITIES } from "@/lib/multiplayer/rooms";
import { useMultiplayerRoom } from "@/lib/hooks/useMultiplayerRoom";
import { nanoid } from "nanoid";

// Card decks for the game
const BLACK_CARDS = [
  "My startup failed because of _____.",
  "The secret to 10x growth? _____.",
  "VCs love it when you _____.",
  "_____ is the Uber of _____.",
  "Our AI can _____ better than any human.",
  "The metaverse is just _____ with extra steps.",
  "Breaking: Elon Musk announces _____.",
  "_____ is disrupting the _____ industry.",
  "Our burn rate is higher than _____.",
  "We're pivoting from _____ to _____.",
  "The real Web3 was _____ all along.",
  "ChatGPT just learned how to _____.",
  "_____ is the new Bitcoin.",
  "Our company culture is best described as _____.",
  "We're like _____, but for _____.",
];

const WHITE_CARDS = [
  "Technical debt",
  "A founder's tears",
  "Infinite scroll of doom",
  "Weaponized FOMO",
  "A blockchain solution to a non-existent problem",
  "The illusion of product-market fit",
  "Gaslighting your investors",
  "A pizza party instead of raises",
  "Mandatory fun",
  "The friends we made along the way",
  "Venture capital on fire",
  "A middle manager's existential crisis",
  "Synergy",
  "Disrupting yourself into bankruptcy",
  "An NFT of a screenshot of an NFT",
  "Machine learning that's just if-statements",
  "A standup meeting that could've been a Slack message",
  "The metaverse nobody asked for",
  "Crushing imposter syndrome",
  "Hallucinating LLMs",
  "A 10x engineer's ego",
  "Unlimited PTO (that nobody takes)",
  "Hockey stick growth (drawn in MS Paint)",
  "A feature, not a bug",
  "Minimum viable consciousness",
  "The singularity, but make it disappointing",
  "A board meeting conducted entirely in buzzwords",
  "Ethical AI (terms and conditions apply)",
  "Your data, but spicy",
  "A unicorn that's actually just a horse with a traffic cone",
];

interface GameState {
  round: number;
  blackCard: string;
  czar: string;
  submissions: Record<string, string[]>;
  winner?: string;
  scores: Record<string, number>;
  phase: 'selecting' | 'reading' | 'voting' | 'reveal';
  timeLeft?: number;
}

function CardsAgainstAIGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomCode = searchParams.get('room');
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState<string>("");
  const [isHost, setIsHost] = useState(false);
  const [players, setPlayers] = useState<{id: string; name: string; isAI: boolean; avatar: string; score: number; isHost?: boolean}[]>([]);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [myCards, setMyCards] = useState<string[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [roomState, setRoomState] = useState<'lobby' | 'playing' | 'finished'>('lobby');
  const [copied, setCopied] = useState(false);

  const { trackPlayer, broadcast, isConnected } = useMultiplayerRoom({
    roomCode,
    playerId,
    playerName,
    isHost,
    onPresenceSync: (playersList) => {
      setPlayers(playersList as {id: string; name: string; isAI: boolean; avatar: string; score: number; isHost?: boolean}[]);
    },
    onBroadcast: (event, payload) => {
      if (event === 'game-update') {
        if (payload.gameState) {
          setGameState(payload.gameState as GameState);
        }
        if (payload.roomState) {
          setRoomState(payload.roomState as 'lobby' | 'playing' | 'finished');
        }
      }
    },
  });

  // Initialize or join room
  useEffect(() => {
    if (!roomCode) {
      // Create new room
      const newCode = generateRoomCode();
      router.push(`/labs/cards-against-ai?room=${newCode}`);
      setIsHost(true);
    }

    const id = localStorage.getItem('playerId') || generatePlayerId();
    localStorage.setItem('playerId', id);
    setPlayerId(id);
  }, [roomCode, router]);


  const joinGame = async () => {
    if (!playerName) return;
    // The presence tracking is now handled in the useMultiplayerRoom hook

    // Draw initial hand
    const hand = WHITE_CARDS.sort(() => Math.random() - 0.5).slice(0, 7);
    setMyCards(hand);
  };

  const addAIPlayer = async () => {
    if (!isConnected) return;
    
    const aiPlayer = AI_PERSONALITIES['cards-against-ai'][
      Math.floor(Math.random() * AI_PERSONALITIES['cards-against-ai'].length)
    ];
    
    await trackPlayer({
      id: nanoid(),
      name: aiPlayer.name,
      isAI: true,
      score: 0,
      isHost: false,
      avatar: aiPlayer.avatar,
      personality: aiPlayer.personality,
    });
  };

  const startGame = async () => {
    if (players.length < 3) return;

    const initialState: GameState = {
      round: 1,
      blackCard: BLACK_CARDS[Math.floor(Math.random() * BLACK_CARDS.length)],
      czar: players[0].id,
      submissions: {},
      scores: Object.fromEntries(players.map(p => [p.id, 0])),
      phase: 'selecting',
      timeLeft: 60,
    };

    await broadcast('game-update', {
      gameState: initialState,
      roomState: 'playing',
    });
  };

  const submitCards = async () => {
    if (selectedCards.length === 0) return;

    await broadcast('card-submission', {
      playerId,
      cards: selectedCards,
    });

    setSelectedCards([]);
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}/labs/cards-against-ai?room=${roomCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[600px] flex flex-col">
      {/* Game Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            Room: {roomCode || 'Creating...'}
          </Badge>
          <Button size="sm" variant="ghost" onClick={copyRoomLink}>
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="text-sm">{players.length} players</span>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 overflow-hidden">
        {roomState === 'lobby' ? (
          <div className="h-full flex flex-col items-center justify-center p-8 space-y-6">
            {!playerName ? (
              <>
                <h2 className="text-2xl font-bold">Join the Game</h2>
                <div className="flex gap-2 max-w-sm w-full">
                  <Input
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && joinGame()}
                  />
                  <Button onClick={joinGame}>Join</Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">Waiting for Players...</h2>
                
                {/* Player List */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl w-full">
                  {players.map((player) => (
                    <Card key={player.id} className="p-3 flex items-center gap-2">
                      <span className="text-lg">{player.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{player.name}</p>
                        {player.isAI && (
                          <Badge variant="secondary" className="text-xs">AI</Badge>
                        )}
                      </div>
                      {player.isHost && <Crown className="w-4 h-4 text-yellow-500" />}
                    </Card>
                  ))}
                  
                  {/* Add AI Player Button */}
                  {isHost && players.length < 8 && (
                    <Button
                      variant="outline"
                      className="h-full"
                      onClick={addAIPlayer}
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Add AI
                    </Button>
                  )}
                </div>

                {/* Start Game Button */}
                {isHost && players.length >= 3 && (
                  <Button size="lg" onClick={startGame} className="gap-2">
                    <Zap className="w-5 h-5" />
                    Start Game
                  </Button>
                )}

                {!isHost && (
                  <p className="text-muted-foreground">Waiting for host to start...</p>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* Black Card */}
            {gameState && (
              <>
                <div className="p-6 bg-black text-white rounded-lg m-4">
                  <p className="text-xl font-bold">{gameState.blackCard}</p>
                </div>

                {/* Game Phase */}
                <div className="flex-1 p-4">
                  {gameState.phase === 'selecting' && (
                    <>
                      <p className="text-sm text-muted-foreground mb-4">
                        {gameState.czar === playerId ? 
                          "You're the Card Czar! Wait for submissions..." : 
                          "Select your card(s):"}
                      </p>
                      
                      {/* My Cards */}
                      {gameState.czar !== playerId && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {myCards.map((card, i) => (
                            <Card
                              key={i}
                              className={`p-3 cursor-pointer transition-all ${
                                selectedCards.includes(card) ? 
                                'ring-2 ring-primary' : 
                                'hover:shadow-lg'
                              }`}
                              onClick={() => {
                                if (selectedCards.includes(card)) {
                                  setSelectedCards(selectedCards.filter(c => c !== card));
                                } else {
                                  setSelectedCards([...selectedCards, card]);
                                }
                              }}
                            >
                              <p className="text-sm">{card}</p>
                            </Card>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {gameState.phase === 'voting' && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {gameState.czar === playerId ? 
                          "Choose the winner:" : 
                          "The Card Czar is choosing..."}
                      </p>
                      
                      {/* Submitted Cards */}
                      <div className="grid gap-3">
                        {Object.entries(gameState.submissions).map(([pid, cards]) => (
                          <Card key={pid} className="p-4">
                            <p>{cards.join(', ')}</p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {gameState.phase === 'selecting' && gameState.czar !== playerId && (
                  <div className="p-4 border-t">
                    <Button 
                      className="w-full" 
                      onClick={submitCards}
                      disabled={selectedCards.length === 0}
                    >
                      Submit Card{selectedCards.length > 1 ? 's' : ''}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CardsAgainstAIContent() {
  const howItWorks = (
    <>
      <h3>How Prompt Party Works</h3>
      <p>
        A multiplayer party game where humans and AI compete with dark humor about 
        startups and tech. One player is the Card Czar who reads a black card with 
        blanks. Everyone else submits white cards to fill the blanks. The Czar picks 
        the funniest combo!
      </p>
      <h4>Game Features</h4>
      <ul>
        <li><strong>Multiplayer Rooms:</strong> Create a room and share the link with friends</li>
        <li><strong>AI Players:</strong> Add AI opponents with different personalities</li>
        <li><strong>Startup Edition:</strong> Tech and startup-themed cards</li>
        <li><strong>Real-time Sync:</strong> Powered by Supabase Realtime</li>
      </ul>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Team Building</h4>
        <p className="text-sm text-muted-foreground">
          Perfect for startup team bonding and virtual happy hours
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Conference Ice Breaker</h4>
        <p className="text-sm text-muted-foreground">
          Break the ice at tech conferences and meetups
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">AI vs Human Challenge</h4>
        <p className="text-sm text-muted-foreground">
          See if AI can be funnier than humans at dark humor
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
      <ul className="space-y-2 text-sm">
        <li>• Real-time multiplayer with Supabase Realtime</li>
        <li>• AI players powered by GPT-4 for dynamic responses</li>
        <li>• WebRTC for low-latency game sync</li>
        <li>• Room codes for easy sharing</li>
        <li>• Support for 3-10 players per room</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="Prompt Party"
      description="Multiplayer party game with dark startup humor"
      slug="cards-against-ai"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Host Prompt Party for your next team event"
    >
      <CardsAgainstAIGame />
    </LabWrapper>
  );
}

export function CardsAgainstAIClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardsAgainstAIContent />
    </Suspense>
  );
}