import React from "react";
import { Header } from "@/components/clone/Header";
import { Hero } from "@/components/clone/Hero";
import { CategoryBar } from "@/components/clone/CategoryBar";
import { ValueBar } from "@/components/clone/ValueBar";
import { ProductExplorerGrid } from "@/components/clone/ProductExplorerGrid";
import { ProductCarousel } from "@/components/clone/ProductCarousel";
import { Stories } from "@/components/clone/Stories";
import { InfoSections } from "@/components/clone/InfoSections";
import { FAQ } from "@/components/clone/FAQ";
import { Footer } from "@/components/clone/Footer";

export default function Home() {
  const mostLovedProducts = [
    {
      id: "1",
      name: "This Is Our Happy Place",
      regularPrice: "Rs. 6,600.00",
      salePrice: "Rs. 4,620.00",
      discountBadge: "Save 30%",
      image: "https://images.unsplash.com/photo-1549419141-9457a44f0ceb?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "Good Vibes Only (FloRo)",
      regularPrice: "Rs. 11,500.00",
      salePrice: "Rs. 8,050.00",
      discountBadge: "Save 30%",
      image: "https://images.unsplash.com/photo-1563242048-b47bd65f2129?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "3",
      name: "Ghar Bar",
      regularPrice: "Rs. 4,200.00",
      salePrice: "Rs. 2,940.00",
      discountBadge: "Save 30%",
      image: "https://images.unsplash.com/photo-1493707553966-283afac8c358?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "4",
      name: "Colourful Wings",
      regularPrice: "Rs. 12,000.00",
      salePrice: "Rs. 8,400.00",
      discountBadge: "Save 30%",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "t2",
      name: "Open Sign",
      regularPrice: "Rs. 4,000.00",
      salePrice: "Rs. 2,800.00",
      discountBadge: "Save 30%",
      image: "https://images.unsplash.com/photo-1563242048-b47bd65f2129?q=80&w=600&auto=format&fit=crop"
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
    <main className="min-h-screen bg-black text-white font-sans selection:bg-pink-500/30 selection:text-pink-200">
      <Header />
      <Hero />
      <CategoryBar />
      <ValueBar />
      <ProductExplorerGrid />
      <ProductCarousel title="Most-Loved" products={mostLovedProducts} />
      <Stories />
      <ProductCarousel title="Trending" products={trendingProducts} />
      <InfoSections />
      <FAQ />
      <Footer />
    </main>
  );
}
