import { create } from "zustand";

type StoreState = {
  playheadTime: number;
  updatePlayheadTime: (playheadTime: number) => void;
  duration: number;
  updateDuration: (duration: number) => void;
  verticalScroll: number;
  updateVerticalScroll: (scroll: number) => void;
  horizontalScroll: number;
  updateHorizontalScroll: (scroll: number) => void;
  playheadContainerWidth: number;
  updatePlayheadContainerWidth: (width: number) => void;
};

const useTimelineStore = create<StoreState>((set) => ({
  playheadTime: 0,
  updatePlayheadTime: (time: number) => set({ playheadTime: time }),
  duration: 2000,
  updateDuration: (duration: number) => {
    set((state) => {
      return { duration, playheadTime: Math.min(duration, state.playheadTime) };
    });
  },
  verticalScroll: 0,
  updateVerticalScroll: (scroll: number) => set({ verticalScroll: scroll }),
  horizontalScroll: 0,
  updateHorizontalScroll: (scroll: number) => set({ horizontalScroll: scroll }),
  playheadContainerWidth: 0,
  updatePlayheadContainerWidth: (width: number) => set({ playheadContainerWidth: width }),
}));

export default useTimelineStore;
