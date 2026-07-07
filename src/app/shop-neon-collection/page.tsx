import React from "react";
import { Header } from "@/components/clone/Header";
import { CategoryBar } from "@/components/clone/CategoryBar";
import { ProductCarousel } from "@/components/clone/ProductCarousel";
import { ProductExplorerGrid } from "@/components/clone/ProductExplorerGrid";
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
      image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1549419141-9457a44f0ceb?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "t4",
      name: "Live Music",
      regularPrice: "Rs. 5,500.00",
      salePrice: "Rs. 3,850.00",
      discountBadge: "Save 30%",
      image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-brand-purple/30 selection:text-brand-lavender">
      <Header />
      
      {/* Banner / Header */}
      <section className="py-16 bg-zinc-950 border-b border-white/10 text-center relative overflow-hidden">
        {/* Glow behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none" />
        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.24em] text-brand-green mb-2">Our Complete Catalogue</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Shop Neon Collection</h1>
      </section>

      {/* Category Slider inside Collection page */}
      <CategoryBar />

      <ProductExplorerGrid />
      
      <ProductCarousel title="Most-Loved" products={mostLovedProducts} />
      
      <ProductCarousel title="Trending" products={trendingProducts} />

      <Footer />
    </main>
  );
}
