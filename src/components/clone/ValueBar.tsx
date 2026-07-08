import React from 'react';
import { Wrench, Package, BadgeCheck, Users, Award, HandHeart, Star } from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';

export function ValueBar() {
  const values = [
    { 
      icon: <Wrench className="w-7 h-7 text-[#6eff86] drop-shadow-[0_0_10px_rgba(110,255,134,0.6)]" />, 
      text: "2 Mins Installation",
      color: "#752eff"
    },
    { 
      icon: <Package className="w-7 h-7 text-[#752eff] drop-shadow-[0_0_10px_rgba(117,46,255,0.6)]" />, 
      text: "100% Timely Delivery",
      color: "#6eff86"
    },
    { 
      icon: <BadgeCheck className="w-7 h-7 text-[#6eff86] drop-shadow-[0_0_10px_rgba(110,255,134,0.6)]" />, 
      text: "2 Year Warranty",
      color: "#752eff"
    },
    { 
      icon: (
        <div className="relative">
          <Users className="w-7 h-7 text-[#752eff] drop-shadow-[0_0_10px_rgba(117,46,255,0.6)]" />
          <Star className="w-3.5 h-3.5 text-[#6eff86] absolute -top-1.5 -right-1.5 fill-[#6eff86] drop-shadow-[0_0_5px_rgba(110,255,134,0.8)]" />
        </div>
      ), 
      text: "4.8 Rating by 20K+",
      color: "#6eff86"
    },
    { 
      icon: <Award className="w-7 h-7 text-[#6eff86] drop-shadow-[0_0_10px_rgba(110,255,134,0.6)]" />, 
      text: "Top-Notch Quality",
      color: "#752eff"
    },
    { 
      icon: <HandHeart className="w-7 h-7 text-[#752eff] drop-shadow-[0_0_10px_rgba(117,46,255,0.6)]" />, 
      text: "Value for Money",
      color: "#6eff86"
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {values.map((val, idx) => (
          <div 
            key={idx} 
            className="relative flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-black/20 hover:bg-white/[0.06] hover:border-black/40 transition-all duration-300 group cursor-default shadow-lg overflow-hidden"
          >
            <BorderBeam duration={12} borderWidth={1.5} lightColor={val.color} />
            <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
              {val.icon}
            </div>
            <span className="text-white/70 font-medium text-sm text-center tracking-wide group-hover:text-white transition-colors duration-300">
              {val.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
