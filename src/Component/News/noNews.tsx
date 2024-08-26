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
  margin-bottom: 0.5rem;
`;

const Text = styled.div`
  margin-bottom: 1rem;
  font-size: 12px;
`;

const NoNews = () => {
  const nav = useNavigate();
  const handleClick = () => {
    nav("/portfolio/no");
  };

  return (
    <Container>
      <Div>❌ 아직 보유하신 종목이 없어요 ❌ </Div>
      <Text>내 포트폴리오를 생성하고, 종목을 추가해보세요 !</Text>
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
