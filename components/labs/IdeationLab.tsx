"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, Zap, Trophy, RefreshCw, Timer, Sparkles, TrendingUp, Gamepad2 } from "lucide-react"

type GameMode = "brainstorm" | "race" | "scattergories" | "scoring" | null

interface Idea {
  id: string
  text: string
  score?: number
  feedback?: string
}

const categories = [
  "AI for Healthcare",
  "Sustainable Tech",
  "EdTech Innovation",
  "FinTech Disruption",
  "Future of Work",
  "Smart Cities",
]

const scattergoriesPrompts = [
  { category: "Business idea involving 🐠 and VR", letter: null },
  { category: "Health startup", letter: "M" },
  { category: "AI tool for creators", letter: "S" },
  { category: "Eco-friendly product", letter: "G" },
]

export default function IdeationLab() {
  const [gameMode, setGameMode] = useState<GameMode>(null)
  const [theme, setTheme] = useState("")
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [userInput, setUserInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [raceWinner, setRaceWinner] = useState<string | null>(null)
  const [scattergoriesPrompt, setScattergoriesPrompt] = useState<typeof scattergoriesPrompts[0] | null>(null)
  const [aiAnswer, setAiAnswer] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)

  const generateIdeas = async () => {
    if (!theme.trim()) return
    
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const mockIdeas = [
      `AI-powered ${theme} assistant that learns from user behavior`,
      `Blockchain-based ${theme} verification system`,
      `AR/VR training platform for ${theme} professionals`,
      `Sustainable ${theme} marketplace with carbon tracking`,
      `Automated ${theme} workflow optimizer using ML`,
    ]
    
    setIdeas(mockIdeas.map((text, i) => ({
      id: i.toString(),
      text,
    })))
    setIsGenerating(false)
  }

  const scoreIdea = async (ideaText: string) => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const scores = {
      originality: Math.floor(Math.random() * 3) + 7,
      feasibility: Math.floor(Math.random() * 3) + 6,
      impact: Math.floor(Math.random() * 3) + 7,
    }
    
    const feedback = `Originality: ${scores.originality}/10 - Unique approach to the problem.
Feasibility: ${scores.feasibility}/10 - Technically achievable with current technology.
Impact: ${scores.impact}/10 - Could significantly improve the target market.

Suggestion: Consider adding a social component to increase viral growth potential.`
    
    setIdeas([{
      id: "1",
      text: ideaText,
      score: Math.round((scores.originality + scores.feasibility + scores.impact) / 3),
      feedback,
    }])
    setIsGenerating(false)
  }

  const runIdeaRace = async () => {
    if (ideas.length < 2) return
    
    setIsGenerating(true)
    setRaceWinner(null)
    
    for (let round = 0; round < 3; round++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    const winner = ideas[Math.floor(Math.random() * ideas.length)]
    setRaceWinner(winner.text)
    setIsGenerating(false)
  }

  const playScattergories = async () => {
    const prompt = scattergoriesPrompts[Math.floor(Math.random() * scattergoriesPrompts.length)]
    setScattergoriesPrompt(prompt)
    setAiAnswer("")
    setUserInput("")
    setTimeLeft(30)
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          revealAiAnswer()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    const revealAiAnswer = () => {
      const aiAnswers = [
        "VirtualFish: VR aquarium therapy platform",
        "MediMind: Mental health monitoring app",
        "SketchAI: Smart drawing assistant",
        "GreenGrow: Gamified gardening system",
      ]
      setAiAnswer(aiAnswers[Math.floor(Math.random() * aiAnswers.length)])
    }
  }

  const resetGame = () => {
    setGameMode(null)
    setTheme("")
    setIdeas([])
    setUserInput("")
    setRaceWinner(null)
    setScattergoriesPrompt(null)
    setAiAnswer("")
    setTimeLeft(0)
  }

  if (!gameMode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        <button
          onClick={() => setGameMode("brainstorm")}
          className="p-6 rounded-xl bg-card/5 border border-border/10 hover:bg-card/10 transition-all text-left group"
        >
          <Lightbulb className="w-8 h-8 text-yellow-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2">AI Brainstorm</h3>
          <p className="text-muted-foreground text-sm">
            Generate startup ideas with AI and explore innovative concepts
          </p>
        </button>

        <button
          onClick={() => setGameMode("scoring")}
          className="p-6 rounded-xl bg-card/5 border border-border/10 hover:bg-card/10 transition-all text-left group"
        >
          <TrendingUp className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Idea Scorer</h3>
          <p className="text-muted-foreground text-sm">
            Get AI feedback on your ideas with scores and suggestions
          </p>
        </button>

        <button
          onClick={() => setGameMode("race")}
          className="p-6 rounded-xl bg-card/5 border border-border/10 hover:bg-card/10 transition-all text-left group"
        >
          <Trophy className="w-8 h-8 text-purple-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Idea Race</h3>
          <p className="text-muted-foreground text-sm">
            Pit ideas against each other in an AI-judged tournament
          </p>
        </button>

        <button
          onClick={() => setGameMode("scattergories")}
          className="p-6 rounded-xl bg-card/5 border border-border/10 hover:bg-card/10 transition-all text-left group"
        >
          <Timer className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Startup Scattergories</h3>
          <p className="text-muted-foreground text-sm">
            Race against AI to create ideas under quirky constraints
          </p>
        </button>
      </motion.div>
    )
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {gameMode === "brainstorm" && (
          <motion.div
            key="brainstorm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">AI Brainstorm Generator</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Theme or Problem</label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="e.g., sustainable energy, remote education"
                  className="w-full px-4 py-3 rounded-lg bg-card/10 border border-border/20 focus:border-yellow-500 focus:outline-none"
                />
              </div>

              <button
                onClick={generateIdeas}
                disabled={isGenerating || !theme.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-primary-foreground font-medium rounded-lg hover:opacity-90 disabled:opacity-50 mb-6"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-5 h-5" />
                    Generate Ideas
                  </>
                )}
              </button>

              {ideas.length > 0 && (
                <div className="space-y-3">
                  {ideas.map((idea, index) => (
                    <motion.div
                      key={idea.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">💡</span>
                        <p className="flex-1">{idea.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {gameMode === "scoring" && (
          <motion.div
            key="scoring"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-6 rounded-xl bg-card/5 border border-border/10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Idea Scorer</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Your Idea</label>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe your startup or product idea..."
                  className="w-full px-4 py-3 rounded-lg bg-card/10 border border-border/20 focus:border-blue-500 focus:outline-none h-32 resize-none"
                />
              </div>

              <button
                onClick={() => scoreIdea(userInput)}
                disabled={isGenerating || !userInput.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-primary-foreground font-medium rounded-lg hover:opacity-90 disabled:opacity-50 mb-6"
              >
                {isGenerating ? (
                  <>
                    <TrendingUp className="w-5 h-5 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Score My Idea
                  </>
                )}
              </button>

              {ideas.length > 0 && ideas[0].feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl font-bold gradient-text">
                      {ideas[0].score}/10
                    </div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-foreground/80 font-sans">
                    {ideas[0].feedback}
                  </pre>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {gameMode && (
        <div className="text-center mt-6">
          <button
            onClick={resetGame}
            className="inline-flex items-center gap-2 px-4 py-2 bg-card/10 text-foreground font-medium rounded-lg hover:bg-card/20 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Back to Games
          </button>
        </div>
      )}
    </>
  )
}