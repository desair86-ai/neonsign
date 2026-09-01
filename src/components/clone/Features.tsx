"use client";

import React from 'react';
import { Atom, ShieldCheck, FlaskConical, Rabbit, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Atom,
    title: "UL-LISTED",
    description: "Every Neon Stack sign is UL-listed for safety and quality, so you can glow with confidence at home or in your business.",
    color: "text-brand-green",
    glow: "group-hover:shadow-[0_0_25px_rgba(110,255,134,0.4)] group-hover:border-brand-green/50",
    hoverText: "group-hover:text-brand-green",
    cardBorder: "border-brand-green/30",
    cardHoverGlow: "hover:border-brand-green hover:shadow-[0_0_35px_rgba(110,255,134,0.4)]"
  },
  {
    icon: ShieldCheck,
    title: "ENERGY-EFFICIENT",
    description: "Our LED neon uses up to 80% less energy than traditional glass neon, keeping your electricity bills low while you shine bright.",
    color: "text-[#00e5ff]",
    glow: "group-hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] group-hover:border-[#00e5ff]/50",
    hoverText: "group-hover:text-[#00e5ff]",
    cardBorder: "border-[#00e5ff]/30",
    cardHoverGlow: "hover:border-[#00e5ff] hover:shadow-[0_0_35px_rgba(0,229,255,0.4)]"
  },
  {
    icon: FlaskConical,
    title: "CUSTOM-MADE",
    description: "From your favorite quote to your business logo, we craft each sign to your exact specs. No templates, no compromises-just your vision in neon.",
    color: "text-brand-purple",
    glow: "group-hover:shadow-[0_0_25px_rgba(202,110,255,0.4)] group-hover:border-brand-purple/50",
    hoverText: "group-hover:text-brand-purple",
    cardBorder: "border-brand-purple/30",
    cardHoverGlow: "hover:border-brand-purple hover:shadow-[0_0_35px_rgba(202,110,255,0.4)]"
  },
  {
    icon: Rabbit,
    title: "DURABLE BUILD",
    description: "Built with premium silicone and LED strips, our signs are flexible, shatterproof, and built to last for years of everyday glow.",
    color: "text-[#fe8a2e]",
    glow: "group-hover:shadow-[0_0_25px_rgba(254,138,46,0.4)] group-hover:border-[#fe8a2e]/50",
    hoverText: "group-hover:text-[#fe8a2e]",
    cardBorder: "border-[#fe8a2e]/30",
    cardHoverGlow: "hover:border-[#fe8a2e] hover:shadow-[0_0_35px_rgba(254,138,46,0.4)]"
  },
  {
    icon: Leaf,
    title: "MADE IN INDIA",
    description: "Proudly designed and handcrafted in India, each Neon Stack sign supports local artisans and delivers world-class quality to your door.",
    color: "text-[#f967fb]",
    glow: "group-hover:shadow-[0_0_25px_rgba(249,103,251,0.4)] group-hover:border-[#f967fb]/50",
    hoverText: "group-hover:text-[#f967fb]",
    cardBorder: "border-[#f967fb]/30",
    cardHoverGlow: "hover:border-[#f967fb] hover:shadow-[0_0_35px_rgba(249,103,251,0.4)]"
  }
];

export function Features() {
  return (
    <section className="w-full py-10 md:py-16 bg-zinc-950 font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4"
          >
            Why choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">the neon stack</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`flex flex-col items-center text-justify group cursor-default bg-zinc-900/30 hover:bg-zinc-900/70 border ${feature.cardBorder} rounded-2xl p-6 md:p-8 transition-all duration-500 ${feature.cardHoverGlow}`}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full border border-white/10 flex items-center justify-center bg-zinc-950 group-hover:bg-zinc-900 transition-all duration-500 shadow-xl group-hover:scale-110 ${feature.glow}`}>
                  <Icon className={`w-7 h-7 md:w-8 md:h-8 ${feature.color} transition-transform duration-500 group-hover:scale-110`} strokeWidth={1.5} />
                </div>
                <div className="transition-transform duration-500 group-hover:-translate-y-1 w-full">
                  <h3 className={`text-sm text-center font-bold uppercase tracking-widest mb-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-colors duration-500 ${feature.hoverText}`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] transition-all duration-500 group-hover:text-white">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
