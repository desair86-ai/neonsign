import React from "react";
import { Header } from "@/components/clone/Header";
import { CategoryBar } from "@/components/clone/CategoryBar";
import { ProductCarousel } from "@/components/clone/ProductCarousel";
import { CuratedFavourites } from "@/components/clone/CuratedFavourites";
import { ProductGrid } from "@/components/clone/ProductGrid";
import { AnimatedFeatures } from "@/components/ui/animated-features";
import { GlobalFooter } from "@/components/clone/GlobalFooter";
import { getProducts } from "@/lib/wordpress";
import { SortDropdown } from "@/components/clone/SortDropdown";

export default async function ShopNeonCollection({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
}) {
  const resolvedParams = await searchParams;
  const categorySlug = resolvedParams.cat;
  const currentSort = resolvedParams.sort;

  // Fetch from WP based on category and current sort
  const wpProducts = categorySlug ? await getProducts(categorySlug, 20, currentSort) : [];
  
  const curatedWpProducts = !categorySlug ? await getProducts("curated-favourites", 20, currentSort) : [];
  const trendingWpProducts = !categorySlug ? await getProducts(undefined, 8, currentSort) : []; // just get generic products for trending

  const mapProduct = (p: any) => ({
    id: p.id,
    name: p.name,
    regularPrice: p.regularPrice || p.price || "Rs. 0",
    salePrice: p.salePrice || p.price || "Rs. 0",
    discountBadge: p.onSale ? "Sale" : undefined,
    image: p.image?.sourceUrl || "",
    slug: p.slug,
    databaseId: p.databaseId
  });

  const displayProducts = wpProducts.map(mapProduct).filter((p: any) => p.image && !p.image.includes("placeholder"));
  const curatedProducts = curatedWpProducts.map(mapProduct).filter((p: any) => p.image && !p.image.includes("placeholder"));
  const trendingProducts = trendingWpProducts.map(mapProduct).filter((p: any) => p.image && !p.image.includes("placeholder"));

  return (
    <main>
      <Header />
      
      {/* Category Slider inside Collection page */}
      <CategoryBar />

      {/* Grids and Carousels Area */}
      <div className="w-full">
        
        {/* Render Sorting Dropdown */}
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10 mt-10 mb-4 flex justify-between items-center relative z-20">
          <p className="text-zinc-400 font-medium">
            {categorySlug 
              ? `Showing results for ${categorySlug.replace(/-/g, ' ')}` 
              : 'Showing all collections'}
          </p>
          <SortDropdown />
        </div>

        {categorySlug && displayProducts.length > 0 && (
          <ProductGrid title={`Products in ${categorySlug.replace(/-/g, ' ')}`} products={displayProducts} />
        )}

        {!categorySlug && (
          <>
            {curatedProducts.length > 0 && (
              <CuratedFavourites products={curatedProducts} />
            )}
            {trendingProducts.length > 0 && (
              <ProductCarousel title="Trending" products={trendingProducts} />
            )}
          </>
        )}

        {((categorySlug && displayProducts.length === 0) || (!categorySlug && curatedProducts.length === 0 && trendingProducts.length === 0)) && (
          <div className="py-20 text-center text-zinc-400">
            <h2 className="text-2xl font-bold mb-4">No products found</h2>
            <p>We couldn't find any products in this category.</p>
          </div>
        )}

        <AnimatedFeatures />
      </div>
      
      <GlobalFooter />
    </main>
  );
}


