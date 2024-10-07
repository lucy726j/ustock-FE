import styled from "styled-components";
import { Colors } from "../../Styles/Colors";

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DropdownBox = styled.option`
  width: 75px;
  font-size: 10px;
  color: black;
  text-align: start;
  padding: 8px;

  &:hover {
    color: ${Colors.main};
    background-color: #f5f4fb;
  }
`;

export const DropdownListBox = styled.select`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${Colors.main};
  border-radius: 5px;
  background-color: white;
  top: 35px;
  z-index: 1;
  padding: 10px 5px;
  height: 35px;
  width: 85px;
  text-align: center;
  text-justify: center;
  margin-bottom: 1rem;
  font-size: 12px;
  cursor: pointer;

  &::-webkit-scrollbar {
    display: none;
  }
`;
