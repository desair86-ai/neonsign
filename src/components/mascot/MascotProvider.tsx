"use client";

import React, { useState, useCallback } from "react";
import { MascotContext } from "../../contexts/MascotContext";
import { MascotState, MascotEvent, MascotTransitions } from "./MascotStateMachine";

export const MascotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentState, setCurrentState] = useState<MascotState>(MascotState.IDLE);
  const [speechText, setSpeechText] = useState<string | null>(null);

  const dispatch = useCallback((event: MascotEvent) => {
    const nextState = MascotTransitions[event];
    if (nextState) {
      setCurrentState(nextState);
    }
  }, []);

  return (
    <MascotContext.Provider
      value={{
        currentState,
        dispatch,
        setState: setCurrentState,
        speechText,
        setSpeechText,
      }}
    >
      {children}
    </MascotContext.Provider>
  );
};
