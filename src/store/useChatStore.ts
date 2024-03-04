import { Chat } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IChatStore {
  data: Chat[];
  setChatData: (obj: Chat) => void;
}

export const useChatStore = create<IChatStore>()(
  persist(
    (set) => ({
      data: [],
      setChatData: (obj) => set((state) => ({ data: [...state.data, obj] })),
    }),
    { name: 'chat-store' },
  ),
);
