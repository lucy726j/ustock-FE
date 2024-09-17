import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GoAlert } from "react-icons/go";
import { Colors } from "../../Styles/Colors";
import Header from "../../Component/Layout/Header/Header";
import NavBar from "../../Component/Layout/NavBar/NavBar";

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
        <GoAlert
          style={{
            fontSize: "100px",
            color: Colors.main,
            marginBottom: "1rem",
          }}
        />
        <Div>로그인이 필요한 페이지입니다.</Div>
        {/* <Button size="small" colorType="main" state="normal" onClick={Login}>
          로그인 하러 가기
        </Button> */}
      </Container>
    </Box>
  );
};

export default NoUserPage;
