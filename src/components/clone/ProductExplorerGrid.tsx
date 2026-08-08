"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowCardColorTheme } from '@/components/ui/spotlight-card';

export function ProductExplorerGrid({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const categories: Array<{
    title: string;
    description: string;
    label: string;
    image: string;
    linkText: string;
    badgeClass: string;
    textClass: string;
    glowTheme: GlowCardColorTheme;
    colSpan?: string;
  }> = [
    {
      title: "Neon Signs",
      description: "Fixed color neon signs. Can be made waterproof to use outdoors.",
      label: "Fixed color",
      image: "/5580.webp",
      linkText: "Customize Now",
      badgeClass: "bg-brand-green text-black shadow-[0_0_12px_rgba(110,255,134,0.6)]",
      textClass: "text-brand-green",
      glowTheme: "green",
      colSpan: "md:col-span-2 md:row-span-2", // Large primary card
    },
    {
      title: "Mojo Mix Signs",
      description: "Color changeable neon signs with 200+ flow modes.",
      label: "Color changeable",
      image: "/5591.webp",
      linkText: "Customize Now",
      badgeClass: "bg-[#f967fb] text-black shadow-[0_0_12px_rgba(249,103,251,0.6)]",
      textClass: "text-[#f967fb]",
      glowTheme: "pink",
      colSpan: "md:col-span-1",
    },
    {
      title: "UV Printed Neon",
      description: "Complex graphics and logos with neon outlining.",
      label: "Intricate Design",
      image: "/5597.webp",
      linkText: "Customize Now",
      badgeClass: "bg-[#00e5ff] text-black shadow-[0_0_12px_rgba(0,229,255,0.6)]",
      textClass: "text-[#00e5ff]",
      glowTheme: "blue",
      colSpan: "md:col-span-1",
    },
    {
      title: "The spotlight Collection",
      description: "Shop from our unique collection of 500+ Neon Sign designs.",
      label: "Popular Choice",
      image: "/5593.webp",
      linkText: "Shop Now",
      badgeClass: "bg-[#fe8a2e] text-black shadow-[0_0_12px_rgba(254,138,46,0.6)]",
      textClass: "text-[#fe8a2e]",
      glowTheme: "orange",
      colSpan: "md:col-span-2", // Wide secondary card
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-24 max-w-[1600px] mx-auto px-4 bg-zinc-950">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
          <span className="text-white">Spaces</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
            We Illuminate
          </span>
        </h2>
        <p className="text-xl text-zinc-400 font-light">From businesses that want to stand out to homes that deserve a personal touch.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
      >
        {categories.map((cat, idx) => {
          const href = cat.linkText && cat.linkText.toLowerCase().includes('custom') ? '/products/customize-neon-signs' : '/';
          return (
            <motion.div key={idx} variants={itemVariants} className={`relative block h-full ${cat.colSpan}`}>
              <div className="h-full w-full group relative rounded-3xl overflow-hidden">
                
                <Link 
                  href={href} 
                  className={`relative z-10 block h-full w-full overflow-hidden border transition-all duration-300 bg-zinc-900 ${
                    cat.glowTheme === 'green' ? 'border-[#6eff86]/40 shadow-[0_0_15px_rgba(110,255,134,0.2)] group-hover:border-[#6eff86] group-hover:shadow-[0_0_30px_rgba(110,255,134,0.6)]' :
                    cat.glowTheme === 'pink' ? 'border-[#f967fb]/40 shadow-[0_0_15px_rgba(249,103,251,0.2)] group-hover:border-[#f967fb] group-hover:shadow-[0_0_30px_rgba(249,103,251,0.6)]' :
                    cat.glowTheme === 'blue' ? 'border-[#00e5ff]/40 shadow-[0_0_15px_rgba(0,229,255,0.2)] group-hover:border-[#00e5ff] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]' :
                    'border-[#fe8a2e]/40 shadow-[0_0_15px_rgba(254,138,46,0.2)] group-hover:border-[#fe8a2e] group-hover:shadow-[0_0_30px_rgba(254,138,46,0.6)]'
                  }`}
                >
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-70`} 
                    style={{ backgroundImage: `url(${cat.image})` }} 
                  />
                  
                  {/* Subtle Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                    {cat.label && (
                      <span className={`self-start mb-auto text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider ${cat.badgeClass}`}>
                        {cat.label}
                      </span>
                    )}
                    
                    <h3 className="text-3xl md:text-4xl font-black mb-3 text-white drop-shadow-md">{cat.title}</h3>
                    
                    {/* Tagline Slide-Up */}
                    <div className="overflow-hidden">
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="opacity-80 group-hover:opacity-100 transition-opacity"
                      >
                        <p className="text-sm md:text-base mb-6 line-clamp-2 text-zinc-300">{cat.description}</p>
                        
                        <div className={`inline-flex items-center ${cat.textClass} font-bold transition-colors uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform duration-300`}>
                          {cat.linkText} <ArrowRight className="ml-2 w-5 h-5" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
