"use client";

import React from 'react';
import { HelpCircle, CheckCircle2, Shapes, Languages, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const QA_DATA = [
  {
    question: "How will the sign look in my home or business?",
    solution: "See it yourself! We provide free mockups showing exactly how your custom sign will look in your actual space.",
    linkText: "Start Customizing →",
    linkUrl: "/products/customize-neon-signs",
    icon: Sparkles,
  },
  {
    question: "I want to create a sign in Marathi language.",
    solution: "We provide Marathi signs as well! Our custom builder supports multiple regional languages and custom fonts.",
    linkText: "Try our Marathi Fonts →",
    linkUrl: "/products/customize-neon-signs",
    icon: Languages,
  },
  {
    question: "I want to add shapes or logos to my text.",
    solution: "We've got you covered. You can easily add shapes and custom logos to both our Custom Neon and Mojo Neon signs.",
    linkText: "Design your Mojo Mix →",
    linkUrl: "/products/customize-mojo-mix",
    icon: Shapes,
  },
  {
    question: "What if my sign breaks during shipping?",
    solution: "We fully insure every package. If your sign arrives damaged, we will replace it immediately at zero cost to you.",
    icon: CheckCircle2,
  },
  {
    question: "Are these signs safe to touch and leave on?",
    solution: "Absolutely. Our signs use advanced LED technology that stays cool to the touch and uses minimal electricity.",
    icon: HelpCircle,
  }
];

export function ProblemSolutionCards() {
  return (
    <section className="py-20 px-4 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-purple">Neon Stack</span> Is Different
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-medium">
            We don't just sell signs—we solve problems. Here is how we ensure you get exactly what you dream of.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {QA_DATA.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="group relative w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] h-[320px]"
                style={{ perspective: "1000px" }}
              >
                {/* 3D Container */}
                <div 
                  className="w-full h-full relative transition-transform duration-700 shadow-sm hover:shadow-[0_0_20px_rgba(163,110,255,0.15)] rounded-2xl group-hover:[transform:rotateY(180deg)]"
                  style={{ transformStyle: "preserve-3d" }}
                >

                  {/* FRONT FACE (Question) */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-[#111] rounded-2xl p-8 border border-zinc-800 flex flex-col items-center justify-center text-center overflow-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Rotating SVG in top-right corner (Live not on hover) */}
                    <Image 
                      src="/The Neon Stack ICON-03.svg" 
                      alt="Neon Pattern" 
                      width={80} 
                      height={80} 
                      className="absolute -top-4 -right-4 opacity-20 animate-[spin_10s_linear_infinite] pointer-events-none"
                    />

                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-brand-purple" />
                    </div>
                    
                    <h3 className="text-xl font-black text-white leading-snug mb-6">
                      {item.question}
                    </h3>

                    <div className="mt-auto flex items-center gap-2 text-zinc-500 font-bold text-sm bg-zinc-900/50 px-4 py-2 rounded-full group/btn">
                      Hover to reveal <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                    </div>
                  </div>
                  
                  {/* BACK FACE (Answer) */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-[#0a0a0a] rounded-2xl p-8 flex flex-col justify-center text-left bg-clip-padding border border-transparent overflow-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    {/* Continuous Gradient border wrapper */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-green to-brand-purple opacity-100 -z-10 m-[-1px]" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="shrink-0 w-8 h-8 rounded-full bg-black/20 text-black font-bold flex items-center justify-center border border-black/30">A</span>
                        <h4 className="text-black font-bold text-lg">Our Solution</h4>
                      </div>

                      <p className="text-black font-medium leading-relaxed mb-6 text-lg">
                        {item.solution}
                      </p>
                      
                      {item.linkUrl && (
                        <div className="mt-auto">
                          <Link href={item.linkUrl} className="inline-block px-5 py-2.5 border-2 border-black text-black hover:bg-black hover:text-brand-green font-bold rounded-lg transition-all duration-300">
                            {item.linkText}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
