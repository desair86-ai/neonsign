import React from 'react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="w-full bg-[#0a0514] overflow-hidden border-b border-white/10">
      <Link href="/" className="block relative w-full w-full h-[30vh] sm:h-[40vh] md:h-[55vh] lg:h-[70vh] hover:opacity-95 transition-opacity">
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/hero-banner.png')" }}
        />
      </Link>
    </section>
  );
}
