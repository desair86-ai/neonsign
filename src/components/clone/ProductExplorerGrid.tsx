import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ProductExplorerGrid({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const categories = [
    {
      title: "Neon Signs",
      description: "Fixed color neon signs. Can be made waterproof to use outdoors.",
      label: "Fixed color",
      image: "/product-1.jpeg",
      linkText: "Customize Now",
      borderClass: "border-brand-purple/60 shadow-[0_0_25px_rgba(117,46,255,0.4)] group-hover:border-[#6eff86]/60 group-hover:shadow-[0_0_25px_rgba(110,255,134,0.4)]",
      badgeClass: "bg-brand-green text-black shadow-[0_0_12px_rgba(110,255,134,0.6)]",
      textClass: "text-brand-green"
    },
    {
      title: "FloRo Signs",
      description: "Color changeable neon signs with 200+ flow modes. Control from smartphone.",
      label: "Color changeable",
      image: "/product-2.jpeg",
      linkText: "Customize Now",
      borderClass: "border-brand-purple/60 shadow-[0_0_25px_rgba(117,46,255,0.4)] group-hover:border-[#6eff86]/60 group-hover:shadow-[0_0_25px_rgba(110,255,134,0.4)]",
      badgeClass: "bg-[#f967fb] text-black shadow-[0_0_12px_rgba(249,103,251,0.6)]",
      textClass: "text-[#f967fb]"
    },
    {
      title: "Business Logo",
      description: "Light UP your logo or any custom design into an LED Neon Sign.",
      label: "Logo Conversion",
      image: "/product-3.jpeg",
      linkText: "Enquire Now",
      borderClass: "border-brand-purple/60 shadow-[0_0_25px_rgba(117,46,255,0.4)] group-hover:border-[#6eff86]/60 group-hover:shadow-[0_0_25px_rgba(110,255,134,0.4)]",
      badgeClass: "bg-[#00e5ff] text-black shadow-[0_0_12px_rgba(0,229,255,0.6)]",
      textClass: "text-[#00e5ff]"
    },
    {
      title: "Best Sellers",
      description: "Shop from our unique collection of 500+ Neon Sign designs.",
      label: "Popular Choice",
      image: "/product-4.jpeg",
      linkText: "Shop Now",
      borderClass: "border-brand-purple/60 shadow-[0_0_25px_rgba(117,46,255,0.4)] group-hover:border-[#6eff86]/60 group-hover:shadow-[0_0_25px_rgba(110,255,134,0.4)]",
      badgeClass: "bg-[#fe8a2e] text-black shadow-[0_0_12px_rgba(254,138,46,0.6)]",
      textClass: "text-[#fe8a2e]"
    }
  ];

  return (
    <section className="py-20 max-w-[1600px] mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const href = cat.linkText && cat.linkText.toLowerCase().includes('custom') ? '/products/customize-neon-signs' : '/';
          return (
          <Link href={href} key={idx} className={`group relative rounded-2xl overflow-hidden block aspect-[4/5] border ${theme === 'light' ? 'bg-zinc-100' : 'bg-zinc-900'} ${cat.borderClass} transition-all duration-300`}>
            {/* Background Image */}
            <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${theme === 'light' ? '' : 'opacity-60'}`} style={{ backgroundImage: `url(${cat.image})` }} />
            
            {/* Overlay */}
            {theme === 'dark' && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            )}
            
            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              {cat.label && (
                <span className={`absolute top-6 left-6 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${cat.badgeClass}`}>
                  {cat.label}
                </span>
              )}
              
              <h3 className="text-3xl font-black mb-3 text-white drop-shadow-md">{cat.title}</h3>
              <p className="text-sm mb-6 line-clamp-2 text-gray-200 drop-shadow-md">{cat.description}</p>
              
              <div className={`inline-flex items-center ${cat.textClass} font-bold group-hover:text-white drop-shadow-md transition-colors`}>
                {cat.linkText} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        )})}
      </div>

    </section>
  );
}
