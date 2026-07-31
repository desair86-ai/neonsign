"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Header } from "@/components/clone/Header";
import { Footer } from "@/components/clone/Footer";
import { 
  Check, Ruler, Info, X, AlignLeft, AlignCenter, AlignRight, Upload,
  Type, Palette, Layers, Settings, Image as ImageIcon, ChevronLeft, ChevronRight,
  ShoppingBag, Bookmark, Sparkles, Sliders
} from 'lucide-react';
import { motion } from "framer-motion";
import { useMascot } from "@/hooks/useMascot";
import { MascotState } from "@/components/mascot/MascotStateMachine";
import { useCart } from "@/lib/CartContext";

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
      fontSize: 'clamp(1.15rem, 2.35vw, 3rem)',
      lineHeight: '1.1',
      whiteSpace: 'pre-wrap' as const,
      wordBreak: 'break-word' as const,
      WebkitTextStroke: `1px ${color.hex}`,
      opacity: 0.55,
    };
  }

  return {
    color: color.hex,
    textShadow: `
      0 0 2px ${color.hex},
      0 0 8px ${color.hex},
      0 0 16px ${color.hex},
      0 0 30px ${color.glow},
      0 0 60px ${color.glow},
      0 0 90px ${color.glow}
    `,
    filter: `drop-shadow(0 0 12px ${color.hex}) drop-shadow(0 0 25px ${color.glow}) drop-shadow(0 0 45px ${color.glow})`,
    fontSize: 'clamp(1.15rem, 2.35vw, 3rem)',
    lineHeight: '1.1',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
    WebkitTextStroke: `1px ${color.hex}`,
    opacity: 1,
  };
}

const SIZES = [
  { id: 'small', name: 'Small (18 Inches Wide)', multiplier: 0.7, length: '18.00"', height: '17.00"', maxLetters: 'Max 10 Letters', price: 3775.00 },
  { id: 'medium', name: 'Medium (24 Inches Wide)', multiplier: 0.85, length: '24.00"', height: '20.01"', maxLetters: 'Max 12 Letters', price: 4675.00 },
  { id: 'large', name: 'Large (36 Inches Wide)', multiplier: 1, length: '36.00"', height: '27.02"', maxLetters: 'Max 15 Letters', price: 5760.00 },
  { id: 'xlarge', name: 'Extra Large (48 Inches Wide)', multiplier: 1.15, length: '48.00"', height: '33.37"', maxLetters: 'Max 22 Letters', price: 7035.00 },
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

const DEFAULT_ROOM_BACKGROUND = BACKGROUNDS[2];

export default function CustomizeNeonSign() {
  const [isLightOn, setIsLightOn] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'color' | 'backboard' | 'hardware' | 'room'>('create');
  const [showRuler, setShowRuler] = useState(true);
  const [selectedBackboardShape, setSelectedBackboardShape] = useState<'cut' | 'square' | 'stand' | 'none'>('cut');
  const [selectedBackboardColor, setSelectedBackboardColor] = useState<'clear' | 'black' | 'white' | 'mirror'>('clear');
  const [selectedMounting, setSelectedMounting] = useState<'screws' | 'wire' | 'stand'>('screws');

  const TABS = ['create', 'color', 'backboard', 'hardware', 'room'] as const;
  const prevTab = () => {
    const idx = TABS.indexOf(activeTab);
    if (idx > 0) setActiveTab(TABS[idx - 1]);
  };
  const nextTab = () => {
    const idx = TABS.indexOf(activeTab);
    if (idx < TABS.length - 1) setActiveTab(TABS[idx + 1]);
  };

  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationInches, setCalibrationInches] = useState<string>('50');
  const [calibrationRatio, setCalibrationRatio] = useState<number | null>(null);
  const [calibrationLineWidth, setCalibrationLineWidth] = useState(300);
  
  const [backgroundsList, setBackgroundsList] = useState(BACKGROUNDS);
  const [selectedBg, setSelectedBg] = useState(DEFAULT_ROOM_BACKGROUND);
  const [text, setText] = useState('The Neon Stack');

  useEffect(() => {
    fetch('/api/settings/backgrounds')
      .then(res => res.json())
      .then(data => {
        if (data.backgrounds && data.backgrounds.length > 0) {
          const customBackgrounds = data.backgrounds.filter(
            (bg: Background) => bg.id !== DEFAULT_ROOM_BACKGROUND.id && bg.url !== DEFAULT_ROOM_BACKGROUND.url
          );
          setBackgroundsList([DEFAULT_ROOM_BACKGROUND, ...customBackgrounds]);
        }
      })
      .catch(console.error);
  }, []);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [selectedColor, setSelectedColor] = useState(COLORS[2]); // Green default
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [isWaterproof, setIsWaterproof] = useState(false);
  const [hasSmartController, setHasSmartController] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [dynamicScale, setDynamicScale] = useState<number | null>(null);

  const { setState, speak, stopSpeaking } = useMascot();
  const { addToCart } = useCart();
  const [colorTimeoutId, setColorTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [clearBubbleTimeoutId, setClearBubbleTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const hasTriggeredLongText = useRef(false);

  const triggerMascot = (message: string, state: MascotState = MascotState.TALKING) => {
    if (colorTimeoutId) clearTimeout(colorTimeoutId);
    if (clearBubbleTimeoutId) clearTimeout(clearBubbleTimeoutId);
    
    speak(message, state);
    
    // Stop the intense animation (jumping/celebrating) after 1.5s but keep the text bubble
    if (state !== MascotState.TALKING && state !== MascotState.THINKING) {
      setTimeout(() => setState(MascotState.TALKING), 1500);
    }
    
    const clearId = setTimeout(() => stopSpeaking(), 5000);
    setClearBubbleTimeoutId(clearId);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const customBg = { 
        id: 'custom', 
        name: 'Your Room', 
        url, 
        settings: {
          position_x: 50,
          position_y: 35,
          scale_small: 1,
          scale_medium: 1,
          scale_large: 1,
          scale_xlarge: 1,
          scale_xxlarge: 1,
          scale_supersized: 1
        } 
      } as any;
      setSelectedBg(customBg);
      triggerMascot("Look at that! It looks amazing in your space.", MascotState.CELEBRATING);
    }
  };

  useEffect(() => {
    if (text.length > 15 && !hasTriggeredLongText.current) {
      triggerMascot("Wow, that's going to be a huge sign!", MascotState.CELEBRATING);
      hasTriggeredLongText.current = true;
    } else if (text.length <= 15) {
      hasTriggeredLongText.current = false;
    }
  }, [text.length]);

  useEffect(() => {
    if (isWaterproof) {
      triggerMascot("Ready for the outdoors! Good choice.", MascotState.WAVE);
    }
  }, [isWaterproof]);

  const handleColorSelect = (color: typeof COLORS[number]) => {
    setSelectedColor(color);
    setState(MascotState.THINKING);
    if (color.name === 'Pink' || color.name === 'Purple') {
      const id = setTimeout(() => triggerMascot("Ooo, I love the retro vibes of this color!", MascotState.JUMPING), 1000);
      setColorTimeoutId(id);
      return;
    }
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
    const id = setTimeout(() => triggerMascot(randomMessage, MascotState.TALKING), 1500);
    setColorTimeoutId(id);
  };

  // Dynamic pricing based on text length and size
  const price = useMemo(() => {
    let total = selectedSize.price;
    
    if (isWaterproof) total += 3000;
    if (hasSmartController) total += 2000;
    
    return Math.round(total);
  }, [selectedSize, isWaterproof, hasSmartController]);

  const roomFocalPoint = 'center center';

  // Compute actual scale based on background settings or fallback
  const currentScale = useMemo(() => {
    const defaultScale = 0.78 + (selectedSize.multiplier - 1) * 0.1;
    if (!selectedBg.settings) return defaultScale;
    
    const s = selectedBg.settings;
    let scale;
    switch (selectedSize.id) {
      case 'small': scale = s.scale_small; break;
      case 'medium': scale = s.scale_medium; break;
      case 'large': scale = s.scale_large; break;
      case 'xlarge': scale = s.scale_xlarge; break;
      case 'xxlarge': scale = s.scale_xxlarge; break;
      case 'supersized': scale = s.scale_supersized; break;
    }
    return scale ?? defaultScale;
  }, [selectedSize, selectedBg]);

  // Normalize visual scale so switching fonts NEVER changes the physical width of the sign on the wall
  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    
    let lastContainerWidth = 0;
    const measure = (force = false) => {
      if (!containerRef.current || !textRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      if (!force && Math.abs(containerWidth - lastContainerWidth) < 5) return;
      lastContainerWidth = containerWidth;

      const textWidth = textRef.current.offsetWidth;
      if (!textWidth) return;
      
      let targetWidthPixels: number;
      if (selectedBg.id === 'custom' && calibrationRatio !== null) {
        const physicalInches = parseFloat(selectedSize.length);
        targetWidthPixels = physicalInches * calibrationRatio;
      } else {
        // Normalize each selected size to a consistent visual width ratio on the wall across all fonts
        let sizeRatio = 0.44; // default medium (24")
        if (selectedSize.id === 'small') sizeRatio = 0.32;       // 18"
        else if (selectedSize.id === 'medium') sizeRatio = 0.44; // 24"
        else if (selectedSize.id === 'large') sizeRatio = 0.60;  // 36"
        else if (selectedSize.id === 'xlarge') sizeRatio = 0.76; // 48"
        else sizeRatio = Math.min(0.32 + (selectedSize.multiplier - 0.7) * 0.45, 0.85);
        
        targetWidthPixels = containerWidth * sizeRatio;
      }
      
      // Calculate the normalized scale so ANY font matches the exact target width
      let normalizedScale = targetWidthPixels / textWidth;
      
      // Prevent 1 or 2 letter words from scaling up excessively
      const maxAllowedScale = currentScale * 2.2;
      normalizedScale = Math.min(normalizedScale, maxAllowedScale);
      
      setDynamicScale(normalizedScale);
    };

    measure(true);
    
    const observer = new ResizeObserver(() => measure(false));
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [text, selectedFont, currentScale, selectedBg, textAlign, calibrationRatio, selectedSize.id, selectedSize.length, selectedSize.multiplier]);

  const finalScale = dynamicScale !== null ? dynamicScale : currentScale;

  return (
    <main className="min-h-screen text-white font-sans selection:bg-brand-purple/30 selection:text-brand-lavender">
      <Header />
      
      {/* Top Studio Toolbar */}
      <div className="w-full bg-[#0d0d0d] border-b border-gray-800 px-4 md:px-6 h-14 flex items-center justify-between sticky top-20 z-50 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs md:text-sm font-black text-brand-green uppercase tracking-widest drop-shadow-[0_0_8px_rgba(110,255,134,0.6)]">
            Live Neon Studio
          </span>
          <span className="hidden md:inline text-gray-600">|</span>
          <h1 className="hidden md:block text-sm md:text-base font-extrabold text-white">
            Create Your Own Custom Signs
          </h1>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => triggerMascot("Your design progress is automatically saved to your session!", MascotState.CELEBRATING)}
            className="px-4 py-2 rounded-full border border-gray-700 hover:border-brand-purple text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Bookmark className="w-3.5 h-3.5 text-brand-purple" />
            <span>Save</span>
          </button>

          <div className="flex items-center bg-[#151515] border border-gray-700 rounded-full pl-4 pr-1.5 py-1 gap-3">
            <div className="text-right">
              <div className="text-[10px] text-gray-400 uppercase font-semibold leading-none">Total Price</div>
              <div className="text-sm md:text-base font-extrabold text-[#6eff86] drop-shadow-[0_0_6px_rgba(110,255,134,0.5)]">
                ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <button
              onClick={() => {
                addToCart({
                  name: `Custom Neon Sign — "${text}"`,
                  price,
                  quantity: 1,
                  isCustom: true,
                  customDetails: {
                    text,
                    font: selectedFont.name,
                    color: selectedColor.name,
                    size: `${selectedSize.name} (${selectedSize.length} × ${selectedSize.height})`,
                    widthInches: parseFloat(selectedSize.length),
                    backboard: `${selectedBackboardShape} (${selectedBackboardColor})`,
                    usage: isWaterproof ? "Outdoor Waterproof IP67" : "Standard Indoor LED"
                  }
                });
                triggerMascot(`Added "${text}" neon sign to cart! Total: ₹${price.toLocaleString()}`, MascotState.CELEBRATING);
              }}
              className="px-5 py-2 bg-gradient-to-r from-brand-purple to-[#9d4edd] hover:from-[#853aff] hover:to-[#a95dff] text-white rounded-full font-extrabold text-xs md:text-sm shadow-[0_0_15px_rgba(117,46,255,0.5)] transition-all flex items-center gap-2 hover:scale-105"
            >
              <span>Add To Cart</span>
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Workshop Area */}
      <div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-140px)] lg:h-[calc(100vh-140px)] lg:max-h-[820px] lg:overflow-hidden bg-[#080808] border-b border-gray-800">
        
        {/* 1. Vertical Icon Sidebar (Far Left) */}
        <div className="studio-left-menu w-full lg:w-20 bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-gray-800 flex lg:flex-col items-center justify-between py-2 lg:py-5 px-1.5 z-30 flex-shrink-0">
          <div className="flex lg:flex-col items-center justify-around lg:justify-start w-full gap-2 lg:gap-4">
            {[
              { id: 'create', label: 'CREATE', icon: <Type className="w-5 h-5" /> },
              { id: 'color', label: 'COLOR', icon: <Palette className="w-5 h-5" /> },
              { id: 'backboard', label: 'BACKING', icon: <Layers className="w-5 h-5" /> },
              { id: 'hardware', label: 'OPTIONS', icon: <Settings className="w-5 h-5" /> },
              { id: 'room', label: 'ROOM', icon: <ImageIcon className="w-5 h-5" /> },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-3 lg:py-3.5 px-1.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all relative ${isSelected ? 'studio-tab-active bg-black border-2 border-white text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-tab bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#6eff86] rounded-r-full hidden lg:block" />
                  )}
                  {tab.icon}
                  <span className="text-[10px] tracking-wider text-center uppercase leading-tight font-bold">{tab.label}</span>
                 </button>
              );
            })}
          </div>
        </div>

        {/* 2. Active Control Drawer (Left/Center Panel) */}
        <div className="studio-left-menu w-full lg:w-[350px] lg:h-full bg-[#111111] border-b lg:border-b-0 lg:border-r border-gray-800 p-5 overflow-y-auto max-h-[780px] lg:max-h-none flex-shrink-0 z-20 flex flex-col gap-5">
          {activeTab === 'create' && (
            <div className="flex flex-col gap-6">
              {/* Text Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-brand-green uppercase tracking-wider">1. Enter Your Neon Text</label>
                  <span className="text-xs text-gray-400">{text.length} chars</span>
                </div>
                <textarea
                  rows={2}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type something magical..."
                  className="w-full bg-black border border-white/80 focus:border-white rounded-xl p-3.5 text-[#6eff86] text-lg font-bold outline-none resize-none transition-colors shadow-inner [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]"
                />
              </div>

              {/* Font Style & Alignment */}
              <div>
                <label className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2 block">2. Choose Font Style & Align</label>
                <div className="grid grid-cols-2 gap-2 mb-3 max-h-48 overflow-y-auto pr-1">
                  {FONTS.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => {
                        setSelectedFont(f);
                        triggerMascot(`${f.name} font looks awesome!`, MascotState.WAVE);
                      }}
                      className={`px-3 py-2.5 rounded-xl transition-all text-left flex items-center justify-between ${selectedFont.name === f.name ? 'studio-btn-active bg-black border-2 border-white text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-btn bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                    >
                      <span className={`text-base truncate ${f.class}`}>{f.name}</span>
                      {selectedFont.name === f.name && <Check className="w-3.5 h-3.5 text-[#6eff86] flex-shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
                <div className="flex bg-black border border-white/80 rounded-xl p-1 gap-1">
                  {(['left', 'center', 'right'] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => setTextAlign(align)}
                      className={`flex-1 py-1.5 rounded-lg flex items-center justify-center transition-all ${textAlign === align ? 'studio-btn-active bg-black border-2 border-white text-[#6eff86] [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-btn bg-black border border-white/40 hover:border-white text-[#6eff86] [text-shadow:0_0_2px_rgba(110,255,134,0.5)]'}`}
                    >
                      {align === 'left' && <AlignLeft className="w-4 h-4" />}
                      {align === 'center' && <AlignCenter className="w-4 h-4" />}
                      {align === 'right' && <AlignRight className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Size Grid (6 Cards: Small to Supersized) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-brand-green uppercase tracking-wider">3. Select Size</label>
                  <span className="text-xs text-gray-400">{selectedSize.length} × {selectedSize.height}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {SIZES.map((size) => {
                    const isSelected = selectedSize.id === size.id;
                    return (
                      <div
                        key={size.id}
                        onClick={() => {
                          setSelectedSize(size);
                          triggerMascot(`${size.name} size selected (${size.length} × ${size.height})`, MascotState.TALKING);
                        }}
                        className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col justify-between ${isSelected ? 'studio-card-active bg-black border-2 border-[#752eff] text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)] scale-[1.02]' : 'studio-card bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#6eff86]">{size.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#6eff86]" />}
                        </div>
                        <div className="text-xs text-[#6eff86]/90 mt-1.5 font-semibold">
                          {size.maxLetters}
                        </div>
                        <div className="mt-2 text-sm font-extrabold text-[#6eff86]">
                          ₹{size.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'color' && (
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2 block">Choose LED Neon Color</label>
                <div className="grid grid-cols-2 gap-3">
                  {COLORS.map((c) => {
                    const isSelected = selectedColor.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => handleColorSelect(c)}
                        className={`p-3 rounded-xl transition-all flex items-center gap-3 ${isSelected ? 'studio-card-active bg-black border-2 border-white text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-card bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                      >
                        <div
                          className="w-7 h-7 rounded-full border border-white/40 flex-shrink-0"
                          style={{
                            backgroundColor: c.hex,
                            boxShadow: `0 0 10px ${c.glow}, inset 0 0 4px #ffffff`
                          }}
                        />
                        <span className="text-sm font-bold truncate text-[#6eff86] [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]">{c.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#6eff86] ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backboard' && (
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2 block">1. Acrylic Shape</label>
                <div className="flex flex-col gap-2.5">
                  {[
                    { id: 'cut', name: 'Cut to Shape', desc: 'Acrylic closely follows the letter contours (Most Popular)' },
                    { id: 'square', name: 'Whole Board / Square', desc: 'Full rectangular or square clear acrylic backing' },
                    { id: 'stand', name: 'Acrylic Stand Base', desc: 'Designed to stand on a desk, shelf, or tabletop' },
                    { id: 'none', name: 'No Backing / Minimal', desc: 'Minimalist backing for ultra-clean look' },
                  ].map((shape) => {
                    const isSelected = selectedBackboardShape === shape.id;
                    return (
                      <div
                        key={shape.id}
                        onClick={() => {
                          setSelectedBackboardShape(shape.id as any);
                          triggerMascot(`${shape.name} backing looks super clean!`, MascotState.WAVE);
                        }}
                        className={`p-3.5 rounded-xl transition-all cursor-pointer ${isSelected ? 'studio-card-active bg-black border-2 border-white text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-card bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                      >
                        <div className="flex items-center justify-between font-bold text-sm text-[#6eff86]">
                          <span>{shape.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#6eff86]" />}
                        </div>
                        <p className="text-xs text-[#6eff86]/80 mt-1">{shape.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2 block">2. Backboard Color</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'clear', name: 'Transparent Clear' },
                    { id: 'black', name: 'Gloss Black' },
                    { id: 'white', name: 'Gloss White' },
                    { id: 'mirror', name: 'Mirrored Silver' },
                  ].map((color) => {
                    const isSelected = selectedBackboardColor === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedBackboardColor(color.id as any)}
                        className={`p-3 rounded-xl transition-all text-sm font-bold ${isSelected ? 'studio-card-active bg-black border-2 border-white text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-card bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                      >
                        {color.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hardware' && (
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2 block">1. Mounting Kit</label>
                <div className="flex flex-col gap-2.5">
                  {[
                    { id: 'screws', name: 'Wall Screws & Drill Holes', desc: 'Pre-drilled holes with stainless steel spacers included (Free)' },
                    { id: 'wire', name: 'Hanging Wire Kit', desc: 'Stainless steel wire loop kit for window or ceiling hanging (Free)' },
                    { id: 'stand', name: 'Tabletop Acrylic Stand', desc: 'Stable desk mount for tables & reception counters (+₹800)' },
                  ].map((mount) => {
                    const isSelected = selectedMounting === mount.id;
                    return (
                      <div
                        key={mount.id}
                        onClick={() => setSelectedMounting(mount.id as any)}
                        className={`p-3.5 rounded-xl transition-all cursor-pointer ${isSelected ? 'studio-card-active bg-black border-2 border-white text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-card bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                      >
                        <div className="flex items-center justify-between font-bold text-sm text-[#6eff86]">
                          <span>{mount.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#6eff86]" />}
                        </div>
                        <p className="text-xs text-[#6eff86]/80 mt-1">{mount.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2 block">2. Dimmer & Controller</label>
                <div className="flex flex-col gap-2.5">
                  <div
                    onClick={() => setHasSmartController(false)}
                    className={`p-3.5 rounded-xl transition-all cursor-pointer ${!hasSmartController ? 'studio-card-active bg-black border-2 border-white text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-card bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm text-[#6eff86]">
                      <span>Standard Brightness Dimmer</span>
                      <span className="text-xs font-extrabold text-[#6eff86]">FREE</span>
                    </div>
                    <p className="text-xs text-[#6eff86]/80 mt-1">Manual inline dimmer button to adjust 10–100% brightness</p>
                  </div>
                  <div
                    onClick={() => {
                      setHasSmartController(true);
                      triggerMascot("Smart WiFi/Remote added! Adjust brightness from your couch.", MascotState.WAVE);
                    }}
                    className={`p-3.5 rounded-xl transition-all cursor-pointer ${hasSmartController ? 'studio-card-active bg-black border-2 border-white text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-card bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm text-[#6eff86]">
                      <span>Smart WiFi & Wireless Remote</span>
                      <span className="text-xs font-extrabold text-[#6eff86]">+₹2,000</span>
                    </div>
                    <p className="text-xs text-[#6eff86]/80 mt-1">Remote control, party flash modes, timer & Alexa/Google Assistant</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2 block">3. Indoor / Outdoor Protection</label>
                <div className="flex flex-col gap-2.5">
                  <div
                    onClick={() => setIsWaterproof(false)}
                    className={`p-3.5 rounded-xl transition-all cursor-pointer ${!isWaterproof ? 'studio-card-active bg-black border-2 border-white text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-card bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm text-[#6eff86]">
                      <span>Standard Indoor LED</span>
                      <span className="text-xs font-extrabold text-[#6eff86]">FREE</span>
                    </div>
                    <p className="text-xs text-[#6eff86]/80 mt-1">Perfect for bedroom, living room, office & indoor events</p>
                  </div>
                  <div
                    onClick={() => setIsWaterproof(true)}
                    className={`p-3.5 rounded-xl transition-all cursor-pointer ${isWaterproof ? 'studio-card-active bg-black border-2 border-white text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-card bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm text-[#6eff86]">
                      <span>IP67 Waterproof Outdoor (+15%)</span>
                      <span className="text-xs font-extrabold text-[#6eff86]">+₹3,000</span>
                    </div>
                    <p className="text-xs text-[#6eff86]/80 mt-1">Sealed weatherproof silicone housing for rain, snow & direct sun</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'room' && (
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2 block">Select Room Background</label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {backgroundsList.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => {
                        setSelectedBg(bg);
                        setIsCalibrating(false);
                        triggerMascot(`Changed room to ${bg.name}!`, MascotState.WAVE);
                      }}
                      className={`p-2 rounded-xl transition-all flex flex-col gap-2 ${selectedBg.id === bg.id ? 'studio-card-active bg-black border-2 border-white text-[#6eff86] font-extrabold [text-shadow:0_0_2px_#6eff86,0_0_6px_rgba(110,255,134,0.7)] shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'studio-card bg-black border border-white/80 hover:border-white text-[#6eff86] font-bold [text-shadow:0_0_2px_rgba(110,255,134,0.5)] hover:[text-shadow:0_0_3px_#6eff86,0_0_6px_rgba(110,255,134,0.7)]'}`}
                    >
                      <div
                        className="w-full h-20 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url('${bg.url}')` }}
                      />
                      <span className="text-xs font-bold text-[#6eff86] text-center truncate w-full">{bg.name}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-brand-purple uppercase tracking-wider">Preview On Your Own Wall</label>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-purple/20 text-[#6eff86] border border-[#6eff86]/40 [text-shadow:0_0_2px_#6eff86]">
                    ✨ Recommended
                  </span>
                </div>
                <label className="w-full bg-gradient-to-r from-brand-purple/10 via-black to-[#6eff86]/10 border-2 border-dashed border-brand-purple/60 hover:border-[#6eff86] rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 group shadow-[0_0_18px_rgba(117,46,255,0.18)] hover:shadow-[0_0_25px_rgba(110,255,134,0.25)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                  <Upload className="w-6 h-6 text-[#6eff86] group-hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(110,255,134,0.6)]" />
                  <span className="text-sm font-extrabold text-white text-center [text-shadow:0_0_2px_rgba(255,255,255,0.7)] group-hover:text-[#6eff86] transition-colors">See Your Neon Sign On Your Own Wall</span>
                  <span className="text-[10px] text-gray-400 font-medium">Upload photo of your room or wall (JPG, PNG)</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              {selectedBg.id === 'custom' && (
                <div className="bg-[#151515] border border-brand-purple/40 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-purple uppercase">Room Scale Calibration</span>
                    <button
                      onClick={() => {
                        setIsCalibrating(true);
                        triggerMascot("Drag the red line over a known object in your photo to calibrate dimensions!", MascotState.TALKING);
                      }}
                      className="text-xs font-bold text-[#6eff86] hover:underline"
                    >
                      {calibrationRatio ? 'Recalibrate' : 'Start Calibration'}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {calibrationRatio ? 'Room scale calibrated! Your sign is shown at realistic physical dimensions.' : 'Calibrate your room photo to preview your sign at 100% accurate physical scale.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. Center/Right Workshop Preview Canvas */}
        <div className="flex-1 relative overflow-hidden bg-[#090909] h-[560px] lg:h-full lg:min-h-0 flex items-center justify-center p-4 sm:p-8 lg:p-10 xl:p-12">
          
          {/* Measurement Workshop Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:24px_24px] opacity-90 pointer-events-none" />

          {/* Left Step Navigation Button (Floating on grid to the left of the Room Box) */}
          <button
            onClick={prevTab}
            disabled={activeTab === 'create'}
            className={`absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-30 px-3.5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-2xl ${activeTab === 'create' ? 'opacity-30 border-gray-800 bg-[#111] text-gray-600 cursor-not-allowed' : 'bg-[#151515] border-gray-700 text-gray-200 hover:text-white hover:border-[#6eff86] hover:bg-black hover:scale-105'}`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden xl:inline">PREV</span>
          </button>

          {/* Right Step Navigation Button (Floating on grid to the right of the Room Box) */}
          <button
            onClick={nextTab}
            disabled={activeTab === 'room'}
            className={`absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-30 px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-2xl ${activeTab === 'room' ? 'opacity-30 border-gray-800 bg-[#111] text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-[#141414] to-[#1e1e1e] border-[#6eff86] text-[#6eff86] hover:bg-[#6eff86] hover:text-black shadow-[0_0_15px_rgba(110,255,134,0.3)] hover:scale-105'}`}
          >
            <span className="hidden xl:inline">NEXT</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Centered Studio Room Photo Box */}
          <div className="relative w-full max-w-[1040px] max-h-[620px] aspect-[16/9] bg-[#101010] rounded-lg overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.85)] flex items-center justify-center z-20">
            
            {/* Stable landscape room photo, matching the reference-style preview stage. */}
            <img
              src={selectedBg.url}
              alt={selectedBg.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isCalibrating ? 'opacity-100 z-10' : 'opacity-[0.9]'}`}
              style={{ objectPosition: roomFocalPoint }}
            />

            {/* Top-Left: Realistic ON/OFF Switch */}
            <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
              <button
                onClick={() => setIsLightOn(!isLightOn)}
                className={`w-[76px] h-[34px] rounded-full transition-all duration-300 relative flex items-center shadow-lg focus:outline-none border border-white/20 ${isLightOn ? 'bg-[#58cc02] shadow-[0_0_15px_rgba(88,204,2,0.6)]' : 'bg-[#4a4a4a]'}`}
                aria-label="Toggle neon light on or off"
              >
                <span className={`absolute font-black text-[11px] tracking-wide text-white transition-opacity duration-300 ${isLightOn ? 'left-3 opacity-100' : 'left-3 opacity-0'}`}>ON</span>
                <span className={`absolute font-black text-[11px] tracking-wide text-white transition-opacity duration-300 ${!isLightOn ? 'right-2.5 opacity-100' : 'right-2.5 opacity-0'}`}>OFF</span>
                <div className={`w-[24px] h-[24px] bg-white rounded-full absolute transition-transform duration-300 ease-in-out shadow-md ${isLightOn ? 'translate-x-[48px]' : 'translate-x-[4px]'}`} />
              </button>
            </div>

            {/* Top-Right: Ruler Button */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
              <button
                onClick={() => setShowRuler(!showRuler)}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-lg ${showRuler ? 'bg-[#6eff86] border-[#6eff86] text-black shadow-[0_0_15px_rgba(110,255,134,0.4)]' : 'bg-black/60 border-white/20 text-white hover:border-white'}`}
                title="Toggle Measurement Ruler"
              >
                <Ruler className="w-4 h-4" />
              </button>
            </div>

            {/* Calibration Overlay */}
            {isCalibrating && selectedBg.id === 'custom' && (
              <div className="absolute inset-0 z-40 pointer-events-none">
                {/* 1. Draggable Calibration Modal Box (Starts Top-Left so it never covers the red line) */}
                <motion.div 
                  drag 
                  dragMomentum={false} 
                  dragElastic={0.1}
                  className="absolute top-6 left-6 z-50 bg-black/95 border-2 border-brand-purple rounded-xl p-6 max-w-md w-full shadow-[0_0_30px_rgba(117,46,255,0.4)] pointer-events-auto cursor-move"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Ruler className="w-5 h-5 text-brand-purple" />
                      Calibrate Room Scale
                    </h3>
                    <span className="text-[10px] bg-brand-purple/30 text-brand-purple px-2 py-0.5 rounded uppercase font-bold tracking-wider">Drag Me</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-6">Drag this box or the red line anywhere on the image. Position the red line over a real object in your room (like a TV, door, or pillow), resize it to match, then tell us how wide it is.</p>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] text-brand-purple font-bold uppercase tracking-wider mb-1 block">Object Width (Inches)</label>
                      <input 
                        type="number" 
                        value={calibrationInches}
                        onChange={(e) => setCalibrationInches(e.target.value)}
                        className="w-full bg-[#111] border border-white/20 rounded-lg px-4 py-3 text-white text-lg outline-none focus:border-brand-purple transition-colors"
                        placeholder="e.g. 50"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        if (calibrationInches) {
                          const px = calibrationLineWidth;
                          const inches = parseFloat(calibrationInches);
                          if (inches > 0) {
                            setCalibrationRatio(px / inches);
                            setIsCalibrating(false);
                            triggerMascot("Perfect! We've made the scale as realistic as possible for your room, but please note this is just a visualization.", MascotState.CELEBRATING);
                          }
                        }
                      }}
                      className="self-end h-[52px] px-6 bg-brand-purple hover:bg-brand-purple/80 text-white rounded-lg font-bold transition-colors cursor-pointer"
                    >
                      Set Scale
                    </button>
                  </div>
                </motion.div>

                {/* 2. Draggable & Resizable Calibration Red Line (Starts centered, never hidden!) */}
                <motion.div 
                  drag 
                  dragMomentum={false}
                  dragElastic={0.1}
                  className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center"
                >
                  <div 
                    className="h-1.5 bg-red-500 relative min-w-[50px] shadow-[0_0_15px_rgba(239,68,68,0.8)] pointer-events-auto cursor-move"
                    style={{ width: `${calibrationLineWidth}px`, maxWidth: '90vw' }}
                  >
                    {/* Resize Handle (Touch Friendly) */}
                    <motion.div 
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0}
                      dragMomentum={false}
                      onDrag={(e, info) => setCalibrationLineWidth(prev => Math.max(50, prev + info.delta.x))}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-10 bg-white rounded-md border-2 border-red-500 cursor-ew-resize flex flex-col items-center justify-center shadow-lg translate-x-1/2" 
                      style={{ pointerEvents: 'auto' }}
                    >
                      <div className="flex gap-1">
                        <div className="w-0.5 h-5 bg-gray-400 rounded-full" />
                        <div className="w-0.5 h-5 bg-gray-400 rounded-full" />
                      </div>
                    </motion.div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-white rounded-sm border border-red-500" />
                  </div>
                </motion.div>
              </div>
            )}

            {/* Calibration Trigger Button */}
            {selectedBg.id === 'custom' && !isCalibrating && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                <button
                  onClick={() => setIsCalibrating(true)}
                  className="px-6 py-2.5 bg-brand-purple hover:bg-brand-purple/80 text-white rounded-full font-bold shadow-[0_0_20px_rgba(117,46,255,0.4)] transition-all flex items-center gap-2 text-sm"
                >
                  <Ruler className="w-4 h-4" />
                  Calibrate Room Size
                </button>
              </div>
            )}

            {/* Center: The Neon Sign Text & Backboard */}
            <div ref={containerRef} className="absolute inset-x-[12%] top-[34%] z-20 flex -translate-y-1/2 flex-col items-center justify-center">
              {/* 1. Outer Draggable Container (Framer Motion controls X/Y translation during drag without layout/scale collisions) */}
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                className="relative inline-block cursor-grab active:cursor-grabbing z-30"
              >
                {/* 2. Inner Scaled Container (React controls scale without interfering with drag transform!) */}
                <div
                  ref={textRef}
                  className={`relative inline-block max-w-full p-4 md:p-5 transition-colors duration-300 ${selectedBackboardShape === 'cut' ? 'rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-[2px]' : selectedBackboardShape === 'square' ? 'rounded-xl border-2 border-white/15 bg-black/30 backdrop-blur-sm shadow-2xl' : selectedBackboardShape === 'stand' ? 'rounded-t-xl border-x border-t border-white/10 bg-white/[0.04] pb-8' : ''}`}
                  style={{
                    transform: `scale(${finalScale * 0.66})`,
                    transformOrigin: 'center center',
                  }}
                >
                  {/* The Neon Text */}
                  <h2
                    className={`studio-neon-sign-preview font-bold transition-all duration-300 text-center ${selectedFont.class}`}
                    style={{
                      ...getNeonTextStyle(selectedColor, isLightOn),
                      textAlign: textAlign,
                    }}
                  >
                    {text || 'Your Neon Sign'}
                  </h2>

                  {/* Acrylic Stand Base bottom border if stand selected */}
                  {selectedBackboardShape === 'stand' && (
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-2.5 bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 rounded-b-md shadow-lg" />
                  )}

                  {/* Measurement Dimension Brackets (When Ruler is ON) */}
                  {showRuler && (
                    <div className="absolute -inset-6 pointer-events-none z-30">
                      {/* Top Horizontal Dimension Line */}
                      <div className="absolute -top-4 left-0 right-0 flex items-center justify-center">
                        <div className="h-[2px] bg-[#6eff86]/80 flex-1 border-t border-dashed border-[#6eff86]" />
                        <span className="px-3.5 py-1 bg-black border-2 border-[#6eff86] text-[#6eff86] text-sm md:text-base font-black rounded-md shadow-[0_0_15px_rgba(110,255,134,0.7)] tracking-wide mx-2">
                          {selectedSize.length}
                        </span>
                        <div className="h-[2px] bg-[#6eff86]/80 flex-1 border-t border-dashed border-[#6eff86]" />
                      </div>

                      {/* Left Vertical Dimension Line */}
                      <div className="absolute top-0 -left-6 bottom-0 flex flex-col items-center justify-center">
                        <div className="w-[2px] bg-[#6eff86]/80 flex-1 border-l border-dashed border-[#6eff86]" />
                        <span className="px-3.5 py-1 bg-black border-2 border-[#6eff86] text-[#6eff86] text-sm md:text-base font-black rounded-md shadow-[0_0_15px_rgba(110,255,134,0.7)] tracking-wide -rotate-90 my-3 whitespace-nowrap">
                          {selectedSize.height}
                        </span>
                        <div className="w-[2px] bg-[#6eff86]/80 flex-1 border-l border-dashed border-[#6eff86]" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
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
