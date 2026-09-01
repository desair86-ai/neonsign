"use client";
import React from 'react';
import { Truck, Palette, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ButtonParticles } from '@/components/ui/button-particles';

export function InfoSections() {
  return (
    <>
      {/* Mojo Mix Promo */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full md:w-1/2 flex flex-col items-start text-left"
          >
            <div className="inline-block bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-4">
              NEW TECHNOLOGY
            </div>
            
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/neon-stack-logo.svg" 
              alt="Neon Stack Logo" 
              className="h-16 md:h-20 mb-6 object-contain" 
            />
            
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Meet <br className="hidden md:block" /><span className="text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-green drop-shadow-lg">Mojo Mix</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-xl mb-10 leading-relaxed">
              Unlimited color changing options, 200+ flow modes, music sync, and app control. It&apos;s not just a sign, it&apos;s an experience.
            </p>
            <ButtonParticles href="/products/customize-mojo-mix" label="Explore Mojo Mix Collection" className="w-fit" />
          </motion.div>

          {/* Right Mascot Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full md:w-1/2 flex justify-center items-center relative"
          >
            {/* Glow behind the mascot */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-green/20 opacity-60 blur-[100px] z-0 rounded-full" />
            
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/mascot-image.png" 
              alt="Neon Stack Mascot" 
              className="relative z-10 w-auto h-auto max-w-full md:h-[650px] object-contain drop-shadow-[0_0_30px_rgba(110,255,134,0.4)]"
            />
          </motion.div>
          
        </div>
      </section>

      {/* How to Order Steps */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-center whitespace-nowrap">How it Works</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-zinc-800 via-brand-purple/50 to-zinc-800 z-0" />
          
          <div className="relative z-10 flex flex-col items-center group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl group-hover:border-brand-green group-hover:shadow-[0_0_25px_rgba(110,255,134,0.4)] transition-all duration-300">
              <Palette className="w-10 h-10 text-brand-purple group-hover:text-brand-green drop-shadow-[0_0_8px_rgba(117,46,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(110,255,134,0.8)] transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-green transition-colors duration-300">1. Share your design Ideas</h3>
            <p className="text-gray-400">Share your vision, text, logo, or choose from our huge collection of pre-designed neon signs.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl group-hover:border-brand-green group-hover:shadow-[0_0_25px_rgba(110,255,134,0.4)] transition-all duration-300">
              <Sparkles className="w-10 h-10 text-brand-purple group-hover:text-brand-green drop-shadow-[0_0_8px_rgba(117,46,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(110,255,134,0.8)] transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-green transition-colors duration-300">2. We create the neon signages</h3>
            <p className="text-gray-400">Our expert craftsmen handcraft your sign using premium quality acrylic and LED flex.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl group-hover:border-brand-green group-hover:shadow-[0_0_25px_rgba(110,255,134,0.4)] transition-all duration-300">
              <Truck className="w-10 h-10 text-brand-purple group-hover:text-brand-green drop-shadow-[0_0_8px_rgba(117,46,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(110,255,134,0.8)] transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-green transition-colors duration-300">3. We deliver</h3>
            <p className="text-gray-400">Your perfectly packed custom neon sign is shipped quickly and safely to your doorstep.</p>
          </div>
        </div>
      </section>
    </>
  );
}
