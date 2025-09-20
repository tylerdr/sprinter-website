"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create mesh gradient animation
    const animate = () => {
      time += 0.001;

      // Create gradient mesh
      const gradient1 = ctx.createRadialGradient(
        canvas.width * (0.3 + Math.sin(time) * 0.1),
        canvas.height * (0.3 + Math.cos(time) * 0.1),
        0,
        canvas.width * (0.3 + Math.sin(time) * 0.1),
        canvas.height * (0.3 + Math.cos(time) * 0.1),
        canvas.width * 0.5
      );
      gradient1.addColorStop(0, "rgba(59, 130, 246, 0.4)"); // blue
      gradient1.addColorStop(0.5, "rgba(147, 51, 234, 0.3)"); // purple
      gradient1.addColorStop(1, "rgba(59, 130, 246, 0)");

      const gradient2 = ctx.createRadialGradient(
        canvas.width * (0.7 + Math.cos(time * 1.2) * 0.1),
        canvas.height * (0.6 + Math.sin(time * 1.2) * 0.1),
        0,
        canvas.width * (0.7 + Math.cos(time * 1.2) * 0.1),
        canvas.height * (0.6 + Math.sin(time * 1.2) * 0.1),
        canvas.width * 0.4
      );
      gradient2.addColorStop(0, "rgba(236, 72, 153, 0.4)"); // pink
      gradient2.addColorStop(0.5, "rgba(168, 85, 247, 0.3)"); // purple
      gradient2.addColorStop(1, "rgba(236, 72, 153, 0)");

      const gradient3 = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time * 0.8) * 0.15),
        canvas.height * (0.8 + Math.cos(time * 0.8) * 0.1),
        0,
        canvas.width * (0.5 + Math.sin(time * 0.8) * 0.15),
        canvas.height * (0.8 + Math.cos(time * 0.8) * 0.1),
        canvas.width * 0.3
      );
      gradient3.addColorStop(0, "rgba(34, 211, 238, 0.4)"); // cyan
      gradient3.addColorStop(0.5, "rgba(59, 130, 246, 0.3)"); // blue
      gradient3.addColorStop(1, "rgba(34, 211, 238, 0)");

      // Clear and draw
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Canvas for smooth gradient animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30 dark:opacity-20"
        aria-hidden="true"
      />

      {/* CSS Animated Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />

        {/* Animated gradient blobs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-0 -left-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 5,
          }}
          className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <motion.div
          animate={{
            x: [0, 75, -75, 0],
            y: [0, -75, 75, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]"
          style={{
            background: "conic-gradient(from 0deg, rgba(34, 211, 238, 0.2), rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.3), rgba(34, 211, 238, 0.2))",
            filter: "blur(100px)",
          }}
        />

        {/* Additional floating orbs */}
        <motion.div
          animate={{
            x: [0, 200, 100, 0],
            y: [0, 100, 200, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
    </>
  );
}