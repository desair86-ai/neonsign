import gsap from "gsap";

export const playIdle = (container: React.RefObject<HTMLDivElement>) => {
  const tl = gsap.timeline();
  
  tl.to("#Body", {
    y: -5,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  }, 0);

  tl.to("#left-hand", {
    rotation: 5,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  }, 0);

  tl.to("#Right-hand", {
    rotation: -5,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  }, 0);

  return tl;
};
