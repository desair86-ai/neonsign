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
      image: "/product-1.jpeg"
    },
    {
      id: "2",
      name: "Good Vibes Only (FloRo)",
      regularPrice: "Rs. 11,500.00",
      salePrice: "Rs. 8,050.00",
      discountBadge: "Save 30%",
      image: "/product-2.jpeg"
    },
    {
      id: "3",
      name: "Ghar Bar",
      regularPrice: "Rs. 4,200.00",
      salePrice: "Rs. 2,940.00",
      discountBadge: "Save 30%",
      image: "/product-3.jpeg"
    },
    {
      id: "4",
      name: "Colourful Wings",
      regularPrice: "Rs. 12,000.00",
      salePrice: "Rs. 8,400.00",
      discountBadge: "Save 30%",
      image: "/product-4.jpeg"
    },
    {
      id: "5",
      name: "Custom Name Sign",
      regularPrice: "Rs. 5,000.00",
      salePrice: "Rs. 3,500.00",
      discountBadge: "Save 30%",
      image: "/product-5.jpeg"
    }
  ];

  const trendingProducts = [
    {
      id: "t1",
      name: "Coffee Love",
      regularPrice: "Rs. 3,500.00",
      salePrice: "Rs. 2,450.00",
      discountBadge: "Save 30%",
      image: "/product-5.jpeg"
    },
    {
      id: "t2",
      name: "Open Sign",
      regularPrice: "Rs. 4,000.00",
      salePrice: "Rs. 2,800.00",
      discountBadge: "Save 30%",
      image: "/product-6.jpeg"
    },
    {
      id: "t3",
      name: "Pizza & Burger",
      regularPrice: "Rs. 6,000.00",
      salePrice: "Rs. 4,200.00",
      discountBadge: "Save 30%",
      image: "/product-4.jpeg"
    },
    {
      id: "t4",
      name: "Live Music",
      regularPrice: "Rs. 5,500.00",
      salePrice: "Rs. 3,850.00",
      discountBadge: "Save 30%",
      image: "/product-1.jpeg"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-brand-purple/30 selection:text-brand-lavender">
      <Header />
      
      {/* Category Slider inside Collection page */}
      <CategoryBar theme="light" />

      {/* Grids and Carousels Area */}
      <div className="w-full">
        <ProductExplorerGrid theme="light" />
        
        <ProductCarousel title="Most-Loved" products={mostLovedProducts} theme="light" />
        
        <ProductCarousel title="Trending" products={trendingProducts} theme="light" />

        <AnimatedFeatures theme="light" />
      </div>
      
      <Footer />
    </main>
  );
}
