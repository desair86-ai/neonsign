import React from "react";
import { Header } from "@/components/clone/Header";
import { CategoryBar } from "@/components/clone/CategoryBar";
import { ProductCarousel } from "@/components/clone/ProductCarousel";
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

  // Fetch from WP
  const wpProducts = await getProducts(categorySlug, 20);

  // Map WP products to the format expected by ProductCarousel
  const mappedProducts = wpProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    regularPrice: p.regularPrice || p.price || "Rs. 0",
    salePrice: p.salePrice || p.price || "Rs. 0",
    discountBadge: p.onSale ? "Sale" : undefined,
    image: p.image?.sourceUrl || "/5580.webp" // fallback image
  }));

  // For demonstration, let's just use the mapped products for both carousels for now.
  // We can show all products in one carousel or split them.
  const displayProducts = mappedProducts.length > 0 ? mappedProducts : [];

  return (
    <main>
      <Header />
      
      {/* Category Slider inside Collection page */}
      <CategoryBar />

      {/* Grids and Carousels Area */}
      <div className="w-full">
        
        {categorySlug && displayProducts.length > 0 && (
          <ProductCarousel title={`Products in ${categorySlug.replace(/-/g, ' ')}`} products={displayProducts} />
        )}

        {!categorySlug && displayProducts.length > 0 && (
          <>
            <ProductCarousel title="Curated Favourites" products={displayProducts.slice(0, 8)} />
            {displayProducts.length > 8 && (
              <ProductCarousel title="Trending" products={displayProducts.slice(8, 16)} />
            )}
          </>
        )}

        {displayProducts.length === 0 && (
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
