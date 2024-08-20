import React from "react";
import styled from "styled-components";
import { data } from "../../data/data";
import StockItem from "./StockItem";
import { StockItemProps, StockListProps } from "../../constants/interface";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

// const ListWrapper = styled.div`
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//     gap: 20px;
//     width: 100%;
// `;

const StockList: React.FC<StockListProps> = ({ data }: any) => {
  return (
    <div>
      <ListWrapper>
        {data.map((item: StockItemProps) => (
          <StockItem key={item.id} {...item} />
        ))}
      </ListWrapper>
    </div>
  );
};

export default StockList;
