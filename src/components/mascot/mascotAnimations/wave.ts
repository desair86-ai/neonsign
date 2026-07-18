import gsap from "gsap";

export const playWave = (container: React.RefObject<HTMLDivElement>) => {
  const tl = gsap.timeline();
  
  // Swap face to Excited-face
  tl.set("#normal-face", { autoAlpha: 0 }, 0);
  tl.set("#Excited-face", { autoAlpha: 1 }, 0);

  tl.to("#Body", {
    y: -5,
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  }, 0);

  // Big wave with right hand
  tl.to("#Right-hand", {
    rotation: -45,
    duration: 0.5,
    ease: "sine.inOut"
  }, 0);
  
  tl.to("#Right-hand", {
    rotation: 20,
    duration: 0.3,
    yoyo: true,
    repeat: 5,
    ease: "sine.inOut"
  }, 0.5);

  return tl;
};
