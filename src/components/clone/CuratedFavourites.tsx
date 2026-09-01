"use client";

import React from "react";
import { ProductCarousel } from "@/components/clone/ProductCarousel";
import { Product } from "@/components/clone/ProductCard";

interface CuratedFavouritesProps {
  products: Product[];
}

export function CuratedFavourites({ products }: CuratedFavouritesProps) {
  return (
    <ProductCarousel title="Curated Favourites" products={products} theme="dark" />
  );
}
