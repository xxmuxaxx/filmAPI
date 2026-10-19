import { create } from "zustand";
import { getCookie } from "shared/lib/cookie";

type SessionPhase = "restoring" | "guest" | "authenticated";
interface SessionState {
  phase: SessionPhase;
  generation: number;
  begin: () => number;
  confirm: (generation: number) => void;
  end: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  phase: getCookie("token") ? "restoring" : "guest",
  generation: 0,
  begin: () => {
    const generation = get().generation + 1;
    set({ phase: "restoring", generation });
    return generation;
  },
  confirm: (generation) => {
    if (generation === get().generation) {
      set({ phase: "authenticated" });
    }
  },
  end: () =>
    set((state) => ({ phase: "guest", generation: state.generation + 1 })),
}));
