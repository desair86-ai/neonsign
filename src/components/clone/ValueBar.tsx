import React from 'react';
import { Shield, Sparkles, Lightbulb, HeartHandshake, Gem, Users } from 'lucide-react';

export function ValueBar() {
  const values = [
    { 
      icon: <Shield className="w-8 h-8 text-brand-green drop-shadow-[0_0_12px_rgba(110,255,134,0.8)]" strokeWidth={1.5} />, 
      text: "Uncompromising Trust",
    },
    { 
      icon: <Sparkles className="w-8 h-8 text-brand-purple drop-shadow-[0_0_12px_rgba(117,46,255,0.8)]" strokeWidth={1.5} />, 
      text: "Premium Quality",
    },
    { 
      icon: <Lightbulb className="w-8 h-8 text-brand-lavender drop-shadow-[0_0_12px_rgba(188,169,255,0.8)]" strokeWidth={1.5} />, 
      text: "Constant Innovation",
    },
    { 
      icon: <HeartHandshake className="w-8 h-8 text-brand-green drop-shadow-[0_0_12px_rgba(110,255,134,0.8)]" strokeWidth={1.5} />, 
      text: "Strong Ethics",
    },
    { 
      icon: <Gem className="w-8 h-8 text-brand-purple drop-shadow-[0_0_12px_rgba(117,46,255,0.8)]" strokeWidth={1.5} />, 
      text: "Premium Service",
    },
    { 
      icon: <Users className="w-8 h-8 text-brand-lavender drop-shadow-[0_0_12px_rgba(188,169,255,0.8)]" strokeWidth={1.5} />, 
      text: "Client Relationships",
    },
  ];

  // Duplicate for seamless marquee
  const marqueeItems = [...values, ...values, ...values, ...values];

  return (
    <div className="w-full bg-zinc-950 border-y border-brand-green/20 py-8 overflow-hidden relative z-20">
      {/* Gradient Fades for edges */}
      <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
      <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
      
      <div className="flex w-max animate-marquee hover:animation-play-state-paused hover-pause">
        {marqueeItems.map((val, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-4 px-10 md:px-16 group cursor-default"
          >
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              {val.icon}
            </div>
            <span className="text-zinc-200 font-bold text-lg md:text-2xl whitespace-nowrap tracking-wide group-hover:text-white transition-colors">
              {val.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
