import React from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { Header } from '@/components/clone/Header';
import { Footer } from '@/components/clone/Footer';

export const metadata = {
  title: 'Contact Us | Neon Stack',
  description: 'Get in touch with Neon Stack for all your custom neon sign needs.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">
            Get in <span className="text-brand-purple">Touch</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Got some neon-related news? Get in touch regarding any doubt, questions or simply tell us how much you love Neon Stack (we love ourselves some good feedback!)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Form Section */}
          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Name</label>
                  <input type="text" className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">E-mail</label>
                  <input type="email" className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Mobile</label>
                  <input type="tel" className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white transition-colors" placeholder="+91 00000 00000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">City</label>
                  <input type="text" className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white transition-colors" placeholder="Mumbai" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Message</label>
                <textarea rows={4} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-brand-purple text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-purple/80 transition-all shadow-[0_0_15px_rgba(117,46,255,0.4)]">
                Submit <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col justify-center space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-wide border-b border-white/10 pb-4">Business Queries</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 text-[#f967fb] shadow-[0_0_15px_rgba(249,103,251,0.2)]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Phone</h4>
                    <p className="text-gray-400 leading-relaxed">+91 7780177568<br/>+91 9107707777</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 text-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Email</h4>
                    <a href="mailto:info@neonstack.com" className="text-gray-400 hover:text-white transition-colors leading-relaxed">info@neonstack.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
