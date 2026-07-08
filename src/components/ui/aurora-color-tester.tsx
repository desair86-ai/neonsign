"use client";
import React, { useState } from 'react';
import { HexColorPicker } from "react-colorful";

function hexToRgba(hex: string, alpha: number) {
  if (!/^#[0-9A-Fa-f]{6}$/i.test(hex)) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function AuroraColorTester() {
  const [color1, setColor1] = useState("#6eff86");
  const [color2, setColor2] = useState("#752eff");
  const [color3, setColor3] = useState("#0a0514"); // Plum default
  const [bgColor, setBgColor] = useState("#000000"); // Base background

  const handleColor1Change = (newColor: string) => {
    setColor1(newColor);
    document.documentElement.style.setProperty('--aurora-color-1', hexToRgba(newColor, 0.15));
    document.documentElement.style.setProperty('--aurora-color-5', hexToRgba(newColor, 0.1));
  };

  const handleColor2Change = (newColor: string) => {
    setColor2(newColor);
    document.documentElement.style.setProperty('--aurora-color-2', hexToRgba(newColor, 0.12));
    document.documentElement.style.setProperty('--aurora-color-4', hexToRgba(newColor, 0.08));
  };

  const handleColor3Change = (newColor: string) => {
    setColor3(newColor);
    document.documentElement.style.setProperty('--aurora-color-3', hexToRgba(newColor, 0.4));
  };

  const handleBgColorChange = (newColor: string) => {
    setBgColor(newColor);
    document.documentElement.style.setProperty('--aurora-bg', newColor);
  };

  return (
    <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-xl inline-block w-full">
      <h4 className="font-bold text-sm mb-3 uppercase tracking-wider text-gray-300">Aurora Background Colors</h4>
      <p className="text-xs text-gray-500 mb-4">Select colors below to instantly change ALL elements of the animated background.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
        {/* Color 1 */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold mb-2 text-white">Main Blob (Default: Green)</p>
          <HexColorPicker color={color1} onChange={handleColor1Change} style={{ width: "100%" }} />
          <div className="mt-3 text-sm text-gray-400 flex items-center gap-2">
            Hex: <input type="text" value={color1} onChange={(e) => handleColor1Change(e.target.value)} className="font-mono text-white bg-black/50 px-2 py-1 rounded border border-white/10 w-24 focus:outline-none focus:border-white/30" />
          </div>
        </div>

        {/* Color 2 */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold mb-2 text-white">Secondary Blob (Default: Purple)</p>
          <HexColorPicker color={color2} onChange={handleColor2Change} style={{ width: "100%" }} />
          <div className="mt-3 text-sm text-gray-400 flex items-center gap-2">
            Hex: <input type="text" value={color2} onChange={(e) => handleColor2Change(e.target.value)} className="font-mono text-white bg-black/50 px-2 py-1 rounded border border-white/10 w-24 focus:outline-none focus:border-white/30" />
          </div>
        </div>

        {/* Color 3 */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold mb-2 text-white">Center Blob (Default: Deep Plum)</p>
          <HexColorPicker color={color3} onChange={handleColor3Change} style={{ width: "100%" }} />
          <div className="mt-3 text-sm text-gray-400 flex items-center gap-2">
            Hex: <input type="text" value={color3} onChange={(e) => handleColor3Change(e.target.value)} className="font-mono text-white bg-black/50 px-2 py-1 rounded border border-white/10 w-24 focus:outline-none focus:border-white/30" />
          </div>
        </div>

        {/* Base Background */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold mb-2 text-white">Base Background (Default: Black)</p>
          <HexColorPicker color={bgColor} onChange={handleBgColorChange} style={{ width: "100%" }} />
          <div className="mt-3 text-sm text-gray-400 flex items-center gap-2">
            Hex: <input type="text" value={bgColor} onChange={(e) => handleBgColorChange(e.target.value)} className="font-mono text-white bg-black/50 px-2 py-1 rounded border border-white/10 w-24 focus:outline-none focus:border-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
