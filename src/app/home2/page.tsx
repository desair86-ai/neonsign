import React from "react";
import { Header2 } from "@/components/home2/Header2";
import { HeroBanner } from "@/components/home2/HeroBanner";
import { CategoryScroll } from "@/components/home2/CategoryScroll";
import { SpecialSigns } from "@/components/home2/SpecialSigns";
import { BestSellers } from "@/components/home2/BestSellers";
import { Stories } from "@/components/clone/Stories";
import { SpacesWeIlluminate } from "@/components/home2/SpacesWeIlluminate";
import { GlobalFooter } from "@/components/clone/GlobalFooter";
import { getProducts } from "@/lib/wordpress";

export default async function Home2() {
  const wpProducts = await getProducts(undefined, 20, undefined, true);

  const mappedProducts = wpProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    regularPrice: p.regularPrice || p.price || "Rs. 0",
    salePrice: p.salePrice || p.price || "Rs. 0",
    discountBadge: p.onSale ? "Sale" : undefined,
    image: p.image?.sourceUrl || "",
    slug: p.slug,
    databaseId: p.databaseId
  }));

  const displayProducts = mappedProducts.filter((p: any) => p.image && !p.image.includes("placeholder"));
  return (
    <main className="bg-black min-h-screen text-white">
      <Header2 />
      <HeroBanner />
      <CategoryScroll />
      <SpecialSigns />
      {displayProducts.length > 0 && <BestSellers products={displayProducts} />}
      <Stories />
      <SpacesWeIlluminate />
      <GlobalFooter />
    </main>
  );
}


