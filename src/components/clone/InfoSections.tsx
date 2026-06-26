import React from 'react';
import { Truck, Palette, Sparkles } from 'lucide-react';

export function InfoSections() {
  return (
    <>
      {/* FloRo Promo */}
      <section className="relative py-24 my-20 bg-zinc-900 border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-black to-black z-0 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            NEW TECHNOLOGY
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">FloRo</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Unlimited color changing options, 200+ flow modes, music sync, and app control. It's not just a sign, it's an experience.
          </p>
          <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wide hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Explore FloRo Collection
          </button>
        </div>
      </section>

      {/* How to Order Steps */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">How it Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-zinc-800 via-pink-500/50 to-zinc-800 z-0" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl">
              <Palette className="w-10 h-10 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">1. You Tell Us</h3>
            <p className="text-gray-400">Share your vision, text, logo, or choose from our huge collection of pre-designed neon signs.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl">
              <Sparkles className="w-10 h-10 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">2. We Create</h3>
            <p className="text-gray-400">Our expert craftsmen handcraft your sign using premium quality acrylic and LED flex.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl">
              <Truck className="w-10 h-10 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">3. We Deliver</h3>
            <p className="text-gray-400">Your perfectly packed custom neon sign is shipped quickly and safely to your doorstep.</p>
          </div>
        </div>
      </section>
    </>
  );
}
