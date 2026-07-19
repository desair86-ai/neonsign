import React from 'react';
import { Wrench, Package, BadgeCheck, Users, Award, HandHeart, Star } from 'lucide-react';

export function ValueBar() {
  const values = [
    { 
      icon: <BadgeCheck className="w-8 h-8 text-[#00e5ff] drop-shadow-[0_0_12px_rgba(0,229,255,0.8)]" strokeWidth={1.5} />, 
      text: "Top-Notch Quality",
    },
    { 
      icon: <HandHeart className="w-8 h-8 text-[#752eff] drop-shadow-[0_0_12px_rgba(117,46,255,0.8)]" strokeWidth={1.5} />, 
      text: "Value for Money",
    },
    { 
      icon: <Wrench className="w-8 h-8 text-[#00e5ff] drop-shadow-[0_0_12px_rgba(0,229,255,0.8)]" strokeWidth={1.5} />, 
      text: "2 Mins Installation",
    },
    { 
      icon: <Package className="w-8 h-8 text-[#00e5ff] drop-shadow-[0_0_12px_rgba(0,229,255,0.8)]" strokeWidth={1.5} />, 
      text: "100% Timely Delivery",
    },
    { 
      icon: <Award className="w-8 h-8 text-[#6eff86] drop-shadow-[0_0_12px_rgba(110,255,134,0.8)]" strokeWidth={1.5} />, 
      text: "2 Year Warranty",
    },
    { 
      icon: (
        <div className="relative">
          <Users className="w-8 h-8 text-[#eaff00] drop-shadow-[0_0_12px_rgba(234,255,0,0.8)]" strokeWidth={1.5} />
          <Star className="w-4 h-4 text-[#eaff00] absolute -top-1.5 -right-2 fill-[#eaff00] drop-shadow-[0_0_8px_rgba(234,255,0,0.9)]" />
        </div>
      ), 
      text: "4.8 Rating by 20K+ Customers",
    },
  ];

  // Duplicate for seamless marquee
  const marqueeItems = [...values, ...values, ...values, ...values];

  return (
    <div className="w-full bg-black/50 border-y border-white/5 py-6 overflow-hidden relative z-20 backdrop-blur-sm">
      {/* Gradient Fades for edges */}
      <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10" />
      
      <div className="flex w-max animate-marquee hover:animation-play-state-paused hover-pause">
        {marqueeItems.map((val, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-4 px-8 md:px-12 group cursor-default"
          >
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              {val.icon}
            </div>
            <span className="text-white font-bold text-lg md:text-xl whitespace-nowrap tracking-wide group-hover:text-gray-200 transition-colors">
              {val.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
