"use client";
import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { LogoNeonFlow } from '@/components/ui/logo-neon-flow';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-black text-white border-b border-gray-800">
      {/* Announcement Bar */}
      <div className="bg-brand-green text-black text-center py-2 text-sm font-bold flex justify-center items-center gap-2">
        <span className="animate-pulse">🚨</span> Final Call - Neon Mega Mania Ends TONIGHT! Flat 30% OFF Site-wide + Free Surprise Neon Sign
      </div>
      
      {/* Main Header */}
      <header className="max-w-[1600px] mx-auto px-4 lg:px-10 h-20 flex items-center justify-between relative">
        
        {/* Mobile Menu Icon */}
        <div className="lg:hidden flex items-center">
          <button 
            className="p-2 hover:text-brand-green transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Logo */}
        <div className="flex-shrink-0 relative">
          <LogoNeonFlow />
          <Link href="/" className="block select-none relative z-10">
            <img src="/main logo.png" alt="The Neon Stack Logo" className="h-[120px] md:h-[160px] w-auto object-contain my-[-25px] md:my-[-40px]" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm">
          <Link href="/products/customize-neon-signs" className="hover:text-brand-green transition-colors">Customise Your Neon Light</Link>
          <Link href="/shop-neon-collection" className="hover:text-brand-green transition-colors">Shop Neon Collection</Link>
          <Link href="/" className="hover:text-brand-green transition-colors">Best Sellers</Link>
          <Link href="/" className="hover:text-brand-green transition-colors">Business Logo</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="hover:text-brand-purple transition-colors"><Search className="w-6 h-6" /></button>
          <button className="hover:text-brand-purple transition-colors hidden md:block"><User className="w-6 h-6" /></button>
          <button className="hover:text-brand-purple transition-colors relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-2 bg-brand-green text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full h-[calc(100vh-80px)] bg-black overflow-y-auto flex flex-col shadow-2xl">
          <div className="flex flex-col">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/products/customize-neon-signs" className="text-[17px] font-semibold py-4 px-6 border-b border-white/10 hover:bg-white/5 transition-colors">Customise Your Neon Light</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/shop-neon-collection" className="text-[17px] font-semibold py-4 px-6 border-b border-white/10 hover:bg-white/5 transition-colors">Shop Neon Collection</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-[17px] font-semibold py-4 px-6 border-b border-white/10 hover:bg-white/5 transition-colors">Best Sellers</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-[17px] font-semibold py-4 px-6 border-b border-white/10 hover:bg-white/5 transition-colors">Business Logo</Link>
          </div>

          <div className="mt-4 mx-4 bg-[#1a1a1a] rounded-xl p-6 flex flex-col gap-5">
            <h3 className="text-lg font-bold text-center">Need Help?</h3>
            
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Text us on whatsapp</span>
              <a href="https://wa.me/15551234567" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <span className="underline underline-offset-4 decoration-white/30 hover:decoration-white">+1 (555) 123-4567</span>
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Contact for support</span>
              <a href="tel:+15559876543" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                <span className="underline underline-offset-4 decoration-white/30 hover:decoration-white">+1 (555) 987-6543</span>
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Contact for sales</span>
              <a href="tel:+15551234567" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span className="underline underline-offset-4 decoration-white/30 hover:decoration-white">+1 (555) 123-4567</span>
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Email Id</span>
              <a href="mailto:hello@example.com" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span className="underline underline-offset-4 decoration-white/30 hover:decoration-white">hello@example.com</span>
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 p-6 pb-12">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="flex items-center gap-3 text-lg font-semibold hover:text-brand-green transition-colors">
              <User className="w-6 h-6" /> Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
