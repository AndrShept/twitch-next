import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HoverCardStore {
  data: Record<string, string>;
  setHoverCar: (data: Record<string, string>) => void;
}

export const useHoverCard = create<HoverCardStore>()(
  persist(
    (set) => ({
      data: {},
      setHoverCar: (obj) => set({ data: obj }),
    }),

    { name: 'hoverCard-store' },
  ),
);
