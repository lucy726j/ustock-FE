import Salary from "../../img/person.png";
import Candy from "../../img/candy.png";
import Soul from "../../img/Gukbap.png";
import Chicken from "../../img/chicken.png";
import Iphone from "../../img/iphone.png";
import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import Skrrr from "../../img/SkerrImg.png";
import { CalculResultProps } from "../../constants/interface";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 50px;
  border-top: 2px solid rgb(0, 0, 0, 0.2);
  margin-bottom: 2rem;
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
`;
const SpanStyle = styled.div`
  font-weight: bold;
  color: ${Colors.main};
`;

const SkrrrBird = styled.img`
  position: absolute;
  top: 45px;
  left: 115px;
  width: 260px;
`;
const NeverBuySkrrrBird = styled.img`
  position: absolute;
  top: 700px;
  left: 430px;
  width: 460px;
  opacity: 0.5;
`;

const SkrrrText = styled.div`
  position: absolute;
  top: 70px;
  left: 270px;
  z-index: 3;
  color: red;
  font-size: 25px;
  white-space: nowrap;
`;

const NeverBuyText = styled.div`
  position: absolute;
  top: 670px;
  left: 470px;
  z-index: 3;
  color: red;
  font-size: 25px;
  white-space: nowrap;
`;

const BirdContainer = styled.div`
  height: 300px;
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
            <SpanStyle>스껄</SpanStyle>
            님은
            <SpanStyle>{price}</SpanStyle>
            원을 벌었습니다.
          </SpanContainer>
          <ResultContainer>
            <DivContainer>
              <ImgStyle src={Salary} alt="" />
              <SpanContainer>
                2024년 최저시급 기준 <SpanStyle>{slave}</SpanStyle>시간
              </SpanContainer>
            </DivContainer>
            <DivContainer>
              <ImgStyle src={Candy} alt="" />
              <SpanContainer>
                새콤달콤 <SpanStyle>{candy}</SpanStyle>개
              </SpanContainer>
            </DivContainer>
            <DivContainer>
              <ImgStyle src={Soul} alt="" />
              <SpanContainer>
                국밥<SpanStyle>{soul}</SpanStyle>그릇
              </SpanContainer>
            </DivContainer>
            <DivContainer>
              <ImgStyle src={Chicken} alt="" />
              <SpanContainer>
                치킨 <SpanStyle>{chicken}</SpanStyle>마리
              </SpanContainer>
            </DivContainer>
            <DivContainer>
              <ImgStyle src={Iphone} alt="" />
              <SpanContainer>
                아이폰 <SpanStyle>{iphone}</SpanStyle>대
              </SpanContainer>
            </DivContainer>
            <SkrrrBird src={Skrrr} alt="" />
            <SkrrrText>살껄!@</SkrrrText>
          </ResultContainer>
        </Container>
      ) : (
        <Container>
          <BirdContainer>
            <NeverBuySkrrrBird src={Skrrr} alt="" />
            <NeverBuyText>그 돈으론 1주도 사지 못했~스껄~,,,@</NeverBuyText>
          </BirdContainer>
        </Container>
      )}
    </>
  );
};

export default CalculResult;
