"use client";

import { createContext } from "react";
import { MascotState, MascotEvent } from "../components/mascot/MascotStateMachine";

interface MascotContextProps {
  currentState: MascotState;
  dispatch: (event: MascotEvent) => void;
  setState: (state: MascotState) => void;
  speechText: string | null;
  setSpeechText: (text: string | null) => void;
}

export const MascotContext = createContext<MascotContextProps | undefined>(undefined);
