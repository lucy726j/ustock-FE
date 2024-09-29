import { create } from "zustand";
import { PortfolioProps, StockProps } from "../constants/interface";

interface GameState {
  checkYear: number;
  setCheckYear: (checkYear: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  checkYear: 2014,

  setCheckYear(checkYear) {
    set({ checkYear });
  },
}));
