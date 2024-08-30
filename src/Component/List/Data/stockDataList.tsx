import React from "react";
import styled from "styled-components";
import StockData from "../Data/stockData";
import { StockDataPropList } from "../../../constants/interface";

const ListWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  gap: 10px;
  max-height: 70vh;
  overflow-y: auto;
  scrollbar-width: none;
`;

const StockDataList: React.FC<StockDataPropList> = ({ data }) => {
  return (
    <div style={{ paddingBottom: "1rem" }}>
      <ListWrapper>
        {data.map((item) => (
          <StockData key={item.code} {...item} />
        ))}
      </ListWrapper>
    </div>
  );
};

export default StockDataList;
