import React from 'react';
import Image from 'next/image';

export function WhatsInTheBox() {
  return (
    <section className="py-20 px-4 bg-[#0a0a0a] border-y border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Everything You Need, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-green animate-neon-gradient">Right In The Box</span>
          </h2>
          <p className="mt-4 text-zinc-400">Unbox. Install. Glow. We provide all the essentials.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Remote Details */}
          <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-[#111] p-6 group hover:border-[#a36eff]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <Image 
              src="/remote-details.png"
              alt="Remote Details"
              width={800}
              height={800}
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>

          {/* Right: What's in the box */}
          <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-[#111] p-6 group hover:border-[#6eff86]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <Image 
              src="/whats-in-box.png"
              alt="Whats in the Box"
              width={800}
              height={800}
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
