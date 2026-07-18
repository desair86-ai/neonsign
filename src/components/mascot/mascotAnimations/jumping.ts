import gsap from "gsap";

export const playJumping = (container: React.RefObject<HTMLDivElement>) => {
  const tl = gsap.timeline();
  
  // Explicitly hide all other faces and the thinking hand to prevent flashes
  tl.set(["#normal-face", "#Thinking-face", "#sleepy-face", "#surprised-face", "#Blank-face"], { autoAlpha: 0 }, 0);
  tl.set("#thinking-left-hand", { autoAlpha: 0 }, 0);
  
  // Swap face to Excited-face and ensure normal left hand is visible
  tl.set("#Excited-face", { autoAlpha: 1 }, 0);
  tl.set("#left-hand", { autoAlpha: 1 }, 0);
  
  if (container.current) {
    tl.to(container.current, {
      y: -100, // Jump high
      duration: 0.3,
      yoyo: true,
      repeat: -1,
      ease: "power1.out"
    }, 0);
  }

  // Swing arms up
  tl.to("#left-hand", {
    rotation: 120, // Left arm up and inward
    duration: 0.3,
    yoyo: true,
    repeat: -1
  }, 0);

  tl.to("#Right-hand", {
    rotation: -120, // Right arm up and inward (negative rotation)
    duration: 0.3,
    yoyo: true,
    repeat: -1
  }, 0);

  tl.to("#left-leg", {
    rotation: -45, // Legs out
    duration: 0.3,
    yoyo: true,
    repeat: -1
  }, 0);

  tl.to("#Right-leg", {
    rotation: 45,
    duration: 0.3,
    yoyo: true,
    repeat: -1
  }, 0);

  return tl;
};
