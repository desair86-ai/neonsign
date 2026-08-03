"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GlowCard, GlowCardColorTheme } from '@/components/ui/spotlight-card';

export interface Product {
  id: string;
  name: string;
  regularPrice: string;
  salePrice: string;
  promoPrice?: string;
  discountBadge?: string;
  image: string;
}

export interface ProductCardProps {
  product: Product;
  index?: number;
  theme?: "light" | "dark";
}

const glowThemes: GlowCardColorTheme[] = [
  "green",
  "pink",
  "blue",
  "orange",
  "purple",
  "yellow",
  "red",
];

export function ProductCard({ product, index = 0, theme = "dark" }: ProductCardProps) {
  const glowTheme = glowThemes[index % glowThemes.length];

  return (
    <div className="relative block h-full">
      {/* 
        Spotlight Hover Glow Effect (Interactive Cursor-Tracking Radial Spotlight)
        Using GlowCard in CONTINUOUS PERPETUAL ORBIT mode (100% active, instead of on hover!)
      */}
      <GlowCard 
        theme={glowTheme} 
        continuous={true} 
        borderSize={3}
        className="h-full w-full"
      >
        <Link 
          href="/" 
          className={`relative z-10 block rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full ${
            theme === 'light' 
              ? 'bg-white text-black' 
              : 'bg-zinc-950/80 text-white'
          }`}
        >
          {/* Top Product Image Area */}
          <div className={`relative aspect-square w-full overflow-hidden ${theme === 'light' ? 'bg-zinc-100' : 'bg-zinc-900'}`}>
            {/* Discount Badge - Continuously illuminated */}
            {product.discountBadge && (
              <span className="absolute top-4 left-4 z-20 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(110,255,134,0.8)] bg-gradient-to-r from-[#6eff86] to-[#752eff] text-black">
                {product.discountBadge}
              </span>
            )}

            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
              style={{ backgroundImage: `url(${product.image})` }}
            />

            {/* Subtle gradient overlay at bottom of image */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* Card Content & Pricing Details */}
          <div className="p-5 flex flex-col justify-between flex-1 gap-4 relative z-10">
            <div>
              <h3 className={`font-black text-lg md:text-xl mb-2 line-clamp-1 transition-colors text-white`}>
                {product.name}
              </h3>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className={`line-through ${theme === 'light' ? 'text-black' : 'text-gray-500'}`}>
                    {product.regularPrice}
                  </span>
                  <span className={`font-extrabold ${theme === 'light' ? 'text-black' : 'text-gray-100'}`}>
                    {product.salePrice}
                  </span>
                </div>
                {product.promoPrice && (
                  <div className="text-[#6eff86] drop-shadow-[0_0_8px_rgba(110,255,134,0.6)] font-black text-xl">
                    {product.promoPrice}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Action Bar like Image 2 */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white transition-colors flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#6eff86]" />
                Neon Sign
              </span>
              <div className="inline-flex items-center text-sm font-bold text-[#6eff86] drop-shadow-[0_0_6px_rgba(110,255,134,0.5)] transition-all">
                Shop Now <ArrowRight className="ml-1.5 w-4 h-4 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </GlowCard>
    </div>
  );
}
