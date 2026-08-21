"use client";

import React from 'react';
import { ProductCard, Product } from './ProductCard';

interface ProductGridProps {
  title: string;
  products: Product[];
  theme?: "light" | "dark";
}

export function ProductGrid({ title, products, theme = "dark" }: ProductGridProps) {
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {products.map((product, index) => (
          <div key={product.id}>
            <ProductCard product={product} index={index} theme={theme} />
          </div>
        ))}
      </div>
    </section>
  );
}
