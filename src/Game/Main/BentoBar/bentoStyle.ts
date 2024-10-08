import styled, { keyframes } from "styled-components";
import { Colors } from "../../../Styles/Colors";

export const Restart = styled.div`
  display: flex;
  width: 90px;
  height: 40px;
  border: 1px solid #615efc;
  border-radius: 20px;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: white;
  color: black;
`;

const fadeIn = keyframes`
    from{
        opacity:0;
        transform: translateY(10px)
    }
    to{
        opacity:1;
        transform: translateY(0)
    }
`;

export const ListBox = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  animation: ${fadeIn} 0.5s ease-out forwards;
  opacity: 0;
`;

export const IconDiv = styled.div`
  border-radius: 25px;
  width: 50px;
  height: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.main};
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
