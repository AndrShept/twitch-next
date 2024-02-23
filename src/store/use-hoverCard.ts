import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IData {
  username: string;
  imageUrl: string;
  bio?: string | undefined;
  thumbnailUrl: string | undefined;
}

interface HoverCardStore {
  data: IData;
  setHoverCar: (data: IData) => void;
}

export const useHoverCard = create<HoverCardStore>()(
  persist(
    (set) => ({
      data: { bio: '', imageUrl: '', thumbnailUrl: '', username: '' },
      setHoverCar: (obj) => set({ data: obj }),
    }),

    { name: 'hoverCard-store' },
  ),
);
