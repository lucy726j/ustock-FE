// import logo from "../../../img/logo.png";
import styled from "styled-components";

const LogoStyle = styled.div`
  color: #615efc;
  font-family: SCDream9;
  font-size: 35px;
  font-weight: 900;
  width: 140px;
  height: 40px;
`;

const Logo = () => {
  return (
    <div>
      <LogoStyle>U'STOCK</LogoStyle>
    </div>
  );
};

export default Logo;
