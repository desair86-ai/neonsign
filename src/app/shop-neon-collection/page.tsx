import React from "react";
import { Header } from "@/components/clone/Header";
import { CategoryBar } from "@/components/clone/CategoryBar";
import { ProductCarousel } from "@/components/clone/ProductCarousel";
import { ProductGrid } from "@/components/clone/ProductGrid";
import { AnimatedFeatures } from "@/components/ui/animated-features";
import { Footer } from "@/components/clone/Footer";
import { getProducts } from "@/lib/wordpress";

export default async function ShopNeonCollection({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const resolvedParams = await searchParams;
  const categorySlug = resolvedParams.cat;

  // Fetch from WP based on category
  const wpProducts = categorySlug ? await getProducts(categorySlug, 20) : [];
  
  // If no category, fetch curated and generic trending products
  const curatedWpProducts = !categorySlug ? await getProducts("curated-favourites", 8) : [];
  const trendingWpProducts = !categorySlug ? await getProducts(undefined, 8) : []; // just get generic products for trending

  const mapProduct = (p: any) => ({
    id: p.id,
    name: p.name,
    regularPrice: p.regularPrice || p.price || "Rs. 0",
    salePrice: p.salePrice || p.price || "Rs. 0",
    discountBadge: p.onSale ? "Sale" : undefined,
    image: p.image?.sourceUrl || "/5580.webp",
    slug: p.slug,
    databaseId: p.databaseId
  });

  const displayProducts = wpProducts.map(mapProduct);
  const curatedProducts = curatedWpProducts.map(mapProduct);
  const trendingProducts = trendingWpProducts.map(mapProduct);

  return (
    <main>
      <Header />
      
      {/* Category Slider inside Collection page */}
      <CategoryBar />

      {/* Grids and Carousels Area */}
      <div className="w-full">
        
        {categorySlug && displayProducts.length > 0 && (
          <ProductGrid title={`Products in ${categorySlug.replace(/-/g, ' ')}`} products={displayProducts} />
        )}

        {!categorySlug && (
          <>
            {curatedProducts.length > 0 && (
              <ProductCarousel title="Curated Favourites" products={curatedProducts} />
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
      
      <Footer />
    </main>
  );
}
