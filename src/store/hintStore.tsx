import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PurchaseState {
  purchaseComplete: { [stockId: number]: { [level: string]: boolean } };
  setPurchaseComplete: (stockId: number, level: string) => void;
}

interface HintState {
  purchaseHints: Record<
    string,
    Record<string, { purchased: boolean; hintData: string | null }>
  >;
  setPurchaseHints: (stockId: number, level: string, hintData: string) => void;
  resetPurchaseHints: () => void; // 상태 초기화 함수 정의
}

export const useHintStore = create<HintState>()(
  persist(
    (set) => ({
      purchaseHints: {},
      setPurchaseHints: (stockId: number, level: string, hintData: string) =>
        set((state) => ({
          purchaseHints: {
            ...state.purchaseHints,
            [stockId]: {
              ...state.purchaseHints[stockId],
              [level]: { purchased: true, hintData },
            },
          },
        })),
      // 상태 초기화 함수 추가
      resetPurchaseHints: () => set({ purchaseHints: {} }),
    }),
    {
      name: "hint-storage",
      getStorage: () => localStorage,
    }
  )
);

export const usePurchaseStore = create<PurchaseState>((set) => ({
  purchaseComplete: {},
  setPurchaseComplete: (stockId: number, level: string) =>
    set((state) => ({
      purchaseComplete: {
        ...state.purchaseComplete,
        [stockId]: {
          ...(state.purchaseComplete[stockId] || {}),
          [level]: true,
        },
      },
    })),
}));
