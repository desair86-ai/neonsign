"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonParticlesProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  href?: string;
  icon?: React.ReactNode;
}

export function ButtonParticles({
  label = "Explore",
  href,
  className,
  icon = <ArrowUpRight className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-[#6eff86]" />,
  ...props
}: ButtonParticlesProps) {
  // Generate random sparkles on client side to avoid hydration mismatch
  const [sparkles, setSparkles] = useState<Array<{ id: number; color: string; left: string; top: string; delay: string; duration: string; scale: number }>>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      color: Math.random() > 0.5 ? '#6eff86' : '#752eff',
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${Math.random() * 1.5 + 1.5}s`,
      scale: Math.random() * 0.6 + 0.4,
    }));
    setSparkles(newSparkles);
  }, []);

  const wrapperClasses = cn(
    "relative group inline-flex h-full w-full items-center justify-center overflow-visible rounded-full",
    className
  );

  const innerContent = (
    <>
      {/* Solid button background */}
      <div className="absolute inset-0 z-0 rounded-full bg-zinc-950 border border-[#6eff86]/40 transition-colors duration-500 shadow-[0_0_30px_rgba(110,255,134,0.3)] group-hover:shadow-[0_0_40px_rgba(110,255,134,0.5)]" />
      
      {/* CSS Sparkles Layer */}
      <div className="absolute -inset-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen overflow-visible">
        {sparkles.map((sparkle) => (
          <svg
            key={sparkle.id}
            viewBox="0 0 24 24"
            className="absolute animate-button-sparkle drop-shadow-[0_0_8px_currentColor]"
            style={{
              width: 16,
              height: 16,
              left: sparkle.left,
              top: sparkle.top,
              color: sparkle.color,
              fill: sparkle.color,
              transform: `scale(${sparkle.scale})`,
              '--delay': sparkle.delay,
              '--duration': sparkle.duration,
            } as React.CSSProperties}
          >
            <path d="M12 0C12 0 12 10 24 12C24 12 12 14 12 24C12 24 12 14 0 12C0 12 12 10 12 0Z" />
          </svg>
        ))}
      </div>

      {/* Button Content - above everything */}
      <div className="relative z-20 flex h-full w-full items-center justify-center gap-2 px-8 py-3.5 pointer-events-none">
        <span className="text-white font-bold text-lg drop-shadow-md transition-colors duration-300 group-hover:text-white">{label}</span>
        {icon}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClasses} {...(props as any)}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button className={wrapperClasses} {...props}>
      {innerContent}
    </button>
  );
}
