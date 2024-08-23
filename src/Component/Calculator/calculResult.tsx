import Salary from "../../img/person.png";
import Candy from "../../img/candy.png";
import Soul from "../../img/Gukbap.png";
import Chicken from "../../img/chicken.png";
import Iphone from "../../img/iphone.png";
import styled from "styled-components";
import Skrrr from "../../img/SkerrImg.png";
import { CalculResultProps } from "../../constants/interface";
import { ValueProps } from "../../constants/interface";
import { formatPrice } from "../../util/util";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 50px;
  border-top: 2px solid rgb(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  /* background-color: yellow; */
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  position: relative;
`;

const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const ImgStyle = styled.img`
  width: 25px;
  height: 25px;
`;

const SpanContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  font-size: 20px;
`;
const SpanStyle = styled.div<ValueProps>`
  font-weight: bold;
  color: ${(props) => (props.isNegative ? "#615EFC" : "#FF5759")};
`;

const SkrrrBird = styled.img`
  position: absolute;
  top: 45px;
  left: 115px;
  width: 260px;
  opacity: 0.5;
`;
const NeverBuySkrrrBird = styled.img`
  margin-right: 5rem;
  width: 460px;
  opacity: 0.5;
`;

const SkrrrText = styled.div`
  position: absolute;
  top: 70px;
  left: 270px;
  z-index: 3;
  color: #ff5759;
  font-size: 25px;
  white-space: nowrap;
`;

const NeverBuyText = styled.div`
  /* position: absolute; */
  top: 670px;
  left: 470px;
  z-index: 3;
  color: #ff5759;
  font-size: 25px;
  white-space: nowrap;
`;

const BirdContainer = styled.div`
  display: flex;
  height: 400px;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
`;

const CalculResult: React.FC<CalculResultProps> = ({
  price,
  slave,
  candy,
  soul,
  chicken,
  iphone,
}) => {
  return (
    <>
      {price !== 0 ? (
        <Container>
          <SpanContainer>
            <SpanStyle isNegative={true}>스껄</SpanStyle>
            님은
            <SpanStyle isNegative={price < 0}>
              {formatPrice(Math.abs(price))}
            </SpanStyle>
            원을 <span>{price >= 0 ? "벌었습니다." : "잃었습니다.."}</span>
          </SpanContainer>
          <ResultContainer>
            <DivContainer>
              <ImgStyle src={Salary} alt="" />
              <SpanContainer>
                2024년 최저시급 기준{" "}
                <SpanStyle isNegative={price < 0}>{slave}</SpanStyle>시간
              </SpanContainer>
            </DivContainer>
            <DivContainer>
              <ImgStyle src={Candy} alt="" />
              <SpanContainer>
                새콤달콤 <SpanStyle isNegative={price < 0}>{candy}</SpanStyle>개
              </SpanContainer>
            </DivContainer>
            <DivContainer>
              <ImgStyle src={Soul} alt="" />
              <SpanContainer>
                국밥<SpanStyle isNegative={price < 0}>{soul}</SpanStyle>그릇
              </SpanContainer>
            </DivContainer>
            <DivContainer>
              <ImgStyle src={Chicken} alt="" />
              <SpanContainer>
                치킨 <SpanStyle isNegative={price < 0}>{chicken}</SpanStyle>마리
              </SpanContainer>
            </DivContainer>
            <DivContainer>
              <ImgStyle src={Iphone} alt="" />
              <SpanContainer>
                아이폰 <SpanStyle isNegative={price < 0}>{iphone}</SpanStyle>대
              </SpanContainer>
            </DivContainer>
            <SkrrrBird src={Skrrr} alt="" />
            <SkrrrText>{price >= 0 ? "살껄!@" : "팔껄!@"}</SkrrrText>
          </ResultContainer>
        </Container>
      ) : (
        <BirdContainer>
          <NeverBuyText>그 돈으론 1주도 사지 못했~스껄~,,,@</NeverBuyText>
          <NeverBuySkrrrBird src={Skrrr} alt="" />
        </BirdContainer>
      )}
    </>
  );
};

export default CalculResult;
