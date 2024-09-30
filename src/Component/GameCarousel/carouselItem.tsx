import React from "react";
import styled from "styled-components";
import GameChart from "./gameChart";
import GameNewsList from "./gameNewsList";
import { Colors } from "../../Styles/Colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TitleStyle = styled.div`
  margin-top: 2rem;
  font-size: 20px;
`;

const ColoredText = styled.span`
  color: ${Colors.main};
  font-family: "SCDream7";
`;

const NameStyle = styled.div`
  margin-top: 0.2rem;
  font-size: 30px;
`;

const CarouselItem = ({ data }: any) => {
  return (
    <Container>
      <TitleStyle>
        내가 거래한 <ColoredText>{data.fakeName}</ColoredText>의 정체
      </TitleStyle>
      <NameStyle>{data.realName}</NameStyle>
      <GameChart data={data.chart} />
      <TitleStyle>해당 종목의 뉴스 히스토리</TitleStyle>
      <p style={{ marginTop: "0.4rem", fontSize: "13px" }}>
      ❗️게임 속 제공되던 정보는 여기서 나왔어요{" "}
      </p>
      <GameNewsList data={data.news} />
    </Container>
  );
};

export default CarouselItem;
