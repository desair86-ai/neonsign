"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const fonts = [
  { name: "Neon", family: "'Neon Tubes', sans-serif" },
  { name: "Cursive", family: "'Pacifico', cursive" },
  { name: "Block", family: "'Impact', sans-serif" },
];

const colors = [
  { name: "Pink", hex: "#ff00ff", shadow: "255, 0, 255" },
  { name: "Blue", hex: "#00ffff", shadow: "0, 255, 255" },
  { name: "Green", hex: "#00ff00", shadow: "0, 255, 0" },
  { name: "Yellow", hex: "#ffff00", shadow: "255, 255, 0" },
  { name: "Red", hex: "#ff0000", shadow: "255, 0, 0" },
];

export function CustomNeonBuilder() {
  const [text, setText] = useState("Your Name");
  const [activeFont, setActiveFont] = useState(fonts[1]);
  const [activeColor, setActiveColor] = useState(colors[0]);
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-black/40 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Controls */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <label htmlFor="neon-text-input" className="block text-sm font-medium text-gray-400 mb-2">Enter Your Text</label>
            <input
              id="neon-text-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-label="Neon text input"
              className="w-full bg-black border border-white/20 rounded-lg p-4 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 transition-colors text-lg"
              placeholder="Type here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">Choose Font</label>
            <div className="flex flex-wrap gap-3">
              {fonts.map((font) => (
                <button
                  key={font.name}
                  onClick={() => setActiveFont(font)}
                  aria-pressed={activeFont.name === font.name}
                  className={`px-4 py-2 rounded-full border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
                    activeFont.name === font.name
                      ? "border-white bg-white text-black"
                      : "border-white/20 text-gray-300 hover:border-white/50"
                  }`}
                  style={{ fontFamily: font.family }}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">Choose Color</label>
            <div className="flex flex-wrap gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setActiveColor(color)}
                  aria-pressed={activeColor.name === color.name}
                  className={`w-12 h-12 rounded-full border-2 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
                    activeColor.name === color.name ? "border-white scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex, boxShadow: `0 0 15px rgba(${color.shadow}, 0.5)` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
          <div className="flex-[1.5] relative min-h-[300px] flex items-center justify-center bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden pattern-dots" role="region" aria-label="Live preview">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0" />
          
          <motion.div
            key={`${text}-${activeColor.name}-${activeFont.name}`}
            initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? undefined : { duration: 0.45 }}
            className="relative z-10 text-center px-4"
          >
            <h2
              className="font-bold transition-all duration-300 break-words"
              style={{
                fontFamily: activeFont.family,
                color: activeColor.hex,
                fontSize: 'clamp(2rem, 6vw, 6rem)',
                textRendering: 'geometricPrecision',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                transform: 'translateZ(0)',
                letterSpacing: '0.02em',
                textShadow: `
                  0 0 1px #ffffff,
                  0 0 2px #ffffff,
                  0 0 4px ${activeColor.hex},
                  0 0 10px rgba(${activeColor.shadow}, 0.5)
                `,
                filter: `drop-shadow(0 0 6px rgba(${activeColor.shadow}, 0.45))`,
                WebkitTextStroke: '0.25px rgba(255,255,255,0.6)',
              }}
            >
              {text || "Preview"}
            </h2>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
