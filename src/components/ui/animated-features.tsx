"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Package, PackageOpen, ThumbsUp } from 'lucide-react';

export function AnimatedFeatures({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`py-16 px-4 relative overflow-hidden border-y ${theme === 'light' ? 'bg-white border-black/5' : 'bg-black border-white/5'}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
        
        {/* Feature 1: Sun (Rotating) */}
        <div className="flex flex-col items-center justify-center group cursor-default">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className={`mb-6 group-hover:text-brand-green group-hover:drop-shadow-[0_0_15px_rgba(110,255,134,0.6)] transition-all duration-300 ${theme === 'light' ? 'text-black' : 'text-white'}`}
          >
            <Sun size={64} strokeWidth={1.2} />
          </motion.div>
          <h3 className={`text-[22px] font-medium tracking-wide ${theme === 'light' ? 'text-black' : 'text-white'}`}>Brighter & Long Life</h3>
        </div>

        {/* Feature 2: Package (Opening/Closing) */}
        <div className="flex flex-col items-center justify-center group cursor-default">
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={`mb-6 group-hover:text-brand-green group-hover:drop-shadow-[0_0_15px_rgba(110,255,134,0.6)] transition-all duration-300 ${theme === 'light' ? 'text-black' : 'text-white'}`}
          >
            {isOpen ? <PackageOpen size={64} strokeWidth={1.2} /> : <Package size={64} strokeWidth={1.2} />}
          </motion.div>
          <h3 className={`text-[22px] font-medium tracking-wide ${theme === 'light' ? 'text-black' : 'text-white'}`}>Safe & Secure Packaging</h3>
        </div>

        {/* Feature 3: Thumbs Up (Clicking) */}
        <div className="flex flex-col items-center justify-center group cursor-default">
          <motion.div 
            animate={{ 
              rotate: [0, -25, 10, 0, 0],
              scale: [1, 1.25, 0.9, 1, 1] 
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
            className={`mb-6 group-hover:text-brand-green group-hover:drop-shadow-[0_0_15px_rgba(110,255,134,0.6)] transition-all duration-300 ${theme === 'light' ? 'text-black' : 'text-white'}`}
          >
            <ThumbsUp size={64} strokeWidth={1.2} />
          </motion.div>
          <h3 className={`text-[22px] font-medium tracking-wide ${theme === 'light' ? 'text-black' : 'text-white'}`}>50000+ Happy Customers</h3>
        </div>

      </div>
    </div>
  );
}
