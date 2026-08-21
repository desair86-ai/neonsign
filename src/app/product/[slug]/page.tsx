import { getProduct } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header } from "@/components/clone/Header";
import { Footer } from "@/components/clone/Footer";
import ProductAddToCartButton from "@/components/clone/ProductAddToCartButton";

export const revalidate = 60; // Revalidate every minute

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  return {
    title: product ? `${product.name} | Neon Stack` : 'Product Not Found',
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const regularPrice = product.regularPrice || product.price || "Rs. 0";
  const salePrice = product.salePrice || product.price || "Rs. 0";
  const displayPrice = parseFloat(salePrice.replace(/[^0-9.]/g, '') || '0');

  return (
    <main className="min-h-screen bg-[#080808] flex flex-col">
      <Header />
      
      <main className="pt-32 pb-20 px-4 max-w-6xl mx-auto w-full relative z-10 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-black/60 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
          
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
            {product.onSale && (
              <span className="absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider shadow-[0_0_15px_rgba(110,255,134,0.8)] bg-gradient-to-r from-[#6eff86] via-[#752eff] to-[#bca9ff] bg-[length:200%_200%] animate-neon-gradient text-black">
                Sale
              </span>
            )}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${product.image?.sourceUrl || '/5580.webp'})` }}
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 text-2xl font-bold mb-8">
              {product.onSale && (
                <span className="text-gray-500 line-through">
                  {regularPrice}
                </span>
              )}
              <span className="text-[#6eff86] drop-shadow-[0_0_8px_rgba(110,255,134,0.6)]">
                {salePrice}
              </span>
            </div>

            <div 
              className="prose prose-invert prose-brand max-w-none text-zinc-300 mb-10"
              dangerouslySetInnerHTML={{ __html: product.description || '<p>No description available.</p>' }}
            />

            <ProductAddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: displayPrice,
                image: product.image?.sourceUrl || '/5580.webp'
              }} 
            />
          </div>

        </div>
      </main>

      <Footer />
    </main>
  );
}
