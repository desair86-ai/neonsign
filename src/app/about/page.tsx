"use client";
import React, { useRef } from "react";
import { Header } from "@/components/clone/Header";
import { Footer } from "@/components/clone/Footer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Eye, Sparkles, MessageCircle, Heart, Star } from "lucide-react";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

const PROMISE_VALUES = ['Trust', 'Quality', 'Innovation', 'Ethics', 'Premium Service', 'Client Relationships'];

const DIFFERENCE_SLIDES = [
  {
    src: "/generated/neon_tube_close_1782443029110.png",
    alt: "Signature Layered Acrylic Craftsmanship",
    title: "Layered Craftsmanship",
    subtitle: "Signature acrylic techniques for deep, vibrant colors.",
  },
  {
    src: "/generated/glowing_logo_split_1782443098549.png",
    alt: "Bespoke, Design-Led Solutions",
    title: "Bespoke Solutions",
    subtitle: "Custom designs tailored to your unique brand identity.",
  },
  {
    src: "/generated/neon_sign_kit_1782443038661.png",
    alt: "Premium Quality Materials",
    title: "Premium Materials",
    subtitle: "Using only the highest grade LEDs and acrylics.",
  },
  {
    src: "/generated/drilling_wall_hole_1782443059654.png",
    alt: "Fast Turnaround",
    title: "Fast Turnaround",
    subtitle: "Rapid production without compromising on quality.",
  },
  {
    src: "/generated/mounting_screw_install_1782443069589.png",
    alt: "Precision Manufacturing",
    title: "Precision Built",
    subtitle: "State-of-the-art CNC routing for flawless edges.",
  },
  {
    src: "/generated/media__1782442791885.png",
    alt: "Modern Design Language",
    title: "Modern Aesthetics",
    subtitle: "Clean, contemporary designs that elevate any space.",
  },
  {
    src: "/generated/measuring_tape_wall_1782443048985.png",
    alt: "Exceptional Customer Service",
    title: "Exceptional Service",
    subtitle: "Dedicated support from design through to installation.",
  },
  {
    src: "/generated/plugging_power_1782443080893.png",
    alt: "Reliable After-Sales Support",
    title: "Reliable Support",
    subtitle: "Comprehensive warranties and after-sales care.",
  }
];

const PromiseFlippingText = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PROMISE_VALUES.length);
    }, 1500); // slightly slower (1500ms) since it's continuous
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="group relative flex flex-col justify-center min-h-[60px] md:min-h-[80px]">
      <div className="overflow-hidden relative h-[60px] md:h-[80px] w-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-0 left-0 text-3xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-purple whitespace-nowrap"
          >
            {PROMISE_VALUES[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

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

      {/* A Letter From The Founder */}
      <section className="py-24 px-4 relative overflow-hidden">
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

      {/* Why We Exist - Now below Founder Letter, using animated cards */}
      <section className="py-24 px-4 relative z-50 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
              <span className="text-white">Why</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
                We Exist
              </span>
            </h3>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
              Whether it's a neighbourhood café, a luxury residence, a retail store or a corporate office, our purpose is to create lighting that gives every space its own unique personality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { 
                text: "Most people see neon signs.", 
                icon: <Eye className="w-8 h-8 text-white mb-4" />,
                borderClass: "border-white/30 hover:border-white",
                shadowClass: "hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              },
              { 
                text: "We see atmosphere.", 
                icon: <Sparkles className="w-8 h-8 text-[#17dd7e] mb-4" />,
                borderClass: "border-[#17dd7e]/30 hover:border-[#17dd7e]",
                shadowClass: "hover:shadow-[0_0_25px_rgba(23,221,126,0.4)]"
              },
              { 
                text: "We see conversations.", 
                icon: <MessageCircle className="w-8 h-8 text-amber-400 mb-4" />,
                borderClass: "border-amber-400/30 hover:border-amber-400",
                shadowClass: "hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]"
              },
              { 
                text: "We see memories.", 
                icon: <Heart className="w-8 h-8 text-rose-400 mb-4" />,
                borderClass: "border-rose-400/30 hover:border-rose-400",
                shadowClass: "hover:shadow-[0_0_25px_rgba(251,113,133,0.4)]"
              },
              { 
                text: "We see brands becoming unforgettable.", 
                icon: <Star className="w-8 h-8 text-cyan-400 mb-4" />,
                borderClass: "border-cyan-400/30 hover:border-cyan-400",
                shadowClass: "hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-zinc-900/50 p-8 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:bg-zinc-800/80 group cursor-pointer ${card.borderClass} ${card.shadowClass}`}
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <p className="text-lg font-medium text-zinc-200 group-hover:text-white transition-colors">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Our Promise Section */}
      <section className="py-24 px-4 relative z-50 bg-black">
        <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-zinc-900/50 p-12 md:p-16 rounded-[2rem] transition-all duration-500 border border-[#6eff86]/40 shadow-[0_0_15px_rgba(110,255,134,0.2)] hover:border-[#6eff86] hover:shadow-[0_0_30px_rgba(110,255,134,0.6)] flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col xl:flex-row xl:items-center gap-6 mb-12">
                  <h3 className="text-4xl font-bold text-white whitespace-nowrap">Our Promise</h3>
                  <div className="hidden xl:block w-px h-12 bg-white/20 mx-2"></div>
                  <div className="flex-1">
                    <PromiseFlippingText />
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <p className="text-xl text-white/70 font-light">There are values we'll never compromise.</p>
                  <p className="text-zinc-400 italic">Every project is treated with the same care, attention and passion as if it were our own.</p>
                </div>
              </div>
            </motion.div>
        </div>
      </section>

      {/* The Neon Stack Difference Section */}
      <section className="py-32 px-4 relative z-50 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
              <span className="text-white">The Neon Stack</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-lavender animate-neon-gradient">
                Difference
              </span>
            </h3>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
              We go beyond standard signs. Every piece is a testament to our commitment to quality, design, and innovation.
            </p>
          </div>
          
          <div className="w-full">
            <CoverflowCarousel 
              slides={DIFFERENCE_SLIDES} 
              showCaption 
              showNavigation 
              showPagination
              loop
              className="py-12"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
