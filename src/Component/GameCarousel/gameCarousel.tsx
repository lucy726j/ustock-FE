import { useSpringCarousel } from "react-spring-carousel";
import CarouselItem from "./carouselItem";
import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const BtnStyle = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-top: 0.2rem;
  height: 2rem;
  background-color: ${Colors.main};
  border: 1px solid ${Colors.main};
  border-radius: 5px;
  color: white;
  font-size: 17px;
  font-family: "SCDream6";
  white-space: nowrap;
  cursor: pointer;
`;
const ChartStyle = styled.div`
  overflow: hidden;
`;

const BackButton = styled.button`
  padding: 0.5rem;
  height: 2rem;
  margin-top: 0.3rem;
  border-radius: 10px;
  border: 1px solid ${Colors.main};
  color: ${Colors.main};
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.main};
    color: white;
  }
`;

const GameCarousel = ({ stocks }: any) => {
  const nav = useNavigate();
  // const location = useLocation();
  // const [btnState, setBtnState] = useState();

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
      <BtnContainer>
        <BtnStyle onClick={slideToPrevItem}>이전</BtnStyle>
        <BackButton
          onClick={() => {
            nav(
              "/game/result/total"
              // , { state: { btnDisabled: btnState } }
            );
          }}
        >
          게임 결과 페이지로 돌아가기
        </BackButton>
        <BtnStyle onClick={slideToNextItem}>다음</BtnStyle>
      </BtnContainer>
      <ChartStyle>{carouselFragment}</ChartStyle>
    </>
  );
};

export default GameCarousel;
