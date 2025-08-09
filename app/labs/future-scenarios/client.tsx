"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LabWrapper } from "@/components/labs/lab-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Users, 
  Bot,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Heart,
  Zap,
  Copy,
  CheckCircle,
  Lightbulb,
  Brain,
  Rocket
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateRoomCode, generatePlayerId, AI_PERSONALITIES } from "@/lib/multiplayer/rooms";
import { createClient } from "@/lib/supabase/client";

interface Scenario {
  id: string;
  year: number;
  title: string;
  description: string;
  author: string;
  authorId: string;
  isAI: boolean;
  category: 'technology' | 'society' | 'environment' | 'economy' | 'politics';
  impacts: {
    positive: string[];
    negative: string[];
    unexpected: string[];
  };
  votes: Record<string, 'likely' | 'unlikely' | 'wild'>;
  reactions: Record<string, string>;
}

interface WorldState {
  timeline: Scenario[];
  currentYear: number;
  theme: string;
  worldName: string;
  consensus: {
    utopian: number;
    dystopian: number;
    realistic: number;
  };
}

const SCENARIO_PROMPTS = [
  "What if AI achieves consciousness in {year}?",
  "How would universal basic income change society by {year}?",
  "What happens when we cure aging in {year}?",
  "Describe the first Mars colony in {year}",
  "How will work change when robots do 80% of jobs in {year}?",
  "What if we discover alien life in {year}?",
  "How will education evolve with brain-computer interfaces by {year}?",
  "What happens to privacy in a fully connected world of {year}?",
  "Describe climate solutions that emerge by {year}",
  "How will humans and AI coexist in {year}?"
];

const CATEGORIES = {
  technology: { icon: Zap, color: 'text-blue-500' },
  society: { icon: Users, color: 'text-green-500' },
  environment: { icon: Globe, color: 'text-emerald-500' },
  economy: { icon: TrendingUp, color: 'text-purple-500' },
  politics: { icon: AlertTriangle, color: 'text-orange-500' }
};

function FutureScenariosGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomCode = searchParams.get('room');
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState<string>("");
  const [isHost, setIsHost] = useState(false);
  const [players] = useState<{id: string; name: string; isAI: boolean; avatar: string; isHost?: boolean}[]>([]);
  const [worldState, setWorldState] = useState<WorldState | null>(null);
  const [scenarioInput, setScenarioInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES>('technology');
  const [roomState, setRoomState] = useState<'lobby' | 'building' | 'exploring'>('lobby');
  const [copied, setCopied] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const supabase = createClient();

  useEffect(() => {
    if (!roomCode) {
      const newCode = generateRoomCode();
      router.push(`/labs/future-scenarios?room=${newCode}`);
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
      avatar: '🧑‍🚀',
    });
  };

  const addAIPlayer = async () => {
    const aiPlayer = AI_PERSONALITIES['future-scenarios'][
      Math.floor(Math.random() * AI_PERSONALITIES['future-scenarios'].length)
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

  const startWorldBuilding = async (theme: string) => {
    const initialState: WorldState = {
      timeline: [],
      currentYear: 2025,
      theme,
      worldName: `${theme} Timeline ${roomCode}`,
      consensus: {
        utopian: 33,
        dystopian: 33,
        realistic: 34,
      },
    };

    const channel = supabase.channel(`room:${roomCode}`);
    await channel.send({
      type: 'broadcast',
      event: 'world-update',
      payload: {
        worldState: initialState,
        roomState: 'building',
      },
    });

    setWorldState(initialState);
    setRoomState('building');
  };

  const getRandomPrompt = () => {
    const prompt = SCENARIO_PROMPTS[Math.floor(Math.random() * SCENARIO_PROMPTS.length)];
    const year = worldState ? worldState.currentYear + Math.floor(Math.random() * 20) + 5 : 2030;
    setCurrentPrompt(prompt.replace('{year}', year.toString()));
  };

  const submitScenario = async () => {
    if (!scenarioInput || !worldState) return;

    const newScenario: Scenario = {
      id: generatePlayerId(),
      year: worldState.currentYear + Math.floor(Math.random() * 20) + 5,
      title: scenarioInput.split('.')[0],
      description: scenarioInput,
      author: playerName,
      authorId: playerId,
      isAI: false,
      category: selectedCategory,
      impacts: {
        positive: [],
        negative: [],
        unexpected: [],
      },
      votes: {},
      reactions: {},
    };

    const channel = supabase.channel(`room:${roomCode}`);
    await channel.send({
      type: 'broadcast',
      event: 'add-scenario',
      payload: newScenario,
    });

    setScenarioInput("");
  };

  const voteOnScenario = async (scenarioId: string, vote: 'likely' | 'unlikely' | 'wild') => {
    const channel = supabase.channel(`room:${roomCode}`);
    await channel.send({
      type: 'broadcast',
      event: 'vote-scenario',
      payload: {
        scenarioId,
        playerId,
        vote,
      },
    });
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}/labs/future-scenarios?room=${roomCode}`;
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
        {worldState && (
          <div className="flex items-center gap-4">
            <Badge>Year: {worldState.currentYear}</Badge>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">{players.length}</span>
            </div>
          </div>
        )}
      </div>

      {/* Game Content */}
      <div className="flex-1 overflow-auto">
        {roomState === 'lobby' ? (
          <div className="h-full flex flex-col items-center justify-center p-4 space-y-6">
            {!playerName ? (
              <>
                <h2 className="text-2xl font-bold">Join Future Building</h2>
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
                <h2 className="text-2xl font-bold">Choose Your Future</h2>
                
                {/* Theme Selection */}
                {isHost && (
                  <div className="grid grid-cols-2 gap-3 max-w-2xl w-full">
                    {[
                      { theme: 'Optimistic AI', icon: Heart, desc: 'AI solves humanity\'s problems' },
                      { theme: 'Balanced Progress', icon: Brain, desc: 'Realistic mix of challenges and solutions' },
                      { theme: 'Cautionary Tale', icon: AlertTriangle, desc: 'Explore potential risks and dangers' },
                      { theme: 'Wild Card', icon: Rocket, desc: 'Anything goes - pure imagination' }
                    ].map(({ theme, icon: Icon, desc }) => (
                      <Card 
                        key={theme}
                        className="p-4 cursor-pointer hover:shadow-lg transition-all"
                        onClick={() => startWorldBuilding(theme)}
                      >
                        <Icon className="w-8 h-8 mb-2" />
                        <h3 className="font-semibold">{theme}</h3>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Player List */}
                <div className="flex gap-2">
                  {players.map((player) => (
                    <Badge key={player.id} variant="secondary">
                      {player.avatar} {player.name}
                    </Badge>
                  ))}
                  {isHost && (
                    <Button size="sm" variant="outline" onClick={addAIPlayer}>
                      <Bot className="w-4 h-4 mr-1" />
                      Add AI
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex h-full">
            {/* Timeline */}
            <div className="w-2/3 p-4 overflow-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Timeline: {worldState?.worldName}</h3>
                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      <Heart className="w-3 h-3 mr-1" />
                      {worldState?.consensus.utopian}%
                    </Badge>
                    <Badge variant="secondary">
                      <Brain className="w-3 h-3 mr-1" />
                      {worldState?.consensus.realistic}%
                    </Badge>
                    <Badge variant="secondary">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {worldState?.consensus.dystopian}%
                    </Badge>
                  </div>
                </div>

                {/* Scenarios */}
                <AnimatePresence>
                  {worldState?.timeline.sort((a, b) => a.year - b.year).map((scenario) => {
                    const CategoryIcon = CATEGORIES[scenario.category].icon;
                    return (
                      <motion.div
                        key={scenario.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <Card className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge>{scenario.year}</Badge>
                              <CategoryIcon className={`w-4 h-4 ${CATEGORIES[scenario.category].color}`} />
                              <span className="text-sm text-muted-foreground">
                                by {scenario.author} {scenario.isAI && '🤖'}
                              </span>
                            </div>
                          </div>
                          
                          <h4 className="font-semibold mb-1">{scenario.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => voteOnScenario(scenario.id, 'likely')}
                            >
                              Likely
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => voteOnScenario(scenario.id, 'unlikely')}
                            >
                              Unlikely
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => voteOnScenario(scenario.id, 'wild')}
                            >
                              Wild!
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Input Panel */}
            <div className="w-1/3 p-4 border-l">
              <div className="space-y-4">
                <h3 className="font-semibold">Add to the Future</h3>
                
                {currentPrompt && (
                  <Card className="p-3 bg-muted/50">
                    <p className="text-sm italic">{currentPrompt}</p>
                  </Card>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={getRandomPrompt}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Get Inspiration
                </Button>

                <div className="flex gap-2">
                  {Object.entries(CATEGORIES).map(([key, { icon: Icon }]) => (
                    <Button
                      key={key}
                      size="sm"
                      variant={selectedCategory === key ? "default" : "outline"}
                      onClick={() => setSelectedCategory(key as keyof typeof CATEGORIES)}
                    >
                      <Icon className="w-4 h-4" />
                    </Button>
                  ))}
                </div>

                <Textarea
                  placeholder="Describe a future scenario..."
                  value={scenarioInput}
                  onChange={(e) => setScenarioInput(e.target.value)}
                  rows={4}
                />
                
                <Button className="w-full" onClick={submitScenario}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Add Scenario
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function FutureScenariosClient() {
  const howItWorks = (
    <>
      <h3>How Future Scenarios Works</h3>
      <p>
        Collaborate with humans and AI to build future timelines. Each player 
        contributes scenarios, exploring how technology, society, and humanity 
        might evolve. Vote on likelihood, discuss consequences, and watch as 
        your collective vision of the future emerges.
      </p>
      <h4>Gameplay</h4>
      <ul>
        <li><strong>Choose a Theme:</strong> Optimistic, Cautionary, or Wild Card</li>
        <li><strong>Build Timeline:</strong> Add scenarios from 2025 to 2100</li>
        <li><strong>Vote & React:</strong> Rate scenarios as likely, unlikely, or wild</li>
        <li><strong>AI Participants:</strong> AI players add their own predictions</li>
        <li><strong>Consensus Meter:</strong> Track if your world leans utopian or dystopian</li>
      </ul>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Strategic Planning</h4>
        <p className="text-sm text-muted-foreground">
          Use for business scenario planning and future forecasting
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Creative Writing</h4>
        <p className="text-sm text-muted-foreground">
          Build worlds for sci-fi stories and speculative fiction
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Educational Workshop</h4>
        <p className="text-sm text-muted-foreground">
          Teach futures thinking and systems analysis
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
      <ul className="space-y-2 text-sm">
        <li>• Real-time collaboration via Supabase</li>
        <li>• AI agents with different worldview personalities</li>
        <li>• Timeline visualization and export</li>
        <li>• Consensus algorithm for world sentiment</li>
        <li>• Support for 2-12 players</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="Future Scenarios"
      description="Build tomorrow's world together with AI"
      slug="future-scenarios"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Use Future Scenarios for your next strategy session"
    >
      <FutureScenariosGame />
    </LabWrapper>
  );
}