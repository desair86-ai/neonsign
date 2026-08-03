"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Play } from 'lucide-react';
import { GlowCard, GlowCardColorTheme } from '@/components/ui/spotlight-card';

const storyThemes: GlowCardColorTheme[] = [
  "green",
  "pink",
  "blue",
  "orange",
  "purple",
  "yellow",
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
            const storyTheme = storyThemes[idx % storyThemes.length];
            return (
              <div key={story.id} className="flex-[0_0_160px] md:flex-[0_0_200px] lg:flex-[0_0_250px] min-w-0 cursor-pointer relative block h-full">
                {/* 
                  Spotlight Hover Glow Effect in 100% continuous orbital mode
                */}
                <GlowCard 
                  theme={storyTheme} 
                  continuous={true} 
                  borderSize={3}
                  className="h-full aspect-[9/16]"
                >
                  <div className="relative z-10 block h-full w-full rounded-2xl overflow-hidden transition-all duration-300 bg-zinc-950">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                      style={{ backgroundImage: `url(${story.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20" />
                    
                    {/* Play icon */}
                    <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md p-2.5 rounded-full text-white border border-[#6eff86] bg-brand-purple shadow-[0_0_15px_rgba(110,255,134,0.8)] transition-all duration-300">
                      <Play className="w-4 h-4 fill-[#6eff86] text-[#6eff86] transition-colors" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-20 text-[#6eff86] font-bold text-sm md:text-base line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {story.title}
                    </div>
                  </div>
                </GlowCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
