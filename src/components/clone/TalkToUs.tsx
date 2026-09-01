import React from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function TalkToUs() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto relative rounded-[32px] overflow-hidden bg-[#0d0d0d] border border-zinc-800 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
        
        {/* Abstract Background Glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-green/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Left Side: Content */}
        <div className="flex-1 relative z-10 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple font-bold text-sm mb-4">
            <MessageCircle className="w-4 h-4" />
            Direct Support
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Got a custom idea? <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">Let's craft it.</span>
          </h2>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-lg font-medium leading-relaxed">
            Skip the generic forms. Chat with us directly to share your vision, get a free personalized 3D mockup, and finalize your unique neon sign in minutes.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="https://wa.me/YOUR_NUMBER_HERE" 
              target="_blank"
              className="group relative inline-flex items-center justify-center gap-3 bg-[#111] border border-[#25D366] hover:bg-[#25D366] text-[#25D366] hover:text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 w-full sm:w-auto overflow-hidden shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-lg">Chat on WhatsApp</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Mascot */}
        <div className="w-full md:w-[40%] flex justify-center relative z-10">
          <div className="relative w-full max-w-[350px] aspect-square flex items-center justify-center">
            {/* Pulsing rings behind mascot */}
            <div className="absolute inset-0 rounded-full border border-brand-green/20 animate-[ping_3s_ease-in-out_infinite]" />
            <div className="absolute inset-4 rounded-full border border-brand-purple/20 animate-[ping_4s_ease-in-out_infinite]" />
            
            <Image 
              src="/mascot-image.png" 
              alt="Neon Stack Mascot" 
              width={350} 
              height={350} 
              className="relative z-10 drop-shadow-[0_0_30px_rgba(234,255,0,0.3)] object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
