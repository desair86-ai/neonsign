import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTwitter, FaPinterest, FaLinkedin } from 'react-icons/fa';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
import { AuroraColorTester } from '@/components/ui/aurora-color-tester';

export function Footer() {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div>
            <div className="mb-2 select-none w-full h-[60px] md:h-[80px]">
              <TextHoverEffect text="NEON STACK" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              India&apos;s No.1 Neon Lights brand. Handcrafted, premium quality LED neon signs for your home, business or events.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-brand-purple hover:shadow-[0_0_15px_rgba(117,46,255,0.5)] transition-colors"><FaInstagram /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"><FaFacebook /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-blue-400 transition-colors"><FaTwitter /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-red-600 transition-colors"><FaPinterest /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"><FaLinkedin /></a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/products/customize-neon-signs" className="hover:text-brand-green transition-colors">Customise Your Neon</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Business Logo</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">All Products</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">FloRo Signs</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Information</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-brand-green transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Contact Us</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Shipping Policy</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Return & Refund</Link></li>
              <li><Link href="/" className="hover:text-brand-green transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Join The Club</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 flex-1 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/50" />
              <button className="bg-brand-purple text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-purple/80 hover:shadow-[0_0_15px_rgba(117,46,255,0.4)] transition-colors">Join</button>
            </div>
            <div className="hidden md:block">
              <AuroraColorTester />
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
