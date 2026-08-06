import React from 'react';

export function CategoryBar({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const categories = [
    { name: "Shop All", image: "/5580.webp" },
    { name: "Gods", image: "/5607.webp" },
    { name: "Cafe", image: "/5595.webp" },
    { name: "Cricket", image: "/5592 (1).webp" },
    { name: "Wings", image: "/5593.webp" },
    { name: "Table Top", image: "/5594.webp" },
    { name: "Millionaire", image: "/5605.webp" },
    { name: "Love", image: "/5591.webp" },
    { name: "Cars", image: "/5589 (1).webp" },
    { name: "Gaming", image: "/5596.webp" },
    { name: "Gym", image: "/5606.webp" },
    { name: "Kids", image: "/5604.webp" },
    { name: "Under 400", image: "/5597.webp" }
  ];

  const duplicatedCategories = [...categories, ...categories];

  return (
    <div className={`w-full py-6 border-b overflow-hidden ${theme === 'light' ? 'bg-white border-black/10' : 'bg-black border-white/10'}`}>
      <div className="relative flex w-full">
        {/* Sliding Marquee Container */}
        <div className="flex animate-marquee whitespace-nowrap min-w-full gap-6 md:gap-8 hover-pause cursor-pointer">
          {duplicatedCategories.map((cat, idx) => (
            <a 
              key={idx}
              href={`/collections/${cat.name.toLowerCase().replace(" ", "-")}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 flex-shrink-0"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 ${idx % categories.length === 0 ? 'border-brand-purple shadow-[0_0_12px_rgba(117,46,255,0.4)]' : 'border-transparent'} group-hover:border-brand-purple group-hover:shadow-[0_0_12px_rgba(117,46,255,0.4)] transition-all p-1`}>
                <div 
                  className="w-full h-full rounded-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
              </div>
              <span className={`text-sm font-bold transition-colors group-hover:text-brand-purple ${idx % categories.length === 0 ? 'text-brand-purple' : (theme === 'light' ? 'text-black' : 'text-white')}`}>
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
