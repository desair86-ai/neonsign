"use client";

import React, { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useMascot } from "../../hooks/useMascot";
import { MascotState } from "./MascotStateMachine";
import { MascotSpeechBubble } from "./MascotSpeechBubble";
import { playIdle } from "./mascotAnimations/idle";
import { playWalk } from "./mascotAnimations/walk";
import { playWave } from "./mascotAnimations/wave";
import { playTalking } from "./mascotAnimations/talking";
import { playThinking } from "./mascotAnimations/thinking";
import { playJumping } from "./mascotAnimations/jumping";
import { playSleeping } from "./mascotAnimations/sleeping";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

export const Mascot: React.FC = () => {
  const { currentState, setState } = useMascot();
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Hide on admin panel
  if (pathname?.startsWith("/admin")) return null;
  
  // Fetch the massive SVG on mount
  useEffect(() => {
    fetch("/animate/mascot.svg")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return res.text();
      })
      .then(text => {
        if (!text.includes("<svg")) throw new Error("Invalid SVG content");
        // Strip out the hardcoded 139.7mm width and 215.9mm height so it fits the container
        const responsiveSvg = text
          .replace(/width="[^"]+"/, 'width="100%"')
          .replace(/height="[^"]+"/, 'height="100%"');
        setSvgContent(responsiveSvg);
      })
      .catch(err => {
        console.error("Failed to load mascot SVG:", err);
        setFetchError(err.message || "Failed to load");
      });
  }, []);

  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMascotClick = () => {
    // Wait a tiny bit to see if it's a double-click before jumping
    if (clickTimeout.current) return;
    
    clickTimeout.current = setTimeout(() => {
      setState(MascotState.JUMPING);
      setTimeout(() => {
        setState(MascotState.IDLE);
      }, 1500);
      clickTimeout.current = null;
    }, 250);
  };

  const handleMascotDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Cancel the single click jump if this was a double click
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
    setState(currentState === MascotState.WALKING ? MascotState.IDLE : MascotState.WALKING);
  };

  const container = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const currentTimeline = useRef<gsap.core.Timeline | null>(null);

  const cleanupAnimations = () => {
    if (currentTimeline.current) {
      currentTimeline.current.kill();
      currentTimeline.current = null;
    }
    const allLayers = [
      "#thinking-left-hand", "#surprised-face", "#Thinking-face", "#Excited-face", 
      "#sleepy-face", "#normal-face", "#Body", "#Right-leg", "#left-leg", 
      "#Right-hand", "#left-hand", "#Flame", "#Blank-face"
    ];
    if (container.current) {
      gsap.set(container.current, { clearProps: "all" });
    }
    gsap.set(allLayers, { clearProps: "all" });
  };

  useGSAP(() => {
    if (!svgContent) return; 
    
    cleanupAnimations();

    // 1. Initial State Setup
    const allFaces = ["#surprised-face", "#Thinking-face", "#Excited-face", "#sleepy-face", "#Blank-face"];
    gsap.set(allFaces, { autoAlpha: 0 });
    gsap.set("#thinking-left-hand", { autoAlpha: 0 });
    gsap.set("#Flame", { autoAlpha: 0 }); // Hidden by default
    gsap.set("#normal-face", { autoAlpha: 1 });
    gsap.set("#left-hand", { autoAlpha: 1 });
    
    // Set standard anchor points for limbs (transformOrigins)
    gsap.set("#left-leg", { transformOrigin: "top center" });
    gsap.set("#Right-leg", { transformOrigin: "top center" });
    gsap.set("#left-hand", { transformOrigin: "top right" });
    gsap.set("#Right-hand", { transformOrigin: "top left" });
    gsap.set("#thinking-left-hand", { transformOrigin: "top right" });
    gsap.set("#Body", { transformOrigin: "bottom center" });

    // 2. Play Current State Animation
    switch (currentState) {
      case MascotState.IDLE:
        currentTimeline.current = playIdle(container);
        break;
      case MascotState.WALKING:
        currentTimeline.current = playWalk(container, () => {
          setState(MascotState.IDLE);
        });
        break;
      case MascotState.WAVE:
      case MascotState.GREETING:
        currentTimeline.current = playWave(container);
        break;
      case MascotState.TALKING:
        currentTimeline.current = playTalking(container);
        break;
      case MascotState.THINKING:
        currentTimeline.current = playThinking(container);
        break;
      case MascotState.JUMPING:
      case MascotState.CELEBRATING:
        currentTimeline.current = playJumping(container); 
        break;
      case MascotState.SLEEPING:
        currentTimeline.current = playSleeping(container);
        break;
      default:
        currentTimeline.current = playIdle(container);
        break;
    }

    return () => cleanupAnimations();
  }, { dependencies: [currentState, svgContent], scope: container });

  // Random walking behavior
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    if (currentState === MascotState.IDLE) {
      const randomTime = Math.random() * 15000 + 10000;
      idleTimer = setTimeout(() => {
        setState(MascotState.WALKING);
      }, randomTime);
    }
    return () => clearTimeout(idleTimer);
  }, [currentState, setState]);

  return (
    <div 
      className="fixed bottom-10 left-10 z-50 pointer-events-auto cursor-pointer hover:scale-105 transition-transform" 
      ref={container}
      onClick={handleMascotClick}
      onDoubleClick={handleMascotDoubleClick}
    >
      <style>{`
        /* Hide alternative layers by default so clearProps doesn't cause them to flash */
        #Thinking-face, #thinking-left-hand, #surprised-face, #Excited-face, #sleepy-face, #Blank-face, #Flame {
          visibility: hidden;
          opacity: 0;
        }
      `}</style>
      <div className="relative w-64 h-64 flex items-center justify-center">
        <MascotSpeechBubble />
        
        {svgContent ? (
          <div 
            className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        ) : fetchError ? (
          <div className="w-24 p-2 bg-red-900/80 text-white text-[10px] text-center rounded-lg border border-red-500">
            Mascot Error: {fetchError}
          </div>
        ) : (
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
};
