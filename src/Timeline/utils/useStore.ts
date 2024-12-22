import { create } from "zustand";

type StoreState = {
  time: number;
  setTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
};

export const useStore = create<StoreState>((set) => ({
  time: 0,
  setTime: (time: number) => set({ time }),
  duration: 0,
  setDuration: (duration: number) => set({ duration }),
}));
