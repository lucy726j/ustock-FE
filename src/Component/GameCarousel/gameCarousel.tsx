import { useSpringCarousel } from "react-spring-carousel";
import CarouselItem from "./carouselItem";
import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import { GameStockProps } from "../../constants/interface";

const BtnContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;
const BtnStyle = styled.button`
  padding: 10px 20px;
  background-color: ${Colors.main};
  border: 1px solid ${Colors.main};
  border-radius: 5px;
  color: white;
  font-size: 17px;
  font-family: "SCDream6";
`;
const ChartStyle = styled.div`
  overflow: hidden;
`;

const GameCarousel = ({ stocks }: any) => {
  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      items: stocks.map((data: any, index: any) => ({
        id: `item-${index}`,
        renderItem: <CarouselItem data={data} />,
      })),
    });

  return (
    <>
      <ChartStyle>{carouselFragment}</ChartStyle>
      <BtnContainer>
        <BtnStyle onClick={slideToPrevItem}>이전</BtnStyle>
        <BtnStyle onClick={slideToNextItem}>다음</BtnStyle>
      </BtnContainer>
    </>
  );
};

export default GameCarousel;
