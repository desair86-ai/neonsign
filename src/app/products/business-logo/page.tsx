'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle2, XCircle, FileImage, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { Header } from '@/components/clone/Header';
import { Footer } from '@/components/clone/Footer';
import { ButtonParticles } from '@/components/ui/button-particles';

const SIGN_TYPES = [
  { id: 'neon', name: 'Custom Neon Sign', desc: 'Classic LED neon on acrylic backboard.' },
  { id: 'mojo', name: 'Mojo Mix', desc: 'RGB multi-color dynamic LED signs.' },
  { id: 'uv', name: 'UV Printed Neon', desc: 'Full-color UV print with neon highlights.' },
];

export default function BusinessLogoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSignType, setSelectedSignType] = useState('neon');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 4 * 1024 * 1024) {
        alert("File size exceeds 4MB limit. Please upload a smaller image.");
        return;
      }
      setFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 4 * 1024 * 1024) {
        alert("File size exceeds 4MB limit. Please upload a smaller image.");
        return;
      }
      setFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    formData.set('signType', selectedSignType);
    if (file) {
      formData.set('file', file);
    }

    try {
      const res = await fetch('/api/business-logo', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSubmitStatus('success');
        e.currentTarget.reset();
        setFile(null);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090909] text-white font-sans flex flex-col pt-[80px]">
      <Header />
      
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10">
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-brand-green/20 blur-[100px] rounded-full pointer-events-none" />
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight text-white relative z-10">
            Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">Custom Logo</span> With Us
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium relative z-10">
            Upload your business logo or artwork. Get a FREE Quote and 3D Mockup within 24 hours.
          </p>
        </div>

        <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Neon Top Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-green to-transparent opacity-50" />
          
          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Your Name *</label>
                <input required name="name" type="text" className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Your Email *</label>
                <input required name="email" type="email" className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all" placeholder="john@company.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Phone Number *</label>
                <input required name="phone" type="tel" className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all" placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Approximate Size (Optional)</label>
                <input name="size" type="text" className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all" placeholder="e.g. 48 inches wide" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Choose Sign Type *</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SIGN_TYPES.map((type) => (
                  <div 
                    key={type.id} 
                    onClick={() => setSelectedSignType(type.id)}
                    className={`cursor-pointer border-2 rounded-2xl p-5 transition-all duration-300 ${
                      selectedSignType === type.id 
                      ? 'border-brand-purple bg-brand-purple/10 shadow-[0_0_20px_rgba(196,0,255,0.15)]' 
                      : 'border-white/10 bg-[#1a1a1a] hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">{type.name}</h3>
                      {selectedSignType === type.id && <CheckCircle2 className="w-5 h-5 text-brand-purple" />}
                    </div>
                    <p className="text-xs text-gray-400">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Design Details & Requirements *</label>
              <textarea required name="details" rows={4} className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all resize-y" placeholder="Tell us about the fonts, colors, specific layout needs, and when you need it by..."></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Approximate Budget (Optional)</label>
              <input name="budget" type="text" className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all" placeholder="e.g. ₹40,000 - ₹80,000" />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wide">Upload Artwork / Logo</label>
              <div 
                className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300 group ${
                  isDragging 
                  ? 'border-brand-green bg-brand-green/10' 
                  : file ? 'border-white/30 bg-[#1a1a1a]' : 'border-white/10 bg-[#1a1a1a] hover:border-white/30 hover:bg-[#222]'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*,.pdf,.ai,.eps,.svg"
                />
                
                {file ? (
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center">
                      <FileImage className="w-8 h-8 text-brand-green" />
                    </div>
                    <div>
                      <p className="text-white font-bold">{file.name}</p>
                      <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="text-sm text-red-400 hover:text-red-300 font-bold flex items-center gap-1 mt-2"
                    >
                      <XCircle className="w-4 h-4" /> Remove File
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center space-y-4 cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-brand-green/10 flex items-center justify-center transition-colors">
                      <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-brand-green' : 'text-gray-400 group-hover:text-brand-green'} transition-colors`} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg mb-1">Drag & Drop your artwork here</p>
                      <p className="text-sm text-gray-400">or click to browse files (PNG, JPG, SVG, AI, PDF)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6">
              <ButtonParticles
                type="submit"
                disabled={isSubmitting}
                className="w-full text-lg shadow-[0_0_30px_rgba(110,255,134,0.3)] hover:shadow-[0_0_40px_rgba(110,255,134,0.5)]"
                label={isSubmitting ? "Sending Request..." : "Get a FREE Quote & Mockup"}
                icon={isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6 ml-1 opacity-70" />}
              />
            </div>
          </form>
          
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 z-50 bg-[#121212]/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl border border-brand-green/50"
              >
                <div className="w-24 h-24 rounded-full bg-brand-green/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-brand-green" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Request Sent Successfully!</h3>
                <p className="text-gray-300 text-lg max-w-md mx-auto mb-8">
                  Thank you! Our design team will review your artwork and get back to you with a free mockup and quote within 24 hours.
                </p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-colors border border-white/20"
                >
                  Submit Another Request
                </button>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-x-6 top-6 z-50 bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-xl flex items-center justify-between backdrop-blur-md shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <XCircle className="w-6 h-6 text-red-400" />
                  <span className="font-medium">Failed to send request. Please try again later.</span>
                </div>
                <button onClick={() => setSubmitStatus('idle')} className="text-red-400 hover:text-red-300 p-1">
                  <XCircle className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Value Props below form */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 transition-all duration-300 border-[#6eff86]/40 shadow-[0_0_15px_rgba(110,255,134,0.2)] hover:border-[#6eff86] hover:shadow-[0_0_30px_rgba(110,255,134,0.6)] border">
            <h4 className="text-white font-bold mb-2">Free Mockups</h4>
            <p className="text-sm text-gray-400">Unlimited revisions until perfect</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl p-6 transition-all duration-300 border-[#f967fb]/40 shadow-[0_0_15px_rgba(249,103,251,0.2)] hover:border-[#f967fb] hover:shadow-[0_0_30px_rgba(249,103,251,0.6)] border">
            <h4 className="text-white font-bold mb-2">2-Year Warranty</h4>
            <p className="text-sm text-gray-400">Premium quality guaranteed</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl p-6 transition-all duration-300 border-[#00e5ff]/40 shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:border-[#00e5ff] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] border">
            <h4 className="text-white font-bold mb-2">Free Shipping</h4>
            <p className="text-sm text-gray-400">On all orders over ₹15,000</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl p-6 transition-all duration-300 border-[#fe8a2e]/40 shadow-[0_0_15px_rgba(254,138,46,0.2)] hover:border-[#fe8a2e] hover:shadow-[0_0_30px_rgba(254,138,46,0.6)] border">
            <h4 className="text-white font-bold mb-2">Fast Turnaround</h4>
            <p className="text-sm text-gray-400">Rush delivery available</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
