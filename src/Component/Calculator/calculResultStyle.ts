import styled from "styled-components";
import { ValueProps } from "../../constants/interface";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 50px;
  border-top: 2px solid rgb(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  /* background-color: yellow; */
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  position: relative;
`;

export const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

export const ImgStyle = styled.img`
  width: 25px;
  height: 25px;
`;

export const SpanContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  font-size: 20px;
  white-space: nowrap;
`;
export const SpanStyle = styled.div<ValueProps>`
  font-weight: bold;
  color: ${(props) => (props.$isNegative ? "#615EFC" : "#FF5759")};
`;

export const SkrrrBird = styled.img`
  position: absolute;
  top: 45px;
  left: 115px;
  width: 260px;
  opacity: 0.5;
  z-index: -1;
`;

export const NeverBuySkrrrBird = styled.img`
  margin-right: 5rem;
  width: 460px;
  opacity: 0.5;
`;

export const SkrrrText = styled.div`
  position: absolute;
  top: 70px;
  left: 270px;
  z-index: 3;
  color: #ff5759;
  font-size: 25px;
  white-space: nowrap;
`;

export const NeverBuyText = styled.div`
  /* position: absolute; */
  top: 670px;
  left: 470px;
  z-index: 3;
  color: #ff5759;
  font-size: 25px;
  white-space: nowrap;
`;

export const BirdContainer = styled.div`
  display: flex;
  height: 400px;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
`;
