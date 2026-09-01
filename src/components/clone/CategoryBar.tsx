import React from 'react';
import { getProductCategories } from '@/lib/wordpress';

export async function CategoryBar({ theme = "dark" }: { theme?: "light" | "dark" }) {
  // Fetch dynamic categories from WordPress
  const wpCategories = await getProductCategories();
  
  // Map WP categories. If none exist, fallback to an empty array.
  // Add a "Shop All" fallback as the first item if needed.
  let categories = wpCategories.map((cat: any) => ({
    name: cat.name,
    image: cat.image?.sourceUrl || "",
    slug: cat.slug
  }));

  // Limit to a reasonable number to prevent massive marquees, or keep all.
  if (categories.length === 0) {
    return null;
  }

  const duplicatedCategories = [...categories, ...categories, ...categories]; // Triple it to ensure smooth infinite scroll if few categories

  return (
    <div className={`w-full py-6 border-b overflow-hidden ${theme === 'light' ? 'bg-white border-black/10' : 'bg-black border-white/10'}`}>
      <div className="relative flex w-full">
        {/* Sliding Marquee Container */}
        <div className="flex animate-marquee whitespace-nowrap min-w-full gap-6 md:gap-8 hover-pause cursor-pointer">
          {duplicatedCategories.map((cat, idx) => (
            <a 
              key={`${cat.slug}-${idx}`}
              href={`/shop-neon-collection?cat=${cat.slug}`} 
              className="group flex flex-col items-center gap-3 flex-shrink-0"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 ${idx % categories.length === 0 ? 'border-brand-purple shadow-[0_0_12px_rgba(117,46,255,0.4)]' : 'border-transparent'} group-hover:border-brand-purple group-hover:shadow-[0_0_12px_rgba(117,46,255,0.4)] transition-all p-1`}>
                <div 
                  className="w-full h-full rounded-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
              </div>
              <span className={`text-sm font-bold transition-colors group-hover:text-brand-purple ${idx % categories.length === 0 ? 'text-brand-purple' : (theme === 'light' ? 'text-black' : 'text-white')}`}>
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
