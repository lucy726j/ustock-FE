import { useSpringCarousel } from "react-spring-carousel";
import CarouselItem from "./carouselItem";
import { useNavigate } from "react-router-dom";
import * as S from "./gameCarouselStyle";

const GameCarousel = ({ stocks }: any) => {
  const nav = useNavigate();

  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      items: stocks.map((data: any, index: any) => ({
        id: `item-${index}`,
        renderItem: <CarouselItem data={data} />,
      })),
    });

  // // 랭킹 저장 여부 확인
  // useEffect(() => {
  //   if (location.state?.btnDisabled) {
  //     console.log("게임 스톡에 잘 넘어와?", location.state.btnDisabled);
  //     setBtnState(location.state.btnDisabled);
  //   }
  // }, [location.state]);

  return (
    <>
      <S.BtnContainer>
        <S.BtnStyle onClick={slideToPrevItem}>이전</S.BtnStyle>
        <S.BackButton
          onClick={() => {
            nav(
              "/game/result/total"
              // , { state: { btnDisabled: btnState } }
            );
          }}
        >
          게임 결과 페이지로 돌아가기
        </S.BackButton>
        <S.BtnStyle onClick={slideToNextItem}>다음</S.BtnStyle>
      </S.BtnContainer>
      <S.ChartStyle>{carouselFragment}</S.ChartStyle>
    </>
  );
};

export default GameCarousel;
