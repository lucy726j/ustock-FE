import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import { ViewSelectProps } from "../../constants/interface";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

export const InfoContainer = styled.div`
  margin: 10px 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StockName = styled.div`
  font-size: 35px;
  font-weight: 900;
`;

export const CodeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 2px;
  margin-top: 5px;
`;

export const StockCode = styled.span`
  color: #6c757d;
  font-size: 15px;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 5px;
  margin-top: auto;
`;

export const StockPrice = styled.div`
  font-size: 25px;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
`;

export const ChangeContainer = styled.div`
  display: flex;
  white-space: nowrap;
  gap: 3px;
`;

export const StockChange = styled.span`
  font-size: 20px;
  color: ${Colors.main};
`;

export const ViewSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  border-radius: 10px;
  gap: 5px;
  background-color: rgba(209, 209, 214, 0.3);
  margin: 10px 25px 10px auto;
`;
export const ViewSelectBox = styled.button<ViewSelectProps>`
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
