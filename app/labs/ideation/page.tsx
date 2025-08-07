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

export default function IdeationLabPage() {
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

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <Gamepad2 className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">Creative AI Games</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ideation <span className="gradient-text">Lab</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Play creative AI games to spark innovation and test your entrepreneurial thinking
          </p>
        </motion.div>

        {!gameMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <button
              onClick={() => setGameMode("brainstorm")}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group"
            >
              <Lightbulb className="w-8 h-8 text-yellow-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">AI Brainstorm</h3>
              <p className="text-gray-400 text-sm">
                Generate startup ideas with AI and explore innovative concepts
              </p>
            </button>

            <button
              onClick={() => setGameMode("scoring")}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group"
            >
              <TrendingUp className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Idea Scorer</h3>
              <p className="text-gray-400 text-sm">
                Get AI feedback on your ideas with scores and suggestions
              </p>
            </button>

            <button
              onClick={() => setGameMode("race")}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group"
            >
              <Trophy className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Idea Race</h3>
              <p className="text-gray-400 text-sm">
                Pit ideas against each other in an AI-judged tournament
              </p>
            </button>

            <button
              onClick={() => setGameMode("scattergories")}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group"
            >
              <Timer className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Startup Scattergories</h3>
              <p className="text-gray-400 text-sm">
                Race against AI to create ideas under quirky constraints
              </p>
            </button>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {gameMode === "brainstorm" && (
            <motion.div
              key="brainstorm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4">AI Brainstorm Generator</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Theme or Problem</label>
                  <input
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="e.g., sustainable energy, remote education"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={generateIdeas}
                  disabled={isGenerating || !theme.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 mb-6"
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
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4">Idea Scorer</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Your Idea</label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Describe your startup or product idea..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:outline-none h-32 resize-none"
                  />
                </div>

                <button
                  onClick={() => scoreIdea(userInput)}
                  disabled={isGenerating || !userInput.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 mb-6"
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
                      <div className="text-sm text-gray-400">Overall Score</div>
                    </div>
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-sans">
                      {ideas[0].feedback}
                    </pre>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {gameMode === "race" && (
            <motion.div
              key="race"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4">Idea Race Tournament</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Enter 2-4 Ideas to Race</label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter each idea on a new line..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-purple-500 focus:outline-none h-32 resize-none"
                  />
                </div>

                <button
                  onClick={() => {
                    const ideaList = userInput.split('\n').filter(i => i.trim())
                    setIdeas(ideaList.map((text, i) => ({ id: i.toString(), text })))
                    if (ideaList.length >= 2) runIdeaRace()
                  }}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 mb-6"
                >
                  {isGenerating ? (
                    <>
                      <Trophy className="w-5 h-5 animate-pulse" />
                      Racing...
                    </>
                  ) : (
                    <>
                      <Trophy className="w-5 h-5" />
                      Start Race
                    </>
                  )}
                </button>

                {isGenerating && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-200" />
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-400" />
                    </div>
                    <p className="mt-4 text-gray-400">AI judges evaluating ideas...</p>
                  </div>
                )}

                {raceWinner && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-center"
                  >
                    <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">Winner!</h3>
                    <p className="text-gray-300">{raceWinner}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Judged on: Innovation, Feasibility, Market Potential
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {gameMode === "scattergories" && (
            <motion.div
              key="scattergories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4">Startup Scattergories</h2>
                
                {!scattergoriesPrompt ? (
                  <button
                    onClick={playScattergories}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-lg hover:opacity-90 mx-auto"
                  >
                    <Timer className="w-5 h-5" />
                    Start Game
                  </button>
                ) : (
                  <>
                    <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/30">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Create a startup idea:</p>
                          <p className="text-lg font-medium">
                            {scattergoriesPrompt.category}
                            {scattergoriesPrompt.letter && (
                              <span className="ml-2 text-green-400">
                                (Must start with "{scattergoriesPrompt.letter}")
                              </span>
                            )}
                          </p>
                        </div>
                        {timeLeft > 0 && (
                          <div className="text-2xl font-mono font-bold text-green-400">
                            {timeLeft}s
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type your idea..."
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-green-500 focus:outline-none"
                        disabled={timeLeft === 0}
                      />
                    </div>

                    {timeLeft === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                          <p className="text-sm text-gray-400 mb-1">Your answer:</p>
                          <p className="font-medium">{userInput || "No answer provided"}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
                          <p className="text-sm text-blue-400 mb-1">AI's answer:</p>
                          <p className="font-medium">{aiAnswer}</p>
                        </div>
                        <button
                          onClick={playScattergories}
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Play Again
                        </button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {gameMode && (
          <div className="text-center mt-6">
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Back to Games
            </button>
          </div>
        )}
      </div>
    </div>
  )
}