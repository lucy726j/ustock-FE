import styled from "styled-components";
import Calculator from "../Component/Calculator/calculator";
import Chart from "../Component/Chart/chart";
import { Colors } from "../Styles/Colors";
import { useState } from "react";
import { ViewSelectProps } from "../constants/interface";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StockName = styled.div``;
const StockCode = styled.span``;
const StockPrice = styled.div``;
const StockChange = styled.span``;

const ViewSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  border-radius: 10px;
  gap: 5px;
  background-color: rgba(209, 209, 214, 0.3);
  margin: 10px 25px 10px auto;
`;
const ViewSelectBox = styled.button<ViewSelectProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  padding: 5px;
  border: none;
  border-radius: 10px;
  gap: 5px;
  background-color: ${({ isSelected }) => (isSelected ? Colors.main : "none")};
  color: ${({ isSelected }) => (isSelected ? "white" : Colors.main)};
  cursor: pointer;

  &:hover {
    background-color: ${Colors.main};
    color: white;
  }
`;

type ViewList = "일" | "주" | "월" | "1년";

const StockDetail: React.FC = () => {
  const [selectedView, setSelectedView] = useState<ViewList>("일");

  return (
    <Container>
      <div>
        <div>삼성 전자</div>
        <div>
          <span>005930</span>
          <span>첨단 기술</span>
        </div>
        <div>
          <div>80,000원</div>
          <span>3,000원</span>
          <span>2.4%</span>
        </div>
      </div>
      <ViewSelectContainer>
        {["일", "주", "월", "1년"].map((view) => (
          <ViewSelectBox
            key={view}
            isSelected={selectedView === view}
            onClick={() => setSelectedView(view as ViewList)}
          >
            {view}
          </ViewSelectBox>
        ))}
      </ViewSelectContainer>

      <Chart />
      <Calculator />
    </Container>
  );
};

export default StockDetail;
