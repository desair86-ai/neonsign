"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ExploreCollectionsProps {
  categories: any[];
}

export function ExploreCollections({ categories }: ExploreCollectionsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-16 max-w-[1600px] mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-4 md:gap-6">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-white`}>
          For Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">Space & Occasion</span>
        </h2>
        <div className="flex gap-4 self-start md:self-auto">
          <button onClick={scrollPrev} className={`flex items-center justify-center w-12 h-12 rounded-full border bg-[#111] transition-all duration-300 border-brand-purple text-brand-purple shadow-[0_0_15px_rgba(163,110,255,0.3)] hover:shadow-[0_0_25px_rgba(163,110,255,0.6)] hover:bg-brand-purple/10 hover:scale-105`}>
            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
          </button>
          <button onClick={scrollNext} className={`flex items-center justify-center w-12 h-12 rounded-full border bg-[#111] transition-all duration-300 border-brand-green text-brand-green shadow-[0_0_15px_rgba(110,255,134,0.3)] hover:shadow-[0_0_25px_rgba(110,255,134,0.6)] hover:bg-brand-green/10 hover:scale-105`}>
            <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden -mx-6 px-6 -my-8 py-8" ref={emblaRef}>
        <div className="flex gap-6 items-stretch">
          {categories.map((cat, index) => {
            return (
              <div key={cat.id || index} className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] xl:flex-[0_0_22%] min-w-0">
                <Link href={`/shop-neon-collection?cat=${cat.slug}`} className="group relative flex flex-col h-full rounded-2xl bg-[#0a0a0a] overflow-hidden p-[1px] transition-transform duration-300 hover:scale-[1.02]">
                  
                  {/* Subtle Gradient Border always on, glows intensely on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-green/30 to-brand-purple/30 group-hover:from-brand-green group-hover:to-brand-purple transition-colors duration-500" />
                  
                  {/* Inner card */}
                  <div className="relative flex flex-col h-full rounded-2xl bg-[#0a0a0a] overflow-hidden z-10">
                    <div className="relative h-[280px] w-full bg-[#111] overflow-hidden rounded-t-2xl">
                      {cat.image ? (
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(${cat.image})` }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10">
                          <Image src="/The Neon Stack ICON-03.svg" alt="Neon Pattern" width={60} height={60} className="opacity-50" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 p-5 flex flex-col items-center text-center bg-[#0a0a0a] relative rounded-b-2xl">
                      <div className="w-12 h-12 rounded-full bg-[#111] border border-zinc-800 flex items-center justify-center -mt-10 mb-4 group-hover:border-brand-purple transition-colors relative z-20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                        <Image src="/The Neon Stack ICON-03.svg" alt="Icon" width={24} height={24} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-xl md:text-xl font-black uppercase tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-green group-hover:to-brand-purple transition-all duration-300">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
