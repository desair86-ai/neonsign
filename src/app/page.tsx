import React from "react";
import { Header } from "@/components/clone/Header";
import { SpliteInteractive } from "@/components/clone/Splite";
import { ValueBar } from "@/components/clone/ValueBar";
import { ProductExplorerGrid } from "@/components/clone/ProductExplorerGrid";
import { CuratedFavourites } from "@/components/clone/CuratedFavourites";
import { Stories } from "@/components/clone/Stories";
import { Features } from "@/components/clone/Features";
import { InfoSections } from "@/components/clone/InfoSections";
import { FAQ } from "@/components/clone/FAQ";
import { Footer } from "@/components/clone/Footer";
import { getProducts } from "@/lib/wordpress";

export default async function Home() {
  const wpProducts = await getProducts("curated-favourites", 8); // fetch 8 products

  const mappedProducts = wpProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    regularPrice: p.regularPrice || p.price || "Rs. 0",
    salePrice: p.salePrice || p.price || "Rs. 0",
    discountBadge: p.onSale ? "Sale" : undefined,
    image: p.image?.sourceUrl || "/5580.webp"
  }));

  const displayProducts = mappedProducts.length > 0 ? mappedProducts : []; // Fallback empty if nothing fetched

  return (
    <main>
      <Header />
      <SpliteInteractive />
      <ValueBar />
      <ProductExplorerGrid />
      <CuratedFavourites products={displayProducts} />
      <Stories />
      <Features />
      <InfoSections />
      <FAQ />
      <Footer />
    </main>
  );
}
