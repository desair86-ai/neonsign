"use client";

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[calc(100%-4px)] mx-auto h-[calc(100vh-240px)] min-h-[500px] mb-4 pb-[3px] px-[3px] rounded-b-[2rem] bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient shadow-[0_0_30px_rgba(202,110,255,0.4)] overflow-hidden relative">
      <div 
        className="w-full h-full flex flex-col md:flex-row rounded-b-[calc(2rem-2px)] overflow-hidden relative z-10 bg-black"
      >
        {/* Left: Static Robot Mascot (Hidden on mobile) */}
        <div className="hidden md:flex flex-col w-full md:w-1/2 relative h-full items-center justify-center p-8 pointer-events-none z-10">
          {/* Glow behind the robot */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 via-transparent to-brand-purple/20 opacity-50 blur-2xl z-0" />
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-pacifico mb-4 tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient relative z-10 text-center drop-shadow-[0_0_15px_rgba(110,255,134,0.4)] pt-8">
            The Neon Stack
          </h1>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/Mascot.png" 
            alt="Neon Stack Mascot" 
            className="relative z-10 w-auto h-auto max-w-full max-h-[75%] object-contain drop-shadow-[0_0_20px_rgba(110,255,134,0.3)]"
          />
        </div>

        {/* Right: Carousel */}
        <div className="w-full md:w-1/2 flex flex-col h-full overflow-hidden bg-black">
          {/* Image Section (Top Half) */}
          <div className="relative h-1/2 w-full border-b border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${carouselItems[currentIndex].bgImage}')` }}
              />
            </AnimatePresence>
          </div>

          {/* Text & Controls Section (Bottom Half) */}
          <div className="relative h-1/2 w-full p-8 md:p-12 flex flex-col justify-center z-10">
            {/* Mobile Mascot (visible only on small screens) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/Mascot.png" 
              alt="Neon Stack Mascot" 
              className="absolute left-2 -top-16 sm:-top-20 md:hidden w-24 sm:w-28 h-auto drop-shadow-[0_0_15px_rgba(110,255,134,0.3)] z-20 pointer-events-none"
            />

            {/* Carousel Content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-purple drop-shadow-[0_0_15px_rgba(110,255,134,0.3)]">
                    {carouselItems[currentIndex].title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/90 font-light max-w-md mx-auto">
                    {carouselItems[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls */}
            <div className="mt-6 flex items-center justify-center gap-6">
              <button 
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-brand-purple/10 border border-brand-purple text-brand-purple shadow-[0_0_15px_rgba(202,110,255,0.4)] transition-all duration-300 hover:bg-brand-purple/20"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
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
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-brand-green/10 border border-brand-green text-brand-green shadow-[0_0_15px_rgba(110,255,134,0.4)] transition-all duration-300 hover:bg-brand-green/20"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
