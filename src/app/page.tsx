import React from "react";
import { Header } from "@/components/clone/Header";
import { SpliteInteractive } from "@/components/clone/Splite";
import { ValueBar } from "@/components/clone/ValueBar";
import { ProductExplorerGrid } from "@/components/clone/ProductExplorerGrid";
import { ProductCarousel } from "@/components/clone/ProductCarousel";
import { CuratedFavourites } from "@/components/clone/CuratedFavourites";
import { Stories } from "@/components/clone/Stories";
import { Features } from "@/components/clone/Features";
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
      name: "It Was All A Dream",
      regularPrice: "Rs. 10,800.00",
      salePrice: "Rs. 7,560.00",
      discountBadge: "Save 30%",
      image: "/5591.webp"
    },
    {
      id: "4",
      name: "Better Together",
      regularPrice: "Rs. 9,450.00",
      salePrice: "Rs. 6,615.00",
      discountBadge: "Save 30%",
      image: "/5592 (1).webp"
    },
    {
      id: "5",
      name: "Custom Logo Sign",
      regularPrice: "Rs. 15,000.00",
      salePrice: "Rs. 10,500.00",
      discountBadge: "Save 30%",
      image: "/5593.webp"
    },
    {
      id: "6",
      name: "Let's Party",
      regularPrice: "Rs. 8,100.00",
      salePrice: "Rs. 5,670.00",
      discountBadge: "Save 30%",
      image: "/5594.webp"
    },
    {
      id: "7",
      name: "Till Death",
      regularPrice: "Rs. 12,000.00",
      salePrice: "Rs. 8,400.00",
      discountBadge: "Save 30%",
      image: "/5595.webp"
    },
    {
      id: "8",
      name: "Happily Ever After",
      regularPrice: "Rs. 13,500.00",
      salePrice: "Rs. 9,450.00",
      discountBadge: "Save 30%",
      image: "/5597.webp"
    },
    {
      id: "9",
      name: "Neon Heart",
      regularPrice: "Rs. 5,000.00",
      salePrice: "Rs. 3,500.00",
      discountBadge: "Save 30%",
      image: "/5604.webp"
    }
  ];

  return (
    <main>
      <Header />
      <SpliteInteractive />
      <ValueBar />
      <ProductExplorerGrid />
      <CuratedFavourites products={mostLovedProducts} />
      <Stories />
      <Features />
      <InfoSections />
      <FAQ />
      <Footer />
    </main>
  );
}
