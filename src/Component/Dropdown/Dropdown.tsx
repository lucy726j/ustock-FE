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
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${Colors.main};
  width: 80px;
  border-radius: 5px;
`;

const DropdownBox = styled.div`
  width: 80px;
  height: 20px;
  font-size: 10px;
  color: ${Colors.main};
  text-align: start;
  align-content: center;
  margin-left: 5px;
`;

const BntImg = styled.img`
  width: 9px;
  height: 10px;
  margin-right: 5px;
`;

const DropdownListBox = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${Colors.main};
  border-radius: 5px;
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
