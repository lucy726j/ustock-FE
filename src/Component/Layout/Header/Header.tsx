import Logo from "./Logo";
import Profile from "./Profile";
import styled from "styled-components";

const HeaderStyle = styled.header`
  width: 500px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
  padding: 0px 20px;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
`;

const Header = () => {
  return (
    <HeaderStyle>
      <Logo />
      <Profile />
    </HeaderStyle>
  );
};

export default Header;
