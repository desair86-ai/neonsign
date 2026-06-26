import React from 'react';
import { Wrench, Package, BadgeCheck, Users, Award, HandHeart, Star } from 'lucide-react';

export function ValueBar() {
  const values = [
    { 
      icon: <Wrench className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />, 
      text: "2 Mins Installation" 
    },
    { 
      icon: <Package className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />, 
      text: "100% Timely Delivery" 
    },
    { 
      icon: <BadgeCheck className="w-6 h-6 text-green-300 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" />, 
      text: "2 Year Warranty" 
    },
    { 
      icon: (
        <div className="relative">
          <Users className="w-6 h-6 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
          <Star className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 fill-yellow-400" />
        </div>
      ), 
      text: "4.8 Rating by 20K+ Customers" 
    },
    { 
      icon: <Award className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />, 
      text: "Top-Notch Quality" 
    },
    { 
      icon: <HandHeart className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />, 
      text: "Value for Money" 
    },
  ];

  // We duplicate the array to allow for seamless infinite scrolling
  const duplicatedValues = [...values, ...values];

  return (
    <div className="w-full bg-[#111] border-y border-white/10 py-4 overflow-hidden">
      <div className="relative flex w-full">
        {/* Marquee Container */}
        <div className="flex animate-marquee whitespace-nowrap min-w-full">
          {duplicatedValues.map((val, idx) => (
            <div key={idx} className="flex items-center gap-3 font-bold text-white text-base md:text-lg flex-shrink-0 mx-8">
              {val.icon}
              <span>{val.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
