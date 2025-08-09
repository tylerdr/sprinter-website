"use client";

import { useState, useEffect, useRef } from "react";
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
  CheckCircle,
  Timer,
  Eraser
} from "lucide-react";
import { generateRoomCode, generatePlayerId, AI_PERSONALITIES } from "@/lib/multiplayer/rooms";
import { createClient } from "@/lib/supabase/client";

interface GameRound {
  prompt?: string;
  drawing?: string;
  guess?: string;
  playerId: string;
  playerName: string;
  isAI: boolean;
}

interface GameState {
  chains: GameRound[][];
  currentRound: number;
  phase: 'drawing' | 'guessing' | 'reveal';
  timeLeft: number;
  activePlayerIndex: number;
}

function DrawingCanvas({ onSave, disabled }: { onSave: (drawing: string) => void; disabled?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);

  const startDrawing = (e: React.MouseEvent) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    onSave(dataUrl);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex gap-1">
          {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'].map((c) => (
            <button
              key={c}
              className={`w-8 h-8 rounded border-2 ${color === c ? 'border-primary' : 'border-border'}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              disabled={disabled}
            />
          ))}
        </div>
        <div className="flex gap-1">
          {[2, 5, 10].map((size) => (
            <Button
              key={size}
              size="sm"
              variant={brushSize === size ? "default" : "outline"}
              onClick={() => setBrushSize(size)}
              disabled={disabled}
            >
              {size}px
            </Button>
          ))}
        </div>
        <Button size="sm" variant="outline" onClick={clearCanvas} disabled={disabled}>
          <Eraser className="w-4 h-4" />
        </Button>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border-2 border-border rounded-lg bg-white cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <Button className="w-full" onClick={saveDrawing} disabled={disabled}>
        Submit Drawing
      </Button>
    </div>
  );
}

function AITelestrationsGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomCode = searchParams.get('room');
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState<string>("");
  const [isHost, setIsHost] = useState(false);
  const [players] = useState<{id: string; name: string; isAI: boolean; avatar: string; isHost?: boolean}[]>([]);
  const [gameState] = useState<GameState | null>(null);
  const [currentPrompt] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [roomState] = useState<'lobby' | 'playing' | 'reveal'>('lobby');
  const [copied, setCopied] = useState(false);

  const supabase = createClient();

  const startingPrompts = [
    "A robot eating spaghetti",
    "Cats in space",
    "Time traveling pizza",
    "Dancing dinosaur",
    "Flying submarine",
    "Invisible bicycle",
    "Melting clock tower",
    "Quantum coffee cup",
    "Singing cactus",
    "Underwater campfire"
  ];

  useEffect(() => {
    if (!roomCode) {
      const newCode = generateRoomCode();
      router.push(`/labs/ai-telestrations?room=${newCode}`);
      setIsHost(true);
    }

    const id = localStorage.getItem('playerId') || generatePlayerId();
    localStorage.setItem('playerId', id);
    setPlayerId(id);
  }, [roomCode]);

  const joinGame = async () => {
    if (!playerName) return;

    const channel = supabase.channel(`room:${roomCode}`);
    await channel.track({
      id: playerId,
      name: playerName,
      isAI: false,
      isHost,
      avatar: '👤',
    });
  };

  const addAIPlayer = async () => {
    const aiPlayer = AI_PERSONALITIES['telestrations'][
      Math.floor(Math.random() * AI_PERSONALITIES['telestrations'].length)
    ];
    
    const channel = supabase.channel(`room:${roomCode}`);
    await channel.track({
      id: generatePlayerId(),
      name: aiPlayer.name,
      isAI: true,
      isHost: false,
      avatar: aiPlayer.avatar,
      personality: aiPlayer.personality,
    });
  };

  const startGame = async () => {
    if (players.length < 3) return;

    // Initialize chains - one for each player
    const chains = players.map((player, i) => [{
      prompt: startingPrompts[i % startingPrompts.length],
      playerId: player.id,
      playerName: player.name,
      isAI: player.isAI,
    }]);

    const initialState: GameState = {
      chains,
      currentRound: 0,
      phase: 'drawing',
      timeLeft: 60,
      activePlayerIndex: 0,
    };

    const channel = supabase.channel(`room:${roomCode}`);
    await channel.send({
      type: 'broadcast',
      event: 'game-update',
      payload: {
        gameState: initialState,
        roomState: 'playing',
      },
    });
  };

  const submitDrawing = async (drawing: string) => {
    const channel = supabase.channel(`room:${roomCode}`);
    await channel.send({
      type: 'broadcast',
      event: 'submit-drawing',
      payload: {
        playerId,
        drawing,
      },
    });
  };

  const submitGuess = async () => {
    const channel = supabase.channel(`room:${roomCode}`);
    await channel.send({
      type: 'broadcast',
      event: 'submit-guess',
      payload: {
        playerId,
        guess: currentGuess,
      },
    });
    setCurrentGuess("");
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}/labs/ai-telestrations?room=${roomCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline">Room: {roomCode || 'Creating...'}</Badge>
          <Button size="sm" variant="ghost" onClick={copyRoomLink}>
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="text-sm">{players.length} players</span>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 overflow-auto p-4">
        {roomState === 'lobby' ? (
          <div className="h-full flex flex-col items-center justify-center space-y-6">
            {!playerName ? (
              <>
                <h2 className="text-2xl font-bold">Join Telestrations</h2>
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
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl w-full">
                  {players.map((player) => (
                    <Card key={player.id} className="p-3 flex items-center gap-2">
                      <span className="text-lg">{player.avatar}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{player.name}</p>
                        {player.isAI && <Badge variant="secondary" className="text-xs">AI</Badge>}
                      </div>
                    </Card>
                  ))}
                  
                  {isHost && players.length < 8 && (
                    <Button variant="outline" onClick={addAIPlayer}>
                      <Bot className="w-4 h-4 mr-2" />
                      Add AI
                    </Button>
                  )}
                </div>

                {isHost && players.length >= 3 && (
                  <Button size="lg" onClick={startGame}>
                    Start Game
                  </Button>
                )}
              </>
            )}
          </div>
        ) : roomState === 'playing' && gameState ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge>Round {gameState.currentRound + 1}</Badge>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <span>{gameState.timeLeft}s</span>
              </div>
            </div>

            {gameState.phase === 'drawing' ? (
              <div className="space-y-4">
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Draw this:</p>
                  <p className="text-lg font-semibold">{currentPrompt}</p>
                </Card>
                <DrawingCanvas onSave={submitDrawing} />
              </div>
            ) : (
              <div className="space-y-4">
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">What is this?</p>
                  <img src="/api/placeholder/400/300" alt="Drawing to guess" className="w-full rounded" />
                </Card>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your guess..."
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submitGuess()}
                  />
                  <Button onClick={submitGuess}>Submit</Button>
                </div>
              </div>
            )}
          </div>
        ) : roomState === 'reveal' && gameState ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">The Chains Revealed!</h2>
            
            {gameState.chains.map((chain, i) => (
              <Card key={i} className="p-4">
                <h3 className="font-semibold mb-3">Chain {i + 1}</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {chain.map((round, j) => (
                    <div key={j} className="min-w-[150px] text-center">
                      <Badge variant="outline" className="mb-2">{round.playerName}</Badge>
                      {round.prompt && <p className="text-sm">{round.prompt}</p>}
                      {round.drawing && <img src={round.drawing} alt="" className="w-full rounded" />}
                      {round.guess && <p className="text-sm italic">&ldquo;{round.guess}&rdquo;</p>}
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            {isHost && (
              <Button className="w-full" onClick={() => router.refresh()}>
                Play Again
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function AITelestrationsClient() {
  const howItWorks = (
    <>
      <h3>How AI Telestrations Works</h3>
      <p>
        The classic game of telephone meets Pictionary! Players alternate between 
        drawing prompts and guessing what others drew. Watch as your original 
        prompt hilariously transforms through the chain of drawings and guesses.
        AI players add their own creative interpretations!
      </p>
      <h4>Game Flow</h4>
      <ol>
        <li>Each player starts with a unique prompt</li>
        <li>Draw the prompt (60 seconds)</li>
        <li>Pass drawings to the next player</li>
        <li>Guess what was drawn</li>
        <li>Continue until complete</li>
        <li>Reveal the hilarious chains!</li>
      </ol>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Virtual Game Night</h4>
        <p className="text-sm text-muted-foreground">
          Perfect for remote teams and online hangouts
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Creative Workshop</h4>
        <p className="text-sm text-muted-foreground">
          Use for brainstorming and creative exercises
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">AI Art Challenge</h4>
        <p className="text-sm text-muted-foreground">
          See how AI interprets and transforms human drawings
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
      <ul className="space-y-2 text-sm">
        <li>• HTML5 Canvas for drawing</li>
        <li>• Real-time sync with Supabase</li>
        <li>• AI vision models for image interpretation</li>
        <li>• DALL-E for AI drawing generation</li>
        <li>• Support for 3-8 players</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="AI Telestrations"
      description="Draw, guess, and laugh as your sketches transform"
      slug="ai-telestrations"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Host AI Telestrations for your next creative session"
    >
      <AITelestrationsGame />
    </LabWrapper>
  );
}