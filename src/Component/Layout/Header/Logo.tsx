// import logo from "../../../img/logo.png";
import { useNavigate } from "react-router-dom";
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
  const nav = useNavigate();

  const handleClick = () => {
    nav("/home");
  };

  return (
    <>
      <LogoStyle onClick={handleClick}>U'STOCK</LogoStyle>
    </>
  );
};

export default Logo;
