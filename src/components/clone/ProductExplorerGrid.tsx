import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ProductExplorerGrid() {
  const categories = [
    {
      title: "Neon Signs",
      description: "Fixed color neon signs. Can be made waterproof to use outdoors.",
      label: "Fixed color",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
      linkText: "Customize Now"
    },
    {
      title: "FloRo Signs",
      description: "Color changeable neon signs with 200+ flow modes. Control from smartphone.",
      label: "Color changeable",
      image: "https://images.unsplash.com/photo-1563242048-b47bd65f2129?q=80&w=800&auto=format&fit=crop",
      linkText: "Customize Now"
    },
    {
      title: "Business Logo",
      description: "Light UP your logo or any custom design into an LED Neon Sign.",
      label: "",
      image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=800&auto=format&fit=crop",
      linkText: "Enquire Now"
    },
    {
      title: "Best Sellers",
      description: "Shop from our unique collection of 500+ Neon Sign designs.",
      label: "",
      image: "https://images.unsplash.com/photo-1493707553966-283afac8c358?q=80&w=800&auto=format&fit=crop",
      linkText: "Shop Now"
    }
  ];

  return (
    <section className="py-20 max-w-[1600px] mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const href = cat.linkText && cat.linkText.toLowerCase().includes('custom') ? '/products/customize-neon-signs' : '/';
          return (
          <Link href={href} key={idx} className="group relative rounded-2xl overflow-hidden block aspect-[4/5] bg-zinc-900 border border-white/10 hover:border-pink-500/50 transition-colors">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60" style={{ backgroundImage: `url(${cat.image})` }} />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              {cat.label && (
                <span className="absolute top-6 left-6 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {cat.label}
                </span>
              )}
              
              <h3 className="text-3xl font-black mb-3 text-white">{cat.title}</h3>
              <p className="text-gray-300 text-sm mb-6 line-clamp-2">{cat.description}</p>
              
              <div className="inline-flex items-center text-[#cfff00] font-bold group-hover:text-white transition-colors">
                {cat.linkText} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        )})}
      </div>

      {/* Brand Story Snippet */}
      <div className="mt-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">100% Homegrown, Expertly Crafted</h2>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          All our products are handmade in India with flawless finishing. That enables us to create 100% customized Neon Signs as per your preference. Just reach out to us and we’ll take care of it!
        </p>
        <button className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-colors">
          Reach out to us
        </button>
      </div>
    </section>
  );
}
