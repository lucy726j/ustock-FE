import styled from "styled-components";
import { Colors } from "../../Styles/Colors";

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Container = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Img = styled.img`
  width: 64px;
  height: 48px;
  margin-bottom: 4px;
`;
export const P = styled.p`
  color: ${Colors.main};
  font-family: "SCDream9";
  font-size: 40px;
`;

export const Description = styled.p`
  margin-bottom: 10px;
  font-size: 10px;
  color: #ada9bb;
`;

export const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
