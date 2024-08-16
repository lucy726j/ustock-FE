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
`;

const DropdownBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${Colors.main};
  border-radius: 5px;
  margin-right: auto;
`;

const SelectBox = styled.div`
  width: 66px;
  height: 20px;
  font-size: 10px;
  color: black
  text-align: start;
  align-content: center;
  padding: 5px 0px 5px 5px;
`;

const DropdownBox = styled.div`
  width: 80px;
  height: 20px;
  font-size: 10px;
  color: black
  text-align: start;
  align-content: center;
  padding-left: 5px;

  &:hover {
    color: ${Colors.main};
    background-color : #F5F4FB;
    
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
  margin-right: auto;
  padding: 5px 0px;
`;

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const category = ["시가총액순", "거래량", "등락율"];
  const [filter, setFilter] = useState(category[0]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (event: any) => {
    setFilter(event.target.innerText);
    setIsOpen(!isOpen);
  };

  return (
      <DropdownContainer>
        <DropdownBoxContainer onClick={handleClick}>
          <SelectBox>{filter}</SelectBox>
          <BntImg src={!isOpen ? open : close}></BntImg>
        </DropdownBoxContainer>
        {isOpen && (
          <DropdownListBox>
            {category.map((el) => (
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
