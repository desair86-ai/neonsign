"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function NeonIcon({ className = "" }: { className?: string }) {
  return (
    <motion.div 
      className={`relative w-full h-full ${className}`}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <img src="/The Neon Stack ICON-03.svg" className="w-full h-full object-contain" alt="Neon Stack Icon" />
    </motion.div>
  );
}
