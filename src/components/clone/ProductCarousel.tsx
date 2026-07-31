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
      <div className="flex items-center justify-between mb-10 gap-6">
        <h2 className={`text-3xl md:text-5xl font-black whitespace-nowrap ${theme === 'light' ? 'text-black' : 'text-white'}`}>{title}</h2>
        <div className="flex gap-2 hidden md:flex">
          <button onClick={scrollPrev} className={`p-3 rounded-full border transition-colors ${theme === 'light' ? 'bg-zinc-100 border-zinc-200 hover:bg-zinc-200 text-black' : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white'}`}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={scrollNext} className={`p-3 rounded-full border transition-colors ${theme === 'light' ? 'bg-zinc-100 border-zinc-200 hover:bg-zinc-200 text-black' : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white'}`}>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden -mx-6 px-6 -my-8 py-8" ref={emblaRef}>
        <div className="flex gap-6 items-stretch">
          {products.map((product, index) => (
            <div key={product.id} className="flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_32%] lg:flex-[0_0_23%] min-w-0">
              <ProductCard product={product} index={index} theme={theme} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
