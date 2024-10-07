import styled from "styled-components";
import { Colors } from "../../Styles/Colors";

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
export const BtnStyle = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-top: 0.2rem;
  height: 2rem;
  background-color: ${Colors.main};
  border: 1px solid ${Colors.main};
  border-radius: 5px;
  color: white;
  font-size: 17px;
  font-family: "SCDream6";
  white-space: nowrap;
  cursor: pointer;
`;
export const ChartStyle = styled.div`
  overflow: hidden;
`;

export const BackButton = styled.button`
  padding: 0.5rem;
  height: 2rem;
  margin-top: 0.3rem;
  border-radius: 10px;
  border: 1px solid ${Colors.main};
  color: ${Colors.main};
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.main};
    color: white;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TitleStyle = styled.div`
  margin-top: 2rem;
  font-size: 20px;
`;

export const ColoredText = styled.span`
  color: ${Colors.main};
  font-family: "SCDream7";
`;

export const NameStyle = styled.div`
  margin-top: 0.2rem;
  font-size: 30px;
`;
