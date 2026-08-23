"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTwitter, FaPinterest, FaLinkedin } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { ButtonParticles } from '@/components/ui/button-particles';
import { NeonLogo } from '@/components/clone/NeonLogo';
import { NeonIcon } from '@/components/clone/NeonIcon';

export function Footer() {
  const [pages, setPages] = useState<{id: number, title: string, slug: string}[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    supabase
      .from('pages')
      .select('id, title, slug')
      .order('created_at', { ascending: true })
      .then(({ data }) => setPages(data));
  }, []);

  // CodePen Grid Logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triangleBase = 48;
    let resizeTimer: NodeJS.Timeout;

    const instantiateGrid = () => {
      container.innerHTML = '';
      if (!footerRef.current) return;
      
      const width = footerRef.current.clientWidth;
      const height = footerRef.current.clientHeight;

      let columns = Math.ceil(width / (triangleBase * 2)) + 1;
      let rows = Math.ceil(height / triangleBase * 1.733);
      container.style.setProperty('--columns', columns.toString());

      const fragment = document.createDocumentFragment();
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          let el = document.createElement("div");
          el.className = "triangle-set";
          if (y % 2 === 0) el.classList.add("triangle-set--offset");
          fragment.appendChild(el);
        }
      }
      container.appendChild(fragment);
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(instantiateGrid, 100);
    };

    instantiateGrid();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!glowRef.current || !footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Smooth trailing effect or direct follow
    glowRef.current.style.left = `${x}px`;
    glowRef.current.style.top = `${y}px`;
  };

  return (
    <footer 
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#000000] pt-16 pb-8 border-t border-brand-green/30 overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --gap: 0.15rem;
          --triangle-base: 3rem;
          --triangle-base-height: calc(1.733 * var(--triangle-base));
          --triangle-width: calc(var(--triangle-base) - var(--gap));
          --triangle-height: calc(var(--triangle-base-height) - var(--gap));
        }
        
        @property --glow-color {
          syntax: "<color>";
          inherits: false;
          initial-value: #6eff86;
        }

        .footer-bg-wrapper {
          position: absolute;
          inset: 0;
          background: radial-gradient(#161B33, #000000);
          background-size: 400% 400%;
          background-position: 100% 100%;
          animation: bg-animation 20s alternate infinite;
          z-index: 0;
          pointer-events: none;
        }

        @keyframes bg-animation {
          from { background-position: 0% 0%; }
          to { background-position: 400% 400%; }
        }

        #footer-glow {
          position: absolute;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle closest-side, var(--glow-color, #6eff86), transparent);
          animation: glow-animation 5.2s ease infinite alternate;
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0.55;
          filter: blur(20px);
        }

        @keyframes glow-animation {
          0% {
            --glow-color: #6eff86;
            transform: translate(-50%, -50%) scale(0.5);
          } 
          50% {
            --glow-color: #752eff;
            transform: translate(-50%, -50%) scale(0.8) rotate(45deg);
          }
          100% {
            --glow-color: #bca9ff;
            transform: translate(-50%, -50%) scale(1) rotate(90deg);
          }
        }

        .triangle-container {
          display: grid;
          grid-template-columns: repeat(var(--columns), calc(var(--triangle-base) * 2 + var(--gap)));
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          opacity: 0.95;
          pointer-events: none;
        }

        .triangle-set {
          display: inline-block;
          position: relative;
          width: calc(var(--triangle-base) * 2 + var(--gap));
          height: var(--triangle-base-height);
        }
        
        .triangle-set--offset {
          transform: translateX(calc(-1 * var(--triangle-base) - 0.5 * var(--gap)));
        }
        
        .triangle-set::before, .triangle-set::after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          top: var(--gap);
          border-right: var(--triangle-width) solid transparent; 
          border-left: var(--triangle-width) solid transparent;
        }
        
        .triangle-set::before {
          left: calc(-1 * var(--triangle-base));
          border-bottom: var(--triangle-height) solid #000000;
        }
        
        .triangle-set::after {
          right: calc(var(--gap) * 2.5);
          border-top: var(--triangle-height) solid #000000;
        }
      `}} />

      {/* Dynamic Background */}
      <div className="footer-bg-wrapper">
        <div id="footer-glow" ref={glowRef}></div>
        <div className="triangle-container" ref={containerRef}></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          {/* Brand Col */}
          <div>
            <div className="mb-6 select-none relative z-50 outline-none border-none">
              <Link href="/" className="inline-flex items-center gap-3 mb-6 outline-none border-none focus:outline-none shadow-none group">
                  <div className="h-14 lg:h-20 w-[200px] sm:w-[240px] lg:w-[280px] relative cursor-pointer transition-transform duration-500 flex-shrink-0">
                    <NeonLogo />
                  </div>
                  <div className="h-10 w-10 lg:h-14 lg:w-14 relative cursor-pointer flex-shrink-0 self-center">
                    <NeonIcon />
                  </div>
              </Link>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed drop-shadow-md">
              India&apos;s No.1 Neon Lights brand. Handcrafted, premium quality LED neon signs for your home, business or events.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#E1306C] hover:text-white hover:bg-brand-purple hover:shadow-[0_0_15px_rgba(117,46,255,0.5)] transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#1877F2] hover:text-white hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#1DA1F2] hover:text-white hover:bg-[#1DA1F2] hover:shadow-[0_0_15px_rgba(29,161,242,0.5)] transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#E60023] hover:text-white hover:bg-[#E60023] hover:shadow-[0_0_15px_rgba(230,0,35,0.5)] transition-colors"><FaPinterest size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#0A66C2] hover:text-white hover:bg-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.5)] transition-colors"><FaLinkedin size={20} /></a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider text-white drop-shadow-md">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/products/customize-neon-signs" className="hover:text-brand-green transition-colors">Customise Your Neon</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Business Logo</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">All Products</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Mojo Mix Signs</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider text-white drop-shadow-md">Information</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/about" className="hover:text-brand-green transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand-green transition-colors">Contact Us</Link></li>
              {pages?.map((page) => (
                <li key={page.id}>
                  <Link href={`/${page.slug.replace(/^\//, '')}`} className="hover:text-brand-green transition-colors">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider text-white drop-shadow-md">Join The Club</h4>
            <p className="text-gray-300 mb-4 drop-shadow-md">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Enter Your Email ID" className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-lg px-3 h-12 flex-1 min-w-0 text-sm focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/50 text-white placeholder-gray-500" />
              <ButtonParticles label="Join" className="h-12 px-5 w-full sm:w-auto flex-shrink-0 text-sm" />
            </div>
          </div>
        </div>

        {/* Continuous Gradient Divider */}
        <div className="h-[2px] w-full bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient mb-4 opacity-80 shadow-[0_0_10px_rgba(117,46,255,0.4)]" />

        <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm font-medium drop-shadow-md">
          <p>&copy; {new Date().getFullYear()} The Neon Stack. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <img src="/payment.png" alt="Payment Methods" className="h-7 md:h-9 opacity-80 hover:opacity-100 transition-opacity drop-shadow-lg" />
          </div>
        </div>
      </div>
    </footer>
  );
}
