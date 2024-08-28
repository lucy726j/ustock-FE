import React from "react";
import Button from "../../Component/Button/button";

const ErrorPage = () => {
  const userFeedback = () => {
    window.open("https://forms.gle/GcfMhNoqBHkxiF1c7", "_blank");
  };

  return (
    <div>
      예기치 못한 오류가 발생했습니다. 페이지를 새로 고치거나 나중에 다시
      시도해주세요.
      <p>문제가 지속될 시 아래 페이지로 문의부탁드립니다.</p>
      <Button
        colorType="main"
        onClick={userFeedback}
        state="normal"
        size="small"
      >
        문의하기
      </Button>
    </div>
  );
};

export default ErrorPage;
