import React from "react";
import Button from "../../Component/Button/button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 200px;
  text-align: center;
`;

const P = styled.p`
  margin-top: 1rem;
`;

const ErrorPage = () => {
  const userFeedback = () => {
    window.open("https://forms.gle/GcfMhNoqBHkxiF1c7", "_blank");
  };

  return (
    <Container>
      <div>
        예기치 못한 오류가 발생했습니다.
        <P>페이지를 새로 고치거나 나중에 다시 시도해주세요.</P>
        <P>문제가 지속될 시 아래 페이지로 문의부탁드립니다.</P>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Button
          $colorType="main"
          onClick={userFeedback}
          $state="normal"
          $size="small"
        >
          문의하기
        </Button>
      </div>
    </Container>
  );
};

export default ErrorPage;
