import React from 'react';
import Link from 'next/link';
import { getProductCategories } from '@/lib/wordpress';

export async function CategoryScroll() {
  const wpCategories = await getProductCategories();
  if (!wpCategories || wpCategories.length === 0) return null;

  const categories = wpCategories.map((cat: any) => ({
    name: cat.name,
    image: cat.image?.sourceUrl || "",
    link: `/shop-neon-collection?cat=${cat.slug}`,
  }));

  return (
    <section className="py-12 bg-black border-y border-white/10 overflow-hidden">
      <div className="flex overflow-x-auto gap-6 px-4 pb-4 no-scrollbar scroll-smooth snap-x">
        {categories.map((cat: { name: string, image: string, link: string }, i: number) => (
          <Link 
            key={i} 
            href={cat.link}
            className="flex flex-col items-center gap-3 min-w-[120px] snap-center group"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#6eff86] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(110,255,134,0.4)]">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
