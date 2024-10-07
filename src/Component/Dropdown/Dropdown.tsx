import * as S from "./dropdownStyle";
import { useState } from "react";
import { DropdownProps } from "../../constants/interface";
const Dropdown: React.FC<DropdownProps> = ({ dropList, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(dropList[0]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    setIsOpen(false);
    onSelect(selectedValue);
  };

  return (
    <S.DropdownContainer>
      <S.DropdownListBox onChange={handleSelect}>
        {dropList.map((el) => (
          <S.DropdownBox key={el} value={el}>
            {el === "capital"
              ? "시가총액순"
              : el === "trade"
              ? "거래량순"
              : el === "change"
              ? "등락율순"
              : el}
          </S.DropdownBox>
        ))}
      </S.DropdownListBox>
    </S.DropdownContainer>
  );
};

export default Dropdown;
