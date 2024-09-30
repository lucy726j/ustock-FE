import create from "zustand";
import { holding } from "../constants/interface";

interface SwipeStore {
    holdingList: holding[];
    setHoldingList: (list: holding[]) => void;
}

export const useSwipeStore = create<SwipeStore>((set) => ({
    holdingList: [],
    setHoldingList: (list: holding[]) => set({ holdingList: list }),
}));
