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

export function AuroraColorTester({
  initialColors,
  onChange
}: {
  initialColors?: string;
  onChange?: (val: string) => void;
}) {
  const [color1, setColor1] = useState("#6eff86");
  const [color2, setColor2] = useState("#752eff");
  const [color3, setColor3] = useState("#0a0514");
  const [bgColor, setBgColor] = useState("#000000");

  React.useEffect(() => {
    if (initialColors) {
      try {
        const parsed = JSON.parse(initialColors);
        if (parsed.c1) {
          setColor1(parsed.c1);
          document.documentElement.style.setProperty('--aurora-color-1', hexToRgba(parsed.c1, 0.15));
          document.documentElement.style.setProperty('--aurora-color-5', hexToRgba(parsed.c1, 0.1));
        }
        if (parsed.c2) {
          setColor2(parsed.c2);
          document.documentElement.style.setProperty('--aurora-color-2', hexToRgba(parsed.c2, 0.12));
          document.documentElement.style.setProperty('--aurora-color-4', hexToRgba(parsed.c2, 0.08));
        }
        if (parsed.c3) {
          setColor3(parsed.c3);
          document.documentElement.style.setProperty('--aurora-color-3', hexToRgba(parsed.c3, 0.4));
        }
        if (parsed.bg) {
          setBgColor(parsed.bg);
          document.documentElement.style.setProperty('--aurora-bg', parsed.bg);
        }
      } catch (e) {}
    }
  }, [initialColors]);

  const notifyChange = (c1: string, c2: string, c3: string, bg: string) => {
    if (onChange) {
      onChange(JSON.stringify({ c1, c2, c3, bg }));
    }
  };

  const handleColor1Change = (newColor: string) => {
    setColor1(newColor);
    notifyChange(newColor, color2, color3, bgColor);
    document.documentElement.style.setProperty('--aurora-color-1', hexToRgba(newColor, 0.15));
    document.documentElement.style.setProperty('--aurora-color-5', hexToRgba(newColor, 0.1));
  };

  const handleColor2Change = (newColor: string) => {
    setColor2(newColor);
    notifyChange(color1, newColor, color3, bgColor);
    document.documentElement.style.setProperty('--aurora-color-2', hexToRgba(newColor, 0.12));
    document.documentElement.style.setProperty('--aurora-color-4', hexToRgba(newColor, 0.08));
  };

  const handleColor3Change = (newColor: string) => {
    setColor3(newColor);
    notifyChange(color1, color2, newColor, bgColor);
    document.documentElement.style.setProperty('--aurora-color-3', hexToRgba(newColor, 0.4));
  };

  const handleBgColorChange = (newColor: string) => {
    setBgColor(newColor);
    notifyChange(color1, color2, color3, newColor);
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
