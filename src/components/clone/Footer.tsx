"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTwitter, FaPinterest, FaLinkedin } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { ButtonParticles } from '@/components/ui/button-particles';
import { NeonLogo } from '@/components/clone/NeonLogo';
import { NeonIcon } from '@/components/clone/NeonIcon';

export function Footer() {
  const [pages, setPages] = useState<{id: number, title: string, slug: string}[] | null>(null);

  useEffect(() => {
    supabase
      .from('pages')
      .select('id, title, slug')
      .order('created_at', { ascending: true })
      .then(({ data }) => setPages(data));
  }, []);

  return (
    <footer className="bg-black pt-16 pb-8 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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
            <p className="text-gray-400 mb-6 leading-relaxed">
              India&apos;s No.1 Neon Lights brand. Handcrafted, premium quality LED neon signs for your home, business or events.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-[#E1306C] hover:text-white hover:bg-brand-purple hover:shadow-[0_0_15px_rgba(117,46,255,0.5)] transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-[#1877F2] hover:text-white hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-[#1DA1F2] hover:text-white hover:bg-[#1DA1F2] hover:shadow-[0_0_15px_rgba(29,161,242,0.5)] transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-[#E60023] hover:text-white hover:bg-[#E60023] hover:shadow-[0_0_15px_rgba(230,0,35,0.5)] transition-colors"><FaPinterest size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-[#0A66C2] hover:text-white hover:bg-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.5)] transition-colors"><FaLinkedin size={20} /></a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/products/customize-neon-signs" className="hover:text-brand-green transition-colors">Customise Your Neon</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Business Logo</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">All Products</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Mojo Mix Signs</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Information</h4>
            <ul className="space-y-3 text-gray-400">
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
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Join The Club</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Enter Your Email ID" className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 h-12 flex-1 min-w-0 text-sm focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/50" />
              <ButtonParticles label="Join" className="h-12 px-5 w-full sm:w-auto flex-shrink-0 text-sm" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} The Neon Stack. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <img src="/payment.png" alt="Payment Methods" className="h-10 md:h-12 opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
}
