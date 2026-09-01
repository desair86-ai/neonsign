import React from 'react';

const spaces = [
  'Bedrooms', 'Living Rooms', 'Home Bars', 'Gaming Rooms',
  'Offices', 'Restaurants', 'Salons', 'Weddings'
];

export function SpacesWeIlluminate() {
  return (
    <section className="py-24 px-4 bg-zinc-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-12">Spaces We <span className="text-[#6eff86]">Illuminate</span></h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          {spaces.map((space, i) => (
            <div 
              key={i}
              className="px-8 py-4 rounded-full border border-white/20 bg-zinc-900 text-lg font-bold hover:border-[#6eff86] hover:text-[#6eff86] hover:shadow-[0_0_15px_rgba(110,255,134,0.3)] transition-all cursor-pointer"
            >
              {space}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
