"use client";
import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-black text-white border-b border-gray-800">
      {/* Announcement Bar */}
      <div className="bg-[#cfff00] text-black text-center py-2 text-sm font-bold flex justify-center items-center gap-2">
        <span className="animate-pulse">🚨</span> Final Call - Neon Mega Mania Ends TONIGHT! Flat 30% OFF Site-wide + Free Surprise Neon Sign
      </div>
      
      {/* Main Header */}
      <header className="max-w-[1600px] mx-auto px-4 lg:px-10 h-20 flex items-center justify-between relative">
        
        {/* Mobile Menu Icon */}
        <div className="lg:hidden flex items-center">
          <button 
            className="p-2 hover:text-[#cfff00] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Logo */}
        <div className="text-2xl font-black tracking-tighter uppercase italic flex-shrink-0">
          <Link href="/">Neon<br/><span className="text-pink-500">Sign</span></Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm">
          <Link href="/products/customize-neon-signs" className="hover:text-[#cfff00] transition-colors">Customise Your Neon Light</Link>
          <Link href="/" className="hover:text-[#cfff00] transition-colors">Shop Neon Collection</Link>
          <Link href="/" className="hover:text-[#cfff00] transition-colors">Best Sellers</Link>
          <Link href="/" className="hover:text-[#cfff00] transition-colors">Business Logo</Link>
          <Link href="/" className="hover:text-[#cfff00] transition-colors">Shark Tank</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="hover:text-pink-400 transition-colors"><Search className="w-6 h-6" /></button>
          <button className="hover:text-pink-400 transition-colors hidden md:block"><User className="w-6 h-6" /></button>
          <button className="hover:text-pink-400 transition-colors relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-2 bg-[#cfff00] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-gray-800 flex flex-col items-center py-6 gap-6 font-semibold shadow-2xl">
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/products/customize-neon-signs" className="text-lg hover:text-[#cfff00] transition-colors">Customise Your Neon Light</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-lg hover:text-[#cfff00] transition-colors">Shop Neon Collection</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-lg hover:text-[#cfff00] transition-colors">Best Sellers</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-lg hover:text-[#cfff00] transition-colors">Business Logo</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-lg hover:text-[#cfff00] transition-colors">Shark Tank</Link>
        </div>
      )}
    </div>
  );
}
