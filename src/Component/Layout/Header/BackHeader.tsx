import styled from "styled-components";
import backImg from "../../../img/backImg.png";
import { useNavigate } from "react-router-dom";

const BackHeaderStyle = styled.header`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
`;

const BackStyle = styled.img`
  width: 20px;
  height: 30px;
`;

const BackHeader = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <BackHeaderStyle>
      <BackStyle src={backImg} alt="뒤로가기 버튼" onClick={handleClickBack} />
    </BackHeaderStyle>
  );
};

export default BackHeader;
