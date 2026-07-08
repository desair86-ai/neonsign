import React from 'react';
import { Truck, Palette, Sparkles } from 'lucide-react';

export function InfoSections() {
  return (
    <>
      {/* FloRo Promo */}
      <section className="relative py-24 my-20 overflow-hidden">
        {/* Animated Top Border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,#6eff86,#752eff,#6eff86)] bg-[length:200%_100%] animate-border-flow shadow-[0_0_10px_rgba(110,255,134,0.5)]" />
        
        {/* Animated Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,#752eff,#6eff86,#752eff)] bg-[length:200%_100%] animate-border-flow shadow-[0_0_10px_rgba(117,46,255,0.5)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            NEW TECHNOLOGY
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-green">FloRo</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Unlimited color changing options, 200+ flow modes, music sync, and app control. It&apos;s not just a sign, it&apos;s an experience.
          </p>
          <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wide hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Explore FloRo Collection
          </button>
        </div>
      </section>

      {/* How to Order Steps */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-1 h-[2px] relative overflow-hidden rounded-full scale-x-[-1]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_45%,#6eff86_50%,transparent_51%,transparent_100%)] bg-[length:200%_100%] animate-border-flow" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-center whitespace-nowrap">How it Works</h2>
          <div className="flex-1 h-[2px] relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_45%,#6eff86_50%,transparent_51%,transparent_100%)] bg-[length:200%_100%] animate-border-flow" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-zinc-800 via-brand-purple/50 to-zinc-800 z-0" />
          
          <div className="relative z-10 flex flex-col items-center group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl group-hover:border-brand-green group-hover:shadow-[0_0_25px_rgba(110,255,134,0.4)] transition-all duration-300">
              <Palette className="w-10 h-10 text-brand-purple group-hover:text-brand-green drop-shadow-[0_0_8px_rgba(117,46,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(110,255,134,0.8)] transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-green transition-colors duration-300">1. You Tell Us</h3>
            <p className="text-gray-400">Share your vision, text, logo, or choose from our huge collection of pre-designed neon signs.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl group-hover:border-brand-green group-hover:shadow-[0_0_25px_rgba(110,255,134,0.4)] transition-all duration-300">
              <Sparkles className="w-10 h-10 text-brand-purple group-hover:text-brand-green drop-shadow-[0_0_8px_rgba(117,46,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(110,255,134,0.8)] transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-green transition-colors duration-300">2. We Create</h3>
            <p className="text-gray-400">Our expert craftsmen handcraft your sign using premium quality acrylic and LED flex.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl group-hover:border-brand-green group-hover:shadow-[0_0_25px_rgba(110,255,134,0.4)] transition-all duration-300">
              <Truck className="w-10 h-10 text-brand-purple group-hover:text-brand-green drop-shadow-[0_0_8px_rgba(117,46,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(110,255,134,0.8)] transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-green transition-colors duration-300">3. We Deliver</h3>
            <p className="text-gray-400">Your perfectly packed custom neon sign is shipped quickly and safely to your doorstep.</p>
          </div>
        </div>
      </section>
    </>
  );
}
