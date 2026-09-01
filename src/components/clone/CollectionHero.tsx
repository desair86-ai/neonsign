import React from 'react';

export function CollectionHero() {
  return (
    <div className="w-full py-16 md:py-24 px-4 bg-zinc-950 border-b border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6">
          <span className="text-white">Our Complete </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
            Collection
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light">
          Explore our full range of premium, handcrafted neon signs. Find the perfect glow to elevate your space, with no distractions.
        </p>
      </div>
    </div>
  );
}
