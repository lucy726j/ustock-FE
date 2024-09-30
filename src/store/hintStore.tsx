import { create } from "zustand";

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
}

export const useHintStore = create<HintState>((set) => ({
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
}));

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
