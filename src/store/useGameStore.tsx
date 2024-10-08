import { create } from "zustand";
import axios from "axios";

interface GameState {
  // url에 연도 입력해서 넘어가지 못하도록 연도 확인
  checkYear: number;
  setCheckYear: (checkYear: number) => void;

  // 2023년에 게임을 하지 않았으면, 잘못된 경로입니다를 띄울 수 있도록 검사
  checkGameDone: boolean;
  setCheckGameDone: (checkGameDone: boolean) => void;

  currentRank: number;
  setCurrentRank: (currentRank: number) => void;
  fetchRank: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  checkYear: 2014,
  checkGameDone: false,
  currentRank: 1,

  setCheckYear(checkYear) {
    set({ checkYear });
  },
  setCheckGameDone(checkGameDone) {
    set({ checkGameDone });
  },
  setCurrentRank(currentRank) {
    set({ currentRank });
  },

  fetchRank: async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/v1/game/result`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userIndex = res.data.findIndex(
      (item: any) => item.playerType === "USER"
    );
    set({ currentRank: userIndex + 1 });
  },
}));
