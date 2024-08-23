import React from "react";
import styled from "styled-components";
import MyStockItem from "./MyStockItem";
import { StockProps } from "../../constants/interface";
import "./MyStockItemStyle.css";
import { usePortfolioStore } from "../../store/usePortfolioStore";

// interface MyStockListProps {
//   stockData: StockProps[];
//   portfolioId: number;
// }

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;`
;

const MyStockList: React.FC<{ portfolioId: number }> = ({ portfolioId }) => {
    const stockData = usePortfolioStore((state) => state.stockData)
  return (
    <div>
      <ListWrapper>
        {stockData.map((item: StockProps) => (
          <MyStockItem key={item.code} {...item} portfolioId={portfolioId} />
        ))}
      </ListWrapper>
    </div>
  );
};

export default MyStockList;