"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

const carouselItems = [
  { title: "We stack creativity.", description: "Brainstorming unique concepts that redefine spaces.", bgImage: "/5592 (1).webp" },
  { title: "We stack craftsmanship.", description: "Precision engineering and premium materials.", bgImage: "/5595.webp" },
  { title: "We stack precision.", description: "Meticulous attention to detail in every cut and curve.", bgImage: "/5596.webp" },
  { title: "We stack innovation.", description: "Integrating smart technology with classic aesthetics.", bgImage: "/5604.webp" },
  { title: "We stack relationships.", description: "Building trust and delivering wow moments to every client.", bgImage: "/5590 (1).webp" },
];

export function SpliteInteractive() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  return (
    <div 
      className="w-full h-[calc(100vh-80px)] flex flex-col md:flex-row rounded-b-[2rem] overflow-hidden border-b border-x border-brand-green shadow-[0_0_30px_rgba(110,255,134,0.4)] transition-all duration-500 relative z-10 mb-10 group cursor-pointer"
    >
      
      {/* Shared Full-Width Background with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center grayscale mix-blend-luminosity z-0 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
          style={{ backgroundImage: `url('${carouselItems[currentIndex].bgImage}')` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/80 group-hover:bg-black/60 transition-colors duration-500 z-0" />

      {/* Left: Static Robot Mascot (Hidden on mobile) */}
      <div className="hidden md:flex w-full md:w-1/2 relative h-full items-center justify-center p-8 pointer-events-none z-10">
        {/* Glow behind the robot */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 via-transparent to-brand-purple/20 opacity-50 blur-2xl z-0" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/Mascot.png" 
          alt="Neon Stack Mascot" 
          className="relative z-10 w-auto h-auto max-w-[80%] max-h-[90%] object-contain drop-shadow-[0_0_20px_rgba(110,255,134,0.3)] transition-transform duration-700"
        />
      </div>

      {/* Right: Carousel */}
      <div className="w-full md:w-1/2 p-8 md:p-16 relative flex flex-col justify-center h-full">
        {/* Carousel Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-purple drop-shadow-[0_0_15px_rgba(110,255,134,0.3)]">
                {carouselItems[currentIndex].title}
              </h3>
              <p className="text-xl md:text-2xl text-white/90 font-light max-w-md mx-auto">
                {carouselItems[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="relative z-10 mt-4 flex items-center justify-center gap-6">
          <button 
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-purple/10 border border-brand-purple text-brand-purple shadow-[0_0_15px_rgba(202,110,255,0.4)] transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-2">
            {carouselItems.map((_, idx) => (
              <button 
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === currentIndex ? "w-8 bg-brand-green shadow-[0_0_10px_rgba(110,255,134,0.5)]" : "w-2 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-green/10 border border-brand-green text-brand-green shadow-[0_0_15px_rgba(110,255,134,0.4)] transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
