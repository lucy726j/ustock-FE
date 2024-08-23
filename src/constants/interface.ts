export type ButtonStyleProps = {
  state: "normal";
  size: "small" | "medium" | "large" | "plusBtn" | "gradientBtn";
  colorType: "main" | "gradient" | "cancel";
};

export interface ButtonProps extends ButtonStyleProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export type InputStyleProps = {
  size: "small" | "medium" | "large";
  colorType: "fillType" | "strokeType";
  disabled?: boolean;
};

export interface inputProps extends InputStyleProps {
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  icon?: React.ReactNode;
  isValid: boolean;
  errorMessage: string;
}

export interface ModalProps {
  title?: string;
  isOpen: boolean;
  onRequestClose?: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  showConfirmButton?: string;
  showCancelButton?: boolean;
  showOneConfirmBtn?: boolean;
  children?: React.ReactNode;
  text?: string;
  icon?: string;
}

export interface ListProps {
  portfolioId: number;
  logo: string;
  name: string;
  code: string;
  price: number;
  changeRate: number;
}

export interface PlusProps {
  portfolioId: number;
  name: string;
  logo: string;
  code: string;
  quantity: number;
  average: number;
}

export interface NavBoxProps {
  id: string;
  onClick: (id: string) => void;
  children: React.ReactNode;
}

export interface SearchBarProps {
  onSelect: (selected: number) => void;
}

export interface NewsProps {
  id: number;
  title: string;
  publisher: string;
  date: string;
  img: string;
  url: string;
}

export interface ValueProps {
  isNegative: boolean;
}

export interface ViewSelectProps {
  isSelected: boolean;
}

// export interface StockListProps {
//   data: never[];
// }

export interface StockDataProps {
  code: string;
  name: string;
  logo: string;
  price: number;
  change: number;
  changeRate: number;
}

export interface StockDataPropList {
  data: Array<StockDataProps>;
}

export interface MarketDataProps {
  kospi: {
    price: number;
    change: number;
    changeRate: number;
  };
  kosdaq: {
    price: number;
    change: number;
    changeRate: number;
  };
}

export interface DropdownProps {
  dropList: any[];
  onSelect: (category: string | number) => void;
}

export interface StockProps {
  portfolioId: number;
  code: string;
  name: string;
  quantity: number;
  average: number;
  ror: number;
  logo?: string;
}

export interface PortfolioProps {
  name: string;
  budget: number;
  principal: number;
  ret: number;
  ror: number;
  stocks: StockProps[];
}

export interface StockItemProps {
  id: number;
  name: string;
  code: string;
  price: number;
  growth: number;
  logo: string;
}

export interface ChartProps {
  date: string;
  candle: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
  news: {
    title: string;
    url: string;
  }[];
}

export interface CandleData {
  data: { x: string; y: [number, number, number, number] }[];
}
