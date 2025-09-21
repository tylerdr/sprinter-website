"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Point {
  x: number;
  y: number;
  opacity: number;
}

export default function PaintCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });
  const points = useRef<Point[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (isDrawing.current) {
        points.current.push({
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
        });

        // Limit points array size
        if (points.current.length > 100) {
          points.current.shift();
        }
      }
    };

    // Mouse down/up handlers
    const handleMouseDown = () => {
      isDrawing.current = true;
      points.current = [];
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fade out points
      points.current = points.current
        .map((point) => ({
          ...point,
          opacity: point.opacity * 0.98,
        }))
        .filter((point) => point.opacity > 0.01);

      // Draw paint trail
      if (points.current.length > 1) {
        ctx.strokeStyle = `rgba(59, 130, 246, 0.8)`; // Blue color
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < points.current.length; i++) {
          const prev = points.current[i - 1];
          const curr = points.current[i];

          ctx.beginPath();
          ctx.globalAlpha = curr.opacity;
          ctx.lineWidth = 20 * curr.opacity + 2;

          // Create gradient effect
          const gradient = ctx.createLinearGradient(
            prev.x, prev.y, curr.x, curr.y
          );
          gradient.addColorStop(0, `rgba(59, 130, 246, ${prev.opacity})`);
          gradient.addColorStop(1, `rgba(147, 51, 234, ${curr.opacity})`);
          ctx.strokeStyle = gradient;

          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-30"
        style={{ mixBlendMode: "screen" }}
      />
      <motion.div
        className="pointer-events-none fixed z-40 w-6 h-6 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: springX,
          top: springY,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur-sm" />
      </motion.div>
    </>
  );
}