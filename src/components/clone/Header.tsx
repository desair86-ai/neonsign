"use client";
import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type NavItem = {
  label: string;
  href: string;
  isMega?: boolean;
  dropdown?: { label: string; href: string; }[];
  columns?: { label: string; href: string; subMenu?: { label: string; href: string; }[]; }[][];
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: 'Customise Your Neon Light', href: '/products/customize-neon-signs' },
    { 
      label: 'Occasion', 
      href: '#',
      dropdown: [
        { label: 'Diwali Neon Sign', href: '#' },
        { label: 'Valentines Neon Signs', href: '#' },
        { label: 'Christmas Neon Signs', href: '#' },
        { label: 'Father’s Day Neon Signs', href: '#' },
        { label: 'Holiday & Special Occasions Neon Signs', href: '#' },
        { label: 'Mother’s Day Neon Signs', href: '#' },
      ]
    },
    { 
      label: 'Neon Shop', 
      href: '/shop-neon-collection',
      isMega: true,
      columns: [
        [
          { label: 'Valentines Day Neon Sign', href: '#' },
          { label: 'Best Seller', href: '#' },
          { label: 'Shree Ram neon sign', href: '#' },
          { label: 'Color Ring', href: '#' },
          { label: 'Christmas Neon Sign', href: '#' },
          { label: 'Holiday & Special Occasions Neon Signs', href: '#' },
          { 
            label: 'Home Decor Neon Signs', 
            href: '#',
            subMenu: [
              { label: 'Neon Signs for Bedroom', href: '#' },
              { label: 'Neon Sign for Kitchen', href: '#' },
              { label: 'Neon Sign for Kids Room', href: '#' },
            ]
          },
          { label: 'Flow-Mo Neon Sign', href: '#' },
          { label: 'Wedding Neon Signs', href: '#' },
        ],
        [
          { label: 'Bar Neon Signs', href: '#' },
          { label: 'Restaurant Neon Signs', href: '#' },
          { label: 'Event Neon Signs', href: '#' },
          { label: 'Happy Birthday Neon Signs', href: '#' },
          { label: 'Beauty, Nail & Hair Salon Neon Signs', href: '#' },
          { label: 'Zodiac Neon Sign', href: '#' },
          { label: 'Gym, Fitness & Yoga Neon Signs', href: '#' },
          { label: 'Ganesh Neon Sign', href: '#' },
          { label: 'General neon sign', href: '#' },
        ]
      ]
    },
    { label: 'Under 4000', href: '#' },
  ];

  return (
    <div className="sticky top-0 z-[60] w-full bg-black text-white border-b border-gray-800">
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
        <div className="flex-shrink-0 relative z-50">
          <Link href="/" className="block select-none cursor-pointer">
            <img src="/main logo.png" alt="The Neon Stack Logo" className="h-[120px] md:h-[160px] w-auto object-contain my-[-25px] md:my-[-40px] cursor-pointer hover:scale-105 transition-transform" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-4 font-semibold text-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <div key={item.label} className="group relative">
                <Link 
                  href={item.href} 
                  className={`relative px-3 py-2 hover:text-brand-purple transition-colors rounded-full flex items-center justify-center gap-1 ${isActive ? 'text-brand-purple font-bold' : 'text-gray-300'}`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {(item.dropdown || item.columns) && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                </Link>

                {/* Dropdowns */}
                {(item.dropdown || item.columns) && (
                  <div className={`absolute top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ${item.isMega ? 'right-0' : 'left-1/2 -translate-x-1/2'}`}>
                    <div className={`bg-black/95 backdrop-blur-xl border-2 ${item.isMega ? 'border-brand-green/50 shadow-[0_0_20px_rgba(110,255,134,0.3)]' : 'border-brand-purple/50 shadow-[0_0_20px_rgba(117,46,255,0.4)]'} rounded-lg p-2 whitespace-nowrap`}>
                      
                      {/* Single Column */}
                      {item.dropdown && (
                        <div className="flex flex-col min-w-[220px]">
                          {item.dropdown.map(subItem => (
                            <Link key={subItem.label} href={subItem.href} className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all border border-transparent border-b-white/5 hover:border-brand-purple last:border-transparent hover:last:border-brand-purple">
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Mega Menu (2 columns) */}
                      {item.columns && (
                        <div className="flex gap-4 p-2">
                          {item.columns.map((col, colIdx) => (
                            <div key={colIdx} className="flex flex-col w-[260px]">
                              {col.map(subItem => (
                                <div key={subItem.label} className="group/sub relative">
                                  <Link href={subItem.href} className="flex items-center justify-between px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all border border-transparent border-b-white/5 hover:border-brand-green last:border-transparent hover:last:border-brand-green">
                                    {subItem.label}
                                    {subItem.subMenu && <ChevronDown className="w-4 h-4 -rotate-90 group-hover/sub:text-brand-green" />}
                                  </Link>
                                  
                                  {/* Sub-menu (pops to left) */}
                                  {subItem.subMenu && (
                                    <div className="absolute right-full top-0 pr-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                                      <div className="bg-black/95 backdrop-blur-xl border-2 border-brand-green/50 rounded-lg p-2 shadow-[0_0_15px_rgba(110,255,134,0.3)] whitespace-nowrap flex flex-col min-w-[200px]">
                                        {subItem.subMenu.map(deepItem => (
                                          <Link key={deepItem.label} href={deepItem.href} className="px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all border border-transparent border-b-white/5 hover:border-brand-green last:border-transparent hover:last:border-brand-green">
                                            {deepItem.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const hasDropdown = item.dropdown || item.columns;
              const isExpanded = mobileExpanded === item.label;
              
              return (
                <div key={item.label} className="flex flex-col border-b border-white/10">
                  <div 
                    className={`flex items-center justify-between py-4 px-6 hover:bg-white/5 cursor-pointer transition-colors ${isActive ? 'text-brand-purple' : 'text-white'}`}
                    onClick={() => {
                      if (hasDropdown) {
                        setMobileExpanded(isExpanded ? null : item.label);
                      } else {
                        setIsMobileMenuOpen(false);
                        // Navigate logic handled by Next.js if we used Link, but for mobile accordion we use div+router or Link wrapper. 
                        // To keep it simple, we use an inner Link if it has no dropdown
                      }
                    }}
                  >
                    {!hasDropdown ? (
                      <Link href={item.href} className="w-full text-[17px] font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-[17px] font-semibold">{item.label}</span>
                    )}
                    
                    {hasDropdown && (
                      <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                  </div>

                  {/* Mobile Sub-menu */}
                  <AnimatePresence>
                    {hasDropdown && isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white/5"
                      >
                        {item.dropdown && item.dropdown.map(subItem => (
                          <Link 
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-3 px-10 text-gray-300 hover:text-white border-b border-white/5 last:border-0"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                        {item.columns && item.columns.flat().map(subItem => (
                          <React.Fragment key={subItem.label}>
                            <Link 
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-3 px-10 text-gray-300 hover:text-white border-b border-white/5"
                            >
                              {subItem.label}
                            </Link>
                            {subItem.subMenu && subItem.subMenu.map(deepItem => (
                              <Link 
                                key={deepItem.label}
                                href={deepItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 px-14 text-sm text-gray-400 hover:text-white border-b border-white/5"
                              >
                                ↳ {deepItem.label}
                              </Link>
                            ))}
                          </React.Fragment>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="flex items-center gap-3 text-lg font-semibold hover:text-brand-purple transition-colors">
              <User className="w-6 h-6" /> Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
