import React from 'react';
import Image from 'next/image';

export function AboutUsMini() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Side: Text */}
        <div className="flex-1 text-center md:text-left space-y-8">
          <h2 className="text-5xl font-black tracking-tight text-white mb-2">
            Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">are we?</span>
          </h2>
          
          <div className="space-y-6 text-zinc-300 font-medium">
            <p className="text-xl text-white">
              At The Neon Stack, ambience isn't decoration—it's identity.
            </p>
            
            <p>
              Inspired by the vibrant, neon-lit streets of Southeast Asia, our founder returned to Mumbai with a single thought: <span className="italic text-white">"Why shouldn't our spaces tell stories like these?"</span>
            </p>
            
            <p>
              That vision became The Neon Stack. Today, we believe every great space deserves a visual signature that captures attention, sparks conversation, and creates unforgettable memories.
            </p>
          </div>
        </div>

        {/* Right Side: Mascot Image */}
        <div className="w-full md:w-1/2 flex justify-center relative mt-12 md:mt-0 pt-16">
          <div className="absolute inset-0 bg-[#eaff00]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 w-full max-w-[400px] aspect-square rounded-3xl border border-zinc-800 bg-zinc-900/50 flex items-end justify-center px-8 pb-0 pt-20">
            <Image 
              src="/mascot-image.png" 
              alt="Founders" 
              width={350} 
              height={450} 
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 origin-bottom absolute bottom-0"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
