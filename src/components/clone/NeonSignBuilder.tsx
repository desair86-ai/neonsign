"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Footer } from "@/components/clone/Footer";
import { 
  Check, Ruler, Info, X, AlignLeft, AlignCenter, AlignRight, Upload,
  Type, Palette, Layers, Settings, Image as ImageIcon, ChevronLeft, ChevronRight, ChevronDown,
  ShoppingBag, Bookmark, Sparkles, Sliders, Moon, Sun, Sunset, Heart, Star, Zap, Crown, Trash2, Plus, Minus
} from 'lucide-react';
import { motion } from "framer-motion";
import { useMascot } from "@/hooks/useMascot";
import { MascotState } from "@/components/mascot/MascotStateMachine";
import { ButtonParticles } from '@/components/ui/button-particles';
import { useCart } from "@/lib/CartContext";

const FONTS = [
  { name: 'Passionate', class: 'font-pacifico', category: 'popular' },
  { name: 'Dreamy', class: 'font-dancing', category: 'popular' },
  { name: 'Flowy', class: 'font-caveat', category: 'script' },
  { name: 'Original', class: 'font-bungee-outline', category: 'bold' },
  { name: 'Classic', class: 'font-cinzel', category: 'classic' },
  { name: 'Boujee', class: 'font-great-vibes', category: 'elegant' },
  { name: 'Funky', class: 'font-permanent-marker', category: 'modern' },
  { name: 'Chic', class: 'font-parisienne', category: 'elegant' },
  { name: 'Delight', class: 'font-playfair', category: 'classic' },
  { name: 'Classy', class: 'font-cookie', category: 'classic' },
  { name: 'Romantic', class: 'font-alex-brush', category: 'script' },
  { name: 'ROBO', class: 'font-syncopate', category: 'modern' },
  { name: 'Charming', class: 'font-bad-script', category: 'script' },
  { name: 'Quirky', class: 'font-gochi-hand', category: 'modern' },
  { name: 'Stylish', class: 'font-kaushan-script', category: 'bold' },
  { name: 'Cheeky', class: 'font-yellowtail', category: 'script' },
  { name: 'Glitz', class: 'font-allura', category: 'elegant' },
  { name: 'Neo Sans', class: 'font-montserrat', category: 'modern' },
  { name: 'Alchemy', class: 'font-mr-de-haviland', category: 'script' },
  { name: 'Unplugged', class: 'font-herr-von-muellerhoff', category: 'elegant' },
  { name: 'Radiant', class: 'font-nothing-you-could-do', category: 'script' },
  { name: 'Aura', class: 'font-vibur', category: 'script' },
  { name: 'Chill', class: 'font-montez', category: 'script' },
  { name: 'Rad', class: 'font-monoton', category: 'modern' },
  { name: 'Chief', class: 'font-sacramento', category: 'script' },
  { name: 'Legend', class: 'font-rye', category: 'bold' },
  { name: 'Festive', class: 'font-mountains-of-christmas', category: 'script' },
  { name: 'Sleek', class: 'font-cinzel-decorative', category: 'classic' },
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
function getNeonTextStyle(color: (typeof COLORS)[number], isLightOn: boolean = true, tubing: 'coloured'|'white' = 'coloured') {
  const baseColor = tubing === 'white' ? '#fcfcfc' : color.hex;
  
  if (!isLightOn) {
    return {
      color: baseColor,
      textShadow: tubing === 'white' ? 'inset 0 0 2px rgba(0,0,0,0.1)' : 'none',
      filter: 'none',
      fontSize: 'clamp(2.4rem, 5.8vw, 6.5rem)',
      lineHeight: '1.1',
      whiteSpace: 'pre' as const,
      wordBreak: 'break-word' as const,
      WebkitTextStroke: tubing === 'white' ? '1px #e0e0e0' : `1px ${color.hex}`,
      opacity: tubing === 'white' ? 0.9 : 0.55,
    };
  }

  // Premium 2nd-Gen LED Neon Effect
  // If tubing is colored, the core should match the neon color (not hardcoded white), matching NeonAttack's style.
  const coreColor = tubing === 'white' ? '#ffffff' : color.hex;
  const innerGlow = tubing === 'white' ? '#ffffff' : color.hex;

  return {
    color: coreColor,
    textShadow: `
      0 0 2px ${innerGlow},
      0 0 5px ${innerGlow},
      0 0 10px ${color.hex},
      0 0 20px ${color.hex},
      0 0 40px ${color.hex},
      0 0 60px ${color.hex},
      0 0 90px ${color.hex},
      0 0 120px ${color.hex}
    `,
    // Tripled the drop-shadow layers for massive wall spill in dark rooms
    filter: `drop-shadow(0 0 10px ${color.glow}) drop-shadow(0 0 30px ${color.glow}) drop-shadow(0 0 80px ${color.glow}) drop-shadow(0 0 120px ${color.glow}) brightness(1.2)`,
    fontSize: 'clamp(2.4rem, 5.8vw, 6.5rem)',
    lineHeight: '1.1',
    whiteSpace: 'pre' as const,
    wordBreak: 'break-word' as const,
    WebkitTextStroke: tubing === 'white' ? '1px #ffffff' : `1px ${color.hex}`,
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
  let length = chars * config.lengthPerLetter;
  let price = config.firstLetterPrice + (chars - 1) * config.addedLetterPrice;
  
  // Add 300 for each shape
  price += shapeCount * 300;
  
  // Add 6 inches per shape (3 inches for the shape + 3 inches for the gap)
  length += shapeCount * 6;

  const linesCount = Math.max(1, textStr.split('\n').length);
  const baseHeight = size.heightInches;
  const totalHeight = (linesCount * baseHeight) + ((linesCount - 1) * 3);

  return {
    length: `${length.toFixed(2)}"`,
    height: `${totalHeight.toFixed(2)}"`,
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
  const [activeTab, setActiveTab] = useState<'create' | 'size' | 'shapes' | 'color' | 'backboard' | 'hardware' | 'room'>('create');
  const [showRuler, setShowRuler] = useState(true);
  const [selectedBackboardShape, setSelectedBackboardShape] = useState<'cut' | 'square' | 'stand' | 'none'>('cut');
  const [selectedBackboardColor, setSelectedBackboardColor] = useState<'clear' | 'black' | 'white' | 'mirror'>('clear');
  const [selectedMounting, setSelectedMounting] = useState<'screws' | 'wire' | 'stand'>('screws');

  const TABS = isMojoMix 
    ? ['create', 'size', 'shapes', 'backboard', 'hardware', 'room'] as const 
    : ['create', 'size', 'shapes', 'color', 'backboard', 'hardware', 'room'] as const;

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
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    step1: true,
    step2: true,
    step3: true,
    step4: true,
    step5: true,
  });
  const toggleStep = (step: string) => {
    setExpandedSteps(prev => ({ ...prev, [step]: !prev[step] }));
  };
  const [siliconeTubing, setSiliconeTubing] = useState<'coloured' | 'white'>('coloured');

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

  const [selectedFont, setSelectedFont] = useState(FONTS.find(f => f.name === 'Dreamy') || FONTS[0]);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const defaultColor = isMojoMix ? COLORS.find(c => c.name.includes('Mojo'))! : COLORS[0];
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
  const boundsRef = useRef<HTMLDivElement>(null);
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
      <header className="w-full bg-[#0a0a0a]/95 backdrop-blur-2xl border-b-[3px] border-brand-green px-4 md:px-8 h-20 flex items-center justify-between sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/main logo.png" 
              alt="The Neon Stack Logo" 
              className="h-[90px] md:h-[120px] w-auto object-contain my-[-25px] group-hover:scale-105 transition-transform" 
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
            icon={<ShoppingBag className="w-5 h-5 transition-colors duration-300" />}
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
      <div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] lg:max-h-[860px] lg:overflow-hidden bg-[#f5f5f5] border-b border-gray-800">
        
        {/* 1. Left Navigation Sidebar (Thin & Dark) */}
        <div className="w-full lg:w-24 bg-black border-b lg:border-b-0 lg:border-r border-white/40 flex lg:flex-col items-center py-2 lg:py-2 z-30 flex-shrink-0">
          <div className="flex lg:flex-col w-full gap-2 lg:gap-2 overflow-x-auto lg:overflow-x-visible scrollbar-none px-2 lg:px-0 lg:pl-2">
            {[
              { id: 'create', label: 'CREATE', icon: <Type className="w-6 h-6 mb-1" /> },
              { id: 'size', label: 'SIZE', icon: <Ruler className="w-6 h-6 mb-1" /> },
              { id: 'shapes', label: 'SHAPES', icon: <Sparkles className="w-6 h-6 mb-1" /> },
              ...(!isMojoMix ? [{ id: 'color', label: 'COLOR', icon: <Palette className="w-6 h-6 mb-1" /> }] : []),
              { id: 'backboard', label: 'BACKBOARD', icon: <Layers className="w-6 h-6 mb-1" /> },
              { id: 'hardware', label: 'HARDWARE', icon: <Settings className="w-6 h-6 mb-1" /> },
              { id: 'room', label: 'ROOM', icon: <ImageIcon className="w-6 h-6 mb-1" /> },
            ].map((item, index, array) => {
              const isActive = activeTab === item.id;
              return (
                <React.Fragment key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id as any)}
                    className={`flex flex-col items-center justify-center py-3 transition-all min-w-[75px] lg:min-w-0 ${
                      isActive 
                        ? 'bg-white text-[#252b42] rounded-lg lg:rounded-l-lg lg:rounded-r-none relative z-40 lg:translate-x-[1px] shadow-[-4px_0_10px_rgba(0,0,0,0.1)] w-full' 
                        : 'text-white/70 hover:text-white hover:bg-white/10 rounded-lg w-full lg:w-[calc(100%-8px)]'
                    }`}
                  >
                    {item.icon}
                    <span className="text-[10px] font-black tracking-widest">{item.label}</span>
                  </button>
                  {index < array.length - 1 && (
                    <div className="hidden lg:block w-[80%] h-[1px] bg-white/60 mx-auto self-center" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 2. Middle Options Panel (White) */}
        <div className="w-full lg:w-[400px] bg-white border-r border-gray-200 p-5 md:p-6 overflow-y-auto z-20 flex flex-col flex-shrink-0 relative shadow-xl">
          <div className="space-y-8 flex-grow text-gray-900">
            
            {/* TAB 1: CREATE (Text, Font, Size) */}
            {activeTab === 'create' && (
              <div className="flex flex-col gap-8">
                
                {/* STEP 1: Text */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Enter Neon Text</label>
                    <span className="text-xs text-gray-500">{text.length} chars</span>
                  </div>
                  <textarea
                    rows={2}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type something magical..."
                    className="w-full bg-gray-50 border border-gray-300 focus:border-brand-purple rounded-xl p-3.5 text-gray-900 text-lg font-bold outline-none resize-none transition-colors"
                  />
                  {/* Alignment Controls */}
                  <div className="flex bg-gray-100 border border-gray-200 rounded-xl p-1 gap-1 mt-3">
                    {(['left', 'center', 'right'] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() => setTextAlign(align)}
                        className={`flex-1 py-1.5 rounded-lg flex items-center justify-center transition-all ${
                          textAlign === align
                            ? 'bg-white text-gray-900 font-bold shadow-sm border border-gray-200'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {align === 'left' && <AlignLeft className="w-4 h-4" />}
                        {align === 'center' && <AlignCenter className="w-4 h-4" />}
                        {align === 'right' && <AlignRight className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STEP 2: Style (Fonts) */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Choose Font Style</label>
                    <span className="text-[11px] text-gray-500 font-medium">{FONTS.length} Fonts</span>
                  </div>
                  
                  {/* Font Cards Grid (3 Columns, No Categories) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3 max-h-72 overflow-y-auto pr-1">
                    {FONTS.map((f) => {
                      const isSelected = selectedFont.name === f.name;
                      return (
                        <button
                          key={f.name}
                          onClick={() => {
                            setSelectedFont(f);
                            triggerMascot(`${f.name} font looks awesome!`, MascotState.WAVE);
                          }}
                          className={`py-3 px-2 rounded-xl transition-all text-center flex items-center justify-center border ${
                            isSelected
                              ? 'bg-brand-purple border-brand-purple text-white shadow-sm'
                              : 'bg-white border-gray-200 hover:border-brand-purple/40 text-gray-900'
                          }`}
                        >
                          <span className={`text-sm md:text-base truncate w-full ${f.class} ${f.name === 'Original' ? '[-webkit-text-stroke:0.5px_currentColor] font-bold' : ''}`}>
                            {f.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* SIZE TAB */}
            {activeTab === 'size' && (
              <div className="animate-fade-in flex flex-col gap-6">
                <div className="mb-2">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 block">Select Size</label>
                  <div className="flex flex-col gap-3">
                    {SIZES.map((size) => {
                      const isSelected = selectedSize.id === size.id;
                      const dims = getCalculatedDimensions(size.id, selectedColor.name, text, addedShapes.length);
                      return (
                        <div 
                          key={size.id}
                          onClick={() => setSelectedSize(size)}
                          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border-2 ${
                            isSelected 
                              ? 'bg-purple-50/50 border-brand-purple shadow-sm' 
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-sm ${isSelected ? 'text-brand-purple' : 'text-gray-900'}`}>{size.name}</span>
                              {isSelected && <Check className="w-4 h-4 text-brand-purple" />}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {dims.length} × {dims.height}
                            </div>
                          </div>
                          <div className={`text-sm font-extrabold ${isSelected ? 'text-brand-purple' : 'text-gray-900'}`}>
                            ₹{dims.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SHAPES TAB */}
            {activeTab === 'shapes' && (
              <div className="animate-fade-in flex flex-col gap-6">
                <div className="mb-2">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 block">Add Neon Shapes (+₹300)</label>
                  <div className="flex flex-col gap-3">
                    {[
                      { type: 'heart', label: 'Heart', icon: <Heart className="w-5 h-5" /> },
                      { type: 'star', label: 'Star', icon: <Star className="w-5 h-5" /> },
                      { type: 'zap', label: 'Lightning', icon: <Zap className="w-5 h-5" /> },
                      { type: 'crown', label: 'Crown', icon: <Crown className="w-5 h-5" /> },
                      { type: 'moon', label: 'Moon', icon: <Moon className="w-5 h-5" /> },
                    ].map((shape) => {
                      const count = addedShapes.filter(s => s.type === shape.type).length;
                      return (
                        <div key={shape.type} className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3 text-gray-700">
                            {shape.icon}
                            <span className="font-semibold text-sm">{shape.label}</span>
                          </div>
                          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                            <button 
                              onClick={() => {
                                if (count > 0) {
                                  const indexToRemove = addedShapes.findIndex(s => s.type === shape.type);
                                  if (indexToRemove !== -1) {
                                    const newShapes = [...addedShapes];
                                    newShapes.splice(indexToRemove, 1);
                                    setAddedShapes(newShapes);
                                  }
                                }
                              }}
                              disabled={count === 0}
                              className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${count === 0 ? 'text-gray-300 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'}`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-4 text-center font-bold text-sm text-gray-900">{count}</span>
                            <button 
                              onClick={() => {
                                setAddedShapes([...addedShapes, { id: Date.now().toString() + Math.random(), type: shape.type }]);
                                triggerMascot(`Added a ${shape.type} to your sign! Drag it around to place it.`, MascotState.CELEBRATING);
                              }}
                              className="w-7 h-7 bg-white text-gray-700 hover:text-brand-purple hover:bg-brand-purple/5 shadow-sm border border-gray-200 rounded-md flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {addedShapes.length > 0 && (
                    <div className="mt-4 text-xs text-brand-purple font-semibold">
                      Total Shape Price: +₹{(addedShapes.length * 300).toLocaleString('en-IN')}<br/>
                      <span className="text-gray-500">Drag shapes on the wall to position them!</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: COLOR */}
            {activeTab === 'color' && (
              <div className="flex flex-col gap-8">
                <div>
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 block">
                    SPECIAL EFFECTS
                  </label>
                  <div className="flex flex-col gap-3 mb-6">
                    <button
                      onClick={() => setIsMultiColor(false)}
                      className={`p-3.5 rounded-xl transition-all flex flex-col items-start gap-1 border-2 ${
                        !isMultiColor
                          ? 'bg-purple-50/50 border-brand-purple text-brand-purple shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
                      }`}
                    >
                      <span className="text-sm font-bold flex items-center gap-2">
                        Single Color <Info className="w-4 h-4 text-gray-400" />
                      </span>
                      <span className="text-xs text-gray-500 font-normal">A sign in a single Color.</span>
                    </button>
                    <button
                      onClick={() => setIsMultiColor(true)}
                      className={`p-3.5 rounded-xl transition-all flex flex-col items-start gap-1 border-2 ${
                        isMultiColor
                          ? 'bg-purple-50/50 border-brand-purple text-brand-purple shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
                      }`}
                    >
                      <span className="text-sm font-bold flex items-center gap-2">
                        Multicolored Text <Info className="w-4 h-4 text-gray-400" />
                      </span>
                      <span className="text-xs text-gray-500 font-normal">Click individual letters to customize their colors.</span>
                    </button>
                  </div>

                  {isMultiColor && (
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 mb-3">
                        Click a letter below, then choose a color for each character.
                      </p>
                      <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl max-h-48 overflow-y-auto">
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
                                    ? 'border-gray-900 shadow-md scale-110 z-10'
                                    : 'border-transparent hover:border-gray-300 hover:scale-105 shadow-sm'
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
                                    ? 'border-gray-900 shadow-md scale-110 z-10'
                                    : 'border-transparent hover:border-gray-300 hover:scale-105 shadow-sm'
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

                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <label className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-4 block">
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
                          <div key={c.name} className="flex flex-col items-center gap-1.5 w-12">
                            <button
                              onClick={() => handleColorSelect(c)}
                              title={c.name}
                              className={`w-10 h-10 rounded-xl transition-all border-2 flex-shrink-0 ${
                                isSelected
                                  ? 'border-gray-900 scale-110 shadow-md z-10'
                                  : 'border-gray-200 hover:border-gray-400 hover:scale-105 shadow-sm'
                              }`}
                              style={{
                                backgroundColor: c.hex,
                                boxShadow: isSelected ? `0 0 15px ${c.glow}` : `none`
                              }}
                            />
                            <span className="text-[9px] text-gray-600 font-bold text-center leading-tight">
                              {c.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Silicone Tubing Colour Selector */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-4">
                    <label className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-4 block">
                      Select your Neon Silicone Tubing Colour
                    </label>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'coloured', name: 'Coloured Neon Silicone Tubing', price: 'Free' },
                        { id: 'white', name: 'White Neon Silicone Tubing', price: 'Free' },
                      ].map((tubing) => (
                        <div 
                          key={tubing.id}
                          onClick={() => setSiliconeTubing(tubing.id as 'coloured'|'white')}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border-2 ${
                            siliconeTubing === tubing.id 
                              ? 'bg-purple-50/50 border-brand-purple' 
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className={`text-sm font-bold ${siliconeTubing === tubing.id ? 'text-brand-purple' : 'text-gray-800'}`}>{tubing.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">{tubing.price}</span>
                            {siliconeTubing === tubing.id && <Check className="w-4 h-4 text-brand-purple" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: BACKBOARD */}
            {activeTab === 'backboard' && (
              <div className="flex flex-col gap-8">
                <div>
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 block">
                    1. Acrylic Backing Shape
                  </label>
                  <div className="flex flex-col gap-3">
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
                          className={`p-4 rounded-xl transition-all cursor-pointer border-2 ${
                            isSelected
                              ? 'bg-purple-50/50 border-brand-purple text-brand-purple shadow-sm'
                              : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-sm">
                            <span>{shape.name}</span>
                            {isSelected && <Check className="w-4 h-4 text-brand-purple" />}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{shape.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 block">
                    2. Backboard Color
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'clear', name: 'Transparent Clear' },
                      { id: 'black', name: 'Gloss Black' },

                    ].map((color) => {
                      const isSelected = selectedBackboardColor === color.id;
                      return (
                        <button
                          key={color.id}
                          onClick={() => setSelectedBackboardColor(color.id as any)}
                          className={`p-3 rounded-xl transition-all text-sm font-bold border-2 ${
                            isSelected
                              ? 'bg-purple-50/50 border-brand-purple text-brand-purple shadow-sm'
                              : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
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
              <div className="flex flex-col gap-8">
                <div>
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 block">
                    1. Mounting Kit
                  </label>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'screws', name: 'Wall Screws & Drill Holes', desc: 'Pre-drilled holes with stainless steel spacers included (Free)' },
                      { id: 'wire', name: 'Hanging Wire Kit', desc: 'Stainless steel wire loop kit for window or ceiling hanging (Free)' },

                    ].map((mount) => {
                      const isSelected = selectedMounting === mount.id;
                      return (
                        <div
                          key={mount.id}
                          onClick={() => setSelectedMounting(mount.id as any)}
                          className={`p-4 rounded-xl transition-all cursor-pointer border-2 ${
                            isSelected
                              ? 'bg-purple-50/50 border-brand-purple text-brand-purple shadow-sm'
                              : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-sm">
                            <span>{mount.name}</span>
                            {isSelected && <Check className="w-4 h-4 text-brand-purple" />}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{mount.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 block">
                    2. Dimmer & Controller
                  </label>
                  <div className="flex flex-col gap-3">
                    <div
                      onClick={() => setHasSmartController(false)}
                      className={`p-4 rounded-xl transition-all cursor-pointer border-2 ${
                        !hasSmartController
                          ? 'bg-purple-50/50 border-brand-purple text-brand-purple shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>Standard Brightness Dimmer</span>
                        <span className="text-xs font-bold text-brand-purple">FREE</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Manual inline dimmer button to adjust 10–100% brightness</p>
                    </div>
                    <div
                      onClick={() => {
                        setHasSmartController(true);
                        triggerMascot("Smart WiFi/Remote added! Adjust brightness from your couch.", MascotState.WAVE);
                      }}
                      className={`p-4 rounded-xl transition-all cursor-pointer border-2 ${
                        hasSmartController
                          ? 'bg-purple-50/50 border-brand-purple text-brand-purple shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>Smart WiFi & Wireless Remote</span>
                        <span className="text-xs font-bold text-brand-purple">+₹2,000</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Remote control, party flash modes, timer & Alexa/Google Assistant</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 block">
                    3. Indoor / Outdoor Protection
                  </label>
                  <div className="flex flex-col gap-3">
                    <div
                      onClick={() => setIsWaterproof(false)}
                      className={`p-4 rounded-xl transition-all cursor-pointer border-2 ${
                        !isWaterproof
                          ? 'bg-purple-50/50 border-brand-purple text-brand-purple shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>Standard Indoor LED</span>
                        <span className="text-xs font-bold text-brand-purple">FREE</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Perfect for bedroom, living room, office & indoor events</p>
                    </div>
                    <div
                      onClick={() => setIsWaterproof(true)}
                      className={`p-4 rounded-xl transition-all cursor-pointer border-2 ${
                        isWaterproof
                          ? 'bg-purple-50/50 border-brand-purple text-brand-purple shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>IP67 Waterproof Outdoor</span>
                        <span className="text-xs font-bold text-brand-purple">+₹3,000</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Sealed weatherproof silicone housing for rain, snow & direct sun</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: ROOM */}
            {activeTab === 'room' && (
              <div className="flex flex-col gap-8">
                <div>
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 block">
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
                        className={`p-2 rounded-xl transition-all flex flex-col gap-2 border-2 ${
                          selectedBg.id === bg.id
                            ? 'bg-purple-50/50 border-brand-purple text-brand-purple shadow-sm'
                            : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800'
                        }`}
                      >
                        <div
                          className="w-full h-20 rounded-lg bg-cover bg-center border border-gray-200"
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
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                      ✨ Recommended
                    </span>
                  </div>
                  <label className="w-full bg-white border-2 border-dashed border-brand-purple/40 hover:border-brand-purple rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 group shadow-sm relative overflow-hidden">
                    <Upload className="w-6 h-6 text-brand-purple group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-extrabold text-gray-900 text-center">
                      See Your Neon Sign On Your Own Wall
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      Upload photo of your room or wall (JPG, PNG)
                    </span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                {selectedBg.id === 'custom' && (
                  <div className="bg-purple-50/50 border border-brand-purple/20 rounded-xl p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-purple uppercase">Room Scale Calibration</span>
                      <button
                        onClick={() => {
                          setIsCalibrating(true);
                          triggerMascot("Drag the red line over a known object in your photo to calibrate dimensions!", MascotState.TALKING);
                        }}
                        className="text-xs font-bold text-brand-purple hover:underline"
                      >
                        {calibrationRatio ? 'Recalibrate' : 'Start Calibration'}
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-600">
                      {calibrationRatio ? 'Room scale calibrated! Your sign is shown at realistic physical dimensions.' : 'Calibrate your room photo to preview your sign at 100% accurate physical scale.'}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* 3. Bottom Navigation Actions */}
          <div className="pt-6 mt-8 border-t border-gray-200">
            {/* UNDERSTATED SECONDARY ACTIONS */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={prevTab}
                disabled={activeTab === 'create'}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'create'
                    ? 'opacity-50 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <button
                onClick={() => setShowHelpModal(true)}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Tips</span>
              </button>

              <button
                onClick={nextTab}
                disabled={activeTab === 'room'}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'room'
                    ? 'opacity-50 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-brand-purple text-white hover:bg-brand-purple/90 shadow-md'
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
                  className={`relative inline-block max-w-full p-4 md:p-6 transition-colors duration-300 bg-transparent`}
                  style={{
                    transform: `scale(${finalScale})`,
                    transformOrigin: 'center center',
                  }}
                >

                  {/* Invisible Boundary for Shape Dragging (strict 3-inch margin around text) */}
                  <div ref={boundsRef} className="absolute -inset-[200px] pointer-events-none" />
                  
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
                              whiteSpace: 'pre',
                              lineHeight: '1.1',
                              fontSize: 'clamp(2.4rem, 5.8vw, 6.5rem)',
                              opacity: isLightOn ? 1 : 0.3,
                            }
                          : {
                              ...(isMultiColor ? {} : getNeonTextStyle(selectedColor, isLightOn, siliconeTubing)),
                              textAlign: textAlign,
                              whiteSpace: 'pre',
                              lineHeight: '1.1',
                              fontSize: 'clamp(2.4rem, 5.8vw, 6.5rem)',
                            }
                      }
                    >
                      {isMultiColor && !isMojoMix ? (
                        (text || 'Your Neon Sign').split('').map((char, index) => {
                          const charColor = letterColors[index] || selectedColor;
                          return (
                            <span key={index} style={getNeonTextStyle(charColor, isLightOn, siliconeTubing)}>
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
                          dragConstraints={boundsRef}
                          dragMomentum={false}
                          className="absolute z-20 cursor-grab active:cursor-grabbing group"
                          style={{
                            top: '110%',
                            left: '50%',
                            x: '-50%',
                            y: '-50%',
                          }}
                        >
                          <div className="relative p-4">
                            <Icon 
                              className="w-[0.5em] h-[0.5em]"
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
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#752eff] to-[#6eff86] hover:from-[#6eff86] hover:to-[#752eff] text-white font-extrabold px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg"
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
