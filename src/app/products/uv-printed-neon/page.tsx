import React from "react";
import { Header } from "@/components/clone/Header";
import { GlobalFooter } from "@/components/clone/GlobalFooter";
import { ProductCarousel } from "@/components/clone/ProductCarousel";
import { UVInfoSection } from "@/components/clone/UVInfoSection";

export const metadata = {
  title: 'UV Printed Neon Signs | The Neon Stack',
  description: 'Explore the modern twist on neon art with our UV printed neon signs.',
};

export default function UVPrintedNeonPage() {
  const uvProducts = [
    {
      id: "uv1",
      name: "Complex Logo Sign",
      regularPrice: "Rs. 10,000.00",
      salePrice: "Rs. 7,000.00",
      discountBadge: "Save 30%",
      image: "/5597.webp"
    },
    {
      id: "uv2",
      name: "Detailed Artwork Print",
      regularPrice: "Rs. 12,500.00",
      salePrice: "Rs. 8,750.00",
      discountBadge: "Save 30%",
      image: "/5592 (1).webp"
    },
    {
      id: "uv3",
      name: "Business UV Print",
      regularPrice: "Rs. 15,000.00",
      salePrice: "Rs. 10,500.00",
      discountBadge: "Save 30%",
      image: "/5604.webp"
    },
    {
      id: "uv4",
      name: "Graphic Neon Art",
      regularPrice: "Rs. 9,000.00",
      salePrice: "Rs. 6,300.00",
      discountBadge: "Save 30%",
      image: "/5595.webp"
    }
  ];

  return (
    <main className="bg-black text-white min-h-screen font-poppins selection:bg-brand-green selection:text-black">
      <Header />
      
      {/* Informational Text Section */}
      <section className="pt-24 pb-16 px-4 max-w-5xl mx-auto overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-black capitalize tracking-tight mb-8 text-center">
          <span className="text-white">UV Print</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-brand-purple to-brand-green animate-neon-gradient">
            Neon Signs
          </span>
        </h1>

        <UVInfoSection />
      </section>

      {/* Products Layout below */}
      <section className="pb-24">
        <ProductCarousel title="Shop UV Printed Neon" products={uvProducts} />
      </section>

      <GlobalFooter />
    </main>
  );
}


