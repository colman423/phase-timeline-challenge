import { create } from "zustand";

type StoreState = {
  playheadTime: number;
  updatePlayheadTime: (playheadTime: number) => void;
  duration: number;
  updateDuration: (duration: number) => void;
};

const useTimelineStore = create<StoreState>((set) => ({
  playheadTime: 0,
  updatePlayheadTime: (time: number) => set({ playheadTime: time }),
  duration: 2000,
  updateDuration: (duration: number) => set({ duration }),
}));

export default useTimelineStore;