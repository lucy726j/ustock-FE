import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import close from "../../img/closeStatus.png";
import open from "../../img/openStatus.png";
import { useState } from "react";
import { DropdownProps } from "../../constants/interface";

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const DropdownBox = styled.option`
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

const DropdownListBox = styled.select`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${Colors.main};
  border-radius: 5px;
  background-color: white;
  top: 35px;
  z-index: 1;
  padding: 5px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Dropdown: React.FC<DropdownProps> = ({ dropList, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(dropList[0]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    setIsOpen(false);
    onSelect(selectedValue);
  };

  return (
    <DropdownContainer>
      <DropdownListBox onChange={handleSelect}>
        {dropList.map((el) => (
          <DropdownBox key={el} value={el}>
            {el === "capital"
              ? "시가총액순"
              : el === "trade"
              ? "거래량순"
              : el === "change"
              ? "등락율순"
              : el}
          </DropdownBox>
        ))}
      </DropdownListBox>
      {/* )} */}
    </DropdownContainer>
  );
};

export default Dropdown;
