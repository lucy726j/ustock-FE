import { useNavigate } from "react-router-dom";
import Button from "../Button/button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem;
`;

const Div = styled.div`
  margin-bottom: 1rem;
`;

const NoNews = () => {
  const nav = useNavigate();
  const handleClick = () => {
    nav("/portfolio/no");
  };

  return (
    <Container>
      <Div>아직 보유하신 포트폴리오가 없어요!</Div>
      <Button
        children={"내 포트폴리오 생성하러 가기"}
        state="normal"
        size="plusBtn"
        colorType="main"
        onClick={handleClick}
      />
    </Container>
  );
};

export default NoNews;
