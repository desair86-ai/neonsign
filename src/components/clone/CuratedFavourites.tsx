"use client";

import React from "react";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { ProductCard, Product } from "@/components/clone/ProductCard";

interface CuratedFavouritesProps {
  products: Product[];
}

export function CuratedFavourites({ products }: CuratedFavouritesProps) {
  return (
    <section className="py-16 max-w-[1600px] mx-auto px-4 overflow-hidden relative">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-8 md:mb-10 text-center">
        <span className="text-white">Curated</span>{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
          Favourites
        </span>
      </h2>
      <CoverflowCarousel
        slides={products.map(p => ({ src: p.image, alt: p.name }))}
        showNavigation
        showPagination
        loop
        renderCard={(slide, index, isSelected) => (
          <div className="w-full h-full p-0">
            <ProductCard product={products[index]} index={index} theme="dark" />
          </div>
        )}
      />
    </section>
  );
}
