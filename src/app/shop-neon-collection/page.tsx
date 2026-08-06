import React from "react";
import { Header } from "@/components/clone/Header";
import { CategoryBar } from "@/components/clone/CategoryBar";
import { ProductCarousel } from "@/components/clone/ProductCarousel";
import { ProductExplorerGrid } from "@/components/clone/ProductExplorerGrid";
import { AnimatedFeatures } from "@/components/ui/animated-features";
import { Footer } from "@/components/clone/Footer";

export default function ShopNeonCollection() {
  const mostLovedProducts = [
    {
      id: "1",
      name: "This Is Our Happy Place",
      regularPrice: "Rs. 6,600.00",
      salePrice: "Rs. 4,620.00",
      discountBadge: "Save 30%",
      image: "/5580.webp"
    },
    {
      id: "2",
      name: "Good Vibes Only",
      regularPrice: "Rs. 7,150.00",
      salePrice: "Rs. 5,005.00",
      discountBadge: "Save 30%",
      image: "/5589 (1).webp"
    },
    {
      id: "3",
      name: "Ghar Bar",
      regularPrice: "Rs. 4,200.00",
      salePrice: "Rs. 2,940.00",
      discountBadge: "Save 30%",
      image: "/5591.webp"
    },
    {
      id: "4",
      name: "Colourful Wings",
      regularPrice: "Rs. 12,000.00",
      salePrice: "Rs. 8,400.00",
      discountBadge: "Save 30%",
      image: "/5592 (1).webp"
    },
    {
      id: "5",
      name: "Custom Name Sign",
      regularPrice: "Rs. 5,000.00",
      salePrice: "Rs. 3,500.00",
      discountBadge: "Save 30%",
      image: "/5593.webp"
    },
    {
      id: "6",
      name: "It Was All A Dream",
      regularPrice: "Rs. 10,800.00",
      salePrice: "Rs. 7,560.00",
      discountBadge: "Save 30%",
      image: "/5594.webp"
    },
    {
      id: "7",
      name: "Better Together",
      regularPrice: "Rs. 9,450.00",
      salePrice: "Rs. 6,615.00",
      discountBadge: "Save 30%",
      image: "/5595.webp"
    },
    {
      id: "8",
      name: "Let's Party",
      regularPrice: "Rs. 8,100.00",
      salePrice: "Rs. 5,670.00",
      discountBadge: "Save 30%",
      image: "/5597.webp"
    },
    {
      id: "9",
      name: "Till Death",
      regularPrice: "Rs. 12,000.00",
      salePrice: "Rs. 8,400.00",
      discountBadge: "Save 30%",
      image: "/5604.webp"
    }
  ];

  const trendingProducts = [
    {
      id: "t1",
      name: "Coffee Love",
      regularPrice: "Rs. 3,500.00",
      salePrice: "Rs. 2,450.00",
      discountBadge: "Save 30%",
      image: "/5580.webp"
    },
    {
      id: "t2",
      name: "Open Sign",
      regularPrice: "Rs. 4,000.00",
      salePrice: "Rs. 2,800.00",
      discountBadge: "Save 30%",
      image: "/5593.webp"
    },
    {
      id: "t3",
      name: "Pizza & Burger",
      regularPrice: "Rs. 6,000.00",
      salePrice: "Rs. 4,200.00",
      discountBadge: "Save 30%",
      image: "/5592 (1).webp"
    },
    {
      id: "t4",
      name: "Live Music",
      regularPrice: "Rs. 5,500.00",
      salePrice: "Rs. 3,850.00",
      discountBadge: "Save 30%",
      image: "/5594.webp"
    }
  ];

  return (
    <main>
      <Header />
      
      {/* Category Slider inside Collection page */}
      <CategoryBar />

      {/* Grids and Carousels Area */}
      <div className="w-full">
        <ProductExplorerGrid />
        
        <ProductCarousel title="Curated Favourites" products={mostLovedProducts} />
        
        <ProductCarousel title="Trending" products={trendingProducts} />

        <AnimatedFeatures />
      </div>
      
      <Footer />
    </main>
  );
}
