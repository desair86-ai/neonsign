"use client";

import { useContext } from "react";
import { MascotContext } from "../contexts/MascotContext";
import { MascotEvent, MascotState } from "../components/mascot/MascotStateMachine";

export const useMascot = () => {
  const context = useContext(MascotContext);
  if (!context) {
    throw new Error("useMascot must be used within a MascotProvider");
  }

  const { currentState, dispatch, setState, speechText, setSpeechText } = context;

  // Helper to trigger events
  const triggerEvent = (event: MascotEvent) => {
    dispatch(event);
  };

  const speak = (text: string, stateToSet: MascotState = MascotState.TALKING) => {
    setSpeechText(text);
    setState(stateToSet);
  };

  const stopSpeaking = () => {
    setSpeechText(null);
    setState(MascotState.IDLE);
  };

  return {
    currentState,
    triggerEvent,
    setState,
    speak,
    stopSpeaking,
    speechText,
  };
};
