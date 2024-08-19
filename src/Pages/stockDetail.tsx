import styled from "styled-components";
import Calculator from "../Component/Calculator/calculator";
import Chart from "../Component/Chart/chart";
import { Colors } from "../Styles/Colors";
import { useState } from "react";
import { ViewSelectProps } from "../constants/interface";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const InfoContainer = styled.div`
  margin: 10px 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StockName = styled.div`
  font-size: 35px;
  font-weight: 900;
`;

const CodeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 2px;
  margin-top: 5px;
`;

const StockCode = styled.span`
  color: #6c757d;
  font-size: 15px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 5px;
  margin-top: auto;
`;

const StockPrice = styled.div`
  font-size: 25px;
`;

const ChangeContainer = styled.div`
  display: flex;
`;
const StockChange = styled.span`
  font-size: 20px;
  color: ${Colors.main};
`;

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
      <InfoContainer>
        <div>
          <StockName>삼성 전자</StockName>
          <CodeContainer>
            <StockCode>005930</StockCode>
            <StockCode>첨단 기술</StockCode>
          </CodeContainer>
        </div>
        <PriceContainer>
          <StockPrice>80,000원</StockPrice>
          <ChangeContainer>
            <StockChange>3,000원</StockChange>
            <StockChange>2.4%</StockChange>
          </ChangeContainer>
        </PriceContainer>
      </InfoContainer>
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Chart />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Calculator />
      </div>
    </Container>
  );
};

export default StockDetail;
