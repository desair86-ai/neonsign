"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Footer } from "@/components/clone/Footer";
import { 
  Check, Ruler, Info, X, AlignLeft, AlignCenter, AlignRight, Upload,
  Type, Palette, Layers, Settings, Image as ImageIcon, ChevronLeft, ChevronRight,
  ShoppingBag, Bookmark, Sparkles, Sliders, Moon, Sun, Sunset, Heart, Star, Zap, Crown, Trash2
} from 'lucide-react';
import { motion } from "framer-motion";
import { useMascot } from "@/hooks/useMascot";
import { MascotState } from "@/components/mascot/MascotStateMachine";
import { ButtonParticles } from '@/components/ui/button-particles';
import { useCart } from "@/lib/CartContext";

const FONTS = [
  { name: 'Clonoid', class: 'font-clonoid', category: 'popular' },
  { name: 'Poppins', class: 'font-poppins', category: 'popular' },
  { name: 'Passionate', class: 'font-pacifico', category: 'popular' },
  { name: 'Dreamy', class: 'font-dancing', category: 'popular' },
  { name: 'Flowy', class: 'font-caveat', category: 'script' },
  { name: 'Original', class: 'font-bungee-outline', category: 'bold' },
  { name: 'Classic', class: 'font-cinzel', category: 'classic' },
  { name: 'Baylee', class: 'font-great-vibes', category: 'elegant' },
  { name: 'Funky', class: 'font-permanent-marker', category: 'modern' },
  { name: 'Chic', class: 'font-parisienne', category: 'elegant' },
  { name: 'Delight', class: 'font-playfair', category: 'classic' },
  { name: 'Classy', class: 'font-cookie', category: 'classic' },
  { name: 'Romantic', class: 'font-alex-brush', category: 'script' },
  { name: 'ROBO', class: 'font-syncopate', category: 'modern' },
  { name: 'Charming', class: 'font-bad-script', category: 'script' },
  { name: 'Quirky', class: 'font-gochi-hand', category: 'modern' },
  { name: 'Stylish', class: 'font-kaushan-script', category: 'bold' },
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
  { name: 'Mojo Mix (RGB)', hex: '#ffffff', glow: 'rgba(117,46,255,0.8)' },
];

// Realistic LED Neon Tube & Wall Light Spillage (Addressing Point #3 & #9)
function getNeonTextStyle(color: (typeof COLORS)[number], isLightOn: boolean = true) {
  if (!isLightOn) {
    return {
      color: color.hex,
      textShadow: 'none',
      filter: 'none',
      fontSize: 'clamp(2.4rem, 5.8vw, 6.5rem)',
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
      0 0 5px ${color.hex},
      0 0 15px ${color.hex},
      0 0 30px ${color.glow},
      0 0 50px ${color.glow}
    `,
    filter: `drop-shadow(0 0 10px ${color.glow})`,
    fontSize: 'clamp(2.4rem, 5.8vw, 6.5rem)',
    lineHeight: '1.1',
    whiteSpace: 'pre' as const,
    WebkitTextStroke: `1px ${color.hex}`,
    opacity: 1,
  };
}

const SIZES = [
  {
    id: 'small',
    name: 'Small (10" Height)',
    multiplier: 0.7,
    heightInches: 10,
    singleConfig: { lengthPerLetter: 3, firstLetterPrice: 2300, addedLetterPrice: 300 },
    mojoConfig: { lengthPerLetter: 3.5, firstLetterPrice: 5400, addedLetterPrice: 700 }
  },
  {
    id: 'medium',
    name: 'Medium (13" Height)',
    multiplier: 0.85,
    heightInches: 13,
    singleConfig: { lengthPerLetter: 4, firstLetterPrice: 3600, addedLetterPrice: 500 },
    mojoConfig: { lengthPerLetter: 4.5, firstLetterPrice: 6700, addedLetterPrice: 800 }
  },
  {
    id: 'large',
    name: 'Large (15" Height)',
    multiplier: 1,
    heightInches: 15,
    singleConfig: { lengthPerLetter: 5, firstLetterPrice: 4800, addedLetterPrice: 600 },
    mojoConfig: { lengthPerLetter: 5.5, firstLetterPrice: 8000, addedLetterPrice: 900 }
  },
  {
    id: 'xlarge',
    name: 'Extra Large (17" Height)',
    multiplier: 1.15,
    heightInches: 17,
    singleConfig: { lengthPerLetter: 7, firstLetterPrice: 6000, addedLetterPrice: 800 },
    mojoConfig: { lengthPerLetter: 7.5, firstLetterPrice: 9300, addedLetterPrice: 1100 }
  },
];

export function getCalculatedDimensions(sizeId: string, colorName: string, textStr: string, shapeCount: number = 0) {
  const size = SIZES.find((s) => s.id === sizeId) || SIZES[1];
  const isMojo = colorName.includes('Mojo');
  const config = isMojo ? size.mojoConfig : size.singleConfig;
  const chars = Math.max(1, textStr.replace(/\s/g, '').length);
  const length = chars * config.lengthPerLetter;
  let price = config.firstLetterPrice + (chars - 1) * config.addedLetterPrice;
  
  // Add 1500 for each shape
  price += shapeCount * 1500;

  return {
    length: `${length.toFixed(2)}"`,
    height: `${size.heightInches.toFixed(2)}"`,
    price: price,
  };
}

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
  { id: 'bg-bedroom', name: 'Bedroom', url: '/bedroom.png' },
  { id: 'bg-cafe', name: 'Cafe Background', url: '/cafe-background.png' },
  { id: 'bg-gaming', name: 'Gaming Room', url: '/gaming-room.png' },
  { id: 'bg-wedding', name: 'Wedding Backdrop', url: '/wedding-backdrop.png' },
  { id: 'bg-restaurant', name: 'Restaurant', url: '/restaurant.png' },
  { id: 'bg-office', name: 'Office Reception', url: '/office-reception.png' },
  { id: 'bg-salon', name: 'Salon', url: '/salon.png' },
  { id: 'bg-bar', name: 'Bar', url: '/bar.png' },
  { id: 'bg-kids', name: 'Kids Room', url: '/kids-room.png' },
  { id: 'bg-gym', name: 'Home Gym', url: '/home-gym.png' },
];

const DEFAULT_ROOM_BACKGROUND = BACKGROUNDS[0];

export function NeonSignBuilder({ isMojoMix = false }: { isMojoMix?: boolean }) {
  const [text, setText] = useState('The Neon Stack');
  const [isLightOn, setIsLightOn] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'color' | 'backboard' | 'hardware' | 'room'>('create');
  const [showRuler, setShowRuler] = useState(true);
  const [selectedBackboardShape, setSelectedBackboardShape] = useState<'cut' | 'square' | 'stand' | 'none'>('cut');
  const [selectedBackboardColor, setSelectedBackboardColor] = useState<'clear' | 'black' | 'white' | 'mirror'>('clear');
  const [selectedMounting, setSelectedMounting] = useState<'screws' | 'wire' | 'stand'>('screws');

  const TABS = isMojoMix 
    ? ['create', 'backboard', 'hardware', 'room'] as const 
    : ['create', 'color', 'backboard', 'hardware', 'room'] as const;

  const prevTab = () => {
    const idx = TABS.indexOf(activeTab as any);
    if (idx > 0) setActiveTab(TABS[idx - 1] as any);
  };
  const nextTab = () => {
    const idx = TABS.indexOf(activeTab as any);
    if (idx < TABS.length - 1) setActiveTab(TABS[idx + 1] as any);
  };

  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationInches, setCalibrationInches] = useState<string>('50');
  const [calibrationRatio, setCalibrationRatio] = useState<number | null>(null);
  const [calibrationLineWidth, setCalibrationLineWidth] = useState(300);
  
  const [backgroundsList, setBackgroundsList] = useState(BACKGROUNDS);
  const [selectedBg, setSelectedBg] = useState(DEFAULT_ROOM_BACKGROUND);

  // New states for the 9-Point Redesign
  const [fontCategory, setFontCategory] = useState<'popular' | 'elegant' | 'modern' | 'script' | 'bold' | 'classic' | 'all'>('popular');
  const [roomLightingMood, setRoomLightingMood] = useState<'night' | 'evening' | 'day'>('day');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    fetch('/api/settings/backgrounds')
      .then(res => res.json())
      .then(data => {
        if (data.backgrounds && data.backgrounds.length > 0) {
          const excludedNames = ['dark studio', 'brick wall', 'living room'];
          const customBackgrounds = data.backgrounds.filter(
            (bg: Background) => 
              !BACKGROUNDS.some(defaultBg => defaultBg.id === bg.id || defaultBg.url === bg.url) &&
              !excludedNames.some(ex => bg.name?.toLowerCase().includes(ex))
          );
          setBackgroundsList([...BACKGROUNDS, ...customBackgrounds]);
        }
      })
      .catch(console.error);
  }, []);

  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const defaultColor = isMojoMix ? COLORS.find(c => c.name.includes('Mojo'))! : COLORS[2];
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]); // Medium default
  const [isWaterproof, setIsWaterproof] = useState(false);
  const [hasSmartController, setHasSmartController] = useState(false);
  const [addedShapes, setAddedShapes] = useState<{ id: string, type: string, color?: typeof COLORS[number] }[]>([]);
  const [isMultiColor, setIsMultiColor] = useState(false);
  const [letterColors, setLetterColors] = useState<Record<number, typeof COLORS[number]>>({});
  const [selectedItemForColor, setSelectedItemForColor] = useState<number | string | null>(null);

  const { speak } = useMascot();
  const triggerMascot = (msg: string, state?: MascotState) => speak(msg, state);
  const { addToCart, cart } = useCart();

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [dynamicScale, setDynamicScale] = useState<number | null>(null);

  const handleColorSelect = (c: typeof COLORS[number]) => {
    if (isMultiColor && selectedItemForColor !== null) {
      if (typeof selectedItemForColor === 'number') {
        setLetterColors(prev => ({ ...prev, [selectedItemForColor]: c }));
        triggerMascot(`Letter color updated!`, MascotState.TALKING);
      } else {
        setAddedShapes(prev => prev.map(s => s.id === selectedItemForColor ? { ...s, color: c } : s));
        triggerMascot(`Shape color updated!`, MascotState.TALKING);
      }
    } else {
      setSelectedColor(c);
      triggerMascot(`${c.name} is such a vibrant choice!`, MascotState.TALKING);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedBg({ id: 'custom', name: 'Your Custom Room', url });
      setCalibrationRatio(null);
      triggerMascot("Awesome room photo! Let's preview your custom sign on your wall.", MascotState.CELEBRATING);
    }
  };

  // Dynamic pricing based on size and protection
  const price = useMemo(() => {
    let total = getCalculatedDimensions(selectedSize.id, selectedColor.name, text, addedShapes.length).price;
    if (isWaterproof) total += 3000;
    if (hasSmartController) total += 2000;
    return Math.round(total);
  }, [selectedSize, selectedColor, text, isWaterproof, hasSmartController]);

  const roomFocalPoint = 'center center';

  const currentScale = useMemo(() => {
    const defaultScale = 0.85 + (selectedSize.multiplier - 1) * 0.12;
    if (!selectedBg.settings) return defaultScale;
    
    const s = selectedBg.settings;
    let scale;
    switch (selectedSize.id) {
      case 'small': scale = s.scale_small; break;
      case 'medium': scale = s.scale_medium; break;
      case 'large': scale = s.scale_large; break;
      case 'xlarge': scale = s.scale_xlarge; break;
    }
    return scale ?? defaultScale;
  }, [selectedSize, selectedBg]);

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
      
      let normalizedScale: number;
      const dims = getCalculatedDimensions(selectedSize.id, selectedColor.name, text, addedShapes.length);
      if (selectedBg.id === 'custom' && calibrationRatio !== null) {
        const physicalInches = parseFloat(dims.length);
        const targetWidthPixels = physicalInches * calibrationRatio;
        normalizedScale = targetWidthPixels / textWidth;
        const maxAllowedScale = currentScale * 2.4;
        normalizedScale = Math.min(normalizedScale, maxAllowedScale);
      } else {
        let baseScale = 0.5;
        if (selectedSize.id === 'small') baseScale = 0.4;
        else if (selectedSize.id === 'medium') baseScale = 0.5;
        else if (selectedSize.id === 'large') baseScale = 0.65;
        else if (selectedSize.id === 'xlarge') baseScale = 0.8;
        
        // Exact replication of NeonChamp logic: 
        // We allow the text to scale up visually, BUT we rigidly clamp it at 90% of the container width.
        // Once it hits the container width, selecting a larger size will NOT visually change the size on screen,
        // it will only update the physical ruler numbers.
        let maxFitScale = (containerWidth * 0.9) / textWidth;
        
        let cappedScale = Math.min(baseScale, maxFitScale);
        
        // The user noted that on the competitor site, the text size DOES change *slightly* 
        // even when clamped to the bounding box. 
        // We add a micro-adjustment based on the size category to simulate this subtle visual bump.
        let microAdjustment = 1.0;
        if (selectedSize.id === 'small') microAdjustment = 0.95;
        else if (selectedSize.id === 'medium') microAdjustment = 1.0;
        else if (selectedSize.id === 'large') microAdjustment = 1.03;
        else if (selectedSize.id === 'xlarge') microAdjustment = 1.06;

        normalizedScale = cappedScale * microAdjustment;
      }
      
      setDynamicScale(normalizedScale);
    };

    measure(true);
    
    const observer = new ResizeObserver(() => measure(false));
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [text, selectedFont, currentScale, selectedBg, textAlign, calibrationRatio, selectedSize.id, selectedColor.name]);

  const finalScale = dynamicScale !== null ? dynamicScale : currentScale;

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="min-h-screen text-white font-sans selection:bg-brand-purple/30 selection:text-brand-lavender bg-[#080808]">
      
      {/* 1. Minimalist Configurator Header (Addressing Point #7: Removed competing navigation, kept only Logo, Help, Save, Cart) */}
      <header className="w-full bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/10 px-4 md:px-8 h-20 flex items-center justify-between sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/main logo.png" 
              alt="The Neon Stack Logo" 
              className="h-[76px] md:h-[95px] w-auto object-contain my-[-15px] group-hover:scale-105 transition-transform" 
            />
          </Link>
          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            <span className="text-xs font-black text-brand-green uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Configurator</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-xs font-semibold text-gray-300">100% Handcrafted LED Neon</span>
          </div>
        </div>

        {/* Action Buttons (Addressing Point #8: Clear Hierarchy) */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Primary CTA in Header (Sticky & Accessible from Anywhere) */}
          <ButtonParticles
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
                  size: `${selectedSize.name} (${getCalculatedDimensions(selectedSize.id, selectedColor.name, text, addedShapes.length).length} × ${getCalculatedDimensions(selectedSize.id, selectedColor.name, text, addedShapes.length).height})`,
                  widthInches: parseFloat(getCalculatedDimensions(selectedSize.id, selectedColor.name, text, addedShapes.length).length),
                  backboard: `${selectedBackboardShape} (${selectedBackboardColor})`,
                  usage: isWaterproof ? "Outdoor Waterproof IP67" : "Standard Indoor LED"
                }
              });
              triggerMascot(`Added "${text}" neon sign to cart! Total: ₹${price.toLocaleString()}`, MascotState.CELEBRATING);
            }}
            label={`ADD TO CART — ₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
            icon={<ShoppingBag className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-[#6eff86]" />}
          />

          <button
            onClick={() => setShowHelpModal(true)}
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5 text-gray-400" />
            <span className="hidden sm:inline">Help</span>
          </button>

          <button
            onClick={() => {
              setSaveToast(true);
              triggerMascot("Your design progress is saved to your browser session!", MascotState.CELEBRATING);
              setTimeout(() => setSaveToast(false), 3000);
            }}
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Bookmark className="w-3.5 h-3.5 text-brand-purple" />
            <span>Save</span>
          </button>

          <Link
            href="/cart"
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-white" />
            <span>Cart</span>
            <span className="bg-brand-green text-black px-1.5 py-0.5 rounded-full text-[10px] font-extrabold">
              {cartCount}
            </span>
          </Link>
        </div>
      </header>

      {/* Main Studio Workshop Area */}
      <div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] lg:max-h-[860px] lg:overflow-hidden bg-[#070707] border-b border-gray-800">
        
        {/* Left Step Navigation Bar */}
        <div className="studio-left-menu w-full lg:w-20 bg-[#0b0b0b] border-b lg:border-b-0 lg:border-r border-white/10 flex lg:flex-col items-center justify-between py-2 lg:py-5 px-1.5 z-30 flex-shrink-0">
          <div className="flex lg:flex-col items-center justify-around lg:justify-start w-full gap-2 lg:gap-4">
            {[
              { id: 'create', label: 'CREATE', icon: <Type className="w-5 h-5" /> },
              ...(!isMojoMix ? [{ id: 'color', label: 'COLOR', icon: <Palette className="w-5 h-5" /> }] : []),
              { id: 'backboard', label: 'BACKING', icon: <Layers className="w-5 h-5" /> },
              { id: 'hardware', label: 'HARDWARE', icon: <Settings className="w-5 h-5" /> },
              { id: 'room', label: 'ROOM', icon: <ImageIcon className="w-5 h-5" /> },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`group relative flex lg:flex-col items-center justify-center gap-1.5 w-full py-2.5 lg:py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-black border-2 border-brand-purple text-white font-extrabold shadow-[0_0_15px_rgba(117,46,255,0.45)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center justify-center">{item.icon}</div>
                  <span className="text-[10px] tracking-wider font-bold">{item.label}</span>
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-purple rounded-l-full hidden lg:block" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex flex-col items-center gap-4">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest rotate-180 [writing-mode:vertical-lr]">
              NEON STACK
            </span>
          </div>
        </div>

        {/* 2. Layered Glassmorphic Sidebar Card (Addressing Point #1 & #5: 40% Less Green, Generous Spacing, Premium Cards) */}
        <div className="w-full lg:w-[450px] bg-zinc-900/60 backdrop-blur-2xl border-r border-white/10 p-5 md:p-6 overflow-y-auto z-20 flex flex-col justify-between flex-shrink-0">
          <div className="space-y-7">
            
            {/* TAB 1: CREATE (Text, Font, Size) */}
            {activeTab === 'create' && (
              <div className="flex flex-col gap-6">
                
                {/* 1. Text Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-extrabold text-white uppercase tracking-wider">
                      1. Enter Neon Text
                    </label>
                    <span className="text-xs text-gray-400">{text.length} chars</span>
                  </div>
                  <textarea
                    rows={2}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type something magical..."
                    className="w-full bg-black/60 border border-white/20 focus:border-white rounded-xl p-3.5 text-white text-lg font-bold outline-none resize-none transition-colors shadow-inner"
                  />
                </div>

                {/* 2. Categorized Font Selector (Addressing Point #6: Categorized Pills & Dropdown) */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-extrabold text-white uppercase tracking-wider">
                      2. Choose Font Style
                    </label>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {FONTS.length} Fonts Available
                    </span>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
                    {[
                      { id: 'popular', label: 'Popular ⭐' },
                      { id: 'elegant', label: 'Elegant' },
                      { id: 'modern', label: 'Modern' },
                      { id: 'script', label: 'Script' },
                      { id: 'bold', label: 'Bold' },
                      { id: 'classic', label: 'Classic' },
                      { id: 'all', label: 'See All ▾' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setFontCategory(cat.id as any)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                          fontCategory === cat.id
                            ? 'bg-white text-black shadow-md'
                            : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Dropdown menu when 'all' is selected */}
                  {fontCategory === 'all' && (
                    <div className="mb-3">
                      <select
                        value={selectedFont.name}
                        onChange={(e) => {
                          const f = FONTS.find(font => font.name === e.target.value);
                          if (f) {
                            setSelectedFont(f);
                            triggerMascot(`${f.name} font looks awesome!`, MascotState.WAVE);
                          }
                        }}
                        className="w-full bg-black/80 border border-white/20 rounded-xl px-3.5 py-3 text-white font-bold outline-none focus:border-white transition-colors"
                      >
                        {FONTS.map((f) => (
                          <option key={f.name} value={f.name}>
                            {f.name} Font Style
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Font Cards Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3 max-h-52 overflow-y-auto pr-1">
                    {FONTS.filter(f => fontCategory === 'all' || f.category === fontCategory).map((f) => {
                      const isSelected = selectedFont.name === f.name;
                      return (
                        <button
                          key={f.name}
                          onClick={() => {
                            setSelectedFont(f);
                            triggerMascot(`${f.name} font looks awesome!`, MascotState.WAVE);
                          }}
                          className={`px-3.5 py-2.5 rounded-xl transition-all text-left flex items-center justify-between ${
                            isSelected
                              ? 'bg-black border-2 border-brand-purple text-white font-extrabold shadow-[0_0_15px_rgba(117,46,255,0.45)]'
                              : 'bg-white/[0.04] border border-white/10 hover:border-white/30 text-gray-200 hover:text-white font-semibold'
                          }`}
                        >
                          <span className={`text-base truncate ${f.class}`}>{f.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-brand-purple shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Alignment Controls */}
                  <div className="flex bg-black/60 border border-white/10 rounded-xl p-1 gap-1">
                    {(['left', 'center', 'right'] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() => setTextAlign(align)}
                        className={`flex-1 py-1.5 rounded-lg flex items-center justify-center transition-all ${
                          textAlign === align
                            ? 'bg-white/20 text-white font-bold shadow-sm'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {align === 'left' && <AlignLeft className="w-4 h-4" />}
                        {align === 'center' && <AlignCenter className="w-4 h-4" />}
                        {align === 'right' && <AlignRight className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Add Neon Shapes */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-extrabold text-white uppercase tracking-wider">
                      3. Add Neon Shapes (+₹1,500)
                    </label>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { type: 'heart', icon: <Heart className="w-5 h-5" /> },
                      { type: 'star', icon: <Star className="w-5 h-5" /> },
                      { type: 'zap', icon: <Zap className="w-5 h-5" /> },
                      { type: 'crown', icon: <Crown className="w-5 h-5" /> },
                      { type: 'moon', icon: <Moon className="w-5 h-5" /> },
                    ].map((shape) => (
                      <button
                        key={shape.type}
                        onClick={() => {
                          setAddedShapes([...addedShapes, { id: Date.now().toString(), type: shape.type }]);
                          triggerMascot(`Added a ${shape.type} to your sign! Drag it around to place it.`, MascotState.CELEBRATING);
                        }}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 flex items-center justify-center transition-colors text-white hover:text-brand-purple hover:border-brand-purple"
                      >
                        {shape.icon}
                      </button>
                    ))}
                  </div>
                  {addedShapes.length > 0 && (
                    <div className="mt-2 text-xs text-brand-purple font-semibold">
                      {addedShapes.length} shape{addedShapes.length > 1 ? 's' : ''} added (Total +₹{(addedShapes.length * 1500).toLocaleString('en-IN')}). <br/>
                      <span className="text-gray-400">Drag shapes on the wall to position them!</span>
                    </div>
                  )}
                </div>

                {/* 3. Select Size Grid */}
                <div>
                  <label className="text-xs font-extrabold text-white uppercase tracking-wider mb-2.5 block">
                    3. Select Physical Size
                  </label>
                  <div className="flex flex-col gap-2.5">
                    {SIZES.map((size) => {
                      const isSelected = selectedSize.id === size.id;
                      const dims = getCalculatedDimensions(size.id, selectedColor.name, text, addedShapes.length);
                      return (
                        <div 
                          key={size.id}
                          onClick={() => {
                            setSelectedSize(size);
                          }}
                          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border-2 ${
                            isSelected 
                              ? 'bg-black border-brand-purple shadow-[0_0_15px_rgba(117,46,255,0.4)]' 
                              : 'bg-white/5 border-transparent hover:bg-white/10'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">{size.name}</span>
                              {isSelected && <Check className="w-4 h-4 text-brand-purple" />}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {dims.length} × {dims.height}
                            </div>
                          </div>
                          <div className="text-sm font-extrabold text-white">
                            ₹{dims.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: COLOR */}
            {activeTab === 'color' && (
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-xs font-extrabold text-white uppercase tracking-wider mb-3 block">
                    SPECIAL EFFECTS
                  </label>
                  <div className="flex flex-col gap-3 mb-6">
                    <button
                      onClick={() => setIsMultiColor(false)}
                      className={`p-3.5 rounded-xl transition-all flex flex-col items-start gap-1 border-2 ${
                        !isMultiColor
                          ? 'bg-black border-brand-purple text-white shadow-[0_0_15px_rgba(117,46,255,0.45)]'
                          : 'bg-white/[0.04] border-white/10 hover:border-white/25 text-gray-200'
                      }`}
                    >
                      <span className="text-sm font-bold flex items-center gap-2">
                        Single Color <Info className="w-4 h-4 text-gray-400" />
                      </span>
                      <span className="text-xs text-gray-400 font-normal">A sign in a single Color.</span>
                    </button>
                    <button
                      onClick={() => setIsMultiColor(true)}
                      className={`p-3.5 rounded-xl transition-all flex flex-col items-start gap-1 border-2 ${
                        isMultiColor
                          ? 'bg-black border-brand-purple text-white shadow-[0_0_15px_rgba(117,46,255,0.45)]'
                          : 'bg-white/[0.04] border-white/10 hover:border-white/25 text-gray-200'
                      }`}
                    >
                      <span className="text-sm font-bold flex items-center gap-2">
                        Multicolored Text <Info className="w-4 h-4 text-gray-400" />
                      </span>
                      <span className="text-xs text-gray-400 font-normal">Click individual letters to customize their colors.</span>
                    </button>
                  </div>

                  {isMultiColor && (
                    <div className="mb-6">
                      <p className="text-xs text-gray-400 mb-3">
                        Click a letter below, then choose a color for each character.
                      </p>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl max-h-48 overflow-y-auto">
                        <div className="flex flex-wrap gap-2">
                          {text.split('').map((char, index) => {
                            if (char.trim() === '') return null;
                            const isSelected = selectedItemForColor === index;
                            const charColor = letterColors[index] || selectedColor;
                            return (
                              <button
                                key={`char-${index}`}
                                onClick={() => setSelectedItemForColor(index)}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg transition-all border-2 ${
                                  isSelected
                                    ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-110 z-10'
                                    : 'border-white/80 hover:border-white hover:scale-105'
                                }`}
                                style={{
                                  backgroundColor: charColor.hex,
                                  color: '#000000',
                                }}
                              >
                                {char}
                              </button>
                            );
                          })}
                          
                          {/* Shapes */}
                          {addedShapes.map((shape) => {
                            let Icon = Heart;
                            if (shape.type === 'star') Icon = Star;
                            if (shape.type === 'zap') Icon = Zap;
                            if (shape.type === 'crown') Icon = Crown;
                            if (shape.type === 'moon') Icon = Moon;
                            const isSelected = selectedItemForColor === shape.id;
                            const shapeColor = shape.color || selectedColor;

                            return (
                              <button
                                key={shape.id}
                                onClick={() => setSelectedItemForColor(shape.id)}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all border-2 ${
                                  isSelected
                                    ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-110 z-10'
                                    : 'border-white/80 hover:border-white hover:scale-105'
                                }`}
                                style={{
                                  backgroundColor: shapeColor.hex,
                                  color: '#000000',
                                }}
                              >
                                <Icon className="w-5 h-5" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <label className="text-[11px] font-extrabold text-white uppercase tracking-wider mb-4 block">
                      {isMultiColor ? (selectedItemForColor !== null ? 'Choose color for selected item' : 'Select a letter above first') : 'Choose LED Neon Color'}
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {COLORS.filter(c => !c.name.includes('Mojo')).map((c) => {
                        const isSelected = isMultiColor 
                          ? (selectedItemForColor !== null 
                              ? (typeof selectedItemForColor === 'number' 
                                  ? letterColors[selectedItemForColor]?.name === c.name 
                                  : addedShapes.find(s => s.id === selectedItemForColor)?.color?.name === c.name) 
                              : false)
                          : selectedColor.name === c.name;

                        return (
                          <button
                            key={c.name}
                            onClick={() => handleColorSelect(c)}
                            title={c.name}
                            className={`w-10 h-10 rounded-xl transition-all border-2 flex-shrink-0 ${
                              isSelected
                                ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)] z-10'
                                : 'border-white/20 hover:border-white/60 hover:scale-105'
                            }`}
                            style={{
                              backgroundColor: c.hex,
                              boxShadow: isSelected ? `0 0 15px ${c.glow}, inset 0 0 4px #ffffff` : `inset 0 0 4px rgba(255,255,255,0.3)`
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: BACKBOARD */}
            {activeTab === 'backboard' && (
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-xs font-extrabold text-white uppercase tracking-wider mb-2.5 block">
                    1. Acrylic Backing Shape
                  </label>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { id: 'cut', name: 'Cut to Shape', desc: 'Acrylic closely follows the letter contours (Most Popular)' },
                      { id: 'square', name: 'Whole Board / Square', desc: 'Full rectangular or square clear acrylic backing' },
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
                          className={`p-3.5 rounded-xl transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-black border-2 border-brand-purple text-white font-extrabold shadow-[0_0_15px_rgba(117,46,255,0.45)]'
                              : 'bg-white/[0.04] border border-white/10 hover:border-white/25 text-gray-200 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-sm">
                            <span>{shape.name}</span>
                            {isSelected && <Check className="w-4 h-4 text-brand-purple" />}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{shape.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-white uppercase tracking-wider mb-2.5 block">
                    2. Backboard Color
                  </label>
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
                          className={`p-3 rounded-xl transition-all text-sm font-bold ${
                            isSelected
                              ? 'bg-black border-2 border-brand-purple text-white font-extrabold shadow-[0_0_15px_rgba(117,46,255,0.45)]'
                              : 'bg-white/[0.04] border border-white/10 hover:border-white/25 text-gray-200 hover:text-white'
                          }`}
                        >
                          {color.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: HARDWARE */}
            {activeTab === 'hardware' && (
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-xs font-extrabold text-white uppercase tracking-wider mb-2.5 block">
                    1. Mounting Kit
                  </label>
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
                          className={`p-3.5 rounded-xl transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-black border-2 border-brand-purple text-white font-extrabold shadow-[0_0_15px_rgba(117,46,255,0.45)]'
                              : 'bg-white/[0.04] border border-white/10 hover:border-white/25 text-gray-200 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-sm">
                            <span>{mount.name}</span>
                            {isSelected && <Check className="w-4 h-4 text-brand-purple" />}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{mount.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-white uppercase tracking-wider mb-2.5 block">
                    2. Dimmer & Controller
                  </label>
                  <div className="flex flex-col gap-2.5">
                    <div
                      onClick={() => setHasSmartController(false)}
                      className={`p-3.5 rounded-xl transition-all cursor-pointer ${
                        !hasSmartController
                          ? 'bg-black border-2 border-brand-purple text-white font-extrabold shadow-[0_0_15px_rgba(117,46,255,0.45)]'
                          : 'bg-white/[0.04] border border-white/10 hover:border-white/25 text-gray-200 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>Standard Brightness Dimmer</span>
                        <span className="text-xs font-extrabold text-white">FREE</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Manual inline dimmer button to adjust 10–100% brightness</p>
                    </div>
                    <div
                      onClick={() => {
                        setHasSmartController(true);
                        triggerMascot("Smart WiFi/Remote added! Adjust brightness from your couch.", MascotState.WAVE);
                      }}
                      className={`p-3.5 rounded-xl transition-all cursor-pointer ${
                        hasSmartController
                          ? 'bg-black border-2 border-brand-purple text-white font-extrabold shadow-[0_0_15px_rgba(117,46,255,0.45)]'
                          : 'bg-white/[0.04] border border-white/10 hover:border-white/25 text-gray-200 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>Smart WiFi & Wireless Remote</span>
                        <span className="text-xs font-extrabold text-white">+₹2,000</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Remote control, party flash modes, timer & Alexa/Google Assistant</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-white uppercase tracking-wider mb-2.5 block">
                    3. Indoor / Outdoor Protection
                  </label>
                  <div className="flex flex-col gap-2.5">
                    <div
                      onClick={() => setIsWaterproof(false)}
                      className={`p-3.5 rounded-xl transition-all cursor-pointer ${
                        !isWaterproof
                          ? 'bg-black border-2 border-brand-purple text-white font-extrabold shadow-[0_0_15px_rgba(117,46,255,0.45)]'
                          : 'bg-white/[0.04] border border-white/10 hover:border-white/25 text-gray-200 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>Standard Indoor LED</span>
                        <span className="text-xs font-extrabold text-white">FREE</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Perfect for bedroom, living room, office & indoor events</p>
                    </div>
                    <div
                      onClick={() => setIsWaterproof(true)}
                      className={`p-3.5 rounded-xl transition-all cursor-pointer ${
                        isWaterproof
                          ? 'bg-black border-2 border-brand-purple text-white font-extrabold shadow-[0_0_15px_rgba(117,46,255,0.45)]'
                          : 'bg-white/[0.04] border border-white/10 hover:border-white/25 text-gray-200 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>IP67 Waterproof Outdoor</span>
                        <span className="text-xs font-extrabold text-white">+₹3,000</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Sealed weatherproof silicone housing for rain, snow & direct sun</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: ROOM */}
            {activeTab === 'room' && (
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-xs font-extrabold text-white uppercase tracking-wider mb-3 block">
                    Select Room Background
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {backgroundsList.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => {
                          setSelectedBg(bg);
                          setIsCalibrating(false);
                          triggerMascot(`Changed room to ${bg.name}!`, MascotState.WAVE);
                        }}
                        className={`p-2 rounded-xl transition-all flex flex-col gap-2 ${
                          selectedBg.id === bg.id
                            ? 'bg-black border-2 border-brand-purple text-white font-extrabold shadow-[0_0_15px_rgba(117,46,255,0.45)]'
                            : 'bg-white/[0.04] border border-white/10 hover:border-white/25 text-gray-200'
                        }`}
                      >
                        <div
                          className="w-full h-20 rounded-lg bg-cover bg-center"
                          style={{ backgroundImage: `url('${bg.url}')` }}
                        />
                        <span className="text-xs font-bold text-center truncate w-full">{bg.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-brand-purple uppercase tracking-wider">
                      Preview On Your Own Wall
                    </label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-lavender border border-brand-purple/40">
                      ✨ Recommended
                    </span>
                  </div>
                  <label className="w-full bg-gradient-to-r from-brand-purple/15 via-black to-white/5 border-2 border-dashed border-brand-purple/60 hover:border-white rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 group shadow-lg relative overflow-hidden">
                    <Upload className="w-6 h-6 text-brand-lavender group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-extrabold text-white text-center">
                      See Your Neon Sign On Your Own Wall
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Upload photo of your room or wall (JPG, PNG)
                    </span>
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
                        className="text-xs font-bold text-white hover:underline"
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

          {/* 3. Bottom Navigation Actions */}
          <div className="pt-4 border-t border-white/10 mt-6">
            {/* UNDERSTATED SECONDARY ACTIONS */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={prevTab}
                disabled={activeTab === 'create'}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'create'
                    ? 'opacity-30 border-gray-800 bg-[#111] text-gray-600 cursor-not-allowed'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <button
                onClick={() => setShowHelpModal(true)}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Tips</span>
              </button>

              <button
                onClick={nextTab}
                disabled={activeTab === 'room'}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'room'
                    ? 'opacity-30 border-gray-800 bg-[#111] text-gray-600 cursor-not-allowed'
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* 3. Center/Right Workshop Preview Canvas (Addressing Point #3 & #9: Larger Sign & Realistic Light Emission) */}
        <div className="flex-1 relative overflow-hidden bg-[#090909] h-[560px] lg:h-full lg:min-h-0 flex items-center justify-center p-4 sm:p-8 lg:p-10 xl:p-12">
          
          {/* Measurement Workshop Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:24px_24px] opacity-90 pointer-events-none min-h-full" />

          {/* Wrapper for Top Toolbar Strip (Option 4) + Room Photo Box */}
          <div className="relative flex flex-col items-center justify-center gap-3 w-full max-w-[660px] h-full max-h-[720px] z-20">
            
            {/* Top Toolbar Strip (Above the Photo Box) - Option 4 */}
            <div className="w-full bg-black/85 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-2 shrink-0">
              {/* Left: Lighting Moods */}
              <div className="flex items-center gap-1">
                {[
                  { id: 'night', label: 'Dark Room', icon: <Moon className="w-3.5 h-3.5 text-white shrink-0" /> },
                  { id: 'evening', label: 'Cozy Evening', icon: <Sunset className="w-3.5 h-3.5 text-amber-400 shrink-0" /> },
                  { id: 'day', label: 'Daytime', icon: <Sun className="w-3.5 h-3.5 text-yellow-300 shrink-0" /> },
                ].map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setRoomLightingMood(mood.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 select-none whitespace-nowrap ${
                      roomLightingMood === mood.id
                        ? 'bg-black border-2 border-brand-purple text-white shadow-[0_0_15px_rgba(117,46,255,0.6)]'
                        : 'bg-transparent border border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {mood.icon}
                    <span className="text-white font-bold select-none">{mood.label}</span>
                  </button>
                ))}
              </div>

              {/* Right: Ruler Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRuler(!showRuler)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all shadow-md select-none ${
                    showRuler
                      ? 'bg-black border-brand-purple text-white shadow-[0_0_15px_rgba(117,46,255,0.6)]'
                      : 'bg-white/5 border-white/15 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  title="Toggle Measurement Ruler"
                >
                  <Ruler className="w-3.5 h-3.5 shrink-0" />
                  <span>{showRuler ? 'Hide Ruler' : 'Show Ruler'}</span>
                </button>
              </div>
            </div>

            {/* Centered Studio Room Photo Box */}
            <div className="relative flex-1 min-h-0 w-full flex justify-center items-center">
              <div className="relative h-full aspect-square max-w-full bg-[#101010] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.95)] flex items-center justify-center">
            
            {/* Room background photo with dynamic lighting mood (Addressing Point #9) */}
            <img
              src={selectedBg.url}
              alt={selectedBg.name}
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ${
                isCalibrating ? 'opacity-100 z-10' : 'opacity-[0.9]'
              } ${
                roomLightingMood === 'night'
                  ? 'brightness-[0.38] contrast-[1.25]'
                  : roomLightingMood === 'evening'
                  ? 'brightness-[0.62] contrast-[1.1] sepia-[0.12]'
                  : 'brightness-[0.95] contrast-[1.0]'
              }`}
              style={{ objectPosition: roomFocalPoint }}
            />

            {/* REALISTIC NEON LIGHT EMISSION & WALL SPILLAGE (Addressing Point #9) */}
            {isLightOn && (
              <>
                {/* Realistic Room Ambient Darkness (Night / Evening / Day) without color tinting */}
                <div
                  className="absolute inset-0 pointer-events-none z-15 transition-all duration-700"
                  style={{
                    backgroundColor: '#000000',
                    opacity: roomLightingMood === 'night' ? 0.65 : roomLightingMood === 'evening' ? 0.35 : 0.05,
                  }}
                />
              </>
            )}

            {/* Top-Left: Realistic ON/OFF Switch */}
            <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
              <button
                onClick={() => setIsLightOn(!isLightOn)}
                className={`w-[76px] h-[34px] rounded-full transition-all duration-300 relative flex items-center shadow-lg focus:outline-none border-2 ${
                  isLightOn
                    ? 'bg-brand-purple border-brand-purple shadow-[0_0_15px_rgba(117,46,255,0.7)]'
                    : 'bg-[#2a2a2a] border-white/20'
                }`}
                aria-label="Toggle neon light on or off"
              >
                <span className={`absolute font-black text-[11px] tracking-wide text-white transition-opacity duration-300 ${isLightOn ? 'left-3 opacity-100' : 'left-3 opacity-0'}`}>
                  ON
                </span>
                <span className={`absolute font-black text-[11px] tracking-wide text-white transition-opacity duration-300 ${!isLightOn ? 'right-2.5 opacity-100' : 'right-2.5 opacity-0'}`}>
                  OFF
                </span>
                <div
                  className={`w-[24px] h-[24px] bg-white rounded-full absolute transition-transform duration-300 ease-in-out shadow-md ${
                    isLightOn ? 'translate-x-[46px]' : 'translate-x-[4px]'
                  }`}
                />
              </button>
            </div>

            {/* Calibration Overlay */}
            {isCalibrating && selectedBg.id === 'custom' && (
              <div className="absolute inset-0 z-40 pointer-events-none">
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
                    <span className="text-[10px] bg-brand-purple/30 text-brand-purple px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                      Drag Me
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-6">
                    Drag this box or the red line anywhere on the image. Position the red line over a real object in your room (like a TV, door, or pillow), resize it to match, then tell us how wide it is.
                  </p>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] text-brand-purple font-bold uppercase tracking-wider mb-1 block">
                        Object Width (Inches)
                      </label>
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
                            triggerMascot("Perfect! We've made the scale as realistic as possible for your room.", MascotState.CELEBRATING);
                          }
                        }
                      }}
                      className="self-end h-[52px] px-6 bg-brand-purple hover:bg-brand-purple/80 text-white rounded-lg font-bold transition-colors cursor-pointer"
                    >
                      Set Scale
                    </button>
                  </div>
                </motion.div>

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
                    <motion.div 
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0}
                      dragMomentum={false}
                      onDrag={(e, info) => setCalibrationLineWidth(prev => Math.max(50, prev + info.delta.x))}
                      className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-black rounded-full border-2 border-red-500 flex items-center justify-center shadow-lg font-black text-xs cursor-ew-resize select-none"
                    >
                      ↔
                    </motion.div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-white rounded-sm border border-red-500" />
                  </div>
                </motion.div>
              </div>
            )}

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

            {/* Center: The Huge Prominent Neon Sign Text & Backboard (Addressing Point #3: Scaled 1.4x larger!) */}
            <div ref={containerRef} className="absolute inset-x-[8%] top-[45%] z-20 flex -translate-y-1/2 flex-col items-center justify-center">
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0}
                className="relative inline-block cursor-grab active:cursor-grabbing z-30"
              >
                <div
                  ref={textRef}
                  className={`relative inline-block max-w-full p-4 md:p-6 transition-colors duration-300 ${
                    selectedBackboardShape === 'square'
                      ? 'rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm shadow-2xl'
                      : 'bg-transparent'
                  }`}
                  style={{
                    transform: `scale(${finalScale})`,
                    transformOrigin: 'center center',
                  }}
                >
                  {/* Realistic LED Neon Text with White Tube Core & Multi-layer Bloom */}
                  <style>{`
                    @keyframes flowMoGradient {
                      0% { background-position: 0% 50%; }
                      100% { background-position: 200% 50%; }
                    }
                    .animate-flow-mo {
                      background-size: 200% auto !important;
                      animation: flowMoGradient 3s linear infinite;
                    }
                  `}</style>
                  <div className="relative">
                    {/* Realistic Cut-to-Shape Acrylic Backing (Visible) */}
                    {selectedBackboardShape === 'cut' && (
                      <h2
                        className={`absolute inset-0 studio-neon-sign-preview font-bold transition-all duration-300 text-center ${selectedFont.class}`}
                        style={{
                          textAlign: textAlign,
                          whiteSpace: 'pre-wrap',
                          lineHeight: '1.1',
                          fontSize: 'clamp(2.4rem, 5.8vw, 6.5rem)',
                          color: 'rgba(60, 60, 60, 0.45)',
                          WebkitTextStroke: '28px rgba(60, 60, 60, 0.45)',
                          filter: 'drop-shadow(0px 8px 15px rgba(0,0,0,0.6)) drop-shadow(0px 0px 2px rgba(255,255,255,0.2))',
                          zIndex: -1
                        }}
                      >
                        {text || 'Your Neon Sign'}
                      </h2>
                    )}
                    {isMojoMix && isLightOn && (
                      <h2
                        className={`absolute inset-0 studio-neon-sign-preview animate-flow-mo font-bold transition-all duration-300 text-center ${selectedFont.class}`}
                        style={{
                          textAlign: textAlign,
                          background: 'linear-gradient(90deg, #ffde00, #ff7b00, #ff007b, #c400ff, #00d4ff, #ffde00)',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          filter: 'blur(15px) opacity(0.8)',
                          zIndex: 0,
                          whiteSpace: 'pre',
                          lineHeight: '1.1',
                          fontSize: 'clamp(2.4rem, 5.8vw, 6.5rem)',
                        }}
                      >
                        {text || 'Your Neon Sign'}
                      </h2>
                    )}
                    <h2
                      className={`relative z-10 studio-neon-sign-preview ${isMojoMix ? 'animate-flow-mo' : ''} font-bold transition-all duration-300 text-center ${selectedFont.class}`}
                      style={
                        isMojoMix
                          ? {
                              textAlign: textAlign,
                              background: 'linear-gradient(90deg, #ffde00, #ff7b00, #ff007b, #c400ff, #00d4ff, #ffde00)',
                              WebkitBackgroundClip: 'text',
                              color: 'transparent',
                              WebkitTextStroke: '1px rgba(255,255,255,0.8)',
                              whiteSpace: 'pre-wrap',
                              lineHeight: '1.1',
                              fontSize: 'clamp(2.4rem, 5.8vw, 6.5rem)',
                              opacity: isLightOn ? 1 : 0.3,
                            }
                          : {
                              ...(isMultiColor ? {} : getNeonTextStyle(selectedColor, isLightOn)),
                              textAlign: textAlign,
                              whiteSpace: 'pre-wrap',
                              lineHeight: '1.1',
                              fontSize: 'clamp(2.4rem, 5.8vw, 6.5rem)',
                            }
                      }
                    >
                      {isMultiColor && !isMojoMix ? (
                        (text || 'Your Neon Sign').split('').map((char, index) => {
                          const charColor = letterColors[index] || selectedColor;
                          return (
                            <span key={index} style={getNeonTextStyle(charColor, isLightOn)}>
                              {char}
                            </span>
                          );
                        })
                      ) : (
                        text || 'Your Neon Sign'
                      )}
                    </h2>

                    {/* Draggable Shapes */}
                    {addedShapes.map((shape) => {
                      let Icon = Heart;
                      if (shape.type === 'star') Icon = Star;
                      if (shape.type === 'zap') Icon = Zap;
                      if (shape.type === 'crown') Icon = Crown;
                      if (shape.type === 'moon') Icon = Moon;
                      
                      const shapeColor = shape.color || selectedColor;

                      return (
                        <motion.div
                          key={shape.id}
                          drag
                          dragMomentum={false}
                          className="absolute z-20 cursor-grab active:cursor-grabbing group"
                          style={{
                            top: '50%',
                            left: '50%',
                            x: '-50%',
                            y: '-50%',
                          }}
                        >
                          <div className="relative p-4">
                            <Icon 
                              className="w-[2em] h-[2em]"
                              style={{
                                color: isLightOn ? shapeColor.hex : '#ffffff',
                                filter: isLightOn 
                                  ? isMojoMix 
                                    ? `drop-shadow(0 0 10px #ff007b) drop-shadow(0 0 20px #00d4ff)` 
                                    : `drop-shadow(0 0 15px ${shapeColor.glow}) drop-shadow(0 0 30px ${shapeColor.glow})` 
                                  : 'none',
                                opacity: isLightOn ? 1 : 0.4,
                                strokeWidth: 1.5,
                                fontSize: 'clamp(2.4rem, 5.8vw, 6.5rem)'
                              }} 
                              stroke={isMojoMix && isLightOn ? "url(#mojoGradient)" : "currentColor"}
                            />
                            {/* Delete button that appears on hover */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAddedShapes(shapes => shapes.filter(s => s.id !== shape.id));
                              }}
                              className="absolute top-0 right-0 bg-red-500/80 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:scale-110"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* SVG Defs for Mojo Mix Gradient */}
                    {isMojoMix && (
                      <svg width="0" height="0" className="absolute">
                        <defs>
                          <linearGradient id="mojoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffde00" />
                            <stop offset="20%" stopColor="#ff7b00" />
                            <stop offset="40%" stopColor="#ff007b" />
                            <stop offset="60%" stopColor="#c400ff" />
                            <stop offset="80%" stopColor="#00d4ff" />
                            <stop offset="100%" stopColor="#ffde00" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </div>

                  {showRuler && (
                    <div className="absolute -inset-6 pointer-events-none z-30">
                      <div className="absolute -top-8 left-0 right-0 flex items-center justify-center">
                        <div className="flex-1 border-t border-dashed border-white opacity-60" style={{ borderWidth: `${Math.max(1, 1 / finalScale)}px` }} />
                        <span 
                          className="text-white text-sm md:text-base font-extrabold tracking-wide mx-2 flex items-center justify-center whitespace-nowrap"
                          style={{ 
                            transform: `scale(${1 / finalScale})`,
                            textShadow: '0px 2px 4px rgba(0,0,0,0.8)'
                          }}
                        >
                          {getCalculatedDimensions(selectedSize.id, selectedColor.name, text, addedShapes.length).length}
                        </span>
                        <div className="flex-1 border-t border-dashed border-white opacity-60" style={{ borderWidth: `${Math.max(1, 1 / finalScale)}px` }} />
                      </div>

                      <div className="absolute top-0 -left-6 bottom-0 flex flex-col items-center justify-center">
                        <div className="flex-1 border-l border-dashed border-white opacity-60" style={{ borderWidth: `${Math.max(1, 1 / finalScale)}px` }} />
                        <span 
                          className="text-white text-sm md:text-base font-extrabold tracking-wide my-3 whitespace-nowrap block"
                          style={{ 
                            transform: `scale(${1 / finalScale}) rotate(-90deg)`,
                            textShadow: '0px 2px 4px rgba(0,0,0,0.8)'
                          }}
                        >
                          {getCalculatedDimensions(selectedSize.id, selectedColor.name, text, addedShapes.length).height}
                        </span>
                        <div className="flex-1 border-l border-dashed border-white opacity-60" style={{ borderWidth: `${Math.max(1, 1 / finalScale)}px` }} />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
            </div>

          </div>
        </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/20 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-green" />
              <span>Studio Configurator Tips</span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">1</span>
                <span><strong>Font & Scale:</strong> Your sign scale matches physical dimensions. Switch room lighting moods to preview realistic LED light emission.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">2</span>
                <span><strong>Indoor vs Outdoor:</strong> Choose <em>IP67 Waterproof</em> if you plan to install outdoors in rain or sun.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">3</span>
                <span><strong>Upload Room Photo:</strong> Use the &quot;Preview On Your Own Wall&quot; button to see your neon sign on your real wall.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">4</span>
                <span><strong>Instant Price:</strong> The price updates automatically as you change sizes and waterproof settings.</span>
              </li>
            </ul>
            <button
              onClick={() => setShowHelpModal(false)}
              className="mt-6 w-full py-3 rounded-xl bg-white text-black font-extrabold hover:bg-gray-200 transition-colors"
            >
              Got It!
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-zinc-900 border border-brand-green text-white px-5 py-3 rounded-xl shadow-[0_0_20px_rgba(110,255,134,0.3)] flex items-center gap-2 text-sm font-bold animate-fade-in">
          <Check className="w-4 h-4 text-brand-green" />
          <span>Design progress saved to session!</span>
        </div>
      )}

      {/* SEO & Educational Sections */}
      <div className="max-w-[1200px] mx-auto px-4 py-16 space-y-24">
        
        <section id="about" className="scroll-mt-32">
          <h2 className="text-2xl font-bold text-white mb-4">About Your Neon Sign:</h2>
          <p className="text-zinc-300 text-lg mb-8 max-w-4xl">
            The Neon Stack&apos;s neon signs are handcrafted with advanced 2nd gen LED on high-quality 6MM transparent acrylic. Energy-efficient, durable, and easy to install—perfect for any space!
          </p>
          <div className="bg-[#111] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center border border-white/10">
            <div className="w-full md:w-1/2 p-8 space-y-4">
              <h3 className="text-xl font-bold text-white">Why choose our custom LED signs?</h3>
              <ul className="space-y-3 text-zinc-300 text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-green" />
                  <span><strong>Safe & Low Voltage:</strong> 12V DC power means zero heat and safe to touch.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-green" />
                  <span><strong>Durable Acrylic:</strong> High-grade shatterproof 6MM laser-cut backboard.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-green" />
                  <span><strong>50,000+ Hour Lifespan:</strong> Long-lasting silicone LED strip lights.</span>
                </li>
              </ul>
            </div>
            <div 
              className="w-full md:w-1/2 h-64 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop')" }}
            />
          </div>
        </section>

        <section className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Need a Business Logo or Complex Custom Art?</h2>
            <p className="text-zinc-300 text-base md:text-lg">
              This online builder is optimized for custom text and quotes. If you have a company logo, illustration, or multi-color artwork, our design team will send you a free mockup & quote within 2 hours.
            </p>
            <div className="pt-2">
              <Link 
                href="/products/customize-neon-signs"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 font-extrabold px-8 py-4 rounded-full transition-all shadow-lg hover:scale-105"
              >
                <span>Upload Artwork For Quote</span>
              </Link>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
