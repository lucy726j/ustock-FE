import { useSpringCarousel } from "react-spring-carousel";
import CarouselItem from "./carouselItem";
import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import Button from "../Button/button";

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;
const BtnStyle = styled.button`
  padding: 7px 15px;
  background-color: ${Colors.main};
  border: 1px solid ${Colors.main};
  border-radius: 5px;
  color: white;
  font-size: 17px;
  font-family: "SCDream6";
  white-space: nowrap;
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
      <BtnContainer>
        <BtnStyle onClick={slideToPrevItem}>이전</BtnStyle>
        <BtnStyle onClick={slideToNextItem}>다음</BtnStyle>
      </BtnContainer>
      <ChartStyle>{carouselFragment}</ChartStyle>
    {/* <Button /> */}
    </>
  );
};

export default GameCarousel;
