import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";
import styled from "styled-components";

const Main = styled.main`
  width: 500px;
  padding-top: 20px;
  padding-bottom: 60px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Layout = (props: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <Container className="Layout">
      <Header />
          <Main style={{ height: "100%" }}>{props.children}</Main>
      <NavBar />
    </Container>
  );
};

export default Layout;
