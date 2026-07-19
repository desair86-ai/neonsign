"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from "@/components/clone/Header";
import { Footer } from "@/components/clone/Footer";
import { Check, Ruler, Info, X } from 'lucide-react';
import { useMascot } from "@/hooks/useMascot";
import { MascotState } from "@/components/mascot/MascotStateMachine";

const FONTS = [
  { name: 'Clonoid', class: 'font-clonoid' },
  { name: 'Passionate', class: 'font-pacifico' },
  { name: 'Dreamy', class: 'font-dancing' },
  { name: 'Flowy', class: 'font-caveat' },
  { name: 'Original', class: 'font-bungee-outline' },
  { name: 'Classic', class: 'font-cinzel' },
  { name: 'Baylee', class: 'font-great-vibes' },
  { name: 'Funky', class: 'font-permanent-marker' },
  { name: 'Chic', class: 'font-parisienne' },
  { name: 'Delight', class: 'font-playfair' },
  { name: 'Classy', class: 'font-cookie' },
  { name: 'Romantic', class: 'font-alex-brush' },
  { name: 'ROBO', class: 'font-syncopate' },
  { name: 'Charming', class: 'font-bad-script' },
  { name: 'Quirky', class: 'font-gochi-hand' },
  { name: 'Stylish', class: 'font-kaushan-script' },
];

const COLORS = [
  { name: 'White', hex: '#ffffff', glow: 'rgba(255,255,255,0.45)' },
  { name: 'Pink', hex: '#ff2aac', glow: 'rgba(255,42,172,0.5)' },
  { name: 'Green', hex: '#6eff86', glow: 'rgba(110,255,134,0.5)' },
  { name: 'Blue', hex: '#245cff', glow: 'rgba(36,92,255,0.5)' },
  { name: 'Purple', hex: '#752eff', glow: 'rgba(117,46,255,0.5)' },
  { name: 'Orange', hex: '#ff6a00', glow: 'rgba(255,106,0,0.5)' },
  { name: 'Ice Blue', hex: '#00f6ff', glow: 'rgba(0,246,255,0.5)' },
  { name: 'Warm White', hex: '#fff1a8', glow: 'rgba(255,241,168,0.45)' },
  { name: 'Red', hex: '#ff174f', glow: 'rgba(255,23,79,0.5)' },
  { name: 'Yellow', hex: '#ffe600', glow: 'rgba(255,230,0,0.5)' },
];

function getNeonTextStyle(color: (typeof COLORS)[number], isLightOn: boolean = true) {
  if (!isLightOn) {
    return {
      color: color.hex,
      textShadow: 'none',
      filter: 'none',
      fontSize: 'clamp(1.5rem, 4vw, 4rem)',
      lineHeight: '1.1',
      whiteSpace: 'pre-wrap' as const,
      wordBreak: 'break-word' as const,
      WebkitTextStroke: `2px ${color.hex}`,
      opacity: 0.8,
    };
  }

  return {
    color: color.hex,
    textShadow: `
      0 0 1px #ffffff,
      0 0 2px #ffffff,
      0 0 4px ${color.hex},
      0 0 10px ${color.glow}
    `,
    filter: `drop-shadow(0 0 6px ${color.glow})`,
    fontSize: 'clamp(1.5rem, 4vw, 4rem)',
    lineHeight: '1.1',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
    WebkitTextStroke: '0.25px rgba(255,255,255,0.6)',
  };
}

const SIZES = [
  { id: 'small', name: 'Small', multiplier: 0.7, length: '16.85"', height: '17.00"', price: 3775.00 },
  { id: 'medium', name: 'Medium', multiplier: 0.85, length: '20.76"', height: '20.01"', price: 4675.00 },
  { id: 'large', name: 'Large', multiplier: 1, length: '27.60"', height: '27.02"', price: 5760.00 },
  { id: 'xlarge', name: 'X-large', multiplier: 1.15, length: '34.44"', height: '33.37"', price: 7035.00 },
  { id: 'xxlarge', name: 'Xx-large', multiplier: 1.3, length: '41.52"', height: '40.85"', price: 8500.00 },
  { id: 'supersized', name: 'Supersized', multiplier: 1.5, length: '52.51"', height: '51.33"', price: 9960.00 },
];

export interface BackgroundSettings {
  position_x: number;
  position_y: number;
  scale_small: number;
  scale_medium: number;
  scale_large: number;
  scale_xlarge: number;
  scale_xxlarge: number;
  scale_supersized: number;
}

interface Background {
  id: string;
  name: string;
  url: string;
  settings?: BackgroundSettings;
}

const BACKGROUNDS: Background[] = [
  { id: 'bg1', name: 'Dark Studio', url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1200&auto=format&fit=crop' },
  { id: 'bg2', name: 'Brick Wall', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop' },
  { id: 'bg3', name: 'Living Room', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop' },
  { id: 'bg4', name: 'Wood Panel', url: 'https://images.unsplash.com/photo-1511475459345-2f9630e66fb8?q=80&w=1200&auto=format&fit=crop' },
];

export default function CustomizeNeonSign() {
  const [isLightOn, setIsLightOn] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [backgroundsList, setBackgroundsList] = useState(BACKGROUNDS);
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
  const [text, setText] = useState('The Neon Stack');

  useEffect(() => {
    fetch('/api/settings/backgrounds')
      .then(res => res.json())
      .then(data => {
        if (data.backgrounds && data.backgrounds.length > 0) {
          setBackgroundsList(data.backgrounds);
          setSelectedBg(data.backgrounds[0]);
        }
      })
      .catch(console.error);
  }, []);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[2]); // Green default
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [isWaterproof, setIsWaterproof] = useState(false);
  const [hasSmartController, setHasSmartController] = useState(false);

  const { setState, speak, stopSpeaking } = useMascot();
  const [colorTimeoutId, setColorTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [clearBubbleTimeoutId, setClearBubbleTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleColorSelect = (color: typeof COLORS[number]) => {
    setSelectedColor(color);
    setState(MascotState.THINKING);
    
    if (colorTimeoutId) clearTimeout(colorTimeoutId);
    if (clearBubbleTimeoutId) clearTimeout(clearBubbleTimeoutId);
    
    const messages = [
      `${color.name} looks good!`,
      `${color.name} is a solid choice.`,
      `Ooh, I love ${color.name}!`,
      `${color.name} makes it pop!`,
      `Nice pick, ${color.name} is bright!`,
      `Great taste! ${color.name} is stunning.`
    ];
    // eslint-disable-next-line react-hooks/purity
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const id = setTimeout(() => {
      speak(randomMessage, MascotState.THINKING);
      
      const clearId = setTimeout(() => {
        stopSpeaking();
      }, 6500);
      setClearBubbleTimeoutId(clearId);
      
    }, 1500);
    setColorTimeoutId(id);
  };

  // Dynamic pricing based on text length and size
  const price = useMemo(() => {
    let total = selectedSize.price;
    
    if (isWaterproof) total += 3000;
    if (hasSmartController) total += 2000;
    
    return Math.round(total);
  }, [selectedSize, isWaterproof, hasSmartController]);

  // Compute actual scale based on background settings or fallback
  const currentScale = useMemo(() => {
    const defaultScale = 1 + (selectedSize.multiplier - 1) * 0.15;
    if (!selectedBg.settings) return defaultScale;
    
    const s = selectedBg.settings;
    switch (selectedSize.id) {
      case 'small': return s.scale_small;
      case 'medium': return s.scale_medium;
      case 'large': return s.scale_large;
      case 'xlarge': return s.scale_xlarge;
      case 'xxlarge': return s.scale_xxlarge;
      case 'supersized': return s.scale_supersized;
      default: return defaultScale;
    }
  }, [selectedSize, selectedBg]);

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-brand-purple/30 selection:text-brand-lavender">
      <Header />
      
      <div className="border-b border-white/10 bg-[#020202]">
        <div className="max-w-[1680px] mx-auto px-4 lg:px-8 py-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-green drop-shadow-[0_0_8px_rgba(110,255,134,0.4)]">Live custom neon builder</p>
            <h1 className="mt-2 text-3xl md:text-5xl font-black tracking-tight">Create Your Custom Neon Sign</h1>
          </div>
          <p className="max-w-xl text-sm md:text-base text-zinc-300">Design your own premium LED neon sign with a brighter live preview, sharper controls, and instant pricing.</p>
        </div>
      </div>

      <div className="max-w-[1680px] mx-auto px-4 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-7 lg:gap-9">
          
          {/* LEFT: Live Preview */}
          <div className="w-full">
            <div className="sticky top-28 overflow-hidden rounded-lg border border-white/10 bg-black min-h-[420px] lg:min-h-[720px] relative flex items-center justify-center p-6 md:p-10">

              {/* Custom ON/OFF Toggle */}
              <div className="absolute top-6 left-6 z-20">
                <button 
                  onClick={() => setIsLightOn(!isLightOn)}
                  className={`w-[96px] h-[44px] rounded-full transition-colors duration-300 relative flex items-center shadow-lg focus:outline-none ${isLightOn ? 'bg-[#76bc21]' : 'bg-zinc-700'}`}
                  aria-label="Toggle neon light on or off"
                >
                  <span className={`absolute font-black tracking-wide text-white transition-opacity duration-300 ${isLightOn ? 'left-4 opacity-100' : 'left-4 opacity-0'}`}>ON</span>
                  <span className={`absolute font-black tracking-wide text-white transition-opacity duration-300 ${!isLightOn ? 'right-4 opacity-100' : 'right-4 opacity-0'}`}>OFF</span>
                  <div className={`w-[34px] h-[34px] bg-white rounded-full absolute transition-transform duration-300 ease-in-out shadow-[0_0_10px_rgba(0,0,0,0.2)] ${isLightOn ? 'translate-x-[56px]' : 'translate-x-[6px]'}`} />
                </button>
              </div>

              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 opacity-40 group-hover:opacity-60" 
                style={{ backgroundImage: `url('${selectedBg.url}')` }}
              />

              {/* Ruler Toggle Button */}
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={() => setShowMeasurements(!showMeasurements)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all shadow-lg ${showMeasurements ? 'border-brand-green bg-brand-green/20 text-brand-green hover:bg-brand-green/30' : 'border-white/50 text-white bg-black/40 hover:bg-black/60 hover:border-white'}`}
                  aria-label="Toggle Measurements"
                  title="Toggle Measurements"
                >
                  <Ruler className="w-5 h-5" />
                </button>
              </div>

              {/* Ratio Badge (moved to bottom) */}
              <div className="absolute bottom-4 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isLightOn ? 'bg-brand-green animate-pulse shadow-[0_0_8px_rgba(110,255,134,0.6)]' : 'bg-gray-500'}`}></span>
                Preview Scale: {currentScale.toFixed(2)}x
              </div>
              
              {/* Neon Text Wrapper with subtle scaling */}
              <div 
                style={{ 
                  top: `${selectedBg.settings?.position_y ?? 35}%`,
                  left: `${selectedBg.settings?.position_x ?? 50}%`,
                  transform: `translate(-50%, -50%) scale(${currentScale})` 
                }} 
                className="absolute transition-all duration-500 ease-out max-w-full flex justify-center"
              >
                <div className="relative inline-block">
                  {/* Measurements Overlay */}
                  {showMeasurements && (
                    <>
                      {/* Top Width Measurement */}
                      <div className="absolute -top-10 left-0 right-0 flex flex-col items-center justify-center pointer-events-none opacity-80 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                        <span className="text-white font-bold text-sm mb-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 tracking-widest">{selectedSize.length}</span>
                        <div className="w-full border-t border-dashed border-white/50 relative">
                          <div className="absolute -top-1 -left-px w-[2px] h-2 bg-white/50" />
                          <div className="absolute -top-1 -right-px w-[2px] h-2 bg-white/50" />
                        </div>
                      </div>
                      
                      {/* Left Height Measurement */}
                      <div className="absolute -left-12 sm:-left-16 top-0 bottom-0 flex flex-row items-center justify-center pointer-events-none opacity-80 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                        <span className="text-white font-bold text-sm mr-2 whitespace-nowrap bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 tracking-widest">{selectedSize.height}</span>
                        <div className="h-full border-l border-dashed border-white/50 relative">
                          <div className="absolute -left-1 -top-px w-2 h-[2px] bg-white/50" />
                          <div className="absolute -left-1 -bottom-px w-2 h-[2px] bg-white/50" />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div 
                    className={`relative z-10 max-w-full text-center ${selectedFont.class}`}
                    role="img"
                    aria-label={`Preview of neon text: ${text || 'Type Here'}`}
                    aria-live="polite"
                    style={getNeonTextStyle(selectedColor, isLightOn)}
                  >
                    {text || 'Type Here'}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview Info Callout */}
            {showInfo && (
              <div className="mt-4 bg-[#0a0a0a] border border-white/10 rounded-lg p-5 text-sm text-zinc-400 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-purple"></div>
                <button 
                  onClick={() => setShowInfo(false)}
                  className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
                  aria-label="Close notice"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10 pr-6">
                  <Info className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                  <div className="space-y-3 leading-relaxed">
                    <p><strong className="text-white font-bold">Preview Rendering:</strong> The neon sign is scaled down to fit proportionally into the staged room photo. This is a visualization, not the real physical size.</p>
                    <p><strong className="text-white font-bold">Actual Dimensions:</strong> The real production measurements (length × height in inches) are listed in the size options.</p>
                    <p><strong className="text-white font-bold">Ratio Used:</strong> Based on typical furniture dimensions, the sign is displayed at roughly 1:10 to 1:12 scale to ensure it looks realistic in the mock‑up.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Configurator */}
          <div className="w-full flex flex-col gap-7">
            {/* 1. Text Input */}
            <div className="space-y-3">
              <label className="text-xl font-black flex items-center justify-between">
                <span>Type Your Text</span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-green">{text.length} chars</span>
              </label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
                rows={2}
                className="w-full bg-black border border-white/80 rounded-md p-5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/60 transition-colors text-xl resize-none shadow-[0_0_24px_rgba(255,255,255,0.06)]"
              />
            </div>

            {/* 2. Select Font */}
            <div className="space-y-3">
              <label className="text-xl font-black">Pick Your Font</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FONTS.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => setSelectedFont(font)}
                    className={`opt-btn min-h-16 py-3 px-2 rounded-md border text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple ${
                      selectedFont.name === font.name 
                        ? 'border-brand-purple bg-brand-purple text-white shadow-[0_0_28px_rgba(117,46,255,0.45)]' 
                        : 'border-white/70 bg-black text-zinc-200 hover:border-brand-green hover:text-white hover:shadow-[0_0_22px_rgba(110,255,134,0.18)]'
                    }`}
                  >
                    <span className={`${font.class} text-2xl md:text-3xl block leading-none`}>Abc</span>
                    <span className="mt-1 block text-[11px] font-sans font-bold uppercase tracking-widest">{font.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Select Color */}
            <div className="space-y-3">
              <label className="text-xl font-black">Choose Color</label>
              <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 xl:grid-cols-10 gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(color)}
                    className="opt-btn group flex flex-col items-center gap-2 focus:outline-none"
                    aria-label={color.name}
                  >
                    <div 
                      className={`w-12 h-12 rounded-full transition-all flex items-center justify-center border border-white/20 ${
                        selectedColor.name === color.name ? 'ring-2 ring-offset-2 ring-offset-black ring-white scale-110' : 'group-hover:scale-110'
                      }`}
                      style={{ 
                        backgroundColor: color.hex,
                        boxShadow: `0 0 8px ${color.glow}`
                      }}
                    >
                      {selectedColor.name === color.name && (
                        <Check className={['White', 'Warm White', 'Yellow'].includes(color.name) ? 'text-black' : 'text-white'} size={20} />
                      )}
                    </div>
                    <span className={`text-xs ${selectedColor.name === color.name ? 'text-white font-bold' : 'text-gray-500 group-hover:text-gray-300'}`}>
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Select Size */}
            <div className="space-y-3">
              <label className="text-xl font-black flex items-center gap-2">
                Select Size
                <span className="w-5 h-5 rounded-full bg-white text-black inline-flex items-center justify-center text-sm font-black cursor-help" title="Select a size to see it scale in the preview">?</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`opt-btn text-left rounded-md border p-3 flex flex-col justify-between focus:outline-none transition-all ${
                      selectedSize.id === size.id
                        ? 'border-brand-purple bg-brand-purple/20'
                        : 'border-white/20 hover:border-brand-purple bg-black'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-sm md:text-base text-white">{size.name}</span>
                      <span className="text-xs md:text-sm text-gray-400">Length: {size.length}</span>
                    </div>
                    <div className="flex justify-between items-center w-full mt-1">
                      <span className="font-black text-sm md:text-base text-white">₹{size.price.toFixed(2)}</span>
                      <span className="text-xs md:text-sm text-gray-400">Height: {size.height}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Choose Background */}
            <div className="space-y-3">
              <label className="text-xl font-black">Choose Background</label>
              <div className="grid grid-cols-4 gap-2">
                {backgroundsList.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBg(bg)}
                    className={`h-16 rounded-md border-2 overflow-hidden relative focus:outline-none transition-all ${
                      selectedBg.id === bg.id ? 'border-brand-green shadow-[0_0_10px_rgba(110,255,134,0.4)]' : 'border-transparent hover:border-white/50'
                    }`}
                    title={bg.name}
                  >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${bg.url}')` }} />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white text-center py-0.5">
                      {bg.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Add-ons */}
            <div className="space-y-3">
              <label className="text-xl font-black">Add-ons</label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center justify-between gap-4 p-4 rounded-md border border-white/55 bg-black cursor-pointer hover:border-white transition-colors">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={isWaterproof}
                      onChange={(e) => setIsWaterproof(e.target.checked)}
                      className="w-5 h-5 accent-brand-purple rounded focus:ring-brand-purple"
                    />
                    <div>
                      <div className="font-bold">Waterproof IP67 Rated</div>
                      <div className="text-sm text-zinc-400">For outdoor use</div>
                    </div>
                  </div>
                  <div className="font-bold">+ ₹ 3,000</div>
                </label>
                
                <label className="flex items-center justify-between gap-4 p-4 rounded-md border border-white/55 bg-black cursor-pointer hover:border-white transition-colors">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={hasSmartController}
                      onChange={(e) => setHasSmartController(e.target.checked)}
                      className="w-5 h-5 accent-brand-purple rounded focus:ring-brand-purple"
                    />
                    <div>
                      <div className="font-bold">Smart Wireless Controller</div>
                      <div className="text-sm text-zinc-400">Dimmer & Modes</div>
                    </div>
                  </div>
                  <div className="font-bold">+ ₹ 2,000</div>
                </label>
              </div>
            </div>

            {/* Price & Checkout Sticky Bottom Bar */}
            <div className="sticky bottom-0 bg-black/95 backdrop-blur-md p-5 md:p-6 rounded-lg border border-white/30 mt-2 shadow-[0_0_48px_rgba(110,255,134,0.12)] z-40">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="text-zinc-400 text-sm font-medium mb-1">Total Price (Inc. GST)</div>
                  <div className="text-4xl md:text-5xl font-black text-brand-green drop-shadow-[0_0_14px_rgba(110,255,134,0.65)]">
                    ₹ {price.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right text-sm text-zinc-400">
                  Free Shipping <br/> across India
                </div>
              </div>
              <button className="w-full bg-brand-purple hover:bg-brand-purple/80 text-white font-black py-4 rounded-md text-lg transition-colors flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(117,46,255,0.45)]">
                Add to Cart
              </button>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Sticky Tab Navigation */}
      <div className="sticky top-[80px] z-40 w-full bg-black/90 backdrop-blur-md border-y border-white/10 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-4">
          <ul className="flex items-center justify-between text-sm font-bold">
            <li><a href="#about" className="block py-4 text-white border-b-2 border-white hover:text-white transition-colors">Product Details</a></li>
            <li><a href="#box" className="block py-4 text-zinc-400 hover:text-white transition-colors">What&apos;s in the box?</a></li>
            <li><a href="#install" className="block py-4 text-zinc-400 hover:text-white transition-colors">How to install?</a></li>
            <li><a href="#" className="block py-4 text-zinc-400 hover:text-white transition-colors">Customise</a></li>
            <li><a href="#faq" className="block py-4 text-zinc-400 hover:text-white transition-colors">FAQs</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-16 space-y-24">
        
        {/* 1. About Your Neon Sign */}
        <section id="about" className="scroll-mt-32">
          <h2 className="text-2xl font-bold text-brand-green mb-4">About Your Neon Sign:</h2>
          <p className="text-zinc-200 text-lg mb-8 max-w-4xl">
            The Neon Stack&apos;s neon signs are handcrafted with advanced 2nd gen LED on high-quality 6MM transparent acrylic. Energy-efficient, durable, and easy to install—perfect for any space!
          </p>
          <div className="bg-[#111] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center border border-white/5">
            <div className="w-full md:w-1/2 p-8 flex justify-center">
              <img 
                src="/generated/neon_tube_close_1782443029110.png" 
                alt="Neon tube structure" 
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 lg:p-12">
              <h3 className="text-3xl font-black mb-6">Meet 2nd Gen LED Neon - 2X Brighter & Built to Last!</h3>
              <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                Our revolutionary 2nd Gen LED Neon is twice as bright, 80% more energy-efficient, and built to outlast the rest. Plus, with adjustable brightness controls, and the option for waterproof durability, this is the ultimate neon upgrade you&apos;ve been waiting for!
              </p>
              <p className="text-zinc-400 text-lg italic">
                Say goodbye to dull, outdated neon—this is the future!
              </p>
            </div>
          </div>
        </section>

        {/* 2. The Box Contains */}
        <section id="box" className="scroll-mt-32 border-t border-white/10 pt-16">
          <h2 className="text-2xl font-bold text-brand-green mb-4">The Box Contains:</h2>
          <p className="text-zinc-200 text-lg mb-6 font-bold">
            Our neon lights are ready to shine straight from the box!
          </p>
          <p className="text-zinc-300 text-lg mb-10 max-w-4xl">
            Each sign is mounted on clear acrylic for support and comes with pre-drilled holes. Stainless steel mounting screws are included, making wall installation quick and easy.
          </p>
          <div className="bg-black border border-white/10 rounded-2xl p-4 overflow-hidden flex justify-center">
             <img 
               src="/generated/neon_sign_kit_1782443038661.png" 
               alt="Neon Sign Components Diagram" 
               className="rounded-xl w-full h-auto object-cover"
              />
          </div>
        </section>

        {/* 3. Installation Steps */}
        <section id="install" className="scroll-mt-32 border-t border-white/10 pt-16">
          <h2 className="text-2xl font-bold text-brand-green mb-10">Here&apos;s how you can install our neon signs on your wall:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 flex flex-col">
              <div className="h-48 overflow-hidden bg-[#222]">
                <img src="/generated/measuring_tape_wall_1782443048985.png" alt="Measuring tape" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center flex-grow flex items-center justify-center">
                <p className="font-semibold text-zinc-300">Take a measuring tape and mark out the position of your neon sign.</p>
              </div>
            </div>

            <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 flex flex-col">
              <div className="h-48 overflow-hidden bg-[#222]">
                <img src="/generated/drilling_wall_hole_1782443059654.png" alt="Drilling holes" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center flex-grow flex items-center justify-center">
                <p className="font-semibold text-zinc-300">Safely Drill small holes on the wall.</p>
              </div>
            </div>

            <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 flex flex-col">
              <div className="h-48 overflow-hidden bg-[#222]">
                <img src="/generated/mounting_screw_install_1782443069589.png" alt="Mounting screws" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center flex-grow flex items-center justify-center">
                <p className="font-semibold text-zinc-300">Use the SS mounting screws to mount your neon sign on the wall.</p>
              </div>
            </div>

            <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 flex flex-col">
              <div className="h-48 overflow-hidden bg-[#222]">
                <img src="/generated/plugging_power_1782443080893.png" alt="Plugging in" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center flex-grow flex items-center justify-center">
                <p className="font-semibold text-zinc-300">Connect the power adapter to the transparent cable and your sign is ready!</p>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Light Up Your Logo */}
        <section className="scroll-mt-32 border-t border-white/10 pt-16 pb-16">
          <div className="bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="w-full md:w-1/2 bg-black">
              <img 
                src="/generated/glowing_logo_split_1782443098549.png" 
                alt="Logo neon transformation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6">Light Up Your Logo!</h2>
              <p className="text-zinc-800 text-lg font-medium mb-4">
                We turn your logo into a showstopping Neon Sign with sharp detail, and serious personality.
              </p>
              <p className="text-zinc-600 text-base mb-8">
                Using advanced 2nd Gen LED Neon, UV print tech and waterproof outdoor options, we craft glowing pieces that light up your brand—rain or shine, day or night.
              </p>
              <button className="bg-brand-green hover:bg-brand-green/80 text-black font-bold py-4 px-8 rounded-full text-lg w-max flex items-center gap-3 transition-colors shadow-xl shadow-[0_0_15px_rgba(110,255,134,0.4)]">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Text us on WhatsApp
              </button>
            </div>
          </div>
        </section>
        
      </div>
      
      <Footer />
    </main>
  );
}
