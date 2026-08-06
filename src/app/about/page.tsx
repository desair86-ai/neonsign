"use client";
import React, { useRef } from "react";
import { Header } from "@/components/clone/Header";
import { Footer } from "@/components/clone/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { SpliteInteractive } from "@/components/clone/Splite";

const LayerItem = ({ title, children, index, total, bgImage }: { title: string, children: React.ReactNode, index: number, total: number, bgImage?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      style={{ zIndex: index * 10 }}
      className="sticky top-[20vh] min-h-[50vh] flex flex-col justify-center items-center p-8 md:p-16 bg-black/90 backdrop-blur-md rounded-[2rem] border-2 border-[#6eff86]/40 shadow-[0_0_15px_rgba(110,255,134,0.2)] group-hover:border-[#6eff86] group-hover:shadow-[0_0_30px_rgba(110,255,134,0.6)] transition-all duration-500 mb-[10vh] overflow-hidden group cursor-pointer"
    >
      {/* Dark Atmospheric Background Image (Idea #1) */}
      {bgImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
        </>
      )}

      {/* Neon Flicker Animation on Title (Idea #5) */}
      <motion.h3 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0.1, 1, 0.2, 1, 0.5, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "linear", delay: 0.2 }}
        className="relative z-10 text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-purple mb-6 drop-shadow-[0_0_15px_rgba(110,255,134,0.3)]"
      >
        {title}
      </motion.h3>
      
      <div className="relative z-10 text-xl md:text-3xl text-center text-white max-w-3xl font-light">
        {children}
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  const containerRef = useRef(null);

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden font-poppins selection:bg-brand-green selection:text-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center z-10 relative"
        >
          <h1 className="text-5xl md:text-8xl font-black mb-6 uppercase tracking-tighter">
            <span className="text-white">The</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
              Neon Stack
            </span>
          </h1>
          <p className="text-xl md:text-3xl font-light text-white/80 max-w-2xl mx-auto tracking-wide">
            Face of Modern Ambience
          </p>
          <div className="mt-10 h-[1px] w-40 bg-gradient-to-r from-transparent via-brand-green to-transparent mx-auto" />
        </motion.div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-green/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] mix-blend-screen" />
      </section>

      {/* Brand Manifesto */}
      <section className="py-24 px-4 bg-zinc-950 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-12">
              <span className="text-white/50">We don't make neon signs.</span>
              <br />
              <span className="text-brand-green mt-4 block">We create statements.</span>
            </h2>
            <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed font-light">
              At The Neon Stack, ambience isn't decoration—it's identity. We believe every great space deserves a visual signature that captures attention, sparks conversation and stays in people's memories long after they leave.
            </p>
            <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed font-light">
              Our mission is simple: transform ordinary spaces into unforgettable experiences through thoughtful design, premium craftsmanship and uncompromising quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* A Letter From The Founder & Why We Exist (Split layout) */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-10 rounded-[2rem] bg-zinc-900/50 backdrop-blur-xl relative group overflow-hidden transition-all duration-500 border border-[#ca6eff]/40 shadow-[0_0_15px_rgba(202,110,255,0.2)] hover:border-[#ca6eff] hover:shadow-[0_0_30px_rgba(202,110,255,0.6)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-3xl font-bold mb-8 text-brand-lavender relative z-10">A Letter From The Founder</h3>
            <div className="space-y-6 text-zinc-300 font-light text-lg">
              <p>I've always believed that lighting has the power to change the way people experience a space.</p>
              <p>Every time I travelled through Southeast Asia and during my month-long journey across Vietnam, I found myself admiring the vibrant neon-lit streets. Every café had a personality. Every restaurant had an identity. Every lane had a story waiting to be discovered through light.</p>
              <p>When I returned to Mumbai, one thought stayed with me—why shouldn't our spaces tell stories like these?</p>
              <p>That single thought became The Neon Stack.</p>
              <div className="pt-6 border-t border-white/10 mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Founder Photo PlaceHolder with Neon Card Border Effect */}
                <div className="group relative w-32 h-32 shrink-0 rounded-[2rem] overflow-hidden bg-zinc-900 border-2 border-[#6eff86]/40 shadow-[0_0_15px_rgba(110,255,134,0.2)] transition-all duration-300 hover:border-[#6eff86] hover:shadow-[0_0_30px_rgba(110,255,134,0.6)] hover:scale-105 cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/placeholder-founder.jpg" alt="Founder Photo" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity hidden" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 group-hover:bg-black/40 transition-colors">
                    <span className="text-xs text-center font-bold text-[#6eff86] uppercase tracking-wider p-2">Add Photo<br/>Here</span>
                  </div>
                </div>
                
                <div className="text-center sm:text-left mt-2 sm:mt-0">
                  <p className="italic text-zinc-300">
                    "We're not here to manufacture products. We're here to create experiences people remember."
                  </p>
                  <p className="mt-4">
                    <strong className="not-italic text-brand-green text-lg block">— Makarand Shree Sathe</strong>
                    <span className="text-sm text-zinc-500 uppercase tracking-widest font-bold mt-1 block">Founder, The Neon Stack</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-16"
          >
            <div>
              <h3 className="text-3xl font-bold mb-8 text-brand-lavender">Why We Exist</h3>
              <ul className="space-y-4 text-xl font-light">
                <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-brand-green" /> Most people see neon signs.</li>
                <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-brand-green" /> We see atmosphere.</li>
                <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-brand-green" /> We see conversations.</li>
                <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-brand-green" /> We see memories.</li>
                <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-brand-green" /> We see brands becoming unforgettable.</li>
              </ul>
              <p className="mt-8 text-zinc-400">Whether it's a neighbourhood café, a luxury residence, a retail store or a corporate office, our purpose is to create lighting that gives every space its own unique personality.</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-8 text-brand-lavender">What Drives Us</h3>
              <p className="text-xl font-light text-zinc-300 mb-6">Success, for us, isn't measured only by growth.<br/><strong className="text-white">It is measured by trust.</strong></p>
              <p className="text-zinc-400">We aspire to become the company customers never have to think twice about. A brand known for premium quality, fastest delivery, ethical business practices and exceptional customer service.</p>
              <div className="mt-8 p-6 bg-brand-purple/10 border border-brand-purple/20 rounded-xl">
                <p className="text-lg italic">When someone asks, 'Who makes the best neon signs?', we want the answer to be simple—<strong className="text-brand-purple not-italic ml-2">The Neon Stack.</strong></p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Crafted Layer by Layer (Sticky Scroll Effect) */}
      <section ref={containerRef} className="py-32 px-4 relative bg-zinc-950">
        <div className="max-w-4xl mx-auto mb-32 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">The Meaning Behind <span className="text-brand-green">'The Neon Stack'</span></h2>
          <p className="text-2xl text-zinc-400 font-light">The word 'Stack' is more than our name—it is our philosophy.<br/>Every masterpiece is built layer by layer.</p>
        </div>

        <div className="max-w-7xl mx-auto relative px-4">
          <SpliteInteractive />
        </div>

        <div className="max-w-4xl mx-auto text-center mt-32">
          <p className="text-2xl text-zinc-300 font-light leading-relaxed">
            Our signature layered acrylic construction reflects this philosophy, delivering greater depth, richer illumination and a premium finish that truly stands apart.
          </p>
        </div>
      </section>

      {/* Our Promise & Differences */}
      <section className="py-32 px-4 relative z-50 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-zinc-900/50 p-12 rounded-[2rem] transition-all duration-500 border border-[#6eff86]/40 shadow-[0_0_15px_rgba(110,255,134,0.2)] hover:border-[#6eff86] hover:shadow-[0_0_30px_rgba(110,255,134,0.6)]"
            >
              <h3 className="text-4xl font-bold mb-10 text-brand-green">Our Promise</h3>
              <p className="text-xl mb-8 text-white/70">There are values we'll never compromise.</p>
              <div className="grid grid-cols-2 gap-6">
                {['Trust', 'Quality', 'Innovation', 'Ethics', 'Premium Service', 'Client Relationships'].map((val, i) => (
                  <div key={i} className="flex items-center gap-3 text-lg font-light">
                    <div className="w-2 h-2 rounded-full bg-brand-green" />
                    {val}
                  </div>
                ))}
              </div>
              <p className="mt-10 pt-6 border-t border-white/10 text-zinc-400 italic">Every project is treated with the same care, attention and passion as if it were our own.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-zinc-900/50 p-12 rounded-[2rem] transition-all duration-500 border border-[#ca6eff]/40 shadow-[0_0_15px_rgba(202,110,255,0.2)] hover:border-[#ca6eff] hover:shadow-[0_0_30px_rgba(202,110,255,0.6)]"
            >
              <h3 className="text-4xl font-bold mb-10 text-brand-purple">The Neon Stack Difference</h3>
              <ul className="space-y-4">
                {[
                  'Signature Layered Acrylic Craftsmanship',
                  'Bespoke, Design-Led Solutions',
                  'Premium Quality Materials',
                  'Fast Turnaround',
                  'Precision Manufacturing',
                  'Modern Design Language',
                  'Exceptional Customer Service',
                  'Reliable After-Sales Support'
                ].map((diff, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg font-light text-zinc-300">
                    <svg className="w-6 h-6 text-brand-purple flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {diff}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
