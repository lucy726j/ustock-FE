import styled from "styled-components";
import { Colors } from "../../../Styles/Colors";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: start; */
  align-items: center;
  border-radius: 20px;
  margin-bottom: 1rem;
  padding: 0.8rem 1rem;
  box-shadow: 0px 6px 5px rgb(213, 213, 213);
  border: 1px solid rgb(213, 213, 213);
  /* min-width: 95%; */
  white-space: nowrap;
  gap: 1rem;
`;

export const IndexBox = styled.div`
  border: 1px solid #e6e6e6;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
  text-align: center;
  padding-top: 0.8rem;
  color: #858494;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const Nickname = styled.div`
  width: 120px;
`;

export const Budget = styled.div`
  width: 130px;
  color: #858494;
  font-family: "SCDream3";
  text-align: right;
`;

export const Rate = styled.div`
  color: ${Colors.red};
  font-family: "SCDream3";
  text-align: right;
  width: 100px;
`;

export const Medal = styled.img`
  width: 50px;
  height: 45px;
`;
