import React, { ReactNode, createContext, useContext, useState } from "react";
import { create } from "zustand";

interface Stock {
  stockId: number;
  name: string;
  current: number;
  prev: number;
  change: number;
  changeRate: number;
}

export interface StockContextProps {
  stockData: Stock[] | null;
  setStockData: (data: Stock[]) => void;
}

// 쥬스탠드 사용
export const StocksStore = create<StockContextProps>((set) => ({
  stockData: [],
  setStockData: (data: Stock[]) => set({ stockData: data }),
}));

// useContext 사용
const StockContext = createContext<StockContextProps | undefined>(undefined);

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
};

interface StockProviderProps {
  children: ReactNode; // 자식 요소의 타입 정의
}

export const StockProvider: React.FC<StockProviderProps> = ({ children }) => {
  const [stockData, setStockData] = useState<Stock[] | null>(null);
  return (
    <StockContext.Provider value={{ stockData, setStockData }}>
      {children}
    </StockContext.Provider>
  );
};

// const StocksStore = create((set) => ({
//   stockList : {},
//   setStockList : ((state) => ({
//     stockList: ((state) => {
//       set((state) => ({
//         stockList: [...stockId, name, current]
//       }))
//     })
//   }))
// }))
