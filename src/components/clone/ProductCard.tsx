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
      <Link 
        href="/" 
        className={`relative z-10 block rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col h-full ${
          theme === 'light' 
            ? 'bg-white text-black' 
            : 'bg-zinc-900 text-white'
        } ${
          glowTheme === 'green' ? 'border-[#6eff86]/40 shadow-[0_0_15px_rgba(110,255,134,0.2)] hover:border-[#6eff86] hover:shadow-[0_0_30px_rgba(110,255,134,0.6)]' :
          glowTheme === 'pink' ? 'border-[#f967fb]/40 shadow-[0_0_15px_rgba(249,103,251,0.2)] hover:border-[#f967fb] hover:shadow-[0_0_30px_rgba(249,103,251,0.6)]' :
          glowTheme === 'blue' ? 'border-[#00e5ff]/40 shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:border-[#00e5ff] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]' :
          glowTheme === 'orange' ? 'border-[#fe8a2e]/40 shadow-[0_0_15px_rgba(254,138,46,0.2)] hover:border-[#fe8a2e] hover:shadow-[0_0_30px_rgba(254,138,46,0.6)]' :
          glowTheme === 'purple' ? 'border-[#752eff]/40 shadow-[0_0_15px_rgba(117,46,255,0.2)] hover:border-[#752eff] hover:shadow-[0_0_30px_rgba(117,46,255,0.6)]' :
          glowTheme === 'yellow' ? 'border-[#eaff00]/40 shadow-[0_0_15px_rgba(234,255,0,0.2)] hover:border-[#eaff00] hover:shadow-[0_0_30px_rgba(234,255,0,0.6)]' :
          'border-[#ff2e2e]/40 shadow-[0_0_15px_rgba(255,46,46,0.2)] hover:border-[#ff2e2e] hover:shadow-[0_0_30px_rgba(255,46,46,0.6)]'
        }`}
      >
          {/* Top Product Image Area */}
          <div className={`relative aspect-[4/3] sm:aspect-square w-full overflow-hidden ${theme === 'light' ? 'bg-zinc-100' : 'bg-zinc-900'}`}>
            {product.discountBadge && (
              <span className="absolute top-4 left-4 z-20 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(110,255,134,0.8)] bg-gradient-to-r from-[#6eff86] via-[#752eff] to-[#bca9ff] bg-[length:200%_200%] animate-neon-gradient text-black">
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
          <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3 sm:gap-4 relative z-10">
            <div>
              <h3 className={`font-black text-base sm:text-lg md:text-xl mb-1 sm:mb-2 line-clamp-1 transition-colors text-white`}>
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
    </div>
  );
}
