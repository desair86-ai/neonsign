"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
  blur?: number;
  intensity?: number;
}

// Custom Neon Stack Brand Colors for Aurora
const DEFAULT_COLORS = [
  "var(--aurora-color-1, rgba(110, 255, 134, 0.15))", // Brand Green (#6eff86)
  "var(--aurora-color-2, rgba(117, 46, 255, 0.12))", // Brand Purple (#752eff)
  "var(--aurora-color-3, rgba(10, 5, 20, 0.4))",      // Deep background navy/plum
  "var(--aurora-color-4, rgba(117, 46, 255, 0.08))", // Softer Purple
  "var(--aurora-color-5, rgba(110, 255, 134, 0.1))",  // Softer Green
];

interface BlobConfig {
  color: string;
  size: string;
  initialX: string;
  initialY: string;
  xKeyframes: string[];
  yKeyframes: string[];
  scaleKeyframes: number[];
  duration: number;
}

function generateBlobs(colors: string[], speed: number): BlobConfig[] {
  return [
    {
      color: colors[0] || DEFAULT_COLORS[0],
      size: "60%",
      initialX: "10%",
      initialY: "-20%",
      xKeyframes: ["10%", "50%", "30%", "70%", "10%"],
      yKeyframes: ["-20%", "10%", "40%", "-10%", "-20%"],
      scaleKeyframes: [1, 1.2, 0.9, 1.1, 1],
      duration: 20 / speed,
    },
    {
      color: colors[1] || DEFAULT_COLORS[1],
      size: "55%",
      initialX: "60%",
      initialY: "60%",
      xKeyframes: ["60%", "20%", "80%", "40%", "60%"],
      yKeyframes: ["60%", "20%", "50%", "80%", "60%"],
      scaleKeyframes: [1.1, 0.8, 1.3, 0.9, 1.1],
      duration: 25 / speed,
    },
    {
      color: colors[2] || DEFAULT_COLORS[2],
      size: "50%",
      initialX: "80%",
      initialY: "-10%",
      xKeyframes: ["80%", "30%", "60%", "10%", "80%"],
      yKeyframes: ["-10%", "30%", "70%", "40%", "-10%"],
      scaleKeyframes: [0.9, 1.3, 1, 1.2, 0.9],
      duration: 22 / speed,
    },
    {
      color: colors[3] || DEFAULT_COLORS[3],
      size: "45%",
      initialX: "30%",
      initialY: "70%",
      xKeyframes: ["30%", "70%", "10%", "50%", "30%"],
      yKeyframes: ["70%", "10%", "30%", "60%", "70%"],
      scaleKeyframes: [1, 1.1, 0.8, 1.2, 1],
      duration: 28 / speed,
    },
    {
      color: colors[4] || DEFAULT_COLORS[4],
      size: "65%",
      initialX: "50%",
      initialY: "30%",
      xKeyframes: ["50%", "10%", "70%", "30%", "50%"],
      yKeyframes: ["30%", "60%", "-10%", "50%", "30%"],
      scaleKeyframes: [1.2, 0.9, 1.1, 0.85, 1.2],
      duration: 18 / speed,
    },
  ];
}

export function AuroraBackground({
  children,
  className,
  colors = DEFAULT_COLORS,
  speed = 1,
  blur = 80,
  intensity = 1,
}: AuroraBackgroundProps) {
  const blobs = generateBlobs(colors, speed);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
      style={{ backgroundColor: "var(--aurora-bg, #000000)" }}
    >
      {/* Aurora layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              left: blob.initialX,
              top: blob.initialY,
              opacity: intensity,
              filter: `blur(${blur}px)`,
              willChange: "transform",
            }}
            animate={{
              left: blob.xKeyframes,
              top: blob.yKeyframes,
              scale: blob.scaleKeyframes,
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
