import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../Component/Button/button";

const Box = styled.div`
  height: 60vh;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Div = styled.div`
  margin-bottom: 2rem;
`;

const NoUserPage = () => {
  const navigate = useNavigate();
  function Login() {
    navigate("/nologin");
  }
  return (
    <Box>
      <Container>
        <Div>접근할 수 없는 페이지입니다.</Div>
        <Button size="small" colorType="main" state="normal" onClick={Login}>
          로그인 하러 가기
        </Button>
      </Container>
    </Box>
  );
};

export default NoUserPage;
