"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { GlowCard, GlowCardColorTheme } from '@/components/ui/spotlight-card';
import { useCart } from '@/lib/CartContext';

export interface Product {
  id: string;
  name: string;
  regularPrice: string;
  salePrice: string;
  promoPrice?: string;
  discountBadge?: string;
  image: string;
  slug?: string;
  databaseId?: number;
}

export interface ProductCardProps {
  product: Product;
  index?: number;
  theme?: "light" | "dark";
  isHighlighted?: boolean;
}

export function ProductCard({ product, index = 0, theme = "dark", isHighlighted = false }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const productUrl = product.slug ? `/product/${product.slug}` : '#';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to productUrl
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.salePrice.replace(/[^0-9.]/g, '') || '0'),
      quantity: 1,
      image: product.image,
      isCustom: false,
      databaseId: product.databaseId,
    });
  };

  return (
    <div className="relative flex flex-col h-full group">
      {/* Top Product Image Area */}
      <Link 
        href={productUrl} 
        onPointerDown={(e) => e.stopPropagation()} 
        className={`relative aspect-[4/3] sm:aspect-square w-full block rounded-t-2xl overflow-hidden transition-all duration-300 ${isHighlighted ? 'p-[3px] bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient shadow-[0_0_20px_rgba(202,110,255,0.4)]' : 'shadow-none'}`}
      >
        <div className="absolute inset-0 bg-[#111] rounded-t-2xl overflow-hidden">
          {product.discountBadge && (
            <span className="absolute top-4 left-4 z-20 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(110,255,134,0.8)] bg-gradient-to-r from-[#6eff86] via-[#752eff] to-[#bca9ff] bg-[length:200%_200%] animate-neon-gradient text-black">
              {product.discountBadge}
            </span>
          )}

          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${product.image})` }}
          />
        </div>
      </Link>

      {/* Card Content & Pricing Details */}
      <div className="p-4 sm:p-5 border-x border-b border-white/10 rounded-b-2xl flex flex-col justify-between flex-1 gap-3 relative z-10 transition-colors duration-300 group-hover:border-white/30 bg-[#0a0a0a]">
        <Link href={productUrl} onPointerDown={(e) => e.stopPropagation()} className="block">
          <h3 className="font-black text-lg md:text-xl mb-1 line-clamp-1 transition-colors text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-green group-hover:to-brand-purple">
            {product.name}
          </h3>
        </Link>

        <div className="flex flex-row justify-between items-end mt-auto gap-2">
          <Link href={productUrl} onPointerDown={(e) => e.stopPropagation()} className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="line-through text-zinc-500">
                {product.regularPrice}
              </span>
              <span className="font-extrabold text-white text-lg">
                {product.salePrice}
              </span>
            </div>
            {product.promoPrice && (
              <div className="text-brand-green drop-shadow-[0_0_8px_rgba(110,255,134,0.6)] font-black text-xl">
                {product.promoPrice}
              </div>
            )}
          </Link>

          <button 
            onClick={handleAddToCart}
            onPointerDown={(e) => e.stopPropagation()}
            className="relative z-50 flex-shrink-0 w-10 h-10 rounded-full group/cart transition-all duration-300 shadow-none hover:shadow-[0_0_15px_rgba(110,255,134,0.4)]"
            aria-label="Add to cart"
            title="Add to cart"
          >
            {/* Gradient Border Layer */}
            <div className="absolute inset-0 rounded-full bg-white/10 group-hover/cart:bg-gradient-to-r group-hover/cart:from-brand-green group-hover/cart:to-brand-purple transition-all duration-300" />
            {/* Inner Dark Layer */}
            <div className="absolute inset-[1px] bg-zinc-900 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
