"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

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

const defaultGlowStyles = [
  {
    borderClass: "border-[#6eff86]/60 shadow-[0_0_25px_rgba(110,255,134,0.4)] group-hover:border-transparent",
    badgeClass: "bg-[#6eff86] text-black shadow-[0_0_12px_rgba(110,255,134,0.6)]",
    accentText: "text-[#6eff86]",
  },
  {
    borderClass: "border-[#f967fb]/60 shadow-[0_0_25px_rgba(249,103,251,0.4)] group-hover:border-transparent",
    badgeClass: "bg-[#f967fb] text-black shadow-[0_0_12px_rgba(249,103,251,0.6)]",
    accentText: "text-[#f967fb]",
  },
  {
    borderClass: "border-[#00e5ff]/60 shadow-[0_0_25px_rgba(0,229,255,0.4)] group-hover:border-transparent",
    badgeClass: "bg-[#00e5ff] text-black shadow-[0_0_12px_rgba(0,229,255,0.6)]",
    accentText: "text-[#00e5ff]",
  },
  {
    borderClass: "border-[#fe8a2e]/60 shadow-[0_0_25px_rgba(254,138,46,0.4)] group-hover:border-transparent",
    badgeClass: "bg-[#fe8a2e] text-black shadow-[0_0_12px_rgba(254,138,46,0.6)]",
    accentText: "text-[#fe8a2e]",
  },
];

export function ProductCard({ product, index = 0, theme = "dark" }: ProductCardProps) {
  const defaultStyle = defaultGlowStyles[index % defaultGlowStyles.length];

  return (
    <div className="relative group block h-full">
      {/* 1. Neon Gradient (#6eff86 , #752eff) Background Glow on Hover (Shine like neon effect) */}
      <div 
        className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#6eff86] via-[#752eff] to-[#6eff86] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 animate-neon-gradient -z-10" 
      />

      {/* 2. Neon Gradient (#6eff86 , #752eff) Border Layer on Hover */}
      <div 
        className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#6eff86] via-[#752eff] to-[#6eff86] opacity-0 group-hover:opacity-100 transition-all duration-500 animate-neon-gradient pointer-events-none z-0" 
      />

      {/* 3. Main Card Container (Default Border & Neon Glow like Image 2) */}
      <Link 
        href="/" 
        className={`relative z-10 block rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col h-full ${
          theme === 'light' 
            ? 'bg-white text-black' 
            : 'bg-zinc-950/90 text-white backdrop-blur-md'
        } ${defaultStyle.borderClass}`}
      >
        {/* Neon Shine Sweep Effect across card on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl z-20">
          <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-card-shine" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#6eff86]/10 via-transparent to-[#752eff]/15 mix-blend-screen" />
        </div>

        {/* Top Product Image Area */}
        <div className={`relative aspect-square w-full overflow-hidden ${theme === 'light' ? 'bg-zinc-100' : 'bg-zinc-900'}`}>
          {/* Discount Badge with Neon Gradient on Hover */}
          {product.discountBadge && (
            <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_12px_rgba(117,46,255,0.6)] bg-brand-purple text-white group-hover:bg-gradient-to-r group-hover:from-[#6eff86] group-hover:to-[#752eff] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(110,255,134,0.8)]">
              {product.discountBadge}
            </span>
          )}

          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${product.image})` }}
          />

          {/* Subtle gradient overlay at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Card Content & Pricing Details */}
        <div className="p-5 flex flex-col justify-between flex-1 gap-4 relative z-10">
          <div>
            <h3 className={`font-black text-lg md:text-xl mb-2 line-clamp-1 transition-colors group-hover:text-[#6eff86] ${theme === 'light' ? 'text-black' : 'text-white'}`}>
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
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#6eff86]" />
              Neon Sign
            </span>
            <div className="inline-flex items-center text-sm font-bold text-[#6eff86] group-hover:text-[#6eff86] drop-shadow-[0_0_6px_rgba(110,255,134,0.4)] transition-all">
              Shop Now <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
