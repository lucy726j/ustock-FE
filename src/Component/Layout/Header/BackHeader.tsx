import Logo from "./Logo";
import Back from "./Back";
import Profile from "./Profile";
import styled from "styled-components";

const BackHeaderStyle = styled.header`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
`;

const BackHeader = () => {
  return (
    <BackHeaderStyle>
      <Back />
    </BackHeaderStyle>
  );
};

export default BackHeader;
