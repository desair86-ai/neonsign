"use client";
import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/CartContext';

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
  const { cartCount } = useCart();

  const navItems: NavItem[] = [
    { 
      label: 'Customize Neon Sign', 
      href: '#',
      dropdown: [
        { label: 'Custom Neon Sign', href: '/products/customize-neon-signs' },
        { label: 'Mojo Mix', href: '/products/customize-mojo-mix' },
      ]
    },
    { 
      label: 'Neon Shop', 
      href: '/shop-neon-collection',
      isMega: true,
      columns: [
        [
          { label: 'Gaming Neon Signs', href: '/shop-neon-collection?cat=gaming' },
          { label: 'Gods & Devotional Neon Signs', href: '/shop-neon-collection?cat=gods' },
          { label: 'Happy Birthday Neon Signs', href: '/shop-neon-collection?cat=happy-birthday' },
          { label: 'New Year Neon Signs', href: '/shop-neon-collection?cat=new-year' },
          { label: 'For Businesses & Offices', href: '/shop-neon-collection?cat=for-businesses' },
          { label: 'Clock Neon Signs', href: '/shop-neon-collection?cat=clock' },
          { label: 'Man Cave Neon Signs', href: '/shop-neon-collection?cat=man-cave' },
          { label: 'Café & Coffee Shop Signs', href: '/shop-neon-collection?cat=cafe' },
          { label: 'Bars & Pub Neon Signs', href: '/shop-neon-collection?cat=bars' },
          { label: 'Gym, Fitness & Yoga Signs', href: '/shop-neon-collection?cat=gym' },
          { label: 'Garage & Automotive Signs', href: '/shop-neon-collection?cat=garage' },
        ],
        [
          { label: 'Barber Shop & Salon Signs', href: '/shop-neon-collection?cat=barber-shop' },
          { label: 'Beauty, Nail & Hair Salon Neon Signs', href: '/shop-neon-collection?cat=beauty-salon' },
          { label: 'Wildlife & Animals', href: '/shop-neon-collection?cat=wildlife' },
          { label: 'Travel & Wanderlust', href: '/shop-neon-collection?cat=travel' },
          { label: 'We*d & 420 Neon Signs', href: '/shop-neon-collection?cat=weed' },
          { label: 'Japanese & Anime Signs', href: '/shop-neon-collection?cat=japanese' },
          { label: 'K-Pop Neon Signs', href: '/shop-neon-collection?cat=k-pop' },
          { label: 'LGBT & Pride Neon Signs', href: '/shop-neon-collection?cat=lgbt' },
          { label: 'Astronaut & Space Signs', href: '/shop-neon-collection?cat=astronaut' },
          { label: 'Love / Heart Neon Signs', href: '/shop-neon-collection?cat=love-heart' },
          { label: 'Golf Neon Signs', href: '/shop-neon-collection?cat=golf' },
        ],
        [
          { label: 'Cricket & Stadium Signs', href: '/shop-neon-collection?cat=cricket' },
          { label: 'Music & Instruments', href: '/shop-neon-collection?cat=music' },
          { label: 'Skull & Gothic Signs', href: '/shop-neon-collection?cat=skull' },
          { label: 'Motorbikes & Riders', href: '/shop-neon-collection?cat=motorbikes' },
          { label: 'Cars & Racing Signs', href: '/shop-neon-collection?cat=cars' },
          { label: 'Quotes & Typography', href: '/shop-neon-collection?cat=quotes' },
          { label: 'Sports & Fitness', href: '/shop-neon-collection?cat=sports' },
          { label: 'Bollywood & Cinema', href: '/shop-neon-collection?cat=bollywood' },
          { label: 'Hollywood & Movie Signs', href: '/shop-neon-collection?cat=hollywood' },
          { label: 'Rock N Roll & Band Signs', href: '/shop-neon-collection?cat=rock-n-roll' },
          { label: 'Home Decor Neon Signs', href: '/shop-neon-collection?cat=home-decor' },
          { label: 'Celebrations & Events', href: '/shop-neon-collection?cat=celebrations' },
        ]
      ]
    },
    { label: 'About Us', href: '/about' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Under 4000', href: '#' },
  ];

  return (
    <div className="sticky top-0 z-[60] w-full bg-black text-white border-b border-brand-green shadow-[0_4px_20px_rgba(110,255,134,0.2)] font-poppins">
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
        <div className="flex-shrink-0 relative z-50 outline-none border-none flex items-center">
          <Link href="/" className="block select-none cursor-pointer outline-none border-none focus:outline-none focus:border-none focus-visible:outline-none shadow-none group">
              <img 
                src="/main logo.png" 
                alt="The Neon Stack Logo" 
                className="h-[140px] md:h-[180px] w-auto object-contain mb-[-30px] md:mb-[-50px] -mt-2 md:-mt-6 cursor-pointer group-hover:scale-105 transition-transform duration-500 outline-none border-none drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] drop-shadow-[0_0_20px_rgba(117,46,255,0.6)]" 
              />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-5 font-bold text-sm tracking-widest" style={{ fontFamily: 'var(--font-poppins)' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <div key={item.label} className="group relative">
                <Link 
                  href={item.href} 
                  onClick={(e) => {
                    if (item.href === '#') {
                      e.preventDefault();
                    }
                  }}
                  className={`relative px-3.5 py-2.5 rounded-full flex items-center justify-center gap-1.5 uppercase transition-all duration-300 hover:scale-105 cursor-pointer border ${isActive ? 'font-extrabold !text-[#6eff86] border-[#752eff] shadow-[0_0_15px_rgba(117,46,255,0.5)]' : '!text-white border-transparent hover:!text-[#6eff86] hover:border-[#752eff] hover:shadow-[0_0_15px_rgba(117,46,255,0.5)]'}`}
                >
                  {isActive && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-brand-green/25 rounded-full blur-xl -z-10"
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        className="absolute top-0 left-4 right-4 h-[2px] bg-brand-green shadow-[0_0_8px_rgba(110,255,134,0.8)]"
                        transition={{ duration: 0.3 }}
                      />
                    </>
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {(item.dropdown || item.columns) && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                </Link>

                {/* Dropdowns */}
                {(item.dropdown || item.columns) && (
                  <div className={`absolute top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 left-1/2 -translate-x-1/2`}>
                    <div className={`bg-black/95 backdrop-blur-xl border-2 ${item.isMega ? 'border-[#752eff]/50 shadow-[0_0_20px_rgba(117,46,255,0.3)]' : 'border-[#752eff]/50 shadow-[0_0_20px_rgba(117,46,255,0.3)]'} rounded-lg p-2 whitespace-normal`}>
                      
                      {/* Single Column */}
                      {item.dropdown && (
                        <div className="flex flex-col min-w-[220px]">
                          {item.dropdown.map(subItem => (
                            <Link key={subItem.label} href={subItem.href} className="px-4 py-3 !text-white rounded-md transition-all border border-transparent border-b-white/5 hover:!text-[#6eff86] hover:border-[#752eff] hover:shadow-[0_0_10px_rgba(117,46,255,0.3)]">
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Mega Menu (3 columns) */}
                      {item.columns && (
                        <div className="flex gap-4 p-2">
                          {item.columns.map((col, colIdx) => (
                            <div key={colIdx} className="flex flex-col w-[250px] lg:w-[270px]">
                              {col.map((subItem, itemIdx) => (
                                <div key={subItem.label} className="group/sub relative">
                                  <Link href={subItem.href} className="flex items-center justify-between px-3.5 py-2 text-sm leading-snug break-words whitespace-normal !text-white rounded-md transition-all border border-transparent border-b-white/5 hover:!text-[#6eff86] hover:border-[#752eff] hover:shadow-[0_0_10px_rgba(117,46,255,0.3)]">
                                    {subItem.label}
                                    {subItem.subMenu && <ChevronDown className="w-4 h-4 -rotate-90 hover:!text-[#6eff86] flex-shrink-0 ml-1" />}
                                  </Link>
                                  
                                  {/* Sub-menu (pops to left) */}
                                  {subItem.subMenu && (
                                    <div className={`absolute right-full ${itemIdx > col.length / 2 ? 'bottom-0 -mb-2' : 'top-0'} pr-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50`}>
                                      <div className="bg-black/95 backdrop-blur-xl border-2 border-[#752eff]/50 rounded-lg p-2 shadow-[0_0_15px_rgba(117,46,255,0.3)] whitespace-normal flex flex-col w-[230px]">
                                        {subItem.subMenu.map(deepItem => (
                                          <Link key={deepItem.label} href={deepItem.href} className="px-3.5 py-2 text-sm leading-snug break-words whitespace-normal !text-white rounded-md transition-all border border-transparent border-b-white/5 hover:!text-[#6eff86] hover:border-[#752eff] hover:shadow-[0_0_10px_rgba(117,46,255,0.3)]">
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
          <button className="text-neon-green-hover transition-all hover:scale-110"><Search className="w-6 h-6" /></button>
          <Link href="/customer" className="text-neon-green-hover transition-all hover:scale-110 hidden md:block" title="My Customer Profile & Orders">
            <User className="w-6 h-6" />
          </Link>
          <Link href="/cart" className="text-neon-green-hover transition-all hover:scale-110 relative" title="Shopping Cart">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-2 bg-brand-green text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_8px_#6eff86]">
              {cartCount}
            </span>
          </Link>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <div className="flex flex-col bg-zinc-950/95 backdrop-blur-xl border-t border-white/10 shadow-2xl pb-10 max-h-[80vh] overflow-y-auto text-white">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const hasDropdown = item.dropdown || item.columns;
              const isExpanded = mobileExpanded === item.label;
              
              return (
                <div key={item.label} className="flex flex-col border-b border-white/10">
                  <div 
                    className={`flex items-center justify-between py-4 px-6 hover:bg-white/5 cursor-pointer transition-colors text-neon-green-hover ${isActive ? 'font-black' : ''}`}
                    onClick={() => {
                      if (hasDropdown) {
                        setMobileExpanded(isExpanded ? null : item.label);
                      } else {
                        setIsMobileMenuOpen(false);
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
                            className="block py-3 px-10 text-neon-green-hover hover:bg-white/10 border-b border-white/5 last:border-0"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                        {item.columns && item.columns.flat().map(subItem => (
                          <React.Fragment key={subItem.label}>
                            <Link 
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-3 px-10 text-neon-green-hover hover:bg-white/10 border-b border-white/5"
                            >
                              {subItem.label}
                            </Link>
                            {subItem.subMenu && subItem.subMenu.map(deepItem => (
                              <Link 
                                key={deepItem.label}
                                href={deepItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 px-14 text-sm text-neon-green-hover hover:bg-white/10 border-b border-white/5"
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
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/customer" className="flex items-center gap-3 text-lg font-semibold hover:text-brand-purple transition-colors">
              <User className="w-6 h-6" /> Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
