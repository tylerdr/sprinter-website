"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Download,
  Volume2,
  RotateCcw,
  Music,
  Sparkles,
  Clock,
  HeadphonesIcon,
} from "lucide-react";

const presetStyles = [
  {
    name: "Lo-fi Hip Hop",
    prompt: "Relaxing lo-fi hip hop beat with vinyl crackle, smooth jazz samples, and mellow drums",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Cinematic",
    prompt: "Epic orchestral cinematic score with sweeping strings, powerful brass, and dramatic percussion",
    color: "from-blue-500 to-purple-500"
  },
  {
    name: "Electronic",
    prompt: "Upbeat electronic dance music with synthesizers, driving bassline, and energetic beats",
    color: "from-green-500 to-blue-500"
  },
  {
    name: "Jazz",
    prompt: "Smooth jazz with saxophone, piano, upright bass, and brushed drums",
    color: "from-yellow-500 to-orange-500"
  },
  {
    name: "Ambient",
    prompt: "Ethereal ambient soundscape with atmospheric pads, subtle textures, and gentle melodies",
    color: "from-indigo-500 to-purple-500"
  }
];

const durations = [
  { label: "15 seconds", value: 15 },
  { label: "30 seconds", value: 30 },
  { label: "60 seconds", value: 60 }
];

// Mock audio samples that correspond to different styles
const mockSamples = [
  {
    style: "Lo-fi Hip Hop",
    url: "data:audio/wav;base64,", // We'll use Web Audio API to generate tones
    bpm: 85,
    key: "C minor",
    instruments: ["Piano", "Drums", "Vinyl", "Bass"]
  },
  {
    style: "Cinematic",
    url: "data:audio/wav;base64,",
    bpm: 120,
    key: "D minor",
    instruments: ["Strings", "Brass", "Percussion", "Choir"]
  },
  {
    style: "Electronic",
    url: "data:audio/wav;base64,",
    bpm: 128,
    key: "A minor",
    instruments: ["Synth Lead", "Bass Synth", "Drums", "Arp"]
  },
  {
    style: "Jazz",
    url: "data:audio/wav;base64,",
    bpm: 110,
    key: "F major",
    instruments: ["Saxophone", "Piano", "Upright Bass", "Drums"]
  },
  {
    style: "Ambient",
    url: "data:audio/wav;base64,",
    bpm: 60,
    key: "E minor",
    instruments: ["Pad", "Strings", "Reverb", "Texture"]
  }
];

export default function MusicStudio() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [duration, setDuration] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedTrack, setGeneratedTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.warn('Web Audio API not supported:', error);
      }
    }
  }, []);

  // Create mock audio buffer for visualization
  const createMockAudioBuffer = (style: string, duration: number) => {
    if (!audioContextRef.current) return null;
    
    const sampleRate = audioContextRef.current.sampleRate;
    const length = sampleRate * duration;
    const buffer = audioContextRef.current.createBuffer(2, length, sampleRate);
    
    // Generate different waveforms based on style
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        let sample = 0;
        
        switch (style) {
          case "Lo-fi Hip Hop":
            sample = Math.sin(220 * 2 * Math.PI * time) * 0.3 + 
                    Math.sin(440 * 2 * Math.PI * time) * 0.2 +
                    (Math.random() - 0.5) * 0.1; // Add noise
            break;
          case "Electronic":
            sample = Math.sin(330 * 2 * Math.PI * time) * 0.4 +
                    Math.sin(660 * 2 * Math.PI * time * Math.sin(2 * Math.PI * time)) * 0.3;
            break;
          case "Cinematic":
            sample = Math.sin(165 * 2 * Math.PI * time) * 0.3 +
                    Math.sin(220 * 2 * Math.PI * time) * 0.2 +
                    Math.sin(330 * 2 * Math.PI * time) * 0.1;
            break;
          case "Jazz":
            sample = Math.sin(196 * 2 * Math.PI * time) * 0.4 +
                    Math.sin(294 * 2 * Math.PI * time) * 0.3;
            break;
          case "Ambient":
            sample = Math.sin(110 * 2 * Math.PI * time) * 0.2 +
                    Math.sin(165 * 2 * Math.PI * time) * 0.1 +
                    Math.sin(220 * 2 * Math.PI * time) * 0.1;
            break;
          default:
            sample = Math.sin(440 * 2 * Math.PI * time) * 0.3;
        }
        
        channelData[i] = sample * Math.exp(-time * 0.5); // Fade out
      }
    }
    
    return buffer;
  };

  // Waveform visualization
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    
    if (!canvas || !analyser) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    analyser.getByteTimeDomainData(dataArray);
    
    ctx.fillStyle = 'rgb(15, 15, 15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(59, 130, 246)';
    ctx.beginPath();
    
    const sliceWidth = canvas.width * 1.0 / bufferLength;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    ctx.stroke();
    
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(drawWaveform);
    }
  };

  const handleStyleSelect = (style: any) => {
    setSelectedStyle(style.name);
    setPrompt(style.prompt);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    // Simulate generation time
    setTimeout(() => {
      clearInterval(progressInterval);
      setGenerationProgress(100);
      
      // Create mock generated track
      const style = selectedStyle || "Electronic";
      const mockTrack = mockSamples.find(s => s.style === style) || mockSamples[2];
      
      setGeneratedTrack({
        ...mockTrack,
        title: `AI Generated - ${style}`,
        duration: duration,
        prompt: prompt,
        generatedAt: new Date().toISOString()
      });
      
      setIsGenerating(false);
      setGenerationProgress(0);
    }, 3000);
  };

  const togglePlayback = () => {
    if (!audioContextRef.current || !generatedTrack) return;
    
    if (isPlaying) {
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      // Create and play mock audio
      const style = generatedTrack.style;
      const buffer = createMockAudioBuffer(style, duration);
      
      if (buffer && audioContextRef.current) {
        const source = audioContextRef.current.createBufferSource();
        const gainNode = audioContextRef.current.createGain();
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        source.buffer = buffer;
        gainNode.gain.value = volume;
        
        source.connect(gainNode);
        gainNode.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        
        source.start(0);
        setIsPlaying(true);
        drawWaveform();
        
        source.onended = () => {
          setIsPlaying(false);
          setCurrentTime(0);
        };
        
        // Simulate time progress
        const startTime = audioContextRef.current.currentTime;
        let timeUpdateId: number;
        const updateTime = () => {
          if (audioContextRef.current) {
            const elapsed = audioContextRef.current.currentTime - startTime;
            setCurrentTime(Math.min(elapsed, duration));
            if (elapsed < duration && isPlaying) {
              timeUpdateId = requestAnimationFrame(updateTime);
            }
          }
        };
        updateTime();
      }
    }
  };

  const handleDownload = () => {
    // Create a mock download
    const element = document.createElement('a');
    const file = new Blob(['Mock audio file content'], { type: 'audio/wav' });
    element.href = URL.createObjectURL(file);
    element.download = `${generatedTrack.title.replace(/\s+/g, '_')}.wav`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Prompt Input */}
      <div className="space-y-4">
        <label className="block text-sm font-medium">
          Describe your music
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Upbeat electronic dance music with synthesizers and driving bassline for a workout playlist..."
          className="w-full h-32 px-4 py-3 rounded-xl bg-card/10 border border-border/20 focus:border-primary/50 focus:outline-none resize-none"
        />
      </div>

      {/* Preset Styles */}
      <div className="space-y-4">
        <label className="block text-sm font-medium">
          Or choose a preset style
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {presetStyles.map((style) => (
            <button
              key={style.name}
              onClick={() => handleStyleSelect(style)}
              className={`p-4 rounded-xl border transition-all ${
                selectedStyle === style.name
                  ? 'border-primary bg-primary/10'
                  : 'border-border/20 bg-card/5 hover:bg-card/10'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${style.color} mb-2 mx-auto`} />
              <div className="text-sm font-medium">{style.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Duration Selector */}
      <div className="space-y-4">
        <label className="block text-sm font-medium">
          Duration
        </label>
        <div className="flex gap-3">
          {durations.map((d) => (
            <button
              key={d.value}
              onClick={() => setDuration(d.value)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                duration === d.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border/20 bg-card/5 hover:bg-card/10'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-primary/90 hover:to-purple-600/90 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isGenerating ? (
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 animate-spin" />
            Generating... {Math.round(generationProgress)}%
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <Music className="w-5 h-5" />
            Generate Music
          </div>
        )}
      </motion.button>

      {/* Generation Progress */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="w-full bg-card/10 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-primary to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${generationProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              AI is composing your track...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Track */}
      <AnimatePresence>
        {generatedTrack && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-card/10 border border-border/20 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{generatedTrack.title}</h3>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            {/* Waveform Visualization */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={800}
                height={200}
                className="w-full h-32 rounded-lg bg-black/20"
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <HeadphonesIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Audio Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlayback}
                  className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/90 rounded-full transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="w-full bg-card/20 rounded-full h-1">
                    <div
                      className="h-1 bg-primary rounded-full transition-all"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            {/* Track Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/20">
              <div>
                <div className="text-sm text-muted-foreground">BPM</div>
                <div className="font-medium">{generatedTrack.bpm}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Key</div>
                <div className="font-medium">{generatedTrack.key}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm text-muted-foreground">Instruments</div>
                <div className="font-medium">{generatedTrack.instruments.join(', ')}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}