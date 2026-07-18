import gsap from "gsap";

export const playThinking = (container: React.RefObject<HTMLDivElement>) => {
  const tl = gsap.timeline();
  
  // Fade out normal face and left hand, fade in thinking face and thinking left hand
  tl.set("#normal-face", { autoAlpha: 0 }, 0);
  tl.set("#left-hand", { autoAlpha: 0 }, 0);
  
  tl.set("#Thinking-face", { autoAlpha: 1 }, 0);
  tl.set("#thinking-left-hand", { autoAlpha: 1 }, 0);

  // Small head bob
  tl.to("#Body", {
    y: -2,
    duration: 1,
    yoyo: true,
    repeat: -1
  }, 0);

  return tl;
};
