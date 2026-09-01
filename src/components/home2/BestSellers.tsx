import React from 'react';
import { ProductCard2 as ProductCard } from '@/components/home2/ProductCard2';
import type { Product } from '@/components/clone/ProductCard';
import Link from 'next/link';

export function BestSellers({ products }: { products: Product[] }) {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto bg-black">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">Best Sellers</h2>
          <p className="text-gray-400">Our most loved neon signs.</p>
        </div>
        <Link href="/shop-neon-collection" className="hidden sm:inline-flex text-[#6eff86] hover:text-white font-bold transition-colors">
          View All Products &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, idx) => (
          <ProductCard key={product.id || idx} product={product} index={idx} theme="dark" />
        ))}
      </div>
      
      <div className="mt-8 text-center sm:hidden">
        <Link href="/shop-neon-collection" className="inline-block border border-[#6eff86] text-[#6eff86] px-6 py-3 rounded-full font-bold">
          View All Products
        </Link>
      </div>
    </section>
  );
}
