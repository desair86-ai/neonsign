"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export type GlowCardColorTheme = "green" | "purple" | "blue" | "orange" | "pink" | "red" | "yellow";

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  theme?: GlowCardColorTheme;
  borderSize?: number;
  continuous?: boolean;
  spotlightColor?: string;
}

const themeConfig: Record<GlowCardColorTheme, { base: number; spread: number; hex: string }> = {
  green: { base: 130, spread: 60, hex: "#6eff86" },
  purple: { base: 260, spread: 60, hex: "#752eff" },
  blue: { base: 195, spread: 60, hex: "#00e5ff" },
  orange: { base: 28, spread: 50, hex: "#fe8a2e" },
  pink: { base: 310, spread: 60, hex: "#f967fb" },
  red: { base: 350, spread: 50, hex: "#ff174f" },
  yellow: { base: 50, spread: 50, hex: "#ffe600" },
};

export function GlowCard({
  children,
  className,
  theme = "green",
  borderSize = 3,
  continuous = true,
  spotlightColor,
  style,
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Gentle cursor tracking for interior surface highlight ONLY when hovering
  // NO moving/traveling spotlights around the border! Border light stays ON continuously and steadily.
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    cardRef.current.style.setProperty("--x", x.toFixed(2));
    cardRef.current.style.setProperty("--y", y.toFixed(2));
  };

  const config = themeConfig[theme] || themeConfig.green;

  return (
    <div
      ref={cardRef}
      data-glow=""
      onPointerMove={handlePointerMove}
      style={{
        "--base": config.base,
        "--spread": config.spread,
        "--border": borderSize,
        "--border-size": `${borderSize}px`,
        "--hue": config.base,
        "--glow-opacity": 1, // Continuously visible 100% of the time!
        ...style,
      } as React.CSSProperties}
      className={cn(
        "relative rounded-2xl transition-all duration-300 isolate bg-zinc-950/90",
        className
      )}
      {...props}
    >
      {/* 
        Layer 3 (Outer Ambient Halo):
        Soft steady neon halo beyond the card's outer edges.
        Continuously active and glowing without moving!
      */}
      <div data-glow-halo="" />

      {/* 
        Layer 1 (Surface Spotlight):
        A soft ambient interior highlight over a translucent backdrop (backdrop-blur-[5px]).
      */}
      <div
        className="relative z-10 h-full w-full rounded-2xl overflow-hidden backdrop-blur-[5px] transition-all duration-300"
        style={{
          backgroundImage: `radial-gradient(
            380px circle at calc(var(--x, 150) * 1px) calc(var(--y, 150) * 1px),
            hsla(var(--hue, ${config.base}), 100%, 70%, 0.16) 0%,
            hsla(var(--hue, ${config.base}), 100%, 55%, 0.06) 40%,
            transparent 75%
          )`,
        }}
      >
        {children}
      </div>

      {/* 
        Layer 2 (Border Spotlight):
        [data-glow]::before pseudo-element is overlaid on the card border using a CSS mask,
        restricting the neon gradient strictly to the 3px border outline.
        Permanently lit ON continuously around the entire border without moving!
      */}
    </div>
  );
}

export { GlowCard as SpotlightCard };
