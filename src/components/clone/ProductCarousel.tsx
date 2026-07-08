"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  regularPrice: string;
  salePrice: string;
  promoPrice?: string;
  discountBadge?: string;
  image: string;
}

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
        <div className="flex-1 h-[2px] relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_45%,#6eff86_50%,transparent_51%,transparent_100%)] bg-[length:200%_100%] animate-border-flow" />
        </div>
        <div className="flex gap-2 hidden md:flex">
          <button onClick={scrollPrev} className={`p-3 rounded-full border transition-colors ${theme === 'light' ? 'bg-zinc-100 border-zinc-200 hover:bg-zinc-200 text-black' : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white'}`}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={scrollNext} className={`p-3 rounded-full border transition-colors ${theme === 'light' ? 'bg-zinc-100 border-zinc-200 hover:bg-zinc-200 text-black' : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white'}`}>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0">
              <Link href="/" className="block group">
                <div className={`relative aspect-square rounded-2xl border overflow-hidden mb-4 group-hover:border-brand-purple/60 group-hover:shadow-[0_0_20px_rgba(117,46,255,0.35)] transition-all duration-300 ${theme === 'light' ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
                  {product.discountBadge && (
                    <span className="absolute top-4 left-4 z-10 bg-brand-purple text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(117,46,255,0.6)]">
                      {product.discountBadge}
                    </span>
                  )}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                </div>
                
                <h3 className={`font-bold text-lg mb-2 line-clamp-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{product.name}</h3>
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`line-through ${theme === 'light' ? 'text-black' : 'text-gray-500'}`}>{product.regularPrice}</span>
                    <span className={theme === 'light' ? 'text-black font-semibold' : 'text-gray-300'}>{product.salePrice}</span>
                  </div>
                  {product.promoPrice && (
                    <div className="text-brand-green drop-shadow-[0_0_8px_rgba(110,255,134,0.5)] font-black text-xl">
                      {product.promoPrice}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
