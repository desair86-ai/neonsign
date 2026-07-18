import gsap from "gsap";

export const playSleeping = (container: React.RefObject<HTMLDivElement>) => {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  
  // Swap face to sleepy-face
  tl.set("#normal-face", { autoAlpha: 0 }, 0);
  tl.set("#sleepy-face", { autoAlpha: 1 }, 0);
  
  // Optional: show Flame or Zzz if they are in the SVG
  // tl.set("#Flame", { autoAlpha: 1 }, 0);
  
  tl.to("#Body", {
    scaleY: 0.95,
    y: 5,
    duration: 2,
    ease: "sine.inOut"
  }, 0);

  return tl;
};
