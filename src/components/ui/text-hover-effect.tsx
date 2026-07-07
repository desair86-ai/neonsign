"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  duration,
  className,
}: {
  text?: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  // Spaced coordinates to prevent wide Clonoid font letters from overlapping
  const chars = [
    { char: "N", x: 47 },
    { char: "E", x: 81, isCustomE: true },
    { char: "O", x: 115 },
    { char: "N", x: 149 },
    { char: " ", x: 183 }, // Space
    { char: "S", x: 217 },
    { char: "T", x: 251 },
    { char: "A", x: 285 },
    { char: "C", x: 319 },
    { char: "K", x: 353 }
  ];

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 400 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#6eff86" />
              <stop offset="100%" stopColor="#752eff" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="30%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>

        {/* Real neon glow filter for the text hover effect */}
        <filter id="neonTextGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Background/Hover guide text */}
      <g className="fill-transparent stroke-neutral-800 font-clonoid text-[2.2rem] font-bold" style={{ opacity: hovered ? 0.4 : 0 }}>
        {chars.map((c, i) => c.isCustomE ? (
          <path key={i} d="M 72,40 L 90,40 M 72,50 L 90,50 M 72,60 L 90,60" strokeWidth="0.4" strokeLinecap="round" />
        ) : (
          <text key={i} x={c.x} y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.4">{c.char}</text>
        ))}
      </g>

      {/* Main default static text outline (White) */}
      <motion.g 
        className="fill-transparent stroke-white/80 font-clonoid text-[2.2rem] font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {chars.map((c, i) => c.isCustomE ? (
          <path key={i} d="M 72,40 L 90,40 M 72,50 L 90,50 M 72,60 L 90,60" strokeWidth="0.4" strokeLinecap="round" />
        ) : (
          <text key={i} x={c.x} y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.4">{c.char}</text>
        ))}
      </motion.g>

      {/* Glowing Colored Masked Hover Layer */}
      <g 
        stroke="url(#textGradient)" 
        filter="url(#neonTextGlow)" 
        mask="url(#textMask)"
        className="fill-transparent font-clonoid text-[2.2rem] font-bold"
      >
        {chars.map((c, i) => c.isCustomE ? (
          <path key={i} d="M 72,40 L 90,40 M 72,50 L 90,50 M 72,60 L 90,60" strokeWidth="1.2" strokeLinecap="round" />
        ) : (
          <text key={i} x={c.x} y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="1.2">{c.char}</text>
        ))}
      </g>
    </svg>
  );
};
