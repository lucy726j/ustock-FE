import Salary from "../../img/person.png";
import Candy from "../../img/candy.png";
import Soul from "../../img/Gukbap.png";
import Chicken from "../../img/chicken.png";
import Iphone from "../../img/iphone.png";
import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import Skrrr from "../../img/SkerrImg.png";

const Container = styled.div`
  width: 450px;
  height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgb(0, 0, 0, 0.25);
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

const SkrrrText = styled.div`
  position: absolute;
  top: 70px;
  left: 270px;
  z-index: 3;
  color: red;
  font-size: 25px;
  white-space: nowrap;
`;

const CalculResult = () => {
  return (
    <Container>
      <SpanContainer>
        <SpanStyle>스껄</SpanStyle>
        님은
        <SpanStyle>1,000,000</SpanStyle>
        원을 벌었습니다.
      </SpanContainer>
      <ResultContainer>
        <DivContainer>
          <ImgStyle src={Salary} alt="" />
          <SpanContainer>
            2024년 최저시급 기준 <SpanStyle>1,300</SpanStyle>시간
          </SpanContainer>
        </DivContainer>
        <DivContainer>
          <ImgStyle src={Candy} alt="" />
          <SpanContainer>
            새콤달콤 <SpanStyle>1,233,983</SpanStyle>개
          </SpanContainer>
        </DivContainer>
        <DivContainer>
          <ImgStyle src={Soul} alt="" />
          <SpanContainer>
            국밥<SpanStyle>6,300</SpanStyle>그릇
          </SpanContainer>
        </DivContainer>
        <DivContainer>
          <ImgStyle src={Chicken} alt="" />
          <SpanContainer>
            치킨 <SpanStyle>450</SpanStyle>마리
          </SpanContainer>
        </DivContainer>
        <DivContainer>
          <ImgStyle src={Iphone} alt="" />
          <SpanContainer>
            아이폰 <SpanStyle>13</SpanStyle>대
          </SpanContainer>
        </DivContainer>
        <SkrrrBird src={Skrrr} alt="" />
        <SkrrrText>살껄!@</SkrrrText>
      </ResultContainer>
    </Container>
  );
};

export default CalculResult;
