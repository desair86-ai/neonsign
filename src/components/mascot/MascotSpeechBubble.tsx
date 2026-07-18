"use client";

import React from "react";
import { useMascot } from "../../hooks/useMascot";

export const MascotSpeechBubble: React.FC = () => {
  const { speechText } = useMascot();

  if (!speechText) return null;

  return (
    <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white text-gray-800 p-3 rounded-xl shadow-lg border border-gray-200 w-48 text-center text-sm font-medium z-10">
      {speechText}
      {/* Speech bubble tail */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white" />
    </div>
  );
};
