import {create} from "zustand";
import {persist} from "zustand/middleware";

interface CompareState {
  compareIds: string[];
  toggleCompare: (coinId: string) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareIds: [],
      toggleCompare: (coinId) => {
        const {compareIds} = get();
        const isInCompare = compareIds.includes(coinId);

        if (isInCompare) {
          set({compareIds: compareIds.filter((id) => id !== coinId)});
        } else {
          set({compareIds: [...compareIds, coinId]});
        }
      },
      clearCompare: () => set({compareIds: []}),
    }),
    {
      name: "crypto-compare-storage",
    },
  ),
);
