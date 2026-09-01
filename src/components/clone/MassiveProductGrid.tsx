"use client";

import React from 'react';
import { ProductCard, Product } from './ProductCard';

interface MassiveProductGridProps {
  products: Product[];
}

export function MassiveProductGrid({ products }: MassiveProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-32 text-center text-zinc-400">
        <h2 className="text-2xl font-bold mb-4">No products found</h2>
        <p>We couldn't find any products in our collection right now.</p>
      </div>
    );
  }

  return (
    <section className="py-16 max-w-[1800px] mx-auto px-4 xl:px-8 bg-black min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 xl:gap-8">
        {products.map((product, index) => (
          <div key={product.id}>
            <ProductCard product={product} index={index} theme="dark" />
          </div>
        ))}
      </div>
    </section>
  );
}
