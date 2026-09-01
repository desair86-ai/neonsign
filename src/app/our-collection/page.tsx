import React from "react";
import { Header } from "@/components/clone/Header";
import { GlobalFooter } from "@/components/clone/GlobalFooter";
import { MainBanner } from "@/components/clone/MainBanner";
import { SpecialSigns } from "@/components/home2/SpecialSigns";
import { ProductCarousel } from "@/components/clone/ProductCarousel";
import { CuratedFavourites } from "@/components/clone/CuratedFavourites";
import { ProblemSolutionCards } from "@/components/clone/ProblemSolutionCards";
import { ExploreCollections } from "@/components/clone/ExploreCollections";
import { TalkToUs } from "@/components/clone/TalkToUs";
import { AboutUsMini } from "@/components/clone/AboutUsMini";
import { WhatsInTheBox } from "@/components/clone/WhatsInTheBox";
import { GoogleReviews } from "@/components/clone/GoogleReviews";
import { getProducts, getProductCategories } from "@/lib/wordpress";

export default async function OurCollectionPage() {
  const bestsellers = await getProducts(undefined, 8, "popularity");
  const trending = await getProducts(undefined, 8, "date");
  const curated = await getProducts("curated-favourites", 20);
  const categories = await getProductCategories();
  
  const mapProducts = (products: any[]) => products.map((p: any) => ({
    id: p.id,
    name: p.name,
    regularPrice: p.regularPrice || p.price || "Rs. 0",
    salePrice: p.salePrice || p.price || "Rs. 0",
    discountBadge: p.onSale ? "Sale" : undefined,
    image: p.image?.sourceUrl || "",
    slug: p.slug,
    databaseId: p.databaseId
  })).filter((p: any) => p.image && !p.image.includes("placeholder"));

  const displayBestsellers = mapProducts(bestsellers);
  const displayTrending = mapProducts(trending);
  const displayCurated = mapProducts(curated);

  const displayCategories = categories.map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    image: c.image?.sourceUrl || ""
  })).filter((c: any) => c.name !== "Uncategorized");

  return (
    <main className="bg-black min-h-screen">
      <Header />
      
      {/* 1. Home Page Banner */}
      <MainBanner />

      {/* 2. Highlighted Products (Custom, Mojo, UV) */}
      <SpecialSigns />

      {/* 3. Category 1 (Bestsellers) */}
      {displayBestsellers.length > 0 && (
        <ProductCarousel title="Bestsellers" products={displayBestsellers} theme="dark" />
      )}

      {/* 5. Talk To Us (Steps + Mascot) */}
      <TalkToUs />

      {/* 6. Category 2 (Trending Now) */}
      {displayTrending.length > 0 && (
        <ProductCarousel title="Trending Now" products={displayTrending} theme="dark" />
      )}

      {/* 7. Problem & Solution Section */}
      <ProblemSolutionCards />

      {/* 8. Category 3 (Curated Favourites) */}
      {displayCurated.length > 0 && (
        <CuratedFavourites products={displayCurated} />
      )}

      {/* 9. Who Are We? (Founders/Mascot) */}
      <AboutUsMini />

      {/* 10. Another Category (New Arrivals) */}
      {displayTrending.length > 0 && (
        <ProductCarousel title="New Arrivals" products={displayTrending.slice().reverse()} theme="dark" />
      )}

      {/* 11. Google Reviews */}
      <GoogleReviews />

      <GlobalFooter />
    </main>
  );
}


