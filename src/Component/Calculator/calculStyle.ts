import styled from "styled-components";
import { Colors } from "../../Styles/Colors";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 50px;
  border-top: 2px solid rgb(0, 0, 0, 0.2);
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  gap: 5px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const User = styled.span`
  color: ${Colors.main};
`;

export const DropContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
`;

export const Label = styled.div`
  margin-bottom: 0.5rem;
  margin-left: 1rem;
`;
