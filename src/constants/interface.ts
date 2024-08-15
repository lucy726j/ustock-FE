export interface StockItemProps {
  id: number;
  name: string;
  logo: string;
  code: string;
  price: number;
  growth: number;
}

export interface NavBoxProps {
  id: string;
  onClick: (id: string) => void;
  children: React.ReactNode;
}
