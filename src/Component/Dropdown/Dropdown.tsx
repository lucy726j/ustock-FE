import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import close from "../../img/closeStatus.png";
import open from "../../img/openStatus.png";

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const DropdownBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Colors.main};
  width: 120px;
  border-radius: 10%;
`;

const DropdownBox = styled.div`
  font-size: 10px;
  text-align: start;
  align-content: center;
`;

const BntImg = styled.img`
  width: 18px;
  height: 11px;
`;

const DropdownListBox = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${Colors.main};
  border-radius: 10%;
`;

const Dropdown = () => {
  return (
    <div>
      <DropdownContainer>
        <DropdownBoxContainer>
          <DropdownBox>시가총액순</DropdownBox>
          <BntImg src={close}></BntImg>
        </DropdownBoxContainer>
        <DropdownListBox>
          <DropdownBox>시가총액순</DropdownBox>
          <DropdownBox>거래량</DropdownBox>
          <DropdownBox>등락율</DropdownBox>
        </DropdownListBox>
      </DropdownContainer>
    </div>
  );
};

export default Dropdown;
