import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTwitter, FaPinterest, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div>
            <div className="text-3xl font-black tracking-tighter uppercase italic mb-6">
              Neon<span className="text-pink-500">Sign</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              India's No.1 Neon Lights brand. Handcrafted, premium quality LED neon signs for your home, business or events.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-pink-500 transition-colors"><FaInstagram /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-blue-600 transition-colors"><FaFacebook /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-blue-400 transition-colors"><FaTwitter /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 transition-colors"><FaPinterest /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-blue-700 transition-colors"><FaLinkedin /></a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/products/customize-neon-signs" className="hover:text-white transition-colors">Customise Your Neon</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Business Logo</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">FloRo Signs</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Information</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Return & Refund</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Join The Club</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 flex-1 focus:outline-none focus:border-pink-500" />
              <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-600 transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Neon Sign. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
}
