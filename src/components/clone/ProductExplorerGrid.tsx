"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { GlowCardColorTheme } from "@/components/ui/spotlight-card";

type Category = {
  title: string;
  description: string;
  label: string;
  image: string;
  linkText: string;
  href: string;
  badgeClass: string;
  textClass: string;
  glowTheme: GlowCardColorTheme;
};

export function ProductExplorerGrid({ theme = "dark", categories }: { theme?: "light" | "dark", categories: Category[] }) {


  const [activeIndex, setActiveIndex] = React.useState(0);
  
  if (!categories || categories.length === 0) return null;

  const activeCategory = categories[activeIndex] || categories[0];

  const sectionClassName = theme === "light" ? "bg-white text-zinc-950" : "bg-zinc-950 text-white";

  const previousIndex = (activeIndex - 1 + categories.length) % categories.length;
  const nextIndex = (activeIndex + 1) % categories.length;

  const accentClasses = React.useMemo(() => ({
    green: {
      border: "border-[#6eff86]",
      shadow: "shadow-[0_0_48px_rgba(110,255,134,0.35)]",
      progress: "bg-[#6eff86]",
    },
    blue: {
      border: "border-[#00e5ff]",
      shadow: "shadow-[0_0_48px_rgba(0,229,255,0.32)]",
      progress: "bg-[#00e5ff]",
    },
    orange: {
      border: "border-[#fe8a2e]",
      shadow: "shadow-[0_0_48px_rgba(254,138,46,0.32)]",
      progress: "bg-[#fe8a2e]",
    },
    pink: {
      border: "border-[#f967fb]",
      shadow: "shadow-[0_0_48px_rgba(249,103,251,0.32)]",
      progress: "bg-[#f967fb]",
    },
    purple: {
      border: "border-[#ca6eff]",
      shadow: "shadow-[0_0_48px_rgba(202,110,255,0.32)]",
      progress: "bg-[#ca6eff]",
    },
  }), []);

  const activeAccent = accentClasses[activeCategory.glowTheme as keyof typeof accentClasses] ?? accentClasses.orange;

  const moveCarousel = React.useCallback((direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + categories.length) % categories.length);
  }, [categories.length]);

  React.useEffect(() => {
    const autoplay = window.setInterval(() => moveCarousel(1), 4200);
    return () => window.clearInterval(autoplay);
  }, [moveCarousel]);

  const getCardClassName = (idx: number) => {
    if (idx === activeIndex) {
      return `z-30 translate-x-0 translate-y-0 scale-100 rotate-y-0 opacity-100 ${activeAccent.border} ${activeAccent.shadow}`;
    }

    if (idx === previousIndex) {
      return "z-20 -translate-x-[68%] translate-y-6 scale-[0.82] -rotate-y-[28deg] opacity-65 border-white/15";
    }

    if (idx === nextIndex) {
      return "z-20 translate-x-[68%] translate-y-6 scale-[0.82] rotate-y-[28deg] opacity-65 border-white/15";
    }

    return "pointer-events-none z-0 translate-y-16 scale-75 opacity-0 border-white/10";
  };

  return (
    <section className={`relative w-full overflow-hidden py-10 md:py-12 ${sectionClassName}`}>
      <div
        key={`${activeCategory.title}-background`}
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-md scale-110 transition-all duration-700"
        style={{ backgroundImage: `url(${activeCategory.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-zinc-950" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4">
        
        {/* Main 2-Column Grid Layout */}
        <div className="relative grid gap-8 xl:gap-12 xl:min-h-[450px] xl:grid-cols-[0.48fr_0.52fr] xl:items-start">
          
          {/* Left Column (Title, Text, Progress) */}
          <div className="order-2 xl:order-1 flex flex-col pt-4 xl:pt-0">
            
            {/* Title Section */}
            <div className="mb-8 md:mb-12 max-w-4xl">
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-black capitalize tracking-tight mb-3">
                <span className={theme === "light" ? "text-zinc-950" : "text-white"}>Spaces</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
                  We Illuminate
                </span>
              </h2>
              <p className={theme === "light" ? "text-xl text-zinc-600 font-light" : "text-xl text-zinc-400 font-light"}>
                From businesses that want to stand out to homes that deserve a personal touch.
              </p>
            </div>

            {/* Changing Text */}
            <div className="relative min-h-[220px] overflow-hidden md:min-h-[260px]">
              {categories.map((cat, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={cat.title}
                    className={`absolute inset-0 flex flex-col justify-start transition-all duration-700 ease-out ${isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"}`}
                  >
                    <span className={`mb-4 inline-flex w-fit px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${cat.badgeClass}`}>
                      {cat.label}
                    </span>
                    <h3 className={`text-3xl md:text-4xl xl:text-5xl font-black uppercase tracking-tight mb-4 ${cat.textClass}`}>
                      {cat.title}
                    </h3>
                    <p className="text-base md:text-xl text-white/75 font-light max-w-xl mb-6">
                      {cat.description}
                    </p>
                    <Link
                      href={cat.href}
                      className={`inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-black/45 px-6 py-3 text-sm md:text-base font-bold uppercase tracking-wider backdrop-blur transition-all duration-300 hover:gap-5 ${cat.textClass}`}
                    >
                      {cat.linkText}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Progress bar and Arrows */}
            <div className="mt-5 flex items-center gap-4">
              <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${activeAccent.progress}`}
                  style={{ width: `${((activeIndex + 1) / categories.length) * 100}%` }}
                />
              </div>
              <div className="flex gap-4 shrink-0 pl-4">
                <button
                  type="button"
                  aria-label="Previous category"
                  onClick={() => moveCarousel(-1)}
                  className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border bg-black/40 border-[#752eff] text-[#752eff] shadow-[0_0_15px_rgba(117,46,255,0.4)] backdrop-blur transition-all duration-300 hover:shadow-[0_0_25px_rgba(117,46,255,0.6)] hover:bg-[#752eff]/10 hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  aria-label="Next category"
                  onClick={() => moveCarousel(1)}
                  className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border bg-black/40 border-[#6eff86] text-[#6eff86] shadow-[0_0_15px_rgba(110,255,134,0.4)] backdrop-blur transition-all duration-300 hover:shadow-[0_0_25px_rgba(110,255,134,0.6)] hover:bg-[#6eff86]/10 hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (3D Stage naturally positioned in grid, shifted UP) */}
          <div className="order-1 xl:order-2 relative w-full flex justify-center items-start pt-4 xl:pt-0 h-[350px] xl:h-[450px]">
            <div className="relative w-full max-w-[720px] h-full" style={{ perspective: "1200px" }}>
              {categories.map((cat, idx) => {
                const visible = idx === activeIndex || idx === previousIndex || idx === nextIndex;

                return (
                  <Link
                    key={cat.title}
                    href={cat.href}
                    aria-hidden={!visible}
                    tabIndex={visible ? 0 : -1}
                    className={`absolute left-1/2 top-0 xl:top-4 h-[245px] w-[190px] -translate-x-1/2 overflow-hidden rounded-lg border bg-zinc-900 transition-all duration-700 ease-out md:h-[315px] md:w-[240px] xl:h-[345px] xl:w-[260px] ${getCardClassName(idx)}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                      style={{ backgroundImage: `url(${cat.image})` }}
                    />
                    {/* Removed text overlay as it is redundant with the left panel */}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
