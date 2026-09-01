import React from "react";
import { Header } from "@/components/clone/Header";
import { MainBanner } from "@/components/clone/MainBanner";
import { ValueBar } from "@/components/clone/ValueBar";
import { ProductExplorerGrid } from "@/components/clone/ProductExplorerGrid";
import { Stories } from "@/components/clone/Stories";
import { Features } from "@/components/clone/Features";
import { InfoSections } from "@/components/clone/InfoSections";
import { FAQ } from "@/components/clone/FAQ";
import { GlobalFooter } from "@/components/clone/GlobalFooter";
import { getProducts, getProductCategories } from "@/lib/wordpress";
import { CuratedFavourites } from "@/components/clone/CuratedFavourites";
import { SpecialSigns } from "@/components/home2/SpecialSigns";

export default async function Home() {
  const wpCategories = await getProductCategories();
  // Fetch up to 20 products from the "curated-favourites" category
  const wpProducts = await getProducts("curated-favourites", 20);

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

  // Only keep products that actually have an image (no proxy/placeholder products)
  const displayProducts = mappedProducts.filter((p: any) => p.image && !p.image.includes("placeholder"));

  const glowThemes = ["green", "blue", "orange", "pink", "purple"];
  const mappedCategories = wpCategories.map((cat: any, i: number) => {
    const theme = glowThemes[i % glowThemes.length];
    
    let badgeClass = "";
    let textClass = "";
    if (theme === "green") { badgeClass = "bg-brand-green text-black shadow-[0_0_12px_rgba(110,255,134,0.6)]"; textClass = "text-brand-green"; }
    else if (theme === "blue") { badgeClass = "bg-[#00e5ff] text-black shadow-[0_0_12px_rgba(0,229,255,0.6)]"; textClass = "text-[#00e5ff]"; }
    else if (theme === "orange") { badgeClass = "bg-[#fe8a2e] text-black shadow-[0_0_12px_rgba(254,138,46,0.6)]"; textClass = "text-[#fe8a2e]"; }
    else if (theme === "pink") { badgeClass = "bg-[#f967fb] text-black shadow-[0_0_12px_rgba(249,103,251,0.6)]"; textClass = "text-[#f967fb]"; }
    else if (theme === "purple") { badgeClass = "bg-[#ca6eff] text-black shadow-[0_0_12px_rgba(202,110,255,0.6)]"; textClass = "text-[#ca6eff]"; }

    return {
      title: cat.name,
      description: cat.description || `Explore our ${cat.name} collection.`,
      label: cat.name,
      image: cat.image?.sourceUrl || "",
      linkText: `Shop ${cat.name}`,
      href: `/shop-neon-collection?cat=${cat.slug}`,
      badgeClass,
      textClass,
      glowTheme: theme,
    };
  }).filter((c: any) => c.title !== "Uncategorized" && c.title !== "Curated Favourites");

  return (
    <main>
      <Header />
      <MainBanner />
      <ValueBar />
      <ProductExplorerGrid categories={mappedCategories as any} />
      <SpecialSigns />
      {displayProducts.length > 0 && <CuratedFavourites products={displayProducts} />}
      <Stories />
      <Features />
      <InfoSections />
      <FAQ />
      <GlobalFooter />
    </main>
  );
}


