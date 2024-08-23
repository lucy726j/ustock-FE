import create from 'zustand';
import { PortfolioProps, StockProps } from '../constants/interface';

interface PortfolioState {
  pfName: string;
  data: PortfolioProps | null;
  stockData: StockProps[];
  budget: number;
  principal: number;
  ret: number;
  ror: number;
  setPortfolio: (pfName: string, data: PortfolioProps, stockData: StockProps[]) => void;
  updateStock: (updatedStock: StockProps) => void;
  deleteStock: (stockCode: string) => void;
  addStock: (newStock: StockProps) => void;
    setFinancialData: (budget: number, principal: number, ret: number, ror: number) => void;
    updateBudget: (amount: number) => void;
  updatePrincipal: (amount: number) => void;
  updateProfitLoss: (amount: number) => void;
  calculateROR: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  pfName: '',
  data: null,
  stockData: [],
  budget: 0,
  principal: 0,
  ret: 0,
  ror: 0,
  
  setPortfolio: (pfName, data, stockData) => set({ pfName, data, stockData }),
  
  updateStock: (updatedStock) =>
    set((state) => ({
      stockData: state.stockData.map((stock) =>
        stock.code === updatedStock.code ? updatedStock : stock
      ),
    })),
  
  deleteStock: (stockCode) =>
    set((state) => ({
      stockData: state.stockData.filter((stock) => stock.code !== stockCode),
    })),
  
  addStock: (newStock) =>
    set((state) => ({
      stockData: [...state.stockData, newStock],
    })),
  
  setFinancialData: (budget, principal, ret, ror) =>
    set({ budget, principal, ret, ror }),

  // 추가: 개별 financial data 업데이트 함수들
  updateBudget: (amount: number) =>
    set((state) => ({ budget: state.budget - amount })),
  
  updatePrincipal: (amount: number) =>
    set((state) => ({ principal: state.principal - amount })),
  
  updateProfitLoss: (amount: number) =>
    set((state) => ({ ret: state.ret - amount })),
  
  updateROR: (newROR: number) =>
        set((state) => ({ ror: newROR })),
  
  calculateROR: () =>
    set((state) => {
        const totalInvestment = state.stockData.reduce((acc, stock) => acc + stock.quantity * stock.average, 0);
        const totalCurrentValue = state.stockData.reduce((acc, stock) => acc + stock.quantity * stock.average * (1 + stock.ror / 100), 0);
        const newROR = totalInvestment > 0 ? ((totalCurrentValue - totalInvestment) / totalInvestment) * 100 : 0;

        return { ror: newROR };
    }),

}));
