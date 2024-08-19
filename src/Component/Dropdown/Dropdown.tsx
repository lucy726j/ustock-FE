import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import close from "../../img/closeStatus.png";
import open from "../../img/openStatus.png";
import { useState } from "react";

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  position: relative;
`;

const DropdownBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${Colors.main};
  border-radius: 5px;
  margin-right: auto;
  padding: 5px;
`;

const SelectBox = styled.div`
  width: 61px;
  height: 20px;
  font-size: 10px;
  color: black;
  text-align: start;
  align-content: center;
  padding: 5px 0px 5px 5px;
`;

const DropdownBox = styled.div`
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

const BntImg = styled.img`
  width: 9px;
  height: 7px;
  margin-right: 5px;
`;

const DropdownListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${Colors.main};
  border-radius: 5px;
  background-color: white;
  position: absolute;
  top: 35px;
  z-index: 1;
  padding: 5px;
  max-height: 100px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Dropdown = ({ dropList }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(dropList[0]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (event: any) => {
    setValue(event.target.innerText);
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownBoxContainer onClick={handleClick}>
        <SelectBox>{value}</SelectBox>
        <BntImg src={!isOpen ? open : close}></BntImg>
      </DropdownBoxContainer>
      {isOpen && (
        <DropdownListBox>
          {dropList.map((el: any) => (
            <DropdownBox key={el} onClick={handleSelect}>
              {el}
            </DropdownBox>
          ))}
        </DropdownListBox>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
