import React from 'react';
import Link from 'next/link';

import { ArrowRight, Sparkles } from 'lucide-react';

export function SpecialSigns() {
  const signs = [
    { title: 'Custom Neon Sign', desc: 'Design your own text or logo', link: '/products/customize-neon-signs', image: '/sign.png' },
    { title: 'Mojo Neon Sign', desc: 'Next-gen RGB dynamic lighting', link: '/products/customize-mojo-mix', image: '/heroimage2.png' },
    { title: 'UV Printed Neon', desc: 'Intricate designs with UV backing', link: '/products/uv-printed-neon', image: '/planet_uv_printed_led_neon_light.webp' },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black mb-4">Our Special <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-purple">Neon Signs</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Choose from our premium range of custom manufacturing options to perfectly suit your space.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {signs.map((sign, i) => (
          <Link 
            href={sign.link} 
            key={i} 
            className="group flex flex-col rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[#6eff86] hover:shadow-[0_0_25px_rgba(110,255,134,0.4)] transition-all duration-500"
          >
            <div className="relative aspect-square overflow-hidden bg-black">
              <img 
                src={sign.image} 
                alt={sign.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            
            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-black mb-2 text-white group-hover:text-[#6eff86] transition-colors">{sign.title}</h3>
              <p className="text-gray-400 mb-6 flex-1">{sign.desc}</p>
              
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#6eff86]" />
                  Neon Sign
                </span>
                <span className="inline-flex items-center text-sm font-bold text-[#6eff86] drop-shadow-[0_0_6px_rgba(110,255,134,0.5)] group-hover:text-white transition-colors">
                  Explore Now <ArrowRight className="ml-1.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
