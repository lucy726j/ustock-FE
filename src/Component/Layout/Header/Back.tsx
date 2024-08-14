import styled from "styled-components";
import backImg from "../../../img/backImg.png";

const BackStyle = styled.img`
  width: 20px;
  height: 30px;
`;

const Back = () => {
  return (
    <div>
      <BackStyle src={backImg} alt="뒤로가기 버튼" />
    </div>
  );
};
export default Back;
