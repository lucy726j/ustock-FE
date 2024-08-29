import React, { useState, useEffect } from "react";
import { MarketDataProps } from "../../../constants/interface";
import styled, { keyframes } from "styled-components";
import { FaCaretDown } from "react-icons/fa";

interface SlidingDivProps {
  isSliding: boolean;
  $isNegative: boolean;
}

const slideUp = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
`;

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;
const Container = styled.div<{ isExpanded: boolean }>`
  position: relative;
  margin: 3px;
  border-radius: 10px;
  overflow: hidden;
  width: 95%;
  box-shadow: 0px 4px 7px -2px #ada9bb;
  border-radius: 10px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  font-weight: bold;
  transition: height 0.5s ease-in-out;
  margin-bottom: 50px;
  height: ${({ isExpanded }) => (isExpanded ? "auto" : "100px")};
  padding: 10px;
`;

const SlidingDiv = styled.div<SlidingDivProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 16px;
  animation: ${({ isSliding }) => (isSliding ? slideUp : slideDown)} 0.5s
    forwards;
  color: ${({ $isNegative }) => ($isNegative ? "#615EFC" : "#FF5759")};
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
`;

const PriceText = styled.div`
  width: 150px;
  text-align: center;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const ChangeRateText = styled.div`
  flex: 1;
  width: 80px;
  text-align: center;
  flex-shrink: 0;
`;

const ExpandedContainer = styled.div`
  padding: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  outline: none;

  svg {
    height: 32px;
    width: 24px;
    color: black;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1.5rem 0; /* Equivalent to my-6 in Tailwind */
`;

const RotationAnimation: React.FC<MarketDataProps> = ({ kospi, kosdaq }) => {
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showKospi, setShowKospi] = useState<boolean>(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isExpanded) {
        setIsSliding(true); // 슬라이딩 시작

        setTimeout(() => {
          setIsSliding(false); // 슬라이딩 종료
          setShowKospi((prev: any) => !prev);
        }, 500); // 0.5초 동안 애니메이션
      }
    }, 2000); // 3초마다 슬라이드

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 정리
  }, [isExpanded]);

  const currentMarket = showKospi ? kospi : kosdaq;
  const label = showKospi ? "KOSPI" : "KOSDAQ";

  return (
    <Container isExpanded={isExpanded}>
      <SlidingDiv
        isSliding={isSliding}
        $isNegative={currentMarket.changeRate < 0}
      >
        <InfoText>{label}:</InfoText>
        <PriceText>{currentMarket.price}</PriceText>
        <ChangeRateText>{currentMarket.changeRate}%</ChangeRateText>
      </SlidingDiv>

      {isExpanded && (
        <ExpandedContainer>
          <ItemRow>
            <InfoText>KOSPI:</InfoText>
            <PriceText>{kospi.price}</PriceText>
            <ChangeRateText>{kospi.changeRate}%</ChangeRateText>
          </ItemRow>
          <ItemRow>
            <InfoText>KOSDAQ:</InfoText>
            <PriceText>{kosdaq.price}</PriceText>
            <ChangeRateText>{kosdaq.changeRate}%</ChangeRateText>
          </ItemRow>
        </ExpandedContainer>
      )}

      <Button onClick={() => setIsExpanded(!isExpanded)}>
        <FaCaretDown />
      </Button>
    </Container>
  );
};

export default RotationAnimation;
