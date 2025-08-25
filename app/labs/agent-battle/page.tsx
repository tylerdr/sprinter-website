"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { LabLayout } from "@/components/labs/LabLayout";
import { 
  Swords, 
  Brain, 
  Trophy, 
  Zap, 
  MessageSquare, 
  BarChart3,
  Clock,
  DollarSign,
  Share2,
  Download,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  User
} from "lucide-react";
import { runBattle, BattleConfigSchema, type BattleConfig, type BattleState } from "./actions";
import { cn } from "@/lib/utils";

// Battle presets
const BATTLE_PRESETS = [
  {
    id: "code-optimization",
    name: "Code Optimization",
    topic: "What's the best approach to optimize a React application for performance?",
    criteria: ["accuracy", "practicality", "clarity"],
  },
  {
    id: "business-strategy",
    name: "Business Strategy",
    topic: "Should startups focus on growth or profitability in their first 2 years?",
    criteria: ["practicality", "creativity", "clarity"],
  },
  {
    id: "ai-implementation",
    name: "AI Implementation",
    topic: "What's the most effective way to implement AI in customer service?",
    criteria: ["accuracy", "cost", "practicality"],
  },
  {
    id: "data-architecture",
    name: "Data Architecture",
    topic: "Microservices vs Monolith: Which architecture scales better for data-intensive applications?",
    criteria: ["accuracy", "latency", "practicality"],
  },
];

export default function AgentBattlePage() {
  const [config, setConfig] = useState<Partial<BattleConfig>>({
    topic: "",
    rounds: 3,
    judgeCriteria: ["accuracy", "clarity", "practicality"],
    agentA: { model: "gpt-5", name: "Agent Alpha", style: "analytical" },
    agentB: { model: "claude-3-opus", name: "Agent Beta", style: "pragmatic" },
    judgeModel: "gpt-5",
  });

  const [battle, setBattle] = useState<BattleState | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [showExport, setShowExport] = useState(false);
  const [email, setEmail] = useState("");

  const handlePresetSelect = (presetId: string) => {
    const preset = BATTLE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setConfig(prev => ({
        ...prev,
        topic: preset.topic,
        judgeCriteria: preset.criteria as ("accuracy" | "cost" | "latency" | "clarity" | "creativity" | "practicality")[],
      }));
      setSelectedPreset(presetId);
    }
  };

  const startBattle = async () => {
    try {
      const validatedConfig = BattleConfigSchema.parse(config);
      setIsRunning(true);
      setCurrentRound(1);
      
      // In real implementation, this would stream updates
      const result = await runBattle(validatedConfig);
      setBattle(result);
      setIsRunning(false);
    } catch (error) {
      console.error("Battle failed:", error);
      setIsRunning(false);
    }
  };

  const resetBattle = () => {
    setBattle(null);
    setCurrentRound(0);
    setIsRunning(false);
  };

  return (
    <LabLayout
      title="Agent Battle"
      description="Watch AI agents debate and compete"
      category="agents"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            <Swords className="w-3 h-3 mr-1" />
            AI vs AI Competition
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Agent <span className="gradient-text">Battle</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Two specialized agents square off. A neutral moderator scores them on accuracy, 
            cost, latency, and clarity—then explains exactly why one won.
          </p>
        </div>

        {!battle ? (
          <div className="space-y-6">
            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Configure Battle
                </CardTitle>
                <CardDescription>
                  Choose a preset or create your own battle scenario
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Presets */}
                <div>
                  <Label>Quick Start Presets</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {BATTLE_PRESETS.map(preset => (
                      <Button
                        key={preset.id}
                        variant={selectedPreset === preset.id ? "default" : "outline"}
                        onClick={() => handlePresetSelect(preset.id)}
                        className="text-sm"
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Topic */}
                <div>
                  <Label htmlFor="topic">Battle Topic</Label>
                  <Textarea
                    id="topic"
                    placeholder="What should the agents debate? (e.g., 'What's the best database for a startup?')"
                    value={config.topic}
                    onChange={(e) => setConfig(prev => ({ ...prev, topic: e.target.value }))}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                {/* Agent Configuration */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Agent Alpha
                    </h4>
                    <div>
                      <Label>Model</Label>
                      <Select
                        value={config.agentA?.model}
                        onValueChange={(value) => 
                          setConfig(prev => ({ 
                            ...prev, 
                            agentA: { ...prev.agentA!, model: value as "gpt-5" | "gpt-5-mini" | "claude-3-opus" | "claude-3-sonnet" }
                          }))
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-5">GPT-5</SelectItem>
                          <SelectItem value="gpt-5-mini">GPT-5 Mini</SelectItem>
                          <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                          <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Style</Label>
                      <Select
                        value={config.agentA?.style}
                        onValueChange={(value) => 
                          setConfig(prev => ({ 
                            ...prev, 
                            agentA: { ...prev.agentA!, style: value as "analytical" | "creative" | "pragmatic" | "theoretical" }
                          }))
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analytical">Analytical</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="pragmatic">Pragmatic</SelectItem>
                          <SelectItem value="theoretical">Theoretical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Agent Beta
                    </h4>
                    <div>
                      <Label>Model</Label>
                      <Select
                        value={config.agentB?.model}
                        onValueChange={(value) => 
                          setConfig(prev => ({ 
                            ...prev, 
                            agentB: { ...prev.agentB!, model: value as "gpt-5" | "gpt-5-mini" | "claude-3-opus" | "claude-3-sonnet" }
                          }))
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-5">GPT-5</SelectItem>
                          <SelectItem value="gpt-5-mini">GPT-5 Mini</SelectItem>
                          <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                          <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Style</Label>
                      <Select
                        value={config.agentB?.style}
                        onValueChange={(value) => 
                          setConfig(prev => ({ 
                            ...prev, 
                            agentB: { ...prev.agentB!, style: value as "analytical" | "creative" | "pragmatic" | "theoretical" }
                          }))
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analytical">Analytical</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="pragmatic">Pragmatic</SelectItem>
                          <SelectItem value="theoretical">Theoretical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Judge Criteria */}
                <div>
                  <Label>Scoring Criteria</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["accuracy", "cost", "latency", "clarity", "creativity", "practicality"].map(criterion => (
                      <Button
                        key={criterion}
                        variant={config.judgeCriteria?.includes(criterion as "accuracy" | "cost" | "latency" | "clarity" | "creativity" | "practicality") ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          const current = config.judgeCriteria || [];
                          if (current.includes(criterion as "accuracy" | "cost" | "latency" | "clarity" | "creativity" | "practicality")) {
                            setConfig(prev => ({
                              ...prev,
                              judgeCriteria: current.filter(c => c !== criterion) as ("accuracy" | "cost" | "latency" | "clarity" | "creativity" | "practicality")[]
                            }));
                          } else {
                            setConfig(prev => ({
                              ...prev,
                              judgeCriteria: [...current, criterion as "accuracy" | "cost" | "latency" | "clarity" | "creativity" | "practicality"] as ("accuracy" | "cost" | "latency" | "clarity" | "creativity" | "practicality")[]
                            }));
                          }
                        }}
                      >
                        {criterion}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Start Button */}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={startBattle}
                  disabled={!config.topic || isRunning}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Battle
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Battle Arena */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-500/10 to-blue-500/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Battle in Progress</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={resetBattle}>
                      <RotateCcw className="w-4 h-4 mr-1" />
                      New Battle
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowExport(true)}>
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Round {currentRound} of {config.rounds}</span>
                    <span>{battle.status}</span>
                  </div>
                  <Progress value={(currentRound / (config.rounds || 3)) * 100} />
                </div>

                {/* Battle Rounds */}
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    {battle.rounds.map((round, idx) => (
                      <motion.div
                        key={round.number}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <Badge>Round {round.number}</Badge>
                          {round.roundVerdict && (
                            <Badge variant={
                              round.roundVerdict.winner === "agentA" ? "destructive" :
                              round.roundVerdict.winner === "agentB" ? "default" : "secondary"
                            }>
                              {round.roundVerdict.winner === "tie" ? "Tie" : 
                               `${round.roundVerdict.winner === "agentA" ? config.agentA?.name : config.agentB?.name} Wins`}
                            </Badge>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Agent A Response */}
                          <Card className={cn(
                            "border-2",
                            round.roundVerdict?.winner === "agentA" && "border-red-500/50"
                          )}>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                  <User className="w-4 h-4 text-red-500" />
                                </div>
                                {config.agentA?.name}
                                <Badge variant="outline" className="ml-auto text-xs">
                                  {config.agentA?.model}
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm leading-relaxed">{round.agentAResponse}</p>
                              {round.roundVerdict && (
                                <div className="mt-4 pt-4 border-t">
                                  <div className="flex flex-wrap gap-2">
                                    {Object.entries(round.roundVerdict.scores.agentA).map(([criterion, score]) => (
                                      <div key={criterion} className="flex items-center gap-1">
                                        <span className="text-xs text-muted-foreground">{criterion}:</span>
                                        <Badge variant="secondary" className="text-xs">
                                          {score}/10
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>

                          {/* Agent B Response */}
                          <Card className={cn(
                            "border-2",
                            round.roundVerdict?.winner === "agentB" && "border-blue-500/50"
                          )}>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                  <User className="w-4 h-4 text-blue-500" />
                                </div>
                                {config.agentB?.name}
                                <Badge variant="outline" className="ml-auto text-xs">
                                  {config.agentB?.model}
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm leading-relaxed">{round.agentBResponse}</p>
                              {round.roundVerdict && (
                                <div className="mt-4 pt-4 border-t">
                                  <div className="flex flex-wrap gap-2">
                                    {Object.entries(round.roundVerdict.scores.agentB).map(([criterion, score]) => (
                                      <div key={criterion} className="flex items-center gap-1">
                                        <span className="text-xs text-muted-foreground">{criterion}:</span>
                                        <Badge variant="secondary" className="text-xs">
                                          {score}/10
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>

                        {/* Round Verdict */}
                        {round.roundVerdict && (
                          <Card className="bg-muted/50">
                            <CardContent className="pt-4">
                              <p className="text-sm text-muted-foreground flex items-start gap-2">
                                <Brain className="w-4 h-4 mt-0.5" />
                                <span>{round.roundVerdict.rationale}</span>
                              </p>
                            </CardContent>
                          </Card>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Final Verdict */}
                {battle.finalVerdict && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8"
                  >
                    <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                          <Trophy className="w-6 h-6 text-yellow-500" />
                          Final Verdict
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <Badge className="text-lg px-4 py-2">
                            {battle.finalVerdict.overallWinner === "tie" ? 
                              "It's a Tie!" : 
                              `${battle.finalVerdict.overallWinner === "agentA" ? 
                                config.agentA?.name : config.agentB?.name} Wins!`}
                          </Badge>
                        </div>

                        <p className="text-base leading-relaxed">
                          {battle.finalVerdict.summary}
                        </p>

                        <div>
                          <h4 className="font-semibold mb-2">Key Moments:</h4>
                          <ul className="space-y-1">
                            {battle.finalVerdict.keyMoments.map((moment, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5" />
                                {moment}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Implementation Insights:</h4>
                          <ul className="space-y-1">
                            {battle.finalVerdict.recommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <Zap className="w-4 h-4 text-brand mt-0.5" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                          <div>
                            <div className="text-2xl font-bold">
                              {battle.metrics.agentA.totalTokens + battle.metrics.agentB.totalTokens}
                            </div>
                            <div className="text-xs text-muted-foreground">Total Tokens</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">
                              ${(battle.metrics.agentA.estimatedCost + battle.metrics.agentB.estimatedCost).toFixed(3)}
                            </div>
                            <div className="text-xs text-muted-foreground">Total Cost</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">
                              {Math.round((battle.metrics.agentA.avgLatency + battle.metrics.agentB.avgLatency) / 2)}ms
                            </div>
                            <div className="text-xs text-muted-foreground">Avg Latency</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">
                              {Math.round(battle.metrics.duration / 1000)}s
                            </div>
                            <div className="text-xs text-muted-foreground">Duration</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Export Modal */}
        <AnimatePresence>
          {showExport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowExport(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card rounded-lg p-6 max-w-md w-full"
              >
                <h3 className="text-lg font-semibold mb-4">Export Battle Results</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your email to download the complete battle transcript and analysis.
                </p>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4"
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowExport(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    // Handle export
                    console.log("Exporting for:", email);
                    setShowExport(false);
                  }}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LabLayout>
  );
}