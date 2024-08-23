import React from "react";
import GoogleLogin from "../../Component/GoogleLogin/login";
import {
  Box,
  Container,
  Description,
  Img,
  P,
} from "../../Component/GoogleLogin/loginStyle";
import AppLogo from "../../img/Logo.png";

const LoginPage = () => {
  return (
    <Box style={{ height: "80vh" }}>
      <Container>
        <Img src={AppLogo} />
        <P>U'STOCK</P>
      </Container>
      <Description>SNS 계정으로 로그인</Description>
      <GoogleLogin />
    </Box>
  );
};

export default LoginPage;
