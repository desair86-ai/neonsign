"use client";
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, ShieldCheck, Truck, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/CartContext';
import { NeonLogo } from '@/components/clone/NeonLogo';
import { NeonIcon } from '@/components/clone/NeonIcon';

type NavItem = {
  label: string;
  href: string;
  isMega?: boolean;
  dropdown?: { label: string; href: string; }[];
  columns?: { header?: string; items: { label: string; href: string; subMenu?: { label: string; href: string; }[]; }[] }[][];
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
  // Theme toggle state
  const [theme, setTheme] = useState<'classic' | 'premium' | 'light'>('classic');

  useEffect(() => {
    document.documentElement.classList.remove('theme-premium', 'theme-light');
    if (theme === 'premium') {
      document.documentElement.classList.add('theme-premium');
    } else if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
    }
  }, [theme]);

  const pathname = usePathname();
  const { cartCount } = useCart();

  const navItems: NavItem[] = [
    { 
      label: 'Customize Neon Sign', 
      href: '#',
      dropdown: [
        { label: 'Custom Neon Sign', href: '/products/customize-neon-signs' },
        { label: 'Mojo Mix', href: '/products/customize-mojo-mix' },
        { label: 'UV Printed Neon', href: '/products/uv-printed-neon' },
        { label: 'Business Logo', href: '/products/business-logo' },
      ]
    },
    { 
      label: 'Neon Shop', 
      href: '/shop-neon-collection',
      isMega: true,
      columns: [
        [
          {
            header: "Personal & Home",
            items: [
              { label: 'Gaming Neon Signs', href: '/shop-neon-collection?cat=gaming-neon-signs' },
              { label: 'Man Cave Neon Signs', href: '/shop-neon-collection?cat=man-cave-neon-signs' },
              { label: 'Home Decor Neon Signs', href: '/shop-neon-collection?cat=home-decor-neon-signs' },
              { label: 'Quotes & Typography', href: '/shop-neon-collection?cat=quotes-typography' },
              { label: 'Gods & Devotional Neon Signs', href: '/shop-neon-collection?cat=gods-devotional-neon-signs' },
              { label: 'Love / Heart Neon Signs', href: '/shop-neon-collection?cat=love-heart-neon-signs' },
              { label: 'Clock Neon Signs', href: '/shop-neon-collection?cat=clock-neon-signs' },
              { label: 'Skull & Gothic Signs', href: '/shop-neon-collection?cat=skull-gothic-signs' },
              { label: 'Astronaut & Space Signs', href: '/shop-neon-collection?cat=astronaut-space-signs' },
              { label: 'Travel & Wanderlust', href: '/shop-neon-collection?cat=travel-wanderlust' },
            ]
          },
          {
            header: "Deals",
            items: [
              { label: 'B-Stock', href: '/shop-neon-collection?cat=b-stock' },
            ]
          }
        ],
        [
          {
            header: "Business & Events",
            items: [
              { label: 'For Businesses & Offices', href: '/shop-neon-collection?cat=for-businesses-offices' },
              { label: 'Barber Shop & Salon Signs', href: '/shop-neon-collection?cat=barber-shop-salon-signs' },
              { label: 'Beauty, Nail & Hair Salon Neon Signs', href: '/shop-neon-collection?cat=beauty-nail-hair-salon-neon-signs' },
              { label: 'Café & Coffee Shop Signs', href: '/shop-neon-collection?cat=caf-coffee-shop-signs' },
              { label: 'Bars & Pub Neon Signs', href: '/shop-neon-collection?cat=bars-pub-neon-signs' },
              { label: 'Gym, Fitness & Yoga Signs', href: '/shop-neon-collection?cat=gym-fitness-yoga-signs' },
              { label: 'Happy Birthday Neon Signs', href: '/shop-neon-collection?cat=happy-birthday-neon-signs' },
              { label: 'New Year Neon Signs', href: '/shop-neon-collection?cat=new-year-neon-signs' },
              { label: 'Celebrations & Events', href: '/shop-neon-collection?cat=celebrations-events' },
              { label: 'LGBT & Pride Neon Signs', href: '/shop-neon-collection?cat=lgbt-pride-neon-signs' },
              { label: 'We*d & 420 Neon Signs', href: '/shop-neon-collection?cat=we-d-420-neon-signs' },
            ]
          }
        ],
        [
          {
            header: "Passions & Entertainment",
            items: [
              { label: 'Japanese & Anime Signs', href: '/shop-neon-collection?cat=japanese-anime-signs' },
              { label: 'K-Pop Neon Signs', href: '/shop-neon-collection?cat=k-pop-neon-signs' },
              { label: 'Bollywood & Cinema', href: '/shop-neon-collection?cat=bollywood-cinema' },
              { label: 'Hollywood & Movie Signs', href: '/shop-neon-collection?cat=hollywood-movie-signs' },
              { label: 'Music & Instruments', href: '/shop-neon-collection?cat=music-instruments' },
              { label: 'Rock N Roll & Band Signs', href: '/shop-neon-collection?cat=rock-n-roll-band-signs' },
              { label: 'Garage & Automotive Signs', href: '/shop-neon-collection?cat=garage-automotive-signs' },
              { label: 'Motorbikes & Riders', href: '/shop-neon-collection?cat=motorbikes-riders' },
              { label: 'Cars & Racing Signs', href: '/shop-neon-collection?cat=cars-racing-signs' },
              { label: 'Sports & Fitness', href: '/shop-neon-collection?cat=sports-fitness' },
              { label: 'Golf Neon Signs', href: '/shop-neon-collection?cat=golf-neon-signs' },
              { label: 'Cricket & Stadium Signs', href: '/shop-neon-collection?cat=cricket-stadium-signs' },
              { label: 'Wildlife & Animals', href: '/shop-neon-collection?cat=wildlife-animals' },
            ]
          }
        ]
      ]
    },
    { label: 'About Us', href: '/about' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <>
      {/* Placeholder for fixed header */}
      <div className="h-[120px] w-full" />
      
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-4px)] text-white shadow-[0_4px_30px_rgba(202,110,255,0.2)] font-poppins bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient px-[3px] pt-[3px] pb-[3px] rounded-b-[4px]">
        <div className="w-full bg-black relative flex flex-col h-full rounded-b-[2px]">
          {/* Top Announcement Bar */}
          <div className="relative w-full flex items-center justify-center py-2.5 px-4">
            <div className="absolute left-4 md:flex items-center gap-2 hidden">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Theme:</span>
              <button 
                onClick={() => setTheme('classic')}
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${theme === 'classic' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                Classic
              </button>
              <button 
                onClick={() => setTheme('premium')}
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${theme === 'premium' ? 'bg-gradient-to-r from-brand-purple to-brand-green text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                Premium
              </button>
              <button 
                onClick={() => setTheme('light')}
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${theme === 'light' ? 'bg-white text-black shadow-[0_0_10px_white]' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                Light
              </button>
            </div>
            
            <div className="text-[13px] md:text-[15px] font-bold tracking-wide flex items-center flex-wrap justify-center gap-2 md:gap-4 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
                We Exist
              </span>
            </div>
          </div>
          
          {/* Gradient Divider */}
          <div className="w-full h-[2px] bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient" />
          
          {/* Main Header */}
          <header className="max-w-[1600px] w-full mx-auto px-4 xl:px-10 h-20 flex items-center justify-between relative z-10">
        
        {/* Mobile Menu Icon */}
        <div className="xl:hidden flex items-center">
          <button 
            className="p-2 hover:text-brand-green transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Logo */}
          <div className="flex-shrink-0 relative z-50 flex items-center">
              <a href="/" className="relative flex items-center gap-2 xl:gap-3 cursor-pointer group">
                <div className="absolute inset-0 z-50"></div>
                {/* Full logo */}
                <div className="block h-12 xl:h-16 w-[160px] md:w-[200px] xl:w-[260px] relative transition-all duration-700 group-hover:scale-105 flex-shrink-0 pointer-events-none">
                  <NeonLogo />
                </div>
              </a>
          </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center xl:gap-1 2xl:gap-5 font-bold text-sm 2xl:text-base tracking-wider 2xl:tracking-widest" style={{ fontFamily: 'var(--font-poppins)' }}>
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
                  className={`relative px-2 py-2 2xl:px-3.5 2xl:py-2.5 rounded-full flex items-center justify-center gap-1.5 capitalize transition-all duration-300 hover:scale-105 cursor-pointer border whitespace-nowrap ${isActive ? 'font-extrabold !text-white border-[#752eff] shadow-[0_0_15px_rgba(117,46,255,0.5)]' : '!text-white border-transparent hover:!text-white hover:border-[#752eff] hover:shadow-[0_0_15px_rgba(117,46,255,0.5)]'}`}
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
                  <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                  {(item.dropdown || item.columns) && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                </Link>

                {/* Dropdowns */}
                {(item.dropdown || item.columns) && (
                  <div className={`absolute top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 left-1/2 -translate-x-1/2`}>
                    <div className={`bg-black/95 backdrop-blur-xl border-2 ${item.isMega ? 'border-[#752eff]/50 shadow-[0_0_20px_rgba(117,46,255,0.3)]' : 'border-[#752eff]/50 shadow-[0_0_20px_rgba(117,46,255,0.3)]'} rounded-lg p-2 whitespace-normal`}>
                      
                      {/* Single Column */}
                      {item.dropdown && (
                        <div className="flex flex-col min-w-[240px] p-2">
                          {item.dropdown.map(subItem => (
                            <Link key={subItem.label} href={subItem.href} className="relative block transition-all duration-300 hover:translate-x-1 group/link mb-1">
                              <div className="relative px-4 py-3 bg-transparent text-[15px] font-medium text-zinc-300 group-hover/link:text-white transition-colors z-10">
                                {subItem.label}
                                <div className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient opacity-0 group-hover/link:opacity-100 transition-all duration-300" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Mega Menu (3 columns) */}
                      {item.columns && (
                        <div className="flex gap-6 p-4">
                          {item.columns.map((col, colIdx) => (
                            <div key={colIdx} className="flex flex-col w-[260px] xl:w-[280px]">
                              {col.map((section, secIdx) => (
                                <div key={secIdx} className={secIdx > 0 ? "mt-6" : ""}>
                                  {section.header && (
                                    <h4 className="text-brand-green font-bold text-[13px] uppercase tracking-wider mb-3 px-3">
                                      {section.header}
                                    </h4>
                                  )}
                                  {section.items.map((subItem, itemIdx) => (
                                    <div key={subItem.label} className="group/sub relative mb-1">
                                      <Link href={subItem.href} className="relative block transition-all duration-300 hover:translate-x-1 group/link">
                                        <div className="relative px-3 py-2.5 bg-transparent flex items-center justify-between text-[14px] font-medium leading-snug break-words whitespace-normal text-zinc-400 group-hover/link:text-white transition-colors z-10">
                                          {subItem.label}
                                          {subItem.subMenu && <ChevronDown className="w-4 h-4 -rotate-90 flex-shrink-0 ml-1 opacity-50 group-hover/sub:opacity-100 transition-opacity" />}
                                          <div className="absolute bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient opacity-0 group-hover/link:opacity-100 transition-all duration-300" />
                                        </div>
                                      </Link>
                                      
                                      {/* Sub-menu (pops to left) */}
                                      {subItem.subMenu && (
                                        <div className={`absolute right-full ${itemIdx > section.items.length / 2 ? 'bottom-0 -mb-2' : 'top-0'} pr-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50`}>
                                          <div className="bg-black/95 backdrop-blur-xl border-2 border-[#752eff]/50 rounded-lg p-2 shadow-[0_0_15px_rgba(117,46,255,0.3)] whitespace-normal flex flex-col w-[230px]">
                                            {subItem.subMenu.map(deepItem => (
                                              <Link key={deepItem.label} href={deepItem.href} className="relative block transition-all duration-300 hover:translate-x-1 group/link mb-1">
                                                <div className="relative px-3.5 py-2.5 bg-transparent text-sm font-medium leading-snug break-words whitespace-normal text-zinc-400 group-hover/link:text-white transition-colors z-10">
                                                  {deepItem.label}
                                                  <div className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient opacity-0 group-hover/link:opacity-100 transition-all duration-300" />
                                                </div>
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
          <button className="text-white transition-all hover:scale-110"><Search className="w-6 h-6" /></button>
          <Link href="/customer" className="text-white transition-all hover:scale-110 hidden md:block" title="My Customer Profile & Orders">
            <User className="w-6 h-6" />
          </Link>
          <Link href="/cart" className="text-white transition-all hover:scale-110 relative" title="Shopping Cart">
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
          className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
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
                    className={`flex items-center justify-between py-4 px-6 hover:bg-white/5 cursor-pointer transition-colors text-white ${isActive ? 'font-black' : ''}`}
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
                            className="block py-3 px-10 text-white hover:bg-white/10 border-b border-white/5 last:border-0"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                        {item.columns && item.columns.map((col, colIdx) => (
                          <div key={colIdx} className="py-2 border-b border-white/5 last:border-0">
                            {col.map((section, secIdx) => (
                              <div key={secIdx} className={secIdx > 0 ? "mt-4" : ""}>
                                {section.header && (
                                  <div className="px-10 py-2 text-brand-green text-[12px] font-bold uppercase tracking-wider">
                                    {section.header}
                                  </div>
                                )}
                                {section.items.map(subItem => (
                                  <React.Fragment key={subItem.label}>
                                    <Link 
                                      href={subItem.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block py-2.5 px-10 text-[15px] font-medium text-zinc-300 hover:text-white hover:bg-white/5"
                                    >
                                      {subItem.label}
                                    </Link>
                                    {subItem.subMenu && subItem.subMenu.map(deepItem => (
                                      <Link 
                                        key={deepItem.label}
                                        href={deepItem.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-2.5 px-14 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5"
                                      >
                                        ↳ {deepItem.label}
                                      </Link>
                                    ))}
                                  </React.Fragment>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <Link 
            onClick={() => setIsMobileMenuOpen(false)} 
            href="/customer" 
            className="flex items-center gap-3 py-4 px-6 text-lg font-semibold border-b border-white/5 hover:text-brand-purple transition-colors"
          >
            <User className="w-6 h-6" /> Account
          </Link>
          <div className="pb-8"></div>
        </div>
      )}
      </div>
    </div>
    </>
  );
}




