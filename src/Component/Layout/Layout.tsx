import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";
import styled from "styled-components";
import BentoBar from "../../Game/Main/BentoBar/bentoBar";

const Main = styled.main`
  width: 500px;
  padding-top: 20px;
  padding-bottom: 60px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    padding-bottom: 60px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    padding-left: 0;
  }
`;

const Layout = (props: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/nologin";
  const isGame = location.pathname.includes("/game");
  const GameNav =
    location.pathname.includes("/game/rank") ||
    location.pathname.includes("/game/result/total") ||
    location.pathname.includes("/game/gameStocks");

  return (
    <Container className="Layout">
      {!isLoginPage && !isGame && <Header />}
      <Main style={{ height: "100%" }}>{props.children}</Main>
      {!isLoginPage && !isGame ? <NavBar /> : GameNav ? <BentoBar /> : ""}
    </Container>
  );
};

export default Layout;
