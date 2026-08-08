"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { GlowCardColorTheme } from '@/components/ui/spotlight-card';
import { cn } from "@/lib/utils";

const storyThemes: GlowCardColorTheme[] = [
  "green",
  "pink",
  "blue",
  "orange",
  "purple",
  "yellow",
];

export function Stories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const stories = [
    { 
      id: 1, 
      title: "A Small Eatery. A Big Transformation.", 
      description: "One of our restaurant clients wanted to create a destination—not just another place to dine. Together, we designed a bespoke Neon Stack installation that became the restaurant's visual identity and favourite photo spot. Guests began sharing it across social media, recommending the place to friends and returning with family.",
      growth: "nearly 200× growth over time",
      image: "/5580.webp" 
    },
    { 
      id: 2, 
      title: "Gaming Room Setup", 
      description: "A professional streamer wanted to level up their background. We provided a custom Mojo Mix sign that syncs with their gameplay, resulting in a vibrant atmosphere.",
      growth: "Boosted stream engagement by 40%",
      image: "/5595.webp" 
    },
    { 
      id: 3, 
      title: "Wedding Memory", 
      description: "A couple wanted their surname in lights for their big day. It became the centerpiece of their reception and now hangs beautifully in their living room.",
      growth: "A memory that lasts forever",
      image: "/5597.webp" 
    },
    { 
      id: 4, 
      title: "Corporate Office Identity", 
      description: "A tech startup needed their logo illuminated in their main lobby to impress clients and inspire employees. The Neon Stack delivered a flawless piece.",
      growth: "Enhanced brand perception",
      image: "/5604.webp" 
    }
  ];

  const glows: Record<string, string> = {
    green: "border-[#6eff86]/40 shadow-[0_0_15px_rgba(110,255,134,0.2)] hover:border-[#6eff86] hover:shadow-[0_0_30px_rgba(110,255,134,0.6)]",
    pink: "border-[#f967fb]/40 shadow-[0_0_15px_rgba(249,103,251,0.2)] hover:border-[#f967fb] hover:shadow-[0_0_30px_rgba(249,103,251,0.6)]",
    blue: "border-[#00e5ff]/40 shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:border-[#00e5ff] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]",
    orange: "border-[#fe8a2e]/40 shadow-[0_0_15px_rgba(254,138,46,0.2)] hover:border-[#fe8a2e] hover:shadow-[0_0_30px_rgba(254,138,46,0.6)]",
    purple: "border-[#ca6eff]/40 shadow-[0_0_15px_rgba(202,110,255,0.2)] hover:border-[#ca6eff] hover:shadow-[0_0_30px_rgba(202,110,255,0.6)]",
    yellow: "border-[#ffeb3b]/40 shadow-[0_0_15px_rgba(255,235,59,0.2)] hover:border-[#ffeb3b] hover:shadow-[0_0_30px_rgba(255,235,59,0.6)]",
  };

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % stories.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section className="py-32 overflow-hidden bg-black relative">
      <div className="max-w-[1600px] mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6"
          >
            <span className="text-white">Stories</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
              From Real Spaces
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-400 font-light max-w-2xl mx-auto"
          >
            Great ambience doesn't just decorate a space—it transforms businesses.
          </motion.p>
        </div>

        {/* 3D Interactive Carousel */}
        <div className="relative h-[600px] flex items-center justify-center perspective-[1200px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence initial={false} mode="popLayout">
              {stories.map((story, index) => {
                const isActive = index === activeIndex;
                const offset = index - activeIndex;
                const isLeft = offset < 0 || (activeIndex === 0 && index === stories.length - 1);
                const isRight = offset > 0 || (activeIndex === stories.length - 1 && index === 0);
                
                // Simplified 3D math for just 3 visible states (active, left, right)
                let x = 0;
                let rotateY = 0;
                let z = 0;
                let opacity = 0;
                let scale = 0.85;

                if (isActive) {
                  x = 0; rotateY = 0; z = 50; opacity = 1; scale = 1;
                } else if (isLeft && Math.abs(offset) === 1 || (activeIndex === 0 && index === stories.length - 1)) {
                  x = -300; rotateY = 25; z = -100; opacity = 0.5; scale = 0.85;
                } else if (isRight && Math.abs(offset) === 1 || (activeIndex === stories.length - 1 && index === 0)) {
                  x = 300; rotateY = -25; z = -100; opacity = 0.5; scale = 0.85;
                }

                if (!isActive && !isLeft && !isRight && stories.length > 3) return null;

                const theme = storyThemes[index % storyThemes.length];

                return (
                  <motion.div
                    key={story.id}
                    layout
                    initial={false}
                    animate={{ x, rotateY, z, opacity, scale }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ zIndex: isActive ? 50 : 30 }}
                    className={cn(
                      "absolute w-[90%] md:w-[600px] h-[500px] rounded-3xl overflow-hidden bg-zinc-900 border transition-all duration-500 cursor-pointer group",
                      glows[theme]
                    )}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                      style={{ backgroundImage: `url(${story.image})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent ${isActive ? 'opacity-100' : 'opacity-80'}`} />
                    
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end"
                      >
                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">{story.title}</h3>
                        <p className="text-sm md:text-lg text-zinc-300 font-light mb-6 line-clamp-3 md:line-clamp-none">{story.description}</p>
                        <div className="inline-block bg-brand-purple/20 border border-brand-purple/50 px-4 py-2 rounded-lg text-brand-lavender font-semibold text-sm">
                          {story.growth}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-20 z-50">
            <button onClick={handlePrev} className="p-4 rounded-full bg-brand-purple/10 border border-brand-purple text-brand-purple shadow-[0_0_15px_rgba(202,110,255,0.4)] backdrop-blur-md transition-all duration-300">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-20 z-50">
            <button onClick={handleNext} className="p-4 rounded-full bg-brand-green/10 border border-brand-green text-brand-green shadow-[0_0_15px_rgba(110,255,134,0.4)] backdrop-blur-md transition-all duration-300">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
