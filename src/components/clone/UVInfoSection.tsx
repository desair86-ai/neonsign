"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function UVInfoSection() {
  return (
    <div className="flex flex-col gap-16 md:gap-32 mt-16">
      
      {/* Section 1: Image Left, Text Right */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(202,110,255,0.3)] border border-brand-purple/20">
            <img src="/planet_uv_printed_led_neon_light.webp" alt="UV Print Neon Art" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">UV Neon Prints: A Modern Twist on Neon Art</h2>
          <p className="text-zinc-300 font-light leading-relaxed text-lg">
            In the dynamic and emotive realm of art, neon prints are quickly finding a niche as a 
            groundbreaking route to inject color into your space. With developments of UV printing 
            technology, UV print neon signs are now giving an interesting, new, nature-friendly alternative to 
            neon signage. The recent development and how it works, the advantage of print neon art, and why 
            it's fast becoming the trend of the modern interior are covered in the content to follow.
          </p>
        </motion.div>
      </div>

      {/* Section 2: Text Left, Image Right */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(110,255,134,0.3)] border border-brand-green/20">
            <img src="/jeep_led_neon_sign.webp" alt="Jeep UV Neon Sign" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What is UV Printing?</h2>
          <p className="text-zinc-300 font-light leading-relaxed text-lg">
            UV printing is one of the fastest-growing areas in the printing industry, which can be defined as a 
            digital process of instantly drying the ink when printing under ultraviolet (UV) light. Unlike other 
            traditional ways of printing that use solvent-based inks, usually taking quite some time to dry and 
            often releasing harmful chemicals, UV printing uses inks that are instantly dried by the UV light. 
            The result is a much more vivid, durable, and eco-friendly print. The technology is utilized to realize 
            bright and long-lasting images on acrylic, metal, and glass in UV print neon signs.
          </p>
        </motion.div>
      </div>

      {/* Section 3: Image Left, Text Right */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(254,138,46,0.3)] border border-[#fe8a2e]/20">
            <img src="/drag_racing_car_uv_print_led_neon.webp" alt="Drag Racing UV Neon Sign" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Does a UV Print Neon Sign Differ from a Traditional Neon Light?</h2>
          <p className="text-zinc-300 font-light leading-relaxed text-lg">
            UV-printed neon art prints are quite different from neon signs. The traditional neon signs are 
            made by bending glass tubes into different shapes and filling them with a gas that glows when 
            electrified. Even though they are iconic and surely a treat to the eyes, there are various limitations 
            in the use of traditional neon signs. They are fragile, use a lot of energy, and offer a limited range of 
            colors.
          </p>
          <p className="text-zinc-300 font-light leading-relaxed text-lg">
            In contrast, neon signs produced with UV printing manifest much more flexibility in design and 
            color. Since the image is directly printed on some surface by UV light, there simply are no 
            limitations to design. These signs are more long-lasting and also very energy-efficient, thus 
            applicable for commercial and residential areas.
          </p>
        </motion.div>
      </div>

      {/* Section 4 & 5: Bottom Animated Text Blocks */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-white/10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900/50 p-8 rounded-3xl transition-all duration-500 group border border-brand-green/40 shadow-[0_0_15px_rgba(110,255,134,0.1)] hover:border-brand-green hover:shadow-[0_0_30px_rgba(110,255,134,0.4)]"
        >
          <h2 className="text-2xl font-bold text-brand-green mb-4">The Eco-Friendly Advantage</h2>
          <p className="text-zinc-300 font-light leading-relaxed group-hover:text-white transition-colors duration-500">
            In today's environmentally conscious world, the demand for eco-friendly products is higher than 
            ever. Print neon art created through UV printing aligns perfectly with this trend. UV printing is an 
            ecologically beneficial option since it uses less energy, produces less waste, and releases less 
            volatile organic compounds (VOCs) than conventional printing methods. Moreover, UV print neon 
            signs are typically made from recyclable materials, reducing their environmental impact.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-zinc-900/50 p-8 rounded-3xl transition-all duration-500 group border border-brand-purple/40 shadow-[0_0_15px_rgba(202,110,255,0.1)] hover:border-brand-purple hover:shadow-[0_0_30px_rgba(202,110,255,0.4)]"
        >
          <h2 className="text-2xl font-bold text-brand-purple mb-4">The Versatility of Art Prints</h2>
          <p className="text-zinc-300 font-light leading-relaxed group-hover:text-white transition-colors duration-500">
            One of the most exciting aspects of neon art prints is their versatility. Whether you want to add a 
            splash of color to your home, create a captivating storefront display, or design custom art for an 
            event, UV print neon signs can be tailored to meet your needs. Because these prints may be 
            printed in any color and on various materials, they offer an endless canvas for artistic expression.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
