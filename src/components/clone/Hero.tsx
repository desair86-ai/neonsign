"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/heroimage1.png',
    '/heroimage2.png',
    '/heroimage3.png'
  ];

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="w-full bg-[#0a0514] overflow-hidden border-b border-white/10 relative">
      <Link href="/" className="block relative w-full h-[30vh] sm:h-[40vh] md:h-[55vh] lg:h-[70vh]">
        {images.map((src, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </Link>
      
      {/* Slider Indicators (Neon Green) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-4 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex(index);
            }}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#6eff86] scale-125 drop-shadow-[0_0_8px_rgba(110,255,134,0.8)]' 
                : 'bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
