"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Play } from 'lucide-react';

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
    <section className="py-16 max-w-[1600px] mx-auto px-4">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Watch & Buy!</h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {stories.map((story) => (
            <div key={story.id} className="flex-[0_0_160px] md:flex-[0_0_200px] lg:flex-[0_0_250px] min-w-0 group cursor-pointer">
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-brand-purple group-hover:shadow-[0_0_15px_rgba(117,46,255,0.4)] transition-colors">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${story.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />
                
                {/* Play icon */}
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full text-white">
                  <Play className="w-4 h-4 fill-white" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm md:text-base line-clamp-2">
                  {story.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
