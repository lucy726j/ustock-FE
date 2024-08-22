import React from "react";
import styled from "styled-components";
import StockData from "../Data/stockData";
import { StockDataPropList } from "../../../constants/interface";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
  max-height: 70vh; /* 원하는 최대 높이로 설정하세요 */
  overflow-y: auto; /* 스크롤바를 활성화 */
`;

const StockDataList: React.FC<StockDataPropList> = ({ data }) => {
  return (
    <div>
      <ListWrapper>
        {data.map((item) => (
          <StockData key={item.code} {...item} />
        ))}
      </ListWrapper>
    </div>
  );
};

export default StockDataList;
