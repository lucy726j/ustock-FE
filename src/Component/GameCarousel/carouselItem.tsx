import GameChart from "./gameChart";
import GameNewsList from "./gameNewsList";
import * as S from "./gameCarouselStyle";

const CarouselItem = ({ data }: any) => {
  return (
    <S.Container>
      <S.TitleStyle>
        내가 거래한 <S.ColoredText>{data.fakeName}</S.ColoredText>의 정체
      </S.TitleStyle>
      <S.NameStyle>{data.realName}</S.NameStyle>
      <GameChart data={data.chart} />
      <S.TitleStyle>해당 종목의 뉴스 히스토리</S.TitleStyle>
      <p style={{ marginTop: "0.4rem", fontSize: "13px" }}>
        ❗️게임 속 제공되던 정보는 여기서 나왔어요{" "}
      </p>
      <GameNewsList data={data.news} />
    </S.Container>
  );
};

export default CarouselItem;
