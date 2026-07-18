import gsap from "gsap";

export const playWalk = (container: React.RefObject<HTMLDivElement>, onComplete?: () => void) => {
  const master = gsap.timeline();
  
  // Movement timeline plays once (8s total)
  const moveTl = gsap.timeline({ 
    onComplete: () => {
      if (onComplete) onComplete();
    }
  });
  
  if (container.current) {
    const walkDistanceX = (window.innerWidth - 300); // Positive to walk right
    // Diagonal distance towards the top of the screen (header)
    const walkDistanceY = -(window.innerHeight - 300); // Negative to walk up
    
    // 1. Walk diagonally towards the top right of the screen
    moveTl.set(container.current, { scaleX: -1 }) // Face right initially
    .to(container.current, {
      duration: 8, // Slower speed
      ease: "sine.inOut",
      x: walkDistanceX,
      y: walkDistanceY
    }, 0)
    // 2. Walk diagonally back to the start without flipping sides (moonwalk back)
    .to(container.current, {
      duration: 8, // Slower speed
      ease: "sine.inOut",
      x: 0,
      y: 0
    }, 8)
    .set(container.current, { scaleX: 1 }, 16);
  }

  // Limbs timeline repeats infinitely independently
  const limbsTl = gsap.timeline({ repeat: -1 });
  
  limbsTl.to("#Body", { y: -15, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0);
  limbsTl.to("#left-leg", { rotation: 20, duration: 0.25, yoyo: true, repeat: 1 }, 0);
  limbsTl.to("#Right-leg", { rotation: -20, duration: 0.25, yoyo: true, repeat: 1 }, 0.25);
  limbsTl.to("#left-hand", { rotation: 30, duration: 0.25, yoyo: true, repeat: 1 }, 0);
  limbsTl.to("#Right-hand", { rotation: -30, duration: 0.25, yoyo: true, repeat: 1 }, 0.25);

  master.add(moveTl, 0);
  master.add(limbsTl, 0);

  return master;
};
