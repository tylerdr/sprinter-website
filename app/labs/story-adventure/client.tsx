"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LabWrapper } from "@/components/labs/lab-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Users, 
  Bot,
  Edit3,
  Copy,
  CheckCircle,
  Timer,
  Crown,
  Swords,
  Heart,
  Flame,
  Moon,
  Star,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateRoomCode, generatePlayerId } from "@/lib/multiplayer/rooms";
import { useMultiplayerRoom } from "@/lib/hooks/useMultiplayerRoom";

interface StoryChapter {
  id: string;
  text: string;
  choices: Choice[];
  selectedChoice?: string;
  customChoice?: string;
  author?: string;
  illustration?: string;
}

interface Choice {
  id: string;
  text: string;
  votes: string[]; // player IDs who voted
  suggestedBy?: string;
  consequence?: string; // hint about what might happen
}

interface StoryState {
  title: string;
  genre: string;
  chapters: StoryChapter[];
  currentChapter: number;
  players: {id: string; name: string; isAI: boolean; avatar: string; isHost?: boolean; score?: number}[];
  phase: 'reading' | 'voting' | 'writing';
  timeLeft: number;
  storyStats: {
    danger: number;
    romance: number;
    mystery: number;
    comedy: number;
  };
}

const STORY_GENRES = [
  { id: 'fantasy', name: 'Fantasy Quest', icon: Swords, color: 'from-purple-500 to-pink-500' },
  { id: 'scifi', name: 'Space Odyssey', icon: Compass, color: 'from-blue-500 to-cyan-500' },
  { id: 'mystery', name: 'Murder Mystery', icon: Moon, color: 'from-gray-600 to-gray-800' },
  { id: 'romance', name: 'Love Story', icon: Heart, color: 'from-pink-500 to-red-500' },
  { id: 'horror', name: 'Horror Tale', icon: Flame, color: 'from-red-600 to-red-900' },
  { id: 'comedy', name: 'Comedy Adventure', icon: Star, color: 'from-yellow-400 to-orange-500' },
];

const STORY_STARTERS = {
  fantasy: "You wake up in a mystical forest, your memories foggy. A glowing sword lies beside you, humming with ancient power. In the distance, you hear the roar of a dragon and the clash of steel. A mysterious figure in a hooded cloak approaches...",
  scifi: "The year is 2384. Your spaceship&apos;s AI has just gone rogue, and you&apos;re drifting toward an uncharted black hole. The crew is in cryosleep, and you&apos;re the only one awake. Suddenly, an alien transmission breaks through the static...",
  mystery: "The grand mansion&apos;s lights flicker as thunder crashes outside. You&apos;re trapped with seven other guests, and the host has just been found dead in the locked library. Everyone has a secret, and you notice a bloody knife hidden behind the curtain...",
  romance: "You&apos;re at the airport, about to board a flight that will change your life forever. Your phone buzzes with a text from an unknown number: &apos;Don&apos;t get on that plane. Meet me at gate 7.&apos; You turn and lock eyes with someone from your past...",
  horror: "The abandoned hospital&apos;s corridors echo with your footsteps. You came here following rumors of your missing friend, but now you&apos;re not alone. The shadows move independently, and you hear whispers in a language that shouldn&apos;t exist...",
  comedy: "You accidentally become the CEO of a Fortune 500 company due to a hilarious case of mistaken identity. Your first board meeting is in five minutes, you&apos;re wearing a chicken costume from last night&apos;s party, and your phone won&apos;t stop playing &apos;Baby Shark&apos;..."
};

function StoryAdventureGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomCode = searchParams.get('room');
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState<string>("");
  const [isHost, setIsHost] = useState(false);
  const [players, setPlayers] = useState<{id: string; name: string; isAI: boolean; avatar: string; isHost?: boolean; score?: number; lastVote?: boolean}[]>([]);
  const [storyState, setStoryState] = useState<StoryState | null>(null);
  const [customChoice, setCustomChoice] = useState("");
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [roomState, setRoomState] = useState<'lobby' | 'playing' | 'ended'>('lobby');
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomCode) {
      const newCode = generateRoomCode();
      router.push(`/labs/story-adventure?room=${newCode}`);
      setIsHost(true);
    }

    const id = localStorage.getItem('playerId') || generatePlayerId();
    localStorage.setItem('playerId', id);
    setPlayerId(id);
  }, [roomCode, router]);

  const { trackPlayer, broadcast, isConnected } = useMultiplayerRoom({
    roomCode,
    playerId,
    playerName,
    isHost,
    onPresenceSync: (playersList) => {
      setPlayers(playersList as {id: string; name: string; isAI: boolean; avatar: string; isHost?: boolean; score?: number; lastVote?: boolean}[]);
    },
    onBroadcast: (event, payload) => {
      if (event === 'story-update') {
        if (payload.storyState) {
          setStoryState(payload.storyState as StoryState);
        }
        if (payload.roomState) {
          setRoomState(payload.roomState as 'lobby' | 'playing' | 'ended');
        }
      } else if (event === 'vote-choice' || event === 'custom-choice') {
        // Handle voting updates
      }
    },
  });

  // Auto-scroll to latest chapter
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [storyState?.chapters]);

  const joinGame = async () => {
    if (!playerName) return;
    // The presence tracking is now handled in the useMultiplayerRoom hook
  };

  const addAIPlayer = async () => {
    if (!isConnected) return;
    
    const aiPersonalities = [
      { name: 'Chaos Agent', avatar: '🎭', style: 'chaotic' },
      { name: 'Romance Bot', avatar: '💕', style: 'romantic' },
      { name: 'Logic Core', avatar: '🤖', style: 'logical' },
      { name: 'Drama Queen', avatar: '👑', style: 'dramatic' },
    ];
    
    const ai = aiPersonalities[Math.floor(Math.random() * aiPersonalities.length)];
    
    await trackPlayer({
      id: generatePlayerId(),
      name: ai.name,
      isAI: true,
      isHost: false,
      avatar: ai.avatar,
      style: ai.style,
      score: 0,
    });
  };

  const startStory = async (genre: string) => {
    const initialChapter: StoryChapter = {
      id: '1',
      text: STORY_STARTERS[genre as keyof typeof STORY_STARTERS],
      choices: [
        { id: 'a', text: 'Investigate cautiously', votes: [], consequence: 'Safety first...' },
        { id: 'b', text: 'Charge forward boldly', votes: [], consequence: 'Fortune favors the brave...' },
        { id: 'c', text: 'Try to communicate', votes: [], consequence: 'Words over weapons...' },
        { id: 'd', text: 'Custom action (write your own)', votes: [] },
      ],
    };

    const initialState: StoryState = {
      title: `The ${genre.charAt(0).toUpperCase() + genre.slice(1)} Chronicles`,
      genre,
      chapters: [initialChapter],
      currentChapter: 0,
      players,
      phase: 'voting',
      timeLeft: 60,
      storyStats: {
        danger: genre === 'horror' ? 50 : 20,
        romance: genre === 'romance' ? 50 : 10,
        mystery: genre === 'mystery' ? 50 : 30,
        comedy: genre === 'comedy' ? 50 : 10,
      },
    };

    await broadcast('story-update', {
      storyState: initialState,
      roomState: 'playing',
    });

    setStoryState(initialState);
    setRoomState('playing');
  };

  const voteForChoice = async (choiceId: string) => {
    if (!storyState) return;
    
    setSelectedChoice(choiceId);
    
    await broadcast('vote-choice', {
      playerId,
      choiceId,
      chapterId: storyState.chapters[storyState.currentChapter].id,
    });
  };

  const submitCustomChoice = async () => {
    if (!customChoice || !storyState) return;

    await broadcast('custom-choice', {
      playerId,
      playerName,
      customText: customChoice,
      chapterId: storyState.chapters[storyState.currentChapter].id,
    });

    setCustomChoice("");
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}/labs/story-adventure?room=${roomCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const GenreIcon = storyState ? STORY_GENRES.find(g => g.id === storyState.genre)?.icon || BookOpen : BookOpen;

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
        {storyState && (
          <div className="flex items-center gap-2">
            <GenreIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{storyState.title}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="text-sm">{players.length} storytellers</span>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 overflow-hidden">
        {roomState === 'lobby' ? (
          <div className="h-full flex flex-col items-center justify-center p-4 space-y-6">
            {!playerName ? (
              <>
                <BookOpen className="w-16 h-16 text-primary mb-4" />
                <h2 className="text-2xl font-bold">Join the Story</h2>
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
                <h2 className="text-2xl font-bold">Choose Your Adventure</h2>
                
                {/* Genre Selection */}
                {isHost && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl w-full">
                    {STORY_GENRES.map(({ id, name, icon: Icon, color }) => (
                      <Card 
                        key={id}
                        className="p-4 cursor-pointer hover:shadow-lg transition-all group"
                        onClick={() => startStory(id)}
                      >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold">{name}</h3>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Player List */}
                <div className="flex flex-wrap gap-2">
                  {players.map((player) => (
                    <Badge key={player.id} variant="secondary" className="px-3 py-1">
                      <span className="mr-1">{player.avatar}</span>
                      {player.name}
                      {player.isHost && <Crown className="w-3 h-3 ml-1" />}
                    </Badge>
                  ))}
                  {isHost && players.length < 8 && (
                    <Button size="sm" variant="outline" onClick={addAIPlayer}>
                      <Bot className="w-4 h-4 mr-1" />
                      Add AI
                    </Button>
                  )}
                </div>

                {!isHost && (
                  <p className="text-muted-foreground">Waiting for host to choose the genre...</p>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="flex h-full">
            {/* Story Panel */}
            <div className="flex-1 flex flex-col">
              {/* Story Stats */}
              {storyState && (
                <div className="p-3 border-b flex gap-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <Progress value={storyState.storyStats.danger} className="w-20 h-2" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <Progress value={storyState.storyStats.romance} className="w-20 h-2" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-purple-500" />
                    <Progress value={storyState.storyStats.mystery} className="w-20 h-2" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Progress value={storyState.storyStats.comedy} className="w-20 h-2" />
                  </div>
                </div>
              )}

              {/* Story Text */}
              <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4">
                <AnimatePresence>
                  {storyState?.chapters.map((chapter, index) => (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-4">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {chapter.text}
                        </p>
                        
                        {chapter.selectedChoice && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm text-muted-foreground italic">
                              → {chapter.selectedChoice}
                            </p>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Choice Panel */}
              {storyState && storyState.phase === 'voting' && (
                <div className="p-4 border-t space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">What happens next?</h3>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4" />
                      <span className="text-sm">{storyState.timeLeft}s</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    {storyState.chapters[storyState.currentChapter].choices.map((choice) => (
                      choice.id !== 'd' ? (
                        <Button
                          key={choice.id}
                          variant={selectedChoice === choice.id ? "default" : "outline"}
                          className="justify-start text-left h-auto py-3 px-4"
                          onClick={() => voteForChoice(choice.id)}
                        >
                          <div className="flex-1">
                            <p className="font-medium">{choice.text}</p>
                            {choice.consequence && (
                              <p className="text-xs text-muted-foreground mt-1 italic">
                                {choice.consequence}
                              </p>
                            )}
                          </div>
                          {choice.votes.length > 0 && (
                            <Badge variant="secondary" className="ml-2">
                              {choice.votes.length} votes
                            </Badge>
                          )}
                        </Button>
                      ) : (
                        <div key={choice.id} className="space-y-2">
                          <div className="flex gap-2">
                            <Textarea
                              placeholder="Write your own action..."
                              value={customChoice}
                              onChange={(e) => setCustomChoice(e.target.value)}
                              rows={2}
                              className="flex-1"
                            />
                            <Button 
                              onClick={submitCustomChoice}
                              disabled={!customChoice}
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Players Panel */}
            <div className="w-48 border-l p-3">
              <h3 className="font-semibold text-sm mb-3">Storytellers</h3>
              <div className="space-y-2">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center gap-2">
                    <span>{player.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{player.name}</p>
                      {player.isAI && (
                        <Badge variant="outline" className="text-xs scale-90 -ml-1">AI</Badge>
                      )}
                    </div>
                    {player.lastVote && (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StoryAdventureContent() {
  const howItWorks = (
    <>
      <h3>How AI Story Adventure Works</h3>
      <p>
        A multiplayer choose-your-own-adventure where AI crafts the narrative and 
        players vote on choices. The story evolves based on collective decisions, 
        with AI adapting the plot to your choices. Write custom actions or choose 
        from AI-generated options!
      </p>
      <h4>Game Flow</h4>
      <ul>
        <li><strong>AI Narrates:</strong> The story unfolds with rich descriptions</li>
        <li><strong>Players Choose:</strong> Vote on actions or write custom choices</li>
        <li><strong>Story Adapts:</strong> AI weaves choices into the narrative</li>
        <li><strong>Stats Track:</strong> Monitor danger, romance, mystery levels</li>
        <li><strong>Collaborate:</strong> Work together or create chaos!</li>
      </ul>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Team Building</h4>
        <p className="text-sm text-muted-foreground">
          Create stories together for memorable team experiences
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Creative Writing</h4>
        <p className="text-sm text-muted-foreground">
          Practice storytelling and explore narrative branches
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Party Game</h4>
        <p className="text-sm text-muted-foreground">
          Perfect for game nights with friends and family
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Kids&apos; Adventure</h4>
        <p className="text-sm text-muted-foreground">
          Safe, imaginative stories for young storytellers
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
      <ul className="space-y-2 text-sm">
        <li>• GPT-4 for dynamic story generation</li>
        <li>• Real-time voting via Supabase</li>
        <li>• Adaptive narrative AI that remembers choices</li>
        <li>• Story stats tracking (danger, romance, etc.)</li>
        <li>• Support for 2-8 players</li>
        <li>• Export completed stories as PDFs</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="AI Story Adventure"
      description="Your choices shape the story in this multiplayer adventure"
      slug="story-adventure"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Create unforgettable story experiences for your group"
    >
      <StoryAdventureGame />
    </LabWrapper>
  );
}

export function StoryAdventureClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoryAdventureContent />
    </Suspense>
  );
}