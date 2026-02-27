"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PremiumCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  intensity?: number;
  children?: ReactNode;
}

export default function PremiumCard({
  className,
  children,
  intensity = 7,
  onMouseMove,
  onMouseLeave,
  style,
  ...props
}: PremiumCardProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useTransform(pointerY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-intensity, intensity]);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 220,
    damping: 22,
    mass: 0.38,
  });
  const smoothRotateY = useSpring(rotateY, {
    stiffness: 220,
    damping: 22,
    mass: 0.38,
  });

  return (
    <motion.div
      className={cn("spr-card spr-premium-card", className)}
      onMouseMove={(event) => {
        if (!reduceMotion) {
          const rect = event.currentTarget.getBoundingClientRect();
          const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
          const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
          pointerX.set(normalizedX);
          pointerY.set(normalizedY);
        }
        onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        pointerX.set(0);
        pointerY.set(0);
        onMouseLeave?.(event);
      }}
      style={
        reduceMotion
          ? style
          : {
              ...style,
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              transformPerspective: 1100,
              transformStyle: "preserve-3d",
            }
      }
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 190, damping: 22, mass: 0.45 }}
      {...props}
    >
      <span aria-hidden className="spr-premium-card-glow" />
      <div className="spr-premium-card-content">{children}</div>
    </motion.div>
  );
}
