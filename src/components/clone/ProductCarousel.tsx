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
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-16 max-w-[1600px] mx-auto px-4">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-5xl font-black">{title}</h2>
        <div className="flex gap-2 hidden md:flex">
          <button onClick={scrollPrev} className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={scrollNext} className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0">
              <Link href="/" className="block group">
                <div className="relative aspect-square rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden mb-4">
                  {product.discountBadge && (
                    <span className="absolute top-4 left-4 z-10 bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {product.discountBadge}
                    </span>
                  )}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                </div>
                
                <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-pink-400 transition-colors">{product.name}</h3>
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="line-through text-gray-500">{product.regularPrice}</span>
                    <span className="text-gray-300">{product.salePrice}</span>
                  </div>
                  {product.promoPrice && (
                    <div className="text-[#cfff00] font-black text-xl">
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
