"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonParticles } from '@/components/ui/button-particles';

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
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] bg-black overflow-hidden flex items-center justify-center">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('${images[currentIndex]}')` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-[40vh]">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <ButtonParticles label="Customize Now" href="/products/customize-neon-signs" />
          <ButtonParticles label="Explore Collection" href="/shop-neon-collection" />
        </motion.div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-6 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex(index);
            }}
            className="group relative w-16 h-2 rounded-full overflow-hidden bg-white/20"
            aria-label={`Go to slide ${index + 1}`}
          >
            <motion.div
              className={`absolute top-0 left-0 h-full bg-brand-green ${index === currentIndex ? 'w-full shadow-[0_0_10px_#6eff86]' : 'w-0 group-hover:w-full group-hover:bg-white/50'}`}
              initial={false}
              animate={{ width: index === currentIndex ? '100%' : '0%' }}
              transition={{ duration: index === currentIndex ? 5 : 0.3, ease: index === currentIndex ? "linear" : "easeOut" }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
