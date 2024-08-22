import React from "react";
import styled from "styled-components";
import StockItem from "./StockItem";
import { StockDataProps } from "../../constants/interface";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
  max-height: 70vh; /* 원하는 최대 높이로 설정하세요 */
  overflow-y: auto; /* 스크롤바를 활성화 */
`;

// const ListWrapper = styled.div`
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//     gap: 20px;
//     width: 100%;
// `;

const StockList: React.FC<StockDataProps> = ({ data }: any) => {
  return (
    <div>
      <ListWrapper>
        {data.map((item: any) => (
          <StockItem key={item.code} {...item} />
        ))}
      </ListWrapper>
    </div>
  );
};

export default StockList;
