"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { NEON_STACK_ICON_SRC } from '@/lib/brand-assets';

export function NeonIcon({ className = "" }: { className?: string }) {
  return (
    <motion.div 
      className={`relative w-full h-full ${className}`}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src={NEON_STACK_ICON_SRC}
        className="w-full h-full object-contain"
        alt="The Neon Stack Icon"
      />
    </motion.div>
  );
}
