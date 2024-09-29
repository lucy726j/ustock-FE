import styled from "styled-components";
import { ValueProps } from "../constants/interface";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MarketContainer = styled.div`
  width: 100%;
  height: 80px;
  box-shadow: 0px 4px 7px -2px #ada9bb;
  border-radius: 10px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  margin: 5px 0px 25px;
  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
  }
`;

export const Kospi = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Kosdaq = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Info = styled.div<ValueProps>`
  color: ${(props) => (props.$isNegative ? "#615EFC" : "#FF5759")};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
`;

export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* margin-right: auto; */
`;

export const Title = styled.div`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 10px;
`;

export const StockWrapper = styled.div`
  width: 100%;
  height: 325px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-bottom: 1rem;
`;

export const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubTitle = styled.p`
  font-size: 12px;
  font-family: "SCDream3";
  margin-left: 0.7rem;
  margin-bottom: 0.5rem;
`;
