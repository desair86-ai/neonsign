"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface RadialOrbitalFAQProps {
  items: FAQItem[];
  className?: string;
}

export function RadialOrbitalFAQ({ items, className }: RadialOrbitalFAQProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className={cn("relative mx-auto max-w-4xl py-20", className)}>
      <motion.div
        style={{ opacity }}
        className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-pink-500 to-transparent"
      />
      
      <div className="flex flex-col gap-12 relative z-10">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              key={index}
              className={`flex w-full items-center ${isEven ? "justify-start" : "justify-end"}`}
            >
              <div className={`relative w-[45%] rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-md transition-all hover:border-pink-500/50 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)]`}>
                {/* Orbital Node */}
                <div className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-pink-500 bg-black shadow-[0_0_15px_rgba(236,72,153,0.8)] ${isEven ? "-right-[calc(11.11%+8px)]" : "-left-[calc(11.11%+8px)]"}`}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-pink-400" />
                </div>

                <h3 className="mb-2 text-xl font-bold text-white">{item.question}</h3>
                <p className="text-sm text-gray-400">{item.answer}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
