"use client";
import React, { useState } from 'react';

export function BeamColorTester() {
  const [selectedColor, setSelectedColor] = useState("");
  
  const colors = [
    { name: "Neon Green", hex: "#6eff86" },
    { name: "Neon Purple", hex: "#752eff" },
    { name: "Neon Pink", hex: "#ff2eb3" },
    { name: "Neon Blue", hex: "#2ed2ff" },
    { name: "Neon Orange", hex: "#ff8b2e" },
    { name: "Neon Yellow", hex: "#fff52e" },
    { name: "Neon Red", hex: "#ff2e2e" },
  ];

  const handleColorChange = (hex: string) => {
    setSelectedColor(hex);
    // Set a global CSS variable that BorderBeam can fall back to
    document.documentElement.style.setProperty('--beam-override', hex);
  };

  return (
    <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-xl inline-block w-full">
      <h4 className="font-bold text-sm mb-3 uppercase tracking-wider text-gray-300">BorderBeam Color Tester</h4>
      <p className="text-xs text-gray-500 mb-4">Click a color to preview it globally on the BorderBeams above.</p>
      
      <div className="flex flex-wrap gap-3 mb-4">
        {colors.map((c) => (
          <button
            key={c.hex}
            onClick={() => handleColorChange(c.hex)}
            className={`w-8 h-8 rounded-full transition-transform ${selectedColor === c.hex ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-black' : 'hover:scale-110'}`}
            style={{ backgroundColor: c.hex, boxShadow: `0 0 15px ${c.hex}80` }}
            title={c.name}
            aria-label={`Select ${c.name}`}
          />
        ))}
      </div>

      <div className="text-sm text-gray-400 flex items-center gap-2 h-8">
        {selectedColor ? (
          <>
            Selected Code: 
            <span className="font-mono text-white bg-black/50 px-2 py-1 rounded border border-white/10 select-all">
              {selectedColor}
            </span>
          </>
        ) : (
          <span>No override selected.</span>
        )}
      </div>
    </div>
  );
}
