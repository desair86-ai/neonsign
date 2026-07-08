import React from 'react';

export function CategoryBar({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const categories = [
    { name: "Shop All", image: "/product-1.jpeg" },
    { name: "Gods", image: "/product-2.jpeg" },
    { name: "Cafe", image: "/product-3.jpeg" },
    { name: "Cricket", image: "/product-4.jpeg" },
    { name: "Wings", image: "/product-5.jpeg" },
    { name: "Table Top", image: "/product-6.jpeg" },
    { name: "Millionaire", image: "/product-1.jpeg" },
    { name: "Love", image: "/product-2.jpeg" },
    { name: "Cars", image: "/product-3.jpeg" },
    { name: "Gaming", image: "/product-4.jpeg" },
    { name: "Gym", image: "/product-5.jpeg" },
    { name: "Kids", image: "/product-6.jpeg" },
    { name: "Under 400", image: "/product-1.jpeg" }
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
