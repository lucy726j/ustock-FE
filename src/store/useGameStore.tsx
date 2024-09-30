import { create } from "zustand";

interface GameState {
  // url에 연도 입력해서 넘어가지 못하도록 연도 확인
  checkYear: number;
  setCheckYear: (checkYear: number) => void;

  // 2023년에 게임을 하지 않았으면, 잘못된 경로입니다를 띄울 수 있도록 검사
  checkGameDone: boolean;
  setCheckGameDone: (checkGameDone: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  checkYear: 2014,
  checkGameDone: false,

  setCheckYear(checkYear) {
    set({ checkYear });
  },
  setCheckGameDone(checkGameDone) {
    set({ checkGameDone });
  },
}));
