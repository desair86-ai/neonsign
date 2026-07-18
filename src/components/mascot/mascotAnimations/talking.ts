import gsap from "gsap";

export const playTalking = (container: React.RefObject<HTMLDivElement>) => {
  const tl = gsap.timeline();
  
  // Could swap face, but normal face is fine, maybe we animate a talking mouth if it was separate
  
  tl.to("#Body", {
    y: -3,
    duration: 0.2,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
  }, 0);

  tl.to("#Right-hand", {
    rotation: -15,
    duration: 0.3,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  }, 0);

  return tl;
};
