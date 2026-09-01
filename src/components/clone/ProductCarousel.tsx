"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard, Product } from './ProductCard';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  theme?: "light" | "dark";
}

export function ProductCarousel({ title, products, theme = "dark" }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-16 max-w-[1600px] mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-4 md:gap-6">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight`}>
          <span className={theme === 'light' ? 'text-black' : 'text-white'}>{title.split(' ')[0]}</span>
          {title.split(' ').length > 1 && (
            <>
              {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
                {title.split(' ').slice(1).join(' ')}
              </span>
            </>
          )}
        </h2>
        <div className="flex gap-4 self-start md:self-auto">
          <button onClick={scrollPrev} className={`flex items-center justify-center w-12 h-12 rounded-full border bg-[#111] transition-all duration-300 border-[#752eff] text-[#752eff] shadow-[0_0_15px_rgba(117,46,255,0.3)] hover:shadow-[0_0_25px_rgba(117,46,255,0.6)] hover:bg-[#752eff]/10 hover:scale-105`}>
            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
          </button>
          <button onClick={scrollNext} className={`flex items-center justify-center w-12 h-12 rounded-full border bg-[#111] transition-all duration-300 border-[#6eff86] text-[#6eff86] shadow-[0_0_15px_rgba(110,255,134,0.3)] hover:shadow-[0_0_25px_rgba(110,255,134,0.6)] hover:bg-[#6eff86]/10 hover:scale-105`}>
            <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden -mx-6 px-6 -my-8 py-8" ref={emblaRef}>
        <div className="flex gap-6 items-stretch">
          {products.map((product, index) => {
            const isCenterCurated = title === "Curated Favourites" && index === Math.floor(products.length / 2);
            return (
              <div key={product.id} className="flex-[0_0_65%] sm:flex-[0_0_45%] md:flex-[0_0_32%] xl:flex-[0_0_23%] min-w-0">
                <ProductCard product={product} index={index} theme={theme} isHighlighted={isCenterCurated} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
