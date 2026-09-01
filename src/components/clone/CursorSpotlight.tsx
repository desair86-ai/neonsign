"use client";

import { useEffect, useState } from "react";

export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(103, 0, 226, 0.15), rgba(255, 0, 222, 0.05), transparent 80%)`,
      }}
    />
  );
}
