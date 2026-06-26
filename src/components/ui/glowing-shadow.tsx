"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingShadowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}

export function GlowingShadow({
  children,
  glowColor = "#ec4899", // default pink
  className,
  ...props
}: GlowingShadowProps) {
  return (
    <div className={cn("relative group cursor-pointer", className)} {...props}>
      <motion.div
        className="absolute -inset-1 rounded-full opacity-0 blur-lg transition duration-500 group-hover:opacity-100"
        style={{ backgroundColor: glowColor }}
      />
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-black border border-white/20 text-white transition duration-300 group-hover:border-transparent group-hover:text-black group-hover:bg-white">
        {children}
      </div>
    </div>
  );
}
