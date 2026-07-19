import React from "react";
import { Header } from "@/components/clone/Header";
import { Hero } from "@/components/clone/Hero";
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
    <main>
      <Header />
      <Hero />
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
