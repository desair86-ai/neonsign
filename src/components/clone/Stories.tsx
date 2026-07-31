"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Play } from 'lucide-react';

const defaultGlowStyles = [
  {
    borderClass: "border-[#6eff86]/60 shadow-[0_0_25px_rgba(110,255,134,0.4)] group-hover:border-transparent",
  },
  {
    borderClass: "border-[#f967fb]/60 shadow-[0_0_25px_rgba(249,103,251,0.4)] group-hover:border-transparent",
  },
  {
    borderClass: "border-[#00e5ff]/60 shadow-[0_0_25px_rgba(0,229,255,0.4)] group-hover:border-transparent",
  },
  {
    borderClass: "border-[#fe8a2e]/60 shadow-[0_0_25px_rgba(254,138,46,0.4)] group-hover:border-transparent",
  },
];

export function Stories() {
  const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true, containScroll: 'trimSnaps' });

  // Placeholder images for stories
  const stories = [
    { id: 1, title: "Happy Place", image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=400&auto=format&fit=crop" },
    { id: 2, title: "Good Vibes", image: "https://images.unsplash.com/photo-1549419141-9457a44f0ceb?q=80&w=400&auto=format&fit=crop" },
    { id: 3, title: "Ghar Bar", image: "https://images.unsplash.com/photo-1563242048-b47bd65f2129?q=80&w=400&auto=format&fit=crop" },
    { id: 4, title: "Custom Wings", image: "https://images.unsplash.com/photo-1493707553966-283afac8c358?q=80&w=400&auto=format&fit=crop" },
    { id: 5, title: "Business", image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=400&auto=format&fit=crop" },
    { id: 6, title: "Wedding", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop" },
  ];

  return (
    <section className="py-16 max-w-[1600px] mx-auto px-4 overflow-hidden">
      <div className="flex items-center justify-center mb-10 gap-6">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight whitespace-nowrap">Watch & Buy!</h2>
      </div>

      <div className="overflow-hidden w-full py-6" ref={emblaRef}>
        <div className="flex gap-6 items-stretch">
          {stories.map((story, idx) => {
            const defaultStyle = defaultGlowStyles[idx % defaultGlowStyles.length];
            return (
              <div key={story.id} className="flex-[0_0_160px] md:flex-[0_0_200px] lg:flex-[0_0_250px] min-w-0 group cursor-pointer relative block h-full">
                {/* 1. Neon Gradient (#6eff86 , #752eff) Background Glow on Hover (Shine like neon effect) */}
                <div 
                  className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#6eff86] via-[#752eff] to-[#6eff86] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 animate-neon-gradient -z-10" 
                />

                {/* 2. Neon Gradient (#6eff86 , #752eff) Border Layer on Hover */}
                <div 
                  className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#6eff86] via-[#752eff] to-[#6eff86] opacity-0 group-hover:opacity-100 transition-all duration-500 animate-neon-gradient pointer-events-none z-0" 
                />

                {/* 3. Main Story Card Container with Default Border & Neon Glow like Image 2 */}
                <div className={`relative z-10 aspect-[9/16] rounded-2xl border overflow-hidden transition-all duration-300 bg-zinc-950 ${defaultStyle.borderClass}`}>
                  {/* Neon Shine Sweep Effect across card on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl z-20">
                    <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-card-shine" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6eff86]/10 via-transparent to-[#752eff]/15 mix-blend-screen" />
                  </div>

                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${story.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20" />
                  
                  {/* Play icon */}
                  <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md p-2.5 rounded-full text-white border border-white/20 group-hover:border-[#6eff86] group-hover:bg-brand-purple group-hover:shadow-[0_0_15px_rgba(110,255,134,0.8)] transition-all duration-300">
                    <Play className="w-4 h-4 fill-white group-hover:fill-[#6eff86] group-hover:text-[#6eff86] transition-colors" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-20 text-white font-bold text-sm md:text-base line-clamp-2 transition-colors group-hover:text-[#6eff86] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {story.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
