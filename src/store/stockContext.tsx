import React, { ReactNode, createContext, useContext, useState } from "react";

export interface Stock {
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
