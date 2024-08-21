import React from "react";
import AppLogo from "../../img/Logo.png";
import Google from "../../img/Official Buttons/Sign in with Google/White/googleLogo.png";
import { Box, Button, Container, Description, Img, P } from "./loginStyle";

const GoogleLogin = () => {
  // Google 로그인 버튼 클릭 시 처리
  const handleLogin = () => {
    window.location.href = `
    https://api.ustock.site/oauth2/authorization/google`;
  };

  return (
    <Box>
      {/* <Container>
        <Img src={AppLogo} />
        <P>U'STOCK</P>
      </Container>
      <Description>SNS 계정으로 로그인</Description> */}
      <Button onClick={handleLogin}>
        <img src={Google} />
      </Button>
    </Box>
  );
};

export default GoogleLogin;
