import React from "react";
import AppLogo from "../../img/Logo.png";
import Google from "../../img/Official Buttons/Sign in with Google/White/googleLogo.png";
import { Box, Button, Container, Description, Img, P } from "./loginStyle";

const GoogleLogin = () => {
  const handleLogin = () => {
    window.location.href = `
    https://accounts.google.com/o/oauth2/v2/auth?client_id=64814033153-55dta7lc3gu9ont7ln4vcle9eemuftu0.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/callback&response_type=code&scope=email profile`;
  };

  return (
    <Box>
      <Container>
        <Img src={AppLogo} />
        <P>U'STOCK</P>
      </Container>
      <Description>SNS 계정으로 로그인</Description>
      <Button onClick={handleLogin}>
        <img src={Google} />
      </Button>
    </Box>
  );
};

export default GoogleLogin;
