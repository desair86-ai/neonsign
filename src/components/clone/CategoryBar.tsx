import React from 'react';
import Link from 'next/link';

export function CategoryBar() {
  const categories = [
    { name: "Shop All", image: "https://images.unsplash.com/photo-1549419141-9457a44f0ceb?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Gods", image: "https://images.unsplash.com/photo-1563242048-b47bd65f2129?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Cafe", image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Cricket", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Wings", image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Table Top", image: "https://images.unsplash.com/photo-1493707553966-283afac8c358?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Millionaire", image: "https://images.unsplash.com/photo-1549419141-9457a44f0ceb?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Love", image: "https://images.unsplash.com/photo-1563242048-b47bd65f2129?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Cars", image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Gaming", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Gym", image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Kids", image: "https://images.unsplash.com/photo-1493707553966-283afac8c358?q=80&w=150&h=150&auto=format&fit=crop" },
    { name: "Under 400", image: "https://images.unsplash.com/photo-1549419141-9457a44f0ceb?q=80&w=150&h=150&auto=format&fit=crop" }
  ];

  return (
    <div className="w-full bg-black py-6 border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex overflow-x-auto hide-scrollbar gap-6 md:gap-8 items-start whitespace-nowrap scroll-smooth">
          {categories.map((cat, idx) => (
            <a 
              key={idx}
              href={`/collections/${cat.name.toLowerCase().replace(" ", "-")}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 flex-shrink-0"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 ${idx === 0 ? 'border-[#cfff00]' : 'border-transparent'} group-hover:border-[#cfff00] transition-colors p-1`}>
                <div 
                  className="w-full h-full rounded-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
              </div>
              <span className={`text-sm font-bold transition-colors ${idx === 0 ? 'text-[#cfff00]' : 'text-white'} group-hover:text-[#cfff00]`}>
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
